"use strict";(self.webpackChunkJun_Kumokawa=self.webpackChunkJun_Kumokawa||[]).push([[415],{83415:function(e,t,n){n.r(t),n.d(t,{default:function(){return _}});var r=n(1413),a=n(45987),u=n(29439),o=n(72791),i=n(64554),s=n(39186),c=n(82649),f=n(57689),p=n(18388),h=n(84570),d=n(73993),Z=n(93433),v=n(74165),l=n(15861),m=n(59732),y=n(84833),w={},x=function(e,t){if(void 0===e.type||void 0===e.path||void 0===t.type||void 0===t.path)return 0;if(e.type!==t.type)return"tree"===e.type?-1:1;var n="."===e.path[0];if(n!==("."===t.path[0]))return n?-1:1;var r=/^[A-Z]/.test(e.path);return r!==/^[A-Z]/.test(t.path)?r?-1:1:e.path<t.path?-1:1},k=function(){var e=(0,l.Z)((0,v.Z)().mark((function e(t,n){return(0,v.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(void 0===w[n]&&(w[n]={}),void 0===w[n][t]){e.next=3;break}return e.abrupt("return",w[n][t]);case 3:return e.abrupt("return",m.M.request("GET /repos/{owner}/{repo}/git/trees/{tree_sha}",{owner:"hunyao",repo:"Jun-Kumokawa",tree_sha:t}).then((function(e){var r=e.data;return r.tree.sort(x),w[n][t]=r.tree,r.tree})));case 4:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),b=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=o.useState([]),n=(0,u.Z)(t,2),r=n[0],a=n[1],i=o.useState(!1),s=(0,u.Z)(i,2),c=s[0],f=s[1],p=o.useState(!0),h=(0,u.Z)(p,2),v=h[0],l=h[1],m=(0,d.Z)(),w=(0,u.Z)(m,1)[0],x=o.useContext(y.repositoryContext).allTrees;return o.useEffect((function(){if(""!==e){if(null!==x)return x.sha===e||x.tree.find((function(t){return t.sha===e}))?void k(e,w).then((function(e){a((function(){return(0,Z.Z)(e)}))})).catch((function(){a([]),f(!0)})).finally((function(){l(!1)})):(a([]),f(!0),void l(!1))}else l(!1)}),[e,w,x]),[r,c,v]},g=n(2730),E={},S=function(){var e=(0,l.Z)((0,v.Z)().mark((function e(){var t,n,r=arguments;return(0,v.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=r.length>1?r[1]:void 0,void 0===E[t=r.length>0&&void 0!==r[0]?r[0]:""]){e.next=4;break}return e.abrupt("return",E[t]);case 4:return e.abrupt("return",m.M.request("GET /repos/{owner}/{repo}/readme/{path}?ref={ref}",{owner:"hunyao",repo:"Jun-Kumokawa",path:t,ref:n}).then((function(e){var n=e.data;return E[t]=n.content,n.content})));case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),j=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=o.useState(""),n=(0,u.Z)(t,2),r=n[0],a=n[1],i=o.useState(!1),s=(0,u.Z)(i,2),c=s[0],f=s[1],p=(0,g.Z)()(e),h=(0,u.Z)(p,2),Z=h[0],v=h[1],l=(0,d.Z)(),m=(0,u.Z)(l,1)[0],y=o.useState(!0),w=(0,u.Z)(y,2),x=w[0],k=w[1];return o.useEffect((function(){if(""!==e)return v?(f(!0),void k(!1)):void S(Z,m).then((function(e){a(atob(e))})).catch((function(e){var t=e.code;a(""),f(404!==t)})).finally((function(){k(!1)}));k(!1)}),[e,Z,v,m]),[r,c,x]},C=n(65413),J=n(80184),K=["mode"],_=function(e){var t=(0,f.UO)(),n=o.useState(""),Z=(0,u.Z)(n,2),v=Z[0],l=Z[1],m=b(v),y=(0,u.Z)(m,3),w=y[0],x=y[1],k=y[2],g=j(v),E=(0,u.Z)(g,3),S=E[0],_=E[1],A=E[2],M=(0,d.Z)(),T=(0,u.Z)(M,2)[1],q=e.mode,G=void 0===q?"navigation":q,D=(0,a.Z)(e,K);return o.useEffect((function(){void 0===t.sha?l(T):l(t.sha)}),[T,t]),x||_?(0,J.jsx)(h.Z,{}):(0,J.jsx)(C.Z,{loading:k,children:(0,J.jsxs)(i.Z,(0,r.Z)((0,r.Z)({"data-testid":"page-tree"},D),{},{children:[(0,J.jsx)(s.Z,{mode:G,sha:v}),(0,J.jsx)(c.Z,{type:"tree",sha:v,trees:w}),(0,J.jsx)(p.Z,{filename:"README.md",content:S||"",binary:!1,image:!1,mode:"readme",sx:{display:""!==S?"inherit":"none"},loading:A})]}))})}}}]);
//# sourceMappingURL=415.51e8ecc3.chunk.js.map