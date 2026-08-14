/** Load the adapted Unlimited-OCR skill as a runtime DSH skill. */
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const PACKAGE_ROOT = dirname(fileURLToPath(new URL('../package.json', import.meta.url)));
const DESCRIPTION = 'Parse long images, PDFs, OFD, Office documents, and text files with the native unlimited_ocr_parse DSH tool using Baidu Cloud or a configured local Unlimited-OCR server.';
function withoutFrontmatter(markdown) {
    if (!markdown.startsWith('---\n'))
        return markdown.trim();
    const end = markdown.indexOf('\n---\n', 4);
    return (end === -1 ? markdown : markdown.slice(end + 5)).trim();
}
export async function loadUnlimitedOCRSkill() {
    const directory = join(PACKAGE_ROOT, 'skills', 'unlimited-ocr-document-parsing');
    const path = join(directory, 'SKILL.md');
    const markdown = await readFile(path, 'utf8');
    return {
        name: 'unlimited-ocr-document-parsing',
        description: DESCRIPTION,
        whenToUse: DESCRIPTION,
        source: 'runtime',
        path,
        content: withoutFrontmatter(markdown),
        metadata: { provider: 'dsh-unlimited-ocr-skill', resourceBase: directory },
    };
}
//# sourceMappingURL=skills.js.map