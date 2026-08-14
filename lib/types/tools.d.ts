/** Native DSH tool backed by the bundled Unlimited-OCR caller. */
import type { Context } from '@deepseek-ai/cordis';
import { type ToolDefinition } from '@deepseek-ai/dsh-tools';
import type { ResolvedUnlimitedOCRConfig } from './config.js';
export declare function resolveWorkspaceFile(workspace: string, raw: string): Promise<string>;
export declare function resolveResultDirectory(workspace: string, raw: string): Promise<string>;
export declare function createUnlimitedOCRTool(ctx: Context, readConfig: () => ResolvedUnlimitedOCRConfig): ToolDefinition;
//# sourceMappingURL=tools.d.ts.map