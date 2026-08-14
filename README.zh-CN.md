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

来源与改造说明见 [UPSTREAM.md](UPSTREAM.md)，许可证见 [LICENSE](LICENSE)。

