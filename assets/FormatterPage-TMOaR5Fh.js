import{b as m,a as i,t as S,k as h,q as g,o as p,F as C,n as T,c as v,r as E,x as N}from"./vendor-yjUBYCCz.js";import{_}from"./index-QnCXKXJ2.js";const u=(n,t)=>new Array(t+1).join(n),y=n=>{try{const t=JSON.parse(n);return JSON.stringify(t,null,2)}catch(t){return"JSON解析失败: "+t.message+`

`+n}},L=n=>{const t=n.replace(/>\s+</g,"><").replace(/</g,`
<`).replace(/>/g,`>
`).split(`
`).filter(a=>a.trim()!=="");let r=0;const o=new Set(["area","base","br","col","embed","hr","img","input","link","meta","param","source","track","wbr"]),e=[];return t.forEach(a=>{const s=a.trim();if(s.startsWith("</"))r=Math.max(0,r-1),e.push(u("  ",r)+s);else if(s.startsWith("<")&&s.endsWith(">")&&!s.startsWith("<?")&&!s.includes("</")&&!s.endsWith("/>")){const c=s.match(/^<\s*([a-zA-Z0-9:-]+)/),d=c&&o.has(c[1].toLowerCase());e.push(u("  ",r)+s),d||r++}else e.push(u("  ",r)+s)}),e.join(`
`)},O=n=>L(n),x=n=>{const r=n.replace(/\s+/g," ").replace(/\{/g,`{
`).replace(/\}/g,`
}
`).replace(/;/g,`;
`).split(`
`).map(a=>a.trim()).filter(a=>a.length>0);let o=0;const e=[];return r.forEach(a=>{a.startsWith("}")&&(o=Math.max(0,o-1)),e.push(u("  ",o)+a),a.endsWith("{")&&o++}),e.join(`
`)},M=n=>n.replace(/;+/g,";"),b=n=>n.replace(/\{/g,`{
`).replace(/\}/g,`
}
`).replace(/;/g,`;
`),l=n=>{const t=b(M(n)).split(`
`).map(e=>e.trim());let r=0;const o=[];return t.forEach(e=>{e.length!==0&&(e.startsWith("}")&&(r=Math.max(0,r-1)),o.push(u("  ",r)+e),e.endsWith("{")&&r++)}),o.join(`
`)},I=n=>l(n),J=n=>{const t=["SELECT","FROM","WHERE","GROUP BY","ORDER BY","HAVING","LIMIT","JOIN","LEFT JOIN","RIGHT JOIN","INNER JOIN","UNION","WITH","INSERT","INTO","VALUES","UPDATE","SET","DELETE"];let r=n.replace(/\s+/g," ");t.forEach(s=>{const c=new RegExp("\\s*"+s.replace(" ","\\s+")+"\\s*","gi");r=r.replace(c,`
`+s+" ")}),r=r.replace(/\(/g,`(
`).replace(/\)/g,`
)`);const o=r.split(`
`).map(s=>s.trim()).filter(s=>s.length>0);let e=0;const a=[];return o.forEach(s=>{s===")"&&(e=Math.max(0,e-1)),a.push(u("  ",e)+s),s.endsWith("(")&&e++}),a.join(`
`)},k=n=>{const t=n.replace(/\t/g,"    ").split(`
`).map(e=>e.replace(/\s+$/,""));let r=0;const o=[];return t.forEach(e=>{const a=e.trim();/^(elif|else|except|finally)\b/.test(a)&&(r=Math.max(0,r-1)),o.push(u("    ",r)+a),a.endsWith(":")&&r++}),o.join(`
`)},f=(n,t)=>{switch((n||"").toUpperCase()){case"JSON":return y(t);case"XML":return L(t);case"HTML":return O(t);case"CSS":return x(t);case"JS":return I(t);case"SQL":return J(t);case"PYTHON":return k(t);case"C":return l(t);case"C++":return l(t);case"C#":return l(t);case"JAVA":return l(t);case"GO":return l(t);case"RUST":return l(t);case"PHP":return l(t);default:return t}},F={name:"CodeFormatter",props:{lang:{type:String,default:"HTML"}},data(){return{input:"",output:"",timer:null}},watch:{lang(){this.input="",this.output=""},input(){this.timer&&clearTimeout(this.timer),this.timer=setTimeout(()=>{this.output=f(this.lang,this.input)},300)}},methods:{doFormat(){this.output=f(this.lang,this.input)},copy(){this.output&&navigator.clipboard&&navigator.clipboard.writeText(this.output)}}},H={class:"formatter"},W={class:"header"},w={class:"title"},P={class:"actions"},R={class:"panes"},A={class:"pane"},U={class:"pane"};function V(n,t,r,o,e,a){return p(),m("div",H,[i("div",W,[i("div",w,S(r.lang)+" 格式化 ",1),i("div",P,[i("input",{type:"button",value:"格式化",onClick:t[0]||(t[0]=(...s)=>a.doFormat&&a.doFormat(...s))}),i("input",{type:"button",value:"复制结果",onClick:t[1]||(t[1]=(...s)=>a.copy&&a.copy(...s))})])]),i("div",R,[i("div",A,[t[4]||(t[4]=i("div",{class:"label"}," 源代码 ",-1)),h(i("textarea",{"onUpdate:modelValue":t[2]||(t[2]=s=>e.input=s),class:"code"},null,512),[[g,e.input]])]),i("div",U,[t[5]||(t[5]=i("div",{class:"label"}," 格式化结果 ",-1)),h(i("textarea",{"onUpdate:modelValue":t[3]||(t[3]=s=>e.output=s),class:"code",readonly:""},null,512),[[g,e.output]])])])])}const j=_(F,[["render",V],["__scopeId","data-v-f86fac48"]]),B={name:"FormatterPage",components:{CodeFormatter:j},data(){return{title:"海军代码格式化",arr:["HTML","CSS","JS","SQL","C","C++","C#","PHP","GO","JAVA","RUST","Python","JSON","XML"],currentLang:"HTML"}},mounted(){document.title=this.title,this.currentLang="HTML"},methods:{toggle(n){this.currentLang=n.target.textContent}}},D={class:"menu"},G={class:"menu-list"},z={class:"opoperate"};function Q(n,t,r,o,e,a){const s=E("CodeFormatter");return p(),m("div",null,[i("div",D,[i("ul",G,[(p(!0),m(C,null,T(e.arr,c=>(p(),m("li",{key:c,class:N({active:e.currentLang===c}),onClick:t[0]||(t[0]=(...d)=>a.toggle&&a.toggle(...d))},S(c),3))),128))])]),i("div",z,[(p(),v(s,{key:e.currentLang,lang:e.currentLang},null,8,["lang"]))])])}const q=_(B,[["render",Q],["__scopeId","data-v-f4ce81bc"]]);export{q as default};
