import { describe, expect, it } from 'vitest'
import { resolveConfig } from '../src/config.js'

describe('resolveConfig', () => {
  it('materializes safe defaults', () => {
    const value = resolveConfig()
    expect(value).toMatchObject({
      provider: 'baidu', localBaseUrl: 'http://127.0.0.1:10000', localBackend: 'sglang', model: 'Unlimited-OCR',
      timeoutSeconds: 1200, pollIntervalSeconds: 5, pdfDpi: 200, localMaxPages: 64, uvPath: 'uv', resultDirectory: '.dsh-unlimited-ocr/results',
    })
    expect(String(value.apiKeyCredential)).toBe('UNLIMITED_OCR_API_KEY')
    expect(String(value.secretKeyCredential)).toBe('UNLIMITED_OCR_SECRET_KEY')
  })

  it('accepts HTTPS and loopback HTTP model services', () => {
    expect(resolveConfig({ provider: 'local', localBaseUrl: 'https://ocr.example.test/api/' }).localBaseUrl).toBe('https://ocr.example.test/api')
    expect(resolveConfig({ localBaseUrl: 'http://localhost:10000/' }).localBaseUrl).toBe('http://localhost:10000')
  })

  it.each([
    [{ provider: 'unknown' }, /baidu or local/],
    [{ localBackend: 'other' }, /sglang or openai/],
    [{ localBaseUrl: 'http://example.test' }, /HTTPS/],
    [{ localBaseUrl: 'https://user:pass@example.test' }, /credentials/],
    [{ resultDirectory: '../escape' }, /inside/],
    [{ timeoutSeconds: 1 }, /between 30 and 7200/],
    [{ pdfDpi: 20 }, /between 72 and 600/],
  ])('rejects unsafe configuration %j', (input, pattern) => {
    expect(() => resolveConfig(input)).toThrow(pattern)
  })
})

