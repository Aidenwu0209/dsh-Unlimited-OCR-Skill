# Distribution and compatibility

This repository has two distinct surfaces:

1. DeepSeek Harness loads the native bundle, GUI Settings section, Tool, and Skill.
2. Other Agent Skills clients load only `skills/unlimited-ocr-document-parsing`.

| Ecosystem | Discovery/install surface | Capability |
| --- | --- | --- |
| DeepSeek Harness | `dsh plugin --profile web add github:Aidenwu0209/dsh-Unlimited-OCR-Skill#main` | Native GUI + Tool + Skill |
| dsh-plugin directories | GitHub topic `dsh-plugin` | Automatic discovery source |
| skills.sh / `skills` CLI | `npx skills add Aidenwu0209/dsh-Unlimited-OCR-Skill --skill unlimited-ocr-document-parsing` | Portable Skill only |
| Codex, Cursor, OpenCode and other `skills` clients | Install through the command above with `-a <agent>` | Portable Skill only |
| OpenClaw | Install the cloned Skill subdirectory with `openclaw skills install <path>` | Portable Skill only |
| ClawHub | `openclaw skills install @Aidenwu0209/unlimited-ocr-document-parsing` | Canonical portable Skill release |
| Claude Code | Install `dsh-unlimited-ocr-skill@aidenwu-dsh-skills` from this repository's marketplace | Portable Skill only |

For non-DSH clients, prefer `Aidenwu0209/Unlimited-OCR-Skill`: it has the same
portable Skill without the native DSH build artifacts.

## Validation commands

```bash
uvx --from git+https://github.com/agentskills/agentskills#subdirectory=skills-ref \
  skills-ref validate ./skills/unlimited-ocr-document-parsing

npx skills add . --list

npx clawhub skill publish ./skills/unlimited-ocr-document-parsing \
  --slug unlimited-ocr-document-parsing \
  --name "Unlimited-OCR Document Parsing" \
  --version 1.1.0 --dry-run --json

claude plugin validate .
pnpm check
```

The DSH plugin remains Apache-2.0. The independently distributable Skill folder
contains a separate MIT-0 license for ClawHub compatibility.
