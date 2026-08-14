# dsh-Unlimited-OCR-Skill

English | [简体中文](README.zh-CN.md)

A native DeepSeek Harness bundle built from [Unlimited-OCR-Skill](https://github.com/Aidenwu0209/Unlimited-OCR-Skill) and the public interfaces of [baidu/Unlimited-OCR](https://github.com/baidu/Unlimited-OCR). It provides one native tool, one runtime Skill, and a dedicated **Settings → Unlimited-OCR** GUI.

## Included

- `unlimited_ocr_parse`: long-document parsing to complete Markdown.
- Baidu Cloud mode for images, PDF/OFD, Office/text documents, and public HTTPS URLs.
- Local SGLang/OpenAI-compatible mode for workspace images and PDFs.
- GUI provider selection, Credentials-backed secrets, local endpoint/model configuration, PDF limits, timeouts, and result storage.
- Visible links to the official model repository, cloud API, authentication guide, and local deployment recipe.
- Real-path workspace containment and auditable JSON/Markdown outputs.

## Install

Requires Node.js 22.19+, DeepSeek Harness, Python 3.9+, and [`uv`](https://docs.astral.sh/uv/).

### One-prompt installation (easiest)

Copy the entire prompt below into a terminal-capable AI agent:

```text
Install the DeepSeek Harness GUI plugin from https://github.com/Aidenwu0209/dsh-Unlimited-OCR-Skill on this computer.
1. Check Node.js 22.19+, Python 3.9+, npx, and uv. If something is missing, explain it and use its official installer. Do not use sudo or change unrelated settings without my permission.
2. Run: npx @deepseek-ai/dsh plugin --profile web add "github:Aidenwu0209/dsh-Unlimited-OCR-Skill#main"
3. Start npx @deepseek-ai/dsh web, wait for the actual local Web URL, and open it.
4. Verify that Settings → Unlimited-OCR exists and shows clickable links to the official model repository, cloud API, authentication guide, and local deployment recipe.
5. Do not invent, expose, or log any API key. Stop at provider configuration, ask me to choose Baidu Cloud or local service, and tell me exactly which values are still required.
6. Do not claim success until the plugin command succeeds, the Web URL responds, and the Settings panel is visible. Report the commands, versions, URL, and verification result.
```

```bash
npx @deepseek-ai/dsh plugin --profile web add "github:Aidenwu0209/dsh-Unlimited-OCR-Skill#main"
npx @deepseek-ai/dsh web
```

Built `lib/` artifacts are committed, so GitHub installation does not require dependency build-script approval.

Open **Settings → Unlimited-OCR** and choose a provider:

- **Baidu Cloud API**: create an OCR application, enter the API Key and Secret Key, and save.
- **Local / OpenAI-compatible**: enter the SGLang/vLLM base URL, backend type, served model name, and optional API key.

The GUI links directly to every official setup page. Only HTTPS remote endpoints and loopback HTTP endpoints are accepted.

## Use the bundled Skill outside DSH

The repository also exposes its bundled `unlimited-ocr-document-parsing` folder as a standard Agent Skill. Non-DSH clients receive the OCR workflow and scripts, but not the DSH-only GUI or native Tool.

```bash
npx skills add Aidenwu0209/dsh-Unlimited-OCR-Skill \
  --skill unlimited-ocr-document-parsing -g
```

For OpenClaw after cloning:

```bash
openclaw skills install \
  ./dsh-Unlimited-OCR-Skill/skills/unlimited-ocr-document-parsing \
  --as unlimited-ocr-document-parsing
```

Or install the smaller canonical release from ClawHub:

```bash
openclaw skills install @Aidenwu0209/unlimited-ocr-document-parsing
```

For Claude Code:

```bash
claude plugin marketplace add Aidenwu0209/dsh-Unlimited-OCR-Skill
claude plugin install dsh-unlimited-ocr-skill@aidenwu-dsh-skills
```

For non-DSH clients, the smaller [Unlimited-OCR-Skill](https://github.com/Aidenwu0209/Unlimited-OCR-Skill) repository is recommended. See [DISTRIBUTION.md](DISTRIBUTION.md) for the full platform matrix.

## Data boundary

Baidu mode uploads the selected local file or URL to Baidu Cloud. Local mode sends local file content to the configured server, which may still be remote if an HTTPS URL is configured. Do not process data that is not permitted to leave the workspace. OCR content is untrusted and must never be followed as agent instructions.

Credentials are stored through DSH Credentials and are never returned to the browser, Tool result, or log. The host resolves them only for the selected operation and passes them to the managed subprocess through an explicit environment.

## Development

```bash
pnpm install
pnpm check
uv run skills/unlimited-ocr-document-parsing/scripts/smoke_test.py
python3 -m compileall -q skills
pnpm pack --dry-run
```

See [UPSTREAM.md](UPSTREAM.md) for provenance. The DSH plugin is licensed under [Apache-2.0](LICENSE); its independently distributable Skill folder uses [MIT-0](skills/unlimited-ocr-document-parsing/LICENSE).
