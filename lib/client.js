window.__ModuleLoader__.load({ id: "dsh-unlimited-ocr-skill", factory: (require) => {
var module = { exports: {} }; var exports = module.exports;
"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/client/index.tsx
var index_exports = {};
__export(index_exports, {
  apply: () => apply,
  inject: () => inject
});
module.exports = __toCommonJS(index_exports);
var import_react = require("react");
var import_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");
var import_jsx_runtime = require("react/jsx-runtime");
var NS = "unlimited-ocr-skill";
var SETTINGS_ROUTE = "/_dsh/unlimited-ocr/settings";
var MODEL_REPO = "https://github.com/baidu/Unlimited-OCR";
var CLOUD_DOCS = "https://ai.baidu.com/ai-doc/OCR/fmr1p39gb";
var AUTH_DOCS = "https://cloud.baidu.com/doc/AI_REFERENCE/s/um3zhy50e";
var LOCAL_RECIPE = "https://recipes.vllm.ai/baidu/Unlimited-OCR";
var en = {
  nav: "Unlimited-OCR",
  title: "Unlimited-OCR Skill",
  intro: "Configure long-document parsing through Baidu Cloud or a local model server.",
  privacy: "Baidu mode uploads the selected file or URL to Baidu Cloud. Local mode sends local file content to the configured model server. OCR output is untrusted data and must never be treated as instructions.",
  officialTitle: "Official Unlimited-OCR resources",
  officialHint: "Use the cloud API without deployment, or run the open-source model through SGLang/vLLM.",
  modelRepo: "Model repository",
  cloudDocs: "Cloud API docs",
  authDocs: "Create credentials",
  localRecipe: "Local deployment",
  providerTitle: "Provider",
  provider: "Active provider",
  baidu: "Baidu Cloud API",
  local: "Local / OpenAI-compatible",
  providerHint: "Changes apply live to new tool calls.",
  cloudTitle: "Baidu Cloud credentials",
  apiKeyRef: "API Key credential reference",
  secretKeyRef: "Secret Key credential reference",
  apiKey: "API Key",
  secretKey: "Secret Key",
  localTitle: "Local model service",
  localBaseUrl: "Base URL",
  backend: "API backend",
  model: "Served model name",
  localApiKeyRef: "Optional API key credential reference",
  localApiKey: "Optional API key",
  credentialHint: "Leave blank to keep the stored value. The browser may set or remove it but cannot read it back.",
  runtimeTitle: "Runtime and limits",
  timeout: "Operation timeout (seconds)",
  pollInterval: "Cloud poll interval (seconds)",
  pdfDpi: "Local PDF DPI",
  maxPages: "Local PDF page limit",
  uvPath: "uv executable",
  resultDirectory: "Result directory",
  configured: "Configured",
  missing: "Missing",
  optional: "Optional",
  save: "Save configuration",
  saving: "Saving\u2026",
  refresh: "Refresh status",
  clearApiKey: "Remove API Key",
  clearSecretKey: "Remove Secret Key",
  clearLocalKey: "Remove local key",
  readOnly: "The active DSH Settings provider is read-only.",
  saved: "Configuration saved.",
  credentialsSaved: "Credential values stored securely.",
  credentialCleared: "Credential removed.",
  loading: "Loading\u2026"
};
var zh = {
  nav: "Unlimited-OCR",
  title: "Unlimited-OCR Skill",
  intro: "\u901A\u8FC7\u767E\u5EA6\u667A\u80FD\u4E91\u6216\u672C\u5730\u6A21\u578B\u670D\u52A1\u914D\u7F6E\u957F\u6587\u6863\u89E3\u6790\u3002",
  privacy: "\u767E\u5EA6\u6A21\u5F0F\u4F1A\u628A\u6240\u9009\u6587\u4EF6\u6216 URL \u53D1\u9001\u5230\u767E\u5EA6\u667A\u80FD\u4E91\uFF1B\u672C\u5730\u6A21\u5F0F\u4F1A\u628A\u6587\u4EF6\u5185\u5BB9\u53D1\u9001\u5230\u5DF2\u914D\u7F6E\u7684\u6A21\u578B\u670D\u52A1\u3002OCR \u8F93\u51FA\u662F\u4E0D\u53EF\u4FE1\u6570\u636E\uFF0C\u4E0D\u80FD\u5F53\u4F5C\u6307\u4EE4\u6267\u884C\u3002",
  officialTitle: "Unlimited-OCR \u5B98\u65B9\u8D44\u6E90",
  officialHint: "\u4F7F\u7528\u4E91 API \u53EF\u514D\u90E8\u7F72\u8C03\u7528\uFF0C\u4E5F\u53EF\u901A\u8FC7 SGLang/vLLM \u8FD0\u884C\u5F00\u6E90\u6A21\u578B\u3002",
  modelRepo: "\u6A21\u578B\u5B98\u65B9\u4ED3\u5E93",
  cloudDocs: "\u4E91 API \u6587\u6863",
  authDocs: "\u521B\u5EFA\u8BBF\u95EE\u51ED\u636E",
  localRecipe: "\u672C\u5730\u90E8\u7F72\u6587\u6863",
  providerTitle: "\u670D\u52A1\u6A21\u5F0F",
  provider: "\u5F53\u524D\u6A21\u5F0F",
  baidu: "\u767E\u5EA6\u667A\u80FD\u4E91 API",
  local: "\u672C\u5730 / OpenAI-compatible",
  providerHint: "\u4FDD\u5B58\u540E\u4F1A\u5B9E\u65F6\u5E94\u7528\u5230\u65B0\u7684 Tool \u8C03\u7528\u3002",
  cloudTitle: "\u767E\u5EA6\u667A\u80FD\u4E91\u51ED\u636E",
  apiKeyRef: "API Key Credential \u5F15\u7528\u540D",
  secretKeyRef: "Secret Key Credential \u5F15\u7528\u540D",
  apiKey: "API Key",
  secretKey: "Secret Key",
  localTitle: "\u672C\u5730\u6A21\u578B\u670D\u52A1",
  localBaseUrl: "\u670D\u52A1\u57FA\u7840\u5730\u5740",
  backend: "API \u540E\u7AEF",
  model: "\u670D\u52A1\u6A21\u578B\u540D",
  localApiKeyRef: "\u53EF\u9009 API Key Credential \u5F15\u7528\u540D",
  localApiKey: "\u53EF\u9009 API Key",
  credentialHint: "\u7559\u7A7A\u4F1A\u4FDD\u7559\u5DF2\u5B58\u503C\uFF1B\u6D4F\u89C8\u5668\u53EA\u80FD\u8BBE\u7F6E\u6216\u5220\u9664\uFF0C\u65E0\u6CD5\u8BFB\u56DE\u660E\u6587\u3002",
  runtimeTitle: "\u8FD0\u884C\u65F6\u4E0E\u9650\u5236",
  timeout: "\u64CD\u4F5C\u8D85\u65F6\uFF08\u79D2\uFF09",
  pollInterval: "\u4E91\u4EFB\u52A1\u8F6E\u8BE2\u95F4\u9694\uFF08\u79D2\uFF09",
  pdfDpi: "\u672C\u5730 PDF DPI",
  maxPages: "\u672C\u5730 PDF \u9875\u6570\u4E0A\u9650",
  uvPath: "uv \u53EF\u6267\u884C\u7A0B\u5E8F",
  resultDirectory: "\u7ED3\u679C\u76EE\u5F55",
  configured: "\u5DF2\u914D\u7F6E",
  missing: "\u672A\u914D\u7F6E",
  optional: "\u53EF\u9009",
  save: "\u4FDD\u5B58\u914D\u7F6E",
  saving: "\u6B63\u5728\u4FDD\u5B58\u2026",
  refresh: "\u5237\u65B0\u72B6\u6001",
  clearApiKey: "\u5220\u9664 API Key",
  clearSecretKey: "\u5220\u9664 Secret Key",
  clearLocalKey: "\u5220\u9664\u672C\u5730 Key",
  readOnly: "\u5F53\u524D DSH Settings \u63D0\u4F9B\u65B9\u662F\u53EA\u8BFB\u7684\u3002",
  saved: "\u914D\u7F6E\u5DF2\u4FDD\u5B58\u3002",
  credentialsSaved: "\u51ED\u636E\u5DF2\u5B89\u5168\u5B58\u50A8\u3002",
  credentialCleared: "\u51ED\u636E\u5DF2\u5220\u9664\u3002",
  loading: "\u6B63\u5728\u52A0\u8F7D\u2026"
};
async function api(body) {
  const response = await fetch(SETTINGS_ROUTE, body === void 0 ? { credentials: "same-origin" } : {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  const parsed = await response.json();
  if (!response.ok || !parsed.ok) throw new Error(parsed.error?.message ?? `HTTP ${response.status}`);
  return parsed.value;
}
function draftOf(snapshot) {
  const value = snapshot.settings.value;
  return {
    provider: value.provider ?? "baidu",
    apiKeyCredential: value.apiKeyCredential ?? "UNLIMITED_OCR_API_KEY",
    secretKeyCredential: value.secretKeyCredential ?? "UNLIMITED_OCR_SECRET_KEY",
    localApiKeyCredential: value.localApiKeyCredential ?? "UNLIMITED_OCR_LOCAL_API_KEY",
    apiKey: "",
    secretKey: "",
    localApiKey: "",
    localBaseUrl: value.localBaseUrl ?? "http://127.0.0.1:10000",
    localBackend: value.localBackend ?? "sglang",
    model: value.model ?? "Unlimited-OCR",
    timeoutSeconds: String(value.timeoutSeconds ?? 1200),
    pollIntervalSeconds: String(value.pollIntervalSeconds ?? 5),
    pdfDpi: String(value.pdfDpi ?? 200),
    localMaxPages: String(value.localMaxPages ?? 64),
    uvPath: value.uvPath ?? "uv",
    resultDirectory: value.resultDirectory ?? ".dsh-unlimited-ocr/results"
  };
}
function integer(raw, label, min, max) {
  const value = Number(raw);
  if (!Number.isSafeInteger(value) || value < min || value > max) throw new Error(`${label}: ${min}-${max}`);
  return value;
}
function Field({ label, hint, children }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { className: "uos-field", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }),
    children,
    hint === void 0 ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: hint })
  ] });
}
function SettingsSection({ t = (key) => en[key] }) {
  const [snapshot, setSnapshot] = (0, import_react.useState)();
  const [draft, setDraft] = (0, import_react.useState)();
  const [busy, setBusy] = (0, import_react.useState)(false);
  const [message, setMessage] = (0, import_react.useState)();
  const [error, setError] = (0, import_react.useState)();
  const load = async () => {
    setError(void 0);
    try {
      const next = await api();
      setSnapshot(next);
      setDraft(draftOf(next));
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : String(reason));
    }
  };
  (0, import_react.useEffect)(() => {
    void load();
  }, []);
  if (snapshot === void 0 || draft === void 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "uos-settings", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: error ?? t("loading") }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.Button, { variant: "outline", onClick: () => {
      void load();
    }, children: t("refresh") })
  ] });
  const update = (key, value) => setDraft((current) => current === void 0 ? current : { ...current, [key]: value });
  const save = async () => {
    setBusy(true);
    setError(void 0);
    setMessage(void 0);
    try {
      const value = {
        provider: draft.provider,
        apiKeyCredential: draft.apiKeyCredential.trim(),
        secretKeyCredential: draft.secretKeyCredential.trim(),
        localApiKeyCredential: draft.localApiKeyCredential.trim(),
        localBaseUrl: draft.localBaseUrl.trim(),
        localBackend: draft.localBackend,
        model: draft.model.trim(),
        timeoutSeconds: integer(draft.timeoutSeconds, "timeout", 30, 7200),
        pollIntervalSeconds: integer(draft.pollIntervalSeconds, "poll interval", 1, 60),
        pdfDpi: integer(draft.pdfDpi, "PDF DPI", 72, 600),
        localMaxPages: integer(draft.localMaxPages, "page limit", 1, 500),
        uvPath: draft.uvPath.trim(),
        resultDirectory: draft.resultDirectory.trim()
      };
      let next = await api({ action: "save", expectedRevision: snapshot.settings.revision, value });
      let credentialChanged = false;
      const pending = [
        [next.credentials.apiKey, draft.apiKey],
        [next.credentials.secretKey, draft.secretKey],
        [next.credentials.localApiKey, draft.localApiKey]
      ];
      for (const [status, secret] of pending) {
        if (secret.length > 0) {
          next = await api({ action: "credentialSet", ref: status.ref, value: secret });
          credentialChanged = true;
        }
      }
      setSnapshot(next);
      setDraft(draftOf(next));
      setMessage(`${t("saved")}${credentialChanged ? ` ${t("credentialsSaved")}` : ""}`);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : String(reason));
    } finally {
      setBusy(false);
    }
  };
  const clearCredential = async (status) => {
    setBusy(true);
    setError(void 0);
    setMessage(void 0);
    try {
      const next = await api({ action: "credentialUnset", ref: status.ref });
      setSnapshot(next);
      setDraft(draftOf(next));
      setMessage(t("credentialCleared"));
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : String(reason));
    } finally {
      setBusy(false);
    }
  };
  const cloudReady = snapshot.credentials.apiKey.configured && snapshot.credentials.secretKey.configured;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "uos-settings", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "uos-kicker", children: "DSH native plugin" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: t("title") }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("intro") })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("code", { children: [
        "v",
        snapshot.release.pluginVersion
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "uos-notice", children: t("privacy") }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { className: "uos-official", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "uos-official-copy", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: t("officialTitle") }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("officialHint") }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { className: "uos-official-url", href: MODEL_REPO, target: "_blank", rel: "noopener noreferrer", children: MODEL_REPO })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "uos-links", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", { className: "uos-link primary", href: MODEL_REPO, target: "_blank", rel: "noopener noreferrer", children: [
          t("modelRepo"),
          " \u2197"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", { className: "uos-link", href: CLOUD_DOCS, target: "_blank", rel: "noopener noreferrer", children: [
          t("cloudDocs"),
          " \u2197"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", { className: "uos-link", href: AUTH_DOCS, target: "_blank", rel: "noopener noreferrer", children: [
          t("authDocs"),
          " \u2197"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", { className: "uos-link", href: LOCAL_RECIPE, target: "_blank", rel: "noopener noreferrer", children: [
          t("localRecipe"),
          " \u2197"
        ] })
      ] })
    ] }),
    !snapshot.writable ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "uos-warning", children: t("readOnly") }) : null,
    message === void 0 ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "uos-success", children: message }),
    error === void 0 ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "uos-error", children: error }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "uos-title", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: t("providerTitle") }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "uos-badge ok", children: draft.provider === "baidu" ? t("baidu") : t("local") })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, { label: t("provider"), hint: t("providerHint"), children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", { value: draft.provider, onChange: (event) => {
        update("provider", event.target.value);
      }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "baidu", children: t("baidu") }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "local", children: t("local") })
      ] }) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { className: draft.provider === "baidu" ? "" : "uos-inactive", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "uos-title", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: t("cloudTitle") }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `uos-badge ${cloudReady ? "ok" : ""}`, children: cloudReady ? t("configured") : t("missing") })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "uos-grid", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, { label: t("apiKeyRef"), hint: snapshot.credentials.apiKey.source, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.Input, { value: draft.apiKeyCredential, onChange: (event) => {
          update("apiKeyCredential", event.target.value);
        } }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, { label: t("secretKeyRef"), hint: snapshot.credentials.secretKey.source, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.Input, { value: draft.secretKeyCredential, onChange: (event) => {
          update("secretKeyCredential", event.target.value);
        } }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, { label: t("apiKey"), hint: t("credentialHint"), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.Input, { type: "password", autoComplete: "new-password", value: draft.apiKey, onChange: (event) => {
          update("apiKey", event.target.value);
        } }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, { label: t("secretKey"), hint: t("credentialHint"), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.Input, { type: "password", autoComplete: "new-password", value: draft.secretKey, onChange: (event) => {
          update("secretKey", event.target.value);
        } }) })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { className: draft.provider === "local" ? "" : "uos-inactive", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "uos-title", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: t("localTitle") }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `uos-badge ${draft.localBaseUrl ? "ok" : ""}`, children: draft.localBaseUrl ? t("configured") : t("missing") })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "uos-grid", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, { label: t("localBaseUrl"), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.Input, { value: draft.localBaseUrl, onChange: (event) => {
          update("localBaseUrl", event.target.value);
        } }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, { label: t("backend"), children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", { value: draft.localBackend, onChange: (event) => {
          update("localBackend", event.target.value);
        }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "sglang", children: "SGLang" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "openai", children: "OpenAI-compatible" })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, { label: t("model"), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.Input, { value: draft.model, onChange: (event) => {
          update("model", event.target.value);
        } }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, { label: t("localApiKeyRef"), hint: snapshot.credentials.localApiKey.source, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.Input, { value: draft.localApiKeyCredential, onChange: (event) => {
          update("localApiKeyCredential", event.target.value);
        } }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, { label: t("localApiKey"), hint: t("credentialHint"), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.Input, { type: "password", autoComplete: "new-password", value: draft.localApiKey, onChange: (event) => {
          update("localApiKey", event.target.value);
        } }) })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "uos-title", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: t("runtimeTitle") }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: `uos-badge ${snapshot.runtime.uvAvailable ? "ok" : ""}`, children: [
          "uv ",
          snapshot.runtime.uvAvailable ? t("configured") : t("missing")
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "uos-grid", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, { label: t("timeout"), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.Input, { inputMode: "numeric", value: draft.timeoutSeconds, onChange: (event) => {
          update("timeoutSeconds", event.target.value);
        } }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, { label: t("pollInterval"), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.Input, { inputMode: "numeric", value: draft.pollIntervalSeconds, onChange: (event) => {
          update("pollIntervalSeconds", event.target.value);
        } }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, { label: t("pdfDpi"), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.Input, { inputMode: "numeric", value: draft.pdfDpi, onChange: (event) => {
          update("pdfDpi", event.target.value);
        } }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, { label: t("maxPages"), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.Input, { inputMode: "numeric", value: draft.localMaxPages, onChange: (event) => {
          update("localMaxPages", event.target.value);
        } }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, { label: t("uvPath"), hint: snapshot.runtime.uvPath, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.Input, { value: draft.uvPath, onChange: (event) => {
          update("uvPath", event.target.value);
        } }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, { label: t("resultDirectory"), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.Input, { value: draft.resultDirectory, onChange: (event) => {
          update("resultDirectory", event.target.value);
        } }) })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "uos-actions", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.Button, { variant: "primary", disabled: busy || !snapshot.writable, onClick: () => {
        void save();
      }, children: busy ? t("saving") : t("save") }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.Button, { variant: "outline", disabled: busy, onClick: () => {
        void load();
      }, children: t("refresh") }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.Button, { variant: "outline", disabled: busy || !snapshot.credentials.apiKey.configured || !snapshot.credentials.apiKey.writable, onClick: () => {
        void clearCredential(snapshot.credentials.apiKey);
      }, children: t("clearApiKey") }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.Button, { variant: "outline", disabled: busy || !snapshot.credentials.secretKey.configured || !snapshot.credentials.secretKey.writable, onClick: () => {
        void clearCredential(snapshot.credentials.secretKey);
      }, children: t("clearSecretKey") }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.Button, { variant: "outline", disabled: busy || !snapshot.credentials.localApiKey.configured || !snapshot.credentials.localApiKey.writable, onClick: () => {
        void clearCredential(snapshot.credentials.localApiKey);
      }, children: t("clearLocalKey") })
    ] })
  ] });
}
var CSS = `.uos-settings{display:grid;gap:14px;max-width:940px;padding:8px 2px 32px;color:var(--dsw-alias-fg-primary,#26231f)}.uos-settings header{display:flex;align-items:flex-start;justify-content:space-between;gap:20px}.uos-settings h2{font-size:25px;margin:3px 0 6px}.uos-settings header p{margin:0;color:var(--dsw-alias-fg-muted,#77736d);font-size:13px}.uos-kicker{font-size:10px;text-transform:uppercase;letter-spacing:.1em;color:#315fb5;font-weight:700}.uos-settings section{display:grid;gap:12px;padding:15px;border:1px solid var(--dsw-alias-border-subtle,#dedbd5);border-radius:14px;background:var(--dsw-alias-bg-layer-1,#fff)}.uos-settings .uos-official{grid-template-columns:minmax(0,1fr) auto;align-items:center;border-color:rgba(42,111,164,.3);background:linear-gradient(135deg,rgba(42,111,164,.12),rgba(30,168,129,.08))}.uos-official-copy{display:grid;gap:6px;min-width:0}.uos-official-copy h3,.uos-official-copy p{margin:0}.uos-official-copy h3{font-size:15px}.uos-official-copy p{font-size:11px;line-height:1.5;color:var(--dsw-alias-fg-muted,#77736d)}.uos-official-url{width:max-content;max-width:100%;overflow-wrap:anywhere;color:#315fb5;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:12px}.uos-links{display:flex;justify-content:flex-end;gap:8px;flex-wrap:wrap;max-width:390px}.uos-link{display:inline-flex;align-items:center;justify-content:center;min-height:30px;padding:0 10px;border:1px solid rgba(42,111,164,.3);border-radius:8px;background:var(--dsw-alias-bg-layer-1,#fff);color:#315fb5;font-size:11px;font-weight:600;text-decoration:none}.uos-link:hover{text-decoration:underline}.uos-link.primary{border-color:#315fb5;background:#315fb5;color:#fff}.uos-title{display:flex;justify-content:space-between;align-items:center}.uos-title h3{font-size:14px;margin:0}.uos-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.uos-field{display:grid;gap:6px}.uos-field>span{font-size:11px;font-weight:600}.uos-field>small{font-size:10px;color:var(--dsw-alias-fg-muted,#77736d);line-height:1.4}.uos-field select{min-height:34px;border:1px solid var(--dsw-alias-border-subtle,#d5d2cc);border-radius:8px;background:var(--dsw-alias-bg-layer-1,#fff);color:inherit;padding:0 9px}.uos-badge{font-size:10px;padding:3px 7px;border-radius:99px;background:rgba(205,72,72,.1);color:#aa3939}.uos-badge.ok{background:rgba(48,154,100,.12);color:#267d52}.uos-notice,.uos-warning,.uos-success,.uos-error{padding:10px 12px;border-radius:10px;font-size:12px;line-height:1.5}.uos-notice{background:rgba(42,111,164,.09);color:#315f94}.uos-warning{background:rgba(224,162,55,.12);color:#986818}.uos-success{background:rgba(48,154,100,.1);color:#267d52}.uos-error{background:rgba(205,72,72,.1);color:#aa3939}.uos-inactive{opacity:.62}.uos-actions{display:flex;gap:8px;flex-wrap:wrap}@media(max-width:760px){.uos-grid,.uos-settings .uos-official{grid-template-columns:1fr}.uos-settings header{display:grid}.uos-links{justify-content:flex-start;max-width:none}}`;
function installStyles() {
  const id = "dsh-unlimited-ocr-skill";
  if (document.querySelector(`style[data-plugin-css="${id}"]`) !== null) return () => {
  };
  const style = document.createElement("style");
  style.dataset.pluginCss = id;
  style.textContent = CSS;
  document.head.appendChild(style);
  return () => {
    style.remove();
  };
}
var inject = ["slots", "locale"];
function apply(ctx) {
  ctx.effect(installStyles, "dsh-unlimited-ocr-skill: styles");
  ctx.effect(() => ctx.locale.register(NS, { en, zh }), "dsh-unlimited-ocr-skill: locale");
  const t = ctx.locale.bind(NS);
  ctx.slots.inject("settings.section", () => ctx.slots.register({
    name: "settings.section",
    id: "unlimited-ocr-skill",
    order: 36,
    label: () => t("nav"),
    inject: () => ({ t })
  }, SettingsSection));
}
//# sourceMappingURL=index.js.map

return module.exports; } });
//# sourceMappingURL=client.js.map
