"use strict";(self.webpackChunkJun_Kumokawa=self.webpackChunkJun_Kumokawa||[]).push([[305],{84833:function(e,r,n){n.r(r),n.d(r,{Consumer:function(){return f},Provider:function(){return h},RepositoryConsumer:function(){return f},RepositoryProvider:function(){return l},repositoryContext:function(){return p}});var t=n(74165),a=n(93433),o=n(15861),u=n(29439),c=n(72791),s=n(59732),i=n(80184),p=c.createContext({}),h=p.Provider,f=p.Consumer,m={branches:[],tags:[],commits:[]};function l(e){var r=e.children,n=c.useState(m),p=(0,u.Z)(n,2),f=p[0],l=p[1],d=c.useState({name:"",commit:{sha:"",url:""}}),_=(0,u.Z)(d,2),E=_[0],w=_[1],g=c.useState([]),T=(0,u.Z)(g,2),C=T[0],P=T[1];function b(e){return v.apply(this,arguments)}function v(){return(v=(0,o.Z)((0,t.Z)().mark((function e(r){var n,a,o,u;return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=1,a=[];case 2:return e.next=5,s.M.request("".concat(r,"?per_page={per_page}&page={page}"),{owner:"hunyao",repo:"Jun-Kumokawa",per_page:100,page:n});case 5:if(o=e.sent,0!==(u=o.data).length&&5!==n){e.next=11;break}return e.abrupt("break",15);case 11:a=a.concat(u),n+=1;case 13:e.next=2;break;case 15:return e.abrupt("return",a);case 16:case"end":return e.stop()}}),e)})))).apply(this,arguments)}c.useEffect((function(){Promise.all([s.M.request("GET /repos/{owner}/{repo}/branches/master",{owner:"hunyao",repo:"Jun-Kumokawa"}),b("GET /repos/{owner}/{repo}/branches"),b("GET /repos/{owner}/{repo}/tags"),b("GET /repos/{owner}/{repo}/commits")]).then((function(e){var r=(0,u.Z)(e,4),n=r[0],t=r[1],o=r[2],c=r[3];l({branches:Array.from([].concat((0,a.Z)(t),[n.data])),tags:o,commits:c}),w(n.data)}))}),[]),c.useEffect((function(){""!==E.commit.sha&&s.M.request("GET /repos/{owner}/{repo}/git/trees/{tree_sha}?recursive=1",{owner:"hunyao",repo:"Jun-Kumokawa",tree_sha:E.commit.sha}).then((function(e){var r=e.data;P(r)}))}),[E]);var y=c.useCallback((function(e){if(0!==C.length&&""!==e)return e===E.commit.sha?"":C.tree.find((function(r){return r.sha===e})).path}),[C]),S=c.useCallback((function(e){if(0!==C.length)return C.tree.find((function(r){return r.path===e})).sha}),[C]);return(0,i.jsx)(i.Fragment,{children:(0,i.jsx)(h,{value:{state:f,dispatch:l,selectedBranch:E,changeBranch:w,allTrees:C,getPathFromSha:y,getShafromPath:S},children:r})})}r.default=l},59732:function(e,r,n){n.d(r,{M:function(){return t}});var t=new(n(56303).v)({auth:"production"!=={NODE_ENV:"production",PUBLIC_URL:"/Jun-Kumokawa",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_REPOSITORY_OWNER:"hunyao",REACT_APP_REPOSITORY_NAME:"Jun-Kumokawa",REACT_APP_GITHUB_APIKEY:"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"}.REACT_APP_ENV&&"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"})},97326:function(e,r,n){function t(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}n.d(r,{Z:function(){return t}})},45987:function(e,r,n){n.d(r,{Z:function(){return a}});var t=n(63366);function a(e,r){if(null==e)return{};var n,a,o=(0,t.Z)(e,r);if(Object.getOwnPropertySymbols){var u=Object.getOwnPropertySymbols(e);for(a=0;a<u.length;a++)n=u[a],r.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}}}]);
//# sourceMappingURL=305.17f02c08.chunk.js.map