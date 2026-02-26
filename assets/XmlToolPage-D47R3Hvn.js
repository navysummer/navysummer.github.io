import{H as v}from"./index-CjJjtUXp.js";/* empty css               */import{o as D,b as S,a as m,z as g,D as j,C as x,E as N,k as w,t as M}from"./vendor-BJAQRKHk.js";import{_ as P}from"./index-pXj3xARV.js";import"./jquery-BCX6_a_s.js";const T={name:"XmlToolPage",data(){return{title:"XML 工具",input:"",name:"Root",target:"json",output:""}},computed:{codeLang(){return this.getLanguage(this.target)},codeText(){const i=this.codeLang;return this.formatResult(this.output,i)}},watch:{output(){this.$nextTick(()=>this.applyHighlight())},target(){this.$nextTick(()=>this.applyHighlight())}},mounted(){document.title=this.title,this.$nextTick(()=>this.applyHighlight())},methods:{applyHighlight(){const i=this.$refs.code;i&&v.highlightElement(i)},onConvert(){let i=null,t=this.name&&this.name.trim()?this.name.trim():"Root";try{const o=this.parseXml(this.input||"");i=o.obj,t=o.root||t}catch{this.output="非法XML";return}const s=this.target;s==="json"?this.output=JSON.stringify(i,null,2):s==="yaml"?this.output=this.toYaml(i):s==="xmlschema"?this.output=this.toXmlSchemaDeep(i,t):s==="java"?this.output=this.toJavaDeep(i,t):s==="c"?this.output=this.toCDeep(i,t):s==="cpp"?this.output=this.toCppDeep(i,t):s==="python"?this.output=this.toPythonDeep(i,t):s==="rust"?this.output=this.toRustDeep(i,t):s==="go"?this.output=this.toGoDeep(i,t):s==="ts"?this.output=this.toTsDeep(i,t):s==="toon"?this.output=this.toProtoDeep(i,t):s==="csharp"?this.output=this.toCSharpDeep(i,t):s==="dart"?this.output=this.toDartDeep(i,t):s==="swift"?this.output=this.toSwiftDeep(i,t):s==="objc"?this.output=this.toObjCDeep(i,t):s==="ruby"?this.output=this.toRubyDeep(i,t):s==="kotlin"?this.output=this.toKotlinDeep(i,t):s==="php"?this.output=this.toPHPDeep(i,t):s==="sql"?this.output=this.toSQL(i,t):s==="toml"?this.output=this.toToml(i,t):this.output=""},onCopy(){const i=this.output||"",t=document.createElement("textarea");t.value=i,document.body.appendChild(t),t.select(),document.execCommand("copy"),document.body.removeChild(t),alert("已复制")},parseXml(i){const s=new DOMParser().parseFromString(i,"application/xml");if(s.querySelector("parsererror"))throw new Error("parse error");const r=s.documentElement,e=n=>{const a=Array.from(n.childNodes).some(p=>p.nodeType===1),d=Array.from(n.childNodes).filter(p=>p.nodeType===3).map(p=>p.nodeValue.trim()).filter(Boolean).join(" "),c={};if(Array.from(n.attributes||[]).forEach(p=>{c[`attr_${p.name}`]=p.value}),!a)return Object.keys(c).length===0?d||"":{...d?{value:d}:{},...c};const l={};Array.from(n.children).forEach(p=>{const h=p.tagName,$=e(p);l[h]?l[h]=[].concat(l[h],$):l[h]=Array.isArray($)?$:[$]});const y={};return Object.keys(l).forEach(p=>{const h=l[p];y[p]=h.length===1?h[0]:h}),{...y,...c}};return{obj:{[r.tagName]:e(r)},root:this.pascal(r.tagName)}},getLanguage(i){return{json:"json",yaml:"yaml",xmlschema:"xml",java:"java",c:"c",cpp:"cpp",python:"python",rust:"rust",go:"go",ts:"typescript",toon:"proto",csharp:"csharp",dart:"dart",swift:"swift",objc:"objectivec",ruby:"ruby",kotlin:"kotlin",php:"php",sql:"sql",toml:"toml"}[i]||"text"},formatResult(i,t){if(!i)return"";if(t==="xml")return this.prettyXml(i);if(t==="json")try{return JSON.stringify(JSON.parse(i),null,2)}catch{return i}return this.formatCode(i,t)},prettyXml(i){try{const s=new RegExp("(>)(<)(/?)","g");let o=i.replace(s,`$1
$2$3`),r=0;return o.split(`
`).map(e=>{e.match(/^<\/\w/)&&(r=Math.max(r-1,0));const n=r;return e.match(/^<\w[^>]*[^/]>.*$/)&&(r+=1),`${"  ".repeat(n)}${e}`}).join(`
`)}catch{return i}},formatCode(i,t){if(!new Set(["java","c","cpp","rust","go","typescript","csharp","dart","swift","kotlin","php","proto"]).has(t))return i;const o="  ";let r=0;return String(i).split(`
`).map(e=>{const n=e.replace(/\s+$/,"");/^\s*}\)?;?$/.test(n)&&(r=Math.max(r-1,0));const a=r;return/\{\s*$/.test(n)&&(r+=1),`${o.repeat(a)}${n.trimStart()}`}).join(`
`)},escapeHtml(i){return String(i||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")},highlight(i,t){let s=this.escapeHtml(i);const o=(n,a)=>{s=s.replace(a,u=>`<span class="${n}">${u}</span>`)};if(o("hl-string",/"(?:\\.|[^"])*"|'(?:\\.|[^'])*'/g),o("hl-number",/\b-?\d+(?:\.\d+)?\b/g),o("hl-boolean",/\b(true|false)\b/g),o("hl-null",/\b(null)\b/g),t==="json"||t==="yaml"||t==="toml"||t==="xml")return s;const r=/\b(abstract|and|as|assert|break|case|catch|class|const|continue|data|def|default|do|else|enum|extern|final|fn|for|from|function|if|implements|import|in|interface|let|namespace|new|not|or|package|private|protected|public|return|static|struct|switch|this|throw|try|type|typeof|union|using|var|void|while|yield)\b/g,e=/\b(String|Int|Integer|Double|Float|Long|Bool|Boolean|char|void|any|number)\b/g;return o("hl-keyword",r),o("hl-type",e),s},pascal(i){return String(i||"").replace(/[_\-\s]+/g," ").split(" ").map(t=>t?t[0].toUpperCase()+t.slice(1):"").join("")||"Root"},camel(i){const t=this.pascal(i);return t[0].toLowerCase()+t.slice(1)},isInt(i){return typeof i=="number"&&Number.isInteger(i)},typeDesc(i){if(i==null)return{kind:"primitive",type:"any"};if(Array.isArray(i)){const s=i.find(r=>r!=null);return{kind:"array",elem:s!==void 0?this.typeDesc(s):{kind:"primitive",type:"any"}}}const t=typeof i;return t==="object"?{kind:"object"}:t==="string"?{kind:"primitive",type:"string"}:t==="number"?{kind:"primitive",type:this.isInt(i)?"integer":"float"}:t==="boolean"?{kind:"primitive",type:"boolean"}:{kind:"primitive",type:"any"}},buildModels(i,t){const s=[],o=new Map,r=a=>Object.keys(a).sort().map(c=>{const l=this.typeDesc(a[c]);return l.kind==="object"?`${c}:object`:l.kind==="array"?l.elem.kind==="object"?`${c}:array<object>`:l.elem.kind==="primitive"?`${c}:array<${l.elem.type}>`:`${c}:array<any>`:`${c}:${l.type}`}).join("|"),e=(a,u)=>{const d=r(a),c=o.get(d),l=c||this.pascal(u);if(!c){const y=[];return Object.keys(a).forEach(p=>{const h=a[p],$=this.typeDesc(h);if($.kind==="object"){const b=this.pascal(l+this.pascal(p)),k=e(h,b);y.push({key:p,kind:"object",ref:k.name})}else if($.kind==="array"){const b=$.elem;if(b.kind==="object"){const k=this.pascal(l+this.pascal(p)),f=e(h&&h[0]||{},k);y.push({key:p,kind:"array",elem:{kind:"object",ref:f.name}})}else b.kind==="primitive"?y.push({key:p,kind:"array",elem:b}):y.push({key:p,kind:"array",elem:{kind:"primitive",type:"any"}})}else $.kind==="primitive"&&y.push({key:p,kind:"primitive",type:$.type})}),s.push({name:l,fields:y}),o.set(d,l),{name:l}}return{name:l}},n=Object.keys(i);return n.length===1&&this.typeDesc(i[n[0]]).kind==="object"?e(i[n[0]],t):e(i,t),s},toYaml(i){const t=(s,o)=>{const r=this.typeDesc(s).kind;return r==="object"?Object.keys(s).map(e=>`${o}${e}: ${["object","array"].includes(this.typeDesc(s[e]).kind)?`
`+t(s[e],o+"  "):t(s[e],"")}`).join(`
`):r==="array"?s.map(e=>`${o}- ${["object","array"].includes(this.typeDesc(e).kind)?`
`+t(e,o+"  "):t(e,"")}`).join(`
`):typeof s=="string"?`${JSON.stringify(s)}`:`${s}`};return t(i,"")},toXmlSchemaDeep(i,t){var a;const s=this.buildModels(i,t),o=u=>u==="string"?"xs:string":u==="integer"?"xs:integer":u==="float"?"xs:double":u==="boolean"?"xs:boolean":"xs:string",r=u=>{const d=[];return d.push(`<xs:complexType name="${u.name}">`),d.push("  <xs:sequence>"),u.fields.forEach(c=>{if(c.kind==="primitive")d.push(`    <xs:element name="${c.key}" type="${o(c.type)}" minOccurs="0"/>`);else if(c.kind==="object")d.push(`    <xs:element name="${c.key}" type="${c.ref}" minOccurs="0"/>`);else if(c.kind==="array"){const l=c.elem,y=l.kind==="primitive"?o(l.type):l.kind==="object"?l.ref:"xs:string";d.push(`    <xs:element name="${c.key}" type="${y}" minOccurs="0" maxOccurs="unbounded"/>`)}}),d.push("  </xs:sequence>"),d.push("</xs:complexType>"),d.join(`
`)},e=s.map(r).join(`

`),n=((a=s[0])==null?void 0:a.name)||this.pascal(t);return`<?xml version="1.0" encoding="UTF-8"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">
${e}

<xs:element name="${this.pascal(t)}" type="${n}"/>
</xs:schema>`},toJavaDeep(i,t){const s=this.buildModels(i,t),o=e=>e==="string"?"String":e==="integer"?"long":e==="float"?"double":e==="boolean"?"boolean":"Object",r=e=>{if(e.kind==="primitive")return`  private ${o(e.type)} ${this.camel(e.key)};`;if(e.kind==="object")return`  private ${e.ref} ${this.camel(e.key)};`;if(e.kind==="array"){const n=e.elem;return`  private java.util.List<${n.kind==="primitive"?o(n.type):n.kind==="object"?n.ref:"Object"}> ${this.camel(e.key)};`}return`  private Object ${this.camel(e.key)};`};return s.map(e=>`public class ${e.name} {
${e.fields.map(r).join(`
`)}
}`).join(`

`)},toCDeep(i,t){const s=this.buildModels(i,t),o=e=>e==="string"?"char*":e==="integer"?"long":e==="float"?"double":e==="boolean"?"bool":"void*",r=e=>{if(e.kind==="primitive")return`  ${o(e.type)} ${this.camel(e.key)};`;if(e.kind==="object")return`  struct ${e.ref}* ${this.camel(e.key)};`;if(e.kind==="array"){const n=e.elem;return n.kind==="object"?`  struct ${n.ref}* ${this.camel(e.key)};`:n.kind==="primitive"?`  ${o(n.type)}* ${this.camel(e.key)};`:`  void* ${this.camel(e.key)};`}return`  void* ${this.camel(e.key)};`};return s.map(e=>`typedef struct ${e.name} {
${e.fields.map(r).join(`
`)}
} ${e.name};`).join(`

`)},toCppDeep(i,t){const s=this.buildModels(i,t),o=e=>e==="string"?"std::string":e==="integer"?"long long":e==="float"?"double":e==="boolean"?"bool":"std::any",r=e=>{if(e.kind==="primitive")return`  ${o(e.type)} ${this.camel(e.key)};`;if(e.kind==="object")return`  ${e.ref} ${this.camel(e.key)};`;if(e.kind==="array"){const n=e.elem;return`  std::vector<${n.kind==="primitive"?o(n.type):n.kind==="object"?n.ref:"std::any"}> ${this.camel(e.key)};`}return`  std::any ${this.camel(e.key)};`};return s.map(e=>`class ${e.name} {
public:
${e.fields.map(r).join(`
`)}
};`).join(`

`)},toPythonDeep(i,t){const s=this.buildModels(i,t),o=e=>e==="string"?"str":e==="integer"?"int":e==="float"?"float":e==="boolean"?"bool":"object",r=e=>{if(e.kind==="primitive")return`    self.${this.camel(e.key)}: ${o(e.type)} = None`;if(e.kind==="object")return`    self.${this.camel(e.key)}: ${e.ref} = None`;if(e.kind==="array"){const n=e.elem,a=n.kind==="primitive"?o(n.type):n.kind==="object"?n.ref:"object";return`    self.${this.camel(e.key)}: list[${a}] = []`}return`    self.${this.camel(e.key)}: object = None`};return s.map(e=>`class ${e.name}:
  def __init__(self):
${e.fields.map(r).join(`
`)}`).join(`

`)},toRustDeep(i,t){const s=this.buildModels(i,t),o=e=>e==="string"?"String":e==="integer"?"i64":e==="float"?"f64":e==="boolean"?"bool":"serde_json::Value",r=e=>{if(e.kind==="primitive")return`  ${this.camel(e.key)}: ${o(e.type)},`;if(e.kind==="object")return`  ${this.camel(e.key)}: ${e.ref},`;if(e.kind==="array"){const n=e.elem,a=n.kind==="primitive"?o(n.type):n.kind==="object"?n.ref:"serde_json::Value";return`  ${this.camel(e.key)}: Vec<${a}>,`}return`  ${this.camel(e.key)}: serde_json::Value,`};return s.map(e=>`struct ${e.name} {
${e.fields.map(r).join(`
`)}
}`).join(`

`)},toGoDeep(i,t){const s=this.buildModels(i,t),o=e=>e==="string"?"string":e==="integer"?"int64":e==="float"?"float64":e==="boolean"?"bool":"interface{}",r=e=>{if(e.kind==="primitive")return`  ${this.pascal(e.key)} ${o(e.type)} \`json:"${e.key}"\``;if(e.kind==="object")return`  ${this.pascal(e.key)} ${e.ref} \`json:"${e.key}"\``;if(e.kind==="array"){const n=e.elem,a=n.kind==="primitive"?o(n.type):n.kind==="object"?n.ref:"interface{}";return`  ${this.pascal(e.key)} []${a} \`json:"${e.key}"\``}return`  ${this.pascal(e.key)} interface{} \`json:"${e.key}"\``};return s.map(e=>`type ${e.name} struct {
${e.fields.map(r).join(`
`)}
}`).join(`

`)},toTsDeep(i,t){const s=this.buildModels(i,t),o=e=>e==="string"?"string":e==="integer"||e==="float"?"number":e==="boolean"?"boolean":"any",r=e=>{if(e.kind==="primitive")return`  ${this.camel(e.key)}: ${o(e.type)}`;if(e.kind==="object")return`  ${this.camel(e.key)}: ${e.ref}`;if(e.kind==="array"){const n=e.elem,a=n.kind==="primitive"?o(n.type):n.kind==="object"?n.ref:"any";return`  ${this.camel(e.key)}: ${a}[]`}return`  ${this.camel(e.key)}: any`};return s.map(e=>`class ${e.name} {
${e.fields.map(r).join(`
`)}
}`).join(`

`)},toProtoDeep(i,t){const s=this.buildModels(i,t),o=n=>n==="string"?"string":n==="integer"?"int64":n==="float"?"double":n==="boolean"?"bool":"string",r=(n,a)=>{if(n.kind==="primitive")return`  ${o(n.type)} ${this.camel(n.key)} = ${a};`;if(n.kind==="object")return`  ${n.ref} ${this.camel(n.key)} = ${a};`;if(n.kind==="array"){const u=n.elem;return`  repeated ${u.kind==="primitive"?o(u.type):u.kind==="object"?u.ref:"string"} ${this.camel(n.key)} = ${a};`}return`  string ${this.camel(n.key)} = ${a};`};return`syntax = "proto3";
${s.map(n=>{const a=n.fields.map((u,d)=>r(u,d+1)).join(`
`);return`message ${n.name} {
${a}
}`}).join(`

`)}`},toCSharpDeep(i,t){const s=this.buildModels(i,t),o=e=>e==="string"?"string":e==="integer"?"long":e==="float"?"double":e==="boolean"?"bool":"object",r=e=>{if(e.kind==="primitive")return`  public ${o(e.type)} ${this.pascal(e.key)} { get; set; }`;if(e.kind==="object")return`  public ${e.ref} ${this.pascal(e.key)} { get; set; }`;if(e.kind==="array"){const n=e.elem;return`  public System.Collections.Generic.List<${n.kind==="primitive"?o(n.type):n.kind==="object"?n.ref:"object"}> ${this.pascal(e.key)} { get; set; }`}return`  public object ${this.pascal(e.key)} { get; set; }`};return s.map(e=>`public class ${e.name} {
${e.fields.map(r).join(`
`)}
}`).join(`

`)},toDartDeep(i,t){const s=this.buildModels(i,t),o=e=>e==="string"?"String":e==="integer"?"int":e==="float"?"double":e==="boolean"?"bool":"dynamic",r=e=>{if(e.kind==="primitive")return`  ${o(e.type)} ${this.camel(e.key)};`;if(e.kind==="object")return`  ${e.ref} ${this.camel(e.key)};`;if(e.kind==="array"){const n=e.elem;return`  List<${n.kind==="primitive"?o(n.type):n.kind==="object"?n.ref:"dynamic"}> ${this.camel(e.key)};`}return`  dynamic ${this.camel(e.key)};`};return s.map(e=>`class ${e.name} {
${e.fields.map(r).join(`
`)}
}`).join(`

`)},toSwiftDeep(i,t){const s=this.buildModels(i,t),o=e=>e==="string"?"String":e==="integer"?"Int":e==="float"?"Double":e==="boolean"?"Bool":"Any",r=e=>{if(e.kind==="primitive")return`  let ${this.camel(e.key)}: ${o(e.type)}`;if(e.kind==="object")return`  let ${this.camel(e.key)}: ${e.ref}`;if(e.kind==="array"){const n=e.elem,a=n.kind==="primitive"?o(n.type):n.kind==="object"?n.ref:"Any";return`  let ${this.camel(e.key)}: [${a}]`}return`  let ${this.camel(e.key)}: Any`};return s.map(e=>`struct ${e.name} {
${e.fields.map(r).join(`
`)}
}`).join(`

`)},toObjCDeep(i,t){const s=this.buildModels(i,t),o=e=>e==="string"?"NSString *":e==="integer"||e==="float"?"NSNumber *":e==="boolean"?"BOOL ":"id ",r=e=>{if(e.kind==="primitive")return`@property (nonatomic, strong) ${o(e.type)}${this.camel(e.key)};`;if(e.kind==="object")return`@property (nonatomic, strong) ${e.ref} *${this.camel(e.key)};`;if(e.kind==="array"){const n=e.elem;return`@property (nonatomic, strong) ${n.kind==="primitive"?"NSArray *":n.kind==="object"?`NSArray<${n.ref} *> *`:"NSArray *"}${this.camel(e.key)};`}return`@property (nonatomic, strong) id ${this.camel(e.key)};`};return s.map(e=>`@interface ${e.name} : NSObject
${e.fields.map(r).join(`
`)}
@end`).join(`

`)},toRubyDeep(i,t){return this.buildModels(i,t).map(o=>{const r=o.fields.map(e=>this.camel(e.key)).join(" ");return`class ${o.name}
  attr_accessor ${r}
end`}).join(`

`)},toKotlinDeep(i,t){const s=this.buildModels(i,t),o=e=>e==="string"?"String":e==="integer"?"Long":e==="float"?"Double":e==="boolean"?"Boolean":"Any",r=e=>{if(e.kind==="primitive")return`  val ${this.camel(e.key)}: ${o(e.type)}`;if(e.kind==="object")return`  val ${this.camel(e.key)}: ${e.ref}`;if(e.kind==="array"){const n=e.elem,a=n.kind==="primitive"?o(n.type):n.kind==="object"?n.ref:"Any";return`  val ${this.camel(e.key)}: List<${a}>`}return`  val ${this.camel(e.key)}: Any`};return s.map(e=>`data class ${e.name}(
${e.fields.map(r).join(`,
`)}
)`).join(`

`)},toPHPDeep(i,t){return this.buildModels(i,t).map(o=>{const r=o.fields.map(e=>`  public $${this.camel(e.key)};`).join(`
`);return`<?php
class ${o.name} {
${r}
}
?>`}).join(`

`)},toSQL(i,t){const s=this.camel(t),o=(e,n)=>{const a=this.typeDesc(n);return a.kind==="primitive"?a.type==="string"?`  ${e} TEXT`:a.type==="integer"?`  ${e} INTEGER`:a.type==="float"?`  ${e} REAL`:a.type==="boolean"?`  ${e} BOOLEAN`:`  ${e} TEXT`:a.kind==="array"||a.kind==="object"?`  ${e} JSON`:`  ${e} TEXT`},r=this.typeDesc(i).kind==="object"?Object.keys(i).map(e=>o(e,i[e])).join(`,
`):"  value TEXT";return`CREATE TABLE ${s} (
${r}
);`},toToml(i,t){const s=this.camel(t),o=[],r=(e,n)=>{const a=Object.keys(e),u=[],d=[];a.forEach(c=>{const l=e[c];this.typeDesc(l).kind==="object"?d.push({k:c,v:l}):u.push({k:c,v:l})}),n&&o.push(`[${n}]`),u.forEach(({k:c,v:l})=>{const y=this.typeDesc(l).kind;y==="object"||y==="array"?o.push(`${c} = ${JSON.stringify(l)}`):typeof l=="string"?o.push(`${c} = ${JSON.stringify(l)}`):o.push(`${c} = ${l}`)}),d.forEach(({k:c,v:l})=>r(l,n?`${n}.${c}`:`${s}.${c}`))};return this.typeDesc(i).kind==="object"?r(i,s):o.push(`${s}.value = ${JSON.stringify(i)}`),o.join(`
`)}}},C={class:"xml-wrap"},O={class:"topbar"},E={class:"actions"},L={class:"content"},A={class:"pane"},X={class:"pane"},F={class:"result"};function R(i,t,s,o,r,e){return D(),S("div",C,[m("div",O,[t[8]||(t[8]=m("div",null,"XML 工具",-1)),m("div",E,[t[6]||(t[6]=m("label",{class:"lbl"},"类/结构名",-1)),g(m("input",{"onUpdate:modelValue":t[0]||(t[0]=n=>r.name=n),class:"input",placeholder:"例如 Root"},null,512),[[j,r.name]]),t[7]||(t[7]=m("label",{class:"lbl"},"目标",-1)),g(m("select",{"onUpdate:modelValue":t[1]||(t[1]=n=>r.target=n),class:"input"},[...t[5]||(t[5]=[N('<option value="json" data-v-1e971ca4> json </option><option value="java" data-v-1e971ca4> java类 </option><option value="c" data-v-1e971ca4> c结构体 </option><option value="cpp" data-v-1e971ca4> C++类 </option><option value="python" data-v-1e971ca4> Python类 </option><option value="rust" data-v-1e971ca4> Rust结构体 </option><option value="go" data-v-1e971ca4> go结构体 </option><option value="ts" data-v-1e971ca4> ts类 </option><option value="toon" data-v-1e971ca4> Toon </option><option value="csharp" data-v-1e971ca4> C#类 </option><option value="yaml" data-v-1e971ca4> yaml </option><option value="dart" data-v-1e971ca4> dart类 </option><option value="xmlschema" data-v-1e971ca4> xml schema </option><option value="swift" data-v-1e971ca4> swift类 </option><option value="objc" data-v-1e971ca4> object-c类 </option><option value="ruby" data-v-1e971ca4> ruby类 </option><option value="kotlin" data-v-1e971ca4> kotlin类 </option><option value="php" data-v-1e971ca4> PHP类 </option><option value="sql" data-v-1e971ca4> sql </option><option value="toml" data-v-1e971ca4> toml </option>',20)])],512),[[x,r.target]]),m("button",{class:"btn",onClick:t[2]||(t[2]=(...n)=>e.onConvert&&e.onConvert(...n))}," 转换 "),m("button",{class:"btn",onClick:t[3]||(t[3]=(...n)=>e.onCopy&&e.onCopy(...n))}," 复制 ")])]),m("div",L,[m("div",A,[t[9]||(t[9]=m("h3",null,"输入 XML",-1)),g(m("textarea",{"onUpdate:modelValue":t[4]||(t[4]=n=>r.input=n),class:"editor",placeholder:'<user id="1"><name>navy</name></user>'},null,512),[[j,r.input]])]),m("div",X,[t[10]||(t[10]=m("h3",null,"输出",-1)),m("pre",F,[m("code",{ref:"code",class:w("hljs language-"+e.codeLang)},M(e.codeText),3)])])])])}const V=P(T,[["render",R],["__scopeId","data-v-1e971ca4"]]);export{V as default};
