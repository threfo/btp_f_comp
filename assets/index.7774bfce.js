var et=Object.defineProperty,ot=Object.defineProperties;var nt=Object.getOwnPropertyDescriptors;var w=Object.getOwnPropertySymbols;var B=Object.prototype.hasOwnProperty,A=Object.prototype.propertyIsEnumerable;var L=(o,t,e)=>t in o?et(o,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[t]=e,g=(o,t)=>{for(var e in t||(t={}))B.call(t,e)&&L(o,e,t[e]);if(w)for(var e of w(t))A.call(t,e)&&L(o,e,t[e]);return o},T=(o,t)=>ot(o,nt(t));var N=(o,t)=>{var e={};for(var n in o)B.call(o,n)&&t.indexOf(n)<0&&(e[n]=o[n]);if(o!=null&&w)for(var n of w(o))t.indexOf(n)<0&&A.call(o,n)&&(e[n]=o[n]);return e};import{h as st,t as I,n as _,d as M,M as R,x as h,E as H,y as it}from"./plugin-vue_export-helper.494fd9a4.js";const rt=o=>o?Object.entries(o).reduce((t,[e,n])=>(e=e.charAt(0).toUpperCase()+e.slice(1),e=`on${e}`,T(g({},t),{[e]:n})),{}):null,f=(o,t={},e)=>{const d=t,{props:n,attrs:s,domProps:i,on:r}=d,l=N(d,["props","attrs","domProps","on"]),c=rt(r),a=g(g(g(g(g({},l),n),s),i),c);return st(o,a,e)},lt=o=>typeof o=="function"?o():o,ct=(o,t="default")=>{const e=((o==null?void 0:o.slots)||{})[t];return lt(e)||[]};class at{constructor({caret:t,dropdownEle:e,scrollingEle:n,fixHeightGap:s=5}){this.fixHeightGap=5,this.fixHeightGap=s,this.initCaret(t),this.initClient(n),this.initDropdownSize(e)}initCaret(t){const{top:e,height:n}=t||{},{fixHeightGap:s}=this;this.caret=T(g({},t),{top:e-s,height:n+s+5})}initClient(t){const{caret:e}=this,{left:n,top:s}=e||{},{clientWidth:i,clientHeight:r}=t||{},l=s,c=i-n,a=r-l;this.client={clientWidth:i,clientHeight:r,toClientLeft:n,toClientTop:l,toClientRight:c,toClientBottom:a}}initDropdownSize(t){const{offsetHeight:e,offsetWidth:n}=t;this.dropdownSize={height:e,width:n}}get isBottom(){const{client:t,caret:e,dropdownSize:n}=this,{toClientBottom:s}=t;return s-e.height>=n.height}get isRight(){const{client:t,dropdownSize:e}=this,{toClientRight:n}=t;return n>=e.width}get isTop(){const{dropdownSize:t,client:e}=this,{toClientTop:n}=e;return n>=t.height}get isLeft(){const{dropdownSize:t,client:e}=this,{toClientLeft:n}=e;return n>=t.width}get isBottomRight(){return this.isBottom&&this.isRight}get isTopRight(){return this.isTop&&this.isRight}get isBottomLeft(){return this.isBottom&&this.isLeft}get isTopLeft(){return this.isTop&&this.isLeft}positionBottomRight(){const{client:t,caret:e}=this,{toClientTop:n,toClientLeft:s}=t;return{top:n+e.height,left:s}}positionTopRight(){const{dropdownSize:t,client:e}=this,{toClientTop:n,toClientLeft:s}=e;return{top:n-t.height,left:s}}positionBottomLeft(){const{dropdownSize:t,client:e,caret:n}=this,{toClientTop:s,toClientLeft:i}=e;return{top:s+n.height,left:i-t.width}}positionTopLeft(){const{dropdownSize:t,client:e}=this,{toClientTop:n,toClientLeft:s}=e;return{top:n-t.height,left:s-t.width}}positionOther(){const{dropdownSize:t,client:e}=this,{toClientTop:n,toClientLeft:s,toClientRight:i,toClientBottom:r,caret:l}=e,c=s>i?s-t.width:s;return{top:n>r?n-t.height:n+l.height,left:c}}get position(){return this.isBottomRight?this.positionBottomRight():this.isTopRight?this.positionTopRight():this.isBottomLeft?this.positionBottomLeft():this.isTopLeft?this.positionTopLeft():this.positionOther()}}const dt=({caret:o,dropdownEle:t,scrollingEle:e,fixHeightGap:n=5})=>new at({caret:o,dropdownEle:t,scrollingEle:e,fixHeightGap:n}).position,ut=o=>{let t=null,e;const{getSelection:n}=o||{};if(n){e=o.getSelection();const{rangeCount:s}=e||{};s>0&&(t=e.getRangeAt(0))}return t},pt=o=>{var r;const t=(r=o==null?void 0:o.createRange())==null?void 0:r.duplicate();t==null||t.moveStart("character",-1);const e=t==null?void 0:t.getBoundingClientRect(),{bottom:n=0,top:s=0,left:i=0}=e||{};return{height:n-s,left:i,top:s}},ft=o=>{const t=o==null?void 0:o.cloneRange();t==null||t.setStart(o.endContainer,o.endOffset-1),t==null||t.setEnd(o.endContainer,o.endOffset);const e=t==null?void 0:t.getBoundingClientRect(),{height:n=0,top:s=0,left:i=0,width:r=0}=e||{},l={height:n,left:i+r,top:s};return t==null||t.detach(),l},ht=(o,t)=>{const e=o==null?void 0:o.cloneRange(),n=t==null?void 0:t.createTextNode("|");e==null||e.insertNode(n),e==null||e.selectNode(n);const s=e==null?void 0:e.getBoundingClientRect(),{height:i=0,left:r=0,top:l=0}=s||{},c={height:i,left:r,top:l};return n==null||n.remove(),e==null||e.detach(),c},gt=(o,t,e)=>{const{_initRange:n,_getDefOffset:s,_getHeight0Offset:i,_getOldIEOffset:r}=e||{_initRange:ut,_getDefOffset:ft,_getHeight0Offset:ht,_getOldIEOffset:pt};let l;const c=n(t),{document:a}=t||{},{selection:d}=a||{};if(c){c.endOffset-1>0&&c.endContainer!==o&&(l=s(c));const{height:p=0}=l||{};p===0&&(l=i(c,a))}else d&&(l=r(d));return l&&(l.top+=t.pageYOffset,l.left+=t.pageXOffset),l},v=(o,t)=>{const{refs:e}=o||{};return(e||{})[t]},m=({e:o,setupRef:t})=>{const{preventKeyUp:e}=t;o.preventDefault(),e.value=!0},K=o=>o.code==="ArrowDown",z=o=>o.code==="ArrowUp",yt=o=>o.code==="Enter",vt=o=>o.code==="Escape",wt=o=>{const{activeIndex:t,list:e}=o;t.value++,t.value===e.value.length&&(t.value=e.value.length-1)},mt=o=>{o.value--,o.value===-1&&(o.value=0)},bt=({props:o,e:t})=>{const{watchSymbolsPolicy:e}=I(o||{});return e.value.find(s=>{const{watchInputEvent:i}=s||{};return i(t)})},St=({str:o,props:t})=>{const{watchSymbolsPolicy:e}=I(t||{});return e.value.find(s=>{const{watchStr:i}=s||{};return i(o)})},Ct=o=>{const{range:t,selection:e}=o||{},{endContainer:n}=t||{},{nodeName:s,textContent:i}=n||{},{focusOffset:r}=e||{};let l=null;return s==="#text"&&i&&(l=i.slice(0,r)),l},P=o=>{let t=null,e=null,n=null;return o.getSelection&&(n=o.getSelection(),n.getRangeAt&&n.rangeCount&&(e=n.getRangeAt(0),t={range:e,selection:n})),t},V=(o,t)=>{const{label:e,symbol:n}=o||{},s=t.createElement("button");return s.dataset.value=JSON.stringify(o),s.textContent=`${n||"@"}${e||""}`,s.contentEditable=!1,s.addEventListener("click",()=>!1,!1),s.tabindex="-1",s},k=(o,t)=>t.createTextNode(o),xt=o=>o.createElement("br"),Dt=o=>k("\u200B",o),U=({data:o,that:t,doc:e,setupRef:n})=>{var c,a;const{isShowDropdown:s,editorRange:i,symbolsPolicy:r}=n;s.value=!1;const l=v(t,"editorEle");if(l){l.focus();const{range:d}=i.value||{};if(!d||!r.value)return;const{endContainer:p,endOffset:S}=d||{},{nodeValue:C}=p||{},{regExp:x}=r.value||{},y=x.exec(C);if(y&&y.length>1){d.setStart(p,y.index),d.setEnd(p,S),d.deleteContents();const D=V(o,e),E=Dt(e);i.value&&$({html:[D,E],selection:(c=i.value)==null?void 0:c.selection,range:(a=i.value)==null?void 0:a.range,that:t,doc:e,setupRef:n})}}},Et=o=>{let t=[];return o&&Array.from(o.childNodes).forEach(function(e){if(e.nodeName==="#text"){let n=e.nodeValue;n&&n.length>0&&n[n.length-1].charCodeAt(0)===8203&&(n=n.slice(0,-1)),n&&t.push({type:"text",data:n})}else e.nodeName==="BR"?t.push({type:"br",data:`
`}):e.nodeName==="BUTTON"?t.push({type:"symbol",data:JSON.parse(e.dataset.value)}):e.nodeName==="SPAN"&&t.push({type:"text",data:e.textContent})}),t=Tt(t),t},Tt=o=>{const t=[];return o.forEach(e=>{const n=t[t.length-1];n&&n.type&&n.type==="text"&&e.type==="text"?n.data=n.data+e.data:t.push(e)}),t},W=({symbolsPolicy:o,that:t,win:e,setupRef:n})=>{const{list:s}=n;b({that:t,symbolsPolicy:o,win:e,setupRef:n}),o.getListByKeywords().then(i=>{s.value=i,b({that:t,symbolsPolicy:o,win:e,setupRef:n})})},_t=({symbolsPolicy:o,that:t,keywords:e,win:n,setupRef:s})=>{b({that:t,symbolsPolicy:o,win:n,setupRef:s});const{list:i}=s;o.getListByKeywords(e).then(r=>{i.value=r,b({that:t,symbolsPolicy:o,win:n,setupRef:s})})},Pt=({that:o,win:t,setupRef:e})=>{const n=v(o,"editorEle"),s=v(o,"dropdownEle");if(!n)return;const i=gt(n,t),r=dt({caret:i,dropdownEle:s,scrollingEle:t.document.scrollingElement}),{dropdownPos:l,isShowDropdown:c,activeIndex:a}=e;l.value={left:r.left+"px",top:r.top+"px"},a.value=0,c.value=!0},b=({that:o,symbolsPolicy:t,win:e,setupRef:n})=>{const{isShowDropdown:s,symbolsPolicy:i}=n;s.value=!1,i.value=null,_(()=>{Pt({that:o,win:e,setupRef:n}),i.value=t})},$=({html:o,selection:t,range:e,that:n,doc:s,setupRef:i})=>{if(e&&t){const r=s.createElement("div");let l=1;typeof o=="string"?(r.innerHTML=o,l=o.length):Array.isArray(o)?o.forEach(p=>{r.appendChild(p)}):r.appendChild(o);const c=s.createDocumentFragment();let a,d;for(;a=r.firstChild;)d=c.appendChild(a);e.insertNode(c),d&&(t.extend(d,l),t.collapseToEnd()),O({that:n,setupRef:i})}},Ot=(o,t)=>{let e;return t.clipboardData&&t.clipboardData.getData?e=t.clipboardData.getData("Text"):o.clipboardData&&o.clipboardData.getData&&(e=o.clipboardData.getData("text/plain")),e},Lt=({htmlDom:o,that:t,win:e,setupRef:n})=>{var i;const s=P(e);s&&o&&((i=s==null?void 0:s.range)==null||i.deleteContents(),$({html:o,selection:s.selection,range:s.range,that:t,doc:e.document,setupRef:n}))},O=({that:o,setupRef:t})=>{const e=Et(v(o,"editorEle")),{editorValue:n}=t;n.value=e},Bt=(o,t)=>{const e=[];return o.forEach(n=>{const{type:s,data:i}=n;if(s==="symbol"){const r=V(i,t);e.push(r)}else s==="br"?e.push(xt(t)):e.push(k(i,t))}),e},At=({e:o,that:t,win:e,setupRef:n})=>{const{isShowDropdown:s,activeIndex:i,list:r}=n;s.value&&(K(o)||z(o)?(K(o)&&wt(n),z(o)&&mt(i),m({e:o,setupRef:n})):yt(o)?(s.value=!1,m({e:o,setupRef:n}),U({data:r.value[i.value],that:t,doc:e.document,setupRef:n})):vt(o)&&(s.value=!1,m({e:o,setupRef:n})))},Nt=({e:o,that:t,win:e,props:n,setupRef:s})=>{const{preventKeyUp:i}=s;if(i.value){i.value=!1;return}i.value=!1;const r=bt({e:o,props:n});r?W({symbolsPolicy:r,that:t,win:e,setupRef:s}):(G({that:t,win:e,props:n,setupRef:s}),_(()=>{O({that:t,setupRef:s})}))},G=({that:o,win:t,props:e,setupRef:n})=>{const s=P(t),i=Ct(s);if(i===null)return;const r=St({props:e,str:i});if(r){const{getKeywords:l}=r,c=l(i);if(c?_t({keywords:c,symbolsPolicy:r,that:o,win:t,setupRef:n}):W({symbolsPolicy:r,that:o,win:t,setupRef:n}),s){const{editorRange:a}=n;a.value=s}}J(n)},J=({list:o,isShowDropdown:t})=>{o.value=[],t.value=!1},Ht=({e:o,that:t,win:e,setupRef:n})=>{const s=Ot(o,e);return s&&Lt({htmlDom:s,that:t,win:e,setupRef:n}),o.preventDefault(),!1},Kt=({e:o,data:t,that:e,win:n,setupRef:s})=>{const{isShowDropdown:i}=s;i.value=!1,m({e:o,setupRef:s}),U({data:t,that:e,doc:n.document,setupRef:s})},zt=({win:o,setupRef:t})=>{const{isShowDropdown:e,editorRange:n}=t;e.value&&(n.value=P(o))},It=({that:o,doc:t,value:e,setupRef:n})=>{let s;const{length:i}=e||[];i&&(s=Bt(e,t));const{length:r}=s||[];if(r){const l=t.createElement("div");(s||[]).forEach(a=>{l.appendChild(a)});const c=v(o,"editorEle");c.innerHTML=l.innerHTML,O({that:o,setupRef:n})}},Mt=({symbol:o,regExp:t,watchInputEvent:e,getListByKeywords:n,watchStr:s,getKeywords:i})=>({symbol:o,regExp:t,watchStr:s||(c=>{const a=t.exec(c);return!!(a&&a.length>=2)}),getKeywords:i||(c=>{const[a,d]=t.exec(c)||[];return a===o?"":d}),watchInputEvent:e,getListByKeywords:n});const q={watchSymbolsPolicy:{type:Array,required:!0}};q.modelValue={type:Array,default:()=>[]};const F=M({name:"TextareaSymbol",props:q,setup(o,{emit:t}){const e=R(),n=h([]),s=h(0),i=h({top:"0",left:"0"}),r=h(!1),l=h([]),c=h(!1),a=h(null),d=h(null),p={list:n,activeIndex:s,dropdownPos:i,isShowDropdown:r,editorValue:l,preventKeyUp:c,symbolsPolicy:a,editorRange:d};H(()=>o.modelValue,u=>{JSON.stringify(u)!==JSON.stringify(l.value)&&_(()=>{It({value:u,doc:window.document,that:e,setupRef:p})})},{immediate:!0}),H(l,u=>{t("update:modelValue",u)});const S=u=>Nt({e:u,that:e,win:window,props:o,setupRef:p}),C=u=>At({e:u,that:e,win:window,setupRef:p}),x=()=>J(p),y=()=>G({that:e,win:window,props:o,setupRef:p}),D=u=>Ht({e:u,that:e,win:window,setupRef:p}),E=()=>console.log("\u6B63\u5728\u8F93\u5165\u4E2D\u6587"),j=()=>zt({win:window,setupRef:p}),X=u=>{u.stopPropagation(),u.preventDefault()},Y=()=>f("div",{ref:"editorEle",class:"btp-textarea-symbol__editor",attrs:{contenteditable:!0},on:{keyup:S,keydown:C,blur:x,mouseup:y,paste:D,compositionstart:E,compositionend:j}}),Q=()=>n.value.map((u,Z)=>f("li",{key:u.id,class:["btp-dropdown__item",{active:s.value==Z}],on:{mousedown:tt=>Kt({e:tt,data:u,that:e,win:window,setupRef:p})}},[f(u.componentName||"span",u.componentProps||{},u.label)]));return()=>f("div",{ref:"symbolEditorEle",class:"btp-textarea-symbol"},[Y(),f("div",{ref:"dropdownEle",class:"btp-textarea-symbol__dropdown",style:[i.value,{display:r.value?"block":"none"}],on:{mousedown:X}},[f("div",{class:"btp-scrollbar"},[f("div",{class:"btp-scrollbar__wrap btp-dropdown__wrap"},[f("ul",{class:"btp-dropdown__list"},Q())])])])])}});F.initSymbolsPolicy=Mt;const kt=F;const Ut=M({name:"BgVideo",props:{sources:{type:Array,required:!0},poster:{type:String,required:!0}},setup(o,t){const e=R(),n=h(!1),s=()=>{n.value=!0},i=()=>{console.log("checkPaly isPlaying.value",n.value),setTimeout(()=>{var r;if(console.log("checkPaly setTimeout isPlaying.value",n.value),!n.value){const l=(r=e==null?void 0:e.refs)==null?void 0:r.video;l==null||l.play(),i()}},3e3)};return it(()=>{var l;const r=(l=e==null?void 0:e.refs)==null?void 0:l.video;r&&(r.removeEventListener("playing",s),r.addEventListener("playing",s)),i()}),()=>f("div",{class:"btp-bg-video"},[f("div",{style:{"z-index":1}},ct(t)),f("video",{ref:"video",style:{inset:"-100%"},attrs:{poster:o.poster,autoplay:!0,loop:"loop",muted:!0,preload:"auto","webkit-playsinline":!0,playsinline:"true","x-webkit-airplay":"allow","x5-video-player-type":"h5","x5-video-player-fullscreen":!0,"x5-video-orientation":"portraint"}},[o.sources.map(r=>f("source",{attrs:{src:r}}))])])}});export{Ut as _,kt as a};
