/** Local, same-origin Web backend for the dedicated Unlimited-OCR Settings page. */

import type { IncomingMessage, ServerResponse } from 'node:http'
import type { Context } from '@deepseek-ai/cordis'
import { credentialRef, type CredentialRef } from '@deepseek-ai/dsh-credentials'
import { SettingsConflictError, type SettingsDescriptor } from '@deepseek-ai/dsh-settings'
import type {} from '@deepseek-ai/dsh-host-webserver'
import { UNLIMITED_OCR_SETTINGS_NAMESPACE, resolveConfig, type UnlimitedOCRConfig } from './config.js'
import { PLUGIN_VERSION, UPSTREAM_COMMIT, UPSTREAM_REPOSITORY } from './version.js'

export const SETTINGS_ROUTE = '/_dsh/unlimited-ocr/settings'

interface CredentialStatus {
  ref: string
  configured: boolean
  source?: string
  writable: boolean
}

export interface UnlimitedOCRSettingsSnapshot {
  schemaVersion: 1
  writable: boolean
  settings: { value: UnlimitedOCRConfig; revision: number; applies: 'live' }
  credentials: { apiKey: CredentialStatus; secretKey: CredentialStatus; localApiKey: CredentialStatus }
  runtime: { uvAvailable: boolean; uvPath?: string }
  release: { pluginVersion: string; upstreamRepository: string; upstreamCommit: string }
}

type RequestBody =
  | { action: 'save'; expectedRevision: number; value: UnlimitedOCRConfig }
  | { action: 'credentialSet'; ref: string; value: string }
  | { action: 'credentialUnset'; ref: string }

interface JsonFailure { ok: false; error: { code: string; message: string } }
interface JsonSuccess<T> { ok: true; value: T }

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function descriptorOf(ctx: Context): SettingsDescriptor {
  const descriptor = ctx.settings.describe({ redactSecrets: true }).find(row => row.ns === UNLIMITED_OCR_SETTINGS_NAMESPACE)
  if (descriptor === undefined) throw new Error('Unlimited-OCR Settings namespace is not registered')
  return descriptor
}

function responseJson<T>(res: ServerResponse, status: number, body: JsonSuccess<T> | JsonFailure): void {
  const bytes = Buffer.from(JSON.stringify(body))
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.setHeader('Content-Length', String(bytes.length))
  res.setHeader('Cache-Control', 'no-store')
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('Content-Security-Policy', "default-src 'none'; frame-ancestors 'none'")
  res.writeHead(status)
  res.end(bytes)
}

function fail(res: ServerResponse, status: number, code: string, message: string): void {
  responseJson(res, status, { ok: false, error: { code, message } })
}

function localSocket(req: IncomingMessage): boolean {
  const address = req.socket.remoteAddress
  return address === '127.0.0.1' || address === '::1' || address === '::ffff:127.0.0.1'
}

function sameOriginPost(req: IncomingMessage): boolean {
  if (req.headers['sec-fetch-site'] === 'cross-site') return false
  const origin = req.headers.origin
  if (origin === undefined) return ['same-origin', 'same-site', 'none'].includes(req.headers['sec-fetch-site'] ?? '')
  const host = req.headers.host
  if (host === undefined) return false
  try {
    const parsed = new URL(origin)
    return (parsed.protocol === 'http:' || parsed.protocol === 'https:') && parsed.host === host
  } catch { return false }
}

async function readJson(req: IncomingMessage, maxBytes = 64 * 1024): Promise<unknown> {
  const contentType = req.headers['content-type']?.split(';', 1)[0]?.trim().toLowerCase()
  if (contentType !== 'application/json') throw new TypeError('Content-Type must be application/json')
  const chunks: Buffer[] = []
  let size = 0
  for await (const chunk of req) {
    const bytes = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)
    size += bytes.length
    if (size > maxBytes) throw new RangeError(`request body exceeds ${String(maxBytes)} bytes`)
    chunks.push(bytes)
  }
  if (chunks.length === 0) throw new TypeError('request body is empty')
  return JSON.parse(Buffer.concat(chunks).toString('utf8')) as unknown
}

function parseRequest(value: unknown): RequestBody {
  if (!isRecord(value) || typeof value.action !== 'string') throw new TypeError('request action is required')
  if (value.action === 'save') {
    if (!Number.isSafeInteger(value.expectedRevision) || (value.expectedRevision as number) < 0) throw new TypeError('expectedRevision must be a non-negative integer')
    if (!isRecord(value.value)) throw new TypeError('save.value must be an object')
    return { action: 'save', expectedRevision: value.expectedRevision as number, value: value.value as UnlimitedOCRConfig }
  }
  if (value.action === 'credentialSet') {
    if (typeof value.ref !== 'string' || typeof value.value !== 'string') throw new TypeError('credentialSet requires string ref and value')
    if (value.value.trim().length === 0 || value.value.length > 8192) throw new TypeError('credential value must contain 1-8192 characters')
    return { action: 'credentialSet', ref: value.ref, value: value.value.trim() }
  }
  if (value.action === 'credentialUnset') {
    if (typeof value.ref !== 'string') throw new TypeError('credentialUnset requires a string ref')
    return { action: 'credentialUnset', ref: value.ref }
  }
  throw new TypeError(`unsupported action: ${value.action}`)
}

