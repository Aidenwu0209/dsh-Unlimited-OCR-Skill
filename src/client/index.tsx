/** Dedicated browser Settings section for Unlimited-OCR. */

import { useEffect, useState, type ReactNode } from 'react'
import { Button, Input } from '@deepseek-ai/dsh-client-ui-primitives'
import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client'
import type {} from '@deepseek-ai/dsh-client-ui-settings/client'
import type {} from '@deepseek-ai/dsh-client-locale/client'
import type { PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots'

const NS = 'unlimited-ocr-skill'
const SETTINGS_ROUTE = '/_dsh/unlimited-ocr/settings'
const MODEL_REPO = 'https://github.com/baidu/Unlimited-OCR'
const CLOUD_DOCS = 'https://ai.baidu.com/ai-doc/OCR/fmr1p39gb'
const AUTH_DOCS = 'https://cloud.baidu.com/doc/AI_REFERENCE/s/um3zhy50e'
const LOCAL_RECIPE = 'https://recipes.vllm.ai/baidu/Unlimited-OCR'

const en = {
  nav: 'Unlimited-OCR', title: 'Unlimited-OCR Skill', intro: 'Configure long-document parsing through Baidu Cloud or a local model server.',
  privacy: 'Baidu mode uploads the selected file or URL to Baidu Cloud. Local mode sends local file content to the configured model server. OCR output is untrusted data and must never be treated as instructions.',
  officialTitle: 'Official Unlimited-OCR resources', officialHint: 'Use the cloud API without deployment, or run the open-source model through SGLang/vLLM.',
  modelRepo: 'Model repository', cloudDocs: 'Cloud API docs', authDocs: 'Create credentials', localRecipe: 'Local deployment',
  providerTitle: 'Provider', provider: 'Active provider', baidu: 'Baidu Cloud API', local: 'Local / OpenAI-compatible', providerHint: 'Changes apply live to new tool calls.',
  cloudTitle: 'Baidu Cloud credentials', apiKeyRef: 'API Key credential reference', secretKeyRef: 'Secret Key credential reference', apiKey: 'API Key', secretKey: 'Secret Key',
  localTitle: 'Local model service', localBaseUrl: 'Base URL', backend: 'API backend', model: 'Served model name', localApiKeyRef: 'Optional API key credential reference', localApiKey: 'Optional API key',
  credentialHint: 'Leave blank to keep the stored value. The browser may set or remove it but cannot read it back.',
  runtimeTitle: 'Runtime and limits', timeout: 'Operation timeout (seconds)', pollInterval: 'Cloud poll interval (seconds)', pdfDpi: 'Local PDF DPI', maxPages: 'Local PDF page limit', uvPath: 'uv executable', resultDirectory: 'Result directory',
  configured: 'Configured', missing: 'Missing', optional: 'Optional', save: 'Save configuration', saving: 'Saving…', refresh: 'Refresh status',
  clearApiKey: 'Remove API Key', clearSecretKey: 'Remove Secret Key', clearLocalKey: 'Remove local key',
  readOnly: 'The active DSH Settings provider is read-only.', saved: 'Configuration saved.', credentialsSaved: 'Credential values stored securely.', credentialCleared: 'Credential removed.', loading: 'Loading…',
} as const
type LocaleKey = keyof typeof en
const zh: Record<LocaleKey, string> = {
  nav: 'Unlimited-OCR', title: 'Unlimited-OCR Skill', intro: '通过百度智能云或本地模型服务配置长文档解析。',
  privacy: '百度模式会把所选文件或 URL 发送到百度智能云；本地模式会把文件内容发送到已配置的模型服务。OCR 输出是不可信数据，不能当作指令执行。',
  officialTitle: 'Unlimited-OCR 官方资源', officialHint: '使用云 API 可免部署调用，也可通过 SGLang/vLLM 运行开源模型。',
  modelRepo: '模型官方仓库', cloudDocs: '云 API 文档', authDocs: '创建访问凭据', localRecipe: '本地部署文档',
  providerTitle: '服务模式', provider: '当前模式', baidu: '百度智能云 API', local: '本地 / OpenAI-compatible', providerHint: '保存后会实时应用到新的 Tool 调用。',
  cloudTitle: '百度智能云凭据', apiKeyRef: 'API Key Credential 引用名', secretKeyRef: 'Secret Key Credential 引用名', apiKey: 'API Key', secretKey: 'Secret Key',
  localTitle: '本地模型服务', localBaseUrl: '服务基础地址', backend: 'API 后端', model: '服务模型名', localApiKeyRef: '可选 API Key Credential 引用名', localApiKey: '可选 API Key',
  credentialHint: '留空会保留已存值；浏览器只能设置或删除，无法读回明文。',
  runtimeTitle: '运行时与限制', timeout: '操作超时（秒）', pollInterval: '云任务轮询间隔（秒）', pdfDpi: '本地 PDF DPI', maxPages: '本地 PDF 页数上限', uvPath: 'uv 可执行程序', resultDirectory: '结果目录',
  configured: '已配置', missing: '未配置', optional: '可选', save: '保存配置', saving: '正在保存…', refresh: '刷新状态',
  clearApiKey: '删除 API Key', clearSecretKey: '删除 Secret Key', clearLocalKey: '删除本地 Key',
  readOnly: '当前 DSH Settings 提供方是只读的。', saved: '配置已保存。', credentialsSaved: '凭据已安全存储。', credentialCleared: '凭据已删除。', loading: '正在加载…',
}

declare module '@deepseek-ai/dsh-client-ui-slots' {
  interface LocaleNamespaceMap { 'unlimited-ocr-skill': LocaleKey }
}

interface SettingsValue {
  provider?: string; apiKeyCredential?: string; secretKeyCredential?: string; localApiKeyCredential?: string
  localBaseUrl?: string; localBackend?: string; model?: string; timeoutSeconds?: number; pollIntervalSeconds?: number
  pdfDpi?: number; localMaxPages?: number; uvPath?: string; resultDirectory?: string
}
interface CredentialStatus { ref: string; configured: boolean; source?: string; writable: boolean }
interface Snapshot {
  schemaVersion: 1
  writable: boolean
  settings: { value: SettingsValue; revision: number; applies: 'live' }
  credentials: { apiKey: CredentialStatus; secretKey: CredentialStatus; localApiKey: CredentialStatus }
  runtime: { uvAvailable: boolean; uvPath?: string }
  release: { pluginVersion: string; upstreamRepository: string; upstreamCommit: string }
}
interface ApiSuccess<T> { ok: true; value: T }
interface ApiFailure { ok: false; error: { code: string; message: string } }

async function api<T>(body?: unknown): Promise<T> {
  const response = await fetch(SETTINGS_ROUTE, body === undefined ? { credentials: 'same-origin' } : {
    method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
  })
  const parsed = await response.json() as ApiSuccess<T> | ApiFailure
  if (!response.ok || !parsed.ok) throw new Error((parsed as ApiFailure).error?.message ?? `HTTP ${response.status}`)
  return parsed.value
}

interface Draft {
  provider: string; apiKeyCredential: string; secretKeyCredential: string; localApiKeyCredential: string
  apiKey: string; secretKey: string; localApiKey: string; localBaseUrl: string; localBackend: string; model: string
  timeoutSeconds: string; pollIntervalSeconds: string; pdfDpi: string; localMaxPages: string; uvPath: string; resultDirectory: string
}

function draftOf(snapshot: Snapshot): Draft {
  const value = snapshot.settings.value
  return {
    provider: value.provider ?? 'baidu',
    apiKeyCredential: value.apiKeyCredential ?? 'UNLIMITED_OCR_API_KEY',
    secretKeyCredential: value.secretKeyCredential ?? 'UNLIMITED_OCR_SECRET_KEY',
    localApiKeyCredential: value.localApiKeyCredential ?? 'UNLIMITED_OCR_LOCAL_API_KEY',
    apiKey: '', secretKey: '', localApiKey: '',
    localBaseUrl: value.localBaseUrl ?? 'http://127.0.0.1:10000', localBackend: value.localBackend ?? 'sglang', model: value.model ?? 'Unlimited-OCR',
    timeoutSeconds: String(value.timeoutSeconds ?? 1200), pollIntervalSeconds: String(value.pollIntervalSeconds ?? 5),
    pdfDpi: String(value.pdfDpi ?? 200), localMaxPages: String(value.localMaxPages ?? 64),
    uvPath: value.uvPath ?? 'uv', resultDirectory: value.resultDirectory ?? '.dsh-unlimited-ocr/results',
  }
}

function integer(raw: string, label: string, min: number, max: number): number {
  const value = Number(raw)
  if (!Number.isSafeInteger(value) || value < min || value > max) throw new Error(`${label}: ${min}-${max}`)
  return value
}

type Translate = (key: LocaleKey) => string
type SettingsProps = PropsRuntime<'settings.section'> & { t?: Translate }
function Field({ label, hint, children }: { label: string; hint?: string | undefined; children: ReactNode }) {
  return <label className="uos-field"><span>{label}</span>{children}{hint === undefined ? null : <small>{hint}</small>}</label>
}

function SettingsSection({ t = key => en[key] }: SettingsProps) {
  const [snapshot, setSnapshot] = useState<Snapshot>()
  const [draft, setDraft] = useState<Draft>()
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState<string>()
  const [error, setError] = useState<string>()

  const load = async (): Promise<void> => {
    setError(undefined)
    try { const next = await api<Snapshot>(); setSnapshot(next); setDraft(draftOf(next)) }
    catch (reason) { setError(reason instanceof Error ? reason.message : String(reason)) }
  }
  useEffect(() => { void load() }, [])
  if (snapshot === undefined || draft === undefined) return <div className="uos-settings"><p>{error ?? t('loading')}</p><Button variant="outline" onClick={() => { void load() }}>{t('refresh')}</Button></div>

  const update = <K extends keyof Draft>(key: K, value: Draft[K]): void => setDraft(current => current === undefined ? current : { ...current, [key]: value })
  const save = async (): Promise<void> => {
    setBusy(true); setError(undefined); setMessage(undefined)
    try {
      const value: SettingsValue = {
        provider: draft.provider, apiKeyCredential: draft.apiKeyCredential.trim(), secretKeyCredential: draft.secretKeyCredential.trim(), localApiKeyCredential: draft.localApiKeyCredential.trim(),
        localBaseUrl: draft.localBaseUrl.trim(), localBackend: draft.localBackend, model: draft.model.trim(),
        timeoutSeconds: integer(draft.timeoutSeconds, 'timeout', 30, 7200), pollIntervalSeconds: integer(draft.pollIntervalSeconds, 'poll interval', 1, 60),
        pdfDpi: integer(draft.pdfDpi, 'PDF DPI', 72, 600), localMaxPages: integer(draft.localMaxPages, 'page limit', 1, 500),
        uvPath: draft.uvPath.trim(), resultDirectory: draft.resultDirectory.trim(),
      }
      let next = await api<Snapshot>({ action: 'save', expectedRevision: snapshot.settings.revision, value })
      let credentialChanged = false
      const pending: Array<[CredentialStatus, string]> = [
        [next.credentials.apiKey, draft.apiKey], [next.credentials.secretKey, draft.secretKey], [next.credentials.localApiKey, draft.localApiKey],
      ]
      for (const [status, secret] of pending) {
        if (secret.length > 0) { next = await api<Snapshot>({ action: 'credentialSet', ref: status.ref, value: secret }); credentialChanged = true }
      }
      setSnapshot(next); setDraft(draftOf(next)); setMessage(`${t('saved')}${credentialChanged ? ` ${t('credentialsSaved')}` : ''}`)
    } catch (reason) { setError(reason instanceof Error ? reason.message : String(reason)) } finally { setBusy(false) }
  }
  const clearCredential = async (status: CredentialStatus): Promise<void> => {
    setBusy(true); setError(undefined); setMessage(undefined)
    try { const next = await api<Snapshot>({ action: 'credentialUnset', ref: status.ref }); setSnapshot(next); setDraft(draftOf(next)); setMessage(t('credentialCleared')) }
    catch (reason) { setError(reason instanceof Error ? reason.message : String(reason)) } finally { setBusy(false) }
  }

  const cloudReady = snapshot.credentials.apiKey.configured && snapshot.credentials.secretKey.configured
  return <div className="uos-settings">
    <header><div><span className="uos-kicker">DSH native plugin</span><h2>{t('title')}</h2><p>{t('intro')}</p></div><code>v{snapshot.release.pluginVersion}</code></header>
    <div className="uos-notice">{t('privacy')}</div>
    <section className="uos-official"><div className="uos-official-copy"><h3>{t('officialTitle')}</h3><p>{t('officialHint')}</p><a className="uos-official-url" href={MODEL_REPO} target="_blank" rel="noopener noreferrer">{MODEL_REPO}</a></div><div className="uos-links">
      <a className="uos-link primary" href={MODEL_REPO} target="_blank" rel="noopener noreferrer">{t('modelRepo')} ↗</a>
      <a className="uos-link" href={CLOUD_DOCS} target="_blank" rel="noopener noreferrer">{t('cloudDocs')} ↗</a>
      <a className="uos-link" href={AUTH_DOCS} target="_blank" rel="noopener noreferrer">{t('authDocs')} ↗</a>
      <a className="uos-link" href={LOCAL_RECIPE} target="_blank" rel="noopener noreferrer">{t('localRecipe')} ↗</a>
    </div></section>
    {!snapshot.writable ? <div className="uos-warning">{t('readOnly')}</div> : null}
    {message === undefined ? null : <div className="uos-success">{message}</div>}
    {error === undefined ? null : <div className="uos-error">{error}</div>}
    <section><div className="uos-title"><h3>{t('providerTitle')}</h3><span className="uos-badge ok">{draft.provider === 'baidu' ? t('baidu') : t('local')}</span></div><Field label={t('provider')} hint={t('providerHint')}><select value={draft.provider} onChange={event => { update('provider', event.target.value) }}><option value="baidu">{t('baidu')}</option><option value="local">{t('local')}</option></select></Field></section>
    <section className={draft.provider === 'baidu' ? '' : 'uos-inactive'}><div className="uos-title"><h3>{t('cloudTitle')}</h3><span className={`uos-badge ${cloudReady ? 'ok' : ''}`}>{cloudReady ? t('configured') : t('missing')}</span></div><div className="uos-grid">
      <Field label={t('apiKeyRef')} hint={snapshot.credentials.apiKey.source}><Input value={draft.apiKeyCredential} onChange={event => { update('apiKeyCredential', event.target.value) }} /></Field>
      <Field label={t('secretKeyRef')} hint={snapshot.credentials.secretKey.source}><Input value={draft.secretKeyCredential} onChange={event => { update('secretKeyCredential', event.target.value) }} /></Field>
      <Field label={t('apiKey')} hint={t('credentialHint')}><Input type="password" autoComplete="new-password" value={draft.apiKey} onChange={event => { update('apiKey', event.target.value) }} /></Field>
      <Field label={t('secretKey')} hint={t('credentialHint')}><Input type="password" autoComplete="new-password" value={draft.secretKey} onChange={event => { update('secretKey', event.target.value) }} /></Field>
    </div></section>
    <section className={draft.provider === 'local' ? '' : 'uos-inactive'}><div className="uos-title"><h3>{t('localTitle')}</h3><span className={`uos-badge ${draft.localBaseUrl ? 'ok' : ''}`}>{draft.localBaseUrl ? t('configured') : t('missing')}</span></div><div className="uos-grid">
      <Field label={t('localBaseUrl')}><Input value={draft.localBaseUrl} onChange={event => { update('localBaseUrl', event.target.value) }} /></Field>
      <Field label={t('backend')}><select value={draft.localBackend} onChange={event => { update('localBackend', event.target.value) }}><option value="sglang">SGLang</option><option value="openai">OpenAI-compatible</option></select></Field>
      <Field label={t('model')}><Input value={draft.model} onChange={event => { update('model', event.target.value) }} /></Field>
      <Field label={t('localApiKeyRef')} hint={snapshot.credentials.localApiKey.source}><Input value={draft.localApiKeyCredential} onChange={event => { update('localApiKeyCredential', event.target.value) }} /></Field>
      <Field label={t('localApiKey')} hint={t('credentialHint')}><Input type="password" autoComplete="new-password" value={draft.localApiKey} onChange={event => { update('localApiKey', event.target.value) }} /></Field>
    </div></section>
    <section><div className="uos-title"><h3>{t('runtimeTitle')}</h3><span className={`uos-badge ${snapshot.runtime.uvAvailable ? 'ok' : ''}`}>uv {snapshot.runtime.uvAvailable ? t('configured') : t('missing')}</span></div><div className="uos-grid">
      <Field label={t('timeout')}><Input inputMode="numeric" value={draft.timeoutSeconds} onChange={event => { update('timeoutSeconds', event.target.value) }} /></Field>
      <Field label={t('pollInterval')}><Input inputMode="numeric" value={draft.pollIntervalSeconds} onChange={event => { update('pollIntervalSeconds', event.target.value) }} /></Field>
      <Field label={t('pdfDpi')}><Input inputMode="numeric" value={draft.pdfDpi} onChange={event => { update('pdfDpi', event.target.value) }} /></Field>
      <Field label={t('maxPages')}><Input inputMode="numeric" value={draft.localMaxPages} onChange={event => { update('localMaxPages', event.target.value) }} /></Field>
      <Field label={t('uvPath')} hint={snapshot.runtime.uvPath}><Input value={draft.uvPath} onChange={event => { update('uvPath', event.target.value) }} /></Field>
      <Field label={t('resultDirectory')}><Input value={draft.resultDirectory} onChange={event => { update('resultDirectory', event.target.value) }} /></Field>
    </div></section>
    <div className="uos-actions"><Button variant="primary" disabled={busy || !snapshot.writable} onClick={() => { void save() }}>{busy ? t('saving') : t('save')}</Button><Button variant="outline" disabled={busy} onClick={() => { void load() }}>{t('refresh')}</Button>
      <Button variant="outline" disabled={busy || !snapshot.credentials.apiKey.configured || !snapshot.credentials.apiKey.writable} onClick={() => { void clearCredential(snapshot.credentials.apiKey) }}>{t('clearApiKey')}</Button>
      <Button variant="outline" disabled={busy || !snapshot.credentials.secretKey.configured || !snapshot.credentials.secretKey.writable} onClick={() => { void clearCredential(snapshot.credentials.secretKey) }}>{t('clearSecretKey')}</Button>
      <Button variant="outline" disabled={busy || !snapshot.credentials.localApiKey.configured || !snapshot.credentials.localApiKey.writable} onClick={() => { void clearCredential(snapshot.credentials.localApiKey) }}>{t('clearLocalKey')}</Button>
    </div>
  </div>
}

const CSS = `.uos-settings{display:grid;gap:14px;max-width:940px;padding:8px 2px 32px;color:var(--dsw-alias-fg-primary,#26231f)}.uos-settings header{display:flex;align-items:flex-start;justify-content:space-between;gap:20px}.uos-settings h2{font-size:25px;margin:3px 0 6px}.uos-settings header p{margin:0;color:var(--dsw-alias-fg-muted,#77736d);font-size:13px}.uos-kicker{font-size:10px;text-transform:uppercase;letter-spacing:.1em;color:#315fb5;font-weight:700}.uos-settings section{display:grid;gap:12px;padding:15px;border:1px solid var(--dsw-alias-border-subtle,#dedbd5);border-radius:14px;background:var(--dsw-alias-bg-layer-1,#fff)}.uos-settings .uos-official{grid-template-columns:minmax(0,1fr) auto;align-items:center;border-color:rgba(42,111,164,.3);background:linear-gradient(135deg,rgba(42,111,164,.12),rgba(30,168,129,.08))}.uos-official-copy{display:grid;gap:6px;min-width:0}.uos-official-copy h3,.uos-official-copy p{margin:0}.uos-official-copy h3{font-size:15px}.uos-official-copy p{font-size:11px;line-height:1.5;color:var(--dsw-alias-fg-muted,#77736d)}.uos-official-url{width:max-content;max-width:100%;overflow-wrap:anywhere;color:#315fb5;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:12px}.uos-links{display:flex;justify-content:flex-end;gap:8px;flex-wrap:wrap;max-width:390px}.uos-link{display:inline-flex;align-items:center;justify-content:center;min-height:30px;padding:0 10px;border:1px solid rgba(42,111,164,.3);border-radius:8px;background:var(--dsw-alias-bg-layer-1,#fff);color:#315fb5;font-size:11px;font-weight:600;text-decoration:none}.uos-link:hover{text-decoration:underline}.uos-link.primary{border-color:#315fb5;background:#315fb5;color:#fff}.uos-title{display:flex;justify-content:space-between;align-items:center}.uos-title h3{font-size:14px;margin:0}.uos-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.uos-field{display:grid;gap:6px}.uos-field>span{font-size:11px;font-weight:600}.uos-field>small{font-size:10px;color:var(--dsw-alias-fg-muted,#77736d);line-height:1.4}.uos-field select{min-height:34px;border:1px solid var(--dsw-alias-border-subtle,#d5d2cc);border-radius:8px;background:var(--dsw-alias-bg-layer-1,#fff);color:inherit;padding:0 9px}.uos-badge{font-size:10px;padding:3px 7px;border-radius:99px;background:rgba(205,72,72,.1);color:#aa3939}.uos-badge.ok{background:rgba(48,154,100,.12);color:#267d52}.uos-notice,.uos-warning,.uos-success,.uos-error{padding:10px 12px;border-radius:10px;font-size:12px;line-height:1.5}.uos-notice{background:rgba(42,111,164,.09);color:#315f94}.uos-warning{background:rgba(224,162,55,.12);color:#986818}.uos-success{background:rgba(48,154,100,.1);color:#267d52}.uos-error{background:rgba(205,72,72,.1);color:#aa3939}.uos-inactive{opacity:.62}.uos-actions{display:flex;gap:8px;flex-wrap:wrap}@media(max-width:760px){.uos-grid,.uos-settings .uos-official{grid-template-columns:1fr}.uos-settings header{display:grid}.uos-links{justify-content:flex-start;max-width:none}}`

function installStyles(): () => void {
  const id = 'dsh-unlimited-ocr-skill'
  if (document.querySelector(`style[data-plugin-css="${id}"]`) !== null) return () => {}
  const style = document.createElement('style'); style.dataset.pluginCss = id; style.textContent = CSS; document.head.appendChild(style)
  return () => { style.remove() }
}

export const inject = ['slots', 'locale']
export function apply(ctx: ClientContext): void {
  ctx.effect(installStyles, 'dsh-unlimited-ocr-skill: styles')
  ctx.effect(() => ctx.locale.register(NS, { en, zh }), 'dsh-unlimited-ocr-skill: locale')
  const t = ctx.locale.bind(NS)
  ctx.slots.inject('settings.section', () => ctx.slots.register({
    name: 'settings.section', id: 'unlimited-ocr-skill', order: 36, label: () => t('nav'), inject: () => ({ t }),
  }, SettingsSection))
}

