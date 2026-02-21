import{H as j}from"./index-CjJjtUXp.js";/* empty css               */import{b as v,a as p,k,q as f,p as S,j as D,x as O,t as N,o as P}from"./vendor-yjUBYCCz.js";import{_ as C}from"./index-D5xPVkAh.js";import"./jquery-BCX6_a_s.js";const M={name:"JsonToolPage",data(){return{title:"JSON 工具",input:"",name:"Root",target:"xml",output:""}},computed:{codeLang(){return this.getLanguage(this.target)},codeText(){const n=this.codeLang;return this.formatResult(this.output,n)}},watch:{output(){this.$nextTick(()=>this.applyHighlight())},target(){this.$nextTick(()=>this.applyHighlight())}},mounted(){document.title=this.title,this.$nextTick(()=>this.applyHighlight())},methods:{onConvert(){let n=null;try{n=JSON.parse(this.input||"{}")}catch{this.output="非法JSON";return}const e=this.name&&this.name.trim()?this.name.trim():"Root",o=this.target;o==="xml"?this.output=this.toXml(n,e):o==="java"?this.output=this.toJavaDeep(n,e):o==="c"?this.output=this.toCDeep(n,e):o==="cpp"?this.output=this.toCppDeep(n,e):o==="python"?this.output=this.toPythonDeep(n,e):o==="rust"?this.output=this.toRustDeep(n,e):o==="go"?this.output=this.toGoDeep(n,e):o==="ts"?this.output=this.toTsDeep(n,e):o==="toon"?this.output=this.toProtoDeep(n,e):o==="csharp"?this.output=this.toCSharpDeep(n,e):o==="yaml"?this.output=this.toYaml(n):o==="dart"?this.output=this.toDartDeep(n,e):o==="schema"?this.output=JSON.stringify(this.toSchema(n),null,2):o==="swift"?this.output=this.toSwiftDeep(n,e):o==="objc"?this.output=this.toObjCDeep(n,e):o==="ruby"?this.output=this.toRubyDeep(n,e):o==="kotlin"?this.output=this.toKotlinDeep(n,e):o==="php"?this.output=this.toPHPDeep(n,e):o==="sql"?this.output=this.toSQL(n,e):o==="toml"?this.output=this.toToml(n,e):this.output=""},getLanguage(n){return{xml:"xml",java:"java",c:"c",cpp:"cpp",python:"python",rust:"rust",go:"go",ts:"typescript",toon:"proto",csharp:"csharp",yaml:"yaml",dart:"dart",schema:"json",swift:"swift",objc:"objectivec",ruby:"ruby",kotlin:"kotlin",php:"php",sql:"sql",toml:"toml"}[n]||"text"},formatResult(n,e){if(!n)return"";if(e==="xml")return this.prettyXml(n);if(e==="json")try{return JSON.stringify(JSON.parse(n),null,2)}catch{return n}return this.formatCode(n,e)},formatCode(n,e){if(!new Set(["java","c","cpp","rust","go","typescript","csharp","dart","swift","kotlin","php","proto"]).has(e))return n;const r="  ";let s=0;return String(n).split(`
`).map(t=>{const i=t.replace(/\s+$/,"");/^\s*}\)?;?$/.test(i)&&(s=Math.max(s-1,0));const a=s;return/\{\s*$/.test(i)&&(s+=1),`${r.repeat(a)}${i.trimStart()}`}).join(`
`)},applyHighlight(){const n=this.$refs.code;n&&j.highlightElement(n)},prettyXml(n){try{const o=new RegExp("(>)(<)(/?)","g");let r=n.replace(o,`$1
$2$3`),s=0;return r.split(`
`).map(t=>{t.match(/^<\/\w/)&&(s=Math.max(s-1,0));const i=s;return t.match(/^<\w[^>]*[^/]>.*$/)&&(s+=1),`${"  ".repeat(i)}${t}`}).join(`
`)}catch{return n}},onCopy(){const n=this.output||"",e=document.createElement("textarea");e.value=n,document.body.appendChild(e),e.select(),document.execCommand("copy"),document.body.removeChild(e),alert("已复制")},pascal(n){return String(n||"").replace(/[_\-\s]+/g," ").split(" ").map(e=>e?e[0].toUpperCase()+e.slice(1):"").join("")||"Root"},camel(n){const e=this.pascal(n);return e[0].toLowerCase()+e.slice(1)},isInt(n){return typeof n=="number"&&Number.isInteger(n)},typeDesc(n){if(n==null)return{kind:"primitive",type:"any"};if(Array.isArray(n)){const o=n.find(s=>s!=null);return{kind:"array",elem:o!==void 0?this.typeDesc(o):{kind:"primitive",type:"any"}}}const e=typeof n;return e==="object"?{kind:"object"}:e==="string"?{kind:"primitive",type:"string"}:e==="number"?{kind:"primitive",type:this.isInt(n)?"integer":"float"}:e==="boolean"?{kind:"primitive",type:"boolean"}:{kind:"primitive",type:"any"}},buildModels(n,e){const o=[],r=new Map,s=i=>Object.keys(i).sort().map(u=>{const l=this.typeDesc(i[u]);return l.kind==="object"?`${u}:object`:l.kind==="array"?l.elem.kind==="object"?`${u}:array<object>`:l.elem.kind==="primitive"?`${u}:array<${l.elem.type}>`:`${u}:array<any>`:`${u}:${l.type}`}).join("|"),t=(i,a)=>{const d=s(i),u=r.get(d),l=u||this.pascal(a);if(!u){const c=[];return Object.keys(i).forEach(m=>{const $=i[m],y=this.typeDesc($);if(y.kind==="object"){const h=this.pascal(l+this.pascal(m)),b=t($,h);c.push({key:m,kind:"object",ref:b.name})}else if(y.kind==="array"){const h=y.elem;if(h.kind==="object"){const b=this.pascal(l+this.pascal(m)),g=t($&&$[0]||{},b);c.push({key:m,kind:"array",elem:{kind:"object",ref:g.name}})}else h.kind==="primitive"?c.push({key:m,kind:"array",elem:h}):c.push({key:m,kind:"array",elem:{kind:"primitive",type:"any"}})}else y.kind==="primitive"&&c.push({key:m,kind:"primitive",type:y.type})}),o.push({name:l,fields:c}),r.set(d,l),{name:l}}return{name:l}};return this.typeDesc(n).kind==="object"?t(n,e):t({value:n},e),o},tOf(n){if(n===null)return{t:"null"};if(Array.isArray(n))return{t:"array",et:n.length?this.tOf(n[0]).t:"any"};const e=typeof n;return e==="object"?{t:"object"}:e==="string"?{t:"string"}:e==="number"?{t:"number",k:this.isInt(n)?"int":"float"}:e==="boolean"?{t:"boolean"}:{t:"any"}},toXml(n,e){const o=(r,s)=>{const t=this.tOf(s).t;return t==="object"?`<${r}>${Object.keys(s).map(i=>o(i,s[i])).join("")}</${r}>`:t==="array"?`<${r}>${s.map(i=>o("item",i)).join("")}</${r}>`:t==="string"?`<${r}>${String(s).replace(/[<>&]/g,i=>({"<":"&lt;",">":"&gt;","&":"&amp;"})[i])}</${r}>`:`<${r}>${s}</${r}>`};return this.tOf(n).t==="object"?`<?xml version="1.0"?><${e}>${Object.keys(n).map(r=>o(r,n[r])).join("")}</${e}>`:`<?xml version="1.0"?><${e}>${o("value",n)}</${e}>`},toJavaDeep(n,e){const o=this.buildModels(n,e),r=t=>t==="string"?"String":t==="integer"?"long":t==="float"?"double":t==="boolean"?"boolean":"Object",s=t=>{if(t.kind==="primitive")return`  private ${r(t.type)} ${this.camel(t.key)};`;if(t.kind==="object")return`  private ${t.ref} ${this.camel(t.key)};`;if(t.kind==="array"){const i=t.elem;return`  private java.util.List<${i.kind==="primitive"?r(i.type):i.kind==="object"?i.ref:"Object"}> ${this.camel(t.key)};`}return`  private Object ${this.camel(t.key)};`};return o.map(t=>`public class ${t.name} {
${t.fields.map(s).join(`
`)}
}`).join(`

`)},toCDeep(n,e){const o=this.buildModels(n,e),r=t=>t==="string"?"char*":t==="integer"?"long":t==="float"?"double":t==="boolean"?"bool":"void*",s=t=>{if(t.kind==="primitive")return`  ${r(t.type)} ${this.camel(t.key)};`;if(t.kind==="object")return`  struct ${t.ref}* ${this.camel(t.key)};`;if(t.kind==="array"){const i=t.elem;return i.kind==="object"?`  struct ${i.ref}* ${this.camel(t.key)};`:i.kind==="primitive"?`  ${r(i.type)}* ${this.camel(t.key)};`:`  void* ${this.camel(t.key)};`}return`  void* ${this.camel(t.key)};`};return o.map(t=>`typedef struct ${t.name} {
${t.fields.map(s).join(`
`)}
} ${t.name};`).join(`

`)},toCppDeep(n,e){const o=this.buildModels(n,e),r=t=>t==="string"?"std::string":t==="integer"?"long long":t==="float"?"double":t==="boolean"?"bool":"std::any",s=t=>{if(t.kind==="primitive")return`  ${r(t.type)} ${this.camel(t.key)};`;if(t.kind==="object")return`  ${t.ref} ${this.camel(t.key)};`;if(t.kind==="array"){const i=t.elem;return`  std::vector<${i.kind==="primitive"?r(i.type):i.kind==="object"?i.ref:"std::any"}> ${this.camel(t.key)};`}return`  std::any ${this.camel(t.key)};`};return o.map(t=>`class ${t.name} {
public:
${t.fields.map(s).join(`
`)}
};`).join(`

`)},toPythonDeep(n,e){const o=this.buildModels(n,e),r=t=>t==="string"?"str":t==="integer"?"int":t==="float"?"float":t==="boolean"?"bool":"object",s=t=>{if(t.kind==="primitive")return`    self.${this.camel(t.key)}: ${r(t.type)} = None`;if(t.kind==="object")return`    self.${this.camel(t.key)}: ${t.ref} = None`;if(t.kind==="array"){const i=t.elem,a=i.kind==="primitive"?r(i.type):i.kind==="object"?t.elem.ref:"object";return`    self.${this.camel(t.key)}: list[${a}] = []`}return`    self.${this.camel(t.key)}: object = None`};return o.map(t=>`class ${t.name}:
  def __init__(self):
${t.fields.map(s).join(`
`)}`).join(`

`)},toRustDeep(n,e){const o=this.buildModels(n,e),r=t=>t==="string"?"String":t==="integer"?"i64":t==="float"?"f64":t==="boolean"?"bool":"serde_json::Value",s=t=>{if(t.kind==="primitive")return`  ${this.camel(t.key)}: ${r(t.type)},`;if(t.kind==="object")return`  ${this.camel(t.key)}: ${t.ref},`;if(t.kind==="array"){const i=t.elem,a=i.kind==="primitive"?r(i.type):i.kind==="object"?i.ref:"serde_json::Value";return`  ${this.camel(t.key)}: Vec<${a}>,`}return`  ${this.camel(t.key)}: serde_json::Value,`};return o.map(t=>`struct ${t.name} {
${t.fields.map(s).join(`
`)}
}`).join(`

`)},toGoDeep(n,e){const o=this.buildModels(n,e),r=t=>t==="string"?"string":t==="integer"?"int64":t==="float"?"float64":t==="boolean"?"bool":"interface{}",s=t=>{if(t.kind==="primitive")return`  ${this.pascal(t.key)} ${r(t.type)} \`json:"${t.key}"\``;if(t.kind==="object")return`  ${this.pascal(t.key)} ${t.ref} \`json:"${t.key}"\``;if(t.kind==="array"){const i=t.elem,a=i.kind==="primitive"?r(i.type):i.kind==="object"?i.ref:"interface{}";return`  ${this.pascal(t.key)} []${a} \`json:"${t.key}"\``}return`  ${this.pascal(t.key)} interface{} \`json:"${t.key}"\``};return o.map(t=>`type ${t.name} struct {
${t.fields.map(s).join(`
`)}
}`).join(`

`)},toTsDeep(n,e){const o=this.buildModels(n,e),r=t=>t==="string"?"string":t==="integer"||t==="float"?"number":t==="boolean"?"boolean":"any",s=t=>{if(t.kind==="primitive")return`  ${this.camel(t.key)}: ${r(t.type)}`;if(t.kind==="object")return`  ${this.camel(t.key)}: ${t.ref}`;if(t.kind==="array"){const i=t.elem,a=i.kind==="primitive"?r(i.type):i.kind==="object"?i.ref:"any";return`  ${this.camel(t.key)}: ${a}[]`}return`  ${this.camel(t.key)}: any`};return o.map(t=>`class ${t.name} {
${t.fields.map(s).join(`
`)}
}`).join(`

`)},toProtoDeep(n,e){const o=this.buildModels(n,e),r=i=>i==="string"?"string":i==="integer"?"int64":i==="float"?"double":i==="boolean"?"bool":"string",s=(i,a)=>{if(i.kind==="primitive")return`  ${r(i.type)} ${this.camel(i.key)} = ${a};`;if(i.kind==="object")return`  ${i.ref} ${this.camel(i.key)} = ${a};`;if(i.kind==="array"){const d=i.elem;return`  repeated ${d.kind==="primitive"?r(d.type):d.kind==="object"?d.ref:"string"} ${this.camel(i.key)} = ${a};`}return`  string ${this.camel(i.key)} = ${a};`};return`syntax = "proto3";
${o.map(i=>{const a=i.fields.map((d,u)=>s(d,u+1)).join(`
`);return`message ${i.name} {
${a}
}`}).join(`

`)}`},toCSharpDeep(n,e){const o=this.buildModels(n,e),r=t=>t==="string"?"string":t==="integer"?"long":t==="float"?"double":t==="boolean"?"bool":"object",s=t=>{if(t.kind==="primitive")return`  public ${r(t.type)} ${this.pascal(t.key)} { get; set; }`;if(t.kind==="object")return`  public ${t.ref} ${this.pascal(t.key)} { get; set; }`;if(t.kind==="array"){const i=t.elem;return`  public System.Collections.Generic.List<${i.kind==="primitive"?r(i.type):i.kind==="object"?i.ref:"object"}> ${this.pascal(t.key)} { get; set; }`}return`  public object ${this.pascal(t.key)} { get; set; }`};return o.map(t=>`public class ${t.name} {
${t.fields.map(s).join(`
`)}
}`).join(`

`)},toYaml(n){const e=(o,r)=>{const s=this.tOf(o).t;return s==="object"?Object.keys(o).map(t=>`${r}${t}: ${this.tOf(o[t]).t==="object"||this.tOf(o[t]).t==="array"?`
`+e(o[t],r+"  "):e(o[t],"")}`).join(`
`):s==="array"?o.map(t=>`${r}- ${this.tOf(t).t==="object"||this.tOf(t).t==="array"?`
`+e(t,r+"  "):e(t,"")}`).join(`
`):s==="string"?`${JSON.stringify(o)}`:`${o}`};return e(n,"")},toDartDeep(n,e){const o=this.buildModels(n,e),r=t=>t==="string"?"String":t==="integer"?"int":t==="float"?"double":t==="boolean"?"bool":"dynamic",s=t=>{if(t.kind==="primitive")return`  ${r(t.type)} ${this.camel(t.key)};`;if(t.kind==="object")return`  ${t.ref} ${this.camel(t.key)};`;if(t.kind==="array"){const i=t.elem;return`  List<${i.kind==="primitive"?r(i.type):i.kind==="object"?i.ref:"dynamic"}> ${this.camel(t.key)};`}return`  dynamic ${this.camel(t.key)};`};return o.map(t=>`class ${t.name} {
${t.fields.map(s).join(`
`)}
}`).join(`

`)},toSchema(n){const e=o=>{const r=this.tOf(o);if(r.t==="object"){const s={};return Object.keys(o).forEach(t=>{s[t]=e(o[t])}),{type:"object",properties:s}}return r.t==="array"?{type:"array",items:e((o||[])[0])}:r.t==="string"?{type:"string"}:r.t==="number"?{type:r.k==="int"?"integer":"number"}:r.t==="boolean"?{type:"boolean"}:r.t==="null"?{type:"null"}:{}};return{$schema:"https://json-schema.org/draft/2020-12/schema",...e(n)}},toSwiftDeep(n,e){const o=this.buildModels(n,e),r=t=>t==="string"?"String":t==="integer"?"Int":t==="float"?"Double":t==="boolean"?"Bool":"Any",s=t=>{if(t.kind==="primitive")return`  let ${this.camel(t.key)}: ${r(t.type)}`;if(t.kind==="object")return`  let ${this.camel(t.key)}: ${t.ref}`;if(t.kind==="array"){const i=t.elem,a=i.kind==="primitive"?r(i.type):i.kind==="object"?i.ref:"Any";return`  let ${this.camel(t.key)}: [${a}]`}return`  let ${this.camel(t.key)}: Any`};return o.map(t=>`struct ${t.name} {
${t.fields.map(s).join(`
`)}
}`).join(`

`)},toObjCDeep(n,e){const o=this.buildModels(n,e),r=t=>t==="string"?"NSString *":t==="integer"||t==="float"?"NSNumber *":t==="boolean"?"BOOL ":"id ",s=t=>{if(t.kind==="primitive")return`@property (nonatomic, strong) ${r(t.type)}${this.camel(t.key)};`;if(t.kind==="object")return`@property (nonatomic, strong) ${t.ref} *${this.camel(t.key)};`;if(t.kind==="array"){const i=t.elem;return`@property (nonatomic, strong) ${i.kind==="primitive"?"NSArray *":i.kind==="object"?`NSArray<${i.ref} *> *`:"NSArray *"}${this.camel(t.key)};`}return`@property (nonatomic, strong) id ${this.camel(t.key)};`};return o.map(t=>`@interface ${t.name} : NSObject
${t.fields.map(s).join(`
`)}
@end`).join(`

`)},toRubyDeep(n,e){return this.buildModels(n,e).map(r=>{const s=r.fields.map(t=>this.camel(t.key)).join(" ");return`class ${r.name}
  attr_accessor ${s}
end`}).join(`

`)},toKotlinDeep(n,e){const o=this.buildModels(n,e),r=t=>t==="string"?"String":t==="integer"?"Long":t==="float"?"Double":t==="boolean"?"Boolean":"Any",s=t=>{if(t.kind==="primitive")return`  val ${this.camel(t.key)}: ${r(t.type)}`;if(t.kind==="object")return`  val ${this.camel(t.key)}: ${t.ref}`;if(t.kind==="array"){const i=t.elem,a=i.kind==="primitive"?r(i.type):i.kind==="object"?i.ref:"Any";return`  val ${this.camel(t.key)}: List<${a}>`}return`  val ${this.camel(t.key)}: Any`};return o.map(t=>`data class ${t.name}(
${t.fields.map(s).join(`,
`)}
)`).join(`

`)},toPHPDeep(n,e){return this.buildModels(n,e).map(r=>{const s=r.fields.map(t=>`  public $${this.camel(t.key)};`).join(`
`);return`<?php
class ${r.name} {
${s}
}
?>`}).join(`

`)},toSQL(n,e){const o=this.camel(e),r=(t,i)=>{const a=this.tOf(i);return a.t==="string"?`  ${t} TEXT`:a.t==="number"?`  ${t} ${a.k==="int"?"INTEGER":"REAL"}`:a.t==="boolean"?`  ${t} BOOLEAN`:a.t==="array"?`  ${t} JSON`:a.t==="object"?`  ${t} JSON`:`  ${t} TEXT`},s=this.tOf(n).t==="object"?Object.keys(n).map(t=>r(t,n[t])).join(`,
`):"  value TEXT";return`CREATE TABLE ${o} (
${s}
);`},toToml(n,e){const o=this.camel(e),r=[],s=(t,i)=>{const a=Object.keys(t),d=[],u=[];a.forEach(l=>{const c=t[l];this.tOf(c).t==="object"?u.push({k:l,v:c}):d.push({k:l,v:c})}),i&&r.push(`[${i}]`),d.forEach(({k:l,v:c})=>{const m=this.tOf(c).t;m==="string"?r.push(`${l} = ${JSON.stringify(c)}`):m==="number"||m==="boolean"?r.push(`${l} = ${c}`):m==="array"?r.push(`${l} = ${JSON.stringify(c)}`):r.push(`${l} = "${String(c)}"`)}),u.forEach(({k:l,v:c})=>s(c,i?`${i}.${l}`:`${o}.${l}`))};return this.tOf(n).t==="object"?s(n,o):r.push(`${o}.value = ${JSON.stringify(n)}`),r.join(`
`)}}},T={class:"json-wrap"},w={class:"topbar"},A={class:"actions"},E={class:"content"},J={class:"pane"},L={class:"pane"},x={class:"result"};function R(n,e,o,r,s,t){return P(),v("div",T,[p("div",w,[e[8]||(e[8]=p("div",null,"JSON 工具",-1)),p("div",A,[e[6]||(e[6]=p("label",{class:"lbl"},"类/结构名",-1)),k(p("input",{"onUpdate:modelValue":e[0]||(e[0]=i=>s.name=i),class:"input",placeholder:"例如 User"},null,512),[[f,s.name]]),e[7]||(e[7]=p("label",{class:"lbl"},"目标",-1)),k(p("select",{"onUpdate:modelValue":e[1]||(e[1]=i=>s.target=i),class:"input"},[...e[5]||(e[5]=[D('<option value="xml" data-v-c8f26868> xml </option><option value="java" data-v-c8f26868> java类 </option><option value="c" data-v-c8f26868> c结构体 </option><option value="cpp" data-v-c8f26868> C++类 </option><option value="python" data-v-c8f26868> Python类 </option><option value="rust" data-v-c8f26868> Rust结构体 </option><option value="go" data-v-c8f26868> go结构体 </option><option value="ts" data-v-c8f26868> ts类 </option><option value="toon" data-v-c8f26868> Toon </option><option value="csharp" data-v-c8f26868> C#类 </option><option value="yaml" data-v-c8f26868> yaml </option><option value="dart" data-v-c8f26868> dart类 </option><option value="schema" data-v-c8f26868> json schema </option><option value="swift" data-v-c8f26868> swift类 </option><option value="objc" data-v-c8f26868> object-c类 </option><option value="ruby" data-v-c8f26868> ruby类 </option><option value="kotlin" data-v-c8f26868> kotlin类 </option><option value="php" data-v-c8f26868> PHP类 </option><option value="sql" data-v-c8f26868> sql </option><option value="toml" data-v-c8f26868> toml </option>',20)])],512),[[S,s.target]]),p("button",{class:"btn",onClick:e[2]||(e[2]=(...i)=>t.onConvert&&t.onConvert(...i))}," 转换 "),p("button",{class:"btn",onClick:e[3]||(e[3]=(...i)=>t.onCopy&&t.onCopy(...i))}," 复制 ")])]),p("div",E,[p("div",J,[e[9]||(e[9]=p("h3",null,"输入 JSON",-1)),k(p("textarea",{"onUpdate:modelValue":e[4]||(e[4]=i=>s.input=i),class:"editor",placeholder:'{"id":1,"name":"navy"}'},null,512),[[f,s.input]])]),p("div",L,[e[10]||(e[10]=p("h3",null,"输出",-1)),p("pre",x,[p("code",{ref:"code",class:O("hljs language-"+t.codeLang)},N(t.codeText),3)])])])])}const B=C(M,[["render",R],["__scopeId","data-v-c8f26868"]]);export{B as default};
