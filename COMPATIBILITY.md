# DSH compatibility evidence

This document records disposable-profile evidence for
`dsh-unlimited-ocr-skill@0.2.1`. It is compatibility evidence for the declared
DSH versions, not an independent security audit and not proof of a real user's
Profile or OCR credentials.

## Verified matrix

Tested on 2026-09-02 with macOS 27.0 arm64, Node.js 22.23.1, pnpm 11.7.0,
Python 3.9.6, and uv 0.11.3.

| DSH release | Install | Config composition | Cold Web start | Settings route | Uninstall |
| --- | --- | --- | --- | --- | --- |
| `0.1.2-alpha.3` | passed | passed | passed | passed | passed |
| `0.1.2-alpha.4` | passed | passed | passed | passed | passed |
| `0.1.2-alpha.5` | passed | passed | passed | passed | passed |

For each release, the acceptance run creates a new temporary `DSH_HOME`, uses
the matching official `@deepseek-ai/dsh` CLI to install this repository into the
disposable `web` Profile, requires `--dump-config` to contain the plugin-owned
`unlimited-ocr-skill` entry, cold-starts DSH Web on loopback, and requires both
the authenticated Web root and `/_dsh/unlimited-ocr/settings` to return HTTP
200. The Settings snapshot must report plugin version `0.2.1`. Official CLI
removal must then leave neither the Profile dependency nor the composed Patch
entry.

The loopback processes are stopped after each run. No existing DSH Profile is
read or modified. The checks do not call Baidu Cloud or a local/remote OCR model
because those operations require user-owned endpoints, credentials, and test
data.

The corresponding machine-readable build-dsh-plugin evidence input is
[`evidence/dsh-profile-audit-2026-09-02.json`](evidence/dsh-profile-audit-2026-09-02.json).

## Reproduction outline

Run the following once per exact release, replacing `<release>` and
`<repository>`:

```bash
export DSH_HOME="$(mktemp -d)"
pnpm --package "@deepseek-ai/dsh@<release>" dlx dsh plugin --profile web add <repository>
pnpm --package "@deepseek-ai/dsh@<release>" dlx dsh --profile web --dump-config
pnpm --package "@deepseek-ai/dsh@<release>" dlx dsh --profile web --no-open --host 127.0.0.1 --port 0
pnpm --package "@deepseek-ai/dsh@<release>" dlx dsh plugin --profile web remove dsh-unlimited-ocr-skill
```

Stop the foreground Web process before uninstalling. Never point this procedure
at a real `DSH_HOME`.
