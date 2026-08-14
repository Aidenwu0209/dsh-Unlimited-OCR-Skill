/** User-editable Unlimited-OCR provider, credential, local endpoint, and runtime configuration. */
import { isAbsolute, normalize, sep } from 'node:path';
import { credentialRef } from '@deepseek-ai/dsh-credentials';
import { settingsNamespace } from '@deepseek-ai/dsh-settings';
import z from '@deepseek-ai/schemastery';
export const UNLIMITED_OCR_SETTINGS_NAMESPACE = settingsNamespace('unlimited-ocr-skill');
export const DEFAULT_API_KEY_REF = 'UNLIMITED_OCR_API_KEY';
export const DEFAULT_SECRET_KEY_REF = 'UNLIMITED_OCR_SECRET_KEY';
export const DEFAULT_LOCAL_API_KEY_REF = 'UNLIMITED_OCR_LOCAL_API_KEY';
export const DEFAULT_LOCAL_BASE_URL = 'http://127.0.0.1:10000';
export const DEFAULT_MODEL = 'Unlimited-OCR';
export const DEFAULT_TIMEOUT_SECONDS = 1200;
export const DEFAULT_POLL_INTERVAL_SECONDS = 5;
export const DEFAULT_RESULT_DIRECTORY = '.dsh-unlimited-ocr/results';
export const DEFAULT_UV_PATH = 'uv';
export const Config = z.object({
    provider: z.string().default('baidu'),
    apiKeyCredential: z.string().default(DEFAULT_API_KEY_REF),
    secretKeyCredential: z.string().default(DEFAULT_SECRET_KEY_REF),
    localApiKeyCredential: z.string().default(DEFAULT_LOCAL_API_KEY_REF),
    localBaseUrl: z.string().default(DEFAULT_LOCAL_BASE_URL),
    localBackend: z.string().default('sglang'),
    model: z.string().default(DEFAULT_MODEL),
    timeoutSeconds: z.number().default(DEFAULT_TIMEOUT_SECONDS),
    pollIntervalSeconds: z.number().default(DEFAULT_POLL_INTERVAL_SECONDS),
    pdfDpi: z.number().default(200),
    localMaxPages: z.number().default(64),
    uvPath: z.string().default(DEFAULT_UV_PATH),
    resultDirectory: z.string().default(DEFAULT_RESULT_DIRECTORY),
});
function oneOf(raw, values, fallback, field) {
    const value = raw?.trim().toLowerCase() || fallback;
    if (!values.includes(value))
        throw new TypeError(`${field} must be ${values.join(' or ')}`);
    return value;
}
function integer(raw, fallback, min, max, field) {
    const value = raw ?? fallback;
    if (!Number.isInteger(value) || value < min || value > max)
        throw new TypeError(`${field} must be an integer between ${min} and ${max}`);
    return value;
}
function localUrl(raw) {
    const value = raw?.trim() || DEFAULT_LOCAL_BASE_URL;
    let parsed;
    try {
        parsed = new URL(value);
    }
    catch {
        throw new TypeError('localBaseUrl must be a valid URL');
    }
    if (parsed.username !== '' || parsed.password !== '')
        throw new TypeError('localBaseUrl must not contain embedded credentials');
    const loopback = parsed.protocol === 'http:' && ['127.0.0.1', 'localhost', '::1'].includes(parsed.hostname);
    if (parsed.protocol !== 'https:' && !loopback)
        throw new TypeError('localBaseUrl must use HTTPS; loopback HTTP is allowed');
    parsed.hash = '';
    return parsed.toString().replace(/\/+$/u, '');
}
function relativeResultDirectory(raw) {
    const value = raw?.trim() || DEFAULT_RESULT_DIRECTORY;
    if (value.includes('\0') || isAbsolute(value))
        throw new TypeError('resultDirectory must be a workspace-relative path');
    const normalized = normalize(value);
    if (normalized === '..' || normalized.startsWith(`..${sep}`))
        throw new TypeError('resultDirectory must stay inside the session workspace');
    return normalized;
}
function ref(raw, fallback) {
    return credentialRef(raw?.trim() || fallback);
}
export function resolveConfig(config = {}) {
    const model = config.model?.trim() || DEFAULT_MODEL;
    const uvPath = config.uvPath?.trim() || DEFAULT_UV_PATH;
    return {
        provider: oneOf(config.provider, ['baidu', 'local'], 'baidu', 'provider'),
        apiKeyCredential: ref(config.apiKeyCredential, DEFAULT_API_KEY_REF),
        secretKeyCredential: ref(config.secretKeyCredential, DEFAULT_SECRET_KEY_REF),
        localApiKeyCredential: ref(config.localApiKeyCredential, DEFAULT_LOCAL_API_KEY_REF),
        localBaseUrl: localUrl(config.localBaseUrl),
        localBackend: oneOf(config.localBackend, ['sglang', 'openai'], 'sglang', 'localBackend'),
        model,
        timeoutSeconds: integer(config.timeoutSeconds, DEFAULT_TIMEOUT_SECONDS, 30, 7200, 'timeoutSeconds'),
        pollIntervalSeconds: integer(config.pollIntervalSeconds, DEFAULT_POLL_INTERVAL_SECONDS, 1, 60, 'pollIntervalSeconds'),
        pdfDpi: integer(config.pdfDpi, 200, 72, 600, 'pdfDpi'),
        localMaxPages: integer(config.localMaxPages, 64, 1, 500, 'localMaxPages'),
        uvPath,
        resultDirectory: relativeResultDirectory(config.resultDirectory),
    };
}
//# sourceMappingURL=config.js.map