function messageOf(error: unknown): string {
  return error instanceof Error ? error.message : String(error)
}

export class UnlimitedOCRWebBackend {
  constructor(private readonly ctx: Context) {}

  private async credentialStatus(ref: CredentialRef): Promise<CredentialStatus> {
    const status = await this.ctx.credentials.describe(ref)
    return {
      ref: String(ref),
      configured: status.configured,
      ...(status.source === undefined ? {} : { source: status.source }),
      writable: status.writable,
    }
  }

  async snapshot(): Promise<UnlimitedOCRSettingsSnapshot> {
    const descriptor = descriptorOf(this.ctx)
    const value = descriptor.value as UnlimitedOCRConfig
    const config = resolveConfig(value)
    const [apiKey, secretKey, localApiKey] = await Promise.all([
      this.credentialStatus(config.apiKeyCredential),
      this.credentialStatus(config.secretKeyCredential),
      this.credentialStatus(config.localApiKeyCredential),
    ])
    let uvPath: string | undefined
    try { uvPath = await this.ctx.subprocess.resolveExecutable(config.uvPath) } catch { uvPath = undefined }
    return {
      schemaVersion: 1,
      writable: this.ctx.settings.writable,
      settings: { value, revision: descriptor.revision, applies: 'live' },
      credentials: { apiKey, secretKey, localApiKey },
      runtime: { uvAvailable: uvPath !== undefined, ...(uvPath === undefined ? {} : { uvPath }) },
      release: { pluginVersion: PLUGIN_VERSION, upstreamRepository: UPSTREAM_REPOSITORY, upstreamCommit: UPSTREAM_COMMIT },
    }
  }

  private assertCurrentRef(ref: string): void {
    const config = resolveConfig(descriptorOf(this.ctx).value as UnlimitedOCRConfig)
    const allowed = [config.apiKeyCredential, config.secretKeyCredential, config.localApiKeyCredential].map(String)
    if (!allowed.includes(ref)) throw new Error('credential reference changed; refresh the page and retry')
    credentialRef(ref)
  }

  async handle(req: IncomingMessage, res: ServerResponse): Promise<void> {
    if (!localSocket(req)) {
      fail(res, 403, 'local-only', 'Unlimited-OCR Settings are writable from the local DSH Web application only')
      return
    }
    if (req.method === 'GET') {
      try { responseJson(res, 200, { ok: true, value: await this.snapshot() }) }
      catch (error) {
        this.ctx.logger.warn('dsh-unlimited-ocr-skill Settings snapshot failed: %s', messageOf(error))
        fail(res, 503, 'settings-unavailable', 'Unlimited-OCR Settings are unavailable')
      }
      return
    }
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'GET, POST')
      fail(res, 405, 'method-not-allowed', 'Use GET or POST')
      return
    }
    if (!sameOriginPost(req)) {
      fail(res, 403, 'origin-rejected', 'The request must originate from this DSH Web application')
      return
    }
    let request: RequestBody
    try { request = parseRequest(await readJson(req)) }
    catch (error) {
      fail(res, error instanceof RangeError ? 413 : 400, 'invalid-request', messageOf(error))
      return
    }
    try {
      if (request.action === 'save') {
        resolveConfig(request.value)
        await this.ctx.settings.replace(UNLIMITED_OCR_SETTINGS_NAMESPACE, request.value as object, request.expectedRevision)
      } else if (request.action === 'credentialSet') {
        this.assertCurrentRef(request.ref)
        await this.ctx.credentials.set(credentialRef(request.ref), request.value)
      } else {
        this.assertCurrentRef(request.ref)
        await this.ctx.credentials.unset(credentialRef(request.ref))
      }
      responseJson(res, 200, { ok: true, value: await this.snapshot() })
    } catch (error) {
      const conflict = error instanceof SettingsConflictError
      this.ctx.logger.warn('dsh-unlimited-ocr-skill Web action=%s failed: %s', request.action, messageOf(error))
      fail(res, conflict ? 409 : 400, conflict ? 'settings-conflict' : 'request-rejected', messageOf(error))
    }
  }
}

export function installUnlimitedOCRWeb(ctx: Context, backend: UnlimitedOCRWebBackend): void {
  ctx.inject(['webServer'], webCtx => {
    webCtx.effect(() => webCtx.webServer.register({
      kind: 'exact',
      path: SETTINGS_ROUTE,
      handler: (req, res) => backend.handle(req, res),
    }), 'dsh-unlimited-ocr-skill: Web Settings route')
  })
}

