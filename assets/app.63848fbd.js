var Fe=Object.defineProperty,Ve=Object.defineProperties;var qe=Object.getOwnPropertyDescriptors;var ue=Object.getOwnPropertySymbols;var We=Object.prototype.hasOwnProperty,Ge=Object.prototype.propertyIsEnumerable;var de=(e,t,n)=>t in e?Fe(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,E=(e,t)=>{for(var n in t||(t={}))We.call(t,n)&&de(e,n,t[n]);if(ue)for(var n of ue(t))Ge.call(t,n)&&de(e,n,t[n]);return e},N=(e,t)=>Ve(e,qe(t));import{r as ne,m as pe,a as Se,n as Je,i as Ke,d as w,h as U,_ as m,o as u,c as p,b as l,e as _,u as d,t as K,f as R,g as L,w as A,j as y,k as F,v as V,l as S,p as f,q as H,s as se,x as O,y as Y,z as Ye,A as k,B as oe,C as Ce,D as Pe,E as ae,F as z,G as X,H as Xe,I as Ae,J as Qe,K as Ze}from"./plugin-vue_export-helper.578eeb7e.js";const B=typeof window!="undefined";function Ee(e,t){return`${e}${t}`.replace(/\/+/g,"/")}function Be(e){let t=e.replace(/\.html$/,"");if(t.endsWith("/")&&(t+="index"),B){const n="/btp_f_comp/";t=t.slice(n.length).replace(/\//g,"_")+".md";const s=__VP_HASH_MAP__[t.toLowerCase()];t=`${n}assets/${t}.${s}.js`}else t=`./${t.slice(1).replace(/\//g,"_")}.md.js`;return t}const Te=Symbol(),he="http://a.com",et=()=>({path:"/",component:null,data:null});function tt(e,t){const n=ne(et()),s=typeof window!="undefined";function a(r=s?location.href:"/"){const i=new URL(r,he);return!i.pathname.endsWith("/")&&!i.pathname.endsWith(".html")&&(i.pathname+=".html",r=i.pathname+i.search+i.hash),s&&(history.replaceState({scrollPosition:window.scrollY},document.title),history.pushState(null,"",r)),c(r)}let o=null;async function c(r,i=0){const h=new URL(r,he),g=o=h.pathname;try{let $=e(g);if("then"in $&&typeof $.then=="function"&&($=await $),o===g){o=null;const{default:x,__pageData:b}=$;if(!x)throw new Error(`Invalid route component: ${x}`);n.path=g,n.component=pe(x),n.data=Se(JSON.parse(b)),s&&Je(()=>{if(h.hash&&!i){const C=document.querySelector(decodeURIComponent(h.hash));if(C){_e(C,h.hash);return}}window.scrollTo(0,i)})}}catch($){$.message.match(/fetch/)||console.error($),o===g&&(o=null,n.path=g,n.component=t?pe(t):null)}}return s&&(window.addEventListener("click",r=>{const i=r.target.closest("a");if(i){const{href:h,protocol:g,hostname:$,pathname:x,hash:b,target:C}=i,M=window.location,I=x.match(/\.\w+$/);!r.ctrlKey&&!r.shiftKey&&!r.altKey&&!r.metaKey&&C!=="_blank"&&g===M.protocol&&$===M.hostname&&!(I&&I[0]!==".html")&&(r.preventDefault(),x===M.pathname?b&&b!==M.hash&&(history.pushState(null,"",b),_e(i,b,i.classList.contains("header-anchor"))):a(h))}},{capture:!0}),window.addEventListener("popstate",r=>{c(location.href,r.state&&r.state.scrollPosition||0)}),window.addEventListener("hashchange",r=>{r.preventDefault()})),{route:n,go:a}}function nt(){const e=Ke(Te);if(!e)throw new Error("useRouter() is called without provider.");return e}function P(){return nt().route}function _e(e,t,n=!1){const s=document.querySelector(".nav-bar").offsetHeight,a=e.classList.contains(".header-anchor")?e:document.querySelector(decodeURIComponent(t));if(a){const o=a.offsetTop-s-15;!n||Math.abs(o-window.scrollY)>window.innerHeight?window.scrollTo(0,o):window.scrollTo({left:0,top:o,behavior:"smooth"})}}const st=w({name:"VitePressContent",setup(){const e=P();return()=>e.component?U(e.component):null}});const ot={setup(){return{}}},at={t:"1596458734865",class:"icon",viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"4898","xmlns:xlink":"http://www.w3.org/1999/xlink",width:"16",height:"16"},rt=l("path",{d:"M68.608 962.56V206.848h740.864V962.56H68.608zM746.496 271.36H131.584v629.248h614.912V271.36zM131.584 262.144","p-id":"4899",fill:"#666"},null,-1),ct=l("path",{d:"M219.136 65.024v116.224h62.976V129.536h614.912v629.248h-60.416v61.952h123.392V65.024z","p-id":"4900",fill:"#666"},null,-1),it=[rt,ct];function lt(e,t,n,s,a,o){return u(),p("svg",at,it)}var ut=m(ot,[["render",lt]]);const dt={setup(){return{}}},pt={t:"1596458647160",class:"icon",viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"2840","xmlns:xlink":"http://www.w3.org/1999/xlink",width:"22",height:"22"},ht=l("path",{d:"M311.1 739c-6.1 0-12.2-2.3-16.8-7L69.7 507.4l224.6-224.6c9.3-9.3 24.3-9.3 33.6 0s9.3 24.3 0 33.6l-191 191 191 191c9.3 9.3 9.3 24.3 0 33.6-4.6 4.7-10.7 7-16.8 7zM711.5 739c-6.1 0-12.2-2.3-16.8-7-9.3-9.3-9.3-24.3 0-33.6l191-191-191-191c-9.3-9.3-9.3-24.3 0-33.6s24.3-9.3 33.6 0L953 507.4 728.3 732c-4.6 4.7-10.7 7-16.8 7zM418.5 814.7c-2.4 0-4.8-0.4-7.2-1.1-12.5-4-19.4-17.3-15.5-29.8l179.6-567.1c4-12.5 17.3-19.4 29.8-15.5 12.5 4 19.4 17.3 15.5 29.8L441.1 798.1a23.73 23.73 0 0 1-22.6 16.6z",fill:"#666","p-id":"2841"},null,-1),_t=[ht];function ft(e,t,n,s,a,o){return u(),p("svg",pt,_t)}var vt=m(dt,[["render",ft]]);const mt=["href"],gt=l("div",{style:{width:"16px","margin-left":"6px"}},[l("svg",{version:"1.1",id:"Layer_1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",x:"0px",y:"0px",viewBox:"0 0 1024 1024","xml:space":"preserve"},[l("g",null,[l("path",{d:"M1004.57 319.408l-468-312c-15.974-9.83-33.022-9.92-49.142 0l-468 312C7.428 327.406 0 341.694 0 355.978v311.998c0 14.286 7.428 28.572 19.43 36.572l468 312.044c15.974 9.83 33.022 9.92 49.142 0l468-312.044c12-7.998 19.43-22.286 19.43-36.572V355.978c-0.002-14.284-7.43-28.572-19.432-36.57zM556 126.262l344.572 229.716-153.714 102.858L556 331.406V126.262z m-88 0v205.144l-190.858 127.43-153.714-102.858L468 126.262zM88 438.264l110.286 73.714L88 585.692v-147.428z m380 459.43L123.428 667.978l153.714-102.858L468 692.55v205.144z m44-281.716l-155.43-104 155.43-104 155.43 104-155.43 104z m44 281.716V692.55l190.858-127.43 153.714 102.858L556 897.694z m380-312.002l-110.286-73.714L936 438.264v147.428z","p-id":"2793",fill:"#555"})])])],-1),$t=[gt],bt=w({props:{content:null,importMap:null},setup(e){const t=e,n="https://sfc.vuejs.org/",s=_(()=>{const a={"App.vue":t.content};if(t.importMap)try{a["import-map.json"]=JSON.stringify({imports:JSON.parse(decodeURIComponent(t.importMap))})}catch{}return`${n}#${btoa(unescape(encodeURIComponent(JSON.stringify(a))))}`});return(a,o)=>(u(),p("a",{href:d(s),style:{display:"flex","align-items":"center"},target:"_blank"},$t,8,mt))}});function kt(e){const t=ne({showTip:!1});function n(){navigator.clipboard.writeText(e),t.showTip=!0,setTimeout(()=>{t.showTip=!1},5*1e3)}return N(E({},K(t)),{copyCode:n})}const fe=/<script.*>([\s\S]+)<\/script>/,ve=/<style>([\s\S]+)<\/style>/,me=/<template>([\s\S]+)<\/template>/,Z=e=>t=>{const n=t.match(e);return n&&n[1].trim()},ge=e=>JSON.parse(decodeURIComponent(e));function wt(e,t,n){const s=ne({expand:!1}),a=()=>s.expand=!s.expand,o=_(()=>{const c=Z(fe)(e)||"",r=Z(ve)(e)||"",i=Z(me)(e)||e.replace(fe,"").replace(ve,"").replace(me,"").trim(),h=ge(t),g=ge(n);return{js:c,css:r,html:i,jsLibs:h,cssLibs:g}});return N(E({},K(s)),{toggleExpand:a,parsedCode:o})}const yt={props:{componentName:String,htmlStr:String,codeStr:String,importMap:String,language:{default:"vue",type:String},platforms:{default:()=>["codepen"],type:Array},jsLibsStr:{type:String,default:"[]"},cssLibsStr:{type:String,default:"[]"},title:{type:String,default:""},desc:{type:String,default:""}},components:{copySvg:ut,codeSvg:vt,OnlineEdit:bt},setup(e){const t=_(()=>{var i;return decodeURIComponent((i=e.htmlStr)!=null?i:"")}),n=_(()=>{var i;return decodeURIComponent((i=e.codeStr)!=null?i:"")}),{showTip:s,copyCode:a}=kt(n.value),{expand:o,toggleExpand:c,parsedCode:r}=wt(n.value,e.jsLibsStr,e.cssLibsStr);return{expand:o,toggleExpand:c,decodedHtmlStr:t,parsedCode:r,showTip:s,copyCode:a,decodedCodeStr:n}}},xt={class:"demo-slot"},Lt={class:"demo-title-desc"},St={class:"demo-title"},Ct={class:"demo-desc"},Pt={class:"demo-actions"},At={class:"demo-platforms"},Et={class:"demo-buttons"},Bt={class:"demo-actions-copy"},Tt={class:"demo-actions-tip"},Rt=["innerHTML"];function Mt(e,t,n,s,a,o){const c=R("OnlineEdit"),r=R("copySvg"),i=R("codeSvg"),h=R("ClientOnly");return u(),L(h,null,{default:A(()=>[l("article",se(e.$attrs,{class:"demo"}),[l("div",xt,[y(e.$slots,"default")]),F(l("div",Lt,[l("span",St,S(n.title),1),l("span",Ct,S(n.desc),1)],512),[[V,n.title||n.desc]]),l("div",Pt,[l("div",At,[f(c,{content:s.decodedCodeStr,importMap:n.importMap},null,8,["content","importMap"])]),l("div",Et,[l("div",Bt,[F(l("span",Tt,"\u590D\u5236\u6210\u529F!",512),[[V,s.showTip]]),F(f(r,{onClick:s.copyCode,title:"\u590D\u5236"},null,8,["onClick"]),[[V,!s.showTip]])]),f(i,{class:"demo-actions-expand",onClick:t[0]||(t[0]=g=>s.toggleExpand()),title:"\u5C55\u5F00"})])]),F(l("div",{innerHTML:s.decodedHtmlStr,class:H(`language-${n.language} extra-class`)},null,10,Rt),[[V,s.expand]])],16)]),_:3})}var It=m(yt,[["render",Mt]]);const Dt=w({setup(e,{slots:t}){const n=O(!1);return Y(()=>{n.value=!0}),()=>n.value&&t.default?t.default():null}});function Nt(e,t,n,s){Object.defineProperties(e.config.globalProperties,{$site:{get(){return t.value}},$siteByRoute:{get(){return n.value}},$themeConfig:{get(){return n.value.themeConfig}},$page:{get(){return s.value}},$frontmatter:{get(){return s.value.frontmatter}},$lang:{get(){return n.value.lang}},$localePath:{get(){const{locales:a}=t.value,{lang:o}=n.value,c=Object.keys(a).find(r=>a[r].lang===o);return a&&c||"/"}},$title:{get(){return s.value.title?s.value.title+" | "+n.value.title:n.value.title}},$description:{get(){return s.value.description||n.value.description}},$withBase:{value(a){return Ee(t.value.base,a)}}})}function Ut(e){e.component("Content",st),e.component("ClientOnly",Dt),e.component("Demo",It),e.component("Debug",()=>null)}var Ht='{"lang":"en-US","title":"@belloai/comp","description":"A VitePress site","base":"/btp_f_comp/","head":[["link",{"rel":"icon","type":"image/svg+xml","href":"/logo.svg"}]],"themeConfig":{"logo":"/logo.svg","lang":"zh-CN","locales":{"/":{"lang":"zh-CN","title":"@belloai/comp","description":"","nav":[{"text":"\u4ECB\u7ECD","link":"/"},{"text":"\u7EC4\u4EF6","link":"/components/"}],"sidebar":[{"text":"\u5F00\u59CB","link":"/components/"},{"text":"TextareaSymbol","link":"/components/TextareaSymbol/"}],"editLinkText":"\u6B22\u8FCE\u5E2E\u52A9\u6211\u4EEC\u6539\u5584\u9875\u9762!"}},"search":{"searchMaxSuggestions":10},"repo":"threfo/btp_f_comp","repoLabel":"Github","lastUpdated":true,"prevLink":true,"nextLink":true,"docsDir":"docs","docsBranch":"master","editLinks":true},"locales":{},"customData":{}}';const W=O(zt(Ht));function Q(){return W}function zt(e){return Se(JSON.parse(e))}const Ot=typeof window!="undefined";function jt(e,t){t.sort((n,s)=>{const a=s.split("/").length-n.split("/").length;return a!==0?a:s.length-n.length});for(const n of t)if(e.startsWith(n))return n}function $e(e,t){const n=jt(t,Object.keys(e));return n?e[n]:void 0}function Ft(e,t){t=Vt(e,t);const n=$e(e.locales||{},t)||{},s=$e(e.themeConfig&&e.themeConfig.locales||{},t)||{};return N(E(E({},e),n),{themeConfig:N(E(E({},e.themeConfig),s),{locales:{}}),locales:{}})}function Vt(e,t){if(!Ot)return t;const n=e.base,s=n.endsWith("/")?n.slice(0,-1):n;return t.slice(s.length)}function T(e){const t=e||P();return _(()=>Ft(W.value,t.path))}function j(e){const t=e||P();return _(()=>t.data)}function qt(e,t){const n=Array.from(document.querySelectorAll("meta"));let s=!0;const a=o=>{if(s){s=!1;return}n.forEach(c=>document.head.removeChild(c)),n.length=0,o&&o.length&&o.forEach(c=>{const r=Wt(c);document.head.appendChild(r),n.push(r)})};Ye(()=>{const o=e.data,c=t.value,r=o&&o.title,i=o&&o.description,h=o&&o.frontmatter.head;document.title=(r?r+" | ":"")+c.title,a([["meta",{charset:"utf-8"}],["meta",{name:"viewport",content:"width=device-width,initial-scale=1"}],["meta",{name:"description",content:i||c.description}],...c.head,...h&&Jt(h)||[]])})}function Wt([e,t,n]){const s=document.createElement(e);for(const a in t)s.setAttribute(a,t[a]);return n&&(s.innerHTML=n),s}function Gt(e){return e[0]==="meta"&&e[1]&&e[1].name==="description"}function Jt(e){return e.filter(t=>!Gt(t))}const Kt=/#.*$/,Yt=/(index)?\.(md|html)$/,G=/\/$/,Xt=/^[a-z]+:/i;function Qt(e){return e==null}function re(e){return Array.isArray(e)}function ce(e){return Xt.test(e)}function Zt(e,t){if(t===void 0)return!1;const n=be(`/${e.data.relativePath}`),s=be(t);return n===s}function be(e){return decodeURI(e).replace(Kt,"").replace(Yt,"")}function en(e,t){const n=e.endsWith("/"),s=t.startsWith("/");return n&&s?e.slice(0,-1)+t:!n&&!s?`${e}/${t}`:e+t}function te(e){return/^\//.test(e)?e:`/${e}`}function Re(e){return e.replace(/(index)?(\.(md|html))?$/,"")||"/"}function tn(e){return e===!1||e==="auto"||re(e)}function nn(e){return e.children!==void 0}function sn(e){return re(e)?e.length===0:!e}function ie(e,t){if(tn(e))return e;t=te(t);for(const n in e)if(t.startsWith(te(n)))return e[n];return"auto"}function Me(e){return e.reduce((t,n)=>(n.link&&t.push({text:n.text,link:Re(n.link)}),nn(n)&&(t=[...t,...Me(n.children)]),t),[])}const on={},an=["href","aria-label"],rn=["src"];function cn(e,t){return u(),p("a",{class:"nav-bar-title",href:e.$withBase(e.$localePath),"aria-label":`${e.$siteByRoute.title}, back to home`},[e.$themeConfig.logo?(u(),p("img",{key:0,class:"logo",src:e.$withBase(e.$themeConfig.logo),alt:"Logo"},null,8,rn)):k("",!0),oe(" "+S(e.$site.title),1)],8,an)}var ln=m(on,[["render",cn],["__scopeId","data-v-05b58416"]]);function un(){const e=P(),t=Q();return _(()=>{const s=t.value.themeConfig.locales;if(!s)return null;const a=Object.keys(s);if(a.length<=1)return null;const o=B?t.value.base:"/",c=o.endsWith("/")?o.slice(0,-1):o,r=e.path.slice(c.length),i=a.find(b=>b==="/"?!1:r.startsWith(b)),h=i?r.substring(i.length-1):r,g=a.map(b=>{const C=b.endsWith("/")?b.slice(0,-1):b;return{text:s[b].label,link:`${C}${h}`}}),$=i||"/";return{text:s[$].selectText?s[$].selectText:"Languages",items:g}})}const dn=["GitHub","GitLab","Bitbucket"].map(e=>[e,new RegExp(e,"i")]);function pn(){const e=T();return _(()=>{const t=e.value.themeConfig,n=t.docsRepo||t.repo;if(!n)return null;const s=hn(n);return{text:_n(s,t.repoLabel),link:s}})}function hn(e){return/^https?:/.test(e)?e:`https://github.com/${e}`}function _n(e,t){if(t)return t;const n=e.match(/^https?:\/\/[^/]+/);if(!n)return"Source";const s=dn.find(([a,o])=>o.test(n[0]));return s&&s[0]?s[0]:"Source"}function fn(){const e=Q();function t(n){return Ee(e.value.base,n)}return{withBase:t}}function Ie(e){const t=P(),{withBase:n}=fn(),s=ce(e.value.link);return{props:_(()=>{const o=ke(`/${t.data.relativePath}`);let c=!1;if(e.value.activeMatch)c=new RegExp(e.value.activeMatch).test(o);else{const r=ke(n(e.value.link));c=r==="/"?r===o:o.startsWith(r)}return{class:{active:c,isExternal:s},href:s?e.value.link:n(e.value.link),target:e.value.target||s?"_blank":null,rel:e.value.rel||s?"noopener noreferrer":null,"aria-label":e.value.ariaLabel}}),isExternal:s}}function ke(e){return e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\.(html|md)$/,"").replace(/\/index$/,"/")}const vn={},mn={class:"icon outbound",xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",x:"0px",y:"0px",viewBox:"0 0 100 100",width:"15",height:"15"},gn=l("path",{fill:"currentColor",d:"M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"},null,-1),$n=l("polygon",{fill:"currentColor",points:"45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"},null,-1),bn=[gn,$n];function kn(e,t){return u(),p("svg",mn,bn)}var le=m(vn,[["render",kn]]);const wn={class:"nav-link"},yn=w({props:{item:null},setup(e){const n=K(e),{props:s,isExternal:a}=Ie(n.item);return(o,c)=>(u(),p("div",wn,[l("a",se({class:"item"},d(s)),[oe(S(e.item.text)+" ",1),d(a)?(u(),L(le,{key:0})):k("",!0)],16)]))}});var we=m(yn,[["__scopeId","data-v-77e86150"]]);const xn=e=>(Ce("data-v-66fd601c"),e=e(),Pe(),e),Ln={class:"nav-dropdown-link-item"},Sn=xn(()=>l("span",{class:"arrow"},null,-1)),Cn={class:"text"},Pn={class:"icon"},An=w({props:{item:null},setup(e){const n=K(e),{props:s,isExternal:a}=Ie(n.item);return(o,c)=>(u(),p("div",Ln,[l("a",se({class:"item"},d(s)),[Sn,l("span",Cn,S(e.item.text),1),l("span",Pn,[d(a)?(u(),L(le,{key:0})):k("",!0)])],16)]))}});var En=m(An,[["__scopeId","data-v-66fd601c"]]);const Bn=["aria-label"],Tn={class:"button-text"},Rn={class:"dialog"},Mn=w({props:{item:null},setup(e){const t=P(),n=O(!1);ae(()=>t.path,()=>{n.value=!1});function s(){n.value=!n.value}return(a,o)=>(u(),p("div",{class:H(["nav-dropdown-link",{open:n.value}])},[l("button",{class:"button","aria-label":e.item.ariaLabel,onClick:s},[l("span",Tn,S(e.item.text),1),l("span",{class:H(["button-arrow",n.value?"down":"right"])},null,2)],8,Bn),l("ul",Rn,[(u(!0),p(z,null,X(e.item.items,c=>(u(),p("li",{key:c.text,class:"dialog-item"},[f(En,{item:c},null,8,["item"])]))),128))])],2))}});var ye=m(Mn,[["__scopeId","data-v-0fc1387b"]]);const In={key:0,class:"nav-links"},Dn={key:1,class:"item"},Nn={key:2,class:"item"},Un=w({setup(e){const t=T(),n=un(),s=pn(),a=_(()=>o.value||s.value),o=_(()=>t.value.themeConfig.nav);return(c,r)=>d(a)?(u(),p("nav",In,[d(o)?(u(!0),p(z,{key:0},X(d(o),i=>(u(),p("div",{key:i.text,class:"item"},[i.items?(u(),L(ye,{key:0,item:i},null,8,["item"])):(u(),L(we,{key:1,item:i},null,8,["item"]))]))),128)):k("",!0),d(n)?(u(),p("div",Dn,[f(ye,{item:d(n)},null,8,["item"])])):k("",!0),d(s)?(u(),p("div",Nn,[f(we,{item:d(s)},null,8,["item"])])):k("",!0)])):k("",!0)}});var De=m(Un,[["__scopeId","data-v-3de693e3"]]);const Hn={emits:["toggle"]},zn=l("svg",{class:"icon",xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",role:"img",viewBox:"0 0 448 512"},[l("path",{fill:"currentColor",d:"M436 124H12c-6.627 0-12-5.373-12-12V80c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12z",class:""})],-1),On=[zn];function jn(e,t,n,s,a,o){return u(),p("div",{class:"sidebar-button",onClick:t[0]||(t[0]=c=>e.$emit("toggle"))},On)}var Fn=m(Hn,[["render",jn]]);const Vn=e=>(Ce("data-v-b2bb904e"),e=e(),Pe(),e),qn={class:"nav-bar"},Wn=Vn(()=>l("div",{class:"flex-grow"},null,-1)),Gn={class:"nav"},Jn=w({emits:["toggle"],setup(e){return(t,n)=>(u(),p("header",qn,[f(Fn,{onToggle:n[0]||(n[0]=s=>t.$emit("toggle"))}),f(ln),Wn,l("div",Gn,[f(De)]),y(t.$slots,"search",{},void 0,!0)]))}});var Kn=m(Jn,[["__scopeId","data-v-b2bb904e"]]);function Yn(){let e=null,t=null;const n=ts(s,300);function s(){const c=Xn(),r=Qn(c);for(let i=0;i<r.length;i++){const h=r[i],g=r[i+1],[$,x]=es(i,h,g);if($){history.replaceState(null,document.title,x||" "),a(x);return}}}function a(c){if(o(t),o(e),t=document.querySelector(`.sidebar a[href="${c}"]`),!t)return;t.classList.add("active");const r=t.closest(".sidebar-links > ul > li");r&&r!==t.parentElement?(e=r.querySelector("a"),e&&e.classList.add("active")):e=null}function o(c){c&&c.classList.remove("active")}Y(()=>{s(),window.addEventListener("scroll",n)}),Xe(()=>{a(decodeURIComponent(location.hash))}),Ae(()=>{window.removeEventListener("scroll",n)})}function Xn(){return[].slice.call(document.querySelectorAll(".sidebar a.sidebar-link-item"))}function Qn(e){return[].slice.call(document.querySelectorAll(".header-anchor")).filter(t=>e.some(n=>n.hash===t.hash))}function Zn(){return document.querySelector(".nav-bar").offsetHeight}function xe(e){const t=Zn();return e.parentElement.offsetTop-t-15}function es(e,t,n){const s=window.scrollY;return e===0&&s===0?[!0,null]:s<xe(t)?[!1,null]:!n||s<xe(n)?[!0,decodeURIComponent(t.hash)]:[!1,null]}function ts(e,t){let n,s=!1;return()=>{n&&clearTimeout(n),s?n=setTimeout(e,t):(e(),s=!0,setTimeout(()=>{s=!1},t))}}function ns(){const e=P(),t=T();return Yn(),_(()=>{const n=e.data.headers,s=e.data.frontmatter.sidebar,a=e.data.frontmatter.sidebarDepth;if(s===!1)return[];if(s==="auto")return Le(n,a);const o=ie(t.value.themeConfig.sidebar,e.data.relativePath);return o===!1?[]:o==="auto"?Le(n,a):o})}function Le(e,t){const n=[];if(e===void 0)return[];let s;return e.forEach(({level:a,title:o,slug:c})=>{if(a-1>t)return;const r={text:o,link:`#${c}`};a===2?(s=r,n.push(r)):s&&(s.children||(s.children=[])).push(r)}),n}const Ne=e=>{const t=P(),n=Q();t.data.headers;const s=e.item.text,a=ss(n.value.base,e.item.link),o=e.item.children,c=Zt(t,e.item.link),r=os(c,o);return U("li",{class:"sidebar-link"},[U(a?"a":"p",{class:{"sidebar-link-item":!0,active:c},href:a},s),r])};function ss(e,t){return t===void 0||t.startsWith("#")?t:en(e,t)}function os(e,t,n){return t&&t.length>0?U("ul",{class:"sidebar-links"},t.map(s=>U(Ne,{item:s}))):null}const as={key:0,class:"sidebar-links"},rs=w({setup(e){const t=ns();return(n,s)=>d(t).length>0?(u(),p("ul",as,[(u(!0),p(z,null,X(d(t),a=>(u(),L(d(Ne),{key:a.text,item:a},null,8,["item"]))),128))])):k("",!0)}});const cs={setup(){const e=P();return{slugs:_(()=>{var a;const n=((a=e.data.headers)!=null?a:[]).filter(o=>o.level>1);let s=10;for(const{level:o}of n)s>o&&(s=o);return n.filter(o=>o.level<s+2).map(o=>N(E({},o),{link:`#${o.slug}`,level:o.level===s?1:2}))})}}},is={class:"right-slug"},ls=["href"];function us(e,t,n,s,a,o){return u(),p("ul",is,[(u(!0),p(z,null,X(s.slugs,({level:c,link:r,title:i})=>(u(),p("li",{class:H(`slug-item level-${c}`),key:r},[l("a",{href:r,class:"link"},S(i),9,ls)],2))),128))])}var ds=m(cs,[["render",us],["__scopeId","data-v-ca112384"]]);const ps=w({props:{open:{type:Boolean,required:!0}},setup(e){return(t,n)=>(u(),p(z,null,[l("aside",{class:H(["sidebar hover-scrollbar",{open:e.open}])},[f(De,{class:"nav"}),y(t.$slots,"sidebar-top",{},void 0,!0),f(rs),y(t.$slots,"sidebar-bottom",{},void 0,!0)],2),f(ds)],64))}});var hs=m(ps,[["__scopeId","data-v-61004fbf"]]);const _s=/bitbucket.org/;function fs(){const e=T(),t=j(),n=_(()=>{const a=Qt(t.value.frontmatter.editLink)?e.value.themeConfig.editLinks:t.value.frontmatter.editLink,{repo:o,docsDir:c="",docsBranch:r="master",docsRepo:i=o}=e.value.themeConfig,{relativePath:h}=t.value;return!a||!h||!o?null:vs(o,i,c,r,h)}),s=_(()=>e.value.themeConfig.editLinkText||"Edit this page");return{url:n,text:s}}function vs(e,t,n,s,a){return _s.test(e)?gs(e,t,n,s,a):ms(e,t,n,s,a)}function ms(e,t,n,s,a){return(ce(t)?t:`https://github.com/${t}`).replace(G,"")+`/edit/${s}/`+(n?n.replace(G,"")+"/":"")+a}function gs(e,t,n,s,a){return(ce(t)?t:e).replace(G,"")+`/src/${s}/`+(n?n.replace(G,"")+"/":"")+a+`?mode=edit&spa=0&at=${s}&fileviewer=file-view-default`}const $s={class:"edit-link"},bs=["href"],ks=w({setup(e){const{url:t,text:n}=fs();return(s,a)=>(u(),p("div",$s,[d(t)?(u(),p("a",{key:0,class:"link",href:d(t),target:"_blank",rel:"noopener noreferrer"},[oe(S(d(n))+" ",1),f(le,{class:"icon"})],8,bs)):k("",!0)]))}});var ws=m(ks,[["__scopeId","data-v-17eda031"]]);const ys={key:0,class:"last-updated"},xs={class:"prefix"},Ls={class:"datetime"},Ss=w({setup(e){const t=T(),n=j(),s=_(()=>{const c=t.value.themeConfig.lastUpdated;return c!==void 0&&c!==!1}),a=_(()=>{const c=t.value.themeConfig.lastUpdated;return c===!0?"Last Updated":c}),o=O("");return Y(()=>{o.value=new Date(n.value.lastUpdated).toLocaleString("en-US")}),(c,r)=>d(s)?(u(),p("p",ys,[l("span",xs,S(d(a))+":",1),l("span",Ls,S(o.value),1)])):k("",!0)}});var Cs=m(Ss,[["__scopeId","data-v-5a2a6a2c"]]);const Ps={class:"page-footer"},As={class:"edit"},Es={class:"updated"},Bs=w({setup(e){return(t,n)=>(u(),p("footer",Ps,[l("div",As,[f(ws)]),l("div",Es,[f(Cs)])]))}});var Ts=m(Bs,[["__scopeId","data-v-a6128342"]]);function Rs(){const e=T(),t=j(),n=_(()=>Re(te(t.value.relativePath))),s=_(()=>{const i=ie(e.value.themeConfig.sidebar,n.value);return re(i)?Me(i):[]}),a=_(()=>s.value.findIndex(i=>i.link===n.value)),o=_(()=>{if(e.value.themeConfig.nextLinks!==!1&&a.value>-1&&a.value<s.value.length-1)return s.value[a.value+1]}),c=_(()=>{if(e.value.themeConfig.prevLinks!==!1&&a.value>0)return s.value[a.value-1]}),r=_(()=>!!o.value||!!c.value);return{next:o,prev:c,hasLinks:r}}const Ms={},Is={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},Ds=l("path",{d:"M19,11H7.4l5.3-5.3c0.4-0.4,0.4-1,0-1.4s-1-0.4-1.4,0l-7,7c-0.1,0.1-0.2,0.2-0.2,0.3c-0.1,0.2-0.1,0.5,0,0.8c0.1,0.1,0.1,0.2,0.2,0.3l7,7c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4L7.4,13H19c0.6,0,1-0.4,1-1S19.6,11,19,11z"},null,-1),Ns=[Ds];function Us(e,t){return u(),p("svg",Is,Ns)}var Hs=m(Ms,[["render",Us]]);const zs={},Os={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},js=l("path",{d:"M19.9,12.4c0.1-0.2,0.1-0.5,0-0.8c-0.1-0.1-0.1-0.2-0.2-0.3l-7-7c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l5.3,5.3H5c-0.6,0-1,0.4-1,1s0.4,1,1,1h11.6l-5.3,5.3c-0.4,0.4-0.4,1,0,1.4c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3l7-7C19.8,12.6,19.9,12.5,19.9,12.4z"},null,-1),Fs=[js];function Vs(e,t){return u(),p("svg",Os,Fs)}var qs=m(zs,[["render",Vs]]);const Ws={key:0,class:"next-and-prev-link"},Gs={class:"container"},Js={class:"prev"},Ks=["href"],Ys={class:"text"},Xs={class:"next"},Qs=["href"],Zs={class:"text"},eo=w({setup(e){const{hasLinks:t,prev:n,next:s}=Rs();return(a,o)=>d(t)?(u(),p("div",Ws,[l("div",Gs,[l("div",Js,[d(n)?(u(),p("a",{key:0,class:"link",href:a.$withBase(d(n).link)},[f(Hs,{class:"icon icon-prev"}),l("span",Ys,S(d(n).text),1)],8,Ks)):k("",!0)]),l("div",Xs,[d(s)?(u(),p("a",{key:0,class:"link",href:a.$withBase(d(s).link)},[l("span",Zs,S(d(s).text),1),f(qs,{class:"icon icon-next"})],8,Qs)):k("",!0)])])])):k("",!0)}});var to=m(eo,[["__scopeId","data-v-b7bd651c"]]);const no={class:"page"},so={class:"container hover-scrollbar"},oo={class:"content"},ao=w({setup(e){return(t,n)=>{const s=R("Content");return u(),p("main",no,[l("div",so,[y(t.$slots,"top",{},void 0,!0),l("div",oo,[f(s)]),f(Ts),f(to),y(t.$slots,"bottom",{},void 0,!0)])])}}});var ro=m(ao,[["__scopeId","data-v-f7095a1c"]]);const co={key:0,id:"ads-container"},io=w({setup(e){const t=Qe(()=>import("./Home.c3d37269.js")),n=()=>null,s=n,a=n,o=n,c=P(),r=Q(),i=T(),h=_(()=>r.value.themeConfig),g=j(),$=_(()=>!!c.data.frontmatter.customLayout),x=_(()=>!!c.data.frontmatter.home),b=_(()=>{const{themeConfig:v}=i.value,{frontmatter:D}=c.data;return D.navbar===!1||v.navbar===!1?!1:r.value.title||v.logo||v.repo||v.nav}),C=O(!1),M=_(()=>{const{frontmatter:v}=c.data;if(v.home||v.sidebar===!1)return!1;const{themeConfig:D}=i.value;return!sn(ie(D.sidebar,c.data.relativePath))}),I=v=>{C.value=typeof v=="boolean"?v:!C.value},He=I.bind(null,!1);ae(c,He);const ze=_(()=>[{"no-navbar":!b.value,"sidebar-open":C.value,"no-sidebar":!M.value}]);return(v,D)=>{const Oe=R("Content"),je=R("Debug");return u(),p(z,null,[l("div",{class:H(["theme",d(ze)])},[d(b)?(u(),L(Kn,{key:0,onToggle:I},{search:A(()=>[y(v.$slots,"navbar-search",{},()=>[d(h).algolia?(u(),L(d(o),{key:0,options:d(h).algolia},null,8,["options"])):k("",!0)])]),_:3})):k("",!0),f(hs,{open:C.value},{"sidebar-top":A(()=>[y(v.$slots,"sidebar-top")]),"sidebar-bottom":A(()=>[y(v.$slots,"sidebar-bottom")]),_:3},8,["open"]),l("div",{class:"sidebar-mask",onClick:D[0]||(D[0]=yo=>I(!1))}),d($)?(u(),L(Oe,{key:1})):d(x)?(u(),L(d(t),{key:2},{hero:A(()=>[y(v.$slots,"home-hero")]),features:A(()=>[y(v.$slots,"home-features")]),footer:A(()=>[y(v.$slots,"home-footer")]),_:3})):(u(),L(ro,{key:3},{top:A(()=>[y(v.$slots,"page-top-ads",{},()=>[d(h).carbonAds&&d(h).carbonAds.carbon?(u(),p("div",co,[(u(),L(d(s),{key:"carbon"+d(g).relativePath,code:d(h).carbonAds.carbon,placement:d(h).carbonAds.placement},null,8,["code","placement"]))])):k("",!0)]),y(v.$slots,"page-top")]),bottom:A(()=>[y(v.$slots,"page-bottom"),y(v.$slots,"page-bottom-ads",{},()=>[d(h).carbonAds&&d(h).carbonAds.custom?(u(),L(d(a),{key:"custom"+d(g).relativePath,code:d(h).carbonAds.custom,placement:d(h).carbonAds.placement},null,8,["code","placement"])):k("",!0)])]),_:3}))],2),f(je)],64)}}}),lo={class:"theme"},uo=l("h1",null,"404",-1),po=["href"],ho=w({setup(e){const t=["There's nothing here.","How did we get here?","That's a Four-Oh-Four.","Looks like we've got some broken links."];function n(){return t[Math.floor(Math.random()*t.length)]}return(s,a)=>(u(),p("div",lo,[uo,l("blockquote",null,S(n()),1),l("a",{href:s.$site.base,"aria-label":"go to home"},"Take me home.",8,po)]))}}),J={Layout:io,NotFound:ho},ee=new Set,Ue=()=>document.createElement("link"),_o=e=>{const t=Ue();t.rel="prefetch",t.href=e,document.head.appendChild(t)},fo=e=>{const t=new XMLHttpRequest;t.open("GET",e,t.withCredentials=!0),t.send()};let q;const vo=B&&(q=Ue())&&q.relList&&q.relList.supports&&q.relList.supports("prefetch")?_o:fo;function mo(){if(!B||!window.IntersectionObserver)return;let e;if((e=navigator.connection)&&(e.saveData||/2g/.test(e.effectiveType)))return;const t=window.requestIdleCallback||setTimeout;let n=null;const s=()=>{n&&n.disconnect(),n=new IntersectionObserver(o=>{o.forEach(c=>{if(c.isIntersecting){const r=c.target;n.unobserve(r);const{pathname:i}=r;if(!ee.has(i)){ee.add(i);const h=Be(i);vo(h)}}})}),t(()=>{document.querySelectorAll("#app a").forEach(o=>{const{target:c,hostname:r,pathname:i}=o,h=i.match(/\.\w+$/);h&&h[0]!==".html"||c!=="_blank"&&r===location.hostname&&(i!==location.pathname?n.observe(o):ee.add(i))})})};Y(s);const a=P();ae(()=>a.path,s),Ae(()=>{n&&n.disconnect()})}const go=J.NotFound||(()=>"404 Not Found"),$o={name:"VitePressApp",setup(){return mo(),()=>U(J.Layout)}};function bo(){const e=wo(),t=ko();t.provide(Te,e);const n=T(e.route),s=j(e.route);return B&&qt(e.route,n),Nt(t,W,n,s),Ut(t),J.enhanceApp&&J.enhanceApp({app:t,router:e,siteData:W}),{app:t,router:e}}function ko(){return Ze($o)}function wo(){let e=B,t;return tt(n=>{let s=Be(n);return e&&(t=s),(e||t===s)&&(s=s.replace(/\.js$/,".lean.js")),B?(e=!1,import(s)):require(s)},go)}if(B){const{app:e,router:t}=bo();t.go().then(()=>{e.mount("#app")})}export{we as N,T as a,bo as createApp,j as u};
