import{b as r,a as e,k as d,m as u,p as c,F as p,n as m,o as i,t as h}from"./vendor-DJAHsOyX.js";import{_ as g}from"./index-BNj57DdA.js";const v={data(){return{title:"RunJS",mode:"js",code:"",logs:[],html:"",css:"",js:""}},computed:{placeholder(){return this.mode==="js"?'console.log("Hello World")':'<h1>Hello</h1><script>document.body.style.color="red"<\/script>'}},mounted(){document.title=this.title,window.addEventListener("message",this.onMsg)},unmounted(){window.removeEventListener("message",this.onMsg)},methods:{clearAll(){this.code="",this.logs=[];const o=this.$refs.preview;o&&o.contentWindow&&(o.srcdoc="")},onMsg(o){const s=o.data;!s||s.type!=="runjs-log"||this.logs.push(s.payload)},run(){const o=this.$refs.preview;if(!o)return;const s=`
<!doctype html><html><head><meta charset="utf-8"><style>${this.css}</style></head><body>
${this.html}
<script>
try { ${this.js} } catch (e) { console.log(e && e.stack ? e.stack : String(e)) }
<\/script>
</body></html>`;o.srcdoc=s},runJs(){this.logs=[];const o=`
<!doctype html><html><head><meta charset="utf-8"></head><body>
<script>
  const send = (v) => {
    try {
      parent.postMessage({ type: 'runjs-log', payload: String(v) }, '*')
    } catch (e) {}
  }
  const log = (...args) => { try { send(args.map(x => typeof x === 'object' ? JSON.stringify(x) : String(x)).join(' ')) } catch (e) { send(String(e)) } }
  console.log = log
  console.error = log
  console.warn = log
  console.info = log
  try {
    (function(){ ${this.code} })()
  } catch (e) {
    log(e && e.stack ? e.stack : String(e))
  }
<\/script>
</body></html>`,s=this.$refs.preview;s&&(s.srcdoc=o)},runHtml(){const o=this.$refs.preview;o&&(o.srcdoc=this.code||"")}}},f={class:"runjs-wrap"},y={class:"topbar"},b={class:"content"},w={class:"pane"},j={class:"pane"},x=["placeholder"],S={class:"pane"},k={class:"result"},M={key:0},_={class:"console"},H={key:1},J={ref:"preview",class:"preview",sandbox:"allow-scripts"};function V(o,s,L,U,l,n){return i(),r("div",f,[e("div",y,[s[8]||(s[8]=e("span",{class:"lbl"},"模式",-1)),d(e("select",{"onUpdate:modelValue":s[0]||(s[0]=t=>l.mode=t),class:"input"},[...s[7]||(s[7]=[e("option",{value:"js"}," JS ",-1),e("option",{value:"html"}," HTML ",-1)])],512),[[u,l.mode]]),e("button",{class:"btn",onClick:s[1]||(s[1]=(...t)=>n.run&&n.run(...t))}," 运行 "),e("button",{class:"btn",onClick:s[2]||(s[2]=(...t)=>n.clearAll&&n.clearAll(...t))}," 清空 ")]),e("div",b,[e("div",w,[s[9]||(s[9]=e("h3",null,"HTML",-1)),d(e("textarea",{"onUpdate:modelValue":s[3]||(s[3]=t=>l.html=t),class:"editor",placeholder:"<div>Hello</div>"},null,512),[[c,l.html]]),s[10]||(s[10]=e("h3",null,"CSS",-1)),d(e("textarea",{"onUpdate:modelValue":s[4]||(s[4]=t=>l.css=t),class:"editor",placeholder:"body { color: #333 }"},null,512),[[c,l.css]]),s[11]||(s[11]=e("h3",null,"JS",-1)),d(e("textarea",{"onUpdate:modelValue":s[5]||(s[5]=t=>l.js=t),class:"editor",placeholder:"console.log('hi')"},null,512),[[c,l.js]])]),e("div",j,[s[12]||(s[12]=e("h3",null,"编辑器",-1)),d(e("textarea",{"onUpdate:modelValue":s[6]||(s[6]=t=>l.code=t),class:"editor",placeholder:n.placeholder},null,8,x),[[c,l.code]])]),e("div",S,[s[13]||(s[13]=e("h3",null,"输出",-1)),e("div",k,[l.mode==="js"?(i(),r("div",M,[e("div",_,[(i(!0),r(p,null,m(l.logs,(t,a)=>(i(),r("div",{key:a,class:"log"},h(t),1))),128))])])):(i(),r("div",H,[e("iframe",J,null,512)]))])])])])}const C=g(v,[["render",V],["__scopeId","data-v-61a09532"]]);export{C as default};
