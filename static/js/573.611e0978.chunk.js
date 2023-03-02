"use strict";(self.webpackChunkJun_Kumokawa=self.webpackChunkJun_Kumokawa||[]).push([[573,833],{65413:function(e,n,t){t(72791);var r=t(61889),o=t(13239),i=t(80184);n.Z=function(e){var n=e.children;return e.loading?(0,i.jsxs)(r.ZP,{container:!0,justifyContent:"center",p:2,flexDirection:"column",children:[(0,i.jsx)(r.ZP,{item:!0,textAlign:"center",children:(0,i.jsx)(o.Z,{"data-testid":"loading-circular-progress"})}),(0,i.jsx)(r.ZP,{item:!0,textAlign:"center",children:"Loading...."})]}):(0,i.jsx)(i.Fragment,{children:n})}},84833:function(e,n,t){t.r(n),t.d(n,{Consumer:function(){return x},Provider:function(){return m},RepositoryConsumer:function(){return x},RepositoryProvider:function(){return b},repositoryContext:function(){return h}});var r=t(74165),o=t(1413),i=t(15861),a=t(29439),u=t(72791),s=t(90065),c=t(59732),l=t(65413),f=t(80184),p=(new s.v,{repository:null,branches:[],tags:[],commits:[]}),d={state:p,dispatch:function(){},selectedBranch:null,changeBranch:function(){},allTrees:null,loading:!0,limited:!1,rateLimitResetTime:0},h=u.createContext(d),m=h.Provider,x=h.Consumer,b=function(e){var n=e.children,t=u.useState(p),s=(0,a.Z)(t,2),d=s[0],h=s[1],x=u.useState(null),b=(0,a.Z)(x,2),v=b[0],Z=b[1],g=u.useState(null),w=(0,a.Z)(g,2),y=w[0],k=w[1],j=u.useState(!0),S=(0,a.Z)(j,2),C=S[0],E=S[1],P=u.useState(!0),T=(0,a.Z)(P,2),_=T[0],B=T[1],M=u.useState(!0),K=(0,a.Z)(M,2),N=K[0],J=K[1],R=u.useState(!0),z=(0,a.Z)(R,2),A=z[0],F=z[1],G=u.useState(!1),I=(0,a.Z)(G,2),L=I[0],q=I[1],D=u.useState(!0),U=(0,a.Z)(D,2),W=U[0],X=U[1],H=u.useState(!1),O=(0,a.Z)(H,2),Q=O[0],V=O[1],Y=u.useState(0),$=(0,a.Z)(Y,2),ee=$[0],ne=$[1];function te(e){return re.apply(this,arguments)}function re(){return(re=(0,i.Z)((0,r.Z)().mark((function e(n){var t,o,i,a;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=1,o=[];case 2:return e.next=5,c.M.request("".concat(n,"?per_page={per_page}&page={page}"),{owner:"hunyao",repo:"Jun-Kumokawa",per_page:100,page:t});case 5:if(i=e.sent,0!==(a=i.data).length&&5!==t){e.next=11;break}return e.abrupt("break",15);case 11:o=o.concat(a),t+=1;case 13:e.next=2;break;case 15:return e.abrupt("return",o);case 16:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function oe(e){var n=e.headers;"0"===n["x-ratelimit-remaining"]&&(V(!0),ne(Number(n["x-ratelimit-reset"])))}return u.useEffect((function(){c.M.request("GET /repos/{owner}/{repo}",{owner:"hunyao",repo:"Jun-Kumokawa"}).then((function(e){var n=e.data;h((function(e){return(0,o.Z)((0,o.Z)({},e),{},{repository:n})}))})).catch((function(e){oe(e.response)})).finally((function(){return E(!1)}))}),[]),u.useEffect((function(){te("GET /repos/{owner}/{repo}/branches").then((function(e){h((function(n){return(0,o.Z)((0,o.Z)({},n),{},{branches:e})}))})).catch((function(e){oe(e.response)})).finally((function(){return B(!1)}))}),[]),u.useEffect((function(){te("GET /repos/{owner}/{repo}/tags").then((function(e){h((function(n){return(0,o.Z)((0,o.Z)({},n),{},{tags:e})}))})).catch((function(e){oe(e.response)})).finally((function(){return J(!1)}))}),[]),u.useEffect((function(){te("GET /repos/{owner}/{repo}/commits").then((function(e){h((function(n){return(0,o.Z)((0,o.Z)({},n),{},{commits:e})}))})).catch((function(e){oe(e.response)})).finally((function(){return F(!1)}))}),[]),u.useEffect((function(){null!==d.repository&&void 0!==d.repository.default_branch&&Z(d.branches.find((function(e){var n;return e.name===(null===(n=d.repository)||void 0===n?void 0:n.default_branch)})))}),[d.repository,d.branches]),u.useEffect((function(){var e=v;null!==e&&void 0!==e&&""!==e.commit.sha&&(q(!0),c.M.request("GET /repos/{owner}/{repo}/git/trees/{tree_sha}?recursive=1",{owner:"hunyao",repo:"Jun-Kumokawa",tree_sha:e.commit.sha}).then((function(e){var n=e.data;k(n)})).catch((function(e){oe(e.response)})).finally((function(){return q(!1)})))}),[v]),u.useEffect((function(){!0!==[N,L,C,_,A].some(Boolean)?X(!1):W||X(!0)}),[N,L,C,_,A,W]),(0,f.jsx)(f.Fragment,{children:(0,f.jsx)(l.Z,{loading:W,children:(0,f.jsx)(m,{value:{state:d,dispatch:h,selectedBranch:v,changeBranch:Z,allTrees:y,loading:W,limited:Q,rateLimitResetTime:ee},children:n})})})};n.default=b},7661:function(e,n,t){var r=t(72791),o=t(84833);n.Z=function(){var e=r.useContext(o.repositoryContext).allTrees;return r.useCallback((function(n){if(null!==e&&0!==e.tree.length){var t=e.tree.find((function(e){return e.path===n}));return void 0===t?"":t.sha}}),[e])}},65573:function(e,n,t){t.r(n),t.d(n,{default:function(){return C}});var r,o=t(29439),i=t(72791),a=t(64554),u=t(20890),s=t(95355),c=t(77227),l=t(90493),f=t(99259),p=t(93385),d=t(62656),h=t(57689),m=t(1413),x=t(45987),b=t(30168),v=t(15021),Z=t(66934),g=t(80184),w=["className"],y=(0,Z.ZP)(i.forwardRef((function(e,n){var t=e.className,r=(0,x.Z)(e,w);return(0,g.jsx)(v.ZP,(0,m.Z)({className:t+" tree-browser-list-item",ref:n,"data-testid":"tree-browser-list-item"},r))})))(r||(r=(0,b.Z)(["\n& {\n  padding: 8px 4px;\n  color: #8b949e;\n  user-select: none;\n  background: transparent;\n  border-bottom: 1px solid #30363d;\n}\n& > .tree-browser-list-item-label {\n  margin-left: 4px;\n  color: #58a6ff;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n&.active {\n  background: #1f6feb;\n  color: #f0f6fc;\n  cursor: pointer;\n}\n&.active > .tree-browser-list-item-label {\n  color: #f0f6fc;\n}\n&:hover {\n  background: #1f6feb;\n  color: #f0f6fc;\n  cursor: pointer;\n}\n&:hover > .tree-browser-list-item-label {\n  color: #f0f6fc;\n}\n"]))),k=t(7661),j=t(84833),S=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",n=i.useContext(j.repositoryContext).allTrees;return[i.useMemo((function(){return null===n||0===n.tree.length?[]:n.tree.filter((function(e){return"blob"===e.type})).filter((function(e){return void 0!==e.path})).map((function(e){return e.path})).filter((function(n){return n.toUpperCase().includes(e.toUpperCase())})).slice(0,50)}),[e,n])]},C=function(){var e=i.useState(""),n=(0,o.Z)(e,2),t=n[0],r=n[1],m=i.useState(0),x=(0,o.Z)(m,2),b=x[0],v=x[1],Z=S(t),w=(0,o.Z)(Z,1)[0],j=(0,k.Z)(),C=(0,h.s0)();return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)(a.Z,{display:"flex",alignItems:"center",mt:4,mb:1,sx:{whiteSpace:"pre",fontSize:16},"data-testid":"page-find",children:[(0,g.jsx)(s.Z,{href:"#",className:"active",sx:{fontSize:"16px !important"},children:"Jun-Kumokawa"})," / ",(0,g.jsx)(c.ZP,{autoFocus:!0,fullWidth:!0,onKeyDown:function(e){var n=e.key,t=b;"ArrowDown"===n?t+=1:"ArrowUp"===n?t-=1:"Enter"===n&&C("/blob/"+j(w[b])),t=(t=t<0?w.length-1:t)>=w.length?0:t,v(t)},onChange:function(e){var n=e.target.value;return r(n)},sx:{"& .MuiInputBase-input":{outline:"none",boxShadow:"none"},"& .MuiInputBase-input:focus":{border:"solid 1px #58a6ff",padding:"5px 12px",borderRadius:"6px"}}})]}),(0,g.jsx)(l.Z,{disablePadding:!0,sx:{border:"1px solid #30363d",borderBottom:"0"},children:w.map((function(e,n){return(0,g.jsxs)(y,{disablePadding:!0,className:n===b?"active":"",onClick:function(){return C("/blob/"+j(e))},children:[(0,g.jsx)(f.Z,{component:p.Z,sx:{fontSize:16,marginX:1,visibility:n===b?"visible":"hidden"}}),(0,g.jsx)(f.Z,{component:d.Z,sx:{fontSize:16}}),(0,g.jsx)(u.Z,{component:"span",display:"inline-block",className:"tree-browser-list-item-label",children:e})]},n)}))})]})}},59732:function(e,n,t){t.d(n,{M:function(){return r}});var r=new(t(63972).v)({auth:!1})},93385:function(e,n,t){var r=t(64836);n.Z=void 0;var o=r(t(45649)),i=t(80184),a=(0,o.default)((0,i.jsx)("path",{d:"M6.23 20.23 8 22l10-10L8 2 6.23 3.77 14.46 12z"}),"ArrowForwardIos");n.Z=a}}]);