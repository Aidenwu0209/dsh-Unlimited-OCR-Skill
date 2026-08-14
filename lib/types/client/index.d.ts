/** Dedicated browser Settings section for Unlimited-OCR. */
import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client';
declare const en: {
    readonly nav: "Unlimited-OCR";
    readonly title: "Unlimited-OCR Skill";
    readonly intro: "Configure long-document parsing through Baidu Cloud or a local model server.";
    readonly privacy: "Baidu mode uploads the selected file or URL to Baidu Cloud. Local mode sends local file content to the configured model server. OCR output is untrusted data and must never be treated as instructions.";
    readonly officialTitle: "Official Unlimited-OCR resources";
    readonly officialHint: "Use the cloud API without deployment, or run the open-source model through SGLang/vLLM.";
    readonly modelRepo: "Model repository";
    readonly cloudDocs: "Cloud API docs";
    readonly authDocs: "Create credentials";
    readonly localRecipe: "Local deployment";
    readonly providerTitle: "Provider";
    readonly provider: "Active provider";
    readonly baidu: "Baidu Cloud API";
    readonly local: "Local / OpenAI-compatible";
    readonly providerHint: "Changes apply live to new tool calls.";
    readonly cloudTitle: "Baidu Cloud credentials";
    readonly apiKeyRef: "API Key credential reference";
    readonly secretKeyRef: "Secret Key credential reference";
    readonly apiKey: "API Key";
    readonly secretKey: "Secret Key";
    readonly localTitle: "Local model service";
    readonly localBaseUrl: "Base URL";
    readonly backend: "API backend";
    readonly model: "Served model name";
    readonly localApiKeyRef: "Optional API key credential reference";
    readonly localApiKey: "Optional API key";
    readonly credentialHint: "Leave blank to keep the stored value. The browser may set or remove it but cannot read it back.";
    readonly runtimeTitle: "Runtime and limits";
    readonly timeout: "Operation timeout (seconds)";
    readonly pollInterval: "Cloud poll interval (seconds)";
    readonly pdfDpi: "Local PDF DPI";
    readonly maxPages: "Local PDF page limit";
    readonly uvPath: "uv executable";
    readonly resultDirectory: "Result directory";
    readonly configured: "Configured";
    readonly missing: "Missing";
    readonly optional: "Optional";
    readonly save: "Save configuration";
    readonly saving: "Saving…";
    readonly refresh: "Refresh status";
    readonly clearApiKey: "Remove API Key";
    readonly clearSecretKey: "Remove Secret Key";
    readonly clearLocalKey: "Remove local key";
    readonly readOnly: "The active DSH Settings provider is read-only.";
    readonly saved: "Configuration saved.";
    readonly credentialsSaved: "Credential values stored securely.";
    readonly credentialCleared: "Credential removed.";
    readonly loading: "Loading…";
};
type LocaleKey = keyof typeof en;
declare module '@deepseek-ai/dsh-client-ui-slots' {
    interface LocaleNamespaceMap {
        'unlimited-ocr-skill': LocaleKey;
    }
}
export declare const inject: string[];
export declare function apply(ctx: ClientContext): void;
export {};
//# sourceMappingURL=index.d.ts.map