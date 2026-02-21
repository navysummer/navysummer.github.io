import{H as j}from"./index-CjJjtUXp.js";/* empty css               */import{b as v,a as m,k,q as g,p as D,j as S,x,t as T,o as w}from"./vendor-yjUBYCCz.js";import{_ as P}from"./index-BZqOUNkZ.js";import"./jquery-BCX6_a_s.js";const N={name:"TomlToolPage",data(){return{title:"TOML 工具",input:"",name:"Root",target:"json",output:""}},computed:{codeLang(){return this.getLanguage(this.target)},codeText(){const i=this.codeLang;return this.formatResult(this.output,i)}},watch:{output(){this.$nextTick(()=>this.applyHighlight())},target(){this.$nextTick(()=>this.applyHighlight())}},mounted(){document.title=this.title,this.$nextTick(()=>this.applyHighlight())},methods:{applyHighlight(){const i=this.$refs.code;i&&j.highlightElement(i)},onConvert(){let i=null;const t=this.name&&this.name.trim()?this.name.trim():"Root";try{i=this.parseToml(this.input||"")}catch{this.output="非法TOML";return}const s=this.target;s==="json"?this.output=JSON.stringify(i,null,2):s==="yaml"?this.output=this.toYaml(i):s==="xmlschema"?this.output=this.toXmlSchemaDeep(i,t):s==="java"?this.output=this.toJavaDeep(i,t):s==="c"?this.output=this.toCDeep(i,t):s==="cpp"?this.output=this.toCppDeep(i,t):s==="python"?this.output=this.toPythonDeep(i,t):s==="rust"?this.output=this.toRustDeep(i,t):s==="go"?this.output=this.toGoDeep(i,t):s==="ts"?this.output=this.toTsDeep(i,t):s==="toon"?this.output=this.toProtoDeep(i,t):s==="csharp"?this.output=this.toCSharpDeep(i,t):s==="dart"?this.output=this.toDartDeep(i,t):s==="swift"?this.output=this.toSwiftDeep(i,t):s==="objc"?this.output=this.toObjCDeep(i,t):s==="ruby"?this.output=this.toRubyDeep(i,t):s==="kotlin"?this.output=this.toKotlinDeep(i,t):s==="php"?this.output=this.toPHPDeep(i,t):s==="sql"?this.output=this.toSQL(i,t):this.output=""},onCopy(){const i=this.output||"",t=document.createElement("textarea");t.value=i,document.body.appendChild(t),t.select(),document.execCommand("copy"),document.body.removeChild(t),alert("已复制")},parseToml(i){const t={};let s=[];const o=(a,l,p)=>{let c=a;for(let u=0;u<l.length-1;u++){const d=l[u];(!(d in c)||typeof c[d]!="object"||c[d]===null)&&(c[d]={}),c=c[d]}c[l[l.length-1]]=p},r=(a,l)=>{let p=a;for(let c=0;c<l.length;c++){const u=l[c];if(!(u in p))return;p=p[u]}return p},e=a=>{const l=a.trim();if(l.startsWith('"')&&l.endsWith('"')||l.startsWith("'")&&l.endsWith("'"))return l.slice(1,-1);if(l==="true"||l==="false")return l==="true";if(l.startsWith("[")&&l.endsWith("]")){const p=l.slice(1,-1).trim();if(!p)return[];const c=[];let u="",d=!1,y="";for(let $=0;$<p.length;$++){const h=p[$];if(d){u+=h,h===y&&(d=!1);continue}if(h==='"'||h==="'"){d=!0,y=h,u+=h;continue}if(h===","){c.push(e(u)),u="";continue}u+=h}return u.trim()&&c.push(e(u)),c}return Number.isNaN(Number(l))?l:l.indexOf(".")>=0?parseFloat(l):parseInt(l)};return i.split(/\r?\n/).map(a=>a.replace(/#.*/,"").trim()).filter(Boolean).forEach(a=>{if(a.startsWith("[[")&&a.endsWith("]]")){const p=a.slice(2,-2).trim().split(".").filter(Boolean);s=p;const c=p.slice(0,-1),u=p[p.length-1],d=r(t,c)||o(t,c,{})||r(t,c);d[u]||(d[u]=[]);const y={};d[u].push(y);return}if(a.startsWith("[")&&a.endsWith("]")){const p=a.slice(1,-1).trim().split(".").filter(Boolean);s=p,r(t,p)||o(t,p,{});return}const l=a.match(/^([^=]+)=(.*)$/);if(l){const p=l[1].trim(),c=l[2].trim(),u=p.split(".").filter(Boolean),d=s.concat(u),y=e(c);o(t,d,y)}}),t},getLanguage(i){return{json:"json",yaml:"yaml",xmlschema:"xml",java:"java",c:"c",cpp:"cpp",python:"python",rust:"rust",go:"go",ts:"typescript",toon:"proto",csharp:"csharp",dart:"dart",swift:"swift",objc:"objectivec",ruby:"ruby",kotlin:"kotlin",php:"php",sql:"sql"}[i]||"text"},formatResult(i,t){if(!i)return"";if(t==="xml")return this.prettyXml(i);if(t==="json")try{return JSON.stringify(JSON.parse(i),null,2)}catch{return i}return this.formatCode(i,t)},prettyXml(i){try{const s=new RegExp("(>)(<)(/?)","g");let o=i.replace(s,`$1
$2$3`),r=0;return o.split(`
`).map(e=>{e.match(/^<\/\w/)&&(r=Math.max(r-1,0));const n=r;return e.match(/^<\w[^>]*[^/]>.*$/)&&(r+=1),`${"  ".repeat(n)}${e}`}).join(`
`)}catch{return i}},escapeHtml(i){return String(i||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")},highlight(i,t){let s=this.escapeHtml(i);const o=(n,a)=>{s=s.replace(a,l=>`<span class="${n}">${l}</span>`)};if(o("hl-string",/"(?:\\.|[^"])*"|'(?:\\.|[^'])*'/g),o("hl-number",/\b-?\d+(?:\.\d+)?\b/g),o("hl-boolean",/\b(true|false)\b/g),o("hl-null",/\b(null)\b/g),t==="json"||t==="yaml"||t==="toml"||t==="xml")return s;const r=/\b(abstract|and|as|assert|break|case|catch|class|const|continue|data|def|default|do|else|enum|extern|final|fn|for|from|function|if|implements|import|in|interface|let|namespace|new|not|or|package|private|protected|public|return|static|struct|switch|this|throw|try|type|typeof|union|using|var|void|while|yield)\b/g,e=/\b(String|Int|Integer|Double|Float|Long|Bool|Boolean|char|void|any|number)\b/g;return o("hl-keyword",r),o("hl-type",e),s},formatCode(i,t){if(!new Set(["java","c","cpp","rust","go","typescript","csharp","dart","swift","kotlin","php","proto"]).has(t))return i;const o="  ";let r=0;return String(i).split(`
`).map(e=>{const n=e.replace(/\s+$/,"");/^\s*}\)?;?$/.test(n)&&(r=Math.max(r-1,0));const a=r;return/\{\s*$/.test(n)&&(r+=1),`${o.repeat(a)}${n.trimStart()}`}).join(`
`)},pascal(i){return String(i||"").replace(/[_\-\s]+/g," ").split(" ").map(t=>t?t[0].toUpperCase()+t.slice(1):"").join("")||"Root"},camel(i){const t=this.pascal(i);return t[0].toLowerCase()+t.slice(1)},isInt(i){return typeof i=="number"&&Number.isInteger(i)},typeDesc(i){if(i==null)return{kind:"primitive",type:"any"};if(Array.isArray(i)){const s=i.find(r=>r!=null);return{kind:"array",elem:s!==void 0?this.typeDesc(s):{kind:"primitive",type:"any"}}}const t=typeof i;return t==="object"?{kind:"object"}:t==="string"?{kind:"primitive",type:"string"}:t==="number"?{kind:"primitive",type:this.isInt(i)?"integer":"float"}:t==="boolean"?{kind:"primitive",type:"boolean"}:{kind:"primitive",type:"any"}},buildModels(i,t){const s=[],o=new Map,r=n=>Object.keys(n).sort().map(p=>{const c=this.typeDesc(n[p]);return c.kind==="object"?`${p}:object`:c.kind==="array"?c.elem.kind==="object"?`${p}:array<object>`:c.elem.kind==="primitive"?`${p}:array<${c.elem.type}>`:`${p}:array<any>`:`${p}:${c.type}`}).join("|"),e=(n,a)=>{const l=r(n),p=o.get(l),c=p||this.pascal(a);if(!p){const u=[];return Object.keys(n).forEach(d=>{const y=n[d],$=this.typeDesc(y);if($.kind==="object"){const h=this.pascal(c+this.pascal(d)),b=e(y,h);u.push({key:d,kind:"object",ref:b.name})}else if($.kind==="array"){const h=$.elem;if(h.kind==="object"){const b=this.pascal(c+this.pascal(d)),f=e(y&&y[0]||{},b);u.push({key:d,kind:"array",elem:{kind:"object",ref:f.name}})}else h.kind==="primitive"?u.push({key:d,kind:"array",elem:h}):u.push({key:d,kind:"array",elem:{kind:"primitive",type:"any"}})}else $.kind==="primitive"&&u.push({key:d,kind:"primitive",type:$.type})}),s.push({name:c,fields:u}),o.set(l,c),{name:c}}return{name:c}};return this.typeDesc(i).kind==="object"?e(i,t):e({value:i},t),s},toYaml(i){const t=(s,o)=>{const r=this.typeDesc(s).kind;return r==="object"?Object.keys(s).map(e=>`${o}${e}: ${["object","array"].includes(this.typeDesc(s[e]).kind)?`
`+t(s[e],o+"  "):t(s[e],"")}`).join(`
`):r==="array"?s.map(e=>`${o}- ${["object","array"].includes(this.typeDesc(e).kind)?`
`+t(e,o+"  "):t(e,"")}`).join(`
`):typeof s=="string"?`${JSON.stringify(s)}`:`${s}`};return t(i,"")},toXmlSchemaDeep(i,t){var a;const s=this.buildModels(i,t),o=l=>l==="string"?"xs:string":l==="integer"?"xs:integer":l==="float"?"xs:double":l==="boolean"?"xs:boolean":"xs:string",r=l=>{const p=[];return p.push(`<xs:complexType name="${l.name}">`),p.push("  <xs:sequence>"),l.fields.forEach(c=>{if(c.kind==="primitive")p.push(`    <xs:element name="${c.key}" type="${o(c.type)}" minOccurs="0"/>`);else if(c.kind==="object")p.push(`    <xs:element name="${c.key}" type="${c.ref}" minOccurs="0"/>`);else if(c.kind==="array"){const u=c.elem,d=u.kind==="primitive"?o(u.type):u.kind==="object"?u.ref:"xs:string";p.push(`    <xs:element name="${c.key}" type="${d}" minOccurs="0" maxOccurs="unbounded"/>`)}}),p.push("  </xs:sequence>"),p.push("</xs:complexType>"),p.join(`
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

`)},toProtoDeep(i,t){const s=this.buildModels(i,t),o=n=>n==="string"?"string":n==="integer"?"int64":n==="float"?"double":n==="boolean"?"bool":"string",r=(n,a)=>{if(n.kind==="primitive")return`  ${o(n.type)} ${this.camel(n.key)} = ${a};`;if(n.kind==="object")return`  ${n.ref} ${this.camel(n.key)} = ${a};`;if(n.kind==="array"){const l=n.elem;return`  repeated ${l.kind==="primitive"?o(l.type):l.kind==="object"?l.ref:"string"} ${this.camel(n.key)} = ${a};`}return`  string ${this.camel(n.key)} = ${a};`};return`syntax = "proto3";
${s.map(n=>{const a=n.fields.map((l,p)=>r(l,p+1)).join(`
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
);`}}},M={class:"toml-wrap"},C={class:"topbar"},O={class:"actions"},L={class:"content"},A={class:"pane"},E={class:"pane"},R={class:"result"};function F(i,t,s,o,r,e){return w(),v("div",M,[m("div",C,[t[8]||(t[8]=m("div",null,"TOML 工具",-1)),m("div",O,[t[6]||(t[6]=m("label",{class:"lbl"},"类/结构名",-1)),k(m("input",{"onUpdate:modelValue":t[0]||(t[0]=n=>r.name=n),class:"input",placeholder:"例如 Root"},null,512),[[g,r.name]]),t[7]||(t[7]=m("label",{class:"lbl"},"目标",-1)),k(m("select",{"onUpdate:modelValue":t[1]||(t[1]=n=>r.target=n),class:"input"},[...t[5]||(t[5]=[S('<option value="json" data-v-e81715f2> json </option><option value="java" data-v-e81715f2> java类 </option><option value="c" data-v-e81715f2> c结构体 </option><option value="cpp" data-v-e81715f2> C++类 </option><option value="python" data-v-e81715f2> Python类 </option><option value="rust" data-v-e81715f2> Rust结构体 </option><option value="go" data-v-e81715f2> go结构体 </option><option value="ts" data-v-e81715f2> ts类 </option><option value="toon" data-v-e81715f2> Toon </option><option value="csharp" data-v-e81715f2> C#类 </option><option value="yaml" data-v-e81715f2> yaml </option><option value="dart" data-v-e81715f2> dart类 </option><option value="xmlschema" data-v-e81715f2> xml schema </option><option value="swift" data-v-e81715f2> swift类 </option><option value="objc" data-v-e81715f2> object-c类 </option><option value="ruby" data-v-e81715f2> ruby类 </option><option value="kotlin" data-v-e81715f2> kotlin类 </option><option value="php" data-v-e81715f2> PHP类 </option><option value="sql" data-v-e81715f2> sql </option>',19)])],512),[[D,r.target]]),m("button",{class:"btn",onClick:t[2]||(t[2]=(...n)=>e.onConvert&&e.onConvert(...n))}," 转换 "),m("button",{class:"btn",onClick:t[3]||(t[3]=(...n)=>e.onCopy&&e.onCopy(...n))}," 复制 ")])]),m("div",L,[m("div",A,[t[9]||(t[9]=m("h3",null,"输入 TOML",-1)),k(m("textarea",{"onUpdate:modelValue":t[4]||(t[4]=n=>r.input=n),class:"editor",placeholder:'name = "navy"\\n[user]\\nid = 1'},null,512),[[g,r.input]])]),m("div",E,[t[10]||(t[10]=m("h3",null,"输出",-1)),m("pre",R,[m("code",{ref:"code",class:x("hljs language-"+e.codeLang)},T(e.codeText),3)])])])])}const W=P(N,[["render",F],["__scopeId","data-v-e81715f2"]]);export{W as default};
