import{C as e,J as t,O as n,X as r,c as i,p as a,u as o,w as s}from"./vendor-c1Se7FJx.js";import{c,n as l,s as u}from"./index-6xnJRiRh.js";import{n as d}from"./toolTheme-Cib6in9I.js";var f={data(){return{ui:d,title:`RunJS`,mode:`js`,code:``,logs:[],html:``,css:``,js:``}},computed:{placeholder(){return this.mode===`js`?`console.log("Hello World")`:`<h1>Hello</h1><script>document.body.style.color="red"<\/script>`}},mounted(){document.title=this.title,window.addEventListener(`message`,this.onMsg)},unmounted(){window.removeEventListener(`message`,this.onMsg)},methods:{clearAll(){this.code=``,this.logs=[];let e=this.$refs.preview;e&&e.contentWindow&&(e.srcdoc=``)},onMsg(e){let t=e.data;!t||t.type!==`runjs-log`||this.logs.push(t.payload)},run(){let e=this.$refs.preview;e&&(e.srcdoc=`
<!doctype html><html><head><meta charset="utf-8"></head><body>
${this.html}
<script>
const injectedStyle = document.createElement('style')
injectedStyle.textContent = ${JSON.stringify(this.css)}
document.head.appendChild(injectedStyle)
try { ${this.js} } catch (e) { console.log(e && e.stack ? e.stack : String(e)) }
<\/script>
</body></html>`)},runJs(){this.logs=[];let e=`
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
</body></html>`,t=this.$refs.preview;t&&(t.srcdoc=e)},runHtml(){let e=this.$refs.preview;e&&(e.srcdoc=this.code||``)}}},p=[`placeholder`],m={key:0},h={key:1},g={ref:`preview`,class:`h-full w-full rounded-md border-0 bg-white`,sandbox:`allow-scripts`};function _(l,d,f,_,v,y){return e(),a(`div`,{class:t(v.ui.page)},[o(`div`,{class:t(v.ui.inner)},[o(`div`,{class:t(v.ui.toolbar)},[o(`span`,{class:t(v.ui.toolbarLabel)},`模式`,2),n(o(`select`,{"onUpdate:modelValue":d[0]||=e=>v.mode=e,class:t(v.ui.input)},[...d[7]||=[o(`option`,{value:`js`},` JS `,-1),o(`option`,{value:`html`},` HTML `,-1)]],2),[[u,v.mode]]),o(`button`,{class:t(v.ui.buttonPrimary),onClick:d[1]||=(...e)=>y.run&&y.run(...e)},` 运行 `,2),o(`button`,{class:t(v.ui.buttonSecondary),onClick:d[2]||=(...e)=>y.clearAll&&y.clearAll(...e)},` 清空 `,2)],2),o(`div`,{class:t(v.ui.content)},[o(`div`,{class:t([v.ui.panel,`flex-1`])},[o(`h3`,{class:t([v.ui.title,`mb-2`])},` HTML `,2),n(o(`textarea`,{"onUpdate:modelValue":d[3]||=e=>v.html=e,class:t([v.ui.textarea,`mb-3 h-[calc(100vh-240px)] w-full max-lg:h-56`]),placeholder:`<div>Hello</div>`},null,2),[[c,v.html]]),o(`h3`,{class:t([v.ui.title,`mb-2`])},` CSS `,2),n(o(`textarea`,{"onUpdate:modelValue":d[4]||=e=>v.css=e,class:t([v.ui.textarea,`mb-3 h-[calc(100vh-240px)] w-full max-lg:h-56`]),placeholder:`body { color: #333 }`},null,2),[[c,v.css]]),o(`h3`,{class:t([v.ui.title,`mb-2`])},` JS `,2),n(o(`textarea`,{"onUpdate:modelValue":d[5]||=e=>v.js=e,class:t([v.ui.textarea,`h-[calc(100vh-240px)] w-full max-lg:h-56`]),placeholder:`console.log('hi')`},null,2),[[c,v.js]])],2),o(`div`,{class:t([v.ui.panel,`flex-1`])},[o(`h3`,{class:t([v.ui.title,`mb-2`])},` 编辑器 `,2),n(o(`textarea`,{"onUpdate:modelValue":d[6]||=e=>v.code=e,class:t([v.ui.textarea,`h-[calc(100vh-240px)] w-full max-lg:h-80`]),placeholder:y.placeholder},null,10,p),[[c,v.code]])],2),o(`div`,{class:t([v.ui.panel,`flex-1`])},[o(`h3`,{class:t([v.ui.title,`mb-2`])},` 输出 `,2),o(`div`,{class:t([v.ui.softPanel,`h-[calc(100vh-240px)] w-full max-lg:h-80`])},[v.mode===`js`?(e(),a(`div`,m,[o(`div`,{class:t([v.ui.codePanel,`h-full overflow-auto rounded-xl font-mono text-[13px] text-slate-200`])},[(e(!0),a(i,null,s(v.logs,(t,n)=>(e(),a(`div`,{key:n,class:`my-0.5 whitespace-pre-wrap`},r(t),1))),128))],2)])):(e(),a(`div`,h,[o(`iframe`,g,null,512)]))],2)],2)],2)],2)],2)}var v=l(f,[[`render`,_]]);export{v as default};