/** User-editable Unlimited-OCR provider, credential, local endpoint, and runtime configuration. */
import { type CredentialRef } from '@deepseek-ai/dsh-credentials';
import type Schema from '@deepseek-ai/schemastery';
export declare const UNLIMITED_OCR_SETTINGS_NAMESPACE: import("@deepseek-ai/dsh-settings").SettingsNamespace;
export declare const DEFAULT_API_KEY_REF = "UNLIMITED_OCR_API_KEY";
export declare const DEFAULT_SECRET_KEY_REF = "UNLIMITED_OCR_SECRET_KEY";
export declare const DEFAULT_LOCAL_API_KEY_REF = "UNLIMITED_OCR_LOCAL_API_KEY";
export declare const DEFAULT_LOCAL_BASE_URL = "http://127.0.0.1:10000";
export declare const DEFAULT_MODEL = "Unlimited-OCR";
export declare const DEFAULT_TIMEOUT_SECONDS = 1200;
export declare const DEFAULT_POLL_INTERVAL_SECONDS = 5;
export declare const DEFAULT_RESULT_DIRECTORY = ".dsh-unlimited-ocr/results";
export declare const DEFAULT_UV_PATH = "uv";
export interface UnlimitedOCRConfig {
    provider?: string;
    apiKeyCredential?: string;
    secretKeyCredential?: string;
    localApiKeyCredential?: string;
    localBaseUrl?: string;
    localBackend?: string;
    model?: string;
    timeoutSeconds?: number;
    pollIntervalSeconds?: number;
    pdfDpi?: number;
    localMaxPages?: number;
    uvPath?: string;
    resultDirectory?: string;
}
export interface ResolvedUnlimitedOCRConfig {
    provider: 'baidu' | 'local';
    apiKeyCredential: CredentialRef;
    secretKeyCredential: CredentialRef;
    localApiKeyCredential: CredentialRef;
    localBaseUrl: string;
    localBackend: 'sglang' | 'openai';
    model: string;
    timeoutSeconds: number;
    pollIntervalSeconds: number;
    pdfDpi: number;
    localMaxPages: number;
    uvPath: string;
    resultDirectory: string;
}
export declare const Config: Schema<UnlimitedOCRConfig>;
export declare function resolveConfig(config?: UnlimitedOCRConfig): ResolvedUnlimitedOCRConfig;
//# sourceMappingURL=config.d.ts.map