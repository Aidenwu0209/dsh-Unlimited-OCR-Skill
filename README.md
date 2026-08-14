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

```bash
npx @deepseek-ai/dsh plugin --profile web add "github:Aidenwu0209/dsh-Unlimited-OCR-Skill#main"
npx @deepseek-ai/dsh web
```

Built `lib/` artifacts are committed, so GitHub installation does not require dependency build-script approval.

Open **Settings → Unlimited-OCR** and choose a provider:

- **Baidu Cloud API**: create an OCR application, enter the API Key and Secret Key, and save.
- **Local / OpenAI-compatible**: enter the SGLang/vLLM base URL, backend type, served model name, and optional API key.

The GUI links directly to every official setup page. Only HTTPS remote endpoints and loopback HTTP endpoints are accepted.

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

See [UPSTREAM.md](UPSTREAM.md) for provenance. Licensed under [Apache-2.0](LICENSE).

