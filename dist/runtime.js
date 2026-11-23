var Nr$1 = Object.defineProperty;
var Dr$1 = (e) => {
  throw TypeError(e);
};
var es = (e, t, r) => t in e ? Nr$1(e, t, { enumerable: true, configurable: true, writable: true, value: r }) : e[t] = r;
var Ir$1 = (e, t) => {
  for (var r in t) Nr$1(e, r, { get: t[r], enumerable: true });
};
var Wt$1 = (e, t, r) => es(e, typeof t != "symbol" ? t + "" : t, r), ts = (e, t, r) => t.has(e) || Dr$1("Cannot " + r);
var qe$1 = (e, t, r) => (ts(e, t, "read from private field"), r ? r.call(e) : t.get(e)), Rr$1 = (e, t, r) => t.has(e) ? Dr$1("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r);
var Zi = {};
Ir$1(Zi, { languages: () => Ui$1, options: () => zi, parsers: () => Pr, printers: () => $o$1 });
var ke$1 = (e, t) => (r, n, ...i) => r | 1 && n == null ? void 0 : (t.call(n) ?? n[e]).apply(n, i);
var rs = String.prototype.replaceAll ?? function(e, t) {
  return e.global ? this.replace(e, t) : this.split(e).join(t);
}, ns = ke$1("replaceAll", function() {
  if (typeof this == "string") return rs;
}), T$1 = ns;
function is(e) {
  return this[e < 0 ? this.length + e : e];
}
var ss = ke$1("at", function() {
  if (Array.isArray(this) || typeof this == "string") return is;
}), I$1 = ss;
var as = () => {
}, He$1 = as;
var Fe$1 = "string", Ve$1 = "array", ot$1 = "cursor", be$1 = "indent", we$1 = "align", lt$1 = "trim", Te$1 = "group", ye$1 = "fill", Ee$1 = "if-break", xe$1 = "indent-if-break", ct$1 = "line-suffix", ut$1 = "line-suffix-boundary", z$1 = "line", pt$1 = "label", Le$1 = "break-parent", ht$1 = /* @__PURE__ */ new Set([ot$1, be$1, we$1, lt$1, Te$1, ye$1, Ee$1, xe$1, ct$1, ut$1, z$1, pt$1, Le$1]);
function mt$1(e, t, r) {
  if (!e.has(t)) {
    let n = r(t);
    e.set(t, n);
  }
  return e.get(t);
}
function os(e) {
  if (typeof e == "string") return Fe$1;
  if (Array.isArray(e)) return Ve$1;
  if (!e) return;
  let { type: t } = e;
  if (ht$1.has(t)) return t;
}
var ft$1 = os;
var ls = (e) => new Intl.ListFormat("en-US", { type: "disjunction" }).format(e);
function cs(e) {
  let t = e === null ? "null" : typeof e;
  if (t !== "string" && t !== "object") return `Unexpected doc '${t}', 
Expected it to be 'string' or 'object'.`;
  if (ft$1(e)) throw new Error("doc is valid.");
  let r = Object.prototype.toString.call(e);
  if (r !== "[object Object]") return `Unexpected doc '${r}'.`;
  let n = ls([...ht$1].map((i) => `'${i}'`));
  return `Unexpected doc.type '${e.type}'.
Expected it to be ${n}.`;
}
var zt$1 = class zt extends Error {
  name = "InvalidDocError";
  constructor(t) {
    super(cs(t)), this.doc = t;
  }
}, Or = zt$1;
function Gt$1(e, t) {
  if (typeof e == "string") return t(e);
  let r = /* @__PURE__ */ new Map();
  return n(e);
  function n(s) {
    return mt$1(r, s, i);
  }
  function i(s) {
    switch (ft$1(s)) {
      case Ve$1:
        return t(s.map(n));
      case ye$1:
        return t({ ...s, parts: s.parts.map(n) });
      case Ee$1:
        return t({ ...s, breakContents: n(s.breakContents), flatContents: n(s.flatContents) });
      case Te$1: {
        let { expandedStates: a, contents: o } = s;
        return a ? (a = a.map(n), o = a[0]) : o = n(o), t({ ...s, contents: o, expandedStates: a });
      }
      case we$1:
      case be$1:
      case xe$1:
      case pt$1:
      case ct$1:
        return t({ ...s, contents: n(s.contents) });
      case Fe$1:
      case ot$1:
      case lt$1:
      case ut$1:
      case z$1:
      case Le$1:
        return t(s);
      default:
        throw new Or(s);
    }
  }
}
function L$1(e, t = Mr$1) {
  return Gt$1(e, (r) => typeof r == "string" ? R$1(t, r.split(`
`)) : r);
}
var dt$1 = He$1;
function A(e) {
  return { type: be$1, contents: e };
}
function us(e, t) {
  return { type: we$1, contents: t, n: e };
}
function Hr$1(e) {
  return us(Number.NEGATIVE_INFINITY, e);
}
var G$1 = { type: Le$1 };
function gt$1(e) {
  return { type: ye$1, parts: e };
}
function C(e, t = {}) {
  return dt$1(t.expandedStates), { type: Te$1, id: t.id, contents: e, break: !!t.shouldBreak, expandedStates: t.expandedStates };
}
function $$1(e, t = "", r = {}) {
  return { type: Ee$1, breakContents: e, flatContents: t, groupId: r.groupId };
}
function Fr$1(e, t) {
  return { type: xe$1, contents: e, groupId: t.groupId, negate: t.negate };
}
function R$1(e, t) {
  let r = [];
  for (let n = 0; n < t.length; n++) n !== 0 && r.push(e), r.push(t[n]);
  return r;
}
var S$1 = { type: z$1 }, y$1 = { type: z$1, soft: true }, ps = { type: z$1, hard: true }, k$1 = [ps, G$1], hs = { type: z$1, hard: true, literal: true }, Mr$1 = [hs, G$1];
var Vr$1 = Object.freeze({ character: "'", codePoint: 39 }), Ur$1 = Object.freeze({ character: '"', codePoint: 34 }), fs = Object.freeze({ preferred: Ur$1, alternate: Vr$1 });
function Wr$1(e, t) {
  let { preferred: r, alternate: n } = fs, { length: i } = e, s = 0, a = 0;
  for (let o = 0; o < i; o++) {
    let l = e.charCodeAt(o);
    l === r.codePoint ? s++ : l === n.codePoint && a++;
  }
  return (s > a ? n : r).character;
}
function $t$1(e) {
  if (typeof e != "string") throw new TypeError("Expected a string");
  return e.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
var jt$1 = class jt {
  #e;
  constructor(t) {
    this.#e = new Set(t);
  }
  getLeadingWhitespaceCount(t) {
    let r = this.#e, n = 0;
    for (let i = 0; i < t.length && r.has(t.charAt(i)); i++) n++;
    return n;
  }
  getTrailingWhitespaceCount(t) {
    let r = this.#e, n = 0;
    for (let i = t.length - 1; i >= 0 && r.has(t.charAt(i)); i--) n++;
    return n;
  }
  getLeadingWhitespace(t) {
    let r = this.getLeadingWhitespaceCount(t);
    return t.slice(0, r);
  }
  getTrailingWhitespace(t) {
    let r = this.getTrailingWhitespaceCount(t);
    return t.slice(t.length - r);
  }
  hasLeadingWhitespace(t) {
    return this.#e.has(t.charAt(0));
  }
  hasTrailingWhitespace(t) {
    return this.#e.has(I$1(0, t, -1));
  }
  trimStart(t) {
    let r = this.getLeadingWhitespaceCount(t);
    return t.slice(r);
  }
  trimEnd(t) {
    let r = this.getTrailingWhitespaceCount(t);
    return t.slice(0, t.length - r);
  }
  trim(t) {
    return this.trimEnd(this.trimStart(t));
  }
  split(t, r = false) {
    let n = `[${$t$1([...this.#e].join(""))}]+`, i = new RegExp(r ? `(${n})` : n);
    return t.split(i);
  }
  hasWhitespaceCharacter(t) {
    let r = this.#e;
    return Array.prototype.some.call(t, (n) => r.has(n));
  }
  hasNonWhitespaceCharacter(t) {
    let r = this.#e;
    return Array.prototype.some.call(t, (n) => !r.has(n));
  }
  isWhitespaceOnly(t) {
    let r = this.#e;
    return Array.prototype.every.call(t, (n) => r.has(n));
  }
  #t(t) {
    let r = Number.POSITIVE_INFINITY;
    for (let n of t.split(`
`)) {
      if (n.length === 0) continue;
      let i = this.getLeadingWhitespaceCount(n);
      if (i === 0) return 0;
      n.length !== i && i < r && (r = i);
    }
    return r === Number.POSITIVE_INFINITY ? 0 : r;
  }
  dedentString(t) {
    let r = this.#t(t);
    return r === 0 ? t : t.split(`
`).map((n) => n.slice(r)).join(`
`);
  }
}, zr$1 = jt$1;
var ds = ["	", `
`, "\f", "\r", " "], gs = new zr$1(ds), P = gs;
var Yt$1 = class Yt extends Error {
  name = "UnexpectedNodeError";
  constructor(t, r, n = "type") {
    super(`Unexpected ${r} node ${n}: ${JSON.stringify(t[n])}.`), this.node = t;
  }
}, Gr$1 = Yt$1;
function j$1(e, t = true) {
  return [A([y$1, e]), t ? y$1 : ""];
}
function q$1(e, t) {
  let r = e.type === "NGRoot" ? e.node.type === "NGMicrosyntax" && e.node.body.length === 1 && e.node.body[0].type === "NGMicrosyntaxExpression" ? e.node.body[0].expression : e.node : e.type === "JsExpressionRoot" ? e.node : e;
  return r && (r.type === "ObjectExpression" || r.type === "ArrayExpression" || (t.parser === "__vue_expression" || t.parser === "__vue_ts_expression" || t.parser === "__ng_binding" || t.parser === "__ng_directive") && (r.type === "TemplateLiteral" || r.type === "StringLiteral"));
}
async function E(e, t, r, n) {
  r = { __isInHtmlAttribute: true, __embeddedInHtml: true, ...r };
  let i = true;
  n && (r.__onHtmlBindingRoot = (a, o) => {
    i = n(a, o);
  });
  let s = await t(e, r, t);
  return i ? C(s) : j$1(s);
}
function _s(e, t, r, n) {
  let { node: i } = r, s = n.originalText.slice(i.sourceSpan.start.offset, i.sourceSpan.end.offset);
  return /^\s*$/.test(s) ? "" : E(s, e, { parser: "__ng_directive", __isInHtmlAttribute: false }, q$1);
}
var $r$1 = _s;
var Ss = Object.hasOwn ?? Function.prototype.call.bind(Object.prototype.hasOwnProperty), se$1 = Ss;
var vs = Array.prototype.toReversed ?? function() {
  return [...this].reverse();
}, Cs = ke$1("toReversed", function() {
  if (Array.isArray(this)) return vs;
}), jr$1 = Cs;
function ks() {
  let e = globalThis, t = e.process?.platform;
  if (typeof t == "string") return t.startsWith("win");
  let r = e.Deno?.build?.os;
  return typeof r == "string" ? r === "windows" : e.navigator?.platform?.startsWith("Win") ?? false;
}
var bs = ks();
function Yr$1(e) {
  if (e = e instanceof URL ? e : new URL(e), e.protocol !== "file:") throw new TypeError(`URL must be a file URL: received "${e.protocol}"`);
  return e;
}
function ws(e) {
  return e = Yr$1(e), decodeURIComponent(e.pathname.replace(/%(?![0-9A-Fa-f]{2})/g, "%25"));
}
function Ts(e) {
  e = Yr$1(e);
  let t = decodeURIComponent(e.pathname.replace(/\//g, "\\").replace(/%(?![0-9A-Fa-f]{2})/g, "%25")).replace(/^\\*([A-Za-z]:)(\\|$)/, "$1\\");
  return e.hostname !== "" && (t = `\\\\${e.hostname}${t}`), t;
}
function Kt$1(e) {
  return bs ? Ts(e) : ws(e);
}
var Kr$1 = (e) => String(e).split(/[/\\]/).pop(), Qr$1 = (e) => String(e).startsWith("file:");
function ys(e) {
  return Array.isArray(e) && e.length > 0;
}
var X$1 = ys;
function Xr$1(e, t) {
  if (!t) return;
  let r = Kr$1(t).toLowerCase();
  return e.find(({ filenames: n }) => n?.some((i) => i.toLowerCase() === r)) ?? e.find(({ extensions: n }) => n?.some((i) => r.endsWith(i)));
}
function Es(e, t) {
  if (t) return e.find(({ name: r }) => r.toLowerCase() === t) ?? e.find(({ aliases: r }) => r?.includes(t)) ?? e.find(({ extensions: r }) => r?.includes(`.${t}`));
}
var xs = void 0;
function Jr$1(e, t) {
  if (t) {
    if (Qr$1(t)) try {
      t = Kt$1(t);
    } catch {
      return;
    }
    if (typeof t == "string") return e.find(({ isSupported: r }) => r?.({ filepath: t }));
  }
}
function Ls(e, t) {
  let r = jr$1(0, e.plugins).flatMap((i) => i.languages ?? []);
  return (Es(r, t.language) ?? Xr$1(r, t.physicalFile) ?? Xr$1(r, t.file) ?? Jr$1(r, t.physicalFile) ?? Jr$1(r, t.file) ?? xs?.(r, t.physicalFile))?.parsers[0];
}
var _t = Ls;
var St$1 = /* @__PURE__ */ Symbol.for("PRETTIER_IS_FRONT_MATTER");
function As(e) {
  return !!e?.[St$1];
}
var ae$1 = As;
function Ps(e) {
  return T$1(0, e, /[^\n]/g, " ");
}
var vt$1 = Ps;
var Ue$1 = 3;
function Ns(e) {
  let t = e.slice(0, Ue$1);
  if (t !== "---" && t !== "+++") return;
  let r = e.indexOf(`
`, Ue$1);
  if (r === -1) return;
  let n = e.slice(Ue$1, r).trim(), i = e.indexOf(`
${t}`, r), s = n;
  if (s || (s = t === "+++" ? "toml" : "yaml"), i === -1 && t === "---" && s === "yaml" && (i = e.indexOf(`
...`, r)), i === -1) return;
  let a = i + 1 + Ue$1, o = e.charAt(a + 1);
  if (!/\s?/.test(o)) return;
  let l = e.slice(0, a), c;
  return { language: s, explicitLanguage: n || null, value: e.slice(r + 1, i), startDelimiter: t, endDelimiter: l.slice(-Ue$1), raw: l, start: { line: 1, column: 0, index: 0 }, end: { index: l.length, get line() {
    return c ?? (c = l.split(`
`)), c.length;
  }, get column() {
    return c ?? (c = l.split(`
`)), I$1(0, c, -1).length;
  } }, [St$1]: true };
}
function Ds(e) {
  let t = Ns(e);
  return t ? { frontMatter: t, get content() {
    let { raw: r } = t;
    return vt$1(r) + e.slice(r.length);
  } } : { content: e };
}
var Qt$1 = Ds;
var Zr$1 = "inline", Xt$1 = { area: "none", base: "none", basefont: "none", datalist: "none", head: "none", link: "none", meta: "none", noembed: "none", noframes: "none", param: "block", rp: "none", script: "block", style: "none", template: "inline", title: "none", html: "block", body: "block", address: "block", blockquote: "block", center: "block", dialog: "block", div: "block", figure: "block", figcaption: "block", footer: "block", form: "block", header: "block", hr: "block", legend: "block", listing: "block", main: "block", p: "block", plaintext: "block", pre: "block", search: "block", xmp: "block", slot: "contents", ruby: "ruby", rt: "ruby-text", article: "block", aside: "block", h1: "block", h2: "block", h3: "block", h4: "block", h5: "block", h6: "block", hgroup: "block", nav: "block", section: "block", dir: "block", dd: "block", dl: "block", dt: "block", menu: "block", ol: "block", ul: "block", li: "list-item", table: "table", caption: "table-caption", colgroup: "table-column-group", col: "table-column", thead: "table-header-group", tbody: "table-row-group", tfoot: "table-footer-group", tr: "table-row", td: "table-cell", th: "table-cell", input: "inline-block", button: "inline-block", fieldset: "block", details: "block", summary: "block", marquee: "inline-block", option: "block", optgroup: "block", select: "inline-block", source: "block", track: "block", meter: "inline-block", progress: "inline-block", object: "inline-block", video: "inline-block", audio: "inline-block" }, en$1 = "normal", Jt$1 = { listing: "pre", plaintext: "pre", pre: "pre", xmp: "pre", nobr: "nowrap", table: "initial", textarea: "pre-wrap" };
function Is(e) {
  return e.kind === "element" && !e.hasExplicitNamespace && !["html", "svg"].includes(e.namespace);
}
var oe$1 = Is;
var Rs = (e) => T$1(0, e, /^[\t\f\r ]*\n/g, ""), Zt$1 = (e) => Rs(P.trimEnd(e)), tn$1 = (e) => {
  let t = e, r = P.getLeadingWhitespace(t);
  r && (t = t.slice(r.length));
  let n = P.getTrailingWhitespace(t);
  return n && (t = t.slice(0, -n.length)), { leadingWhitespace: r, trailingWhitespace: n, text: t };
};
function Ct$1(e, t) {
  return !!(e.kind === "ieConditionalComment" && e.lastChild && !e.lastChild.isSelfClosing && !e.lastChild.endSourceSpan || e.kind === "ieConditionalComment" && !e.complete || Y$1(e) && e.children.some((r) => r.kind !== "text" && r.kind !== "interpolation") || wt$1(e, t) && !O$1(e, t) && e.kind !== "interpolation");
}
function le$1(e) {
  return e.kind === "attribute" || !e.parent || !e.prev ? false : Os(e.prev);
}
function Os(e) {
  return e.kind === "comment" && e.value.trim() === "prettier-ignore";
}
function N$1(e) {
  return e.kind === "text" || e.kind === "comment";
}
function O$1(e, t) {
  return e.kind === "element" && (e.fullName === "script" || e.fullName === "style" || e.fullName === "svg:style" || e.fullName === "svg:script" || e.fullName === "mj-style" && t.parser === "mjml" || oe$1(e) && (e.name === "script" || e.name === "style"));
}
function rn$1(e, t) {
  return e.children && !O$1(e, t);
}
function nn$1(e, t) {
  return O$1(e, t) || e.kind === "interpolation" || er$1(e);
}
function er$1(e) {
  return dn(e).startsWith("pre");
}
function sn$1(e, t) {
  let r = n();
  if (r && !e.prev && e.parent?.tagDefinition?.ignoreFirstLf) return e.kind === "interpolation";
  return r;
  function n() {
    return ae$1(e) || e.kind === "angularControlFlowBlock" ? false : (e.kind === "text" || e.kind === "interpolation") && e.prev && (e.prev.kind === "text" || e.prev.kind === "interpolation") ? true : !e.parent || e.parent.cssDisplay === "none" ? false : Y$1(e.parent) ? true : !(!e.prev && (e.parent.kind === "root" || Y$1(e) && e.parent || O$1(e.parent, t) || Ge$1(e.parent, t) || !Vs(e.parent.cssDisplay)) || e.prev && !zs(e.prev.cssDisplay));
  }
}
function an$1(e, t) {
  return ae$1(e) || e.kind === "angularControlFlowBlock" ? false : (e.kind === "text" || e.kind === "interpolation") && e.next && (e.next.kind === "text" || e.next.kind === "interpolation") ? true : !e.parent || e.parent.cssDisplay === "none" ? false : Y$1(e.parent) ? true : !(!e.next && (e.parent.kind === "root" || Y$1(e) && e.parent || O$1(e.parent, t) || Ge$1(e.parent, t) || !Us(e.parent.cssDisplay)) || e.next && !Ws(e.next.cssDisplay));
}
function on$1(e, t) {
  return Gs(e.cssDisplay) && !O$1(e, t);
}
function We$1(e) {
  return ae$1(e) || e.next && e.sourceSpan.end && e.sourceSpan.end.line + 1 < e.next.sourceSpan.start.line;
}
function ln$1(e) {
  return tr$1(e) || e.kind === "element" && e.children.length > 0 && (["body", "script", "style"].includes(e.name) || e.children.some((t) => Bs(t))) || e.firstChild && e.firstChild === e.lastChild && e.firstChild.kind !== "text" && un$1(e.firstChild) && (!e.lastChild.isTrailingSpaceSensitive || pn$1(e.lastChild));
}
function tr$1(e) {
  return e.kind === "element" && e.children.length > 0 && (["html", "head", "ul", "ol", "select"].includes(e.name) || e.cssDisplay.startsWith("table") && e.cssDisplay !== "table-cell");
}
function kt$1(e) {
  return hn$1(e) || e.prev && Ms(e.prev) || cn$1(e);
}
function Ms(e) {
  return hn$1(e) || e.kind === "element" && e.fullName === "br" || cn$1(e);
}
function cn$1(e) {
  return un$1(e) && pn$1(e);
}
function un$1(e) {
  return e.hasLeadingSpaces && (e.prev ? e.prev.sourceSpan.end.line < e.sourceSpan.start.line : e.parent.kind === "root" || e.parent.startSourceSpan.end.line < e.sourceSpan.start.line);
}
function pn$1(e) {
  return e.hasTrailingSpaces && (e.next ? e.next.sourceSpan.start.line > e.sourceSpan.end.line : e.parent.kind === "root" || e.parent.endSourceSpan && e.parent.endSourceSpan.start.line > e.sourceSpan.end.line);
}
function hn$1(e) {
  switch (e.kind) {
    case "ieConditionalComment":
    case "comment":
    case "directive":
      return true;
    case "element":
      return ["script", "select"].includes(e.name);
  }
  return false;
}
function bt$1(e) {
  return e.lastChild ? bt$1(e.lastChild) : e;
}
function Bs(e) {
  return e.children?.some((t) => t.kind !== "text");
}
function mn$1(e) {
  if (e) switch (e) {
    case "module":
    case "text/javascript":
    case "text/babel":
    case "text/jsx":
    case "application/javascript":
      return "babel";
    case "application/x-typescript":
      return "typescript";
    case "text/markdown":
      return "markdown";
    case "text/html":
      return "html";
    case "text/x-handlebars-template":
      return "glimmer";
    default:
      if (e.endsWith("json") || e.endsWith("importmap") || e === "speculationrules") return "json";
  }
}
function qs(e, t) {
  let { name: r, attrMap: n } = e;
  if (r !== "script" || se$1(n, "src")) return;
  let { type: i, lang: s } = e.attrMap;
  return !s && !i ? "babel" : _t(t, { language: s }) ?? mn$1(i);
}
function Hs(e, t) {
  if (!wt$1(e, t)) return;
  let { attrMap: r } = e;
  if (se$1(r, "src")) return;
  let { type: n, lang: i } = r;
  return _t(t, { language: i }) ?? mn$1(n);
}
function Fs(e, t) {
  if (e.name === "style") {
    let { lang: r } = e.attrMap;
    return r ? _t(t, { language: r }) : "css";
  }
  if (e.name === "mj-style" && t.parser === "mjml") return "css";
}
function rr$1(e, t) {
  return qs(e, t) ?? Fs(e, t) ?? Hs(e, t);
}
function ze$1(e) {
  return e === "block" || e === "list-item" || e.startsWith("table");
}
function Vs(e) {
  return !ze$1(e) && e !== "inline-block";
}
function Us(e) {
  return !ze$1(e) && e !== "inline-block";
}
function Ws(e) {
  return !ze$1(e);
}
function zs(e) {
  return !ze$1(e);
}
function Gs(e) {
  return !ze$1(e) && e !== "inline-block";
}
function Y$1(e) {
  return dn(e).startsWith("pre");
}
function $s(e, t) {
  let r = e;
  for (; r; ) {
    if (t(r)) return true;
    r = r.parent;
  }
  return false;
}
function fn$1(e, t) {
  if (ce$1(e, t)) return "block";
  if (e.prev?.kind === "comment") {
    let n = e.prev.value.match(/^\s*display:\s*([a-z]+)\s*$/);
    if (n) return n[1];
  }
  let r = false;
  if (e.kind === "element" && e.namespace === "svg") if ($s(e, (n) => n.fullName === "svg:foreignObject")) r = true;
  else return e.name === "svg" ? "inline-block" : "block";
  switch (t.htmlWhitespaceSensitivity) {
    case "strict":
      return "inline";
    case "ignore":
      return "block";
    default:
      if (e.kind === "element" && (!e.namespace || r || oe$1(e)) && se$1(Xt$1, e.name)) return Xt$1[e.name];
  }
  return Zr$1;
}
function dn(e) {
  return e.kind === "element" && (!e.namespace || oe$1(e)) && se$1(Jt$1, e.name) ? Jt$1[e.name] : en$1;
}
function nr$1(e) {
  return T$1(0, T$1(0, e, "&apos;", "'"), "&quot;", '"');
}
function w(e) {
  return nr$1(e.value);
}
var js = /* @__PURE__ */ new Set(["template", "style", "script"]);
function Ge$1(e, t) {
  return ce$1(e, t) && !js.has(e.fullName);
}
function ce$1(e, t) {
  return t.parser === "vue" && e.kind === "element" && e.parent.kind === "root" && e.fullName.toLowerCase() !== "html";
}
function wt$1(e, t) {
  return ce$1(e, t) && (Ge$1(e, t) || e.attrMap.lang && e.attrMap.lang !== "html");
}
function gn$1(e) {
  let t = e.fullName;
  return t.charAt(0) === "#" || t === "slot-scope" || t === "v-slot" || t.startsWith("v-slot:");
}
function _n$1(e, t) {
  let r = e.parent;
  if (!ce$1(r, t)) return false;
  let n = r.fullName, i = e.fullName;
  return n === "script" && i === "setup" || n === "style" && i === "vars";
}
function Tt$1(e, t = e.value) {
  return e.parent.isWhitespaceSensitive ? e.parent.isIndentationSensitive ? L$1(t) : L$1(P.dedentString(Zt$1(t)), k$1) : R$1(S$1, P.split(t));
}
function yt$1(e, t) {
  return ce$1(e, t) && e.name === "script";
}
function Ys(e) {
  let { valueSpan: t, value: r } = e;
  return t.end.offset - t.start.offset === r.length + 2;
}
function Et$1(e, t) {
  if (Ys(e)) return false;
  let { value: r } = e;
  return /^PRETTIER_HTML_PLACEHOLDER_\d+_\d+_IN_JS$/.test(r) || t.parser === "lwc" && r.startsWith("{") && r.endsWith("}");
}
var Sn$1 = /\{\{(.+?)\}\}/s, vn$1 = ({ node: { value: e } }) => Sn$1.test(e);
async function Cn$1(e, t, r) {
  let n = w(r.node), i = [];
  for (let [s, a] of n.split(Sn$1).entries()) if (s % 2 === 0) i.push(L$1(a));
  else try {
    i.push(C(["{{", A([S$1, await E(a, e, { parser: "__ng_interpolation", __isInHtmlInterpolation: true })]), S$1, "}}"]));
  } catch {
    i.push("{{", L$1(a), "}}");
  }
  return i;
}
var ir$1 = (e) => (t, r, n) => E(w(n.node), t, { parser: e }, q$1), Ks = [{ test(e) {
  let t = e.node.fullName;
  return t.startsWith("(") && t.endsWith(")") || t.startsWith("on-");
}, print: ir$1("__ng_action") }, { test(e) {
  let t = e.node.fullName;
  return t.startsWith("[") && t.endsWith("]") || /^bind(?:on)?-/.test(t) || /^ng-(?:if|show|hide|class|style)$/.test(t);
}, print: ir$1("__ng_binding") }, { test: (e) => e.node.fullName.startsWith("*"), print: ir$1("__ng_directive") }, { test: (e) => /^i18n(?:-.+)?$/.test(e.node.fullName), print: Qs }, { test: vn$1, print: Cn$1 }].map(({ test: e, print: t }) => ({ test: (r, n) => n.parser === "angular" && e(r), print: t }));
function Qs(e, t, { node: r }) {
  let n = w(r);
  return j$1(gt$1(Tt$1(r, n.trim())), !n.includes("@@"));
}
var kn$1 = Ks;
var bn$1 = ({ node: e }, t) => !t.parentParser && e.fullName === "class" && !e.value.includes("{{"), wn$1 = (e, t, r) => T$1(0, w(r.node).trim(), /\s+/g, " ");
var sr$1 = ["onabort", "onafterprint", "onauxclick", "onbeforeinput", "onbeforematch", "onbeforeprint", "onbeforetoggle", "onbeforeunload", "onblur", "oncancel", "oncanplay", "oncanplaythrough", "onchange", "onclick", "onclose", "oncommand", "oncontextlost", "oncontextmenu", "oncontextrestored", "oncopy", "oncuechange", "oncut", "ondblclick", "ondrag", "ondragend", "ondragenter", "ondragleave", "ondragover", "ondragstart", "ondrop", "ondurationchange", "onemptied", "onended", "onerror", "onfocus", "onformdata", "onhashchange", "oninput", "oninvalid", "onkeydown", "onkeypress", "onkeyup", "onlanguagechange", "onload", "onloadeddata", "onloadedmetadata", "onloadstart", "onmessage", "onmessageerror", "onmousedown", "onmouseenter", "onmouseleave", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "onoffline", "ononline", "onpagehide", "onpagereveal", "onpageshow", "onpageswap", "onpaste", "onpause", "onplay", "onplaying", "onpopstate", "onprogress", "onratechange", "onrejectionhandled", "onreset", "onresize", "onscroll", "onscrollend", "onsecuritypolicyviolation", "onseeked", "onseeking", "onselect", "onslotchange", "onstalled", "onstorage", "onsubmit", "onsuspend", "ontimeupdate", "ontoggle", "onunhandledrejection", "onunload", "onvolumechange", "onwaiting", "onwheel"];
var Js = new Set(sr$1), Tn$1 = ({ node: e }, t) => Js.has(e.fullName) && !t.parentParser && !e.value.includes("{{"), yn$1 = (e, t, r) => E(w(r.node), e, { parser: "babel", __isHtmlInlineEventHandler: true }, () => false);
function Zs(e) {
  let t = [];
  for (let r of e.split(";")) {
    if (r = P.trim(r), !r) continue;
    let [n, ...i] = P.split(r);
    t.push({ name: n, value: i });
  }
  return t;
}
var En$1 = Zs;
var xn$1 = ({ node: e }, t) => e.fullName === "allow" && !t.parentParser && e.parent.fullName === "iframe" && !e.value.includes("{{");
function Ln$1(e, t, r) {
  let { node: n } = r, i = En$1(w(n));
  return i.length === 0 ? [""] : j$1(i.map(({ name: s, value: a }, o) => [[s, ...a].join(" "), o === i.length - 1 ? $$1(";") : [";", S$1]]));
}
function An$1(e) {
  return e === "	" || e === `
` || e === "\f" || e === "\r" || e === " ";
}
var ea = /^[ \t\n\r\u000c]+/, ta = /^[, \t\n\r\u000c]+/, ra = /^[^ \t\n\r\u000c]+/, na = /[,]+$/, Pn$1 = /^\d+$/, ia = /^-?(?:[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?$/;
function sa(e) {
  let t = e.length, r, n, i, s, a, o = 0, l;
  function c(h) {
    let f, g = h.exec(e.substring(o));
    if (g) return [f] = g, o += f.length, f;
  }
  let u = [];
  for (; ; ) {
    if (c(ta), o >= t) {
      if (u.length === 0) throw new Error("Must contain one or more image candidate strings.");
      return u;
    }
    l = o, r = c(ra), n = [], r.slice(-1) === "," ? (r = r.replace(na, ""), _()) : d();
  }
  function d() {
    for (c(ea), i = "", s = "in descriptor"; ; ) {
      if (a = e.charAt(o), s === "in descriptor") if (An$1(a)) i && (n.push(i), i = "", s = "after descriptor");
      else if (a === ",") {
        o += 1, i && n.push(i), _();
        return;
      } else if (a === "(") i += a, s = "in parens";
      else if (a === "") {
        i && n.push(i), _();
        return;
      } else i += a;
      else if (s === "in parens") if (a === ")") i += a, s = "in descriptor";
      else if (a === "") {
        n.push(i), _();
        return;
      } else i += a;
      else if (s === "after descriptor" && !An$1(a)) if (a === "") {
        _();
        return;
      } else s = "in descriptor", o -= 1;
      o += 1;
    }
  }
  function _() {
    let h = false, f, g, v, W, ie = {}, Q, at, Ce, Be, Ut;
    for (W = 0; W < n.length; W++) Q = n[W], at = Q[Q.length - 1], Ce = Q.substring(0, Q.length - 1), Be = parseInt(Ce, 10), Ut = parseFloat(Ce), Pn$1.test(Ce) && at === "w" ? ((f || g) && (h = true), Be === 0 ? h = true : f = Be) : ia.test(Ce) && at === "x" ? ((f || g || v) && (h = true), Ut < 0 ? h = true : g = Ut) : Pn$1.test(Ce) && at === "h" ? ((v || g) && (h = true), Be === 0 ? h = true : v = Be) : h = true;
    if (!h) ie.source = { value: r, startOffset: l }, f && (ie.width = { value: f }), g && (ie.density = { value: g }), v && (ie.height = { value: v }), u.push(ie);
    else throw new Error(`Invalid srcset descriptor found in "${e}" at "${Q}".`);
  }
}
var Nn$1 = sa;
var Dn$1 = (e) => e.node.fullName === "srcset" && (e.parent.fullName === "img" || e.parent.fullName === "source"), In$1 = { width: "w", height: "h", density: "x" }, aa = Object.keys(In$1);
function Rn$1(e, t, r) {
  let n = w(r.node), i = Nn$1(n), s = aa.filter((h) => i.some((f) => se$1(f, h)));
  if (s.length > 1) throw new Error("Mixed descriptor in srcset is not supported");
  let [a] = s, o = In$1[a], l = i.map((h) => h.source.value), c = Math.max(...l.map((h) => h.length)), u = i.map((h) => h[a] ? String(h[a].value) : ""), d = u.map((h) => {
    let f = h.indexOf(".");
    return f === -1 ? h.length : f;
  }), _ = Math.max(...d);
  return j$1(R$1([",", S$1], l.map((h, f) => {
    let g = [h], v = u[f];
    if (v) {
      let W = c - h.length + 1, ie = _ - d[f], Q = " ".repeat(W + ie);
      g.push($$1(Q, " "), v + o);
    }
    return g;
  })));
}
var On$1 = ({ node: e }, t) => e.fullName === "style" && !t.parentParser && !e.value.includes("{{"), Mn$1 = async (e, t, r) => j$1(await e(w(r.node), { parser: "css", __isHTMLStyleAttribute: true }));
var oa = /* @__PURE__ */ new WeakMap();
function la(e, t) {
  return mt$1(oa, e.root, (r) => r.children.some((n) => yt$1(n, t) && ["ts", "typescript"].includes(n.attrMap.lang)));
}
var H$1 = la;
function Bn$1(e, t, r) {
  let n = w(r.node);
  return E(`type T<${n}> = any`, e, { parser: "babel-ts", __isEmbeddedTypescriptGenericParameters: true }, q$1);
}
function qn$1(e, t, r, n) {
  let i = w(r.node), s = H$1(r, n) ? "babel-ts" : "babel";
  return E(`function _(${i}) {}`, e, { parser: s, __isVueBindings: true });
}
async function Hn$1(e, t, r, n) {
  let i = w(r.node), { left: s, operator: a, right: o } = ca(i), l = H$1(r, n);
  return [C(await E(`function _(${s}) {}`, e, { parser: l ? "babel-ts" : "babel", __isVueForBindingLeft: true })), " ", a, " ", await E(o, e, { parser: l ? "__ts_expression" : "__js_expression" })];
}
function ca(e) {
  let t = /(.*?)\s+(in|of)\s+(.*)/s, r = e.match(t);
  if (!r) return;
  let n = { for: r[3].trim() };
  if (!n.for) return;
  let i = /,([^,\]}]*)(?:,([^,\]}]*))?$/, s = /^\(|\)$/g, a = T$1(0, r[1].trim(), s, ""), o = a.match(i);
  o ? (n.alias = a.replace(i, ""), n.iterator1 = o[1].trim(), o[2] && (n.iterator2 = o[2].trim())) : n.alias = a;
  let l = [n.alias, n.iterator1, n.iterator2];
  if (!l.some((c, u) => !c && (u === 0 || l.slice(u + 1).some(Boolean)))) return { left: l.filter(Boolean).join(","), operator: r[2], right: n.for };
}
var ua = [{ test: (e) => e.node.fullName === "v-for", print: Hn$1 }, { test: (e, t) => e.node.fullName === "generic" && yt$1(e.parent, t), print: Bn$1 }, { test: ({ node: e }, t) => gn$1(e) || _n$1(e, t), print: qn$1 }, { test(e) {
  let t = e.node.fullName;
  return t.startsWith("@") || t.startsWith("v-on:");
}, print: pa }, { test(e) {
  let t = e.node.fullName;
  return t.startsWith(":") || t.startsWith(".") || t.startsWith("v-bind:");
}, print: ha }, { test: (e) => e.node.fullName.startsWith("v-"), print: Fn$1 }].map(({ test: e, print: t }) => ({ test: (r, n) => n.parser === "vue" && e(r, n), print: t }));
async function pa(e, t, r, n) {
  try {
    return await Fn$1(e, t, r, n);
  } catch (a) {
    if (a.cause?.code !== "BABEL_PARSER_SYNTAX_ERROR") throw a;
  }
  let i = w(r.node), s = H$1(r, n) ? "__vue_ts_event_binding" : "__vue_event_binding";
  return E(i, e, { parser: s }, q$1);
}
function ha(e, t, r, n) {
  let i = w(r.node), s = H$1(r, n) ? "__vue_ts_expression" : "__vue_expression";
  return E(i, e, { parser: s }, q$1);
}
function Fn$1(e, t, r, n) {
  let i = w(r.node), s = H$1(r, n) ? "__ts_expression" : "__js_expression";
  return E(i, e, { parser: s }, q$1);
}
var Vn$1 = ua;
var ma = [{ test: Dn$1, print: Rn$1 }, { test: On$1, print: Mn$1 }, { test: Tn$1, print: yn$1 }, { test: bn$1, print: wn$1 }, { test: xn$1, print: Ln$1 }, ...Vn$1, ...kn$1].map(({ test: e, print: t }) => ({ test: e, print: da(t) }));
function fa(e, t) {
  let { node: r } = e, { value: n } = r;
  if (n) return Et$1(r, t) ? [r.rawName, "=", n] : ma.find(({ test: i }) => i(e, t))?.print;
}
function da(e) {
  return async (t, r, n, i) => {
    let s = await e(t, r, n, i);
    if (s) return s = Gt$1(s, (a) => typeof a == "string" ? T$1(0, a, '"', "&quot;") : a), [n.node.rawName, '="', C(s), '"'];
  };
}
var Un$1 = fa;
var F = (e) => e.sourceSpan.start.offset, J = (e) => e.sourceSpan.end.offset;
function $e(e, t) {
  return [e.isSelfClosing ? "" : ga(e, t), ue$1(e, t)];
}
function ga(e, t) {
  return e.lastChild && K$1(e.lastChild) ? "" : [_a(e, t), xt$1(e, t)];
}
function ue$1(e, t) {
  return (e.next ? V$1(e.next) : he$1(e.parent)) ? "" : [pe$1(e, t), M$1(e, t)];
}
function _a(e, t) {
  return he$1(e) ? pe$1(e.lastChild, t) : "";
}
function M$1(e, t) {
  return K$1(e) ? xt$1(e.parent, t) : je$1(e) ? Lt$1(e.next, t) : "";
}
function xt$1(e, t) {
  if (zn$1(e, t)) return "";
  switch (e.kind) {
    case "ieConditionalComment":
      return "<!";
    case "element":
      if (e.hasHtmComponentClosingTag) return "<//";
    default:
      return `</${e.rawName}`;
  }
}
function pe$1(e, t) {
  if (zn$1(e, t)) return "";
  switch (e.kind) {
    case "ieConditionalComment":
    case "ieConditionalEndComment":
      return "[endif]-->";
    case "ieConditionalStartComment":
      return "]><!-->";
    case "interpolation":
      return "}}";
    case "angularIcuExpression":
      return "}";
    case "element":
      if (e.isSelfClosing) return "/>";
    default:
      return ">";
  }
}
function zn$1(e, t) {
  return !e.isSelfClosing && !e.endSourceSpan && (le$1(e) || Ct$1(e.parent, t));
}
function V$1(e) {
  return e.prev && e.prev.kind !== "docType" && e.kind !== "angularControlFlowBlock" && !N$1(e.prev) && e.isLeadingSpaceSensitive && !e.hasLeadingSpaces;
}
function he$1(e) {
  return e.lastChild?.isTrailingSpaceSensitive && !e.lastChild.hasTrailingSpaces && !N$1(bt$1(e.lastChild)) && !Y$1(e);
}
function K$1(e) {
  return !e.next && !e.hasTrailingSpaces && e.isTrailingSpaceSensitive && N$1(bt$1(e));
}
function je$1(e) {
  return e.next && !N$1(e.next) && N$1(e) && e.isTrailingSpaceSensitive && !e.hasTrailingSpaces;
}
function Sa(e) {
  let t = e.trim().match(/^prettier-ignore-attribute(?:\s+(.+))?$/s);
  return t ? t[1] ? t[1].split(/\s+/) : true : false;
}
function Ye$1(e) {
  return !e.prev && e.isLeadingSpaceSensitive && !e.hasLeadingSpaces;
}
function va(e, t, r) {
  let { node: n } = e, { attrs: i = [], startTagComments: s = [] } = n;
  if (i.length === 0 && s.length === 0) return n.isSelfClosing ? " " : "";
  let a = n.prev?.kind === "comment" && Sa(n.prev.value), o = typeof a == "boolean" ? () => a : Array.isArray(a) ? (g) => a.includes(g.rawName) : () => false, l = ["attrs", "startTagComments"].filter((g) => X$1(n[g])), c = l.flatMap((g) => e.map(({ node: v }) => ({ loc: F(v), printed: v.kind === "attribute" && o(v) ? L$1(t.originalText.slice(F(v), J(v))) : r() }), g));
  l.length > 1 && c.sort((g, v) => g.loc - v.loc);
  let u = n.kind === "element" && n.fullName === "script" && i.length === 1 && i[0].fullName === "src" && n.children.length === 0 && s.length === 0, d = s.some((g) => g.type === "single"), h = d || t.singleAttributePerLine && i.length > 1 && !ce$1(n, t) ? k$1 : S$1, f = [A([u ? " " : d ? k$1 : S$1, R$1(h, c.map(({ printed: g }) => g))])];
  return n.firstChild && Ye$1(n.firstChild) || n.isSelfClosing && he$1(n.parent) || u ? f.push(n.isSelfClosing ? " " : "") : f.push(t.bracketSameLine ? n.isSelfClosing ? " " : "" : n.isSelfClosing ? S$1 : y$1), f;
}
function Ca(e) {
  return e.firstChild && Ye$1(e.firstChild) ? "" : At$1(e);
}
function Ke$1(e, t, r) {
  let { node: n } = e;
  return [me$1(n, t), va(e, t, r), n.isSelfClosing ? "" : Ca(n)];
}
function me$1(e, t) {
  return e.prev && je$1(e.prev) ? "" : [B(e, t), Lt$1(e, t)];
}
function B(e, t) {
  return Ye$1(e) ? At$1(e.parent) : V$1(e) ? pe$1(e.prev, t) : "";
}
var Wn$1 = "<!doctype";
function Lt$1(e, t) {
  switch (e.kind) {
    case "ieConditionalComment":
    case "ieConditionalStartComment":
      return `<!--[if ${e.condition}`;
    case "ieConditionalEndComment":
      return "<!--<!";
    case "interpolation":
      return "{{";
    case "docType": {
      if (e.value === "html") {
        let { filepath: n } = t;
        if (n && /\.html?$/.test(n)) return Wn$1;
      }
      let r = F(e);
      return t.originalText.slice(r, r + Wn$1.length);
    }
    case "angularIcuExpression":
      return "{";
    case "element":
      if (e.condition) return `<!--[if ${e.condition}]><!--><${e.rawName}`;
    default:
      return `<${e.rawName}`;
  }
}
function At$1(e) {
  switch (e.kind) {
    case "ieConditionalComment":
      return "]>";
    case "element":
      if (e.condition) return "><!--<![endif]-->";
    default:
      return ">";
  }
}
function ka(e, t) {
  if (!e.endSourceSpan) return "";
  let r = e.startSourceSpan.end.offset;
  e.firstChild && Ye$1(e.firstChild) && (r -= At$1(e).length);
  let n = e.endSourceSpan.start.offset;
  return e.lastChild && K$1(e.lastChild) ? n += xt$1(e, t).length : he$1(e) && (n -= pe$1(e.lastChild, t).length), t.originalText.slice(r, n);
}
var Pt$1 = ka;
var ba = /* @__PURE__ */ new Set(["if", "else if", "for", "switch", "case"]);
function wa(e, t) {
  let { node: r } = e;
  switch (r.kind) {
    case "element":
      if (O$1(r, t) || r.kind === "interpolation") return;
      if (!r.isSelfClosing && wt$1(r, t)) {
        let n = rr$1(r, t);
        return n ? async (i, s) => {
          let a = Pt$1(r, t), o = /^\s*$/.test(a), l = "";
          return o || (l = await i(Zt$1(a), { parser: n, __embeddedInHtml: true }), o = l === ""), [B(r, t), C(Ke$1(e, t, s)), o ? "" : k$1, l, o ? "" : k$1, $e(r, t), M$1(r, t)];
        } : void 0;
      }
      break;
    case "text":
      if (O$1(r.parent, t)) {
        let n = rr$1(r.parent, t);
        if (n) return async (i) => {
          let s = n === "markdown" ? P.dedentString(r.value.replace(/^[^\S\n]*\n/, "")) : r.value, a = { parser: n, __embeddedInHtml: true };
          if (t.parser === "html" && n === "babel") {
            let o = "script", { attrMap: l } = r.parent;
            l && (l.type === "module" || (l.type === "text/babel" || l.type === "text/jsx") && l["data-type"] === "module") && (o = "module"), a.__babelSourceType = o;
          }
          return [G$1, B(r, t), await i(s, a), M$1(r, t)];
        };
      } else if (r.parent.kind === "interpolation") return async (n) => {
        let i = { __isInHtmlInterpolation: true, __embeddedInHtml: true };
        return t.parser === "angular" ? i.parser = "__ng_interpolation" : t.parser === "vue" ? i.parser = H$1(e, t) ? "__vue_ts_expression" : "__vue_expression" : i.parser = "__js_expression", [A([S$1, await n(r.value, i)]), r.parent.next && V$1(r.parent.next) ? " " : S$1];
      };
      break;
    case "attribute":
      return Un$1(e, t);
    case "angularControlFlowBlockParameters":
      return ba.has(e.parent.name) ? $r$1 : void 0;
    case "angularLetDeclarationInitializer":
      return (n) => E(r.value, n, { parser: "__ng_binding", __isInHtmlAttribute: false });
  }
}
var Gn$1 = wa;
var Qe$1 = null;
function Xe$1(e) {
  if (Qe$1 !== null && typeof Qe$1.property) {
    let t = Qe$1;
    return Qe$1 = Xe$1.prototype = null, t;
  }
  return Qe$1 = Xe$1.prototype = e ?? /* @__PURE__ */ Object.create(null), new Xe$1();
}
var Ta = 10;
for (let e = 0; e <= Ta; e++) Xe$1();
function ar$1(e) {
  return Xe$1(e);
}
function ya(e, t = "type") {
  ar$1(e);
  function r(n) {
    let i = n[t], s = e[i];
    if (!Array.isArray(s)) throw Object.assign(new Error(`Missing visitor keys for '${i}'.`), { node: n });
    return s;
  }
  return r;
}
var $n$1 = ya;
var Je$1 = [["children"]], jn$1 = { root: Je$1[0], element: ["attrs", "startTagComments", "children"], ieConditionalComment: Je$1[0], ieConditionalStartComment: [], ieConditionalEndComment: [], interpolation: Je$1[0], text: Je$1[0], docType: [], comment: [], attribute: [], startTagComment: [], cdata: [], angularControlFlowBlock: ["children", "parameters"], angularControlFlowBlockParameters: Je$1[0], angularControlFlowBlockParameter: [], angularLetDeclaration: ["init"], angularLetDeclarationInitializer: [], angularIcuExpression: ["cases"], angularIcuCase: ["expression"] };
var Ea = $n$1(jn$1, "kind"), Yn$1 = Ea;
var xa = /* @__PURE__ */ new Set(["sourceSpan", "startSourceSpan", "endSourceSpan", "nameSpan", "valueSpan", "keySpan", "tagDefinition", "tokens", "valueTokens", "switchValueSourceSpan", "expSourceSpan", "valueSourceSpan"]), La = /* @__PURE__ */ new Set(["if", "else if", "for", "switch", "case"]);
function or$1(e, t, r) {
  if (e.kind === "text" || e.kind === "comment") return null;
  if (e.kind === "yaml" && delete t.value, e.kind === "attribute") {
    let { fullName: n, value: i } = e;
    n === "style" || n === "class" || n === "srcset" && (r.fullName === "img" || r.fullName === "source") || n === "allow" && r.fullName === "iframe" || n.startsWith("on") || n.startsWith("@") || n.startsWith(":") || n.startsWith(".") || n.startsWith("#") || n.startsWith("v-") || n === "vars" && r.fullName === "style" || (n === "setup" || n === "generic") && r.fullName === "script" || n === "slot-scope" || n.startsWith("(") || n.startsWith("[") || n.startsWith("*") || n.startsWith("bind") || n.startsWith("i18n") || n.startsWith("on-") || n.startsWith("ng-") || i?.includes("{{") ? delete t.value : i && (t.value = T$1(0, i, /'|&quot;|&apos;/g, '"'));
  }
  if (e.kind === "docType" && (t.value = T$1(0, e.value.toLowerCase(), /\s+/g, " ")), e.kind === "angularControlFlowBlock" && e.parameters?.children) for (let n of t.parameters.children) La.has(e.name) ? delete n.expression : n.expression = n.expression.trim();
  e.kind === "angularIcuExpression" && (t.switchValue = e.switchValue.trim()), e.kind === "angularLetDeclarationInitializer" && delete t.value, e.kind === "element" && e.isVoid && !e.isSelfClosing && (t.isSelfClosing = true);
}
or$1.ignoredProperties = xa;
var Kn$1 = "format";
var Qn$1 = /^\s*<!--\s*@(?:noformat|noprettier)\s*-->/, Xn$1 = /^\s*<!--\s*@(?:format|prettier)\s*-->/;
var Jn$1 = (e) => Xn$1.test(e), Zn$1 = (e) => Qn$1.test(e), ei$1 = (e) => `<!-- @${Kn$1} -->

${e}`;
var ti$1 = /* @__PURE__ */ new Map([["if", /* @__PURE__ */ new Set(["else if", "else"])], ["else if", /* @__PURE__ */ new Set(["else if", "else"])], ["for", /* @__PURE__ */ new Set(["empty"])], ["defer", /* @__PURE__ */ new Set(["placeholder", "error", "loading"])], ["placeholder", /* @__PURE__ */ new Set(["placeholder", "error", "loading"])], ["error", /* @__PURE__ */ new Set(["placeholder", "error", "loading"])], ["loading", /* @__PURE__ */ new Set(["placeholder", "error", "loading"])]]);
function ri$1(e) {
  let t = J(e);
  return e.kind === "element" && !e.endSourceSpan && X$1(e.children) ? Math.max(t, ri$1(I$1(0, e.children, -1))) : t;
}
function Ze$1(e, t, r) {
  let n = e.node;
  if (le$1(n)) {
    let i = ri$1(n);
    return [B(n, t), L$1(P.trimEnd(t.originalText.slice(F(n) + (n.prev && je$1(n.prev) ? Lt$1(n).length : 0), i - (n.next && V$1(n.next) ? pe$1(n, t).length : 0)))), M$1(n, t)];
  }
  return r();
}
function Nt$1(e, t) {
  return N$1(e) && N$1(t) ? e.isTrailingSpaceSensitive ? e.hasTrailingSpaces ? kt$1(t) ? k$1 : S$1 : "" : kt$1(t) ? k$1 : y$1 : je$1(e) && (le$1(t) || t.firstChild || t.isSelfClosing || t.kind === "element" && t.attrs.length > 0) || e.kind === "element" && e.isSelfClosing && V$1(t) ? "" : t.kind === "comment" && t.isLeadingSpaceSensitive && !t.hasLeadingSpaces ? y$1 : !t.isLeadingSpaceSensitive || kt$1(t) || V$1(t) && e.lastChild && K$1(e.lastChild) && e.lastChild.lastChild && K$1(e.lastChild.lastChild) ? k$1 : t.hasLeadingSpaces ? S$1 : y$1;
}
function Ae$1(e, t, r) {
  let { node: n } = e;
  if (tr$1(n)) return [G$1, ...e.map(() => {
    let s = e.node, a = s.prev ? Nt$1(s.prev, s) : "";
    return [a ? [a, We$1(s.prev) ? k$1 : ""] : "", Ze$1(e, t, r)];
  }, "children")];
  let i = n.children.map(() => /* @__PURE__ */ Symbol(""));
  return e.map(({ node: s, index: a }) => {
    if (N$1(s)) {
      if (s.prev && N$1(s.prev)) {
        let h = Nt$1(s.prev, s);
        if (h) return We$1(s.prev) ? [k$1, k$1, Ze$1(e, t, r)] : [h, Ze$1(e, t, r)];
      }
      return Ze$1(e, t, r);
    }
    let o = [], l = [], c = [], u = [], d = s.prev ? Nt$1(s.prev, s) : "", _ = s.next ? Nt$1(s, s.next) : "";
    return d && (We$1(s.prev) ? o.push(k$1, k$1) : d === k$1 ? o.push(k$1) : N$1(s.prev) ? l.push(d) : l.push($$1("", y$1, { groupId: i[a - 1] }))), _ && (We$1(s) ? N$1(s.next) && u.push(k$1, k$1) : _ === k$1 ? N$1(s.next) && u.push(k$1) : c.push(_)), [...o, C([...l, C([Ze$1(e, t, r), ...c], { id: i[a] })]), ...u];
  }, "children");
}
function ni$1(e, t, r) {
  let { node: n } = e, i = [];
  Da(e) && i.push("} "), i.push("@", n.name);
  let s = Pa(n);
  if (n.parameters && (s || i.push(" "), i.push("(", C(r("parameters")), ")")), s) return i.push(";"), i;
  if (!Na(n)) {
    i.push(" {");
    let a = ii$1(n);
    n.children.length > 0 ? (n.firstChild.hasLeadingSpaces = true, n.lastChild.hasTrailingSpaces = true, i.push(A([k$1, Ae$1(e, t, r)])), a && i.push(k$1, "}")) : a && i.push("}");
  }
  return C(i, { shouldBreak: true });
}
function ii$1(e) {
  return !(e.next?.kind === "angularControlFlowBlock" && ti$1.get(e.name)?.has(e.next.name));
}
var Aa = (e) => e?.kind === "angularControlFlowBlock" && (e.name === "case" || e.name === "default"), Pa = (e) => e?.kind === "angularControlFlowBlock" && e.name === "default never";
function Na(e) {
  return Aa(e) && e.endSourceSpan && e.endSourceSpan.start.offset === e.endSourceSpan.end.offset;
}
function Da(e) {
  let { previous: t } = e;
  return t?.kind === "angularControlFlowBlock" && !le$1(t) && !ii$1(t);
}
function si$1(e, t, r) {
  return [A([y$1, R$1([";", S$1], e.map(r, "children"))]), y$1];
}
function ai$1(e, t, r) {
  let { node: n } = e;
  return [me$1(n, t), C([n.switchValue.trim(), ", ", n.type, n.cases.length > 0 ? [",", A([S$1, R$1(S$1, e.map(r, "cases"))])] : "", y$1]), ue$1(n, t)];
}
function oi$1(e, t, r) {
  let { node: n } = e;
  return [n.value, " {", C([A([y$1, e.map(({ node: i, isLast: s }) => {
    let a = [r()];
    return i.kind === "text" && (i.hasLeadingSpaces && a.unshift(S$1), i.hasTrailingSpaces && !s && a.push(S$1)), a;
  }, "expression")]), y$1]), "}"];
}
function li$1(e, t, r) {
  let { node: n } = e;
  if (Ct$1(n, t)) return [B(n, t), C(Ke$1(e, t, r)), L$1(Pt$1(n, t)), ...$e(n, t), M$1(n, t)];
  let i = n.children.length === 1 && (n.firstChild.kind === "interpolation" || n.firstChild.kind === "angularIcuExpression") && n.firstChild.isLeadingSpaceSensitive && !n.firstChild.hasLeadingSpaces && n.lastChild.isTrailingSpaceSensitive && !n.lastChild.hasTrailingSpaces, s = /* @__PURE__ */ Symbol("element-attr-group-id"), a = (u) => C([C(Ke$1(e, t, r), { id: s }), u, $e(n, t)]);
  if (n.children.length === 0) return a(n.hasDanglingSpaces && n.isDanglingSpaceSensitive ? S$1 : "");
  let o = (u) => i ? Fr$1(u, { groupId: s }) : (O$1(n, t) || Ge$1(n, t)) && n.parent.kind === "root" && t.parser === "vue" && !t.vueIndentScriptAndStyle ? u : A(u), l = () => i ? $$1(y$1, "", { groupId: s }) : n.firstChild.hasLeadingSpaces && n.firstChild.isLeadingSpaceSensitive ? S$1 : n.firstChild.kind === "text" && n.isWhitespaceSensitive && n.isIndentationSensitive ? Hr$1(y$1) : y$1, c = () => (n.next ? V$1(n.next) : he$1(n.parent)) ? n.lastChild.hasTrailingSpaces && n.lastChild.isTrailingSpaceSensitive ? " " : "" : Y$1(n) && K$1(n.lastChild) ? "" : i ? $$1(y$1, "", { groupId: s }) : n.lastChild.hasTrailingSpaces && n.lastChild.isTrailingSpaceSensitive ? S$1 : (n.lastChild.kind === "comment" || n.lastChild.kind === "text" && n.isWhitespaceSensitive && n.isIndentationSensitive) && new RegExp(`\\n[\\t ]{${t.tabWidth * (e.ancestors.length - 1)}}$`).test(n.lastChild.value) ? "" : y$1;
  return a([ln$1(n) ? G$1 : "", o([l(), Ae$1(e, t, r)]), c()]);
}
function ci$1(e) {
  let { node: { value: t, type: r } } = e;
  return r === "single" ? `//${t.trimEnd()}` : ["/*", L$1(t), "*/"];
}
var lr = (function(e) {
  return e[e.RAW_TEXT = 0] = "RAW_TEXT", e[e.ESCAPABLE_RAW_TEXT = 1] = "ESCAPABLE_RAW_TEXT", e[e.PARSABLE_DATA = 2] = "PARSABLE_DATA", e;
})({});
function Z$1(e, t = true) {
  if (e[0] != ":") return [null, e];
  let r = e.indexOf(":", 1);
  if (r === -1) {
    if (t) throw new Error(`Unsupported format "${e}" expecting ":namespace:name"`);
    return [null, e];
  }
  return [e.slice(1, r), e.slice(r + 1)];
}
function cr$1(e) {
  return Z$1(e)[1] === "ng-container";
}
function ur$1(e) {
  return Z$1(e)[1] === "ng-content";
}
function Pe$1(e) {
  return e === null ? null : Z$1(e)[0];
}
function fe$1(e, t) {
  return e ? `:${e}:${t}` : t;
}
var et$1;
var Ia = "math";
var pr$1 = () => /* @__PURE__ */ Object.create(null);
function Ra() {
  return et$1 || (et$1 = pr$1(), ee$1(1, void 0, [["iframe", ["srcdoc"]], ["*", ["innerHTML", "outerHTML"]]]), ee$1(2, void 0, [["*", ["style"]]]), ee$1(4, void 0, [["*", ["formAction"]], ["area", ["href"]], ["a", ["href", "xlink:href"]], ["form", ["action"]], ["img", ["src"]], ["video", ["src"]]]), ee$1(4, Ia, [["*", ["href", "xlink:href"]]]), ee$1(5, void 0, [["base", ["href"]], ["embed", ["src"]], ["frame", ["src"]], ["iframe", ["src"]], ["link", ["href"]], ["object", ["codebase", "data"]]]), ee$1(4, "svg", [["a", ["href", "xlink:href"]]]), ee$1(6, "svg", [["animate", ["attributeName", "values", "to", "from"]], ["set", ["to", "attributeName"]], ["animateMotion", ["attributeName"]], ["animateTransform", ["attributeName"]]]), ee$1(6, void 0, [["unknown", ["attributeName", "values", "to", "from", "sandbox", "allow", "allowFullscreen", "referrerPolicy", "csp", "fetchPriority", "credentialless"]], ["iframe", ["sandbox", "allow", "allowFullscreen", "referrerPolicy", "csp", "fetchPriority", "credentialless"]]]), et$1);
}
function ee$1(e, t, r) {
  let n = t ?? "";
  for (let [s, a] of r) {
    let o = s.toLowerCase();
    for (let l of a) {
      var i;
      let c = l.toLowerCase(), u = (i = et$1)[c] ?? (i[c] = pr$1()), d = u[n] ?? (u[n] = pr$1());
      d[o] = e;
    }
  }
}
function ui$1(e, t, r) {
  let n = Ra()[t.toLowerCase()];
  if (!n) return 0;
  let i = e.toLowerCase(), s;
  if (r) {
    let a = n[r];
    a && (s = a[i] ?? a["*"]);
  }
  if (s === void 0) {
    let a = n[""];
    a && (s = a[i] ?? a["*"]);
  }
  return s ?? 0;
}
var hr$1 = { name: "custom-elements" }, mr = { name: "no-errors-schema" };
var Oa = /-+([a-z0-9])/g;
function pi$1(e) {
  return e.replace(Oa, (...t) => t[1].toUpperCase());
}
var hi$1 = class hi {
};
var Ma = "boolean", Ba = "number", qa = "string", Ha = "object";
function Dt$1(e) {
  let [t, r] = Z$1(e.toLowerCase(), false);
  return t === "svg" || t === "math" ? `:${t}:${r}` : r;
}
var Fa = ["[Element]|textContent,%ariaActiveDescendantElement,%ariaAtomic,%ariaAutoComplete,%ariaBusy,%ariaChecked,%ariaColCount,%ariaColIndex,%ariaColIndexText,%ariaColSpan,%ariaControlsElements,%ariaCurrent,%ariaDescribedByElements,%ariaDescription,%ariaDetailsElements,%ariaDisabled,%ariaErrorMessageElements,%ariaExpanded,%ariaFlowToElements,%ariaHasPopup,%ariaHidden,%ariaInvalid,%ariaKeyShortcuts,%ariaLabel,%ariaLabelledByElements,%ariaLevel,%ariaLive,%ariaModal,%ariaMultiLine,%ariaMultiSelectable,%ariaOrientation,%ariaOwnsElements,%ariaPlaceholder,%ariaPosInSet,%ariaPressed,%ariaReadOnly,%ariaRelevant,%ariaRequired,%ariaRoleDescription,%ariaRowCount,%ariaRowIndex,%ariaRowIndexText,%ariaRowSpan,%ariaSelected,%ariaSetSize,%ariaSort,%ariaValueMax,%ariaValueMin,%ariaValueNow,%ariaValueText,%classList,className,elementTiming,id,innerHTML,*beforecopy,*beforecut,*beforepaste,*fullscreenchange,*fullscreenerror,*search,*webkitfullscreenchange,*webkitfullscreenerror,outerHTML,%part,#scrollLeft,#scrollTop,slot,*message,*mozfullscreenchange,*mozfullscreenerror,*mozpointerlockchange,*mozpointerlockerror,*webglcontextcreationerror,*webglcontextlost,*webglcontextrestored", "[HTMLElement]^[Element]|accessKey,autocapitalize,!autofocus,contentEditable,dir,!draggable,enterKeyHint,!hidden,!inert,innerText,inputMode,lang,nonce,*abort,*animationend,*animationiteration,*animationstart,*auxclick,*beforexrselect,*blur,*cancel,*canplay,*canplaythrough,*change,*click,*close,*contextmenu,*copy,*cuechange,*cut,*dblclick,*drag,*dragend,*dragenter,*dragleave,*dragover,*dragstart,*drop,*durationchange,*emptied,*ended,*error,*focus,*formdata,*gotpointercapture,*input,*invalid,*keydown,*keypress,*keyup,*load,*loadeddata,*loadedmetadata,*loadstart,*lostpointercapture,*mousedown,*mouseenter,*mouseleave,*mousemove,*mouseout,*mouseover,*mouseup,*mousewheel,*paste,*pause,*play,*playing,*pointercancel,*pointerdown,*pointerenter,*pointerleave,*pointermove,*pointerout,*pointerover,*pointerrawupdate,*pointerup,*progress,*ratechange,*reset,*resize,*scroll,*securitypolicyviolation,*seeked,*seeking,*select,*selectionchange,*selectstart,*slotchange,*stalled,*submit,*suspend,*timeupdate,*toggle,*transitioncancel,*transitionend,*transitionrun,*transitionstart,*volumechange,*waiting,*webkitanimationend,*webkitanimationiteration,*webkitanimationstart,*webkittransitionend,*wheel,outerText,!spellcheck,%style,#tabIndex,title,!translate,virtualKeyboardPolicy", "abbr,address,article,aside,b,bdi,bdo,cite,content,code,dd,dfn,dt,em,figcaption,figure,footer,header,hgroup,i,kbd,main,mark,nav,noscript,rb,rp,rt,rtc,ruby,s,samp,search,section,small,strong,sub,sup,u,var,wbr^[HTMLElement]|accessKey,autocapitalize,!autofocus,contentEditable,dir,!draggable,enterKeyHint,!hidden,innerText,inputMode,lang,nonce,*abort,*animationend,*animationiteration,*animationstart,*auxclick,*beforexrselect,*blur,*cancel,*canplay,*canplaythrough,*change,*click,*close,*contextmenu,*copy,*cuechange,*cut,*dblclick,*drag,*dragend,*dragenter,*dragleave,*dragover,*dragstart,*drop,*durationchange,*emptied,*ended,*error,*focus,*formdata,*gotpointercapture,*input,*invalid,*keydown,*keypress,*keyup,*load,*loadeddata,*loadedmetadata,*loadstart,*lostpointercapture,*mousedown,*mouseenter,*mouseleave,*mousemove,*mouseout,*mouseover,*mouseup,*mousewheel,*paste,*pause,*play,*playing,*pointercancel,*pointerdown,*pointerenter,*pointerleave,*pointermove,*pointerout,*pointerover,*pointerrawupdate,*pointerup,*progress,*ratechange,*reset,*resize,*scroll,*securitypolicyviolation,*seeked,*seeking,*select,*selectionchange,*selectstart,*slotchange,*stalled,*submit,*suspend,*timeupdate,*toggle,*transitioncancel,*transitionend,*transitionrun,*transitionstart,*volumechange,*waiting,*webkitanimationend,*webkitanimationiteration,*webkitanimationstart,*webkittransitionend,*wheel,outerText,!spellcheck,%style,#tabIndex,title,!translate,virtualKeyboardPolicy", "media^[HTMLElement]|!autoplay,!controls,%controlsList,%crossOrigin,#currentTime,!defaultMuted,#defaultPlaybackRate,!disableRemotePlayback,!loop,!muted,*encrypted,*waitingforkey,#playbackRate,preload,!preservesPitch,src,%srcObject,#volume", ":svg:^[HTMLElement]|!autofocus,nonce,*abort,*animationend,*animationiteration,*animationstart,*auxclick,*beforexrselect,*blur,*cancel,*canplay,*canplaythrough,*change,*click,*close,*contextmenu,*copy,*cuechange,*cut,*dblclick,*drag,*dragend,*dragenter,*dragleave,*dragover,*dragstart,*drop,*durationchange,*emptied,*ended,*error,*focus,*formdata,*gotpointercapture,*input,*invalid,*keydown,*keypress,*keyup,*load,*loadeddata,*loadedmetadata,*loadstart,*lostpointercapture,*mousedown,*mouseenter,*mouseleave,*mousemove,*mouseout,*mouseover,*mouseup,*mousewheel,*paste,*pause,*play,*playing,*pointercancel,*pointerdown,*pointerenter,*pointerleave,*pointermove,*pointerout,*pointerover,*pointerrawupdate,*pointerup,*progress,*ratechange,*reset,*resize,*scroll,*securitypolicyviolation,*seeked,*seeking,*select,*selectionchange,*selectstart,*slotchange,*stalled,*submit,*suspend,*timeupdate,*toggle,*transitioncancel,*transitionend,*transitionrun,*transitionstart,*volumechange,*waiting,*webkitanimationend,*webkitanimationiteration,*webkitanimationstart,*webkittransitionend,*wheel,%style,#tabIndex", ":svg:graphics^:svg:|", ":svg:animation^:svg:|*begin,*end,*repeat", ":svg:geometry^:svg:|", ":svg:componentTransferFunction^:svg:|", ":svg:gradient^:svg:|", ":svg:textContent^:svg:graphics|", ":svg:textPositioning^:svg:textContent|", "a^[HTMLElement]|charset,coords,download,hash,host,hostname,href,hreflang,name,password,pathname,ping,port,protocol,referrerPolicy,rel,%relList,rev,search,shape,target,text,type,username", "area^[HTMLElement]|alt,coords,download,hash,host,hostname,href,!noHref,password,pathname,ping,port,protocol,referrerPolicy,rel,%relList,search,shape,target,username", "audio^media|", "br^[HTMLElement]|clear", "base^[HTMLElement]|href,target", "body^[HTMLElement]|aLink,background,bgColor,link,*afterprint,*beforeprint,*beforeunload,*blur,*error,*focus,*hashchange,*languagechange,*load,*message,*messageerror,*offline,*online,*pagehide,*pageshow,*popstate,*rejectionhandled,*resize,*scroll,*storage,*unhandledrejection,*unload,text,vLink", "button^[HTMLElement]|!disabled,formAction,formEnctype,formMethod,!formNoValidate,formTarget,name,type,value", "canvas^[HTMLElement]|#height,#width", "content^[HTMLElement]|select", "dl^[HTMLElement]|!compact", "data^[HTMLElement]|value", "datalist^[HTMLElement]|", "details^[HTMLElement]|!open", "dialog^[HTMLElement]|!open,returnValue", "dir^[HTMLElement]|!compact", "div^[HTMLElement]|align", "embed^[HTMLElement]|align,height,name,src,type,width", "fieldset^[HTMLElement]|!disabled,name", "font^[HTMLElement]|color,face,size", "form^[HTMLElement]|acceptCharset,action,autocomplete,encoding,enctype,method,name,!noValidate,target", "frame^[HTMLElement]|frameBorder,longDesc,marginHeight,marginWidth,name,!noResize,scrolling,src", "frameset^[HTMLElement]|cols,*afterprint,*beforeprint,*beforeunload,*blur,*error,*focus,*hashchange,*languagechange,*load,*message,*messageerror,*offline,*online,*pagehide,*pageshow,*popstate,*rejectionhandled,*resize,*scroll,*storage,*unhandledrejection,*unload,rows", "geolocation^[HTMLElement]|accuracymode,!autolocate,*location,*promptaction,*promptdismiss,*validationstatuschange,!watch", "hr^[HTMLElement]|align,color,!noShade,size,width", "head^[HTMLElement]|", "h1,h2,h3,h4,h5,h6^[HTMLElement]|align", "html^[HTMLElement]|version", "iframe^[HTMLElement]|align,allow,!allowFullscreen,!allowPaymentRequest,csp,!credentialless,frameBorder,height,loading,longDesc,marginHeight,marginWidth,name,referrerPolicy,%sandbox,scrolling,src,srcdoc,width", "img^[HTMLElement]|align,alt,border,%crossOrigin,decoding,#height,#hspace,!isMap,loading,longDesc,lowsrc,name,referrerPolicy,sizes,src,srcset,useMap,#vspace,#width", "input^[HTMLElement]|accept,align,alt,autocomplete,!checked,!defaultChecked,defaultValue,dirName,!disabled,%files,formAction,formEnctype,formMethod,!formNoValidate,formTarget,#height,!incremental,!indeterminate,max,#maxLength,min,#minLength,!multiple,name,pattern,placeholder,!readOnly,!required,selectionDirection,#selectionEnd,#selectionStart,#size,src,step,type,useMap,value,%valueAsDate,#valueAsNumber,#width", "li^[HTMLElement]|type,#value", "label^[HTMLElement]|htmlFor", "legend^[HTMLElement]|align", "link^[HTMLElement]|as,charset,%crossOrigin,!disabled,href,hreflang,imageSizes,imageSrcset,integrity,media,referrerPolicy,rel,%relList,rev,%sizes,target,type", "map^[HTMLElement]|name", "marquee^[HTMLElement]|behavior,bgColor,direction,height,#hspace,#loop,#scrollAmount,#scrollDelay,!trueSpeed,#vspace,width", "menu^[HTMLElement]|!compact", "meta^[HTMLElement]|content,httpEquiv,media,name,scheme", "meter^[HTMLElement]|#high,#low,#max,#min,#optimum,#value", "ins,del^[HTMLElement]|cite,dateTime", "ol^[HTMLElement]|!compact,!reversed,#start,type", "object^[HTMLElement]|align,archive,border,code,codeBase,codeType,data,!declare,height,#hspace,name,standby,type,useMap,#vspace,width", "optgroup^[HTMLElement]|!disabled,label", "option^[HTMLElement]|!defaultSelected,!disabled,label,!selected,text,value", "output^[HTMLElement]|defaultValue,%htmlFor,name,value", "p^[HTMLElement]|align", "param^[HTMLElement]|name,type,value,valueType", "picture^[HTMLElement]|", "pre^[HTMLElement]|#width", "progress^[HTMLElement]|#max,#value", "q,blockquote,cite^[HTMLElement]|", "script^[HTMLElement]|!async,charset,%crossOrigin,!defer,event,htmlFor,integrity,!noModule,%referrerPolicy,src,text,type", "select^[HTMLElement]|autocomplete,!disabled,#length,!multiple,name,!required,#selectedIndex,#size,value", "selectedcontent^[HTMLElement]|", "slot^[HTMLElement]|name", "source^[HTMLElement]|#height,media,sizes,src,srcset,type,#width", "span^[HTMLElement]|", "style^[HTMLElement]|!disabled,media,type", "search^[HTMLELement]|", "caption^[HTMLElement]|align", "th,td^[HTMLElement]|abbr,align,axis,bgColor,ch,chOff,#colSpan,headers,height,!noWrap,#rowSpan,scope,vAlign,width", "col,colgroup^[HTMLElement]|align,ch,chOff,#span,vAlign,width", "table^[HTMLElement]|align,bgColor,border,%caption,cellPadding,cellSpacing,frame,rules,summary,%tFoot,%tHead,width", "tr^[HTMLElement]|align,bgColor,ch,chOff,vAlign", "tfoot,thead,tbody^[HTMLElement]|align,ch,chOff,vAlign", "template^[HTMLElement]|", "textarea^[HTMLElement]|autocomplete,#cols,defaultValue,dirName,!disabled,#maxLength,#minLength,name,placeholder,!readOnly,!required,#rows,selectionDirection,#selectionEnd,#selectionStart,value,wrap", "time^[HTMLElement]|dateTime", "title^[HTMLElement]|text", "track^[HTMLElement]|!default,kind,label,src,srclang", "ul^[HTMLElement]|!compact,type", "unknown^[HTMLElement]|", "video^media|!disablePictureInPicture,#height,*enterpictureinpicture,*leavepictureinpicture,!playsInline,poster,#width", ":svg:a^:svg:graphics|", ":svg:animate^:svg:animation|", ":svg:animateMotion^:svg:animation|", ":svg:animateTransform^:svg:animation|", ":svg:circle^:svg:geometry|", ":svg:clipPath^:svg:graphics|", ":svg:defs^:svg:graphics|", ":svg:desc^:svg:|", ":svg:discard^:svg:|", ":svg:ellipse^:svg:geometry|", ":svg:feBlend^:svg:|", ":svg:feColorMatrix^:svg:|", ":svg:feComponentTransfer^:svg:|", ":svg:feComposite^:svg:|", ":svg:feConvolveMatrix^:svg:|", ":svg:feDiffuseLighting^:svg:|", ":svg:feDisplacementMap^:svg:|", ":svg:feDistantLight^:svg:|", ":svg:feDropShadow^:svg:|", ":svg:feFlood^:svg:|", ":svg:feFuncA^:svg:componentTransferFunction|", ":svg:feFuncB^:svg:componentTransferFunction|", ":svg:feFuncG^:svg:componentTransferFunction|", ":svg:feFuncR^:svg:componentTransferFunction|", ":svg:feGaussianBlur^:svg:|", ":svg:feImage^:svg:|", ":svg:feMerge^:svg:|", ":svg:feMergeNode^:svg:|", ":svg:feMorphology^:svg:|", ":svg:feOffset^:svg:|", ":svg:fePointLight^:svg:|", ":svg:feSpecularLighting^:svg:|", ":svg:feSpotLight^:svg:|", ":svg:feTile^:svg:|", ":svg:feTurbulence^:svg:|", ":svg:filter^:svg:|", ":svg:foreignObject^:svg:graphics|", ":svg:g^:svg:graphics|", ":svg:image^:svg:graphics|decoding", ":svg:line^:svg:geometry|", ":svg:linearGradient^:svg:gradient|", ":svg:mpath^:svg:|", ":svg:marker^:svg:|", ":svg:mask^:svg:|", ":svg:metadata^:svg:|", ":svg:path^:svg:geometry|", ":svg:pattern^:svg:|", ":svg:polygon^:svg:geometry|", ":svg:polyline^:svg:geometry|", ":svg:radialGradient^:svg:gradient|", ":svg:rect^:svg:geometry|", ":svg:svg^:svg:graphics|#currentScale,#zoomAndPan", ":svg:script^:svg:|type", ":svg:set^:svg:animation|", ":svg:stop^:svg:|", ":svg:style^:svg:|!disabled,media,title,type", ":svg:switch^:svg:graphics|", ":svg:symbol^:svg:|", ":svg:tspan^:svg:textPositioning|", ":svg:text^:svg:textPositioning|", ":svg:textPath^:svg:textContent|", ":svg:title^:svg:|", ":svg:use^:svg:graphics|", ":svg:view^:svg:|#zoomAndPan", "data^[HTMLElement]|value", "keygen^[HTMLElement]|!autofocus,challenge,!disabled,form,keytype,name", "menuitem^[HTMLElement]|type,label,icon,!disabled,!checked,radiogroup,!default", "summary^[HTMLElement]|", "time^[HTMLElement]|dateTime", ":svg:cursor^:svg:|", ":math:^[HTMLElement]|!autofocus,nonce,*abort,*animationend,*animationiteration,*animationstart,*auxclick,*beforeinput,*beforematch,*beforetoggle,*beforexrselect,*blur,*cancel,*canplay,*canplaythrough,*change,*click,*close,*contentvisibilityautostatechange,*contextlost,*contextmenu,*contextrestored,*copy,*cuechange,*cut,*dblclick,*drag,*dragend,*dragenter,*dragleave,*dragover,*dragstart,*drop,*durationchange,*emptied,*ended,*error,*focus,*formdata,*gotpointercapture,*input,*invalid,*keydown,*keypress,*keyup,*load,*loadeddata,*loadedmetadata,*loadstart,*lostpointercapture,*mousedown,*mouseenter,*mouseleave,*mousemove,*mouseout,*mouseover,*mouseup,*mousewheel,*paste,*pause,*play,*playing,*pointercancel,*pointerdown,*pointerenter,*pointerleave,*pointermove,*pointerout,*pointerover,*pointerrawupdate,*pointerup,*progress,*ratechange,*reset,*resize,*scroll,*scrollend,*securitypolicyviolation,*seeked,*seeking,*select,*selectionchange,*selectstart,*slotchange,*stalled,*submit,*suspend,*timeupdate,*toggle,*transitioncancel,*transitionend,*transitionrun,*transitionstart,*volumechange,*waiting,*webkitanimationend,*webkitanimationiteration,*webkitanimationstart,*webkittransitionend,*wheel,%style,#tabIndex", ":math:math^:math:|", ":math:maction^:math:|", ":math:menclose^:math:|", ":math:merror^:math:|", ":math:mfenced^:math:|", ":math:mfrac^:math:|", ":math:mi^:math:|", ":math:mmultiscripts^:math:|", ":math:mn^:math:|", ":math:mo^:math:|", ":math:mover^:math:|", ":math:mpadded^:math:|", ":math:mphantom^:math:|", ":math:mroot^:math:|", ":math:mrow^:math:|", ":math:ms^:math:|", ":math:mspace^:math:|", ":math:msqrt^:math:|", ":math:mstyle^:math:|", ":math:msub^:math:|", ":math:msubsup^:math:|", ":math:msup^:math:|", ":math:mtable^:math:|", ":math:mtd^:math:|", ":math:mtext^:math:|", ":math:mtr^:math:|", ":math:munder^:math:|", ":math:munderover^:math:|", ":math:semantics^:math:|"], mi$1 = new Map(Object.entries({ class: "className", for: "htmlFor", formaction: "formAction", innerHtml: "innerHTML", readonly: "readOnly", tabindex: "tabIndex", "aria-activedescendant": "ariaActiveDescendantElement", "aria-atomic": "ariaAtomic", "aria-autocomplete": "ariaAutoComplete", "aria-busy": "ariaBusy", "aria-checked": "ariaChecked", "aria-colcount": "ariaColCount", "aria-colindex": "ariaColIndex", "aria-colindextext": "ariaColIndexText", "aria-colspan": "ariaColSpan", "aria-controls": "ariaControlsElements", "aria-current": "ariaCurrent", "aria-describedby": "ariaDescribedByElements", "aria-description": "ariaDescription", "aria-details": "ariaDetailsElements", "aria-disabled": "ariaDisabled", "aria-errormessage": "ariaErrorMessageElements", "aria-expanded": "ariaExpanded", "aria-flowto": "ariaFlowToElements", "aria-haspopup": "ariaHasPopup", "aria-hidden": "ariaHidden", "aria-invalid": "ariaInvalid", "aria-keyshortcuts": "ariaKeyShortcuts", "aria-label": "ariaLabel", "aria-labelledby": "ariaLabelledByElements", "aria-level": "ariaLevel", "aria-live": "ariaLive", "aria-modal": "ariaModal", "aria-multiline": "ariaMultiLine", "aria-multiselectable": "ariaMultiSelectable", "aria-orientation": "ariaOrientation", "aria-owns": "ariaOwnsElements", "aria-placeholder": "ariaPlaceholder", "aria-posinset": "ariaPosInSet", "aria-pressed": "ariaPressed", "aria-readonly": "ariaReadOnly", "aria-required": "ariaRequired", "aria-roledescription": "ariaRoleDescription", "aria-rowcount": "ariaRowCount", "aria-rowindex": "ariaRowIndex", "aria-rowindextext": "ariaRowIndexText", "aria-rowspan": "ariaRowSpan", "aria-selected": "ariaSelected", "aria-setsize": "ariaSetSize", "aria-sort": "ariaSort", "aria-valuemax": "ariaValueMax", "aria-valuemin": "ariaValueMin", "aria-valuenow": "ariaValueNow", "aria-valuetext": "ariaValueText" })), Va = Array.from(mi$1).reduce((e, [t, r]) => (e.set(t, r), e), /* @__PURE__ */ new Map()), fi$1 = class fi extends hi$1 {
  _schema = /* @__PURE__ */ new Map();
  _eventSchema = /* @__PURE__ */ new Map();
  constructor() {
    super(), Fa.forEach((e) => {
      let t = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Set(), [n, i] = e.split("|"), s = i.split(","), [a, o] = n.split("^");
      a.split(",").forEach((c) => {
        this._schema.set(c.toLowerCase(), t), this._eventSchema.set(c.toLowerCase(), r);
      });
      let l = o && this._schema.get(o.toLowerCase());
      if (l) {
        for (let [c, u] of l) t.set(c, u);
        for (let c of this._eventSchema.get(o.toLowerCase())) r.add(c);
      }
      s.forEach((c) => {
        if (c.length > 0) switch (c[0]) {
          case "*":
            r.add(c.substring(1));
            break;
          case "!":
            t.set(c.substring(1), Ma);
            break;
          case "#":
            t.set(c.substring(1), Ba);
            break;
          case "%":
            t.set(c.substring(1), Ha);
            break;
          default:
            t.set(c, qa);
        }
      });
    });
  }
  hasProperty(e, t, r) {
    if (r.some((i) => i.name === mr.name)) return true;
    let n = Dt$1(e);
    if (n.includes("-")) {
      if (cr$1(n) || ur$1(n)) return false;
      if (r.some((i) => i.name === hr$1.name)) return true;
    }
    return (this._schema.get(n) || this._schema.get("unknown")).has(t);
  }
  hasElement(e, t) {
    if (t.some((n) => n.name === mr.name)) return true;
    let r = Dt$1(e);
    return r.includes("-") && (cr$1(r) || ur$1(r) || t.some((n) => n.name === hr$1.name)) ? true : this._schema.has(r);
  }
  securityContext(e, t, r) {
    r && (t = this.getMappedPropName(t));
    let [n, i] = Z$1(e, false);
    return ui$1(i, t, n);
  }
  getMappedPropName(e) {
    return mi$1.get(e) ?? e;
  }
  getDefaultComponentElementName() {
    return "ng-component";
  }
  validateProperty(e) {
    return e.toLowerCase().startsWith("on") ? { error: true, msg: `Binding to event property '${e}' is disallowed for security reasons, please use (${e.slice(2)})=...
If '${e}' is a directive input, make sure the directive is imported by the current module.` } : { error: false };
  }
  validateAttribute(e) {
    return e.toLowerCase().startsWith("on") ? { error: true, msg: `Binding to event attribute '${e}' is disallowed for security reasons, please use (${e.slice(2)})=...` } : { error: false };
  }
  allKnownElementNames() {
    return Array.from(this._schema.keys());
  }
  allKnownAttributesOfElement(e) {
    let t = Dt$1(e), r = this._schema.get(t) || this._schema.get("unknown");
    return Array.from(r.keys()).map((n) => Va.get(n) ?? n);
  }
  allKnownEventsOfElement(e) {
    let t = Dt$1(e);
    return Array.from(this._eventSchema.get(t) ?? []);
  }
  normalizeAnimationStyleProperty(e) {
    return pi$1(e);
  }
  normalizeAnimationStyleValue(e, t, r) {
    let n = "", i = r.toString().trim(), s = null;
    if (Ua(e) && r !== 0 && r !== "0") if (typeof r == "number") n = "px";
    else {
      let a = r.match(/^[+-]?[\d\.]+([a-z]*)$/);
      a && a[1].length == 0 && (s = `Please provide a CSS unit value for ${t}:${r}`);
    }
    return { error: s, value: i + n };
  }
};
function Ua(e) {
  switch (e) {
    case "width":
    case "height":
    case "minWidth":
    case "minHeight":
    case "maxWidth":
    case "maxHeight":
    case "left":
    case "top":
    case "bottom":
    case "right":
    case "fontSize":
    case "outlineWidth":
    case "outlineOffset":
    case "paddingTop":
    case "paddingLeft":
    case "paddingBottom":
    case "paddingRight":
    case "marginTop":
    case "marginLeft":
    case "marginBottom":
    case "marginRight":
    case "borderRadius":
    case "borderWidth":
    case "borderTopWidth":
    case "borderLeftWidth":
    case "borderRightWidth":
    case "borderBottomWidth":
    case "textIndent":
      return true;
    default:
      return false;
  }
}
var m = class {
  closedByChildren = {};
  contentType;
  closedByParent = false;
  implicitNamespacePrefix;
  isVoid;
  ignoreFirstLf;
  canSelfClose;
  preventNamespaceInheritance;
  constructor({ closedByChildren: e, implicitNamespacePrefix: t, contentType: r = 2, closedByParent: n = false, isVoid: i = false, ignoreFirstLf: s = false, preventNamespaceInheritance: a = false, canSelfClose: o = false } = {}) {
    e && e.length > 0 && e.forEach((l) => this.closedByChildren[l] = true), this.isVoid = i, this.closedByParent = n || i, this.implicitNamespacePrefix = t || null, this.contentType = r, this.ignoreFirstLf = s, this.preventNamespaceInheritance = a, this.canSelfClose = o ?? i;
  }
  isClosedByChild(e) {
    return this.isVoid || e.toLowerCase() in this.closedByChildren;
  }
  getContentType(e) {
    return typeof this.contentType == "object" ? (e === void 0 ? void 0 : this.contentType[e]) ?? this.contentType.default : this.contentType;
  }
}, di$1, tt$1;
function Ne$1(e) {
  return tt$1 || (di$1 = new m({ canSelfClose: true }), tt$1 = Object.assign(/* @__PURE__ */ Object.create(null), { base: new m({ isVoid: true }), meta: new m({ isVoid: true }), area: new m({ isVoid: true }), embed: new m({ isVoid: true }), link: new m({ isVoid: true }), img: new m({ isVoid: true }), input: new m({ isVoid: true }), param: new m({ isVoid: true }), hr: new m({ isVoid: true }), br: new m({ isVoid: true }), source: new m({ isVoid: true }), track: new m({ isVoid: true }), wbr: new m({ isVoid: true }), p: new m({ closedByChildren: ["address", "article", "aside", "blockquote", "div", "dl", "fieldset", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup", "hr", "main", "nav", "ol", "p", "pre", "section", "table", "ul"], closedByParent: true }), thead: new m({ closedByChildren: ["tbody", "tfoot"] }), tbody: new m({ closedByChildren: ["tbody", "tfoot"], closedByParent: true }), tfoot: new m({ closedByChildren: ["tbody"], closedByParent: true }), tr: new m({ closedByChildren: ["tr"], closedByParent: true }), td: new m({ closedByChildren: ["td", "th"], closedByParent: true }), th: new m({ closedByChildren: ["td", "th"], closedByParent: true }), col: new m({ isVoid: true }), svg: new m({ implicitNamespacePrefix: "svg" }), foreignObject: new m({ implicitNamespacePrefix: "svg", preventNamespaceInheritance: true }), math: new m({ implicitNamespacePrefix: "math" }), li: new m({ closedByChildren: ["li"], closedByParent: true }), dt: new m({ closedByChildren: ["dt", "dd"] }), dd: new m({ closedByChildren: ["dt", "dd"], closedByParent: true }), rb: new m({ closedByChildren: ["rb", "rt", "rtc", "rp"], closedByParent: true }), rt: new m({ closedByChildren: ["rb", "rt", "rtc", "rp"], closedByParent: true }), rtc: new m({ closedByChildren: ["rb", "rtc", "rp"], closedByParent: true }), rp: new m({ closedByChildren: ["rb", "rt", "rtc", "rp"], closedByParent: true }), optgroup: new m({ closedByChildren: ["optgroup"], closedByParent: true }), option: new m({ closedByChildren: ["option", "optgroup"], closedByParent: true }), pre: new m({ ignoreFirstLf: true }), listing: new m({ ignoreFirstLf: true }), style: new m({ contentType: 0 }), script: new m({ contentType: 0 }), title: new m({ contentType: { default: 1, svg: 2 } }), textarea: new m({ contentType: 1, ignoreFirstLf: true }) }), new fi$1().allKnownElementNames().forEach((t) => {
    !tt$1[t] && Pe$1(t) === null && (tt$1[t] = new m({ canSelfClose: false }));
  })), tt$1[e] ?? di$1;
}
var De$1 = class gi {
  file;
  offset;
  line;
  col;
  constructor(t, r, n, i) {
    this.file = t, this.offset = r, this.line = n, this.col = i;
  }
  toString() {
    return this.offset != null ? `${this.file.url}@${this.line}:${this.col}` : this.file.url;
  }
  moveBy(t) {
    let r = this.file.content, n = r.length, i = this.offset, s = this.line, a = this.col;
    for (; i > 0 && t < 0; ) if (i--, t++, r.charCodeAt(i) == 10) {
      s--;
      let o = r.substring(0, i - 1).lastIndexOf(`
`);
      a = o > 0 ? i - o : i;
    } else a--;
    for (; i < n && t > 0; ) {
      let o = r.charCodeAt(i);
      i++, t--, o == 10 ? (s++, a = 0) : a++;
    }
    return new gi(this.file, i, s, a);
  }
  getContext(t, r) {
    let n = this.file.content, i = this.offset;
    if (i != null) {
      i > n.length - 1 && (i = n.length - 1);
      let s = i, a = 0, o = 0;
      for (; a < t && i > 0 && (i--, a++, !(n[i] == `
` && ++o == r)); ) ;
      for (a = 0, o = 0; a < t && s < n.length - 1 && (s++, a++, !(n[s] == `
` && ++o == r)); ) ;
      return { before: n.substring(i, this.offset), after: n.substring(this.offset, s + 1) };
    }
    return null;
  }
}, rt$1 = class rt {
  content;
  url;
  constructor(e, t) {
    this.content = e, this.url = t;
  }
}, p = class {
  start;
  end;
  fullStart;
  details;
  constructor(e, t, r = e, n = null) {
    this.start = e, this.end = t, this.fullStart = r, this.details = n;
  }
  toString() {
    return this.start.file.content.substring(this.start.offset, this.end.offset);
  }
}, Wa = (function(e) {
  return e[e.WARNING = 0] = "WARNING", e[e.ERROR = 1] = "ERROR", e;
})({}), te$1 = class te extends Error {
  span;
  msg;
  level;
  relatedError;
  constructor(e, t, r = 1, n) {
    super(t), this.span = e, this.msg = t, this.level = r, this.relatedError = n, Object.setPrototypeOf(this, new.target.prototype);
  }
  contextualMessage() {
    let e = this.span.start.getContext(100, 3);
    return e ? `${this.msg} ("${e.before}[${Wa[this.level]} ->]${e.after}")` : this.msg;
  }
  toString() {
    let e = this.span.details ? `, ${this.span.details}` : "";
    return `${this.contextualMessage()}: ${this.span.start}${e}`;
  }
};
var de$1 = class de {
  sourceSpan;
  i18n;
  constructor(e, t) {
    this.sourceSpan = e, this.i18n = t;
  }
}, _i$1 = class _i extends de$1 {
  value;
  tokens;
  constructor(e, t, r, n) {
    super(t, n), this.value = e, this.tokens = r;
  }
  visit(e, t) {
    return e.visitText(this, t);
  }
  kind = "text";
}, Si$1 = class Si extends de$1 {
  value;
  tokens;
  constructor(e, t, r, n) {
    super(t, n), this.value = e, this.tokens = r;
  }
  visit(e, t) {
    return e.visitCdata(this, t);
  }
  kind = "cdata";
}, vi$1 = class vi extends de$1 {
  switchValue;
  type;
  cases;
  switchValueSourceSpan;
  constructor(e, t, r, n, i, s) {
    super(n, s), this.switchValue = e, this.type = t, this.cases = r, this.switchValueSourceSpan = i;
  }
  visit(e, t) {
    return e.visitExpansion(this, t);
  }
  kind = "expansion";
}, Ci$1 = class Ci {
  value;
  expression;
  sourceSpan;
  valueSourceSpan;
  expSourceSpan;
  constructor(e, t, r, n, i) {
    this.value = e, this.expression = t, this.sourceSpan = r, this.valueSourceSpan = n, this.expSourceSpan = i;
  }
  visit(e, t) {
    return e.visitExpansionCase(this, t);
  }
  kind = "expansionCase";
}, ki$1 = class ki extends de$1 {
  name;
  value;
  keySpan;
  valueSpan;
  valueTokens;
  constructor(e, t, r, n, i, s, a) {
    super(r, a), this.name = e, this.value = t, this.keySpan = n, this.valueSpan = i, this.valueTokens = s;
  }
  visit(e, t) {
    return e.visitAttribute(this, t);
  }
  kind = "attribute";
  get nameSpan() {
    return this.keySpan;
  }
}, bi$1 = class bi {
  value;
  type;
  sourceSpan;
  constructor(e, t, r) {
    this.value = e, this.type = t, this.sourceSpan = r;
  }
  visit(e, t) {
    return e.visitStartTagComment ? e.visitStartTagComment(this, t) : void 0;
  }
  kind = "startTagComment";
}, re$1 = class re extends de$1 {
  name;
  attrs;
  directives;
  children;
  isSelfClosing;
  startSourceSpan;
  endSourceSpan;
  nameSpan;
  isVoid;
  comments;
  constructor(e, t, r, n, i, s, a, o = null, l = null, c, u, d = []) {
    super(s, u), this.name = e, this.attrs = t, this.directives = r, this.children = n, this.isSelfClosing = i, this.startSourceSpan = a, this.endSourceSpan = o, this.nameSpan = l, this.isVoid = c, this.comments = d;
  }
  visit(e, t) {
    return e.visitElement(this, t);
  }
  kind = "element";
}, wi$1 = class wi {
  value;
  sourceSpan;
  constructor(e, t) {
    this.value = e, this.sourceSpan = t;
  }
  visit(e, t) {
    return e.visitComment(this, t);
  }
  kind = "comment";
}, Ti$1 = class Ti {
  value;
  sourceSpan;
  constructor(e, t) {
    this.value = e, this.sourceSpan = t;
  }
  visit(e, t) {
    return e.visitDocType(this, t);
  }
  kind = "docType";
}, ge$1 = class ge extends de$1 {
  name;
  parameters;
  children;
  nameSpan;
  startSourceSpan;
  endSourceSpan;
  constructor(e, t, r, n, i, s, a = null, o) {
    super(n, o), this.name = e, this.parameters = t, this.children = r, this.nameSpan = i, this.startSourceSpan = s, this.endSourceSpan = a;
  }
  visit(e, t) {
    return e.visitBlock(this, t);
  }
  kind = "block";
}, U$1 = class U extends de$1 {
  componentName;
  tagName;
  fullName;
  attrs;
  directives;
  children;
  isSelfClosing;
  startSourceSpan;
  endSourceSpan;
  comments;
  constructor(e, t, r, n, i, s, a, o, l, c = null, u, d = []) {
    super(o, u), this.componentName = e, this.tagName = t, this.fullName = r, this.attrs = n, this.directives = i, this.children = s, this.isSelfClosing = a, this.startSourceSpan = l, this.endSourceSpan = c, this.comments = d;
  }
  visit(e, t) {
    return e.visitComponent(this, t);
  }
  kind = "component";
}, yi$1 = class yi {
  name;
  attrs;
  sourceSpan;
  startSourceSpan;
  endSourceSpan;
  constructor(e, t, r, n, i = null) {
    this.name = e, this.attrs = t, this.sourceSpan = r, this.startSourceSpan = n, this.endSourceSpan = i;
  }
  visit(e, t) {
    return e.visitDirective(this, t);
  }
  kind = "directive";
}, fr$1 = class fr {
  expression;
  sourceSpan;
  constructor(e, t) {
    this.expression = e, this.sourceSpan = t;
  }
  visit(e, t) {
    return e.visitBlockParameter(this, t);
  }
  kind = "blockParameter";
  startSourceSpan = null;
  endSourceSpan = null;
}, dr$1 = class dr {
  name;
  value;
  sourceSpan;
  nameSpan;
  valueSpan;
  constructor(e, t, r, n, i) {
    this.name = e, this.value = t, this.sourceSpan = r, this.nameSpan = n, this.valueSpan = i;
  }
  visit(e, t) {
    return e.visitLetDeclaration(this, t);
  }
  kind = "letDeclaration";
  startSourceSpan = null;
  endSourceSpan = null;
};
function It$1(e, t, r = null) {
  let n = [], i = e.visit ? (s) => e.visit(s, r) || s.visit(e, r) : (s) => s.visit(e, r);
  return t.forEach((s) => {
    let a = i(s);
    a && n.push(a);
  }), n;
}
var gr$1 = class gr {
  constructor() {
  }
  visitElement(e, t) {
    this.visitChildren(t, (r) => {
      r(e.attrs), r(e.directives), r(e.comments), r(e.children);
    });
  }
  visitAttribute(e, t) {
  }
  visitStartTagComment(e, t) {
  }
  visitText(e, t) {
  }
  visitCdata(e, t) {
  }
  visitComment(e, t) {
  }
  visitDocType(e, t) {
  }
  visitExpansion(e, t) {
    return this.visitChildren(t, (r) => {
      r(e.cases);
    });
  }
  visitExpansionCase(e, t) {
  }
  visitBlock(e, t) {
    this.visitChildren(t, (r) => {
      r(e.parameters), r(e.children);
    });
  }
  visitBlockParameter(e, t) {
  }
  visitLetDeclaration(e, t) {
  }
  visitComponent(e, t) {
    this.visitChildren(t, (r) => {
      r(e.attrs), r(e.comments), r(e.children);
    });
  }
  visitDirective(e, t) {
    this.visitChildren(t, (r) => {
      r(e.attrs);
    });
  }
  visitChildren(e, t) {
    let r = [], n = this;
    function i(s) {
      s && r.push(It$1(n, s, e));
    }
    return t(i), Array.prototype.concat.apply([], r);
  }
};
function nt$1(e) {
  return e >= 9 && e <= 32 || e == 160;
}
function Ie$1(e) {
  return 48 <= e && e <= 57;
}
function Re$1(e) {
  return e >= 97 && e <= 122 || e >= 65 && e <= 90;
}
function Ei$1(e) {
  return e >= 97 && e <= 102 || e >= 65 && e <= 70 || Ie$1(e);
}
function Oe$1(e) {
  return e === 10 || e === 13;
}
function _r$1(e) {
  return 48 <= e && e <= 55;
}
function Rt$1(e) {
  return e === 39 || e === 34 || e === 96;
}
var _e$1 = { AElig: "\xC6", AMP: "&", amp: "&", Aacute: "\xC1", Abreve: "\u0102", Acirc: "\xC2", Acy: "\u0410", Afr: "\u{1D504}", Agrave: "\xC0", Alpha: "\u0391", Amacr: "\u0100", And: "\u2A53", Aogon: "\u0104", Aopf: "\u{1D538}", ApplyFunction: "\u2061", af: "\u2061", Aring: "\xC5", angst: "\xC5", Ascr: "\u{1D49C}", Assign: "\u2254", colone: "\u2254", coloneq: "\u2254", Atilde: "\xC3", Auml: "\xC4", Backslash: "\u2216", setminus: "\u2216", setmn: "\u2216", smallsetminus: "\u2216", ssetmn: "\u2216", Barv: "\u2AE7", Barwed: "\u2306", doublebarwedge: "\u2306", Bcy: "\u0411", Because: "\u2235", becaus: "\u2235", because: "\u2235", Bernoullis: "\u212C", Bscr: "\u212C", bernou: "\u212C", Beta: "\u0392", Bfr: "\u{1D505}", Bopf: "\u{1D539}", Breve: "\u02D8", breve: "\u02D8", Bumpeq: "\u224E", HumpDownHump: "\u224E", bump: "\u224E", CHcy: "\u0427", COPY: "\xA9", copy: "\xA9", Cacute: "\u0106", Cap: "\u22D2", CapitalDifferentialD: "\u2145", DD: "\u2145", Cayleys: "\u212D", Cfr: "\u212D", Ccaron: "\u010C", Ccedil: "\xC7", Ccirc: "\u0108", Cconint: "\u2230", Cdot: "\u010A", Cedilla: "\xB8", cedil: "\xB8", CenterDot: "\xB7", centerdot: "\xB7", middot: "\xB7", Chi: "\u03A7", CircleDot: "\u2299", odot: "\u2299", CircleMinus: "\u2296", ominus: "\u2296", CirclePlus: "\u2295", oplus: "\u2295", CircleTimes: "\u2297", otimes: "\u2297", ClockwiseContourIntegral: "\u2232", cwconint: "\u2232", CloseCurlyDoubleQuote: "\u201D", rdquo: "\u201D", rdquor: "\u201D", CloseCurlyQuote: "\u2019", rsquo: "\u2019", rsquor: "\u2019", Colon: "\u2237", Proportion: "\u2237", Colone: "\u2A74", Congruent: "\u2261", equiv: "\u2261", Conint: "\u222F", DoubleContourIntegral: "\u222F", ContourIntegral: "\u222E", conint: "\u222E", oint: "\u222E", Copf: "\u2102", complexes: "\u2102", Coproduct: "\u2210", coprod: "\u2210", CounterClockwiseContourIntegral: "\u2233", awconint: "\u2233", Cross: "\u2A2F", Cscr: "\u{1D49E}", Cup: "\u22D3", CupCap: "\u224D", asympeq: "\u224D", DDotrahd: "\u2911", DJcy: "\u0402", DScy: "\u0405", DZcy: "\u040F", Dagger: "\u2021", ddagger: "\u2021", Darr: "\u21A1", Dashv: "\u2AE4", DoubleLeftTee: "\u2AE4", Dcaron: "\u010E", Dcy: "\u0414", Del: "\u2207", nabla: "\u2207", Delta: "\u0394", Dfr: "\u{1D507}", DiacriticalAcute: "\xB4", acute: "\xB4", DiacriticalDot: "\u02D9", dot: "\u02D9", DiacriticalDoubleAcute: "\u02DD", dblac: "\u02DD", DiacriticalGrave: "`", grave: "`", DiacriticalTilde: "\u02DC", tilde: "\u02DC", Diamond: "\u22C4", diam: "\u22C4", diamond: "\u22C4", DifferentialD: "\u2146", dd: "\u2146", Dopf: "\u{1D53B}", Dot: "\xA8", DoubleDot: "\xA8", die: "\xA8", uml: "\xA8", DotDot: "\u20DC", DotEqual: "\u2250", doteq: "\u2250", esdot: "\u2250", DoubleDownArrow: "\u21D3", Downarrow: "\u21D3", dArr: "\u21D3", DoubleLeftArrow: "\u21D0", Leftarrow: "\u21D0", lArr: "\u21D0", DoubleLeftRightArrow: "\u21D4", Leftrightarrow: "\u21D4", hArr: "\u21D4", iff: "\u21D4", DoubleLongLeftArrow: "\u27F8", Longleftarrow: "\u27F8", xlArr: "\u27F8", DoubleLongLeftRightArrow: "\u27FA", Longleftrightarrow: "\u27FA", xhArr: "\u27FA", DoubleLongRightArrow: "\u27F9", Longrightarrow: "\u27F9", xrArr: "\u27F9", DoubleRightArrow: "\u21D2", Implies: "\u21D2", Rightarrow: "\u21D2", rArr: "\u21D2", DoubleRightTee: "\u22A8", vDash: "\u22A8", DoubleUpArrow: "\u21D1", Uparrow: "\u21D1", uArr: "\u21D1", DoubleUpDownArrow: "\u21D5", Updownarrow: "\u21D5", vArr: "\u21D5", DoubleVerticalBar: "\u2225", par: "\u2225", parallel: "\u2225", shortparallel: "\u2225", spar: "\u2225", DownArrow: "\u2193", ShortDownArrow: "\u2193", darr: "\u2193", downarrow: "\u2193", DownArrowBar: "\u2913", DownArrowUpArrow: "\u21F5", duarr: "\u21F5", DownBreve: "\u0311", DownLeftRightVector: "\u2950", DownLeftTeeVector: "\u295E", DownLeftVector: "\u21BD", leftharpoondown: "\u21BD", lhard: "\u21BD", DownLeftVectorBar: "\u2956", DownRightTeeVector: "\u295F", DownRightVector: "\u21C1", rhard: "\u21C1", rightharpoondown: "\u21C1", DownRightVectorBar: "\u2957", DownTee: "\u22A4", top: "\u22A4", DownTeeArrow: "\u21A7", mapstodown: "\u21A7", Dscr: "\u{1D49F}", Dstrok: "\u0110", ENG: "\u014A", ETH: "\xD0", Eacute: "\xC9", Ecaron: "\u011A", Ecirc: "\xCA", Ecy: "\u042D", Edot: "\u0116", Efr: "\u{1D508}", Egrave: "\xC8", Element: "\u2208", in: "\u2208", isin: "\u2208", isinv: "\u2208", Emacr: "\u0112", EmptySmallSquare: "\u25FB", EmptyVerySmallSquare: "\u25AB", Eogon: "\u0118", Eopf: "\u{1D53C}", Epsilon: "\u0395", Equal: "\u2A75", EqualTilde: "\u2242", eqsim: "\u2242", esim: "\u2242", Equilibrium: "\u21CC", rightleftharpoons: "\u21CC", rlhar: "\u21CC", Escr: "\u2130", expectation: "\u2130", Esim: "\u2A73", Eta: "\u0397", Euml: "\xCB", Exists: "\u2203", exist: "\u2203", ExponentialE: "\u2147", ee: "\u2147", exponentiale: "\u2147", Fcy: "\u0424", Ffr: "\u{1D509}", FilledSmallSquare: "\u25FC", FilledVerySmallSquare: "\u25AA", blacksquare: "\u25AA", squarf: "\u25AA", squf: "\u25AA", Fopf: "\u{1D53D}", ForAll: "\u2200", forall: "\u2200", Fouriertrf: "\u2131", Fscr: "\u2131", GJcy: "\u0403", GT: ">", gt: ">", Gamma: "\u0393", Gammad: "\u03DC", Gbreve: "\u011E", Gcedil: "\u0122", Gcirc: "\u011C", Gcy: "\u0413", Gdot: "\u0120", Gfr: "\u{1D50A}", Gg: "\u22D9", ggg: "\u22D9", Gopf: "\u{1D53E}", GreaterEqual: "\u2265", ge: "\u2265", geq: "\u2265", GreaterEqualLess: "\u22DB", gel: "\u22DB", gtreqless: "\u22DB", GreaterFullEqual: "\u2267", gE: "\u2267", geqq: "\u2267", GreaterGreater: "\u2AA2", GreaterLess: "\u2277", gl: "\u2277", gtrless: "\u2277", GreaterSlantEqual: "\u2A7E", geqslant: "\u2A7E", ges: "\u2A7E", GreaterTilde: "\u2273", gsim: "\u2273", gtrsim: "\u2273", Gscr: "\u{1D4A2}", Gt: "\u226B", NestedGreaterGreater: "\u226B", gg: "\u226B", HARDcy: "\u042A", Hacek: "\u02C7", caron: "\u02C7", Hat: "^", Hcirc: "\u0124", Hfr: "\u210C", Poincareplane: "\u210C", HilbertSpace: "\u210B", Hscr: "\u210B", hamilt: "\u210B", Hopf: "\u210D", quaternions: "\u210D", HorizontalLine: "\u2500", boxh: "\u2500", Hstrok: "\u0126", HumpEqual: "\u224F", bumpe: "\u224F", bumpeq: "\u224F", IEcy: "\u0415", IJlig: "\u0132", IOcy: "\u0401", Iacute: "\xCD", Icirc: "\xCE", Icy: "\u0418", Idot: "\u0130", Ifr: "\u2111", Im: "\u2111", image: "\u2111", imagpart: "\u2111", Igrave: "\xCC", Imacr: "\u012A", ImaginaryI: "\u2148", ii: "\u2148", Int: "\u222C", Integral: "\u222B", int: "\u222B", Intersection: "\u22C2", bigcap: "\u22C2", xcap: "\u22C2", InvisibleComma: "\u2063", ic: "\u2063", InvisibleTimes: "\u2062", it: "\u2062", Iogon: "\u012E", Iopf: "\u{1D540}", Iota: "\u0399", Iscr: "\u2110", imagline: "\u2110", Itilde: "\u0128", Iukcy: "\u0406", Iuml: "\xCF", Jcirc: "\u0134", Jcy: "\u0419", Jfr: "\u{1D50D}", Jopf: "\u{1D541}", Jscr: "\u{1D4A5}", Jsercy: "\u0408", Jukcy: "\u0404", KHcy: "\u0425", KJcy: "\u040C", Kappa: "\u039A", Kcedil: "\u0136", Kcy: "\u041A", Kfr: "\u{1D50E}", Kopf: "\u{1D542}", Kscr: "\u{1D4A6}", LJcy: "\u0409", LT: "<", lt: "<", Lacute: "\u0139", Lambda: "\u039B", Lang: "\u27EA", Laplacetrf: "\u2112", Lscr: "\u2112", lagran: "\u2112", Larr: "\u219E", twoheadleftarrow: "\u219E", Lcaron: "\u013D", Lcedil: "\u013B", Lcy: "\u041B", LeftAngleBracket: "\u27E8", lang: "\u27E8", langle: "\u27E8", LeftArrow: "\u2190", ShortLeftArrow: "\u2190", larr: "\u2190", leftarrow: "\u2190", slarr: "\u2190", LeftArrowBar: "\u21E4", larrb: "\u21E4", LeftArrowRightArrow: "\u21C6", leftrightarrows: "\u21C6", lrarr: "\u21C6", LeftCeiling: "\u2308", lceil: "\u2308", LeftDoubleBracket: "\u27E6", lobrk: "\u27E6", LeftDownTeeVector: "\u2961", LeftDownVector: "\u21C3", dharl: "\u21C3", downharpoonleft: "\u21C3", LeftDownVectorBar: "\u2959", LeftFloor: "\u230A", lfloor: "\u230A", LeftRightArrow: "\u2194", harr: "\u2194", leftrightarrow: "\u2194", LeftRightVector: "\u294E", LeftTee: "\u22A3", dashv: "\u22A3", LeftTeeArrow: "\u21A4", mapstoleft: "\u21A4", LeftTeeVector: "\u295A", LeftTriangle: "\u22B2", vartriangleleft: "\u22B2", vltri: "\u22B2", LeftTriangleBar: "\u29CF", LeftTriangleEqual: "\u22B4", ltrie: "\u22B4", trianglelefteq: "\u22B4", LeftUpDownVector: "\u2951", LeftUpTeeVector: "\u2960", LeftUpVector: "\u21BF", uharl: "\u21BF", upharpoonleft: "\u21BF", LeftUpVectorBar: "\u2958", LeftVector: "\u21BC", leftharpoonup: "\u21BC", lharu: "\u21BC", LeftVectorBar: "\u2952", LessEqualGreater: "\u22DA", leg: "\u22DA", lesseqgtr: "\u22DA", LessFullEqual: "\u2266", lE: "\u2266", leqq: "\u2266", LessGreater: "\u2276", lessgtr: "\u2276", lg: "\u2276", LessLess: "\u2AA1", LessSlantEqual: "\u2A7D", leqslant: "\u2A7D", les: "\u2A7D", LessTilde: "\u2272", lesssim: "\u2272", lsim: "\u2272", Lfr: "\u{1D50F}", Ll: "\u22D8", Lleftarrow: "\u21DA", lAarr: "\u21DA", Lmidot: "\u013F", LongLeftArrow: "\u27F5", longleftarrow: "\u27F5", xlarr: "\u27F5", LongLeftRightArrow: "\u27F7", longleftrightarrow: "\u27F7", xharr: "\u27F7", LongRightArrow: "\u27F6", longrightarrow: "\u27F6", xrarr: "\u27F6", Lopf: "\u{1D543}", LowerLeftArrow: "\u2199", swarr: "\u2199", swarrow: "\u2199", LowerRightArrow: "\u2198", searr: "\u2198", searrow: "\u2198", Lsh: "\u21B0", lsh: "\u21B0", Lstrok: "\u0141", Lt: "\u226A", NestedLessLess: "\u226A", ll: "\u226A", Map: "\u2905", Mcy: "\u041C", MediumSpace: "\u205F", Mellintrf: "\u2133", Mscr: "\u2133", phmmat: "\u2133", Mfr: "\u{1D510}", MinusPlus: "\u2213", mnplus: "\u2213", mp: "\u2213", Mopf: "\u{1D544}", Mu: "\u039C", NJcy: "\u040A", Nacute: "\u0143", Ncaron: "\u0147", Ncedil: "\u0145", Ncy: "\u041D", NegativeMediumSpace: "\u200B", NegativeThickSpace: "\u200B", NegativeThinSpace: "\u200B", NegativeVeryThinSpace: "\u200B", ZeroWidthSpace: "\u200B", NewLine: `
`, Nfr: "\u{1D511}", NoBreak: "\u2060", NonBreakingSpace: "\xA0", nbsp: "\xA0", Nopf: "\u2115", naturals: "\u2115", Not: "\u2AEC", NotCongruent: "\u2262", nequiv: "\u2262", NotCupCap: "\u226D", NotDoubleVerticalBar: "\u2226", npar: "\u2226", nparallel: "\u2226", nshortparallel: "\u2226", nspar: "\u2226", NotElement: "\u2209", notin: "\u2209", notinva: "\u2209", NotEqual: "\u2260", ne: "\u2260", NotEqualTilde: "\u2242\u0338", nesim: "\u2242\u0338", NotExists: "\u2204", nexist: "\u2204", nexists: "\u2204", NotGreater: "\u226F", ngt: "\u226F", ngtr: "\u226F", NotGreaterEqual: "\u2271", nge: "\u2271", ngeq: "\u2271", NotGreaterFullEqual: "\u2267\u0338", ngE: "\u2267\u0338", ngeqq: "\u2267\u0338", NotGreaterGreater: "\u226B\u0338", nGtv: "\u226B\u0338", NotGreaterLess: "\u2279", ntgl: "\u2279", NotGreaterSlantEqual: "\u2A7E\u0338", ngeqslant: "\u2A7E\u0338", nges: "\u2A7E\u0338", NotGreaterTilde: "\u2275", ngsim: "\u2275", NotHumpDownHump: "\u224E\u0338", nbump: "\u224E\u0338", NotHumpEqual: "\u224F\u0338", nbumpe: "\u224F\u0338", NotLeftTriangle: "\u22EA", nltri: "\u22EA", ntriangleleft: "\u22EA", NotLeftTriangleBar: "\u29CF\u0338", NotLeftTriangleEqual: "\u22EC", nltrie: "\u22EC", ntrianglelefteq: "\u22EC", NotLess: "\u226E", nless: "\u226E", nlt: "\u226E", NotLessEqual: "\u2270", nle: "\u2270", nleq: "\u2270", NotLessGreater: "\u2278", ntlg: "\u2278", NotLessLess: "\u226A\u0338", nLtv: "\u226A\u0338", NotLessSlantEqual: "\u2A7D\u0338", nleqslant: "\u2A7D\u0338", nles: "\u2A7D\u0338", NotLessTilde: "\u2274", nlsim: "\u2274", NotNestedGreaterGreater: "\u2AA2\u0338", NotNestedLessLess: "\u2AA1\u0338", NotPrecedes: "\u2280", npr: "\u2280", nprec: "\u2280", NotPrecedesEqual: "\u2AAF\u0338", npre: "\u2AAF\u0338", npreceq: "\u2AAF\u0338", NotPrecedesSlantEqual: "\u22E0", nprcue: "\u22E0", NotReverseElement: "\u220C", notni: "\u220C", notniva: "\u220C", NotRightTriangle: "\u22EB", nrtri: "\u22EB", ntriangleright: "\u22EB", NotRightTriangleBar: "\u29D0\u0338", NotRightTriangleEqual: "\u22ED", nrtrie: "\u22ED", ntrianglerighteq: "\u22ED", NotSquareSubset: "\u228F\u0338", NotSquareSubsetEqual: "\u22E2", nsqsube: "\u22E2", NotSquareSuperset: "\u2290\u0338", NotSquareSupersetEqual: "\u22E3", nsqsupe: "\u22E3", NotSubset: "\u2282\u20D2", nsubset: "\u2282\u20D2", vnsub: "\u2282\u20D2", NotSubsetEqual: "\u2288", nsube: "\u2288", nsubseteq: "\u2288", NotSucceeds: "\u2281", nsc: "\u2281", nsucc: "\u2281", NotSucceedsEqual: "\u2AB0\u0338", nsce: "\u2AB0\u0338", nsucceq: "\u2AB0\u0338", NotSucceedsSlantEqual: "\u22E1", nsccue: "\u22E1", NotSucceedsTilde: "\u227F\u0338", NotSuperset: "\u2283\u20D2", nsupset: "\u2283\u20D2", vnsup: "\u2283\u20D2", NotSupersetEqual: "\u2289", nsupe: "\u2289", nsupseteq: "\u2289", NotTilde: "\u2241", nsim: "\u2241", NotTildeEqual: "\u2244", nsime: "\u2244", nsimeq: "\u2244", NotTildeFullEqual: "\u2247", ncong: "\u2247", NotTildeTilde: "\u2249", nap: "\u2249", napprox: "\u2249", NotVerticalBar: "\u2224", nmid: "\u2224", nshortmid: "\u2224", nsmid: "\u2224", Nscr: "\u{1D4A9}", Ntilde: "\xD1", Nu: "\u039D", OElig: "\u0152", Oacute: "\xD3", Ocirc: "\xD4", Ocy: "\u041E", Odblac: "\u0150", Ofr: "\u{1D512}", Ograve: "\xD2", Omacr: "\u014C", Omega: "\u03A9", ohm: "\u03A9", Omicron: "\u039F", Oopf: "\u{1D546}", OpenCurlyDoubleQuote: "\u201C", ldquo: "\u201C", OpenCurlyQuote: "\u2018", lsquo: "\u2018", Or: "\u2A54", Oscr: "\u{1D4AA}", Oslash: "\xD8", Otilde: "\xD5", Otimes: "\u2A37", Ouml: "\xD6", OverBar: "\u203E", oline: "\u203E", OverBrace: "\u23DE", OverBracket: "\u23B4", tbrk: "\u23B4", OverParenthesis: "\u23DC", PartialD: "\u2202", part: "\u2202", Pcy: "\u041F", Pfr: "\u{1D513}", Phi: "\u03A6", Pi: "\u03A0", PlusMinus: "\xB1", plusmn: "\xB1", pm: "\xB1", Popf: "\u2119", primes: "\u2119", Pr: "\u2ABB", Precedes: "\u227A", pr: "\u227A", prec: "\u227A", PrecedesEqual: "\u2AAF", pre: "\u2AAF", preceq: "\u2AAF", PrecedesSlantEqual: "\u227C", prcue: "\u227C", preccurlyeq: "\u227C", PrecedesTilde: "\u227E", precsim: "\u227E", prsim: "\u227E", Prime: "\u2033", Product: "\u220F", prod: "\u220F", Proportional: "\u221D", prop: "\u221D", propto: "\u221D", varpropto: "\u221D", vprop: "\u221D", Pscr: "\u{1D4AB}", Psi: "\u03A8", QUOT: '"', quot: '"', Qfr: "\u{1D514}", Qopf: "\u211A", rationals: "\u211A", Qscr: "\u{1D4AC}", RBarr: "\u2910", drbkarow: "\u2910", REG: "\xAE", circledR: "\xAE", reg: "\xAE", Racute: "\u0154", Rang: "\u27EB", Rarr: "\u21A0", twoheadrightarrow: "\u21A0", Rarrtl: "\u2916", Rcaron: "\u0158", Rcedil: "\u0156", Rcy: "\u0420", Re: "\u211C", Rfr: "\u211C", real: "\u211C", realpart: "\u211C", ReverseElement: "\u220B", SuchThat: "\u220B", ni: "\u220B", niv: "\u220B", ReverseEquilibrium: "\u21CB", leftrightharpoons: "\u21CB", lrhar: "\u21CB", ReverseUpEquilibrium: "\u296F", duhar: "\u296F", Rho: "\u03A1", RightAngleBracket: "\u27E9", rang: "\u27E9", rangle: "\u27E9", RightArrow: "\u2192", ShortRightArrow: "\u2192", rarr: "\u2192", rightarrow: "\u2192", srarr: "\u2192", RightArrowBar: "\u21E5", rarrb: "\u21E5", RightArrowLeftArrow: "\u21C4", rightleftarrows: "\u21C4", rlarr: "\u21C4", RightCeiling: "\u2309", rceil: "\u2309", RightDoubleBracket: "\u27E7", robrk: "\u27E7", RightDownTeeVector: "\u295D", RightDownVector: "\u21C2", dharr: "\u21C2", downharpoonright: "\u21C2", RightDownVectorBar: "\u2955", RightFloor: "\u230B", rfloor: "\u230B", RightTee: "\u22A2", vdash: "\u22A2", RightTeeArrow: "\u21A6", map: "\u21A6", mapsto: "\u21A6", RightTeeVector: "\u295B", RightTriangle: "\u22B3", vartriangleright: "\u22B3", vrtri: "\u22B3", RightTriangleBar: "\u29D0", RightTriangleEqual: "\u22B5", rtrie: "\u22B5", trianglerighteq: "\u22B5", RightUpDownVector: "\u294F", RightUpTeeVector: "\u295C", RightUpVector: "\u21BE", uharr: "\u21BE", upharpoonright: "\u21BE", RightUpVectorBar: "\u2954", RightVector: "\u21C0", rharu: "\u21C0", rightharpoonup: "\u21C0", RightVectorBar: "\u2953", Ropf: "\u211D", reals: "\u211D", RoundImplies: "\u2970", Rrightarrow: "\u21DB", rAarr: "\u21DB", Rscr: "\u211B", realine: "\u211B", Rsh: "\u21B1", rsh: "\u21B1", RuleDelayed: "\u29F4", SHCHcy: "\u0429", SHcy: "\u0428", SOFTcy: "\u042C", Sacute: "\u015A", Sc: "\u2ABC", Scaron: "\u0160", Scedil: "\u015E", Scirc: "\u015C", Scy: "\u0421", Sfr: "\u{1D516}", ShortUpArrow: "\u2191", UpArrow: "\u2191", uarr: "\u2191", uparrow: "\u2191", Sigma: "\u03A3", SmallCircle: "\u2218", compfn: "\u2218", Sopf: "\u{1D54A}", Sqrt: "\u221A", radic: "\u221A", Square: "\u25A1", squ: "\u25A1", square: "\u25A1", SquareIntersection: "\u2293", sqcap: "\u2293", SquareSubset: "\u228F", sqsub: "\u228F", sqsubset: "\u228F", SquareSubsetEqual: "\u2291", sqsube: "\u2291", sqsubseteq: "\u2291", SquareSuperset: "\u2290", sqsup: "\u2290", sqsupset: "\u2290", SquareSupersetEqual: "\u2292", sqsupe: "\u2292", sqsupseteq: "\u2292", SquareUnion: "\u2294", sqcup: "\u2294", Sscr: "\u{1D4AE}", Star: "\u22C6", sstarf: "\u22C6", Sub: "\u22D0", Subset: "\u22D0", SubsetEqual: "\u2286", sube: "\u2286", subseteq: "\u2286", Succeeds: "\u227B", sc: "\u227B", succ: "\u227B", SucceedsEqual: "\u2AB0", sce: "\u2AB0", succeq: "\u2AB0", SucceedsSlantEqual: "\u227D", sccue: "\u227D", succcurlyeq: "\u227D", SucceedsTilde: "\u227F", scsim: "\u227F", succsim: "\u227F", Sum: "\u2211", sum: "\u2211", Sup: "\u22D1", Supset: "\u22D1", Superset: "\u2283", sup: "\u2283", supset: "\u2283", SupersetEqual: "\u2287", supe: "\u2287", supseteq: "\u2287", THORN: "\xDE", TRADE: "\u2122", trade: "\u2122", TSHcy: "\u040B", TScy: "\u0426", Tab: "	", Tau: "\u03A4", Tcaron: "\u0164", Tcedil: "\u0162", Tcy: "\u0422", Tfr: "\u{1D517}", Therefore: "\u2234", there4: "\u2234", therefore: "\u2234", Theta: "\u0398", ThickSpace: "\u205F\u200A", ThinSpace: "\u2009", thinsp: "\u2009", Tilde: "\u223C", sim: "\u223C", thicksim: "\u223C", thksim: "\u223C", TildeEqual: "\u2243", sime: "\u2243", simeq: "\u2243", TildeFullEqual: "\u2245", cong: "\u2245", TildeTilde: "\u2248", ap: "\u2248", approx: "\u2248", asymp: "\u2248", thickapprox: "\u2248", thkap: "\u2248", Topf: "\u{1D54B}", TripleDot: "\u20DB", tdot: "\u20DB", Tscr: "\u{1D4AF}", Tstrok: "\u0166", Uacute: "\xDA", Uarr: "\u219F", Uarrocir: "\u2949", Ubrcy: "\u040E", Ubreve: "\u016C", Ucirc: "\xDB", Ucy: "\u0423", Udblac: "\u0170", Ufr: "\u{1D518}", Ugrave: "\xD9", Umacr: "\u016A", UnderBar: "_", lowbar: "_", UnderBrace: "\u23DF", UnderBracket: "\u23B5", bbrk: "\u23B5", UnderParenthesis: "\u23DD", Union: "\u22C3", bigcup: "\u22C3", xcup: "\u22C3", UnionPlus: "\u228E", uplus: "\u228E", Uogon: "\u0172", Uopf: "\u{1D54C}", UpArrowBar: "\u2912", UpArrowDownArrow: "\u21C5", udarr: "\u21C5", UpDownArrow: "\u2195", updownarrow: "\u2195", varr: "\u2195", UpEquilibrium: "\u296E", udhar: "\u296E", UpTee: "\u22A5", bot: "\u22A5", bottom: "\u22A5", perp: "\u22A5", UpTeeArrow: "\u21A5", mapstoup: "\u21A5", UpperLeftArrow: "\u2196", nwarr: "\u2196", nwarrow: "\u2196", UpperRightArrow: "\u2197", nearr: "\u2197", nearrow: "\u2197", Upsi: "\u03D2", upsih: "\u03D2", Upsilon: "\u03A5", Uring: "\u016E", Uscr: "\u{1D4B0}", Utilde: "\u0168", Uuml: "\xDC", VDash: "\u22AB", Vbar: "\u2AEB", Vcy: "\u0412", Vdash: "\u22A9", Vdashl: "\u2AE6", Vee: "\u22C1", bigvee: "\u22C1", xvee: "\u22C1", Verbar: "\u2016", Vert: "\u2016", VerticalBar: "\u2223", mid: "\u2223", shortmid: "\u2223", smid: "\u2223", VerticalLine: "|", verbar: "|", vert: "|", VerticalSeparator: "\u2758", VerticalTilde: "\u2240", wr: "\u2240", wreath: "\u2240", VeryThinSpace: "\u200A", hairsp: "\u200A", Vfr: "\u{1D519}", Vopf: "\u{1D54D}", Vscr: "\u{1D4B1}", Vvdash: "\u22AA", Wcirc: "\u0174", Wedge: "\u22C0", bigwedge: "\u22C0", xwedge: "\u22C0", Wfr: "\u{1D51A}", Wopf: "\u{1D54E}", Wscr: "\u{1D4B2}", Xfr: "\u{1D51B}", Xi: "\u039E", Xopf: "\u{1D54F}", Xscr: "\u{1D4B3}", YAcy: "\u042F", YIcy: "\u0407", YUcy: "\u042E", Yacute: "\xDD", Ycirc: "\u0176", Ycy: "\u042B", Yfr: "\u{1D51C}", Yopf: "\u{1D550}", Yscr: "\u{1D4B4}", Yuml: "\u0178", ZHcy: "\u0416", Zacute: "\u0179", Zcaron: "\u017D", Zcy: "\u0417", Zdot: "\u017B", Zeta: "\u0396", Zfr: "\u2128", zeetrf: "\u2128", Zopf: "\u2124", integers: "\u2124", Zscr: "\u{1D4B5}", aacute: "\xE1", abreve: "\u0103", ac: "\u223E", mstpos: "\u223E", acE: "\u223E\u0333", acd: "\u223F", acirc: "\xE2", acy: "\u0430", aelig: "\xE6", afr: "\u{1D51E}", agrave: "\xE0", alefsym: "\u2135", aleph: "\u2135", alpha: "\u03B1", amacr: "\u0101", amalg: "\u2A3F", and: "\u2227", wedge: "\u2227", andand: "\u2A55", andd: "\u2A5C", andslope: "\u2A58", andv: "\u2A5A", ang: "\u2220", angle: "\u2220", ange: "\u29A4", angmsd: "\u2221", measuredangle: "\u2221", angmsdaa: "\u29A8", angmsdab: "\u29A9", angmsdac: "\u29AA", angmsdad: "\u29AB", angmsdae: "\u29AC", angmsdaf: "\u29AD", angmsdag: "\u29AE", angmsdah: "\u29AF", angrt: "\u221F", angrtvb: "\u22BE", angrtvbd: "\u299D", angsph: "\u2222", angzarr: "\u237C", aogon: "\u0105", aopf: "\u{1D552}", apE: "\u2A70", apacir: "\u2A6F", ape: "\u224A", approxeq: "\u224A", apid: "\u224B", apos: "'", aring: "\xE5", ascr: "\u{1D4B6}", ast: "*", midast: "*", atilde: "\xE3", auml: "\xE4", awint: "\u2A11", bNot: "\u2AED", backcong: "\u224C", bcong: "\u224C", backepsilon: "\u03F6", bepsi: "\u03F6", backprime: "\u2035", bprime: "\u2035", backsim: "\u223D", bsim: "\u223D", backsimeq: "\u22CD", bsime: "\u22CD", barvee: "\u22BD", barwed: "\u2305", barwedge: "\u2305", bbrktbrk: "\u23B6", bcy: "\u0431", bdquo: "\u201E", ldquor: "\u201E", bemptyv: "\u29B0", beta: "\u03B2", beth: "\u2136", between: "\u226C", twixt: "\u226C", bfr: "\u{1D51F}", bigcirc: "\u25EF", xcirc: "\u25EF", bigodot: "\u2A00", xodot: "\u2A00", bigoplus: "\u2A01", xoplus: "\u2A01", bigotimes: "\u2A02", xotime: "\u2A02", bigsqcup: "\u2A06", xsqcup: "\u2A06", bigstar: "\u2605", starf: "\u2605", bigtriangledown: "\u25BD", xdtri: "\u25BD", bigtriangleup: "\u25B3", xutri: "\u25B3", biguplus: "\u2A04", xuplus: "\u2A04", bkarow: "\u290D", rbarr: "\u290D", blacklozenge: "\u29EB", lozf: "\u29EB", blacktriangle: "\u25B4", utrif: "\u25B4", blacktriangledown: "\u25BE", dtrif: "\u25BE", blacktriangleleft: "\u25C2", ltrif: "\u25C2", blacktriangleright: "\u25B8", rtrif: "\u25B8", blank: "\u2423", blk12: "\u2592", blk14: "\u2591", blk34: "\u2593", block: "\u2588", bne: "=\u20E5", bnequiv: "\u2261\u20E5", bnot: "\u2310", bopf: "\u{1D553}", bowtie: "\u22C8", boxDL: "\u2557", boxDR: "\u2554", boxDl: "\u2556", boxDr: "\u2553", boxH: "\u2550", boxHD: "\u2566", boxHU: "\u2569", boxHd: "\u2564", boxHu: "\u2567", boxUL: "\u255D", boxUR: "\u255A", boxUl: "\u255C", boxUr: "\u2559", boxV: "\u2551", boxVH: "\u256C", boxVL: "\u2563", boxVR: "\u2560", boxVh: "\u256B", boxVl: "\u2562", boxVr: "\u255F", boxbox: "\u29C9", boxdL: "\u2555", boxdR: "\u2552", boxdl: "\u2510", boxdr: "\u250C", boxhD: "\u2565", boxhU: "\u2568", boxhd: "\u252C", boxhu: "\u2534", boxminus: "\u229F", minusb: "\u229F", boxplus: "\u229E", plusb: "\u229E", boxtimes: "\u22A0", timesb: "\u22A0", boxuL: "\u255B", boxuR: "\u2558", boxul: "\u2518", boxur: "\u2514", boxv: "\u2502", boxvH: "\u256A", boxvL: "\u2561", boxvR: "\u255E", boxvh: "\u253C", boxvl: "\u2524", boxvr: "\u251C", brvbar: "\xA6", bscr: "\u{1D4B7}", bsemi: "\u204F", bsol: "\\", bsolb: "\u29C5", bsolhsub: "\u27C8", bull: "\u2022", bullet: "\u2022", bumpE: "\u2AAE", cacute: "\u0107", cap: "\u2229", capand: "\u2A44", capbrcup: "\u2A49", capcap: "\u2A4B", capcup: "\u2A47", capdot: "\u2A40", caps: "\u2229\uFE00", caret: "\u2041", ccaps: "\u2A4D", ccaron: "\u010D", ccedil: "\xE7", ccirc: "\u0109", ccups: "\u2A4C", ccupssm: "\u2A50", cdot: "\u010B", cemptyv: "\u29B2", cent: "\xA2", cfr: "\u{1D520}", chcy: "\u0447", check: "\u2713", checkmark: "\u2713", chi: "\u03C7", cir: "\u25CB", cirE: "\u29C3", circ: "\u02C6", circeq: "\u2257", cire: "\u2257", circlearrowleft: "\u21BA", olarr: "\u21BA", circlearrowright: "\u21BB", orarr: "\u21BB", circledS: "\u24C8", oS: "\u24C8", circledast: "\u229B", oast: "\u229B", circledcirc: "\u229A", ocir: "\u229A", circleddash: "\u229D", odash: "\u229D", cirfnint: "\u2A10", cirmid: "\u2AEF", cirscir: "\u29C2", clubs: "\u2663", clubsuit: "\u2663", colon: ":", comma: ",", commat: "@", comp: "\u2201", complement: "\u2201", congdot: "\u2A6D", copf: "\u{1D554}", copysr: "\u2117", crarr: "\u21B5", cross: "\u2717", cscr: "\u{1D4B8}", csub: "\u2ACF", csube: "\u2AD1", csup: "\u2AD0", csupe: "\u2AD2", ctdot: "\u22EF", cudarrl: "\u2938", cudarrr: "\u2935", cuepr: "\u22DE", curlyeqprec: "\u22DE", cuesc: "\u22DF", curlyeqsucc: "\u22DF", cularr: "\u21B6", curvearrowleft: "\u21B6", cularrp: "\u293D", cup: "\u222A", cupbrcap: "\u2A48", cupcap: "\u2A46", cupcup: "\u2A4A", cupdot: "\u228D", cupor: "\u2A45", cups: "\u222A\uFE00", curarr: "\u21B7", curvearrowright: "\u21B7", curarrm: "\u293C", curlyvee: "\u22CE", cuvee: "\u22CE", curlywedge: "\u22CF", cuwed: "\u22CF", curren: "\xA4", cwint: "\u2231", cylcty: "\u232D", dHar: "\u2965", dagger: "\u2020", daleth: "\u2138", dash: "\u2010", hyphen: "\u2010", dbkarow: "\u290F", rBarr: "\u290F", dcaron: "\u010F", dcy: "\u0434", ddarr: "\u21CA", downdownarrows: "\u21CA", ddotseq: "\u2A77", eDDot: "\u2A77", deg: "\xB0", delta: "\u03B4", demptyv: "\u29B1", dfisht: "\u297F", dfr: "\u{1D521}", diamondsuit: "\u2666", diams: "\u2666", digamma: "\u03DD", gammad: "\u03DD", disin: "\u22F2", div: "\xF7", divide: "\xF7", divideontimes: "\u22C7", divonx: "\u22C7", djcy: "\u0452", dlcorn: "\u231E", llcorner: "\u231E", dlcrop: "\u230D", dollar: "$", dopf: "\u{1D555}", doteqdot: "\u2251", eDot: "\u2251", dotminus: "\u2238", minusd: "\u2238", dotplus: "\u2214", plusdo: "\u2214", dotsquare: "\u22A1", sdotb: "\u22A1", drcorn: "\u231F", lrcorner: "\u231F", drcrop: "\u230C", dscr: "\u{1D4B9}", dscy: "\u0455", dsol: "\u29F6", dstrok: "\u0111", dtdot: "\u22F1", dtri: "\u25BF", triangledown: "\u25BF", dwangle: "\u29A6", dzcy: "\u045F", dzigrarr: "\u27FF", eacute: "\xE9", easter: "\u2A6E", ecaron: "\u011B", ecir: "\u2256", eqcirc: "\u2256", ecirc: "\xEA", ecolon: "\u2255", eqcolon: "\u2255", ecy: "\u044D", edot: "\u0117", efDot: "\u2252", fallingdotseq: "\u2252", efr: "\u{1D522}", eg: "\u2A9A", egrave: "\xE8", egs: "\u2A96", eqslantgtr: "\u2A96", egsdot: "\u2A98", el: "\u2A99", elinters: "\u23E7", ell: "\u2113", els: "\u2A95", eqslantless: "\u2A95", elsdot: "\u2A97", emacr: "\u0113", empty: "\u2205", emptyset: "\u2205", emptyv: "\u2205", varnothing: "\u2205", emsp13: "\u2004", emsp14: "\u2005", emsp: "\u2003", eng: "\u014B", ensp: "\u2002", eogon: "\u0119", eopf: "\u{1D556}", epar: "\u22D5", eparsl: "\u29E3", eplus: "\u2A71", epsi: "\u03B5", epsilon: "\u03B5", epsiv: "\u03F5", straightepsilon: "\u03F5", varepsilon: "\u03F5", equals: "=", equest: "\u225F", questeq: "\u225F", equivDD: "\u2A78", eqvparsl: "\u29E5", erDot: "\u2253", risingdotseq: "\u2253", erarr: "\u2971", escr: "\u212F", eta: "\u03B7", eth: "\xF0", euml: "\xEB", euro: "\u20AC", excl: "!", fcy: "\u0444", female: "\u2640", ffilig: "\uFB03", fflig: "\uFB00", ffllig: "\uFB04", ffr: "\u{1D523}", filig: "\uFB01", fjlig: "fj", flat: "\u266D", fllig: "\uFB02", fltns: "\u25B1", fnof: "\u0192", fopf: "\u{1D557}", fork: "\u22D4", pitchfork: "\u22D4", forkv: "\u2AD9", fpartint: "\u2A0D", frac12: "\xBD", half: "\xBD", frac13: "\u2153", frac14: "\xBC", frac15: "\u2155", frac16: "\u2159", frac18: "\u215B", frac23: "\u2154", frac25: "\u2156", frac34: "\xBE", frac35: "\u2157", frac38: "\u215C", frac45: "\u2158", frac56: "\u215A", frac58: "\u215D", frac78: "\u215E", frasl: "\u2044", frown: "\u2322", sfrown: "\u2322", fscr: "\u{1D4BB}", gEl: "\u2A8C", gtreqqless: "\u2A8C", gacute: "\u01F5", gamma: "\u03B3", gap: "\u2A86", gtrapprox: "\u2A86", gbreve: "\u011F", gcirc: "\u011D", gcy: "\u0433", gdot: "\u0121", gescc: "\u2AA9", gesdot: "\u2A80", gesdoto: "\u2A82", gesdotol: "\u2A84", gesl: "\u22DB\uFE00", gesles: "\u2A94", gfr: "\u{1D524}", gimel: "\u2137", gjcy: "\u0453", glE: "\u2A92", gla: "\u2AA5", glj: "\u2AA4", gnE: "\u2269", gneqq: "\u2269", gnap: "\u2A8A", gnapprox: "\u2A8A", gne: "\u2A88", gneq: "\u2A88", gnsim: "\u22E7", gopf: "\u{1D558}", gscr: "\u210A", gsime: "\u2A8E", gsiml: "\u2A90", gtcc: "\u2AA7", gtcir: "\u2A7A", gtdot: "\u22D7", gtrdot: "\u22D7", gtlPar: "\u2995", gtquest: "\u2A7C", gtrarr: "\u2978", gvertneqq: "\u2269\uFE00", gvnE: "\u2269\uFE00", hardcy: "\u044A", harrcir: "\u2948", harrw: "\u21AD", leftrightsquigarrow: "\u21AD", hbar: "\u210F", hslash: "\u210F", planck: "\u210F", plankv: "\u210F", hcirc: "\u0125", hearts: "\u2665", heartsuit: "\u2665", hellip: "\u2026", mldr: "\u2026", hercon: "\u22B9", hfr: "\u{1D525}", hksearow: "\u2925", searhk: "\u2925", hkswarow: "\u2926", swarhk: "\u2926", hoarr: "\u21FF", homtht: "\u223B", hookleftarrow: "\u21A9", larrhk: "\u21A9", hookrightarrow: "\u21AA", rarrhk: "\u21AA", hopf: "\u{1D559}", horbar: "\u2015", hscr: "\u{1D4BD}", hstrok: "\u0127", hybull: "\u2043", iacute: "\xED", icirc: "\xEE", icy: "\u0438", iecy: "\u0435", iexcl: "\xA1", ifr: "\u{1D526}", igrave: "\xEC", iiiint: "\u2A0C", qint: "\u2A0C", iiint: "\u222D", tint: "\u222D", iinfin: "\u29DC", iiota: "\u2129", ijlig: "\u0133", imacr: "\u012B", imath: "\u0131", inodot: "\u0131", imof: "\u22B7", imped: "\u01B5", incare: "\u2105", infin: "\u221E", infintie: "\u29DD", intcal: "\u22BA", intercal: "\u22BA", intlarhk: "\u2A17", intprod: "\u2A3C", iprod: "\u2A3C", iocy: "\u0451", iogon: "\u012F", iopf: "\u{1D55A}", iota: "\u03B9", iquest: "\xBF", iscr: "\u{1D4BE}", isinE: "\u22F9", isindot: "\u22F5", isins: "\u22F4", isinsv: "\u22F3", itilde: "\u0129", iukcy: "\u0456", iuml: "\xEF", jcirc: "\u0135", jcy: "\u0439", jfr: "\u{1D527}", jmath: "\u0237", jopf: "\u{1D55B}", jscr: "\u{1D4BF}", jsercy: "\u0458", jukcy: "\u0454", kappa: "\u03BA", kappav: "\u03F0", varkappa: "\u03F0", kcedil: "\u0137", kcy: "\u043A", kfr: "\u{1D528}", kgreen: "\u0138", khcy: "\u0445", kjcy: "\u045C", kopf: "\u{1D55C}", kscr: "\u{1D4C0}", lAtail: "\u291B", lBarr: "\u290E", lEg: "\u2A8B", lesseqqgtr: "\u2A8B", lHar: "\u2962", lacute: "\u013A", laemptyv: "\u29B4", lambda: "\u03BB", langd: "\u2991", lap: "\u2A85", lessapprox: "\u2A85", laquo: "\xAB", larrbfs: "\u291F", larrfs: "\u291D", larrlp: "\u21AB", looparrowleft: "\u21AB", larrpl: "\u2939", larrsim: "\u2973", larrtl: "\u21A2", leftarrowtail: "\u21A2", lat: "\u2AAB", latail: "\u2919", late: "\u2AAD", lates: "\u2AAD\uFE00", lbarr: "\u290C", lbbrk: "\u2772", lbrace: "{", lcub: "{", lbrack: "[", lsqb: "[", lbrke: "\u298B", lbrksld: "\u298F", lbrkslu: "\u298D", lcaron: "\u013E", lcedil: "\u013C", lcy: "\u043B", ldca: "\u2936", ldrdhar: "\u2967", ldrushar: "\u294B", ldsh: "\u21B2", le: "\u2264", leq: "\u2264", leftleftarrows: "\u21C7", llarr: "\u21C7", leftthreetimes: "\u22CB", lthree: "\u22CB", lescc: "\u2AA8", lesdot: "\u2A7F", lesdoto: "\u2A81", lesdotor: "\u2A83", lesg: "\u22DA\uFE00", lesges: "\u2A93", lessdot: "\u22D6", ltdot: "\u22D6", lfisht: "\u297C", lfr: "\u{1D529}", lgE: "\u2A91", lharul: "\u296A", lhblk: "\u2584", ljcy: "\u0459", llhard: "\u296B", lltri: "\u25FA", lmidot: "\u0140", lmoust: "\u23B0", lmoustache: "\u23B0", lnE: "\u2268", lneqq: "\u2268", lnap: "\u2A89", lnapprox: "\u2A89", lne: "\u2A87", lneq: "\u2A87", lnsim: "\u22E6", loang: "\u27EC", loarr: "\u21FD", longmapsto: "\u27FC", xmap: "\u27FC", looparrowright: "\u21AC", rarrlp: "\u21AC", lopar: "\u2985", lopf: "\u{1D55D}", loplus: "\u2A2D", lotimes: "\u2A34", lowast: "\u2217", loz: "\u25CA", lozenge: "\u25CA", lpar: "(", lparlt: "\u2993", lrhard: "\u296D", lrm: "\u200E", lrtri: "\u22BF", lsaquo: "\u2039", lscr: "\u{1D4C1}", lsime: "\u2A8D", lsimg: "\u2A8F", lsquor: "\u201A", sbquo: "\u201A", lstrok: "\u0142", ltcc: "\u2AA6", ltcir: "\u2A79", ltimes: "\u22C9", ltlarr: "\u2976", ltquest: "\u2A7B", ltrPar: "\u2996", ltri: "\u25C3", triangleleft: "\u25C3", lurdshar: "\u294A", luruhar: "\u2966", lvertneqq: "\u2268\uFE00", lvnE: "\u2268\uFE00", mDDot: "\u223A", macr: "\xAF", strns: "\xAF", male: "\u2642", malt: "\u2720", maltese: "\u2720", marker: "\u25AE", mcomma: "\u2A29", mcy: "\u043C", mdash: "\u2014", mfr: "\u{1D52A}", mho: "\u2127", micro: "\xB5", midcir: "\u2AF0", minus: "\u2212", minusdu: "\u2A2A", mlcp: "\u2ADB", models: "\u22A7", mopf: "\u{1D55E}", mscr: "\u{1D4C2}", mu: "\u03BC", multimap: "\u22B8", mumap: "\u22B8", nGg: "\u22D9\u0338", nGt: "\u226B\u20D2", nLeftarrow: "\u21CD", nlArr: "\u21CD", nLeftrightarrow: "\u21CE", nhArr: "\u21CE", nLl: "\u22D8\u0338", nLt: "\u226A\u20D2", nRightarrow: "\u21CF", nrArr: "\u21CF", nVDash: "\u22AF", nVdash: "\u22AE", nacute: "\u0144", nang: "\u2220\u20D2", napE: "\u2A70\u0338", napid: "\u224B\u0338", napos: "\u0149", natur: "\u266E", natural: "\u266E", ncap: "\u2A43", ncaron: "\u0148", ncedil: "\u0146", ncongdot: "\u2A6D\u0338", ncup: "\u2A42", ncy: "\u043D", ndash: "\u2013", neArr: "\u21D7", nearhk: "\u2924", nedot: "\u2250\u0338", nesear: "\u2928", toea: "\u2928", nfr: "\u{1D52B}", nharr: "\u21AE", nleftrightarrow: "\u21AE", nhpar: "\u2AF2", nis: "\u22FC", nisd: "\u22FA", njcy: "\u045A", nlE: "\u2266\u0338", nleqq: "\u2266\u0338", nlarr: "\u219A", nleftarrow: "\u219A", nldr: "\u2025", nopf: "\u{1D55F}", not: "\xAC", notinE: "\u22F9\u0338", notindot: "\u22F5\u0338", notinvb: "\u22F7", notinvc: "\u22F6", notnivb: "\u22FE", notnivc: "\u22FD", nparsl: "\u2AFD\u20E5", npart: "\u2202\u0338", npolint: "\u2A14", nrarr: "\u219B", nrightarrow: "\u219B", nrarrc: "\u2933\u0338", nrarrw: "\u219D\u0338", nscr: "\u{1D4C3}", nsub: "\u2284", nsubE: "\u2AC5\u0338", nsubseteqq: "\u2AC5\u0338", nsup: "\u2285", nsupE: "\u2AC6\u0338", nsupseteqq: "\u2AC6\u0338", ntilde: "\xF1", nu: "\u03BD", num: "#", numero: "\u2116", numsp: "\u2007", nvDash: "\u22AD", nvHarr: "\u2904", nvap: "\u224D\u20D2", nvdash: "\u22AC", nvge: "\u2265\u20D2", nvgt: ">\u20D2", nvinfin: "\u29DE", nvlArr: "\u2902", nvle: "\u2264\u20D2", nvlt: "<\u20D2", nvltrie: "\u22B4\u20D2", nvrArr: "\u2903", nvrtrie: "\u22B5\u20D2", nvsim: "\u223C\u20D2", nwArr: "\u21D6", nwarhk: "\u2923", nwnear: "\u2927", oacute: "\xF3", ocirc: "\xF4", ocy: "\u043E", odblac: "\u0151", odiv: "\u2A38", odsold: "\u29BC", oelig: "\u0153", ofcir: "\u29BF", ofr: "\u{1D52C}", ogon: "\u02DB", ograve: "\xF2", ogt: "\u29C1", ohbar: "\u29B5", olcir: "\u29BE", olcross: "\u29BB", olt: "\u29C0", omacr: "\u014D", omega: "\u03C9", omicron: "\u03BF", omid: "\u29B6", oopf: "\u{1D560}", opar: "\u29B7", operp: "\u29B9", or: "\u2228", vee: "\u2228", ord: "\u2A5D", order: "\u2134", orderof: "\u2134", oscr: "\u2134", ordf: "\xAA", ordm: "\xBA", origof: "\u22B6", oror: "\u2A56", orslope: "\u2A57", orv: "\u2A5B", oslash: "\xF8", osol: "\u2298", otilde: "\xF5", otimesas: "\u2A36", ouml: "\xF6", ovbar: "\u233D", para: "\xB6", parsim: "\u2AF3", parsl: "\u2AFD", pcy: "\u043F", percnt: "%", period: ".", permil: "\u2030", pertenk: "\u2031", pfr: "\u{1D52D}", phi: "\u03C6", phiv: "\u03D5", straightphi: "\u03D5", varphi: "\u03D5", phone: "\u260E", pi: "\u03C0", piv: "\u03D6", varpi: "\u03D6", planckh: "\u210E", plus: "+", plusacir: "\u2A23", pluscir: "\u2A22", plusdu: "\u2A25", pluse: "\u2A72", plussim: "\u2A26", plustwo: "\u2A27", pointint: "\u2A15", popf: "\u{1D561}", pound: "\xA3", prE: "\u2AB3", prap: "\u2AB7", precapprox: "\u2AB7", precnapprox: "\u2AB9", prnap: "\u2AB9", precneqq: "\u2AB5", prnE: "\u2AB5", precnsim: "\u22E8", prnsim: "\u22E8", prime: "\u2032", profalar: "\u232E", profline: "\u2312", profsurf: "\u2313", prurel: "\u22B0", pscr: "\u{1D4C5}", psi: "\u03C8", puncsp: "\u2008", qfr: "\u{1D52E}", qopf: "\u{1D562}", qprime: "\u2057", qscr: "\u{1D4C6}", quatint: "\u2A16", quest: "?", rAtail: "\u291C", rHar: "\u2964", race: "\u223D\u0331", racute: "\u0155", raemptyv: "\u29B3", rangd: "\u2992", range: "\u29A5", raquo: "\xBB", rarrap: "\u2975", rarrbfs: "\u2920", rarrc: "\u2933", rarrfs: "\u291E", rarrpl: "\u2945", rarrsim: "\u2974", rarrtl: "\u21A3", rightarrowtail: "\u21A3", rarrw: "\u219D", rightsquigarrow: "\u219D", ratail: "\u291A", ratio: "\u2236", rbbrk: "\u2773", rbrace: "}", rcub: "}", rbrack: "]", rsqb: "]", rbrke: "\u298C", rbrksld: "\u298E", rbrkslu: "\u2990", rcaron: "\u0159", rcedil: "\u0157", rcy: "\u0440", rdca: "\u2937", rdldhar: "\u2969", rdsh: "\u21B3", rect: "\u25AD", rfisht: "\u297D", rfr: "\u{1D52F}", rharul: "\u296C", rho: "\u03C1", rhov: "\u03F1", varrho: "\u03F1", rightrightarrows: "\u21C9", rrarr: "\u21C9", rightthreetimes: "\u22CC", rthree: "\u22CC", ring: "\u02DA", rlm: "\u200F", rmoust: "\u23B1", rmoustache: "\u23B1", rnmid: "\u2AEE", roang: "\u27ED", roarr: "\u21FE", ropar: "\u2986", ropf: "\u{1D563}", roplus: "\u2A2E", rotimes: "\u2A35", rpar: ")", rpargt: "\u2994", rppolint: "\u2A12", rsaquo: "\u203A", rscr: "\u{1D4C7}", rtimes: "\u22CA", rtri: "\u25B9", triangleright: "\u25B9", rtriltri: "\u29CE", ruluhar: "\u2968", rx: "\u211E", sacute: "\u015B", scE: "\u2AB4", scap: "\u2AB8", succapprox: "\u2AB8", scaron: "\u0161", scedil: "\u015F", scirc: "\u015D", scnE: "\u2AB6", succneqq: "\u2AB6", scnap: "\u2ABA", succnapprox: "\u2ABA", scnsim: "\u22E9", succnsim: "\u22E9", scpolint: "\u2A13", scy: "\u0441", sdot: "\u22C5", sdote: "\u2A66", seArr: "\u21D8", sect: "\xA7", semi: ";", seswar: "\u2929", tosa: "\u2929", sext: "\u2736", sfr: "\u{1D530}", sharp: "\u266F", shchcy: "\u0449", shcy: "\u0448", shy: "\xAD", sigma: "\u03C3", sigmaf: "\u03C2", sigmav: "\u03C2", varsigma: "\u03C2", simdot: "\u2A6A", simg: "\u2A9E", simgE: "\u2AA0", siml: "\u2A9D", simlE: "\u2A9F", simne: "\u2246", simplus: "\u2A24", simrarr: "\u2972", smashp: "\u2A33", smeparsl: "\u29E4", smile: "\u2323", ssmile: "\u2323", smt: "\u2AAA", smte: "\u2AAC", smtes: "\u2AAC\uFE00", softcy: "\u044C", sol: "/", solb: "\u29C4", solbar: "\u233F", sopf: "\u{1D564}", spades: "\u2660", spadesuit: "\u2660", sqcaps: "\u2293\uFE00", sqcups: "\u2294\uFE00", sscr: "\u{1D4C8}", star: "\u2606", sub: "\u2282", subset: "\u2282", subE: "\u2AC5", subseteqq: "\u2AC5", subdot: "\u2ABD", subedot: "\u2AC3", submult: "\u2AC1", subnE: "\u2ACB", subsetneqq: "\u2ACB", subne: "\u228A", subsetneq: "\u228A", subplus: "\u2ABF", subrarr: "\u2979", subsim: "\u2AC7", subsub: "\u2AD5", subsup: "\u2AD3", sung: "\u266A", sup1: "\xB9", sup2: "\xB2", sup3: "\xB3", supE: "\u2AC6", supseteqq: "\u2AC6", supdot: "\u2ABE", supdsub: "\u2AD8", supedot: "\u2AC4", suphsol: "\u27C9", suphsub: "\u2AD7", suplarr: "\u297B", supmult: "\u2AC2", supnE: "\u2ACC", supsetneqq: "\u2ACC", supne: "\u228B", supsetneq: "\u228B", supplus: "\u2AC0", supsim: "\u2AC8", supsub: "\u2AD4", supsup: "\u2AD6", swArr: "\u21D9", swnwar: "\u292A", szlig: "\xDF", target: "\u2316", tau: "\u03C4", tcaron: "\u0165", tcedil: "\u0163", tcy: "\u0442", telrec: "\u2315", tfr: "\u{1D531}", theta: "\u03B8", thetasym: "\u03D1", thetav: "\u03D1", vartheta: "\u03D1", thorn: "\xFE", times: "\xD7", timesbar: "\u2A31", timesd: "\u2A30", topbot: "\u2336", topcir: "\u2AF1", topf: "\u{1D565}", topfork: "\u2ADA", tprime: "\u2034", triangle: "\u25B5", utri: "\u25B5", triangleq: "\u225C", trie: "\u225C", tridot: "\u25EC", triminus: "\u2A3A", triplus: "\u2A39", trisb: "\u29CD", tritime: "\u2A3B", trpezium: "\u23E2", tscr: "\u{1D4C9}", tscy: "\u0446", tshcy: "\u045B", tstrok: "\u0167", uHar: "\u2963", uacute: "\xFA", ubrcy: "\u045E", ubreve: "\u016D", ucirc: "\xFB", ucy: "\u0443", udblac: "\u0171", ufisht: "\u297E", ufr: "\u{1D532}", ugrave: "\xF9", uhblk: "\u2580", ulcorn: "\u231C", ulcorner: "\u231C", ulcrop: "\u230F", ultri: "\u25F8", umacr: "\u016B", uogon: "\u0173", uopf: "\u{1D566}", upsi: "\u03C5", upsilon: "\u03C5", upuparrows: "\u21C8", uuarr: "\u21C8", urcorn: "\u231D", urcorner: "\u231D", urcrop: "\u230E", uring: "\u016F", urtri: "\u25F9", uscr: "\u{1D4CA}", utdot: "\u22F0", utilde: "\u0169", uuml: "\xFC", uwangle: "\u29A7", vBar: "\u2AE8", vBarv: "\u2AE9", vangrt: "\u299C", varsubsetneq: "\u228A\uFE00", vsubne: "\u228A\uFE00", varsubsetneqq: "\u2ACB\uFE00", vsubnE: "\u2ACB\uFE00", varsupsetneq: "\u228B\uFE00", vsupne: "\u228B\uFE00", varsupsetneqq: "\u2ACC\uFE00", vsupnE: "\u2ACC\uFE00", vcy: "\u0432", veebar: "\u22BB", veeeq: "\u225A", vellip: "\u22EE", vfr: "\u{1D533}", vopf: "\u{1D567}", vscr: "\u{1D4CB}", vzigzag: "\u299A", wcirc: "\u0175", wedbar: "\u2A5F", wedgeq: "\u2259", weierp: "\u2118", wp: "\u2118", wfr: "\u{1D534}", wopf: "\u{1D568}", wscr: "\u{1D4CC}", xfr: "\u{1D535}", xi: "\u03BE", xnis: "\u22FB", xopf: "\u{1D569}", xscr: "\u{1D4CD}", yacute: "\xFD", yacy: "\u044F", ycirc: "\u0177", ycy: "\u044B", yen: "\xA5", yfr: "\u{1D536}", yicy: "\u0457", yopf: "\u{1D56A}", yscr: "\u{1D4CE}", yucy: "\u044E", yuml: "\xFF", zacute: "\u017A", zcaron: "\u017E", zcy: "\u0437", zdot: "\u017C", zeta: "\u03B6", zfr: "\u{1D537}", zhcy: "\u0436", zigrarr: "\u21DD", zopf: "\u{1D56B}", zscr: "\u{1D4CF}", zwj: "\u200D", zwnj: "\u200C" };
_e$1.ngsp = "\uE500";
var za = class {
  tokens;
  errors;
  nonNormalizedIcuExpressions;
  constructor(e, t, r) {
    this.tokens = e, this.errors = t, this.nonNormalizedIcuExpressions = r;
  }
};
function Di$1(e, t, r, n = {}) {
  let i = new Qa(new rt$1(e, t), r, n);
  return i.tokenize(), new za(no$1(i.tokens), i.errors, i.nonNormalizedIcuExpressions);
}
var Ga = /\r\n?/g;
function Se$1(e) {
  return `Unexpected character "${e === 0 ? "EOF" : String.fromCharCode(e)}"`;
}
function xi$1(e) {
  return `Unknown entity "${e}" - use the "&#<decimal>;" or  "&#x<hex>;" syntax`;
}
function $a(e, t) {
  return `Unable to parse entity "${t}" - ${e} character reference entities must end with ";"`;
}
var ja = ["@if", "@else", "@for", "@switch", "@case", "@default", "@empty", "@defer", "@placeholder", "@loading", "@error", "@content"], it$1 = { start: "{{", end: "}}" }, Ya = /^default[^\S\r\n]+never/, Ka = /^else[^\S\r\n]+if/, Qa = class {
  _getTagContentType;
  _cursor;
  _tokenizeIcu;
  _leadingTriviaCodePoints;
  _canSelfClose;
  _allowHtmComponentClosingTags;
  _allowStartTagComments;
  _currentTokenStart = null;
  _currentTokenType = null;
  _expansionCaseStack = [];
  _openDirectiveCount = 0;
  _inInterpolation = false;
  _preserveLineEndings;
  _i18nNormalizeLineEndingsInICUs;
  _fullNameStack = [];
  _tokenizeBlocks;
  _tokenizeLet;
  _selectorlessEnabled;
  tokens = [];
  errors = [];
  nonNormalizedIcuExpressions = [];
  constructor(e, t, r) {
    this._getTagContentType = t, this._tokenizeIcu = r.tokenizeExpansionForms || false, this._leadingTriviaCodePoints = r.leadingTriviaChars && r.leadingTriviaChars.map((i) => i.codePointAt(0) || 0), this._canSelfClose = r.canSelfClose || false, this._allowHtmComponentClosingTags = r.allowHtmComponentClosingTags || false, this._allowStartTagComments = r.allowStartTagComments ?? true;
    let n = r.range || { endPos: e.content.length, startPos: 0, startLine: 0, startCol: 0 };
    this._cursor = r.escapedString ? new io$1(e, n) : new Ii$1(e, n), this._preserveLineEndings = r.preserveLineEndings || false, this._i18nNormalizeLineEndingsInICUs = r.i18nNormalizeLineEndingsInICUs || false, this._tokenizeBlocks = r.tokenizeBlocks ?? true, this._tokenizeLet = r.tokenizeLet ?? true, this._selectorlessEnabled = r.selectorlessEnabled ?? false;
    try {
      this._cursor.init();
    } catch (i) {
      this.handleError(i);
    }
  }
  _processCarriageReturns(e) {
    return this._preserveLineEndings ? e : e.replace(Ga, `
`);
  }
  tokenize() {
    for (; this._cursor.peek() !== 0; ) {
      let e = this._cursor.clone();
      try {
        if (this._attemptCharCode(60)) if (this._attemptCharCode(33)) this._attemptStr("[CDATA[") ? this._consumeCdata(e) : this._attemptStr("--") ? this._consumeComment(e) : this._attemptStrCaseInsensitive("doctype") ? this._consumeDocType(e) : this._consumeBogusComment(e);
        else if (this._attemptCharCode(47)) this._consumeTagClose(e);
        else {
          let t = this._cursor.clone();
          this._attemptCharCode(63) ? (this._cursor = t, this._consumeBogusComment(e)) : this._consumeTagOpen(e);
        }
        else this._tokenizeLet && this._cursor.peek() === 64 && !this._inInterpolation && this._isLetStart() ? this._consumeLetDeclaration(e) : this._tokenizeBlocks && this._isBlockStart() ? this._consumeBlockStart(e) : this._tokenizeBlocks && !this._inInterpolation && !this._isInExpansionCase() && !this._isInExpansionForm() && this._attemptCharCode(125) ? this._consumeBlockEnd(e) : this._tokenizeIcu && this._tokenizeExpansionForm() || this._consumeWithInterpolation(5, 8, () => this._isTextEnd(), () => this._isTagStart());
      } catch (t) {
        this.handleError(t);
      }
    }
    this._beginToken(43), this._endToken([]);
  }
  _getBlockName() {
    let e = false, t = this._cursor.clone();
    this._attemptCharCodeUntilFn((n) => nt$1(n) ? !e : ro$1(n) ? (e = true, false) : true);
    let r = this._cursor.getChars(t).trim();
    return Ka.test(r) ? r = "else if" : Ya.test(r) && (r = "default never"), r;
  }
  _consumeBlockStart(e) {
    this._requireCharCode(64), this._beginToken(26, e);
    let t = this._endToken([this._getBlockName()]);
    if (this._cursor.peek() === 40) if (this._cursor.advance(), this._consumeBlockParameters(), this._attemptCharCodeUntilFn(b$1), this._attemptCharCode(41)) this._attemptCharCodeUntilFn(b$1);
    else {
      t.type = 30;
      return;
    }
    if (t.parts[0] === "default never" && this._attemptCharCode(59)) {
      this._beginToken(27), this._endToken([]), this._beginToken(28), this._endToken([]);
      return;
    }
    this._attemptCharCode(123) ? (this._beginToken(27), this._endToken([])) : this._isBlockStart() && (t.parts[0] === "case" || t.parts[0] === "default") ? (this._beginToken(27), this._endToken([]), this._beginToken(28), this._endToken([])) : t.type = 30;
  }
  _consumeBlockEnd(e) {
    this._beginToken(28, e), this._endToken([]);
  }
  _consumeBlockParameters() {
    for (this._attemptCharCodeUntilFn(Ai$1); this._cursor.peek() !== 41 && this._cursor.peek() !== 0; ) {
      this._beginToken(29);
      let e = this._cursor.clone(), t = null, r = 0;
      for (; this._cursor.peek() !== 59 && this._cursor.peek() !== 0 || t !== null; ) {
        let n = this._cursor.peek();
        if (n === 92) this._cursor.advance();
        else if (n === t) t = null;
        else if (t === null && Rt$1(n)) t = n;
        else if (n === 40 && t === null) r++;
        else if (n === 41 && t === null) {
          if (r === 0) break;
          r > 0 && r--;
        }
        this._cursor.advance();
      }
      this._endToken([this._cursor.getChars(e)]), this._attemptCharCodeUntilFn(Ai$1);
    }
  }
  _consumeLetDeclaration(e) {
    if (this._requireStr("@let"), this._beginToken(31, e), nt$1(this._cursor.peek())) this._attemptCharCodeUntilFn(b$1);
    else {
      let r = this._endToken([this._cursor.getChars(e)]);
      r.type = 34;
      return;
    }
    let t = this._endToken([this._getLetDeclarationName()]);
    if (this._attemptCharCodeUntilFn(b$1), !this._attemptCharCode(61)) {
      t.type = 34;
      return;
    }
    this._attemptCharCodeUntilFn((r) => b$1(r) && !Oe$1(r)), this._consumeLetDeclarationValue(), this._cursor.peek() === 59 ? (this._beginToken(33), this._cursor.advance(), this._endToken([])) : (t.type = 34, t.sourceSpan = this._cursor.getSpan(e));
  }
  _getLetDeclarationName() {
    let e = this._cursor.clone(), t = false;
    return this._attemptCharCodeUntilFn((r) => Re$1(r) || r === 36 || r === 95 || t && Ie$1(r) ? (t = true, false) : true), this._cursor.getChars(e).trim();
  }
  _consumeLetDeclarationValue() {
    let e = this._cursor.clone();
    for (this._beginToken(32, e); this._cursor.peek() !== 0; ) {
      let t = this._cursor.peek();
      if (t === 59) break;
      Rt$1(t) && (this._cursor.advance(), this._attemptCharCodeUntilFn((r) => r === 92 ? (this._cursor.advance(), false) : r === t)), this._cursor.advance();
    }
    this._endToken([this._cursor.getChars(e)]);
  }
  _tokenizeExpansionForm() {
    if (this.isExpansionFormStart()) return this._consumeExpansionFormStart(), true;
    if (eo$1(this._cursor.peek()) && this._isInExpansionForm()) return this._consumeExpansionCaseStart(), true;
    if (this._cursor.peek() === 125) {
      if (this._isInExpansionCase()) return this._consumeExpansionCaseEnd(), true;
      if (this._isInExpansionForm()) return this._consumeExpansionFormEnd(), true;
    }
    return false;
  }
  _beginToken(e, t = this._cursor.clone()) {
    this._currentTokenStart = t, this._currentTokenType = e;
  }
  _endToken(e, t) {
    if (this._currentTokenStart === null) throw new te$1(this._cursor.getSpan(t), "Programming error - attempted to end a token when there was no start to the token");
    if (this._currentTokenType === null) throw new te$1(this._cursor.getSpan(this._currentTokenStart), "Programming error - attempted to end a token which has no token type");
    let r = { type: this._currentTokenType, parts: e, sourceSpan: (t ?? this._cursor).getSpan(this._currentTokenStart, this._leadingTriviaCodePoints) };
    return this.tokens.push(r), this._currentTokenStart = null, this._currentTokenType = null, r;
  }
  _createError(e, t) {
    this._isInExpansionForm() && (e += ` (Do you have an unescaped "{" in your template? Use "{{ '{' }}") to escape it.)`);
    let r = new te$1(t, e);
    return this._currentTokenStart = null, this._currentTokenType = null, r;
  }
  handleError(e) {
    if (e instanceof Cr$1 && (e = this._createError(e.msg, this._cursor.getSpan(e.cursor))), e instanceof te$1) this.errors.push(e);
    else throw e;
  }
  _attemptCharCode(e) {
    return this._cursor.peek() === e ? (this._cursor.advance(), true) : false;
  }
  _attemptCharCodeCaseInsensitive(e) {
    return to$1(this._cursor.peek(), e) ? (this._cursor.advance(), true) : false;
  }
  _requireCharCode(e) {
    let t = this._cursor.clone();
    if (!this._attemptCharCode(e)) throw this._createError(Se$1(this._cursor.peek()), this._cursor.getSpan(t));
  }
  _attemptStr(e) {
    let t = e.length;
    if (this._cursor.charsLeft() < t) return false;
    let r = this._cursor.clone();
    for (let n = 0; n < t; n++) if (!this._attemptCharCode(e.charCodeAt(n))) return this._cursor = r, false;
    return true;
  }
  _attemptStrCaseInsensitive(e) {
    for (let t = 0; t < e.length; t++) if (!this._attemptCharCodeCaseInsensitive(e.charCodeAt(t))) return false;
    return true;
  }
  _requireStr(e) {
    let t = this._cursor.clone();
    if (!this._attemptStr(e)) throw this._createError(Se$1(this._cursor.peek()), this._cursor.getSpan(t));
  }
  _requireStrCaseInsensitive(e) {
    let t = this._cursor.clone();
    if (!this._attemptStrCaseInsensitive(e)) throw this._createError(Se$1(this._cursor.peek()), this._cursor.getSpan(t));
  }
  _attemptCharCodeUntilFn(e) {
    for (; !e(this._cursor.peek()); ) this._cursor.advance();
  }
  _requireCharCodeUntilFn(e, t) {
    let r = this._cursor.clone();
    if (this._attemptCharCodeUntilFn(e), this._cursor.diff(r) < t) throw this._createError(Se$1(this._cursor.peek()), this._cursor.getSpan(r));
  }
  _attemptUntilChar(e) {
    for (; this._cursor.peek() !== e; ) this._cursor.advance();
  }
  _readChar() {
    let e = String.fromCodePoint(this._cursor.peek());
    return this._cursor.advance(), e;
  }
  _peekStr(e) {
    let t = e.length;
    if (this._cursor.charsLeft() < t) return false;
    let r = this._cursor.clone();
    for (let n = 0; n < t; n++) {
      if (r.peek() !== e.charCodeAt(n)) return false;
      r.advance();
    }
    return true;
  }
  _isBlockStart() {
    return this._cursor.peek() === 64 && ja.some((e) => this._peekStr(e));
  }
  _isLetStart() {
    return this._cursor.peek() === 64 && this._peekStr("@let");
  }
  _consumeEntity(e) {
    this._beginToken(9);
    let t = this._cursor.clone();
    if (this._cursor.advance(), this._attemptCharCode(35)) {
      let r = this._attemptCharCode(120) || this._attemptCharCode(88), n = this._cursor.clone();
      if (this._attemptCharCodeUntilFn(Ja), this._cursor.peek() != 59) {
        this._cursor.advance();
        let s = r ? "hexadecimal" : "decimal";
        throw this._createError($a(s, this._cursor.getChars(t)), this._cursor.getSpan());
      }
      let i = this._cursor.getChars(n);
      this._cursor.advance();
      try {
        let s = parseInt(i, r ? 16 : 10);
        this._endToken([String.fromCodePoint(s), this._cursor.getChars(t)]);
      } catch {
        throw this._createError(xi$1(this._cursor.getChars(t)), this._cursor.getSpan());
      }
    } else {
      let r = this._cursor.clone();
      if (this._attemptCharCodeUntilFn(Za), this._cursor.peek() != 59) this._beginToken(e, t), this._cursor = r, this._endToken(["&"]);
      else {
        let n = this._cursor.getChars(r);
        this._cursor.advance();
        let i = _e$1.hasOwnProperty(n) && _e$1[n];
        if (!i) throw this._createError(xi$1(n), this._cursor.getSpan(t));
        this._endToken([i, `&${n};`]);
      }
    }
  }
  _consumeRawText(e, t) {
    this._beginToken(e ? 6 : 7);
    let r = [];
    for (; ; ) {
      let n = this._cursor.clone(), i = t();
      if (this._cursor = n, i) break;
      e && this._cursor.peek() === 38 ? (this._endToken([this._processCarriageReturns(r.join(""))]), r.length = 0, this._consumeEntity(6), this._beginToken(6)) : r.push(this._readChar());
    }
    this._endToken([this._processCarriageReturns(r.join(""))]);
  }
  _consumeComment(e) {
    this._beginToken(10, e), this._endToken([]), this._consumeRawText(false, () => this._attemptStr("-->")), this._beginToken(11), this._requireStr("-->"), this._endToken([]);
  }
  _consumeBogusComment(e) {
    this._beginToken(10, e), this._endToken([]), this._consumeRawText(false, () => this._cursor.peek() === 62), this._beginToken(11), this._cursor.advance(), this._endToken([]);
  }
  _consumeCdata(e) {
    this._beginToken(13, e), this._endToken([]), this._consumeRawText(false, () => this._attemptStr("]]>")), this._beginToken(14), this._requireStr("]]>"), this._endToken([]);
  }
  _consumeDocType(e) {
    this._beginToken(19, e), this._endToken([]), this._consumeRawText(false, () => this._cursor.peek() === 62), this._beginToken(20), this._cursor.advance(), this._endToken([]);
  }
  _consumePrefixAndName(e) {
    let t = this._cursor.clone(), r = "";
    for (; this._cursor.peek() !== 58 && !Xa(this._cursor.peek()); ) this._cursor.advance();
    let n;
    this._cursor.peek() === 58 ? (r = this._cursor.getChars(t), this._cursor.advance(), n = this._cursor.clone()) : n = t, this._requireCharCodeUntilFn(e, r === "" ? 0 : 1);
    let i = this._cursor.getChars(n);
    return [r, i];
  }
  _consumeSingleLineComment(e) {
    let t = this._cursor.clone();
    this._attemptCharCodeUntilFn((i) => Oe$1(i) || i === 0);
    let r = this._cursor.clone(), n = r.getChars(t);
    this._beginToken(12, e), this._endToken([n, "single"], r), this._attemptCharCodeUntilFn(b$1);
  }
  _consumeMultiLineComment(e) {
    let t = this._cursor.clone();
    this._attemptCharCodeUntilFn((s) => {
      if (s === 0) return true;
      if (s === 42) {
        let a = this._cursor.clone();
        return a.advance(), a.peek() === 47;
      }
      return false;
    });
    let r = this._cursor.clone(), n = r.getChars(t), i = r;
    this._attemptStr("*/") && (i = this._cursor.clone(), this._attemptCharCodeUntilFn(b$1)), this._beginToken(12, e), this._endToken([n, "multi"], i);
  }
  _consumeTagOpen(e) {
    let t, r, n, i, s = [];
    try {
      if (this._selectorlessEnabled && Ot$1(this._cursor.peek())) i = this._consumeComponentOpenStart(e), [n, r, t] = i.parts, r && (n += `:${r}`), t && (n += `:${t}`), this._attemptCharCodeUntilFn(b$1);
      else {
        if (!Re$1(this._cursor.peek())) throw this._createError(Se$1(this._cursor.peek()), this._cursor.getSpan(e));
        i = this._consumeTagOpenStart(e), r = i.parts[0], t = n = i.parts[1], this._attemptCharCodeUntilFn(b$1);
      }
      for (; ; ) {
        if (this._allowStartTagComments) {
          let o = this._cursor.clone();
          if (this._attemptStr("//")) {
            this._consumeSingleLineComment(o);
            continue;
          }
          if (this._attemptStr("/*")) {
            this._consumeMultiLineComment(o);
            continue;
          }
        }
        if (Ni$1(this._cursor.peek())) break;
        if (this._selectorlessEnabled && this._cursor.peek() === 64) {
          let o = this._cursor.clone(), l = o.clone();
          l.advance(), Ot$1(l.peek()) && this._consumeDirective(o, l);
        } else {
          let o = this._consumeAttribute();
          s.push(o);
        }
      }
      i.type === 35 ? this._consumeComponentOpenEnd() : this._consumeTagOpenEnd();
    } catch (o) {
      if (o instanceof te$1) {
        i ? i.type = i.type === 35 ? 39 : 4 : (this._beginToken(5, e), this._endToken(["<"]));
        return;
      }
      throw o;
    }
    if (this._canSelfClose && this.tokens[this.tokens.length - 1].type === 2) return;
    let a = this._getTagContentType(t, r, this._fullNameStack.length > 0, s);
    this._handleFullNameStackForTagOpen(r, t), a === 0 ? this._consumeRawTextWithTagClose(r, i, n, false) : a === 1 && this._consumeRawTextWithTagClose(r, i, n, true);
  }
  _consumeRawTextWithTagClose(e, t, r, n) {
    this._consumeRawText(n, () => !this._attemptCharCode(60) || !this._attemptCharCode(47) || (this._attemptCharCodeUntilFn(b$1), !this._attemptStrCaseInsensitive(e && t.type !== 35 ? `${e}:${r}` : r)) ? false : (this._attemptCharCodeUntilFn(b$1), this._attemptCharCode(62))), this._beginToken(t.type === 35 ? 38 : 3), this._requireCharCodeUntilFn((i) => i === 62, 3), this._cursor.advance(), this._endToken(t.parts), this._handleFullNameStackForTagClose(e, r);
  }
  _consumeTagOpenStart(e) {
    this._beginToken(0, e);
    let t = this._consumePrefixAndName(ve$1);
    return this._endToken(t);
  }
  _consumeComponentOpenStart(e) {
    this._beginToken(35, e);
    let t = this._consumeComponentName();
    return this._endToken(t);
  }
  _consumeComponentName() {
    let e = this._cursor.clone();
    for (; Pi$1(this._cursor.peek()); ) this._cursor.advance();
    let t = this._cursor.getChars(e), r = "", n = "";
    return this._cursor.peek() === 58 && (this._cursor.advance(), [r, n] = this._consumePrefixAndName(ve$1)), [t, r, n];
  }
  _consumeAttribute() {
    let [e, t] = this._consumeAttributeName(), r;
    return this._attemptCharCodeUntilFn(b$1), this._attemptCharCode(61) && (this._attemptCharCodeUntilFn(b$1), r = this._consumeAttributeValue()), this._attemptCharCodeUntilFn(b$1), { prefix: e, name: t, value: r };
  }
  _consumeAttributeName() {
    let e = this._cursor.peek();
    if (e === 39 || e === 34) throw this._createError(Se$1(e), this._cursor.getSpan());
    this._beginToken(15);
    let t;
    if (this._openDirectiveCount > 0) {
      let n = 0;
      t = (i) => {
        if (this._openDirectiveCount > 0) {
          if (i === 40) n++;
          else if (i === 41) {
            if (n === 0) return true;
            n--;
          }
        }
        return ve$1(i);
      };
    } else if (e === 91) {
      let n = 0;
      t = (i) => (i === 91 ? n++ : i === 93 && n--, n <= 0 ? ve$1(i) : Oe$1(i));
    } else t = ve$1;
    let r = this._consumePrefixAndName(t);
    return this._endToken(r), r;
  }
  _consumeAttributeValue() {
    let e;
    if (this._cursor.peek() === 39 || this._cursor.peek() === 34) {
      let t = this._cursor.peek();
      this._consumeQuote(t);
      let r = () => this._cursor.peek() === t;
      e = this._consumeWithInterpolation(17, 18, r, r), this._consumeQuote(t);
    } else {
      let t = () => ve$1(this._cursor.peek());
      e = this._consumeWithInterpolation(17, 18, t, t);
    }
    return e;
  }
  _consumeQuote(e) {
    this._beginToken(16), this._requireCharCode(e), this._endToken([String.fromCodePoint(e)]);
  }
  _consumeTagOpenEnd() {
    let e = this._attemptCharCode(47) ? 2 : 1;
    this._beginToken(e), this._requireCharCode(62), this._endToken([]);
  }
  _consumeComponentOpenEnd() {
    let e = this._attemptCharCode(47) ? 37 : 36;
    this._beginToken(e), this._requireCharCode(62), this._endToken([]);
  }
  _consumeTagClose(e) {
    if (this._selectorlessEnabled) {
      let t = e.clone();
      for (; t.peek() !== 62 && !Ot$1(t.peek()); ) t.advance();
      if (Ot$1(t.peek())) {
        this._beginToken(38, e);
        let r = this._consumeComponentName();
        this._attemptCharCodeUntilFn(b$1), this._requireCharCode(62), this._endToken(r);
        return;
      }
    }
    if (this._beginToken(3, e), this._attemptCharCodeUntilFn(b$1), this._allowHtmComponentClosingTags && this._attemptCharCode(47)) this._attemptCharCodeUntilFn(b$1), this._requireCharCode(62), this._endToken([]);
    else {
      let [t, r] = this._consumePrefixAndName(ve$1);
      this._attemptCharCodeUntilFn(b$1), this._requireCharCode(62), this._endToken([t, r]), this._handleFullNameStackForTagClose(t, r);
    }
  }
  _consumeExpansionFormStart() {
    this._beginToken(21), this._requireCharCode(123), this._endToken([]), this._expansionCaseStack.push(21), this._beginToken(7);
    let e = this._readUntil(44), t = this._processCarriageReturns(e);
    if (this._i18nNormalizeLineEndingsInICUs) this._endToken([t]);
    else {
      let n = this._endToken([e]);
      t !== e && this.nonNormalizedIcuExpressions.push(n);
    }
    this._requireCharCode(44), this._attemptCharCodeUntilFn(b$1), this._beginToken(7);
    let r = this._readUntil(44);
    this._endToken([r]), this._requireCharCode(44), this._attemptCharCodeUntilFn(b$1);
  }
  _consumeExpansionCaseStart() {
    this._beginToken(22);
    let e = this._readUntil(123).trim();
    this._endToken([e]), this._attemptCharCodeUntilFn(b$1), this._beginToken(23), this._requireCharCode(123), this._endToken([]), this._attemptCharCodeUntilFn(b$1), this._expansionCaseStack.push(23);
  }
  _consumeExpansionCaseEnd() {
    this._beginToken(24), this._requireCharCode(125), this._endToken([]), this._attemptCharCodeUntilFn(b$1), this._expansionCaseStack.pop();
  }
  _consumeExpansionFormEnd() {
    this._beginToken(25), this._requireCharCode(125), this._endToken([]), this._expansionCaseStack.pop();
  }
  _consumeWithInterpolation(e, t, r, n) {
    this._beginToken(e);
    let i = [];
    for (; !r(); ) {
      let a = this._cursor.clone();
      this._attemptStr(it$1.start) ? (this._endToken([this._processCarriageReturns(i.join(""))], a), i.length = 0, this._consumeInterpolation(t, a, n), this._beginToken(e)) : this._cursor.peek() === 38 ? (this._endToken([this._processCarriageReturns(i.join(""))]), i.length = 0, this._consumeEntity(e), this._beginToken(e)) : i.push(this._readChar());
    }
    this._inInterpolation = false;
    let s = this._processCarriageReturns(i.join(""));
    return this._endToken([s]), s;
  }
  _consumeInterpolation(e, t, r) {
    let n = [];
    this._beginToken(e, t), n.push(it$1.start);
    let i = this._cursor.clone(), s = null, a = false;
    for (; this._cursor.peek() !== 0 && (r === null || !r()); ) {
      let o = this._cursor.clone();
      if (this._isTagStart()) {
        this._cursor = o, n.push(this._getProcessedChars(i, o)), this._endToken(n);
        return;
      }
      if (s === null) if (this._attemptStr(it$1.end)) {
        n.push(this._getProcessedChars(i, o)), n.push(it$1.end), this._endToken(n);
        return;
      } else this._attemptStr("//") && (a = true);
      let l = this._cursor.peek();
      this._cursor.advance(), l === 92 ? this._cursor.advance() : l === s ? s = null : !a && s === null && Rt$1(l) && (s = l);
    }
    n.push(this._getProcessedChars(i, this._cursor)), this._endToken(n);
  }
  _consumeDirective(e, t) {
    for (this._requireCharCode(64), this._cursor.advance(); Pi$1(this._cursor.peek()); ) this._cursor.advance();
    this._beginToken(40, e);
    let r = this._cursor.getChars(t);
    if (this._endToken([r]), this._attemptCharCodeUntilFn(b$1), this._cursor.peek() === 40) {
      for (this._openDirectiveCount++, this._beginToken(41), this._cursor.advance(), this._endToken([]), this._attemptCharCodeUntilFn(b$1); !Ni$1(this._cursor.peek()) && this._cursor.peek() !== 41; ) this._consumeAttribute();
      if (this._attemptCharCodeUntilFn(b$1), this._openDirectiveCount--, this._cursor.peek() !== 41) {
        if (this._cursor.peek() === 62 || this._cursor.peek() === 47) return;
        throw this._createError(Se$1(this._cursor.peek()), this._cursor.getSpan(e));
      }
      this._beginToken(42), this._cursor.advance(), this._endToken([]), this._attemptCharCodeUntilFn(b$1);
    }
  }
  _getProcessedChars(e, t) {
    return this._processCarriageReturns(t.getChars(e));
  }
  _isTextEnd() {
    return !!(this._isTagStart() || this._cursor.peek() === 0 || this._tokenizeIcu && !this._inInterpolation && (this.isExpansionFormStart() || this._cursor.peek() === 125 && this._isInExpansionCase()) || this._tokenizeBlocks && !this._inInterpolation && !this._isInExpansion() && (this._isBlockStart() || this._isLetStart() || this._cursor.peek() === 125));
  }
  _isTagStart() {
    if (this._cursor.peek() === 60) {
      let e = this._cursor.clone();
      e.advance();
      let t = e.peek();
      if (97 <= t && t <= 122 || 65 <= t && t <= 90 || t === 47 || t === 33) return true;
    }
    return false;
  }
  _readUntil(e) {
    let t = this._cursor.clone();
    return this._attemptUntilChar(e), this._cursor.getChars(t);
  }
  _isInExpansion() {
    return this._isInExpansionCase() || this._isInExpansionForm();
  }
  _isInExpansionCase() {
    return this._expansionCaseStack.length > 0 && this._expansionCaseStack[this._expansionCaseStack.length - 1] === 23;
  }
  _isInExpansionForm() {
    return this._expansionCaseStack.length > 0 && this._expansionCaseStack[this._expansionCaseStack.length - 1] === 21;
  }
  isExpansionFormStart() {
    if (this._cursor.peek() !== 123) return false;
    let e = this._cursor.clone(), t = this._attemptStr(it$1.start);
    return this._cursor = e, !t;
  }
  _handleFullNameStackForTagOpen(e, t) {
    let r = fe$1(e, t);
    (this._fullNameStack.length === 0 || this._fullNameStack[this._fullNameStack.length - 1] === r) && this._fullNameStack.push(r);
  }
  _handleFullNameStackForTagClose(e, t) {
    let r = fe$1(e, t);
    this._fullNameStack.length !== 0 && this._fullNameStack[this._fullNameStack.length - 1] === r && this._fullNameStack.pop();
  }
};
function b$1(e) {
  return !nt$1(e) || e === 0;
}
function ve$1(e) {
  return nt$1(e) || e === 62 || e === 60 || e === 47 || e === 39 || e === 34 || e === 61 || e === 0;
}
function Xa(e) {
  return (e < 97 || 122 < e) && (e < 65 || 90 < e) && (e < 48 || e > 57);
}
function Ja(e) {
  return e === 59 || e === 0 || !Ei$1(e);
}
function Za(e) {
  return e === 59 || e === 0 || !(Re$1(e) || Ie$1(e));
}
function eo$1(e) {
  return e !== 125;
}
function to$1(e, t) {
  return Li$1(e) === Li$1(t);
}
function Li$1(e) {
  return e >= 97 && e <= 122 ? e - 97 + 65 : e;
}
function ro$1(e) {
  return Re$1(e) || Ie$1(e) || e === 95;
}
function Ai$1(e) {
  return e !== 59 && b$1(e);
}
function Ot$1(e) {
  return e === 95 || e >= 65 && e <= 90;
}
function Pi$1(e) {
  return Re$1(e) || Ie$1(e) || e === 95;
}
function Ni$1(e) {
  return e === 47 || e === 62 || e === 60 || e === 0;
}
function no$1(e) {
  let t = [], r;
  for (let n = 0; n < e.length; n++) {
    let i = e[n];
    r && r.type === 5 && i.type === 5 || r && r.type === 17 && i.type === 17 ? (r.parts[0] += i.parts[0], r.sourceSpan.end = i.sourceSpan.end) : (r = i, t.push(r));
  }
  return t;
}
var Ii$1 = class Sr {
  state;
  file;
  input;
  end;
  constructor(t, r) {
    if (t instanceof Sr) {
      this.file = t.file, this.input = t.input, this.end = t.end;
      let n = t.state;
      this.state = { peek: n.peek, offset: n.offset, line: n.line, column: n.column };
    } else {
      if (!r) throw new Error("Programming error: the range argument must be provided with a file argument.");
      this.file = t, this.input = t.content, this.end = r.endPos, this.state = { peek: -1, offset: r.startPos, line: r.startLine, column: r.startCol };
    }
  }
  clone() {
    return new Sr(this);
  }
  peek() {
    return this.state.peek;
  }
  charsLeft() {
    return this.end - this.state.offset;
  }
  diff(t) {
    return this.state.offset - t.state.offset;
  }
  advance() {
    this.advanceState(this.state);
  }
  init() {
    this.updatePeek(this.state);
  }
  getSpan(t, r) {
    t = t || this;
    let n = t;
    if (r) for (; this.diff(t) > 0 && r.indexOf(t.peek()) !== -1; ) n === t && (t = t.clone()), t.advance();
    let i = this.locationFromCursor(t);
    return new p(i, this.locationFromCursor(this), n !== t ? this.locationFromCursor(n) : i);
  }
  getChars(t) {
    return this.input.substring(t.state.offset, this.state.offset);
  }
  charAt(t) {
    return this.input.charCodeAt(t);
  }
  advanceState(t) {
    if (t.offset >= this.end) throw this.state = t, new Cr$1('Unexpected character "EOF"', this);
    let r = this.charAt(t.offset);
    r === 10 ? (t.line++, t.column = 0) : Oe$1(r) || t.column++, t.offset++, this.updatePeek(t);
  }
  updatePeek(t) {
    t.peek = t.offset >= this.end ? 0 : this.charAt(t.offset);
  }
  locationFromCursor(t) {
    return new De$1(t.file, t.state.offset, t.state.line, t.state.column);
  }
}, io$1 = class vr extends Ii$1 {
  internalState;
  constructor(t, r) {
    t instanceof vr ? (super(t), this.internalState = { ...t.internalState }) : (super(t, r), this.internalState = this.state);
  }
  advance() {
    this.state = this.internalState, super.advance(), this.processEscapeSequence();
  }
  init() {
    super.init(), this.processEscapeSequence();
  }
  clone() {
    return new vr(this);
  }
  getChars(t) {
    let r = t.clone(), n = "";
    for (; r.internalState.offset < this.internalState.offset; ) n += String.fromCodePoint(r.peek()), r.advance();
    return n;
  }
  processEscapeSequence() {
    let t = () => this.internalState.peek;
    if (t() === 92) if (this.internalState = { ...this.state }, this.advanceState(this.internalState), t() === 110) this.state.peek = 10;
    else if (t() === 114) this.state.peek = 13;
    else if (t() === 118) this.state.peek = 11;
    else if (t() === 116) this.state.peek = 9;
    else if (t() === 98) this.state.peek = 8;
    else if (t() === 102) this.state.peek = 12;
    else if (t() === 117) if (this.advanceState(this.internalState), t() === 123) {
      this.advanceState(this.internalState);
      let r = this.clone(), n = 0;
      for (; t() !== 125; ) this.advanceState(this.internalState), n++;
      this.state.peek = this.decodeHexDigits(r, n);
    } else {
      let r = this.clone();
      this.advanceState(this.internalState), this.advanceState(this.internalState), this.advanceState(this.internalState), this.state.peek = this.decodeHexDigits(r, 4);
    }
    else if (t() === 120) {
      this.advanceState(this.internalState);
      let r = this.clone();
      this.advanceState(this.internalState), this.state.peek = this.decodeHexDigits(r, 2);
    } else if (_r$1(t())) {
      let r = "", n = 0, i = this.clone();
      for (; _r$1(t()) && n < 3; ) i = this.clone(), r += String.fromCodePoint(t()), this.advanceState(this.internalState), n++;
      this.state.peek = parseInt(r, 8), this.internalState = i.internalState;
    } else Oe$1(this.internalState.peek) ? (this.advanceState(this.internalState), this.state = this.internalState) : this.state.peek = this.internalState.peek;
  }
  decodeHexDigits(t, r) {
    let n = this.input.slice(t.internalState.offset, t.internalState.offset + r), i = parseInt(n, 16);
    if (isNaN(i)) throw t.state = t.internalState, new Cr$1("Invalid hexadecimal escape sequence", t);
    return i;
  }
}, Cr$1 = class Cr extends Error {
  msg;
  cursor;
  constructor(e, t) {
    super(e), this.msg = e, this.cursor = t, Object.setPrototypeOf(this, new.target.prototype);
  }
};
var x$1 = class Mi extends te$1 {
  elementName;
  static create(t, r, n) {
    return new Mi(t, r, n);
  }
  constructor(t, r, n) {
    super(r, n), this.elementName = t;
  }
}, so$1 = class so {
  rootNodes;
  errors;
  constructor(e, t) {
    this.rootNodes = e, this.errors = t;
  }
}, Bi$1 = class Bi {
  getTagDefinition;
  constructor(e) {
    this.getTagDefinition = e;
  }
  parse(e, t, r, n = false, i) {
    let s = (h) => (f, ...g) => h(f.toLowerCase(), ...g), a = n ? this.getTagDefinition : s(this.getTagDefinition), o = (h) => a(h).getContentType(), l = n ? i : s(i), c = Di$1(e, t, i ? (h, f, g, v) => {
      let W = l(h, f, g, v);
      return W !== void 0 ? W : o(h);
    } : o, r), u = r && r.canSelfClose || false, d = r && r.allowHtmComponentClosingTags || false, _ = new ao$1(c.tokens, a, u, d, n);
    return _.build(), new so$1(_.rootNodes, [...c.errors, ..._.errors]);
  }
}, ao$1 = class qi {
  tokens;
  tagDefinitionResolver;
  canSelfClose;
  allowHtmComponentClosingTags;
  isTagNameCaseSensitive;
  _index = -1;
  _peek;
  _containerStack = [];
  rootNodes = [];
  errors = [];
  constructor(t, r, n, i, s) {
    this.tokens = t, this.tagDefinitionResolver = r, this.canSelfClose = n, this.allowHtmComponentClosingTags = i, this.isTagNameCaseSensitive = s, this._advance();
  }
  build() {
    for (; this._peek.type !== 43; ) this._peek.type === 0 || this._peek.type === 4 ? this._consumeElementStartTag(this._advance()) : this._peek.type === 3 ? (this._closeVoidElement(), this._consumeElementEndTag(this._advance())) : this._peek.type === 13 ? (this._closeVoidElement(), this._consumeCdata(this._advance())) : this._peek.type === 10 ? (this._closeVoidElement(), this._consumeComment(this._advance())) : this._peek.type === 5 || this._peek.type === 7 || this._peek.type === 6 ? (this._closeVoidElement(), this._consumeText(this._advance())) : this._peek.type === 21 ? this._consumeExpansion(this._advance()) : this._peek.type === 26 ? (this._closeVoidElement(), this._consumeBlockOpen(this._advance())) : this._peek.type === 28 ? (this._closeVoidElement(), this._consumeBlockClose(this._advance())) : this._peek.type === 30 ? (this._closeVoidElement(), this._consumeIncompleteBlock(this._advance())) : this._peek.type === 31 ? (this._closeVoidElement(), this._consumeLet(this._advance())) : this._peek.type === 19 ? this._consumeDocType(this._advance()) : this._peek.type === 34 ? (this._closeVoidElement(), this._consumeIncompleteLet(this._advance())) : this._peek.type === 35 || this._peek.type === 39 ? this._consumeComponentStartTag(this._advance()) : this._peek.type === 38 ? this._consumeComponentEndTag(this._advance()) : this._advance();
    for (let t of this._containerStack) t instanceof ge$1 && this.errors.push(x$1.create(t.name, t.sourceSpan, `Unclosed block "${t.name}"`));
  }
  _advance() {
    let t = this._peek;
    return this._index < this.tokens.length - 1 && this._index++, this._peek = this.tokens[this._index], t;
  }
  _advanceIf(t) {
    return this._peek.type === t ? this._advance() : null;
  }
  _consumeCdata(t) {
    let r = this._advance(), n = this._getText(r), i = this._advanceIf(14);
    this._addToParent(new Si$1(n, new p(t.sourceSpan.start, (i || r).sourceSpan.end), [r]));
  }
  _consumeComment(t) {
    let r = this._advanceIf(7), n = this._advanceIf(11), i = r != null ? r.parts[0].trim() : null, s = n == null ? t.sourceSpan : new p(t.sourceSpan.start, n.sourceSpan.end, t.sourceSpan.fullStart);
    this._addToParent(new wi$1(i, s));
  }
  _consumeDocType(t) {
    let r = this._advanceIf(7), n = this._advanceIf(20), i = r != null ? r.parts[0].trim() : null, s = new p(t.sourceSpan.start, (n || r || t).sourceSpan.end);
    this._addToParent(new Ti$1(i, s));
  }
  _consumeExpansion(t) {
    let r = this._advance(), n = this._advance(), i = [];
    for (; this._peek.type === 22; ) {
      let a = this._parseExpansionCase();
      if (!a) return;
      i.push(a);
    }
    if (this._peek.type !== 25) {
      this.errors.push(x$1.create(null, this._peek.sourceSpan, "Invalid ICU message. Missing '}'."));
      return;
    }
    let s = new p(t.sourceSpan.start, this._peek.sourceSpan.end, t.sourceSpan.fullStart);
    this._addToParent(new vi$1(r.parts[0], n.parts[0], i, s, r.sourceSpan)), this._advance();
  }
  _parseExpansionCase() {
    let t = this._advance();
    if (this._peek.type !== 23) return this.errors.push(x$1.create(null, this._peek.sourceSpan, "Invalid ICU message. Missing '{'.")), null;
    let r = this._advance(), n = this._collectExpansionExpTokens(r);
    if (!n) return null;
    let i = this._advance();
    n.push({ type: 43, parts: [], sourceSpan: i.sourceSpan });
    let s = new qi(n, this.tagDefinitionResolver, this.canSelfClose, this.allowHtmComponentClosingTags, this.isTagNameCaseSensitive);
    if (s.build(), s.errors.length > 0) return this.errors = this.errors.concat(s.errors), null;
    let a = new p(t.sourceSpan.start, i.sourceSpan.end, t.sourceSpan.fullStart), o = new p(r.sourceSpan.start, i.sourceSpan.end, r.sourceSpan.fullStart);
    return new Ci$1(t.parts[0], s.rootNodes, a, t.sourceSpan, o);
  }
  _collectExpansionExpTokens(t) {
    let r = [], n = [23];
    for (; ; ) {
      if ((this._peek.type === 21 || this._peek.type === 23) && n.push(this._peek.type), this._peek.type === 24) if (Ri$1(n, 23)) {
        if (n.pop(), n.length === 0) return r;
      } else return this.errors.push(x$1.create(null, t.sourceSpan, "Invalid ICU message. Missing '}'.")), null;
      if (this._peek.type === 25) if (Ri$1(n, 21)) n.pop();
      else return this.errors.push(x$1.create(null, t.sourceSpan, "Invalid ICU message. Missing '}'.")), null;
      if (this._peek.type === 43) return this.errors.push(x$1.create(null, t.sourceSpan, "Invalid ICU message. Missing '}'.")), null;
      r.push(this._advance());
    }
  }
  _getText(t) {
    let r = t.parts[0];
    if (r.length > 0 && r[0] == `
`) {
      var n;
      let i = this._getClosestElementLikeParent();
      i != null && i.children.length == 0 && (!((n = this._getTagDefinition(i)) === null || n === void 0) && n.ignoreFirstLf) && (r = r.substring(1));
    }
    return r;
  }
  _consumeText(t) {
    let r = [t], n = t.sourceSpan, i = t.parts[0];
    if (i.length > 0 && i[0] === `
`) {
      var s;
      let a = this._getContainer();
      a != null && a.children.length === 0 && (!((s = this._getTagDefinition(a)) === null || s === void 0) && s.ignoreFirstLf) && (i = i.substring(1), r[0] = { type: t.type, sourceSpan: t.sourceSpan, parts: [i] });
    }
    for (; this._peek.type === 8 || this._peek.type === 5 || this._peek.type === 9; ) t = this._advance(), r.push(t), t.type === 8 ? i += t.parts.join("").replace(/&([^;]+);/g, Oi$1) : t.type === 9 ? i += t.parts[0] : i += t.parts.join("");
    if (i.length > 0) {
      let a = t.sourceSpan;
      this._addToParent(new _i$1(i, new p(n.start, a.end, n.fullStart, n.details), r));
    }
  }
  _closeVoidElement() {
    var t;
    let r = this._getContainer();
    r !== null && (!((t = this._getTagDefinition(r)) === null || t === void 0) && t.isVoid) && this._containerStack.pop();
  }
  _consumeElementStartTag(t) {
    var r;
    let n = [], i = [], s = [];
    this._consumeAttributesAndDirectives(n, i, s);
    let a = this._getElementFullName(t, this._getClosestElementLikeParent()), o = this._getTagDefinition(a), l = false;
    if (this._peek.type === 2) {
      this._advance(), l = true;
      let v = this._getTagDefinition(a);
      this.canSelfClose || v?.canSelfClose || Pe$1(a) !== null || v?.isVoid || this.errors.push(x$1.create(a, t.sourceSpan, `Only void, custom and foreign elements can be self closed "${t.parts[1]}"`));
    } else this._peek.type === 1 && (this._advance(), l = false);
    let c = this._peek.sourceSpan.fullStart, u = new p(t.sourceSpan.start, c, t.sourceSpan.fullStart), d = new p(t.sourceSpan.start, c, t.sourceSpan.fullStart), _ = new p(t.sourceSpan.start.moveBy(1), t.sourceSpan.end), h = new re$1(a, n, i, [], l, u, d, void 0, _, o?.isVoid ?? false, void 0, s), f = this._getContainer(), g = f !== null && !!(!((r = this._getTagDefinition(f)) === null || r === void 0) && r.isClosedByChild(h.name));
    this._pushContainer(h, g), l ? this._popContainer(a, re$1, u) : t.type === 4 && (this._popContainer(a, re$1, null), this.errors.push(x$1.create(a, u, `Opening tag "${a}" not terminated.`)));
  }
  _consumeComponentStartTag(t) {
    var r;
    let n = t.parts[0], i = [], s = [], a = [];
    this._consumeAttributesAndDirectives(i, s, a);
    let o = this._getClosestElementLikeParent(), l = this._getComponentTagName(t, o), c = this._getComponentFullName(t, o), u = this._peek.type === 37;
    this._advance();
    let d = this._peek.sourceSpan.fullStart, _ = new p(t.sourceSpan.start, d, t.sourceSpan.fullStart), h = new U$1(n, l, c, i, s, [], u, _, new p(t.sourceSpan.start, d, t.sourceSpan.fullStart), void 0, void 0, a), f = this._getContainer(), g = f !== null && h.tagName !== null && !!(!((r = this._getTagDefinition(f)) === null || r === void 0) && r.isClosedByChild(h.tagName));
    this._pushContainer(h, g), u ? this._popContainer(c, U$1, _) : t.type === 39 && (this._popContainer(c, U$1, null), this.errors.push(x$1.create(c, _, `Opening tag "${c}" not terminated.`)));
  }
  _consumeAttributesAndDirectives(t, r, n) {
    for (; this._peek.type === 15 || this._peek.type === 40 || this._peek.type === 12; ) if (this._peek.type === 40) r.push(this._consumeDirective(this._peek));
    else if (this._peek.type === 15) t.push(this._consumeAttr(this._advance()));
    else {
      let i = this._advance();
      n.push(new bi$1(i.parts[0], i.parts[1], i.sourceSpan));
    }
  }
  _consumeComponentEndTag(t) {
    let r = this._getComponentFullName(t, this._getClosestElementLikeParent());
    if (!this._popContainer(r, U$1, t.sourceSpan)) {
      let n = this._containerStack[this._containerStack.length - 1], i;
      n instanceof U$1 && n.componentName === t.parts[0] ? i = `, did you mean "${n.fullName}"?` : i = ". It may happen when the tag has already been closed by another tag.";
      let s = `Unexpected closing tag "${r}"${i}`;
      this.errors.push(x$1.create(r, t.sourceSpan, s));
    }
  }
  _getTagDefinition(t) {
    return typeof t == "string" ? this.tagDefinitionResolver(t) : t instanceof re$1 ? this.tagDefinitionResolver(t.name) : t instanceof U$1 && t.tagName !== null ? this.tagDefinitionResolver(t.tagName) : null;
  }
  _pushContainer(t, r) {
    r && this._containerStack.pop(), this._addToParent(t), this._containerStack.push(t);
  }
  _consumeElementEndTag(t) {
    var r;
    let n = this.allowHtmComponentClosingTags && t.parts.length === 0 ? null : this._getElementFullName(t, this._getClosestElementLikeParent());
    if (n && (!((r = this._getTagDefinition(n)) === null || r === void 0) && r.isVoid)) this.errors.push(x$1.create(n, t.sourceSpan, `Void elements do not have end tags "${t.parts[1]}"`));
    else if (!this._popContainer(n, re$1, t.sourceSpan)) {
      let i = `Unexpected closing tag "${n}". It may happen when the tag has already been closed by another tag. For more info see https://www.w3.org/TR/html5/syntax.html#closing-elements-that-have-implied-end-tags`;
      this.errors.push(x$1.create(n, t.sourceSpan, i));
    }
  }
  _popContainer(t, r, n) {
    let i = false;
    for (let a = this._containerStack.length - 1; a >= 0; a--) {
      var s;
      let o = this._containerStack[a], l = o instanceof U$1 ? o.fullName : o.name;
      if (Pe$1(l) ? l === t : (l === t || t === null) && o instanceof r) return o.endSourceSpan = n, o.sourceSpan.end = n !== null ? n.end : o.sourceSpan.end, this._containerStack.splice(a, this._containerStack.length - a), !i;
      (o instanceof ge$1 || !(!((s = this._getTagDefinition(o)) === null || s === void 0) && s.closedByParent)) && (i = true);
    }
    return false;
  }
  _consumeAttr(t) {
    let r = fe$1(t.parts[0], t.parts[1]), n = t.sourceSpan.end, i;
    this._peek.type === 16 && (i = this._advance());
    let s = "", a = [], o, l;
    if (this._peek.type === 17) for (o = this._peek.sourceSpan, l = this._peek.sourceSpan.end; this._peek.type === 17 || this._peek.type === 18 || this._peek.type === 9; ) {
      let u = this._advance();
      a.push(u), u.type === 18 ? s += u.parts.join("").replace(/&([^;]+);/g, Oi$1) : u.type === 9 ? s += u.parts[0] : s += u.parts.join(""), l = n = u.sourceSpan.end;
    }
    this._peek.type === 16 && (l = n = this._advance().sourceSpan.end);
    let c = o && l && new p(i?.sourceSpan.start ?? o.start, l, i?.sourceSpan.fullStart ?? o.fullStart);
    return new ki$1(r, s, new p(t.sourceSpan.start, n, t.sourceSpan.fullStart), t.sourceSpan, c, a.length > 0 ? a : void 0, void 0);
  }
  _consumeDirective(t) {
    let r = [], n = t.sourceSpan.end, i = null;
    if (this._advance(), this._peek.type === 41) {
      for (n = this._peek.sourceSpan.end, this._advance(); this._peek.type === 15; ) r.push(this._consumeAttr(this._advance()));
      this._peek.type === 42 ? (i = this._peek.sourceSpan, this._advance()) : this.errors.push(x$1.create(null, t.sourceSpan, "Unterminated directive definition"));
    }
    let s = new p(t.sourceSpan.start, n, t.sourceSpan.fullStart), a = new p(s.start, i === null ? t.sourceSpan.end : i.end, s.fullStart);
    return new yi$1(t.parts[0], r, a, s, i);
  }
  _consumeBlockOpen(t) {
    let r = [];
    for (; this._peek.type === 29; ) {
      let o = this._advance();
      r.push(new fr$1(o.parts[0], o.sourceSpan));
    }
    this._peek.type === 27 && this._advance();
    let n = this._peek.sourceSpan.fullStart, i = new p(t.sourceSpan.start, n, t.sourceSpan.fullStart), s = new p(t.sourceSpan.start, n, t.sourceSpan.fullStart), a = new ge$1(t.parts[0], r, [], i, t.sourceSpan, s);
    this._pushContainer(a, false);
  }
  _consumeBlockClose(t) {
    let r = this._containerStack.length, n = this._containerStack[r - 1];
    if (!this._popContainer(null, ge$1, t.sourceSpan)) {
      if (this._containerStack.length < r) {
        let i = n instanceof U$1 ? n.fullName : n.name;
        this.errors.push(x$1.create(null, t.sourceSpan, `Unexpected closing block. The block may have been closed earlier. Did you forget to close the <${i}> element? If you meant to write the \`}\` character, you should use the "&#125;" HTML entity instead.`));
        return;
      }
      this.errors.push(x$1.create(null, t.sourceSpan, 'Unexpected closing block. The block may have been closed earlier. If you meant to write the `}` character, you should use the "&#125;" HTML entity instead.'));
    }
  }
  _consumeIncompleteBlock(t) {
    let r = [];
    for (; this._peek.type === 29; ) {
      let o = this._advance();
      r.push(new fr$1(o.parts[0], o.sourceSpan));
    }
    let n = this._peek.sourceSpan.fullStart, i = new p(t.sourceSpan.start, n, t.sourceSpan.fullStart), s = new p(t.sourceSpan.start, n, t.sourceSpan.fullStart), a = new ge$1(t.parts[0], r, [], i, t.sourceSpan, s);
    this._pushContainer(a, false), this._popContainer(null, ge$1, null), this.errors.push(x$1.create(t.parts[0], i, `Incomplete block "${t.parts[0]}". If you meant to write the @ character, you should use the "&#64;" HTML entity instead.`));
  }
  _consumeLet(t) {
    let r = t.parts[0], n, i;
    if (this._peek.type !== 32) {
      this.errors.push(x$1.create(t.parts[0], t.sourceSpan, `Invalid @let declaration "${r}". Declaration must have a value.`));
      return;
    } else n = this._advance();
    if (this._peek.type !== 33) {
      this.errors.push(x$1.create(t.parts[0], t.sourceSpan, `Unterminated @let declaration "${r}". Declaration must be terminated with a semicolon.`));
      return;
    } else i = this._advance();
    let s = i.sourceSpan.end, a = new p(t.sourceSpan.start, s, t.sourceSpan.fullStart), o = t.sourceSpan.toString().lastIndexOf(r), l = new p(t.sourceSpan.start.moveBy(o), t.sourceSpan.end), c = new dr$1(r, n.parts[0], a, l, n.sourceSpan);
    this._addToParent(c);
  }
  _consumeIncompleteLet(t) {
    let r = t.parts[0] ?? "", n = r ? ` "${r}"` : "";
    if (r.length > 0) {
      let i = t.sourceSpan.toString().lastIndexOf(r), s = new p(t.sourceSpan.start.moveBy(i), t.sourceSpan.end), a = new p(t.sourceSpan.start, t.sourceSpan.start.moveBy(0)), o = new dr$1(r, "", t.sourceSpan, s, a);
      this._addToParent(o);
    }
    this.errors.push(x$1.create(t.parts[0], t.sourceSpan, `Incomplete @let declaration${n}. @let declarations must be written as \`@let <name> = <value>;\``));
  }
  _getContainer() {
    return this._containerStack.length > 0 ? this._containerStack[this._containerStack.length - 1] : null;
  }
  _getClosestElementLikeParent() {
    for (let t = this._containerStack.length - 1; t > -1; t--) {
      let r = this._containerStack[t];
      if (r instanceof re$1 || r instanceof U$1) return r;
    }
    return null;
  }
  _addToParent(t) {
    let r = this._getContainer();
    r === null ? this.rootNodes.push(t) : r.children.push(t);
  }
  _getElementFullName(t, r) {
    return fe$1(this._getPrefix(t, r), t.parts[1]);
  }
  _getComponentFullName(t, r) {
    let n = t.parts[0], i = this._getComponentTagName(t, r);
    return i === null ? n : i.startsWith(":") ? n + i : `${n}:${i}`;
  }
  _getComponentTagName(t, r) {
    let n = this._getPrefix(t, r), i = t.parts[2];
    return !n && !i ? null : !n && i ? i : fe$1(n, i || "ng-component");
  }
  _getPrefix(t, r) {
    var n;
    let i, s;
    if (t.type === 35 || t.type === 39 || t.type === 38 ? (i = t.parts[1], s = t.parts[2]) : (i = t.parts[0], s = t.parts[1]), i = i || ((n = this._getTagDefinition(s)) === null || n === void 0 ? void 0 : n.implicitNamespacePrefix) || "", !i && r) {
      let a = r instanceof re$1 ? r.name : r.tagName;
      if (a !== null) {
        let o = Z$1(a)[1], l = this._getTagDefinition(o);
        l !== null && !l.preventNamespaceInheritance && (i = Pe$1(a));
      }
    }
    return i;
  }
};
function Ri$1(e, t) {
  return e.length > 0 && e[e.length - 1] === t;
}
function Oi$1(e, t) {
  return _e$1[t] !== void 0 ? _e$1[t] || e : /^#x[a-f0-9]+$/i.test(t) ? String.fromCodePoint(parseInt(t.slice(2), 16)) : /^#\d+$/.test(t) ? String.fromCodePoint(parseInt(t.slice(1), 10)) : e;
}
var Hi = class extends Bi$1 {
  constructor() {
    super(Ne$1);
  }
  parse(e, t, r, n = false, i) {
    return super.parse(e, t, r, n, i);
  }
};
var kr$1;
function Mt$1(e, t = {}) {
  let { canSelfClose: r = false, allowHtmComponentClosingTags: n = false, allowStartTagComments: i = false, isTagNameCaseSensitive: s = false, getTagContentType: a, tokenizeAngularBlocks: o = false, tokenizeAngularLetDeclaration: l = false, enableAngularSelectorlessSyntax: c = false } = t;
  return kr$1 ?? (kr$1 = new Hi()), kr$1.parse(e, "angular-html-parser", { tokenizeExpansionForms: o, canSelfClose: r, allowHtmComponentClosingTags: n, allowStartTagComments: i, tokenizeBlocks: o, tokenizeLet: l, selectorlessEnabled: c }, s, a);
}
var oo$1 = [co$1, uo$1, ho$1, fo$1, go$1, vo$1, _o$1, So$1, Co$1, mo$1];
function lo$1(e, t) {
  for (let r of oo$1) r(e, t);
  return e;
}
function co$1(e) {
  e.walk((t) => {
    if (t.kind === "element" && t.tagDefinition.ignoreFirstLf && t.children.length > 0 && t.children[0].kind === "text" && t.children[0].value[0] === `
`) {
      let r = t.children[0];
      r.value.length === 1 ? t.removeChild(r) : r.value = r.value.slice(1);
    }
  });
}
function uo$1(e) {
  let t = (r) => r.kind === "element" && r.prev?.kind === "ieConditionalStartComment" && r.prev.sourceSpan.end.offset === r.startSourceSpan.start.offset && r.firstChild?.kind === "ieConditionalEndComment" && r.firstChild.sourceSpan.start.offset === r.startSourceSpan.end.offset;
  e.walk((r) => {
    if (r.children) for (let n = 0; n < r.children.length; n++) {
      let i = r.children[n];
      if (!t(i)) continue;
      let s = i.prev, a = i.firstChild;
      r.removeChild(s), n--;
      let o = new p(s.sourceSpan.start, a.sourceSpan.end), l = new p(o.start, i.sourceSpan.end);
      i.condition = s.condition, i.sourceSpan = l, i.startSourceSpan = o, i.removeChild(a);
    }
  });
}
function po$1(e, t, r) {
  e.walk((n) => {
    if (n.children) for (let i = 0; i < n.children.length; i++) {
      let s = n.children[i];
      if (s.kind !== "text" && !t(s)) continue;
      s.kind !== "text" && (s.kind = "text", s.value = r(s));
      let a = s.prev;
      !a || a.kind !== "text" || (a.value += s.value, a.sourceSpan = new p(a.sourceSpan.start, s.sourceSpan.end), n.removeChild(s), i--);
    }
  });
}
function ho$1(e) {
  return po$1(e, (t) => t.kind === "cdata", (t) => `<![CDATA[${t.value}]]>`);
}
function mo$1(e) {
  let t = (r) => r.kind === "element" && r.attrs.length === 0 && !X$1(r.startTagComments) && r.children.length === 1 && r.firstChild.kind === "text" && !P.hasWhitespaceCharacter(r.children[0].value) && !r.firstChild.hasLeadingSpaces && !r.firstChild.hasTrailingSpaces && r.isLeadingSpaceSensitive && !r.hasLeadingSpaces && r.isTrailingSpaceSensitive && !r.hasTrailingSpaces && r.prev?.kind === "text" && r.next?.kind === "text";
  e.walk((r) => {
    if (r.children) for (let n = 0; n < r.children.length; n++) {
      let i = r.children[n];
      if (!t(i)) continue;
      let s = i.prev, a = i.next;
      s.value += `<${i.rawName}>` + i.firstChild.value + `</${i.rawName}>` + a.value, s.sourceSpan = new p(s.sourceSpan.start, a.sourceSpan.end), s.isTrailingSpaceSensitive = a.isTrailingSpaceSensitive, s.hasTrailingSpaces = a.hasTrailingSpaces, r.removeChild(i), n--, r.removeChild(a);
    }
  });
}
function fo$1(e, t) {
  if (t.parser === "html") return;
  let r = /\{\{(.+?)\}\}/s;
  e.walk((n) => {
    if (rn$1(n, t)) for (let i of n.children) {
      if (i.kind !== "text") continue;
      let s = i.sourceSpan.start, a, o = i.value.split(r);
      for (let l = 0; l < o.length; l++, s = a) {
        let c = o[l];
        if (l % 2 === 0) {
          a = s.moveBy(c.length), c.length > 0 && n.insertChildBefore(i, { kind: "text", value: c, sourceSpan: new p(s, a) });
          continue;
        }
        a = s.moveBy(c.length + 4), n.insertChildBefore(i, { kind: "interpolation", sourceSpan: new p(s, a), children: c.length === 0 ? [] : [{ kind: "text", value: c, sourceSpan: new p(s.moveBy(2), a.moveBy(-2)) }] });
      }
      n.removeChild(i);
    }
  });
}
function go$1(e, t) {
  e.walk((r) => {
    let n = r.$children;
    if (!n) return;
    if (n.length === 0 || n.length === 1 && n[0].kind === "text" && P.trim(n[0].value).length === 0) {
      r.hasDanglingSpaces = n.length > 0, r.$children = [];
      return;
    }
    let i = nn$1(r, t), s = er$1(r);
    if (!i) for (let a = 0; a < n.length; a++) {
      let o = n[a];
      if (o.kind !== "text") continue;
      let { leadingWhitespace: l, text: c, trailingWhitespace: u } = tn$1(o.value), d = o.prev, _ = o.next;
      c ? (o.value = c, o.sourceSpan = new p(o.sourceSpan.start.moveBy(l.length), o.sourceSpan.end.moveBy(-u.length)), l && (d && (d.hasTrailingSpaces = true), o.hasLeadingSpaces = true), u && (o.hasTrailingSpaces = true, _ && (_.hasLeadingSpaces = true))) : (r.removeChild(o), a--, (l || u) && (d && (d.hasTrailingSpaces = true), _ && (_.hasLeadingSpaces = true)));
    }
    r.isWhitespaceSensitive = i, r.isIndentationSensitive = s;
  });
}
function _o$1(e) {
  e.walk((t) => {
    t.isSelfClosing = !t.children || t.kind === "element" && (t.tagDefinition.isVoid || t.endSourceSpan && t.startSourceSpan.start === t.endSourceSpan.start && t.startSourceSpan.end === t.endSourceSpan.end);
  });
}
function So$1(e, t) {
  e.walk((r) => {
    r.kind === "element" && (r.hasHtmComponentClosingTag = r.endSourceSpan && /^<\s*\/\s*\/\s*>$/.test(t.originalText.slice(r.endSourceSpan.start.offset, r.endSourceSpan.end.offset)));
  });
}
function vo$1(e, t) {
  e.walk((r) => {
    r.cssDisplay = fn$1(r, t);
  });
}
function Co$1(e, t) {
  e.walk((r) => {
    let { children: n } = r;
    if (n) {
      if (n.length === 0) {
        r.isDanglingSpaceSensitive = on$1(r, t);
        return;
      }
      for (let i of n) i.isLeadingSpaceSensitive = sn$1(i, t), i.isTrailingSpaceSensitive = an$1(i, t);
      for (let i = 0; i < n.length; i++) {
        let s = n[i];
        s.isLeadingSpaceSensitive = (i === 0 || s.prev.isTrailingSpaceSensitive) && s.isLeadingSpaceSensitive, s.isTrailingSpaceSensitive = (i === n.length - 1 || s.next.isLeadingSpaceSensitive) && s.isTrailingSpaceSensitive;
      }
    }
  });
}
var Fi$1 = lo$1;
function ko$1(e, t, r) {
  let { node: n } = e;
  switch (n.kind) {
    case "root":
      return t.__onHtmlRoot && t.__onHtmlRoot(n), [C(Ae$1(e, t, r)), k$1];
    case "element":
    case "ieConditionalComment":
      return li$1(e, t, r);
    case "angularControlFlowBlock":
      return ni$1(e, t, r);
    case "angularControlFlowBlockParameters":
      return si$1(e, t, r);
    case "angularControlFlowBlockParameter":
      return P.trim(n.expression);
    case "angularLetDeclaration":
      return C(["@let ", C([n.id, " =", C(A([S$1, r("init")]))]), ";"]);
    case "angularLetDeclarationInitializer":
      return n.value;
    case "angularIcuExpression":
      return ai$1(e, t, r);
    case "angularIcuCase":
      return oi$1(e, t, r);
    case "ieConditionalStartComment":
    case "ieConditionalEndComment":
      return [me$1(n), ue$1(n)];
    case "interpolation":
      return [me$1(n, t), ...e.map(r, "children"), ue$1(n, t)];
    case "text": {
      if (n.parent.kind === "interpolation") {
        let o = /\n[^\S\n]*$/, l = o.test(n.value), c = l ? n.value.replace(o, "") : n.value;
        return [L$1(c), l ? k$1 : ""];
      }
      let i = B(n, t), s = Tt$1(n), a = M$1(n, t);
      return s[0] = [i, s[0]], s.push([s.pop(), a]), gt$1(s);
    }
    case "docType":
      return [C([me$1(n, t), " ", T$1(0, n.value.replace(/^html\b/i, "html"), /\s+/g, " ")]), ue$1(n, t)];
    case "comment":
      return [B(n, t), L$1(t.originalText.slice(F(n), J(n))), M$1(n, t)];
    case "attribute": {
      if (n.value === null) return n.rawName;
      let i = nr$1(n.value), s = Et$1(n, t) ? "" : Wr$1(i);
      return [n.rawName, "=", s, L$1(s === '"' ? T$1(0, i, '"', "&quot;") : T$1(0, i, "'", "&apos;")), s];
    }
    case "startTagComment":
      return ci$1(e);
    default:
      throw new Gr$1(n, "HTML");
  }
}
var bo$1 = { features: { experimental_frontMatterSupport: { massageAstNode: true, embed: true, print: true } }, preprocess: Fi$1, print: ko$1, insertPragma: ei$1, massageAstNode: or$1, embed: Gn$1, getVisitorKeys: Yn$1 }, Vi$1 = bo$1;
var Ui$1 = [{ name: "Angular", type: "markup", aceMode: "html", extensions: [".component.html"], tmScope: "text.html.basic", aliases: ["xhtml"], codemirrorMode: "htmlmixed", codemirrorMimeType: "text/html", parsers: ["angular"], vscodeLanguageIds: ["html"], filenames: [], linguistLanguageId: 146 }, { name: "HTML", type: "markup", aceMode: "html", extensions: [".html", ".hta", ".htm", ".html.hl", ".inc", ".xht", ".xhtml"], tmScope: "text.html.basic", aliases: ["xhtml"], codemirrorMode: "htmlmixed", codemirrorMimeType: "text/html", parsers: ["html"], vscodeLanguageIds: ["html"], linguistLanguageId: 146 }, { name: "Lightning Web Components", type: "markup", aceMode: "html", extensions: [], tmScope: "text.html.basic", aliases: ["LWC", "lwc"], codemirrorMode: "htmlmixed", codemirrorMimeType: "text/html", parsers: ["lwc"], vscodeLanguageIds: ["html"], filenames: [], linguistLanguageId: 146 }, { name: "MJML", type: "markup", aceMode: "html", extensions: [".mjml"], tmScope: "text.mjml.basic", aliases: ["MJML", "mjml"], codemirrorMode: "htmlmixed", codemirrorMimeType: "text/html", parsers: ["mjml"], filenames: [], vscodeLanguageIds: ["mjml"], linguistLanguageId: 146 }, { name: "Vue", type: "markup", aceMode: "vue", extensions: [".vue"], tmScope: "text.html.vue", codemirrorMode: "vue", codemirrorMimeType: "text/x-vue", parsers: ["vue"], vscodeLanguageIds: ["vue"], linguistLanguageId: 391 }];
var br$1 = { bracketSameLine: { category: "Common", type: "boolean", default: false, description: "Put > of opening tags on the last line instead of on a new line." }, singleAttributePerLine: { category: "Common", type: "boolean", default: false, description: "Enforce single attribute per line in HTML, Vue and JSX." } };
var Wi$1 = "HTML", wo$1 = { bracketSameLine: br$1.bracketSameLine, htmlWhitespaceSensitivity: { category: Wi$1, type: "choice", default: "css", description: "How to handle whitespaces in HTML.", choices: [{ value: "css", description: "Respect the default value of CSS display property." }, { value: "strict", description: "Whitespaces are considered sensitive." }, { value: "ignore", description: "Whitespaces are considered insensitive." }] }, singleAttributePerLine: br$1.singleAttributePerLine, vueIndentScriptAndStyle: { category: Wi$1, type: "boolean", default: false, description: "Indent script and style tags in Vue files." } }, zi = wo$1;
var Pr = {};
Ir$1(Pr, { angular: () => Wo$1, html: () => Fo$1, lwc: () => Go$1, mjml: () => Uo$1, vue: () => zo$1 });
function To$1(e, t) {
  let r = new SyntaxError(e + " (" + t.loc.start.line + ":" + t.loc.start.column + ")");
  return Object.assign(r, t);
}
var Gi = To$1;
var yo$1 = { canSelfClose: true, normalizeTagName: false, normalizeAttributeName: false, allowHtmComponentClosingTags: false, allowStartTagComments: false, isTagNameCaseSensitive: false, shouldParseFrontMatter: true };
function Bt$1(e) {
  return { ...yo$1, ...e };
}
function wr$1(e) {
  let { canSelfClose: t, allowHtmComponentClosingTags: r, allowStartTagComments: n, isTagNameCaseSensitive: i, shouldParseAsRawText: s, tokenizeAngularBlocks: a, tokenizeAngularLetDeclaration: o } = e;
  return { canSelfClose: t, allowHtmComponentClosingTags: r, allowStartTagComments: n, isTagNameCaseSensitive: i, getTagContentType: s ? (...l) => s(...l) ? lr.RAW_TEXT : void 0 : void 0, tokenizeAngularBlocks: a, tokenizeAngularLetDeclaration: o };
}
var qt$1 = /* @__PURE__ */ new Map([["*", /* @__PURE__ */ new Set(["accesskey", "autocapitalize", "autocorrect", "autofocus", "class", "contenteditable", "dir", "draggable", "enterkeyhint", "exportparts", "hidden", "id", "inert", "inputmode", "is", "itemid", "itemprop", "itemref", "itemscope", "itemtype", "lang", "nonce", "part", "popover", "slot", "spellcheck", "style", "tabindex", "title", "translate", "writingsuggestions"])], ["a", /* @__PURE__ */ new Set(["charset", "coords", "download", "href", "hreflang", "name", "ping", "referrerpolicy", "rel", "rev", "shape", "target", "type"])], ["applet", /* @__PURE__ */ new Set(["align", "alt", "archive", "code", "codebase", "height", "hspace", "name", "object", "vspace", "width"])], ["area", /* @__PURE__ */ new Set(["alt", "coords", "download", "href", "hreflang", "nohref", "ping", "referrerpolicy", "rel", "shape", "target", "type"])], ["audio", /* @__PURE__ */ new Set(["autoplay", "controls", "crossorigin", "loop", "muted", "preload", "src"])], ["base", /* @__PURE__ */ new Set(["href", "target"])], ["basefont", /* @__PURE__ */ new Set(["color", "face", "size"])], ["blockquote", /* @__PURE__ */ new Set(["cite"])], ["body", /* @__PURE__ */ new Set(["alink", "background", "bgcolor", "link", "text", "vlink"])], ["br", /* @__PURE__ */ new Set(["clear"])], ["button", /* @__PURE__ */ new Set(["command", "commandfor", "disabled", "form", "formaction", "formenctype", "formmethod", "formnovalidate", "formtarget", "name", "popovertarget", "popovertargetaction", "type", "value"])], ["canvas", /* @__PURE__ */ new Set(["height", "width"])], ["caption", /* @__PURE__ */ new Set(["align"])], ["col", /* @__PURE__ */ new Set(["align", "char", "charoff", "span", "valign", "width"])], ["colgroup", /* @__PURE__ */ new Set(["align", "char", "charoff", "span", "valign", "width"])], ["data", /* @__PURE__ */ new Set(["value"])], ["del", /* @__PURE__ */ new Set(["cite", "datetime"])], ["details", /* @__PURE__ */ new Set(["name", "open"])], ["dialog", /* @__PURE__ */ new Set(["closedby", "open"])], ["dir", /* @__PURE__ */ new Set(["compact"])], ["div", /* @__PURE__ */ new Set(["align"])], ["dl", /* @__PURE__ */ new Set(["compact"])], ["embed", /* @__PURE__ */ new Set(["height", "src", "type", "width"])], ["fieldset", /* @__PURE__ */ new Set(["disabled", "form", "name"])], ["font", /* @__PURE__ */ new Set(["color", "face", "size"])], ["form", /* @__PURE__ */ new Set(["accept", "accept-charset", "action", "autocomplete", "enctype", "method", "name", "novalidate", "target"])], ["frame", /* @__PURE__ */ new Set(["frameborder", "longdesc", "marginheight", "marginwidth", "name", "noresize", "scrolling", "src"])], ["frameset", /* @__PURE__ */ new Set(["cols", "rows"])], ["h1", /* @__PURE__ */ new Set(["align"])], ["h2", /* @__PURE__ */ new Set(["align"])], ["h3", /* @__PURE__ */ new Set(["align"])], ["h4", /* @__PURE__ */ new Set(["align"])], ["h5", /* @__PURE__ */ new Set(["align"])], ["h6", /* @__PURE__ */ new Set(["align"])], ["head", /* @__PURE__ */ new Set(["profile"])], ["hr", /* @__PURE__ */ new Set(["align", "noshade", "size", "width"])], ["html", /* @__PURE__ */ new Set(["manifest", "version"])], ["iframe", /* @__PURE__ */ new Set(["align", "allow", "allowfullscreen", "allowpaymentrequest", "allowusermedia", "frameborder", "height", "loading", "longdesc", "marginheight", "marginwidth", "name", "referrerpolicy", "sandbox", "scrolling", "src", "srcdoc", "width"])], ["img", /* @__PURE__ */ new Set(["align", "alt", "border", "crossorigin", "decoding", "fetchpriority", "height", "hspace", "ismap", "loading", "longdesc", "name", "referrerpolicy", "sizes", "src", "srcset", "usemap", "vspace", "width"])], ["input", /* @__PURE__ */ new Set(["accept", "align", "alpha", "alt", "autocomplete", "checked", "colorspace", "dirname", "disabled", "form", "formaction", "formenctype", "formmethod", "formnovalidate", "formtarget", "height", "ismap", "list", "max", "maxlength", "min", "minlength", "multiple", "name", "pattern", "placeholder", "popovertarget", "popovertargetaction", "readonly", "required", "size", "src", "step", "type", "usemap", "value", "width"])], ["ins", /* @__PURE__ */ new Set(["cite", "datetime"])], ["isindex", /* @__PURE__ */ new Set(["prompt"])], ["label", /* @__PURE__ */ new Set(["for", "form"])], ["legend", /* @__PURE__ */ new Set(["align"])], ["li", /* @__PURE__ */ new Set(["type", "value"])], ["link", /* @__PURE__ */ new Set(["as", "blocking", "charset", "color", "crossorigin", "disabled", "fetchpriority", "href", "hreflang", "imagesizes", "imagesrcset", "integrity", "media", "referrerpolicy", "rel", "rev", "sizes", "target", "type"])], ["map", /* @__PURE__ */ new Set(["name"])], ["menu", /* @__PURE__ */ new Set(["compact"])], ["meta", /* @__PURE__ */ new Set(["charset", "content", "http-equiv", "media", "name", "scheme"])], ["meter", /* @__PURE__ */ new Set(["high", "low", "max", "min", "optimum", "value"])], ["object", /* @__PURE__ */ new Set(["align", "archive", "border", "classid", "codebase", "codetype", "data", "declare", "form", "height", "hspace", "name", "standby", "type", "typemustmatch", "usemap", "vspace", "width"])], ["ol", /* @__PURE__ */ new Set(["compact", "reversed", "start", "type"])], ["optgroup", /* @__PURE__ */ new Set(["disabled", "label"])], ["option", /* @__PURE__ */ new Set(["disabled", "label", "selected", "value"])], ["output", /* @__PURE__ */ new Set(["for", "form", "name"])], ["p", /* @__PURE__ */ new Set(["align"])], ["param", /* @__PURE__ */ new Set(["name", "type", "value", "valuetype"])], ["pre", /* @__PURE__ */ new Set(["width"])], ["progress", /* @__PURE__ */ new Set(["max", "value"])], ["q", /* @__PURE__ */ new Set(["cite"])], ["script", /* @__PURE__ */ new Set(["async", "blocking", "charset", "crossorigin", "defer", "fetchpriority", "integrity", "language", "nomodule", "referrerpolicy", "src", "type"])], ["select", /* @__PURE__ */ new Set(["autocomplete", "disabled", "form", "multiple", "name", "required", "size"])], ["slot", /* @__PURE__ */ new Set(["name"])], ["source", /* @__PURE__ */ new Set(["height", "media", "sizes", "src", "srcset", "type", "width"])], ["style", /* @__PURE__ */ new Set(["blocking", "media", "type"])], ["table", /* @__PURE__ */ new Set(["align", "bgcolor", "border", "cellpadding", "cellspacing", "frame", "rules", "summary", "width"])], ["tbody", /* @__PURE__ */ new Set(["align", "char", "charoff", "valign"])], ["td", /* @__PURE__ */ new Set(["abbr", "align", "axis", "bgcolor", "char", "charoff", "colspan", "headers", "height", "nowrap", "rowspan", "scope", "valign", "width"])], ["template", /* @__PURE__ */ new Set(["shadowrootclonable", "shadowrootcustomelementregistry", "shadowrootdelegatesfocus", "shadowrootmode", "shadowrootserializable"])], ["textarea", /* @__PURE__ */ new Set(["autocomplete", "cols", "dirname", "disabled", "form", "maxlength", "minlength", "name", "placeholder", "readonly", "required", "rows", "wrap"])], ["tfoot", /* @__PURE__ */ new Set(["align", "char", "charoff", "valign"])], ["th", /* @__PURE__ */ new Set(["abbr", "align", "axis", "bgcolor", "char", "charoff", "colspan", "headers", "height", "nowrap", "rowspan", "scope", "valign", "width"])], ["thead", /* @__PURE__ */ new Set(["align", "char", "charoff", "valign"])], ["time", /* @__PURE__ */ new Set(["datetime"])], ["tr", /* @__PURE__ */ new Set(["align", "bgcolor", "char", "charoff", "valign"])], ["track", /* @__PURE__ */ new Set(["default", "kind", "label", "src", "srclang"])], ["ul", /* @__PURE__ */ new Set(["compact", "type"])], ["video", /* @__PURE__ */ new Set(["autoplay", "controls", "crossorigin", "height", "loop", "muted", "playsinline", "poster", "preload", "src", "width"])]]);
var $i$1 = /* @__PURE__ */ new Set(["a", "abbr", "acronym", "address", "applet", "area", "article", "aside", "audio", "b", "base", "basefont", "bdi", "bdo", "bgsound", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "command", "content", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "em", "embed", "fencedframe", "fieldset", "figcaption", "figure", "font", "footer", "form", "frame", "frameset", "geolocation", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "iframe", "image", "img", "input", "ins", "isindex", "kbd", "keygen", "label", "legend", "li", "link", "listing", "main", "map", "mark", "marquee", "math", "menu", "menuitem", "meta", "meter", "multicol", "nav", "nextid", "nobr", "noembed", "noframes", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "picture", "plaintext", "pre", "progress", "q", "rb", "rbc", "rp", "rt", "rtc", "ruby", "s", "samp", "script", "search", "section", "select", "selectedcontent", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "svg", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "tt", "u", "ul", "var", "video", "wbr", "xmp"]);
var Ht$1 = { attrs: true, children: true, cases: true, expression: true }, ji$1 = /* @__PURE__ */ new Set(["parent"]), ne$1, Tr$1, yr$1, Me$1 = class Me2 {
  constructor(t = {}) {
    Rr$1(this, ne$1);
    Wt$1(this, "kind");
    Wt$1(this, "parent");
    for (let r of /* @__PURE__ */ new Set([...ji$1, ...Object.keys(t)])) this.setProperty(r, t[r]);
    if (ae$1(t)) for (let r of Object.getOwnPropertySymbols(t)) this.setProperty(r, t[r]);
  }
  setProperty(t, r) {
    if (this[t] !== r) {
      if (t in Ht$1 && (r = r.map((n) => this.createChild(n))), !ji$1.has(t)) {
        this[t] = r;
        return;
      }
      Object.defineProperty(this, t, { value: r, enumerable: false, configurable: true });
    }
  }
  map(t) {
    let r;
    for (let n in Ht$1) {
      let i = this[n];
      if (i) {
        let s = Eo$1(i, (a) => a.map(t));
        r !== i && (r ?? (r = new Me2({ parent: this.parent })), r.setProperty(n, s));
      }
    }
    if (r) for (let n in this) n in Ht$1 || (r[n] = this[n]);
    return t(r || this);
  }
  walk(t) {
    for (let r in Ht$1) {
      let n = this[r];
      if (n) for (let i = 0; i < n.length; i++) n[i].walk(t);
    }
    t(this);
  }
  createChild(t) {
    let r = t instanceof Me2 ? t.clone() : new Me2(t);
    return r.setProperty("parent", this), r;
  }
  insertChildBefore(t, r) {
    let n = this.$children;
    n.splice(n.indexOf(t), 0, this.createChild(r));
  }
  removeChild(t) {
    let r = this.$children;
    r.splice(r.indexOf(t), 1);
  }
  replaceChild(t, r) {
    let n = this.$children;
    n[n.indexOf(t)] = this.createChild(r);
  }
  clone() {
    return new Me2(this);
  }
  get $children() {
    return this[qe$1(this, ne$1, Tr$1)];
  }
  set $children(t) {
    this[qe$1(this, ne$1, Tr$1)] = t;
  }
  get firstChild() {
    return this.$children?.[0];
  }
  get lastChild() {
    return I$1(1, this.$children, -1);
  }
  get prev() {
    let t = qe$1(this, ne$1, yr$1);
    return t[t.indexOf(this) - 1];
  }
  get next() {
    let t = qe$1(this, ne$1, yr$1);
    return t[t.indexOf(this) + 1];
  }
  get rawName() {
    return this.hasExplicitNamespace ? this.fullName : this.name;
  }
  get fullName() {
    return this.namespace ? this.namespace + ":" + this.name : this.name;
  }
  get attrMap() {
    return Object.fromEntries(this.attrs.map((t) => [t.fullName, t.value]));
  }
};
ne$1 = /* @__PURE__ */ new WeakSet(), Tr$1 = function() {
  return this.kind === "angularIcuCase" ? "expression" : this.kind === "angularIcuExpression" ? "cases" : "children";
}, yr$1 = function() {
  return this.parent?.$children ?? [];
};
var Ft$1 = Me$1;
function Eo$1(e, t) {
  let r = e.map(t);
  return r.some((n, i) => n !== e[i]) ? r : e;
}
var xo$1 = [{ regex: /^(?<openingTagSuffix>\[if(?<condition>[^\]]*)\]>)(?<data>.*?)<!\s*\[endif\]$/s, parse: Lo$1 }, { regex: /^\[if(?<condition>[^\]]*)\]><!$/, parse: Ao$1 }, { regex: /^<!\s*\[endif\]$/, parse: Po$1 }];
function Yi$1(e, t) {
  if (e.value) for (let { regex: r, parse: n } of xo$1) {
    let i = e.value.match(r);
    if (i) return n(e, i, t);
  }
  return null;
}
function Lo$1(e, t, r) {
  let { openingTagSuffix: n, condition: i, data: s } = t.groups, a = 4 + n.length, o = e.sourceSpan.start.moveBy(a), l = o.moveBy(s.length), [c, u] = (() => {
    try {
      return [true, r(s, o).children];
    } catch {
      return [false, [{ kind: "text", value: s, sourceSpan: new p(o, l) }]];
    }
  })();
  return { kind: "ieConditionalComment", complete: c, children: u, condition: T$1(0, i.trim(), /\s+/g, " "), sourceSpan: e.sourceSpan, startSourceSpan: new p(e.sourceSpan.start, o), endSourceSpan: new p(l, e.sourceSpan.end) };
}
function Ao$1(e, t) {
  let { condition: r } = t.groups;
  return { kind: "ieConditionalStartComment", condition: T$1(0, r.trim(), /\s+/g, " "), sourceSpan: e.sourceSpan };
}
function Po$1(e) {
  return { kind: "ieConditionalEndComment", sourceSpan: e.sourceSpan };
}
var Er$1 = class Er extends gr$1 {
  visitExpansionCase(t, r) {
    r.parseOptions.name === "angular" && this.visitChildren(r, (n) => {
      n(t.expression);
    });
  }
  visit(t, { parseOptions: r }) {
    Ro$1(t), Oo$1(t, r), Bo$1(t, r), Mo$1(t);
  }
};
function Xi(e, t, r, n) {
  let i = r.name === "angular";
  It$1(new Er$1(), e.children, { parseOptions: r }), t && e.children.unshift(t);
  let s = new Ft$1(e);
  return s.walk((a) => {
    if (a.kind === "comment") {
      let o = Yi$1(a, n);
      o && a.parent.replaceChild(a, o);
    } else i && a.kind === "element" && a.comments && (a.startTagComments = a.comments, delete a.comments);
    i && (No$1(a), Do$1(a), Io$1(a));
  }), s;
}
function No$1(e) {
  if (e.kind === "block") {
    if (e.name = T$1(0, e.name.toLowerCase(), /\s+/g, " ").trim(), e.kind = "angularControlFlowBlock", !X$1(e.parameters)) {
      delete e.parameters;
      return;
    }
    for (let t of e.parameters) t.kind = "angularControlFlowBlockParameter";
    e.parameters = { kind: "angularControlFlowBlockParameters", children: e.parameters, sourceSpan: new p(e.parameters[0].sourceSpan.start, I$1(0, e.parameters, -1).sourceSpan.end) };
  }
}
function Do$1(e) {
  e.kind === "letDeclaration" && (e.kind = "angularLetDeclaration", e.id = e.name, e.init = { kind: "angularLetDeclarationInitializer", sourceSpan: new p(e.valueSpan.start, e.valueSpan.end), value: e.value }, delete e.name, delete e.value);
}
function Io$1(e) {
  e.kind === "expansion" && (e.kind = "angularIcuExpression"), e.kind === "expansionCase" && (e.kind = "angularIcuCase");
}
function Ki(e, t) {
  let r = e.toLowerCase();
  return t(r) ? r : e;
}
function Qi(e) {
  let t = e.name.startsWith(":") ? e.name.slice(1).split(":", 1)[0] : null, r = e.nameSpan.toString(), n = t !== null && r.startsWith(`${t}:`), i = n ? r.slice(t.length + 1) : r;
  e.name = i, e.namespace = t, e.hasExplicitNamespace = n;
}
function Ro$1(e) {
  switch (e.kind) {
    case "element":
      Qi(e);
      for (let t of e.attrs) Qi(t), t.valueSpan ? (t.value = t.valueSpan.toString(), /["']/.test(t.value[0]) && (t.value = t.value.slice(1, -1))) : t.value = null;
      break;
    case "comment":
      e.value = e.sourceSpan.toString().slice(4, -3);
      break;
    case "text":
      e.value = e.sourceSpan.toString();
      break;
  }
}
function Oo$1(e, t) {
  if (e.kind === "element") {
    let r = Ne$1(t.isTagNameCaseSensitive ? e.name : e.name.toLowerCase());
    !e.namespace || e.namespace === r.implicitNamespacePrefix || oe$1(e) ? e.tagDefinition = r : e.tagDefinition = Ne$1("");
  }
}
function Mo$1(e) {
  e.sourceSpan && e.endSourceSpan && (e.sourceSpan = new p(e.sourceSpan.start, e.endSourceSpan.end));
}
function Bo$1(e, t) {
  if (e.kind === "element" && (t.normalizeTagName && (!e.namespace || e.namespace === e.tagDefinition.implicitNamespacePrefix || oe$1(e)) && (e.name = Ki(e.name, (r) => $i$1.has(r))), t.normalizeAttributeName)) for (let r of e.attrs) r.namespace || (r.name = Ki(r.name, (n) => qt$1.has(e.name) && (qt$1.get("*").has(n) || qt$1.get(e.name).has(n))));
}
function Lr$1(e, t) {
  let { rootNodes: r, errors: n } = Mt$1(e, wr$1(t));
  return n.length > 0 && xr$1(n[0]), { parseOptions: t, rootNodes: r };
}
function Ji(e, t) {
  let r = wr$1(t), { rootNodes: n, errors: i } = Mt$1(e, r);
  if (n.some((c) => c.kind === "docType" && c.value === "html" || c.kind === "element" && c.name.toLowerCase() === "html")) return Lr$1(e, Vt$1);
  let a, o = () => a ?? (a = Mt$1(e, { ...r, getTagContentType: void 0 })), l = (c) => {
    let { offset: u } = c.startSourceSpan.start;
    return o().rootNodes.find((d) => d.kind === "element" && d.startSourceSpan.start.offset === u) ?? c;
  };
  for (let [c, u] of n.entries()) if (u.kind === "element") {
    if (u.isVoid) i = o().errors, n[c] = l(u);
    else if (qo$1(u)) {
      let { endSourceSpan: d, startSourceSpan: _ } = u, h = o().errors.find((f) => f.span.start.offset > _.start.offset && f.span.start.offset < d.end.offset);
      h && xr$1(h), n[c] = l(u);
    }
  }
  return i.length > 0 && xr$1(i[0]), { parseOptions: t, rootNodes: n };
}
function qo$1(e) {
  if (e.kind !== "element" || e.name !== "template") return false;
  let t = e.attrs.find((r) => r.name === "lang")?.value;
  return !t || t === "html";
}
function xr$1(e) {
  let { msg: t, span: { start: r, end: n } } = e;
  throw Gi(t, { loc: { start: { line: r.line + 1, column: r.col + 1 }, end: { line: n.line + 1, column: n.col + 1 } }, cause: e });
}
function Ho$1(e, t, r, n, i, s) {
  let { offset: a } = n, o = vt$1(t.slice(0, a)) + r, l = Ar$1(o, e, { ...i, shouldParseFrontMatter: false }, s);
  l.sourceSpan = new p(n, I$1(0, l.children, -1).sourceSpan.end);
  let c = l.children[0];
  return c.length === a ? l.children.shift() : (c.sourceSpan = new p(c.sourceSpan.start.moveBy(a), c.sourceSpan.end), c.value = c.value.slice(a)), l;
}
function Ar$1(e, t, r, n = {}) {
  let { frontMatter: i, content: s } = r.shouldParseFrontMatter ? Qt$1(e) : { content: e }, a = new rt$1(e, n.filepath), o = new De$1(a, 0, 0, 0), l = o.moveBy(e.length), { parseOptions: c, rootNodes: u } = t(s, r), d = { kind: "root", sourceSpan: new p(o, l), children: u }, _;
  if (i) {
    let [f, g] = [i.start, i.end].map((v) => new De$1(a, v.index, v.line - 1, v.column));
    _ = { ...i, kind: "frontMatter", sourceSpan: new p(f, g) };
  }
  return Xi(d, _, c, (f, g) => Ho$1(t, e, f, g, c, n));
}
var Vt$1 = Bt$1({ name: "html", normalizeTagName: true, normalizeAttributeName: true, allowHtmComponentClosingTags: true });
function st$1(e) {
  let t = Bt$1(e), r = t.name === "vue" ? Ji : Lr$1;
  return { parse: (n, i) => Ar$1(n, r, t, i), hasPragma: Jn$1, hasIgnorePragma: Zn$1, astFormat: "html", locStart: F, locEnd: J };
}
var Fo$1 = st$1(Vt$1), Vo$1 = /* @__PURE__ */ new Set(["mj-style", "mj-raw"]), Uo$1 = st$1({ ...Vt$1, name: "mjml", shouldParseAsRawText: (e) => Vo$1.has(e) }), Wo$1 = st$1({ name: "angular", tokenizeAngularBlocks: true, tokenizeAngularLetDeclaration: true, allowStartTagComments: true }), zo$1 = st$1({ name: "vue", isTagNameCaseSensitive: true, shouldParseAsRawText(e, t, r, n) {
  return e.toLowerCase() !== "html" && !r && (e !== "template" || n.some(({ name: i, value: s }) => i === "lang" && s !== "html" && s !== "" && s !== void 0));
} }), Go$1 = st$1({ name: "lwc", canSelfClose: false });
var $o$1 = { html: Vi$1 };

var Ru = Object.defineProperty;
var yt = (t, e) => {
  for (var r in e) Ru(t, r, { get: e[r], enumerable: true });
};
var Su = {};
yt(Su, { __debug: () => $i, check: () => Vi, doc: () => ar, format: () => Pu, formatWithCursor: () => Ou, getSupportInfo: () => Wi, util: () => fr, version: () => gu });
var X = (t, e) => (r, n, ...u) => r | 1 && n == null ? void 0 : (e.call(n) ?? n[t]).apply(n, u);
var vu = String.prototype.replaceAll ?? function(t, e) {
  return t.global ? this.replace(t, e) : this.split(t).join(e);
}, Lu = X("replaceAll", function() {
  if (typeof this == "string") return vu;
}), ne = Lu;
var Ne = class {
  diff(e, r, n = {}) {
    let u;
    typeof n == "function" ? (u = n, n = {}) : "callback" in n && (u = n.callback);
    let o = this.castInput(e, n), i = this.castInput(r, n), D = this.removeEmpty(this.tokenize(o, n)), s = this.removeEmpty(this.tokenize(i, n));
    return this.diffWithOptionsObj(D, s, n, u);
  }
  diffWithOptionsObj(e, r, n, u) {
    var o;
    let i = (C) => {
      if (C = this.postProcess(C, n), u) {
        setTimeout(function() {
          u(C);
        }, 0);
        return;
      } else return C;
    }, D = r.length, s = e.length, a = 1, c = D + s;
    n.maxEditLength != null && (c = Math.min(c, n.maxEditLength));
    let p = (o = n.timeout) !== null && o !== void 0 ? o : 1 / 0, l = Date.now() + p, m = [{ oldPos: -1, lastComponent: void 0 }], f = this.extractCommon(m[0], r, e, 0, n);
    if (m[0].oldPos + 1 >= s && f + 1 >= D) return i(this.buildValues(m[0].lastComponent, r, e));
    let F = -1 / 0, d = 1 / 0, E = () => {
      for (let C = Math.max(F, -a); C <= Math.min(d, a); C += 2) {
        let h, _ = m[C - 1], P = m[C + 1];
        _ && (m[C - 1] = void 0);
        let A = false;
        if (P) {
          let J = P.oldPos - C;
          A = P && 0 <= J && J < D;
        }
        let B = _ && _.oldPos + 1 < s;
        if (!A && !B) {
          m[C] = void 0;
          continue;
        }
        if (!B || A && _.oldPos < P.oldPos ? h = this.addToPath(P, true, false, 0, n) : h = this.addToPath(_, false, true, 1, n), f = this.extractCommon(h, r, e, C, n), h.oldPos + 1 >= s && f + 1 >= D) return i(this.buildValues(h.lastComponent, r, e)) || true;
        m[C] = h, h.oldPos + 1 >= s && (d = Math.min(d, C - 1)), f + 1 >= D && (F = Math.max(F, C + 1));
      }
      a++;
    };
    if (u) (function C() {
      setTimeout(function() {
        if (a > c || Date.now() > l) return u(void 0);
        E() || C();
      }, 0);
    })();
    else for (; a <= c && Date.now() <= l; ) {
      let C = E();
      if (C) return C;
    }
  }
  addToPath(e, r, n, u, o) {
    let i = e.lastComponent;
    return i && !o.oneChangePerToken && i.added === r && i.removed === n ? { oldPos: e.oldPos + u, lastComponent: { count: i.count + 1, added: r, removed: n, previousComponent: i.previousComponent } } : { oldPos: e.oldPos + u, lastComponent: { count: 1, added: r, removed: n, previousComponent: i } };
  }
  extractCommon(e, r, n, u, o) {
    let i = r.length, D = n.length, s = e.oldPos, a = s - u, c = 0;
    for (; a + 1 < i && s + 1 < D && this.equals(n[s + 1], r[a + 1], o); ) a++, s++, c++, o.oneChangePerToken && (e.lastComponent = { count: 1, previousComponent: e.lastComponent, added: false, removed: false });
    return c && !o.oneChangePerToken && (e.lastComponent = { count: c, previousComponent: e.lastComponent, added: false, removed: false }), e.oldPos = s, a;
  }
  equals(e, r, n) {
    return n.comparator ? n.comparator(e, r) : e === r || !!n.ignoreCase && e.toLowerCase() === r.toLowerCase();
  }
  removeEmpty(e) {
    let r = [];
    for (let n = 0; n < e.length; n++) e[n] && r.push(e[n]);
    return r;
  }
  castInput(e, r) {
    return e;
  }
  tokenize(e, r) {
    return Array.from(e);
  }
  join(e) {
    return e.join("");
  }
  postProcess(e, r) {
    return e;
  }
  get useLongestToken() {
    return false;
  }
  buildValues(e, r, n) {
    let u = [], o;
    for (; e; ) u.push(e), o = e.previousComponent, delete e.previousComponent, e = o;
    u.reverse();
    let i = u.length, D = 0, s = 0, a = 0;
    for (; D < i; D++) {
      let c = u[D];
      if (c.removed) c.value = this.join(n.slice(a, a + c.count)), a += c.count;
      else {
        if (!c.added && this.useLongestToken) {
          let p = r.slice(s, s + c.count);
          p = p.map(function(l, m) {
            let f = n[a + m];
            return f.length > l.length ? f : l;
          }), c.value = this.join(p);
        } else c.value = this.join(r.slice(s, s + c.count));
        s += c.count, c.added || (a += c.count);
      }
    }
    return u;
  }
};
var At = class extends Ne {
  tokenize(e) {
    return e.slice();
  }
  join(e) {
    return e;
  }
  removeEmpty(e) {
    return e;
  }
}, pr = new At();
function xt(t, e, r) {
  return pr.diff(t, e, r);
}
var Mu = () => {
}, k = Mu;
var dr = "cr", Fr = "crlf", Yu = "lf", ju = Yu, Bt = "\r", Er = `\r
`, ze = `
`, Uu = ze;
function Cr(t) {
  let e = t.indexOf(Bt);
  return e !== -1 ? t.charAt(e + 1) === ze ? Fr : dr : ju;
}
function we(t) {
  return t === dr ? Bt : t === Fr ? Er : Uu;
}
var Vu = /* @__PURE__ */ new Map([[ze, /\n/g], [Bt, /\r/g], [Er, /\r\n/g]]);
function Tt(t, e) {
  let r = Vu.get(e);
  return t.match(r)?.length ?? 0;
}
var Wu = /\r\n?/g;
function hr(t) {
  return ne(0, t, Wu, ze);
}
var ue = /* @__PURE__ */ Symbol.for("comments");
function $u(t) {
  return this[t < 0 ? this.length + t : t];
}
var zu = X("at", function() {
  if (Array.isArray(this) || typeof this == "string") return $u;
}), y = zu;
var G = "string", U = "array", V = "cursor", I = "indent", R = "align", v = "trim", x = "group", S = "fill", T = "if-break", L = "indent-if-break", M = "line-suffix", Y = "line-suffix-boundary", g = "line", b = "label", N = "break-parent", Ge = /* @__PURE__ */ new Set([V, I, R, v, x, S, T, L, M, Y, g, b, N]);
function gr(t) {
  let e = t.length;
  for (; e > 0 && (t[e - 1] === "\r" || t[e - 1] === `
`); ) e--;
  return e < t.length ? t.slice(0, e) : t;
}
function Fe(t, e, r) {
  if (!t.has(e)) {
    let n = r(e);
    t.set(e, n);
  }
  return t.get(e);
}
function Gu(t) {
  if (typeof t == "string") return G;
  if (Array.isArray(t)) return U;
  if (!t) return;
  let { type: e } = t;
  if (Ge.has(e)) return e;
}
var q = Gu;
var Ku = (t) => new Intl.ListFormat("en-US", { type: "disjunction" }).format(t);
function Hu(t) {
  let e = t === null ? "null" : typeof t;
  if (e !== "string" && e !== "object") return `Unexpected doc '${e}', 
Expected it to be 'string' or 'object'.`;
  if (q(t)) throw new Error("doc is valid.");
  let r = Object.prototype.toString.call(t);
  if (r !== "[object Object]") return `Unexpected doc '${r}'.`;
  let n = Ku([...Ge].map((u) => `'${u}'`));
  return `Unexpected doc.type '${t.type}'.
Expected it to be ${n}.`;
}
var Nt = class extends Error {
  name = "InvalidDocError";
  constructor(e) {
    super(Hu(e)), this.doc = e;
  }
}, Z = Nt;
var _r = {};
function Ju(t, e, r, n) {
  let u = [t];
  for (; u.length > 0; ) {
    let o = u.pop();
    if (o === _r) {
      r(u.pop());
      continue;
    }
    r && u.push(o, _r);
    let i = q(o);
    if (!i) throw new Z(o);
    if (e?.(o) !== false) switch (i) {
      case U:
      case S: {
        let D = i === U ? o : o.parts;
        for (let s = D.length, a = s - 1; a >= 0; --a) u.push(D[a]);
        break;
      }
      case T:
        u.push(o.flatContents, o.breakContents);
        break;
      case x:
        if (n && o.expandedStates) for (let D = o.expandedStates.length, s = D - 1; s >= 0; --s) u.push(o.expandedStates[s]);
        else u.push(o.contents);
        break;
      case R:
      case I:
      case L:
      case b:
      case M:
        u.push(o.contents);
        break;
      case G:
      case V:
      case v:
      case Y:
      case g:
      case N:
        break;
      default:
        throw new Z(o);
    }
  }
}
var Oe = Ju;
function Se(t, e) {
  if (typeof t == "string") return e(t);
  let r = /* @__PURE__ */ new Map();
  return n(t);
  function n(o) {
    return Fe(r, o, u);
  }
  function u(o) {
    switch (q(o)) {
      case U:
        return e(o.map(n));
      case S:
        return e({ ...o, parts: o.parts.map(n) });
      case T:
        return e({ ...o, breakContents: n(o.breakContents), flatContents: n(o.flatContents) });
      case x: {
        let { expandedStates: i, contents: D } = o;
        return i ? (i = i.map(n), D = i[0]) : D = n(D), e({ ...o, contents: D, expandedStates: i });
      }
      case R:
      case I:
      case L:
      case b:
      case M:
        return e({ ...o, contents: n(o.contents) });
      case G:
      case V:
      case v:
      case Y:
      case g:
      case N:
        return e(o);
      default:
        throw new Z(o);
    }
  }
}
function Ke(t, e, r) {
  let n = r, u = false;
  function o(i) {
    if (u) return false;
    let D = e(i);
    D !== void 0 && (u = true, n = D);
  }
  return Oe(t, o), n;
}
function qu(t) {
  if (t.type === x && t.break || t.type === g && t.hard || t.type === N) return true;
}
function xr(t) {
  return Ke(t, qu, false);
}
function yr(t) {
  if (t.length > 0) {
    let e = y(0, t, -1);
    !e.expandedStates && !e.break && (e.break = "propagated");
  }
  return null;
}
function Br(t) {
  let e = /* @__PURE__ */ new Set(), r = [];
  function n(o) {
    if (o.type === N && yr(r), o.type === x) {
      if (r.push(o), e.has(o)) return false;
      e.add(o);
    }
  }
  function u(o) {
    o.type === x && r.pop().break && yr(r);
  }
  Oe(t, n, u, true);
}
function Xu(t) {
  return t.type === g && !t.hard ? t.soft ? "" : " " : t.type === T ? t.flatContents : t;
}
function Tr(t) {
  return Se(t, Xu);
}
function Ar(t) {
  for (t = [...t]; t.length >= 2 && y(0, t, -2).type === g && y(0, t, -1).type === N; ) t.length -= 2;
  if (t.length > 0) {
    let e = Pe(y(0, t, -1));
    t[t.length - 1] = e;
  }
  return t;
}
function Pe(t) {
  switch (q(t)) {
    case I:
    case L:
    case x:
    case M:
    case b: {
      let e = Pe(t.contents);
      return { ...t, contents: e };
    }
    case T:
      return { ...t, breakContents: Pe(t.breakContents), flatContents: Pe(t.flatContents) };
    case S:
      return { ...t, parts: Ar(t.parts) };
    case U:
      return Ar(t);
    case G:
      return gr(t);
    case R:
    case V:
    case v:
    case Y:
    case g:
    case N:
      break;
    default:
      throw new Z(t);
  }
  return t;
}
function He(t) {
  return Pe(Zu(t));
}
function Qu(t) {
  switch (q(t)) {
    case S: {
      let { parts: e } = t;
      if (e.every((r) => r === "")) return "";
      if (e.length === 1) return e[0];
      break;
    }
    case x:
      if (!t.contents && !t.id && !t.break && !t.expandedStates) return "";
      if (t.contents.type === x && t.contents.id === t.id && t.contents.break === t.break && t.contents.expandedStates === t.expandedStates) return t.contents;
      break;
    case R:
    case I:
    case L:
    case M:
      if (!t.contents) return "";
      break;
    case T:
      if (!t.flatContents && !t.breakContents) return "";
      break;
    case U: {
      let e = [];
      for (let r of t) {
        if (!r) continue;
        let [n, ...u] = Array.isArray(r) ? r : [r];
        typeof n == "string" && typeof y(0, e, -1) == "string" ? e[e.length - 1] += n : e.push(n), e.push(...u);
      }
      return e.length === 0 ? "" : e.length === 1 ? e[0] : e;
    }
    case G:
    case V:
    case v:
    case Y:
    case g:
    case b:
    case N:
      break;
    default:
      throw new Z(t);
  }
  return t;
}
function Zu(t) {
  return Se(t, (e) => Qu(e));
}
function Nr(t, e = Je) {
  return Se(t, (r) => typeof r == "string" ? be(e, r.split(`
`)) : r);
}
function eo(t) {
  if (t.type === g) return true;
}
function wr(t) {
  return Ke(t, eo, false);
}
function Ee(t, e) {
  return t.type === b ? { ...t, contents: e(t.contents) } : e(t);
}
var qe = k;
function oe(t) {
  return { type: I, contents: t };
}
function De(t, e) {
  return { type: R, contents: e, n: t };
}
function Sr(t) {
  return De(Number.NEGATIVE_INFINITY, t);
}
function Xe(t) {
  return De({ type: "root" }, t);
}
function br(t) {
  return De(-1, t);
}
function Qe(t, e, r) {
  let n = t;
  if (e > 0) {
    for (let u = 0; u < Math.floor(e / r); ++u) n = oe(n);
    n = De(e % r, n), n = De(Number.NEGATIVE_INFINITY, n);
  }
  return n;
}
var ae = { type: N };
var ee = { type: V };
function kr(t) {
  return { type: S, parts: t };
}
function wt(t, e = {}) {
  return qe(e.expandedStates), { type: x, id: e.id, contents: t, break: !!e.shouldBreak, expandedStates: e.expandedStates };
}
function Ir(t, e) {
  return wt(t[0], { ...e, expandedStates: t });
}
function Rr(t, e = "", r = {}) {
  return { type: T, breakContents: t, flatContents: e, groupId: r.groupId };
}
function vr(t, e) {
  return { type: L, contents: t, groupId: e.groupId, negate: e.negate };
}
function be(t, e) {
  let r = [];
  for (let n = 0; n < e.length; n++) n !== 0 && r.push(t), r.push(e[n]);
  return r;
}
function Lr(t, e) {
  return t ? { type: b, label: t, contents: e } : e;
}
var Ze = { type: g }, Mr = { type: g, soft: true }, ke = { type: g, hard: true }, W = [ke, ae], Ot = { type: g, hard: true, literal: true }, Je = [Ot, ae];
function Ie(t) {
  return { type: M, contents: t };
}
var Yr = { type: Y };
var jr = { type: v };
function te(t) {
  if (!t) return "";
  if (Array.isArray(t)) {
    let e = [];
    for (let r of t) if (Array.isArray(r)) e.push(...te(r));
    else {
      let n = te(r);
      n !== "" && e.push(n);
    }
    return e;
  }
  return t.type === T ? { ...t, breakContents: te(t.breakContents), flatContents: te(t.flatContents) } : t.type === x ? { ...t, contents: te(t.contents), expandedStates: t.expandedStates?.map(te) } : t.type === S ? { type: "fill", parts: t.parts.map(te) } : t.contents ? { ...t, contents: te(t.contents) } : t;
}
function Ur(t) {
  let e = /* @__PURE__ */ Object.create(null), r = /* @__PURE__ */ new Set();
  return n(te(t));
  function n(o, i, D) {
    if (typeof o == "string") return JSON.stringify(o);
    if (Array.isArray(o)) {
      let s = o.map(n).filter(Boolean);
      return s.length === 1 ? s[0] : `[${s.join(", ")}]`;
    }
    if (o.type === g) {
      let s = D?.[i + 1]?.type === N;
      return o.literal ? s ? "literalline" : "literallineWithoutBreakParent" : o.hard ? s ? "hardline" : "hardlineWithoutBreakParent" : o.soft ? "softline" : "line";
    }
    if (o.type === N) return D?.[i - 1]?.type === g && D[i - 1].hard ? void 0 : "breakParent";
    if (o.type === v) return "trim";
    if (o.type === I) return "indent(" + n(o.contents) + ")";
    if (o.type === R) return o.n === Number.NEGATIVE_INFINITY ? "dedentToRoot(" + n(o.contents) + ")" : o.n < 0 ? "dedent(" + n(o.contents) + ")" : o.n.type === "root" ? "markAsRoot(" + n(o.contents) + ")" : "align(" + JSON.stringify(o.n) + ", " + n(o.contents) + ")";
    if (o.type === T) return "ifBreak(" + n(o.breakContents) + (o.flatContents ? ", " + n(o.flatContents) : "") + (o.groupId ? (o.flatContents ? "" : ', ""') + `, { groupId: ${u(o.groupId)} }` : "") + ")";
    if (o.type === L) {
      let s = [];
      o.negate && s.push("negate: true"), o.groupId && s.push(`groupId: ${u(o.groupId)}`);
      let a = s.length > 0 ? `, { ${s.join(", ")} }` : "";
      return `indentIfBreak(${n(o.contents)}${a})`;
    }
    if (o.type === x) {
      let s = [];
      o.break && o.break !== "propagated" && s.push("shouldBreak: true"), o.id && s.push(`id: ${u(o.id)}`);
      let a = s.length > 0 ? `, { ${s.join(", ")} }` : "";
      return o.expandedStates ? `conditionalGroup([${o.expandedStates.map((c) => n(c)).join(",")}]${a})` : `group(${n(o.contents)}${a})`;
    }
    if (o.type === S) return `fill([${o.parts.map((s) => n(s)).join(", ")}])`;
    if (o.type === M) return "lineSuffix(" + n(o.contents) + ")";
    if (o.type === Y) return "lineSuffixBoundary";
    if (o.type === b) return `label(${JSON.stringify(o.label)}, ${n(o.contents)})`;
    if (o.type === V) return "cursor";
    throw new Error("Unknown doc type " + o.type);
  }
  function u(o) {
    if (typeof o != "symbol") return JSON.stringify(String(o));
    if (o in e) return e[o];
    let i = o.description || "symbol";
    for (let D = 0; ; D++) {
      let s = i + (D > 0 ? ` #${D}` : "");
      if (!r.has(s)) return r.add(s), e[o] = `Symbol.for(${JSON.stringify(s)})`;
    }
  }
}
var Vr = () => /[#*0-9]\uFE0F?\u20E3|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26AA\u26B0\u26B1\u26BD\u26BE\u26C4\u26C8\u26CF\u26D1\u26E9\u26F0-\u26F5\u26F7\u26F8\u26FA\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u27A1\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B55\u3030\u303D\u3297\u3299]\uFE0F?|[\u261D\u270C\u270D](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?|[\u270A\u270B](?:\uD83C[\uDFFB-\uDFFF])?|[\u23E9-\u23EC\u23F0\u23F3\u25FD\u2693\u26A1\u26AB\u26C5\u26CE\u26D4\u26EA\u26FD\u2705\u2728\u274C\u274E\u2753-\u2755\u2795-\u2797\u27B0\u27BF\u2B50]|\u26D3\uFE0F?(?:\u200D\uD83D\uDCA5)?|\u26F9(?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|\u2764\uFE0F?(?:\u200D(?:\uD83D\uDD25|\uD83E\uDE79))?|\uD83C(?:[\uDC04\uDD70\uDD71\uDD7E\uDD7F\uDE02\uDE37\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF5\uDFF7]\uFE0F?|[\uDF85\uDFC2\uDFC7](?:\uD83C[\uDFFB-\uDFFF])?|[\uDFC4\uDFCA](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDFCB\uDFCC](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDCCF\uDD8E\uDD91-\uDD9A\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF43\uDF45-\uDF4A\uDF4C-\uDF7C\uDF7E-\uDF84\uDF86-\uDF93\uDFA0-\uDFC1\uDFC5\uDFC6\uDFC8\uDFC9\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF8-\uDFFF]|\uDDE6\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF]|\uDDE7\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF]|\uDDE8\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF7\uDDFA-\uDDFF]|\uDDE9\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF]|\uDDEA\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA]|\uDDEB\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7]|\uDDEC\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE]|\uDDED\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA]|\uDDEE\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9]|\uDDEF\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5]|\uDDF0\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF]|\uDDF1\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE]|\uDDF2\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF]|\uDDF3\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF]|\uDDF4\uD83C\uDDF2|\uDDF5\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE]|\uDDF6\uD83C\uDDE6|\uDDF7\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC]|\uDDF8\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF]|\uDDF9\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF]|\uDDFA\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF]|\uDDFB\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA]|\uDDFC\uD83C[\uDDEB\uDDF8]|\uDDFD\uD83C\uDDF0|\uDDFE\uD83C[\uDDEA\uDDF9]|\uDDFF\uD83C[\uDDE6\uDDF2\uDDFC]|\uDF44(?:\u200D\uD83D\uDFEB)?|\uDF4B(?:\u200D\uD83D\uDFE9)?|\uDFC3(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?|\uDFF3\uFE0F?(?:\u200D(?:\u26A7\uFE0F?|\uD83C\uDF08))?|\uDFF4(?:\u200D\u2620\uFE0F?|\uDB40\uDC67\uDB40\uDC62\uDB40(?:\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDC73\uDB40\uDC63\uDB40\uDC74|\uDC77\uDB40\uDC6C\uDB40\uDC73)\uDB40\uDC7F)?)|\uD83D(?:[\uDC3F\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3]\uFE0F?|[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC](?:\uD83C[\uDFFB-\uDFFF])?|[\uDC6E-\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4\uDEB5](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD74\uDD90](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?|[\uDC00-\uDC07\uDC09-\uDC14\uDC16-\uDC25\uDC27-\uDC3A\uDC3C-\uDC3E\uDC40\uDC44\uDC45\uDC51-\uDC65\uDC6A\uDC79-\uDC7B\uDC7D-\uDC80\uDC84\uDC88-\uDC8E\uDC90\uDC92-\uDCA9\uDCAB-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDDA4\uDDFB-\uDE2D\uDE2F-\uDE34\uDE37-\uDE41\uDE43\uDE44\uDE48-\uDE4A\uDE80-\uDEA2\uDEA4-\uDEB3\uDEB7-\uDEBF\uDEC1-\uDEC5\uDED0-\uDED2\uDED5-\uDED8\uDEDC-\uDEDF\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB\uDFF0]|\uDC08(?:\u200D\u2B1B)?|\uDC15(?:\u200D\uD83E\uDDBA)?|\uDC26(?:\u200D(?:\u2B1B|\uD83D\uDD25))?|\uDC3B(?:\u200D\u2744\uFE0F?)?|\uDC41\uFE0F?(?:\u200D\uD83D\uDDE8\uFE0F?)?|\uDC68(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDC68\uDC69]\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC68\uD83C[\uDFFC-\uDFFF])|\uD83E(?:[\uDD1D\uDEEF]\u200D\uD83D\uDC68\uD83C[\uDFFC-\uDFFF]|[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83E(?:[\uDD1D\uDEEF]\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFD-\uDFFF]|[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83E(?:[\uDD1D\uDEEF]\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83E(?:[\uDD1D\uDEEF]\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFD\uDFFF]|[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFE])|\uD83E(?:[\uDD1D\uDEEF]\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFE]|[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3])))?))?|\uDC69(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?[\uDC68\uDC69]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?|\uDC69\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?))|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC69\uD83C[\uDFFC-\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFC-\uDFFF]|\uDEEF\u200D\uD83D\uDC69\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC69\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFD-\uDFFF]|\uDEEF\u200D\uD83D\uDC69\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC69\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|\uDEEF\u200D\uD83D\uDC69\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC69\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFD\uDFFF]|\uDEEF\u200D\uD83D\uDC69\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC69\uD83C[\uDFFB-\uDFFE])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFE]|\uDEEF\u200D\uD83D\uDC69\uD83C[\uDFFB-\uDFFE])))?))?|\uDD75(?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDE2E(?:\u200D\uD83D\uDCA8)?|\uDE35(?:\u200D\uD83D\uDCAB)?|\uDE36(?:\u200D\uD83C\uDF2B\uFE0F?)?|\uDE42(?:\u200D[\u2194\u2195]\uFE0F?)?|\uDEB6(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?)|\uD83E(?:[\uDD0C\uDD0F\uDD18-\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5\uDEC3-\uDEC5\uDEF0\uDEF2-\uDEF8](?:\uD83C[\uDFFB-\uDFFF])?|[\uDD26\uDD35\uDD37-\uDD39\uDD3C-\uDD3E\uDDB8\uDDB9\uDDCD\uDDCF\uDDD4\uDDD6-\uDDDD](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDDDE\uDDDF](?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD0D\uDD0E\uDD10-\uDD17\uDD20-\uDD25\uDD27-\uDD2F\uDD3A\uDD3F-\uDD45\uDD47-\uDD76\uDD78-\uDDB4\uDDB7\uDDBA\uDDBC-\uDDCC\uDDD0\uDDE0-\uDDFF\uDE70-\uDE7C\uDE80-\uDE8A\uDE8E-\uDEC2\uDEC6\uDEC8\uDECD-\uDEDC\uDEDF-\uDEEA\uDEEF]|\uDDCE(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?|\uDDD1(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1|\uDDD1\u200D\uD83E\uDDD2(?:\u200D\uD83E\uDDD2)?|\uDDD2(?:\u200D\uD83E\uDDD2)?))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFC-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83E\uDDD1\uD83C[\uDFFC-\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF]|\uDEEF\u200D\uD83E\uDDD1\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFD-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83E\uDDD1\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF]|\uDEEF\u200D\uD83E\uDDD1\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83E\uDDD1\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF]|\uDEEF\u200D\uD83E\uDDD1\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFD\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF]|\uDEEF\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFE]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFE])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF]|\uDEEF\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFE])))?))?|\uDEF1(?:\uD83C(?:\uDFFB(?:\u200D\uD83E\uDEF2\uD83C[\uDFFC-\uDFFF])?|\uDFFC(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFD-\uDFFF])?|\uDFFD(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])?|\uDFFE(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFD\uDFFF])?|\uDFFF(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFE])?))?)/g;
var Wr = 12288, $r = 65510, zr = [12288, 12288, 65281, 65376, 65504, 65510];
var Gr = 4352, Kr = 262141, Pt = [4352, 4447, 8986, 8987, 9001, 9002, 9193, 9196, 9200, 9200, 9203, 9203, 9725, 9726, 9748, 9749, 9776, 9783, 9800, 9811, 9855, 9855, 9866, 9871, 9875, 9875, 9889, 9889, 9898, 9899, 9917, 9918, 9924, 9925, 9934, 9934, 9940, 9940, 9962, 9962, 9970, 9971, 9973, 9973, 9978, 9978, 9981, 9981, 9989, 9989, 9994, 9995, 10024, 10024, 10060, 10060, 10062, 10062, 10067, 10069, 10071, 10071, 10133, 10135, 10160, 10160, 10175, 10175, 11035, 11036, 11088, 11088, 11093, 11093, 11904, 11929, 11931, 12019, 12032, 12245, 12272, 12287, 12289, 12350, 12353, 12438, 12441, 12543, 12549, 12591, 12593, 12686, 12688, 12773, 12783, 12830, 12832, 12871, 12880, 42124, 42128, 42182, 43360, 43388, 44032, 55203, 63744, 64255, 65040, 65049, 65072, 65106, 65108, 65126, 65128, 65131, 94176, 94180, 94192, 94198, 94208, 101589, 101631, 101662, 101760, 101874, 110576, 110579, 110581, 110587, 110589, 110590, 110592, 110882, 110898, 110898, 110928, 110930, 110933, 110933, 110948, 110951, 110960, 111355, 119552, 119638, 119648, 119670, 126980, 126980, 127183, 127183, 127374, 127374, 127377, 127386, 127488, 127490, 127504, 127547, 127552, 127560, 127568, 127569, 127584, 127589, 127744, 127776, 127789, 127797, 127799, 127868, 127870, 127891, 127904, 127946, 127951, 127955, 127968, 127984, 127988, 127988, 127992, 128062, 128064, 128064, 128066, 128252, 128255, 128317, 128331, 128334, 128336, 128359, 128378, 128378, 128405, 128406, 128420, 128420, 128507, 128591, 128640, 128709, 128716, 128716, 128720, 128722, 128725, 128728, 128732, 128735, 128747, 128748, 128756, 128764, 128992, 129003, 129008, 129008, 129292, 129338, 129340, 129349, 129351, 129535, 129648, 129660, 129664, 129674, 129678, 129734, 129736, 129736, 129741, 129756, 129759, 129770, 129775, 129784, 131072, 196605, 196608, 262141];
var St = (t, e) => {
  let r = 0, n = Math.floor(t.length / 2) - 1;
  for (; r <= n; ) {
    let u = Math.floor((r + n) / 2), o = u * 2;
    if (e < t[o]) n = u - 1;
    else if (e > t[o + 1]) r = u + 1;
    else return true;
  }
  return false;
};
var Hr = 19968, [to, ro] = no(Pt);
function no(t) {
  let e = t[0], r = t[1];
  for (let n = 0; n < t.length; n += 2) {
    let u = t[n], o = t[n + 1];
    if (Hr >= u && Hr <= o) return [u, o];
    o - u > r - e && (e = u, r = o);
  }
  return [e, r];
}
var bt = (t) => t < Wr || t > $r ? false : St(zr, t);
var kt = (t) => t >= to && t <= ro ? true : t < Gr || t > Kr ? false : St(Pt, t);
var uo = /^(?:[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u2600-\u2604\u260E\u2611\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26B0\u26B1\u26C8\u26CF\u26D1\u26D3\u26E9\u26F0\u26F1\u26F4\u26F7\u26F8\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2763\u2764\u27A1\u2934\u2935\u2B05-\u2B07]|\uD83C[\uDD70\uDD71\uDD7E\uDD7F\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF3\uDFF5\uDFF7]|\uD83D[\uDC3F\uDC41\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3])$/, Jr = (t) => uo.test(t);
var oo = /[^\x20-\x7F]/;
function io(t) {
  if (!t) return 0;
  if (!oo.test(t)) return t.length;
  let e = 0;
  t = t.replace(Vr(), (r) => (e += Jr(r) ? 1 : 2, ""));
  for (let r of t) {
    let n = r.codePointAt(0);
    n <= 31 || n >= 127 && n <= 159 || n >= 768 && n <= 879 || n >= 65024 && n <= 65039 || (e += bt(n) || kt(n) ? 2 : 1);
  }
  return e;
}
var Re = io;
var so = { type: 0 }, Do = { type: 1 }, It = { value: "", length: 0, queue: [], get root() {
  return It;
} };
function qr(t, e, r) {
  let n = e.type === 1 ? t.queue.slice(0, -1) : [...t.queue, e], u = "", o = 0, i = 0, D = 0;
  for (let f of n) switch (f.type) {
    case 0:
      c(), r.useTabs ? s(1) : a(r.tabWidth);
      break;
    case 3: {
      let { string: F } = f;
      c(), u += F, o += F.length;
      break;
    }
    case 2: {
      let { width: F } = f;
      i += 1, D += F;
      break;
    }
    default:
      throw new Error(`Unexpected indent comment '${f.type}'.`);
  }
  return l(), { ...t, value: u, length: o, queue: n };
  function s(f) {
    u += "	".repeat(f), o += r.tabWidth * f;
  }
  function a(f) {
    u += " ".repeat(f), o += f;
  }
  function c() {
    r.useTabs ? p() : l();
  }
  function p() {
    i > 0 && s(i), m();
  }
  function l() {
    D > 0 && a(D), m();
  }
  function m() {
    i = 0, D = 0;
  }
}
function Xr(t, e, r) {
  if (!e) return t;
  if (e.type === "root") return { ...t, root: t };
  if (e === Number.NEGATIVE_INFINITY) return t.root;
  let n;
  return typeof e == "number" ? e < 0 ? n = Do : n = { type: 2, width: e } : n = { type: 3, string: e }, qr(t, n, r);
}
function Qr(t, e) {
  return qr(t, so, e);
}
function ao(t) {
  let e = 0;
  for (let r = t.length - 1; r >= 0; r--) {
    let n = t[r];
    if (n === " " || n === "	") e++;
    else break;
  }
  return e;
}
function et(t) {
  let e = ao(t);
  return { text: e === 0 ? t : t.slice(0, t.length - e), count: e };
}
var Rt = class {
  #t = [];
  #e = "";
  #n = 0;
  #u = [];
  #r = [];
  #o() {
    let e = this.#e;
    e !== "" && (this.#t.push(e), this.#n += e.length, this.#e = "");
    for (let r of this.#r) this.#u.push(Math.min(r, this.#n));
    this.#r.length = 0;
  }
  markPosition() {
    if (this.#u.length + this.#r.length >= 2) throw new Error("There are too many 'cursor' in doc.");
    this.#r.push(this.#n + this.#e.length);
  }
  write(e) {
    this.#e += e;
  }
  trim() {
    let { text: e, count: r } = et(this.#e);
    return this.#e = e, this.#o(), r;
  }
  finish() {
    return this.#o(), { text: this.#t.join(""), positions: this.#u };
  }
}, Zr = Rt;
var K = /* @__PURE__ */ Symbol("MODE_BREAK"), Q = /* @__PURE__ */ Symbol("MODE_FLAT"), vt = /* @__PURE__ */ Symbol("DOC_FILL_PRINTED_LENGTH");
function tt(t, e, r, n, u, o) {
  if (r === Number.POSITIVE_INFINITY) return true;
  let i = e.length, D = false, s = [t], a = "";
  for (; r >= 0; ) {
    if (s.length === 0) {
      if (i === 0) return true;
      s.push(e[--i]);
      continue;
    }
    let { mode: c, doc: p } = s.pop(), l = q(p);
    switch (l) {
      case G:
        p && (D && (a += " ", r -= 1, D = false), a += p, r -= Re(p));
        break;
      case U:
      case S: {
        let m = l === U ? p : p.parts, f = p[vt] ?? 0;
        for (let F = m.length - 1; F >= f; F--) s.push({ mode: c, doc: m[F] });
        break;
      }
      case I:
      case R:
      case L:
      case b:
        s.push({ mode: c, doc: p.contents });
        break;
      case v: {
        let { text: m, count: f } = et(a);
        a = m, r += f;
        break;
      }
      case x: {
        if (o && p.break) return false;
        let m = p.break ? K : c, f = p.expandedStates && m === K ? y(0, p.expandedStates, -1) : p.contents;
        s.push({ mode: m, doc: f });
        break;
      }
      case T: {
        let f = (p.groupId ? u[p.groupId] || Q : c) === K ? p.breakContents : p.flatContents;
        f && s.push({ mode: c, doc: f });
        break;
      }
      case g:
        if (c === K || p.hard) return true;
        p.soft || (D = true);
        break;
      case M:
        n = true;
        break;
      case Y:
        if (n) return false;
        break;
    }
  }
  return false;
}
function Ce(t, e) {
  let r = /* @__PURE__ */ Object.create(null), n = e.printWidth, u = we(e.endOfLine), o = 0, i = [{ indent: It, mode: K, doc: t }], D = false, s = [], a = new Zr();
  for (Br(t); i.length > 0; ) {
    let { indent: f, mode: F, doc: d } = i.pop();
    switch (q(d)) {
      case G: {
        let E = u !== `
` ? ne(0, d, `
`, u) : d;
        E && (a.write(E), i.length > 0 && (o += Re(E)));
        break;
      }
      case U:
        for (let E = d.length - 1; E >= 0; E--) i.push({ indent: f, mode: F, doc: d[E] });
        break;
      case V:
        a.markPosition();
        break;
      case I:
        i.push({ indent: Qr(f, e), mode: F, doc: d.contents });
        break;
      case R:
        i.push({ indent: Xr(f, d.n, e), mode: F, doc: d.contents });
        break;
      case v:
        o -= a.trim();
        break;
      case x: {
        let E = (function() {
          if (F === Q && !D) return { indent: f, mode: d.break ? K : Q, doc: d.contents };
          D = false;
          let h = n - o, _ = s.length > 0, P = { indent: f, mode: Q, doc: d.contents };
          if (!d.break && tt(P, i, h, _, r)) return P;
          if (!d.expandedStates) return { indent: f, mode: K, doc: d.contents };
          if (!d.break) for (let A = 1; A < d.expandedStates.length - 1; A++) {
            let B = { indent: f, mode: Q, doc: d.expandedStates[A] };
            if (tt(B, i, h, _, r)) return B;
          }
          return { indent: f, mode: K, doc: y(0, d.expandedStates, -1) };
        })();
        i.push(E), d.id && (r[d.id] = E.mode);
        break;
      }
      case S: {
        let E = n - o, C = d[vt] ?? 0, { parts: h } = d, _ = h.length - C;
        if (_ === 0) break;
        let P = h[C + 0], A = h[C + 1], B = { indent: f, mode: Q, doc: P }, J = { indent: f, mode: K, doc: P }, $e = tt(B, [], E, s.length > 0, r, true);
        if (_ === 1) {
          $e ? i.push(B) : i.push(J);
          break;
        }
        let lr = { indent: f, mode: Q, doc: A }, _t = { indent: f, mode: K, doc: A };
        if (_ === 2) {
          $e ? i.push(lr, B) : i.push(_t, J);
          break;
        }
        let bu = h[C + 2], ku = { indent: f, mode: F, doc: { ...d, [vt]: C + 2 } }, Iu = tt({ indent: f, mode: Q, doc: [P, A, bu] }, [], E, s.length > 0, r, true);
        i.push(ku), Iu ? i.push(lr, B) : $e ? i.push(_t, B) : i.push(_t, J);
        break;
      }
      case T:
      case L: {
        let E = d.groupId ? r[d.groupId] : F;
        if (E === K) {
          let C = d.type === T ? d.breakContents : d.negate ? d.contents : oe(d.contents);
          C && i.push({ indent: f, mode: F, doc: C });
        }
        if (E === Q) {
          let C = d.type === T ? d.flatContents : d.negate ? oe(d.contents) : d.contents;
          C && i.push({ indent: f, mode: F, doc: C });
        }
        break;
      }
      case M:
        s.push({ indent: f, mode: F, doc: d.contents });
        break;
      case Y:
        s.length > 0 && i.push({ indent: f, mode: F, doc: ke });
        break;
      case g:
        switch (F) {
          case Q:
            if (!d.hard) {
              d.soft || (a.write(" "), o += 1);
              break;
            }
            D = true;
          case K:
            if (s.length > 0) {
              i.push({ indent: f, mode: F, doc: d }, ...s.reverse()), s.length = 0;
              break;
            }
            d.literal ? (a.write(u), o = 0, f.root && (f.root.value && a.write(f.root.value), o = f.root.length)) : (a.trim(), a.write(u + f.value), o = f.length);
            break;
        }
        break;
      case b:
        i.push({ indent: f, mode: F, doc: d.contents });
        break;
      case N:
        break;
      default:
        throw new Z(d);
    }
    i.length === 0 && s.length > 0 && (i.push(...s.reverse()), s.length = 0);
  }
  let { text: c, positions: p } = a.finish();
  if (p.length !== 2) return { formatted: c };
  let [l, m] = p;
  return { formatted: c, cursorNodeStart: l, cursorNodeText: c.slice(l, m) };
}
function co(t, e, r = 0) {
  let n = 0;
  for (let u = r; u < t.length; ++u) t[u] === "	" ? n = n + e - n % e : n++;
  return n;
}
var he = co;
var Lt = class {
  constructor(e) {
    this.stack = [e];
  }
  get key() {
    let { stack: e, siblings: r } = this;
    return y(0, e, r === null ? -2 : -4) ?? null;
  }
  get index() {
    return this.siblings === null ? null : y(0, this.stack, -2);
  }
  get node() {
    return y(0, this.stack, -1);
  }
  get parent() {
    return this.getNode(1);
  }
  get grandparent() {
    return this.getNode(2);
  }
  get isInArray() {
    return this.siblings !== null;
  }
  get siblings() {
    let { stack: e } = this, r = y(0, e, -3);
    return Array.isArray(r) ? r : null;
  }
  get next() {
    let { siblings: e } = this;
    return e === null ? null : e[this.index + 1];
  }
  get previous() {
    let { siblings: e } = this;
    return e === null ? null : e[this.index - 1];
  }
  get isFirst() {
    return this.index === 0;
  }
  get isLast() {
    let { siblings: e, index: r } = this;
    return e !== null && r === e.length - 1;
  }
  get isRoot() {
    return this.stack.length === 1;
  }
  get root() {
    return this.stack[0];
  }
  get ancestors() {
    return [...this.#e()];
  }
  getName() {
    let { stack: e } = this, { length: r } = e;
    return r > 1 ? y(0, e, -2) : null;
  }
  getValue() {
    return y(0, this.stack, -1);
  }
  getNode(e = 0) {
    let r = this.#t(e);
    return r === -1 ? null : this.stack[r];
  }
  getParentNode(e = 0) {
    return this.getNode(e + 1);
  }
  #t(e) {
    let { stack: r } = this;
    for (let n = r.length - 1; n >= 0; n -= 2) if (!Array.isArray(r[n]) && --e < 0) return n;
    return -1;
  }
  call(e, ...r) {
    let { stack: n } = this, { length: u } = n, o = y(0, n, -1);
    for (let i of r) o = o?.[i], n.push(i, o);
    try {
      return e(this);
    } finally {
      n.length = u;
    }
  }
  callParent(e, r = 0) {
    let n = this.#t(r + 1), u = this.stack.splice(n + 1);
    try {
      return e(this);
    } finally {
      this.stack.push(...u);
    }
  }
  each(e, ...r) {
    let { stack: n } = this, { length: u } = n, o = y(0, n, -1);
    for (let i of r) o = o[i], n.push(i, o);
    try {
      for (let i = 0; i < o.length; ++i) n.push(i, o[i]), e(this, i, o), n.length -= 2;
    } finally {
      n.length = u;
    }
  }
  map(e, ...r) {
    let n = [];
    return this.each((u, o, i) => {
      n[o] = e(u, o, i);
    }, ...r), n;
  }
  match(...e) {
    let r = this.stack.length - 1, n = null, u = this.stack[r--];
    for (let o of e) {
      if (u === void 0) return false;
      let i = null;
      if (typeof n == "number" && (i = n, n = this.stack[r--], u = this.stack[r--]), o && !o(u, n, i)) return false;
      n = this.stack[r--], u = this.stack[r--];
    }
    return true;
  }
  findAncestor(e) {
    for (let r of this.#e()) if (e(r)) return r;
  }
  hasAncestor(e) {
    for (let r of this.#e()) if (e(r)) return true;
    return false;
  }
  *#e() {
    let { stack: e } = this;
    for (let r = e.length - 3; r >= 0; r -= 2) {
      let n = e[r];
      Array.isArray(n) || (yield n);
    }
  }
}, en = Lt;
function fo(t) {
  return Array.isArray(t) && t.length > 0;
}
var rt = fo;
function lo(t) {
  return t !== null && typeof t == "object";
}
var ge = lo;
function _e(t) {
  return (e, r, n) => {
    if (r === false) return false;
    let u = !!n?.backwards, { length: o } = e, i = r;
    for (; i >= 0 && i < o; ) {
      let D = e.charAt(i);
      if (t instanceof RegExp) {
        if (!t.test(D)) return i;
      } else if (!t.includes(D)) return i;
      u ? i-- : i++;
    }
    return i === -1 || i === o ? i : false;
  };
}
var tn = _e(/\s/), j = _e(" 	"), nt = _e(",; 	"), ut = _e(/[^\n\r]/);
var rn = (t) => t === `
` || t === "\r" || t === "\u2028" || t === "\u2029";
function po(t, e, r) {
  if (e === false) return false;
  let n = !!r?.backwards, u = t.charAt(e);
  if (n) {
    if (t.charAt(e - 1) === "\r" && u === `
`) return e - 2;
    if (rn(u)) return e - 1;
  } else {
    if (u === "\r" && t.charAt(e + 1) === `
`) return e + 2;
    if (rn(u)) return e + 1;
  }
  return e;
}
var $ = po;
function mo(t, e, r = {}) {
  let n = j(t, r.backwards ? e - 1 : e, r), u = $(t, n, r);
  return n !== u;
}
var H = mo;
function* ye(t, e) {
  let { getVisitorKeys: r, filter: n = () => true } = e, u = (o) => ge(o) && n(o);
  for (let o of r(t)) {
    let i = t[o];
    if (Array.isArray(i)) for (let D of i) u(D) && (yield D);
    else u(i) && (yield i);
  }
}
function* nn(t, e) {
  let r = [t];
  for (let n = 0; n < r.length; n++) {
    let u = r[n];
    for (let o of ye(u, e)) yield o, r.push(o);
  }
}
function un(t, e) {
  return ye(t, e).next().done;
}
function Fo(t, e, r) {
  let { filter: n } = r;
  if (!n) return [];
  let u, o = (r.getChildren?.(t, r) ?? [...ye(t, { getVisitorKeys: r.getVisitorKeys })]).flatMap((s) => (u ?? (u = [t, ...e]), n(s, u) ? [s] : on(s, u, r))), { locStart: i, locEnd: D } = r;
  return o.sort((s, a) => i(s) - i(a) || D(s) - D(a)), o;
}
function on(t, e, r) {
  return Fe(r.cache, t, (n) => Fo(n, e, r));
}
var ot = on;
function Eo(t) {
  let e = t.type || t.kind || "(unknown type)", r = String(t.name || t.id && (typeof t.id == "object" ? t.id.name : t.id) || t.key && (typeof t.key == "object" ? t.key.name : t.key) || t.value && (typeof t.value == "object" ? "" : String(t.value)) || t.operator || "");
  return r.length > 20 && (r = r.slice(0, 19) + "\u2026"), e + (r ? " " + r : "");
}
function Mt(t, e) {
  (t.comments ?? (t.comments = [])).push(e), e.printed = false, e.nodeDescription = Eo(t);
}
function ce(t, e) {
  e.leading = true, e.trailing = false, Mt(t, e);
}
function re(t, e, r) {
  e.leading = false, e.trailing = false, r && (e.marker = r), Mt(t, e);
}
function fe(t, e) {
  e.leading = false, e.trailing = true, Mt(t, e);
}
var Ut = /* @__PURE__ */ new WeakMap();
function Dn(t, e, r, n, u = []) {
  let { locStart: o, locEnd: i } = r, D = o(e), s = i(e), a = ot(t, u, { cache: Ut, locStart: o, locEnd: i, getVisitorKeys: r.getVisitorKeys, filter: r.printer.canAttachComment, getChildren: r.printer.getCommentChildNodes }), c, p, l = 0, m = a.length;
  for (; l < m; ) {
    let f = l + m >> 1, F = a[f], d = o(F), E = i(F);
    if (d <= D && s <= E) return Dn(F, e, r, F, [F, ...u]);
    if (E <= D) {
      c = F, l = f + 1;
      continue;
    }
    if (s <= d) {
      p = F, m = f;
      continue;
    }
    throw new Error("Comment location overlaps with node location");
  }
  if (n?.type === "TemplateLiteral") {
    let { quasis: f } = n, F = jt(f, e, r);
    c && jt(f, c, r) !== F && (c = null), p && jt(f, p, r) !== F && (p = null);
  }
  return { enclosingNode: n, precedingNode: c, followingNode: p };
}
var Yt = () => false;
function an(t, e) {
  let { comments: r } = t;
  if (delete t.comments, !rt(r) || !e.printer.canAttachComment) return;
  let n = [], { printer: { features: { experimental_avoidAstMutation: u }, handleComments: o = {} }, originalText: i } = e, { ownLine: D = Yt, endOfLine: s = Yt, remaining: a = Yt } = o, c = r.map((l, m) => ({ ...Dn(t, l, e), comment: l, text: i, options: e, ast: t, isLastComment: r.length - 1 === m, placement: void 0 })), p = !u;
  for (let [l, m] of c.entries()) {
    let { comment: f, precedingNode: F, enclosingNode: d, followingNode: E, text: C, options: h, ast: _, isLastComment: P } = m, A = Co(C, h, c, l) ? "ownLine" : ho(C, h, c, l) ? "endOfLine" : "remaining", B;
    if (u ? (m.placement = A, B = [m]) : B = [f, C, h, _, P], p && (f.enclosingNode = d, f.precedingNode = F, f.followingNode = E), f.placement = A, A === "ownLine") D(...B) || (E ? ce(E, f) : F ? fe(F, f) : d ? re(d, f) : re(_, f));
    else if (A === "endOfLine") s(...B) || (F ? fe(F, f) : E ? ce(E, f) : d ? re(d, f) : re(_, f));
    else if (!a(...B)) if (F && E) {
      let J = n.length;
      J > 0 && n[J - 1].followingNode !== E && sn(n, h), n.push(m);
    } else F ? fe(F, f) : E ? ce(E, f) : d ? re(d, f) : re(_, f);
  }
  if (sn(n, e), p) for (let l of r) delete l.precedingNode, delete l.enclosingNode, delete l.followingNode;
}
var cn = (t) => !/[\S\n\u2028\u2029]/.test(t);
function Co(t, e, r, n) {
  let { comment: u, precedingNode: o } = r[n], { locStart: i, locEnd: D } = e, s = i(u);
  if (o) for (let a = n - 1; a >= 0; a--) {
    let { comment: c, precedingNode: p } = r[a];
    if (p !== o || !cn(t.slice(D(c), s))) break;
    s = i(c);
  }
  return H(t, s, { backwards: true });
}
function ho(t, e, r, n) {
  let { comment: u, followingNode: o } = r[n], { locStart: i, locEnd: D } = e, s = D(u);
  if (o) for (let a = n + 1; a < r.length; a++) {
    let { comment: c, followingNode: p } = r[a];
    if (p !== o || !cn(t.slice(s, i(c)))) break;
    s = D(c);
  }
  return H(t, s);
}
function sn(t, e) {
  let r = t.length;
  if (r === 0) return;
  let { precedingNode: n, followingNode: u } = t[0], o = e.locStart(u), i;
  for (i = r; i > 0; --i) {
    let { comment: D, precedingNode: s, followingNode: a } = t[i - 1];
    let c = e.originalText.slice(e.locEnd(D), o);
    if (e.printer.isGap?.(c, e) ?? /^[\s(]*$/.test(c)) o = e.locStart(D);
    else break;
  }
  for (let [D, { comment: s }] of t.entries()) D < i ? fe(n, s) : ce(u, s);
  for (let D of [n, u]) D.comments && D.comments.length > 1 && D.comments.sort((s, a) => e.locStart(s) - e.locStart(a));
  t.length = 0;
}
function jt(t, e, r) {
  let n = r.locStart(e) - 1;
  for (let u = 1; u < t.length; ++u) if (n < r.locStart(t[u])) return u - 1;
  return 0;
}
function go(t, e) {
  let r = e - 1;
  r = j(t, r, { backwards: true }), r = $(t, r, { backwards: true }), r = j(t, r, { backwards: true });
  let n = $(t, r, { backwards: true });
  return r !== n;
}
var ve = go;
var fn = () => true;
function ln(t, e) {
  let r = t.node;
  return r.printed = true, e.printer.printComment(t, e);
}
function _o(t, e) {
  let r = t.node, n = [ln(t, e)], { printer: u, originalText: o, locStart: i, locEnd: D } = e;
  if (u.isBlockComment?.(r)) {
    let c = " ";
    H(o, D(r)) && (H(o, i(r), { backwards: true }) ? c = W : c = Ze), n.push(c);
  } else n.push(W);
  let a = $(o, j(o, D(r)));
  return a !== false && H(o, a) && n.push(W), n;
}
function yo(t, e, r) {
  let n = t.node, u = ln(t, e), { printer: o, originalText: i, locStart: D } = e, s = o.isBlockComment?.(n);
  if (r?.hasLineSuffix && !r?.isBlock || H(i, D(n), { backwards: true })) {
    let a = ve(i, D(n));
    return { doc: Ie([W, a ? W : "", u]), isBlock: s, hasLineSuffix: true };
  }
  return !s || r?.hasLineSuffix ? { doc: [Ie([" ", u]), ae], isBlock: s, hasLineSuffix: true } : { doc: [" ", u], isBlock: s, hasLineSuffix: false };
}
function Ao(t, e, r) {
  let n = e[/* @__PURE__ */ Symbol.for("printedComments")], u = fn, o = new Set(t.node?.comments?.filter((i) => !n?.has(i) && i.leading && u(i)));
  return o.size === 0 ? "" : t.map(({ node: i }) => o.has(i) ? _o(t, e) : "", "comments").filter(Boolean);
}
function xo(t, e, r) {
  let n = t.node?.comments, u = new Set(n?.filter((c) => c.trailing)), o = e[/* @__PURE__ */ Symbol.for("printedComments")], i = fn, D = new Set(n?.filter((c) => u.has(c) && !o?.has(c) && i(c)));
  if (D.size === 0) return "";
  let s = [], a;
  return t.each(({ node: c }) => {
    u.has(c) && (a = yo(t, e, a), D.has(c) && s.push(a.doc));
  }, "comments"), s;
}
function pn(t, e, r, n) {
  let u = Ao(t, r), o = xo(t, r);
  return u || o ? Ee(e, (i) => [u, i, o]) : e;
}
function mn(t) {
  let { [ue]: e, [/* @__PURE__ */ Symbol.for("printedComments")]: r } = t;
  for (let n of e) {
    if (!n.printed && !r.has(n)) throw new Error('Comment "' + n.value.trim() + '" was not printed. Please report this error!');
    delete n.printed;
  }
}
var Le = class extends Error {
  name = "ConfigError";
}, Me = class extends Error {
  name = "UndefinedParserError";
};
var Bo = Object.hasOwn ?? Function.prototype.call.bind(Object.prototype.hasOwnProperty), le = Bo;
var Fn = { checkIgnorePragma: { category: "Special", type: "boolean", default: false, description: "Check whether the file's first docblock comment contains '@noprettier' or '@noformat' to determine if it should be formatted.", cliCategory: "Other" }, cursorOffset: { category: "Special", type: "int", default: -1, range: { start: -1, end: 1 / 0, step: 1 }, description: "Print (to stderr) where a cursor at the given position would move to after formatting.", cliCategory: "Editor" }, endOfLine: { category: "Global", type: "choice", default: "lf", description: "Which end of line characters to apply.", choices: [{ value: "lf", description: "Line Feed only (\\n), common on Linux and macOS as well as inside git repos" }, { value: "crlf", description: "Carriage Return + Line Feed characters (\\r\\n), common on Windows" }, { value: "cr", description: "Carriage Return character only (\\r), used very rarely" }, { value: "auto", description: `Maintain existing
(mixed values within one file are normalised by looking at what's used after the first line)` }] }, filepath: { category: "Special", type: "path", description: "Specify the input filepath. This will be used to do parser inference.", cliName: "stdin-filepath", cliCategory: "Other", cliDescription: "Path to the file to pretend that stdin comes from." }, insertPragma: { category: "Special", type: "boolean", default: false, description: "Insert @format pragma into file's first docblock comment.", cliCategory: "Other" }, parser: { category: "Global", type: "choice", default: void 0, description: "Which parser to use.", exception: (t) => typeof t == "string" || typeof t == "function", choices: [{ value: "flow", description: "Flow" }, { value: "babel", description: "JavaScript" }, { value: "babel-flow", description: "Flow" }, { value: "babel-ts", description: "TypeScript" }, { value: "typescript", description: "TypeScript" }, { value: "acorn", description: "JavaScript" }, { value: "espree", description: "JavaScript" }, { value: "meriyah", description: "JavaScript" }, { value: "css", description: "CSS" }, { value: "less", description: "Less" }, { value: "scss", description: "SCSS" }, { value: "json", description: "JSON" }, { value: "json5", description: "JSON5" }, { value: "jsonc", description: "JSON with Comments" }, { value: "json-stringify", description: "JSON.stringify" }, { value: "graphql", description: "GraphQL" }, { value: "markdown", description: "Markdown" }, { value: "mdx", description: "MDX" }, { value: "vue", description: "Vue" }, { value: "yaml", description: "YAML" }, { value: "glimmer", description: "Ember / Handlebars" }, { value: "html", description: "HTML" }, { value: "angular", description: "Angular" }, { value: "lwc", description: "Lightning Web Components" }, { value: "mjml", description: "MJML" }] }, plugins: { type: "path", array: true, default: [{ value: [] }], category: "Global", description: "Add a plugin. Multiple plugins can be passed as separate `--plugin`s.", exception: (t) => typeof t == "string" || typeof t == "object", cliName: "plugin", cliCategory: "Config" }, printWidth: { category: "Global", type: "int", default: 80, description: "The line length where Prettier will try wrap.", range: { start: 0, end: 1 / 0, step: 1 } }, rangeEnd: { category: "Special", type: "int", default: 1 / 0, range: { start: 0, end: 1 / 0, step: 1 }, description: `Format code ending at a given character offset (exclusive).
The range will extend forwards to the end of the selected statement.`, cliCategory: "Editor" }, rangeStart: { category: "Special", type: "int", default: 0, range: { start: 0, end: 1 / 0, step: 1 }, description: `Format code starting at a given character offset.
The range will extend backwards to the start of the first line containing the selected statement.`, cliCategory: "Editor" }, requirePragma: { category: "Special", type: "boolean", default: false, description: "Require either '@prettier' or '@format' to be present in the file's first docblock comment in order for it to be formatted.", cliCategory: "Other" }, tabWidth: { type: "int", category: "Global", default: 2, description: "Number of spaces per indentation level.", range: { start: 0, end: 1 / 0, step: 1 } }, useTabs: { category: "Global", type: "boolean", default: false, description: "Indent with tabs instead of spaces." }, embeddedLanguageFormatting: { category: "Global", type: "choice", default: "auto", description: "Control how Prettier formats quoted code embedded in the file.", choices: [{ value: "auto", description: "Format embedded code if Prettier can automatically identify it." }, { value: "off", description: "Never automatically format embedded code." }] } };
function it({ plugins: t = [], showDeprecated: e = false } = {}) {
  let r = t.flatMap((u) => u.languages ?? []), n = [];
  for (let u of No(Object.assign({}, ...t.map(({ options: o }) => o), Fn))) !e && u.deprecated || (Array.isArray(u.choices) && (e || (u.choices = u.choices.filter((o) => !o.deprecated)), u.name === "parser" && (u.choices = [...u.choices, ...To(u.choices, r, t)])), u.pluginDefaults = Object.fromEntries(t.filter((o) => o.defaultOptions?.[u.name] !== void 0).map((o) => [o.name, o.defaultOptions[u.name]])), n.push(u));
  return { languages: r, options: n };
}
function* To(t, e, r) {
  let n = new Set(t.map((u) => u.value));
  for (let u of e) if (u.parsers) {
    for (let o of u.parsers) if (!n.has(o)) {
      n.add(o);
      let i = r.find((s) => s.parsers && le(s.parsers, o)), D = u.name;
      i?.name && (D += ` (plugin: ${i.name})`), yield { value: o, description: D };
    }
  }
}
function No(t) {
  let e = [];
  for (let [r, n] of Object.entries(t)) {
    let u = { name: r, ...n };
    Array.isArray(u.default) && (u.default = y(0, u.default, -1).value), e.push(u);
  }
  return e;
}
var wo = Array.prototype.toReversed ?? function() {
  return [...this].reverse();
}, Oo = X("toReversed", function() {
  if (Array.isArray(this)) return wo;
}), En = Oo;
function Po() {
  let t = globalThis, e = t.process?.platform;
  if (typeof e == "string") return e.startsWith("win");
  let r = t.Deno?.build?.os;
  return typeof r == "string" ? r === "windows" : t.navigator?.platform?.startsWith("Win") ?? false;
}
var So = Po();
function Cn(t) {
  if (t = t instanceof URL ? t : new URL(t), t.protocol !== "file:") throw new TypeError(`URL must be a file URL: received "${t.protocol}"`);
  return t;
}
function bo(t) {
  return t = Cn(t), decodeURIComponent(t.pathname.replace(/%(?![0-9A-Fa-f]{2})/g, "%25"));
}
function ko(t) {
  t = Cn(t);
  let e = decodeURIComponent(t.pathname.replace(/\//g, "\\").replace(/%(?![0-9A-Fa-f]{2})/g, "%25")).replace(/^\\*([A-Za-z]:)(\\|$)/, "$1\\");
  return t.hostname !== "" && (e = `\\\\${t.hostname}${e}`), e;
}
function Vt(t) {
  return So ? ko(t) : bo(t);
}
var hn = (t) => String(t).split(/[/\\]/).pop(), gn = (t) => String(t).startsWith("file:");
function _n(t, e) {
  if (!e) return;
  let r = hn(e).toLowerCase();
  return t.find(({ filenames: n }) => n?.some((u) => u.toLowerCase() === r)) ?? t.find(({ extensions: n }) => n?.some((u) => r.endsWith(u)));
}
function Io(t, e) {
  if (e) return t.find(({ name: r }) => r.toLowerCase() === e) ?? t.find(({ aliases: r }) => r?.includes(e)) ?? t.find(({ extensions: r }) => r?.includes(`.${e}`));
}
var Ro = void 0;
function yn(t, e) {
  if (e) {
    if (gn(e)) try {
      e = Vt(e);
    } catch {
      return;
    }
    if (typeof e == "string") return t.find(({ isSupported: r }) => r?.({ filepath: e }));
  }
}
function vo(t, e) {
  let r = En(0, t.plugins).flatMap((u) => u.languages ?? []);
  return (Io(r, e.language) ?? _n(r, e.physicalFile) ?? _n(r, e.file) ?? yn(r, e.physicalFile) ?? yn(r, e.file) ?? Ro?.(r, e.physicalFile))?.parsers[0];
}
var st = vo;
var ie = { key: (t) => /^[$_a-zA-Z][$_a-zA-Z0-9]*$/.test(t) ? t : JSON.stringify(t), value(t) {
  if (t === null || typeof t != "object") return JSON.stringify(t);
  if (Array.isArray(t)) return `[${t.map((r) => ie.value(r)).join(", ")}]`;
  let e = Object.keys(t);
  return e.length === 0 ? "{}" : `{ ${e.map((r) => `${ie.key(r)}: ${ie.value(t[r])}`).join(", ")} }`;
}, pair: ({ key: t, value: e }) => ie.value({ [t]: e }) };
var An = new Proxy(String, { get: () => An }), z = An;
var xn = (t, e, { descriptor: r }) => {
  let n = [`${z.yellow(typeof t == "string" ? r.key(t) : r.pair(t))} is deprecated`];
  return e && n.push(`we now treat it as ${z.blue(typeof e == "string" ? r.key(e) : r.pair(e))}`), n.join("; ") + ".";
};
var Dt = /* @__PURE__ */ Symbol.for("vnopts.VALUE_NOT_EXIST"), Ae = /* @__PURE__ */ Symbol.for("vnopts.VALUE_UNCHANGED");
var Bn = " ".repeat(2), Nn = (t, e, r) => {
  let { text: n, list: u } = r.normalizeExpectedResult(r.schemas[t].expected(r)), o = [];
  return n && o.push(Tn(t, e, n, r.descriptor)), u && o.push([Tn(t, e, u.title, r.descriptor)].concat(u.values.map((i) => wn(i, r.loggerPrintWidth))).join(`
`)), On(o, r.loggerPrintWidth);
};
function Tn(t, e, r, n) {
  return [`Invalid ${z.red(n.key(t))} value.`, `Expected ${z.blue(r)},`, `but received ${e === Dt ? z.gray("nothing") : z.red(n.value(e))}.`].join(" ");
}
function wn({ text: t, list: e }, r) {
  let n = [];
  return t && n.push(`- ${z.blue(t)}`), e && n.push([`- ${z.blue(e.title)}:`].concat(e.values.map((u) => wn(u, r - Bn.length).replace(/^|\n/g, `$&${Bn}`))).join(`
`)), On(n, r);
}
function On(t, e) {
  if (t.length === 1) return t[0];
  let [r, n] = t, [u, o] = t.map((i) => i.split(`
`, 1)[0].length);
  return u > e && u > o ? n : r;
}
var xe = [], Wt = [];
function at(t, e, r) {
  if (t === e) return 0;
  let n = r?.maxDistance, u = t;
  t.length > e.length && (t = e, e = u);
  let o = t.length, i = e.length;
  for (; o > 0 && t.charCodeAt(~-o) === e.charCodeAt(~-i); ) o--, i--;
  let D = 0;
  for (; D < o && t.charCodeAt(D) === e.charCodeAt(D); ) D++;
  if (o -= D, i -= D, n !== void 0 && i - o > n) return n;
  if (o === 0) return n !== void 0 && i > n ? n : i;
  let s, a, c, p, l = 0, m = 0;
  for (; l < o; ) Wt[l] = t.charCodeAt(D + l), xe[l] = ++l;
  for (; m < i; ) {
    for (s = e.charCodeAt(D + m), c = m++, a = m, l = 0; l < o; l++) p = s === Wt[l] ? c : c + 1, c = xe[l], a = xe[l] = c > a ? p > a ? a + 1 : p : p > c ? c + 1 : p;
    if (n !== void 0) {
      let f = a;
      for (l = 0; l < o; l++) xe[l] < f && (f = xe[l]);
      if (f > n) return n;
    }
  }
  return xe.length = o, Wt.length = o, n !== void 0 && a > n ? n : a;
}
function Pn(t, e, r) {
  if (!Array.isArray(e) || e.length === 0) return;
  let n = r?.maxDistance, u = t.length;
  for (let s of e) if (s === t) return s;
  let o, i = Number.POSITIVE_INFINITY, D = /* @__PURE__ */ new Set();
  for (let s of e) {
    if (D.has(s)) continue;
    D.add(s);
    let a = Math.abs(s.length - u);
    if (a >= i || a > n) continue;
    let c = Number.isFinite(i) ? Math.min(i, n) : n, p = c === void 0 ? at(t, s) : at(t, s, { maxDistance: c });
    if (p > n) continue;
    let l = p;
    if (c !== void 0 && p === c && c === n && (l = at(t, s)), l < i && (i = l, o = s, i === 0)) break;
  }
  if (!(i > n)) return o;
}
var ct = (t, e, { descriptor: r, logger: n, schemas: u }) => {
  let o = [`Ignored unknown option ${z.yellow(r.pair({ key: t, value: e }))}.`], i = Pn(t, Object.keys(u), { maxDistance: 3 });
  i && o.push(`Did you mean ${z.blue(r.key(i))}?`), n.warn(o.join(" "));
};
var Lo = ["default", "expected", "validate", "deprecated", "forward", "redirect", "overlap", "preprocess", "postprocess"];
function Mo(t, e) {
  let r = new t(e), n = Object.create(r);
  for (let u of Lo) u in e && (n[u] = Yo(e[u], r, O.prototype[u].length));
  return n;
}
var O = class {
  static create(e) {
    return Mo(this, e);
  }
  constructor(e) {
    this.name = e.name;
  }
  default(e) {
  }
  expected(e) {
    return "nothing";
  }
  validate(e, r) {
    return false;
  }
  deprecated(e, r) {
    return false;
  }
  forward(e, r) {
  }
  redirect(e, r) {
  }
  overlap(e, r, n) {
    return e;
  }
  preprocess(e, r) {
    return e;
  }
  postprocess(e, r) {
    return Ae;
  }
};
function Yo(t, e, r) {
  return typeof t == "function" ? (...n) => t(...n.slice(0, r - 1), e, ...n.slice(r - 1)) : () => t;
}
var ft = class extends O {
  constructor(e) {
    super(e), this._sourceName = e.sourceName;
  }
  expected(e) {
    return e.schemas[this._sourceName].expected(e);
  }
  validate(e, r) {
    return r.schemas[this._sourceName].validate(e, r);
  }
  redirect(e, r) {
    return this._sourceName;
  }
};
var lt = class extends O {
  expected() {
    return "anything";
  }
  validate() {
    return true;
  }
};
var pt = class extends O {
  constructor({ valueSchema: e, name: r = e.name, ...n }) {
    super({ ...n, name: r }), this._valueSchema = e;
  }
  expected(e) {
    let { text: r, list: n } = e.normalizeExpectedResult(this._valueSchema.expected(e));
    return { text: r && `an array of ${r}`, list: n && { title: "an array of the following values", values: [{ list: n }] } };
  }
  validate(e, r) {
    if (!Array.isArray(e)) return false;
    let n = [];
    for (let u of e) {
      let o = r.normalizeValidateResult(this._valueSchema.validate(u, r), u);
      o !== true && n.push(o.value);
    }
    return n.length === 0 ? true : { value: n };
  }
  deprecated(e, r) {
    let n = [];
    for (let u of e) {
      let o = r.normalizeDeprecatedResult(this._valueSchema.deprecated(u, r), u);
      o !== false && n.push(...o.map(({ value: i }) => ({ value: [i] })));
    }
    return n;
  }
  forward(e, r) {
    let n = [];
    for (let u of e) {
      let o = r.normalizeForwardResult(this._valueSchema.forward(u, r), u);
      n.push(...o.map(Sn));
    }
    return n;
  }
  redirect(e, r) {
    let n = [], u = [];
    for (let o of e) {
      let i = r.normalizeRedirectResult(this._valueSchema.redirect(o, r), o);
      "remain" in i && n.push(i.remain), u.push(...i.redirect.map(Sn));
    }
    return n.length === 0 ? { redirect: u } : { redirect: u, remain: n };
  }
  overlap(e, r) {
    return e.concat(r);
  }
};
function Sn({ from: t, to: e }) {
  return { from: [t], to: e };
}
var mt = class extends O {
  expected() {
    return "true or false";
  }
  validate(e) {
    return typeof e == "boolean";
  }
};
function kn(t, e) {
  let r = /* @__PURE__ */ Object.create(null);
  for (let n of t) {
    let u = n[e];
    if (r[u]) throw new Error(`Duplicate ${e} ${JSON.stringify(u)}`);
    r[u] = n;
  }
  return r;
}
function In(t, e) {
  let r = /* @__PURE__ */ new Map();
  for (let n of t) {
    let u = n[e];
    if (r.has(u)) throw new Error(`Duplicate ${e} ${JSON.stringify(u)}`);
    r.set(u, n);
  }
  return r;
}
function Rn() {
  let t = /* @__PURE__ */ Object.create(null);
  return (e) => {
    let r = JSON.stringify(e);
    return t[r] ? true : (t[r] = true, false);
  };
}
function vn(t, e) {
  let r = [], n = [];
  for (let u of t) e(u) ? r.push(u) : n.push(u);
  return [r, n];
}
function Ln(t) {
  return t === Math.floor(t);
}
function Mn(t, e) {
  if (t === e) return 0;
  let r = typeof t, n = typeof e, u = ["undefined", "object", "boolean", "number", "string"];
  return r !== n ? u.indexOf(r) - u.indexOf(n) : r !== "string" ? Number(t) - Number(e) : t.localeCompare(e);
}
function Yn(t) {
  return (...e) => {
    let r = t(...e);
    return typeof r == "string" ? new Error(r) : r;
  };
}
function $t(t) {
  return t === void 0 ? {} : t;
}
function zt(t) {
  if (typeof t == "string") return { text: t };
  let { text: e, list: r } = t;
  return jo((e || r) !== void 0, "Unexpected `expected` result, there should be at least one field."), r ? { text: e, list: { title: r.title, values: r.values.map(zt) } } : { text: e };
}
function Gt(t, e) {
  return t === true ? true : t === false ? { value: e } : t;
}
function Kt(t, e, r = false) {
  return t === false ? false : t === true ? r ? true : [{ value: e }] : "value" in t ? [t] : t.length === 0 ? false : t;
}
function bn(t, e) {
  return typeof t == "string" || "key" in t ? { from: e, to: t } : "from" in t ? { from: t.from, to: t.to } : { from: e, to: t.to };
}
function dt(t, e) {
  return t === void 0 ? [] : Array.isArray(t) ? t.map((r) => bn(r, e)) : [bn(t, e)];
}
function Ht(t, e) {
  let r = dt(typeof t == "object" && "redirect" in t ? t.redirect : t, e);
  return r.length === 0 ? { remain: e, redirect: r } : typeof t == "object" && "remain" in t ? { remain: t.remain, redirect: r } : { redirect: r };
}
function jo(t, e) {
  if (!t) throw new Error(e);
}
var Ft = class extends O {
  constructor(e) {
    super(e), this._choices = In(e.choices.map((r) => r && typeof r == "object" ? r : { value: r }), "value");
  }
  expected({ descriptor: e }) {
    let r = Array.from(this._choices.keys()).map((i) => this._choices.get(i)).filter(({ hidden: i }) => !i).map((i) => i.value).sort(Mn).map(e.value), n = r.slice(0, -2), u = r.slice(-2);
    return { text: n.concat(u.join(" or ")).join(", "), list: { title: "one of the following values", values: r } };
  }
  validate(e) {
    return this._choices.has(e);
  }
  deprecated(e) {
    let r = this._choices.get(e);
    return r && r.deprecated ? { value: e } : false;
  }
  forward(e) {
    let r = this._choices.get(e);
    return r ? r.forward : void 0;
  }
  redirect(e) {
    let r = this._choices.get(e);
    return r ? r.redirect : void 0;
  }
};
var Et = class extends O {
  expected() {
    return "a number";
  }
  validate(e, r) {
    return typeof e == "number";
  }
};
var Ct = class extends Et {
  expected() {
    return "an integer";
  }
  validate(e, r) {
    return r.normalizeValidateResult(super.validate(e, r), e) === true && Ln(e);
  }
};
var Ye = class extends O {
  expected() {
    return "a string";
  }
  validate(e) {
    return typeof e == "string";
  }
};
var jn = ie, Un = ct, Vn = Nn, Wn = xn;
var ht = class {
  constructor(e, r) {
    let { logger: n = console, loggerPrintWidth: u = 80, descriptor: o = jn, unknown: i = Un, invalid: D = Vn, deprecated: s = Wn, missing: a = () => false, required: c = () => false, preprocess: p = (m) => m, postprocess: l = () => Ae } = r || {};
    this._utils = { descriptor: o, logger: n || { warn: () => {
    } }, loggerPrintWidth: u, schemas: kn(e, "name"), normalizeDefaultResult: $t, normalizeExpectedResult: zt, normalizeDeprecatedResult: Kt, normalizeForwardResult: dt, normalizeRedirectResult: Ht, normalizeValidateResult: Gt }, this._unknownHandler = i, this._invalidHandler = Yn(D), this._deprecatedHandler = s, this._identifyMissing = (m, f) => !(m in f) || a(m, f), this._identifyRequired = c, this._preprocess = p, this._postprocess = l, this.cleanHistory();
  }
  cleanHistory() {
    this._hasDeprecationWarned = Rn();
  }
  normalize(e) {
    let r = {}, u = [this._preprocess(e, this._utils)], o = () => {
      for (; u.length !== 0; ) {
        let i = u.shift(), D = this._applyNormalization(i, r);
        u.push(...D);
      }
    };
    o();
    for (let i of Object.keys(this._utils.schemas)) {
      let D = this._utils.schemas[i];
      if (!(i in r)) {
        let s = $t(D.default(this._utils));
        "value" in s && u.push({ [i]: s.value });
      }
    }
    o();
    for (let i of Object.keys(this._utils.schemas)) {
      if (!(i in r)) continue;
      let D = this._utils.schemas[i], s = r[i], a = D.postprocess(s, this._utils);
      a !== Ae && (this._applyValidation(a, i, D), r[i] = a);
    }
    return this._applyPostprocess(r), this._applyRequiredCheck(r), r;
  }
  _applyNormalization(e, r) {
    let n = [], { knownKeys: u, unknownKeys: o } = this._partitionOptionKeys(e);
    for (let i of u) {
      let D = this._utils.schemas[i], s = D.preprocess(e[i], this._utils);
      this._applyValidation(s, i, D);
      let a = ({ from: m, to: f }) => {
        n.push(typeof f == "string" ? { [f]: m } : { [f.key]: f.value });
      }, c = ({ value: m, redirectTo: f }) => {
        let F = Kt(D.deprecated(m, this._utils), s, true);
        if (F !== false) if (F === true) this._hasDeprecationWarned(i) || this._utils.logger.warn(this._deprecatedHandler(i, f, this._utils));
        else for (let { value: d } of F) {
          let E = { key: i, value: d };
          if (!this._hasDeprecationWarned(E)) {
            let C = typeof f == "string" ? { key: f, value: d } : f;
            this._utils.logger.warn(this._deprecatedHandler(E, C, this._utils));
          }
        }
      };
      dt(D.forward(s, this._utils), s).forEach(a);
      let l = Ht(D.redirect(s, this._utils), s);
      if (l.redirect.forEach(a), "remain" in l) {
        let m = l.remain;
        r[i] = i in r ? D.overlap(r[i], m, this._utils) : m, c({ value: m });
      }
      for (let { from: m, to: f } of l.redirect) c({ value: m, redirectTo: f });
    }
    for (let i of o) {
      let D = e[i];
      this._applyUnknownHandler(i, D, r, (s, a) => {
        n.push({ [s]: a });
      });
    }
    return n;
  }
  _applyRequiredCheck(e) {
    for (let r of Object.keys(this._utils.schemas)) if (this._identifyMissing(r, e) && this._identifyRequired(r)) throw this._invalidHandler(r, Dt, this._utils);
  }
  _partitionOptionKeys(e) {
    let [r, n] = vn(Object.keys(e).filter((u) => !this._identifyMissing(u, e)), (u) => u in this._utils.schemas);
    return { knownKeys: r, unknownKeys: n };
  }
  _applyValidation(e, r, n) {
    let u = Gt(n.validate(e, this._utils), e);
    if (u !== true) throw this._invalidHandler(r, u.value, this._utils);
  }
  _applyUnknownHandler(e, r, n, u) {
    let o = this._unknownHandler(e, r, this._utils);
    if (o) for (let i of Object.keys(o)) {
      if (this._identifyMissing(i, o)) continue;
      let D = o[i];
      i in this._utils.schemas ? u(i, D) : n[i] = D;
    }
  }
  _applyPostprocess(e) {
    let r = this._postprocess(e, this._utils);
    if (r !== Ae) {
      if (r.delete) for (let n of r.delete) delete e[n];
      if (r.override) {
        let { knownKeys: n, unknownKeys: u } = this._partitionOptionKeys(r.override);
        for (let o of n) {
          let i = r.override[o];
          this._applyValidation(i, o, this._utils.schemas[o]), e[o] = i;
        }
        for (let o of u) {
          let i = r.override[o];
          this._applyUnknownHandler(o, i, e, (D, s) => {
            let a = this._utils.schemas[D];
            this._applyValidation(s, D, a), e[D] = s;
          });
        }
      }
    }
  }
};
var Jt;
function Uo(t, e, { logger: r = false, isCLI: n = false, passThrough: u = false, FlagSchema: o, descriptor: i } = {}) {
  if (n) {
    if (!o) throw new Error("'FlagSchema' option is required.");
    if (!i) throw new Error("'descriptor' option is required.");
  } else i = ie;
  let D = u ? Array.isArray(u) ? (l, m) => u.includes(l) ? { [l]: m } : void 0 : (l, m) => ({ [l]: m }) : (l, m, f) => {
    let { _: F, ...d } = f.schemas;
    return ct(l, m, { ...f, schemas: d });
  }, s = Vo(e, { isCLI: n, FlagSchema: o }), a = new ht(s, { logger: r, unknown: D, descriptor: i }), c = r !== false;
  c && Jt && (a._hasDeprecationWarned = Jt);
  let p = a.normalize(t);
  return c && (Jt = a._hasDeprecationWarned), p;
}
function Vo(t, { isCLI: e, FlagSchema: r }) {
  let n = [];
  e && n.push(lt.create({ name: "_" }));
  for (let u of t) n.push(Wo(u, { isCLI: e, optionInfos: t, FlagSchema: r })), u.alias && e && n.push(ft.create({ name: u.alias, sourceName: u.name }));
  return n;
}
function Wo(t, { isCLI: e, optionInfos: r, FlagSchema: n }) {
  let { name: u } = t, o = { name: u }, i, D = {};
  switch (t.type) {
    case "int":
      i = Ct, e && (o.preprocess = Number);
      break;
    case "string":
      i = Ye;
      break;
    case "choice":
      i = Ft, o.choices = t.choices.map((s) => s?.redirect ? { ...s, redirect: { to: { key: t.name, value: s.redirect } } } : s);
      break;
    case "boolean":
      i = mt;
      break;
    case "flag":
      i = n, o.flags = r.flatMap((s) => [s.alias, s.description && s.name, s.oppositeDescription && `no-${s.name}`].filter(Boolean));
      break;
    case "path":
      i = Ye;
      break;
    default:
      throw new Error(`Unexpected type ${t.type}`);
  }
  if (t.exception ? o.validate = (s, a, c) => t.exception(s) || a.validate(s, c) : o.validate = (s, a, c) => s === void 0 || a.validate(s, c), t.redirect && (D.redirect = (s) => s ? { to: typeof t.redirect == "string" ? t.redirect : { key: t.redirect.option, value: t.redirect.value } } : void 0), t.deprecated && (D.deprecated = true), e && !t.array) {
    let s = o.preprocess || ((a) => a);
    o.preprocess = (a, c, p) => c.preprocess(s(Array.isArray(a) ? y(0, a, -1) : a), p);
  }
  return t.array ? pt.create({ ...e ? { preprocess: (s) => Array.isArray(s) ? s : [s] } : {}, ...D, valueSchema: i.create(o) }) : i.create({ ...o, ...D });
}
var $n = Uo;
var $o = Array.prototype.findLast ?? function(t) {
  for (let e = this.length - 1; e >= 0; e--) {
    let r = this[e];
    if (t(r, e, this)) return r;
  }
}, zo = X("findLast", function() {
  if (Array.isArray(this)) return $o;
}), qt = zo;
var zn = /* @__PURE__ */ Symbol.for("PRETTIER_IS_FRONT_MATTER"), Xt = [];
function Go(t) {
  return !!t?.[zn];
}
var pe = Go;
var Gn = /* @__PURE__ */ new Set(["yaml", "toml"]), je = ({ node: t }) => pe(t) && Gn.has(t.language);
async function Qt(t, e, r, n) {
  let { node: u } = r, { language: o } = u;
  if (!Gn.has(o)) return;
  let i = u.value.trim(), D;
  if (i) {
    let s = o === "yaml" ? o : st(n, { language: o });
    if (!s) return;
    D = i ? await t(i, { parser: s }) : "";
  } else D = i;
  return Xe([u.startDelimiter, u.explicitLanguage ?? "", W, D, D ? W : "", u.endDelimiter]);
}
function Ko(t, e) {
  return je({ node: t }) && (delete e.end, delete e.raw, delete e.value), e;
}
var Zt = Ko;
function Ho({ node: t }) {
  return t.raw;
}
var er = Ho;
var Kn = /* @__PURE__ */ new Set(["tokens", "comments", "parent", "enclosingNode", "precedingNode", "followingNode"]), Jo = (t) => Object.keys(t).filter((e) => !Kn.has(e));
function qo(t, e) {
  let r = t ? (n) => t(n, Kn) : Jo;
  return e ? new Proxy(r, { apply: (n, u, o) => pe(o[0]) ? Xt : Reflect.apply(n, u, o) }) : r;
}
var tr = qo;
function rr(t, e) {
  if (!e) throw new Error("parserName is required.");
  let r = qt(0, t, (u) => u.parsers && le(u.parsers, e));
  if (r) return r;
  let n = `Couldn't resolve parser "${e}".`;
  throw n += " Plugins must be explicitly added to the standalone bundle.", new Le(n);
}
function Hn(t, e) {
  if (!e) throw new Error("astFormat is required.");
  let r = qt(0, t, (u) => u.printers && le(u.printers, e));
  if (r) return r;
  let n = `Couldn't find plugin for AST format "${e}".`;
  throw n += " Plugins must be explicitly added to the standalone bundle.", new Le(n);
}
function Ue({ plugins: t, parser: e }) {
  let r = rr(t, e);
  return nr(r, e);
}
function nr(t, e) {
  let r = t.parsers[e];
  return typeof r == "function" ? r() : r;
}
async function Jn(t, e) {
  let r = t.printers[e], n = typeof r == "function" ? await r() : r;
  return Zo(n);
}
function Xo(t) {
  let { features: e, getVisitorKeys: r, embed: n, massageAstNode: u, print: o, ...i } = t;
  e = ni(e);
  let D = e.experimental_frontMatterSupport;
  r = tr(r, D.massageAstNode || D.embed || D.print);
  let s = u;
  u && D.massageAstNode && (s = new Proxy(u, { apply(l, m, f) {
    return Zt(...f), Reflect.apply(l, m, f);
  } }));
  let a = n;
  if (n) {
    let l;
    a = new Proxy(n, { get(m, f, F) {
      return f === "getVisitorKeys" ? (l ?? (l = n.getVisitorKeys ? tr(n.getVisitorKeys, D.massageAstNode || D.embed) : r), l) : Reflect.get(m, f, F);
    }, apply: (m, f, F) => D.embed && je(...F) ? Qt : Reflect.apply(m, f, F) });
  }
  let c = o;
  return D.print && (c = new Proxy(o, { apply(l, m, f) {
    let [F] = f;
    return pe(F.node) ? er(F) : Reflect.apply(l, m, f);
  } })), { features: e, getVisitorKeys: r, embed: a, massageAstNode: s, print: c, ...i };
}
var Qo = /* @__PURE__ */ new WeakMap();
function Zo(t) {
  return Fe(Qo, t, Xo);
}
var ei = ["clean", "embed", "print"], ti = Object.fromEntries(ei.map((t) => [t, false]));
function ri(t) {
  return { ...ti, ...t };
}
function ni(t) {
  return { experimental_avoidAstMutation: false, ...t, experimental_frontMatterSupport: ri(t?.experimental_frontMatterSupport) };
}
var qn = { astFormat: "estree", printer: {}, originalText: void 0, locStart: null, locEnd: null, getVisitorKeys: null };
async function ui(t, e = {}) {
  let r = { ...t };
  if (!r.parser) {
    if (!r.filepath) throw new Me("No parser and no file path given, couldn't infer a parser.");
    if (r.parser = st(r, { physicalFile: r.filepath }), !r.parser) throw new Me(`No parser could be inferred for file "${r.filepath}".`);
  }
  let n = it({ plugins: t.plugins, showDeprecated: true }).options, u = { ...qn, ...Object.fromEntries(n.filter((p) => p.default !== void 0).map((p) => [p.name, p.default])) }, o = rr(r.plugins, r.parser), i = await nr(o, r.parser);
  r.astFormat = i.astFormat, r.locEnd = i.locEnd, r.locStart = i.locStart;
  let D = o.printers?.[i.astFormat] ? o : Hn(r.plugins, i.astFormat), s = await Jn(D, i.astFormat);
  r.printer = s, r.getVisitorKeys = s.getVisitorKeys;
  let a = D.defaultOptions ? Object.fromEntries(Object.entries(D.defaultOptions).filter(([, p]) => p !== void 0)) : {}, c = { ...u, ...a };
  for (let [p, l] of Object.entries(c)) r[p] ?? (r[p] = l);
  return r.parser === "json" && (r.trailingComma = "none"), $n(r, n, { passThrough: Object.keys(qn), ...e });
}
var se = ui;
var Xn = /\r\n|[\n\r\u2028\u2029]/;
function oi(t, e, r, n) {
  let u = { column: null, line: -1, ...t.start }, o = { ...u, ...t.end }, { linesAbove: i = 2, linesBelow: D = 3 } = r || {}, s = u.line - n, a = u.column, c = o.line - n, p = o.column, l = Math.max(s - (i + 1), 0), m = Math.min(e.length, c + D);
  s === -1 && (l = 0), c === -1 && (m = e.length);
  let f = c - s, F = {};
  if (f) for (let d = 0; d <= f; d++) {
    let E = d + s;
    if (a == null) F[E] = true;
    else if (d === 0) {
      let C = e[E - 1].length;
      F[E] = [a, C - a];
    } else if (d === f) F[E] = [0, p];
    else {
      let C = e[E - 1].length;
      F[E] = [0, C];
    }
  }
  else if (a === p) a != null ? F[s] = [a, 0] : F[s] = true;
  else {
    let d = a ?? 0, E = p ?? d;
    F[s] = [d, E - d];
  }
  return { start: l, end: m, markerLines: F };
}
function Qn(t, e, r = {}, n) {
  let { defs: u, highlight: o } = { defs: { gutter: String, marker: String, message: String, reset: String }, highlight: String }, i = (r.startLine || 1) - 1, D = t.split(Xn), { start: s, end: a, markerLines: c } = oi(e, D, r, i), p = e.start && typeof e.start.column == "number", l = String(a + i).length, f = o(t).split(Xn, a).slice(s, a).map((F, d) => {
    let E = s + 1 + d, h = ` ${` ${E + i}`.slice(-l)} |`, _ = c[E], P = !c[E + 1];
    if (_) {
      let A = "";
      if (Array.isArray(_)) {
        let B = F.slice(0, _[0]).replace(/[^\t]/g, " "), J = _[1] || 1;
        A = [`
 `, u.gutter(h.replace(/\d/g, " ")), " ", B, u.marker("^").repeat(J)].join(""), P && r.message && (A += " " + u.message(r.message));
      }
      return [u.marker(">"), u.gutter(h), F.length > 0 ? ` ${F}` : "", A].join("");
    } else return ` ${u.gutter(h)}${F.length > 0 ? ` ${F}` : ""}`;
  }).join(`
`);
  return r.message && !p && (f = `${" ".repeat(l + 1)}${r.message}
${f}`), u.reset(f);
}
function Zn(t, e, r = {}) {
  return Qn(t, e, r);
}
async function ii(t, e) {
  let r = await Ue(e), n = r.preprocess ? await r.preprocess(t, e) : t;
  e.originalText = n;
  let u;
  try {
    u = await r.parse(n, e, e);
  } catch (o) {
    si(o, t);
  }
  return { text: n, ast: u };
}
function si(t, e) {
  let { loc: r } = t;
  if (r) {
    let { start: n, end: u } = r;
    n && (n = { line: n.line, column: n.column - 1 }), u && (u = { line: u.line, column: u.column - 1 });
    let o = Zn(e, { start: n, end: u }, { });
    t.message += `
` + o, t.codeFrame = o;
  }
  throw t;
}
var me = ii;
async function eu(t, e, r, n, u) {
  if (r.embeddedLanguageFormatting !== "auto") return;
  let { printer: o } = r, { embed: i } = o;
  if (!i) return;
  if (i.length > 2) throw new Error("printer.embed has too many parameters. The API changed in Prettier v3. Please update your plugin. See https://prettier.io/docs/plugins#optional-embed");
  let { hasPrettierIgnore: D } = o, { getVisitorKeys: s } = i, a = [];
  l();
  let c = t.stack;
  for (let { print: m, node: f, pathStack: F } of a) try {
    t.stack = F;
    let d = await m(p, e, t, r);
    d && u.set(f, d);
  } catch (d) {
    if (globalThis.PRETTIER_DEBUG) throw d;
  }
  t.stack = c;
  function p(m, f) {
    return Di(m, f, r, n);
  }
  function l() {
    let { node: m } = t;
    if (m === null || typeof m != "object" || D?.(t)) return;
    for (let F of s(m)) Array.isArray(m[F]) ? t.each(l, F) : t.call(l, F);
    let f = i(t, r);
    if (f) {
      if (typeof f == "function") {
        a.push({ print: f, node: m, pathStack: [...t.stack] });
        return;
      }
      u.set(m, f);
    }
  }
}
async function Di(t, e, r, n) {
  let u = await se({ ...r, ...e, parentParser: r.parser, originalText: t, cursorOffset: void 0, rangeStart: void 0, rangeEnd: void 0 }, { passThrough: true }), { ast: o } = await me(t, u), i = await n(o, u);
  return He(i);
}
function ai(t, e, r, n) {
  let { originalText: u, [ue]: o, locStart: i, locEnd: D, [/* @__PURE__ */ Symbol.for("printedComments")]: s } = e, { node: a } = t, c = i(a), p = D(a);
  for (let m of o) i(m) >= c && D(m) <= p && s.add(m);
  let { printPrettierIgnored: l } = e.printer;
  return l ? l(t, e, r, n) : u.slice(c, p);
}
var tu = ai;
async function Ve(t, e) {
  ({ ast: t } = await ur(t, e));
  let r = /* @__PURE__ */ new Map(), n = new en(t), o = /* @__PURE__ */ new Map();
  await eu(n, D, e, Ve, o);
  let i = await ru(n, e, D, void 0, o);
  if (mn(e), e.cursorOffset >= 0) {
    if (e.nodeAfterCursor && !e.nodeBeforeCursor) return [ee, i];
    if (e.nodeBeforeCursor && !e.nodeAfterCursor) return [i, ee];
  }
  return i;
  function D(a, c) {
    return a === void 0 || a === n ? s(c) : Array.isArray(a) ? n.call(() => s(c), ...a) : n.call(() => s(c), a);
  }
  function s(a) {
    let c = n.node;
    if (c == null) return "";
    let p = ge(c) && a === void 0;
    if (p && r.has(c)) return r.get(c);
    let l = ru(n, e, D, a, o);
    return p && r.set(c, l), l;
  }
}
function ru(t, e, r, n, u) {
  let { node: o } = t, { printer: i } = e, D;
  switch (i.hasPrettierIgnore?.(t) ? D = tu(t, e, r, n) : u.has(o) ? D = u.get(o) : D = i.print(t, e, r, n), o) {
    case e.cursorNode:
      D = Ee(D, (s) => [ee, s, ee]);
      break;
    case e.nodeBeforeCursor:
      D = Ee(D, (s) => [s, ee]);
      break;
    case e.nodeAfterCursor:
      D = Ee(D, (s) => [ee, s]);
      break;
  }
  return i.printComment && rt(o.comments) && !i.willPrintOwnComments?.(t, e) && (D = pn(t, D, e)), D;
}
async function ur(t, e) {
  let r = t.comments ?? [];
  e[ue] = r, e[/* @__PURE__ */ Symbol.for("printedComments")] = /* @__PURE__ */ new Set(), an(t, e);
  let { printer: { preprocess: n } } = e;
  return t = n ? await n(t, e) : t, { ast: t, comments: r };
}
function ci(t, e) {
  let { cursorOffset: r, locStart: n, locEnd: u, getVisitorKeys: o } = e, i = (m) => n(m) <= r && u(m) >= r, D = t, s = [t];
  for (let m of nn(t, { getVisitorKeys: o, filter: i })) s.push(m), D = m;
  if (un(D, { getVisitorKeys: o })) return { cursorNode: D };
  let a, c, p = -1, l = Number.POSITIVE_INFINITY;
  for (; s.length > 0 && (a === void 0 || c === void 0); ) {
    D = s.pop();
    let m = a !== void 0, f = c !== void 0;
    for (let F of ye(D, { getVisitorKeys: o })) {
      if (!m) {
        let d = u(F);
        d <= r && d > p && (a = F, p = d);
      }
      if (!f) {
        let d = n(F);
        d >= r && d < l && (c = F, l = d);
      }
    }
  }
  return { nodeBeforeCursor: a, nodeAfterCursor: c };
}
var or = ci;
function fi(t, e) {
  let { printer: r } = e, n = r.massageAstNode;
  if (!n) return t;
  let { getVisitorKeys: u } = r, { ignoredProperties: o } = n;
  return i(t);
  function i(D, s) {
    if (!ge(D)) return D;
    if (Array.isArray(D)) return D.map((l) => i(l, s)).filter(Boolean);
    let a = {}, c = new Set(u(D));
    for (let l in D) !le(D, l) || o?.has(l) || (c.has(l) ? a[l] = i(D[l], D) : a[l] = D[l]);
    let p = n(D, a, s);
    if (p !== null) return p ?? a;
  }
}
var nu = fi;
var li = Array.prototype.findLastIndex ?? function(t) {
  for (let e = this.length - 1; e >= 0; e--) {
    let r = this[e];
    if (t(r, e, this)) return e;
  }
  return -1;
}, pi = X("findLastIndex", function() {
  if (Array.isArray(this)) return li;
}), uu = pi;
function mi(t, e) {
  return e = new Set(e), t.find((r) => su.has(r.type) && e.has(r));
}
function ou(t) {
  let e = uu(0, t, (r) => r.type !== "Program" && r.type !== "File");
  return e === -1 ? t : t.slice(0, e + 1);
}
function di(t, e, { locStart: r, locEnd: n }) {
  let [u, ...o] = t, [i, ...D] = e;
  if (u === i) return [u, i];
  let s = r(u);
  for (let c of ou(D)) if (r(c) >= s) i = c;
  else break;
  let a = n(i);
  for (let c of ou(o)) {
    if (n(c) <= a) u = c;
    else break;
    if (u === i) break;
  }
  return [u, i];
}
function ir(t, e, r, n, u = [], o, i) {
  let { locStart: D, locEnd: s } = i, a = D(t), c = s(t);
  if (e > c || e < a || o === "rangeEnd" && e === a || o === "rangeStart" && e === c) return;
  let p = [t, ...u], l = ot(t, p, { cache: Ut, locStart: D, locEnd: s, getVisitorKeys: r.getVisitorKeys, filter: r.printer.canAttachComment, getChildren: r.printer.getCommentChildNodes });
  for (let m of l) {
    let f = ir(m, e, r, n, p, o, i);
    if (f) return f;
  }
  if (n(t, u[0])) return p;
}
function Fi(t, e) {
  return e !== "DeclareExportDeclaration" && t !== "TypeParameterDeclaration" && (t === "Directive" || t === "TypeAlias" || t === "TSExportAssignment" || t.startsWith("Declare") || t.startsWith("TSDeclare") || t.endsWith("Statement") || t.endsWith("Declaration"));
}
var su = /* @__PURE__ */ new Set(["JsonRoot", "ObjectExpression", "ArrayExpression", "StringLiteral", "NumericLiteral", "BooleanLiteral", "NullLiteral", "UnaryExpression", "TemplateLiteral"]), Ei = /* @__PURE__ */ new Set(["OperationDefinition", "FragmentDefinition", "VariableDefinition", "TypeExtensionDefinition", "ObjectTypeDefinition", "FieldDefinition", "DirectiveDefinition", "EnumTypeDefinition", "EnumValueDefinition", "InputValueDefinition", "InputObjectTypeDefinition", "SchemaDefinition", "OperationTypeDefinition", "InterfaceTypeDefinition", "UnionTypeDefinition", "ScalarTypeDefinition"]);
function iu(t, e, r) {
  if (!e) return false;
  switch (t.parser) {
    case "flow":
    case "hermes":
    case "babel":
    case "babel-flow":
    case "babel-ts":
    case "typescript":
    case "acorn":
    case "espree":
    case "meriyah":
    case "oxc":
    case "oxc-ts":
    case "yuku":
    case "yuku-ts":
    case "__babel_estree":
      return Fi(e.type, r?.type);
    case "json":
    case "json5":
    case "jsonc":
    case "json-stringify":
      return su.has(e.type);
    case "graphql":
      return Ei.has(e.kind);
    case "vue":
      return e.tag !== "root";
  }
  return false;
}
function Du(t, e, r) {
  let { rangeStart: n, rangeEnd: u } = e;
  let o = t.slice(n, u).search(/\S/), i = o === -1;
  if (!i) for (n += o; u > n && !/\S/.test(t[u - 1]); --u) ;
  let D = e.printer.features?.experimental_locForRangeFormat ?? e, s = ir(r, n, e, (f, F) => iu(e, f, F), [], "rangeStart", D);
  if (!s) return;
  let a = i ? s : ir(r, u, e, (f) => iu(e, f), [], "rangeEnd", D);
  if (!a) return;
  let c, p;
  if (r.type === "JsonRoot") {
    let f = mi(s, a);
    c = f, p = f;
  } else [c, p] = di(s, a, e);
  let { locStart: l, locEnd: m } = D;
  return [Math.min(l(c), l(p)), Math.max(m(c), m(p))];
}
var lu = "\uFEFF", au = /* @__PURE__ */ Symbol("cursor");
async function pu(t, e, r = 0) {
  if (!t || t.trim().length === 0) return { formatted: "", cursorOffset: -1, comments: [] };
  let { ast: n, text: u } = await me(t, e);
  e.cursorOffset >= 0 && (e = { ...e, ...or(n, e) });
  let o = await Ve(n, e);
  r > 0 && (o = Qe([W, o], r, e.tabWidth));
  let i = Ce(o, e);
  if (r > 0) {
    let s = i.formatted.trim();
    i.cursorNodeStart !== void 0 && (i.cursorNodeStart -= i.formatted.indexOf(s), i.cursorNodeStart < 0 && (i.cursorNodeStart = 0, i.cursorNodeText = i.cursorNodeText.trimStart()), i.cursorNodeStart + i.cursorNodeText.length > s.length && (i.cursorNodeText = i.cursorNodeText.trimEnd())), i.formatted = s + we(e.endOfLine);
  }
  let D = e[ue];
  if (e.cursorOffset >= 0) {
    let s, a, c, p;
    if ((e.cursorNode || e.nodeBeforeCursor || e.nodeAfterCursor) && i.cursorNodeText) if (c = i.cursorNodeStart, p = i.cursorNodeText, e.cursorNode) s = e.locStart(e.cursorNode), a = u.slice(s, e.locEnd(e.cursorNode));
    else {
      if (!e.nodeBeforeCursor && !e.nodeAfterCursor) throw new Error("Cursor location must contain at least one of cursorNode, nodeBeforeCursor, nodeAfterCursor");
      s = e.nodeBeforeCursor ? e.locEnd(e.nodeBeforeCursor) : 0;
      let E = e.nodeAfterCursor ? e.locStart(e.nodeAfterCursor) : u.length;
      a = u.slice(s, E);
    }
    else s = 0, a = u, c = 0, p = i.formatted;
    let l = e.cursorOffset - s;
    if (a === p) return { formatted: i.formatted, cursorOffset: c + l, comments: D };
    let m = a.split("");
    m.splice(l, 0, au);
    let f = p.split(""), F = xt(m, f), d = c;
    for (let E of F) if (E.removed) {
      if (E.value.includes(au)) break;
    } else d += E.count;
    return { formatted: i.formatted, cursorOffset: d, comments: D };
  }
  return { formatted: i.formatted, cursorOffset: -1, comments: D };
}
async function Ci(t, e) {
  let { ast: r, text: n } = await me(t, e), [u, o] = Du(n, e, r) ?? [0, 0], i = n.slice(u, o), D = Math.min(u, n.lastIndexOf(`
`, u) + 1), s = n.slice(D, u).match(/^\s*/)[0], a = he(s, e.tabWidth), c = await pu(i, { ...e, rangeStart: 0, rangeEnd: Number.POSITIVE_INFINITY, cursorOffset: e.cursorOffset > u && e.cursorOffset <= o ? e.cursorOffset - u : -1, endOfLine: "lf" }, a), p = c.formatted.trimEnd(), { cursorOffset: l } = e;
  l > o ? l += p.length - i.length : c.cursorOffset >= 0 && (l = c.cursorOffset + u);
  let m = n.slice(0, u) + p + n.slice(o);
  if (e.endOfLine !== "lf") {
    let f = we(e.endOfLine);
    l >= 0 && f === `\r
` && (l += Tt(m.slice(0, l), `
`)), m = ne(0, m, `
`, f);
  }
  return { formatted: m, cursorOffset: l, comments: c.comments };
}
function sr(t, e, r) {
  return typeof e != "number" || Number.isNaN(e) || e < 0 || e > t.length ? r : e;
}
function cu(t, e) {
  let { cursorOffset: r, rangeStart: n, rangeEnd: u } = e;
  return r = sr(t, r, -1), n = sr(t, n, 0), u = sr(t, u, t.length), { ...e, cursorOffset: r, rangeStart: n, rangeEnd: u };
}
function mu(t, e) {
  let { cursorOffset: r, rangeStart: n, rangeEnd: u, endOfLine: o } = cu(t, e), i = t.charAt(0) === lu;
  if (i && (t = t.slice(1), r--, n--, u--), o === "auto" && (o = Cr(t)), t.includes("\r")) {
    let D = (s) => Tt(t.slice(0, Math.max(s, 0)), `\r
`);
    r -= D(r), n -= D(n), u -= D(u), t = hr(t);
  }
  return { hasBOM: i, text: t, options: cu(t, { ...e, cursorOffset: r, rangeStart: n, rangeEnd: u, endOfLine: o }) };
}
async function fu(t, e) {
  let r = await Ue(e);
  return !r.hasPragma || r.hasPragma(t);
}
async function hi(t, e) {
  return (await Ue(e)).hasIgnorePragma?.(t);
}
async function Dr(t, e) {
  let { hasBOM: r, text: n, options: u } = mu(t, await se(e));
  if (u.rangeStart >= u.rangeEnd && n !== "" || u.requirePragma && !await fu(n, u) || u.checkIgnorePragma && await hi(n, u)) return { formatted: t, cursorOffset: e.cursorOffset, comments: [] };
  let o;
  return u.rangeStart > 0 || u.rangeEnd < n.length ? o = await Ci(n, u) : (!u.requirePragma && u.insertPragma && u.printer.insertPragma && !await fu(n, u) && (n = u.printer.insertPragma(n)), o = await pu(n, u)), r && (o.formatted = lu + o.formatted, o.cursorOffset >= 0 && o.cursorOffset++), o;
}
async function du(t, e, r) {
  let { text: n, options: u } = mu(t, await se(e)), o = await me(n, u);
  return r && (r.preprocessForPrint && (o.ast = await ur(o.ast, u)), r.massage && (o.ast = nu(o.ast, u))), o;
}
async function Fu(t, e) {
  e = await se(e);
  let r = await Ve(t, e);
  return Ce(r, e);
}
async function Eu(t, e) {
  let r = Ur(t), { formatted: n } = await Dr(r, { ...e, parser: "__js_expression" });
  return n;
}
async function Cu(t, e) {
  e = await se(e);
  let { ast: r } = await me(t, e);
  return e.cursorOffset >= 0 && (e = { ...e, ...or(r, e) }), Ve(r, e);
}
async function hu(t, e) {
  return Ce(t, await se(e));
}
var ar = {};
yt(ar, { builders: () => _i, printer: () => yi, utils: () => Ai });
var _i = { join: be, line: Ze, softline: Mr, hardline: W, literalline: Je, group: wt, conditionalGroup: Ir, fill: kr, lineSuffix: Ie, lineSuffixBoundary: Yr, cursor: ee, breakParent: ae, ifBreak: Rr, trim: jr, indent: oe, indentIfBreak: vr, align: De, addAlignmentToDoc: Qe, markAsRoot: Xe, dedentToRoot: Sr, dedent: br, hardlineWithoutBreakParent: ke, literallineWithoutBreakParent: Ot, label: Lr, concat: (t) => t }, yi = { printDocToString: Ce }, Ai = { willBreak: xr, traverseDoc: Oe, findInDoc: Ke, mapDoc: Se, removeLines: Tr, stripTrailingHardline: He, replaceEndOfLine: Nr, canBreak: wr };
var gu = "3.9.6";
var fr = {};
yt(fr, { addDanglingComment: () => re, addLeadingComment: () => ce, addTrailingComment: () => fe, getAlignmentSize: () => he, getIndentSize: () => _u, getMaxContinuousCount: () => yu, getNextNonSpaceNonCommentCharacter: () => Au, getNextNonSpaceNonCommentCharacterIndex: () => vi, getPreferredQuote: () => Tu, getStringWidth: () => Re, hasNewline: () => H, hasNewlineInRange: () => Nu, hasSpaces: () => wu, isNextLineEmpty: () => Ui, isNextLineEmptyAfterIndex: () => gt, isPreviousLineEmpty: () => Mi, makeString: () => ji, skip: () => _e, skipEverythingButNewLine: () => ut, skipInlineComment: () => Be, skipNewline: () => $, skipSpaces: () => j, skipToLineEnd: () => nt, skipTrailingComment: () => Te, skipWhitespace: () => tn });
function xi(t, e) {
  if (e === false) return false;
  if (t.charAt(e) === "/" && t.charAt(e + 1) === "*") {
    for (let r = e + 2; r < t.length; ++r) if (t.charAt(r) === "*" && t.charAt(r + 1) === "/") return r + 2;
  }
  return e;
}
var Be = xi;
function Bi(t, e) {
  return e === false ? false : t.charAt(e) === "/" && t.charAt(e + 1) === "/" ? ut(t, e) : e;
}
var Te = Bi;
function Ti(t, e) {
  let r = null, n = e;
  for (; n !== r; ) r = n, n = j(t, n), n = Be(t, n), n = Te(t, n), n = $(t, n);
  return n;
}
var We = Ti;
function Ni(t, e) {
  let r = null, n = e;
  for (; n !== r; ) r = n, n = nt(t, n), n = Be(t, n), n = j(t, n);
  return n = Te(t, n), n = $(t, n), n !== false && H(t, n);
}
var gt = Ni;
function wi(t, e) {
  let r = t.lastIndexOf(`
`);
  return r === -1 ? 0 : he(t.slice(r + 1).match(/^[\t ]*/)[0], e);
}
var _u = wi;
function cr(t) {
  if (typeof t != "string") throw new TypeError("Expected a string");
  return t.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
function Oi(t, e) {
  let r = t.matchAll(new RegExp(`(?:${cr(e)})+`, "g"));
  return r.reduce || (r = [...r]), r.reduce((n, [u]) => Math.max(n, u.length), 0) / e.length;
}
var yu = Oi;
function Pi(t, e) {
  let r = We(t, e);
  return r === false ? "" : t.charAt(r);
}
var Au = Pi;
var xu = Object.freeze({ character: "'", codePoint: 39 }), Bu = Object.freeze({ character: '"', codePoint: 34 }), Si = Object.freeze({ preferred: xu, alternate: Bu }), bi = Object.freeze({ preferred: Bu, alternate: xu });
function Tu(t, e) {
  let { preferred: r, alternate: n } = e === true || e === "'" ? Si : bi, { length: u } = t, o = 0, i = 0;
  for (let D = 0; D < u; D++) {
    let s = t.charCodeAt(D);
    s === r.codePoint ? o++ : s === n.codePoint && i++;
  }
  return (o > i ? n : r).character;
}
function ki(t, e, r) {
  for (let n = e; n < r; ++n) if (t.charAt(n) === `
`) return true;
  return false;
}
var Nu = ki;
function Ii(t, e, r = {}) {
  return j(t, r.backwards ? e - 1 : e, r) !== e;
}
var wu = Ii;
function Ri(t, e, r) {
  return We(t, r(e));
}
function vi(t, e) {
  return arguments.length === 2 || typeof e == "number" ? We(t, e) : Ri(...arguments);
}
function Li(t, e, r) {
  return ve(t, r(e));
}
function Mi(t, e) {
  return arguments.length === 2 || typeof e == "number" ? ve(t, e) : Li(...arguments);
}
function Yi(t, e, r) {
  return gt(t, r(e));
}
function ji(t, e, r) {
  let n = e === '"' ? "'" : '"', o = ne(0, t, /\\(.)|(["'])/gs, (i, D, s) => D === n ? D : s === e ? "\\" + s : s || (r && /^[^\n\r"'0-7\\bfnrt-vx\u2028\u2029]$/.test(D) ? D : "\\" + D));
  return e + o + e;
}
function Ui(t, e) {
  return arguments.length === 2 || typeof e == "number" ? gt(t, e) : Yi(...arguments);
}
function de(t, e = 1) {
  return async (...r) => {
    let n = r[e] ?? {}, u = n.plugins ?? [];
    return r[e] = { ...n, plugins: Array.isArray(u) ? u : Object.values(u) }, await t(...r);
  };
}
var Ou = de(Dr);
async function Pu(t, e) {
  let { formatted: r } = await Ou(t, { ...e, cursorOffset: -1 });
  return r;
}
async function Vi(t, e) {
  return await Pu(t, e) === t;
}
var Wi = de(it, 0), $i = { parse: de(du), formatAST: de(Fu), formatDoc: de(Eu), printToDoc: de(Cu), printDocToString: de(hu) };

function generateStory(renderFn, { name, data }) {
  return {
    name,
    args: data,
    render: (_, { loaded }) => loaded.html,
    loaders: [
      // As our template rendering functions and prettier are async, we use storybook's "loader" feature
      // to render them asynchronously.
      async (cx) => {
        const rawStoryHtml = await renderFn({ params: cx.args || cx.initialArgs });
        return {
          html: await Pu(rawStoryHtml, {
            plugins: [Zi],
            parser: "html"
          })
        };
      }
    ]
  };
}
function generateStandaloneExample(renderFn) {
  return {
    render: (_, { loaded }) => loaded.html,
    loaders: [
      // As our template rendering functions and prettier are async, we use storybook's "loader" feature
      // to render them asynchronously.
      async (cx) => {
        return {
          html: await renderFn({ params: cx.args || cx.initialArgs })
        };
      }
    ]
  };
}

export { generateStandaloneExample, generateStory };
