/** Unlimited-OCR profile bundle for DeepSeek Harness. */
import type { Context } from '@deepseek-ai/cordis';
import { Config, type UnlimitedOCRConfig } from './config.js';
export declare const name = "dsh-unlimited-ocr-skill";
export declare const inject: string[];
export { Config };
export declare function apply(ctx: Context, config?: UnlimitedOCRConfig): Promise<() => void>;
//# sourceMappingURL=index.d.ts.map