# dsh-Unlimited-OCR-Skill

[English](README.md) | 简体中文

基于 [Unlimited-OCR-Skill](https://github.com/Aidenwu0209/Unlimited-OCR-Skill) 与 [baidu/Unlimited-OCR](https://github.com/baidu/Unlimited-OCR) 公开接口实现的 DeepSeek Harness 原生 bundle，包含一个原生 Tool、一个运行时 Skill，以及专用的 **Settings → Unlimited-OCR** 图形配置页。

## 功能

- `unlimited_ocr_parse`：把长文档解析为完整 Markdown。
- 百度智能云模式：支持图片、PDF/OFD、Office/文本文档和公开 HTTPS URL。
- 本地 SGLang/OpenAI-compatible 模式：支持 workspace 内的图片与 PDF。
- GUI 可选择服务模式，管理 DSH Credentials，配置本地地址/模型、PDF 限制、超时和结果目录。
- GUI 直接显示官方模型仓库，并提供云 API、鉴权与本地部署文档的可点击入口。
- 本地输入使用真实路径边界检查，JSON/Markdown 结果可审计保存。

## 安装

要求：Node.js 22.19+、DeepSeek Harness、Python 3.9+ 和 [`uv`](https://docs.astral.sh/uv/)。

```bash
npx @deepseek-ai/dsh plugin --profile web add "github:Aidenwu0209/dsh-Unlimited-OCR-Skill#main"
npx @deepseek-ai/dsh web
```

仓库会提交构建后的 `lib/`，因此从 GitHub 安装时不需启用依赖构建脚本。

启动 Web 后打开 **Settings → Unlimited-OCR**，选择：

- **百度智能云 API**：创建 OCR 应用，填入 API Key 和 Secret Key，然后保存。
- **本地 / OpenAI-compatible**：填写 SGLang/vLLM 基础地址、后端类型、模型服务名和可选 API Key。

GUI 会直接链接所有官方配置页。远程地址必须使用 HTTPS；只有回环地址可使用 HTTP。

## 在 DSH 之外使用内置 Skill

仓库同时把 `unlimited-ocr-document-parsing` 暴露为标准 Agent Skill。非 DSH 客户端可以获得 OCR 工作流和脚本，但不会获得仅限 DSH 的 GUI 与原生 Tool。

```bash
npx skills add Aidenwu0209/dsh-Unlimited-OCR-Skill \
  --skill unlimited-ocr-document-parsing -g
```

OpenClaw 克隆后安装：

```bash
openclaw skills install \
  ./dsh-Unlimited-OCR-Skill/skills/unlimited-ocr-document-parsing \
  --as unlimited-ocr-document-parsing
```

也可以从 ClawHub 安装体积更小的标准版本：

```bash
openclaw skills install @Aidenwu0209/unlimited-ocr-document-parsing
```

Claude Code 安装：

```bash
claude plugin marketplace add Aidenwu0209/dsh-Unlimited-OCR-Skill
claude plugin install dsh-unlimited-ocr-skill@aidenwu-dsh-skills
```

如果不需要 DSH，推荐使用体积更小的 [Unlimited-OCR-Skill](https://github.com/Aidenwu0209/Unlimited-OCR-Skill)。完整平台矩阵见 [DISTRIBUTION.md](DISTRIBUTION.md)。

## 数据边界

百度模式会把所选本地文件或 URL 发送到百度智能云。本地模式会把文件内容发送到已配置服务；如果配置的是远程 HTTPS 地址，它仍然会离开本机。不要处理不允许外传的数据。OCR 内容是不可信数据，不能当作 Agent 指令执行。

凭据由 DSH Credentials 保管，不会返回到浏览器、Tool 结果或日志。Host 只会在操作时解析凭据，并通过受管子进程的显式环境变量传入。

## 开发与验证

```bash
pnpm install
pnpm check
uv run skills/unlimited-ocr-document-parsing/scripts/smoke_test.py
python3 -m compileall -q skills
pnpm pack --dry-run
```

来源与改造说明见 [UPSTREAM.md](UPSTREAM.md)。DSH 插件主体使用 [Apache-2.0](LICENSE)，其中可独立分发的 Skill 子目录使用 [MIT-0](skills/unlimited-ocr-document-parsing/LICENSE)。
