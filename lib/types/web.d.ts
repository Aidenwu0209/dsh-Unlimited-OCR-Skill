/** Local, same-origin Web backend for the dedicated Unlimited-OCR Settings page. */
import type { IncomingMessage, ServerResponse } from 'node:http';
import type { Context } from '@deepseek-ai/cordis';
import { type UnlimitedOCRConfig } from './config.js';
export declare const SETTINGS_ROUTE = "/_dsh/unlimited-ocr/settings";
interface CredentialStatus {
    ref: string;
    configured: boolean;
    source?: string;
    writable: boolean;
}
export interface UnlimitedOCRSettingsSnapshot {
    schemaVersion: 1;
    writable: boolean;
    settings: {
        value: UnlimitedOCRConfig;
        revision: number;
        applies: 'live';
    };
    credentials: {
        apiKey: CredentialStatus;
        secretKey: CredentialStatus;
        localApiKey: CredentialStatus;
    };
    runtime: {
        uvAvailable: boolean;
        uvPath?: string;
    };
    release: {
        pluginVersion: string;
        upstreamRepository: string;
        upstreamCommit: string;
    };
}
export declare class UnlimitedOCRWebBackend {
    private readonly ctx;
    constructor(ctx: Context);
    private credentialStatus;
    snapshot(): Promise<UnlimitedOCRSettingsSnapshot>;
    private assertCurrentRef;
    handle(req: IncomingMessage, res: ServerResponse): Promise<void>;
}
export declare function installUnlimitedOCRWeb(ctx: Context, backend: UnlimitedOCRWebBackend): void;
export {};
//# sourceMappingURL=web.d.ts.map