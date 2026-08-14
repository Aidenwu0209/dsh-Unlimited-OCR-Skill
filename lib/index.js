/** Unlimited-OCR profile bundle for DeepSeek Harness. */
import { Config, UNLIMITED_OCR_SETTINGS_NAMESPACE, resolveConfig } from './config.js';
import { loadUnlimitedOCRSkill } from './skills.js';
import { createUnlimitedOCRTool } from './tools.js';
import { installUnlimitedOCRWeb, UnlimitedOCRWebBackend } from './web.js';
export const name = 'dsh-unlimited-ocr-skill';
export const inject = ['tools', 'credentials', 'skills', 'subprocess', 'settings'];
export { Config };
export async function apply(ctx, config = {}) {
    const settings = ctx.settings.register(UNLIMITED_OCR_SETTINGS_NAMESPACE, Config, {
        base: config,
        applies: 'live',
        validate: value => { resolveConfig(value); },
    });
    const disposers = [];
    try {
        disposers.push(ctx.skills.register(await loadUnlimitedOCRSkill()));
        disposers.push(ctx.tools.register(createUnlimitedOCRTool(ctx, () => resolveConfig(settings.get()))));
        installUnlimitedOCRWeb(ctx, new UnlimitedOCRWebBackend(ctx));
        ctx.logger.info('dsh-unlimited-ocr-skill ready: 1 skill, 1 native tool, GUI Settings available in Web profile');
    }
    catch (error) {
        for (const dispose of disposers.reverse())
            dispose();
        throw error;
    }
    return () => { for (const dispose of disposers.reverse())
        dispose(); };
}
//# sourceMappingURL=index.js.map