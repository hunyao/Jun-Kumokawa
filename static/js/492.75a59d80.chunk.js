"use strict";(self.webpackChunkJun_Kumokawa=self.webpackChunkJun_Kumokawa||[]).push([[492],{30043:function(n,e,t){var o=t(74223),r=t(80184),i=(0,o.Z)((0,r.jsx)("path",{fill:"currentColor",d:"M290.59 192c-20.18 0-106.82 1.98-162.59 85.95V192c0-52.94-43.06-96-96-96-17.67 0-32 14.33-32 32s14.33 32 32 32c17.64 0 32 14.36 32 32v256c0 35.3 28.7 64 64 64h176c8.84 0 16-7.16 16-16v-16c0-17.67-14.33-32-32-32h-32l128-96v144c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16V289.86c-10.29 2.67-20.89 4.54-32 4.54-61.81 0-113.52-44.05-125.41-102.4zM448 96h-64l-64-64v134.4c0 53.02 42.98 96 96 96s96-42.98 96-96V32l-64 64zm-72 80c-8.84 0-16-7.16-16-16s7.16-16 16-16 16 7.16 16 16-7.16 16-16 16zm80 0c-8.84 0-16-7.16-16-16s7.16-16 16-16 16 7.16 16 16-7.16 16-16 16z"}),"CatIcon");e.Z=i},17279:function(n,e,t){var o,r=t(1413),i=t(45987),c=t(30168),a=t(50533),s=t(66934),l=t(80184),u=["className"],d=(0,s.ZP)((function(n){var e=n.className,t=(0,i.Z)(n,u);return(0,l.jsx)(a.Z,(0,r.Z)({className:e+" github-link"},t))}))(o||(o=(0,c.Z)(["\n& {\n  color: #8b949e;\n  text-decoration: none;\n  font-size: 14px;\n}\n& svg {\n  vertical-align: text-bottom;\n}\n&.primary {\n  color: #c9d1d9;\n  font-weight: bold;\n}\n& strong {\n  font-weight: bold;\n}\n& .name {\n  margin-left: 6px;\n}\n&.active {\n  color: #58a6ff;\n}\n&.no-underline .fixed-color{\n  color: #8b949e;\n}\n&.no-underline:hover .fixed-color{\n  color: #8b949e;\n}\n&.no-underline:hover {\n  color: #58a6ff;\n  text-decoration: none;\n}\n&:hover {\n  color: #58a6ff;\n  text-decoration: underline;\n}\n"])));e.Z=d},2914:function(n,e,t){t.r(e),t.d(e,{default:function(){return L}});var o,r,i=t(72791),c=t(64554),a=t(84395),s=t(34663),l=t(13400),u=t(29439),d=t(46183),h=t(88761),x=t(42436),m=t(31292),f=t(96408),p=t(30168),Z=t(66934),g=t(25228),j=(0,Z.ZP)(g.Z)(o||(o=(0,p.Z)(["\n& .MuiTabs-indicator {\n  background-color: #F78166;\n}\n"]))),v=t(43896),b=(0,Z.ZP)(v.Z)(r||(r=(0,p.Z)(["\n& {\n  min-height: initial;\n  color: #c9d1d9;\n  text-transform: capitalize;\n}\n& .MuiSvgIcon-root {\n  color: #484F58;\n}\n&.Mui-selected .MuiSvgIcon-root {\n  color: inherit;\n}\n&.Mui-selected {\n  color: inherit;\n}\n"]))),k=t(80184),w=[{name:"overview",path:"overview",icon:(0,k.jsx)(d.Z,{}),menuId:0},{name:"code",path:"tree",icon:(0,k.jsx)(m.Z,{}),menuId:1},{name:"experience",path:"experience",icon:(0,k.jsx)(x.Z,{}),menuId:2},{name:"education",path:"education",icon:(0,k.jsx)(h.Z,{}),menuId:3},{name:"skills",path:"skill",icon:(0,k.jsx)(f.Z,{}),menuId:4}],I=function(n){var e=n.path,t=n.onChange,o=i.useState(0),r=(0,u.Z)(o,2),c=r[0],a=r[1];return i.useEffect((function(){var n=w.findIndex((function(n){return n.path===e}));a(-1===n?0:n)}),[e]),(0,k.jsx)(j,{value:c,onChange:function(n,e){return t(e,w[e])},children:w.map((function(n,e){return(0,k.jsx)(b,{icon:n.icon,iconPosition:"start",label:n.name,value:n.menuId},e)}))})},P=i.memo(I,(function(n,e){return n.path===e.path})),z=t(1413),S=t(45987),C=t(61889),M=t(53056),F=t(20890),K=t(55521),W=t(56310),J=t(95457),N=t(48456),_=t(27293),O=t(17279),R=t(81918),T=t(85523),V=t(91440),y=["children"],A=function(n){var e=n.children,t=(0,S.Z)(n,y),o="https://www.google.com/maps/place/"+e;return(0,k.jsxs)(O.Z,(0,z.Z)((0,z.Z)({href:o},t),{},{children:[(0,k.jsx)(N.Z,{sx:{fontSize:"inherit"}}),e]}))},D=function(){var n=i.useState(!1),e=(0,u.Z)(n,2),t=e[0],o=e[1];return(0,k.jsxs)(C.ZP,{container:!0,flexDirection:"row",flexWrap:"nowrap",alignItems:"center",my:2,height:100,gap:3,children:[(0,k.jsx)(C.ZP,{item:!0,component:"img",src:M,alt:"avator",height:"100%",sx:{borderRadius:"6px"}}),(0,k.jsxs)(C.ZP,{item:!0,flex:1,children:[(0,k.jsxs)(C.ZP,{container:!0,alignItems:"center",children:[(0,k.jsx)(T.Z,{labelPlacement:"start",control:(0,k.jsx)(V.Z,{checked:t,size:"small",onChange:function(n){var e=n.target.checked;return o(e)}}),label:"Kanji",sx:{margin:0,userSelect:"none"}}),(0,k.jsx)(F.Z,{variant:"h5",sx:{fontWeight:"bold",marginRight:1},children:t?"\u96f2\u5ddd \u6d35":"JUN KUMOKAWA"})]}),(0,k.jsx)(F.Z,{component:"div",sx:{color:"#8b949e",fontSize:14},children:"Full-stack Developer Who are made in Japan"}),(0,k.jsxs)(C.ZP,{container:!0,alignItems:"center",spacing:1,sx:{fontSize:14},children:[[{Icon:K.Z,content:(0,k.jsx)(A,{target:"_blank",children:"Tallinn, Estonia"})},{Icon:W.Z,content:(0,k.jsx)(O.Z,{href:"https://www.linkedin.com/in/kumokawa",target:"_blank",children:"@kumokawa"})},{Icon:J.Z,content:(0,k.jsx)(O.Z,{href:"mailto:jun@kumoti.jp",children:"jun@kumoti.jp"})},{Icon:_.Z,content:(0,k.jsx)(O.Z,{href:"tel:+37253771037",children:"+(372)53771037"})}].map((function(n,e){var t=n.Icon,o=n.content;return(0,k.jsxs)(C.ZP,{container:!0,item:!0,spacing:.5,alignItems:"center",flex:0,flexWrap:"nowrap",sx:{whiteSpace:"nowrap"},children:[(0,k.jsx)(C.ZP,{item:!0,component:t}),(0,k.jsx)(C.ZP,{item:!0,children:o})]},e)})),(0,k.jsx)(C.ZP,{item:!0,children:(0,k.jsx)(R.Z,{label:"Open to work",size:"small",variant:"outlined",color:"success",title:"Open to work"})})]})]})]})},E=i.memo(D,(function(){return!1})),U=t(30043),B=t(91614),H=t(99259),q=t(16871),G=t.p+"static/media/forest-background.084c9a56b85e7c2fd41e.jpg",L=function(){var n=(0,q.s0)(),e=(0,q.TH)().pathname,t=i.useCallback((function(e,t){n("/"+t.path)}),[]),o=i.useMemo((function(){return(0,k.jsxs)(k.Fragment,{children:[(0,k.jsx)(a.Z,{position:"static",sx:{background:"#161b22"},children:(0,k.jsx)(s.Z,{children:(0,k.jsx)(l.Z,{sx:{mr:2},href:"/",children:(0,k.jsx)(H.Z,{component:U.Z,viewBox:"0 0 512 512",sx:{height:32,width:32,borderRadius:"50%",color:"black",background:"white"}})})})}),(0,k.jsx)(c.Z,{sx:{background:"linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)), url("+G+")",backgroundSize:"cover",height:300}}),(0,k.jsx)(c.Z,{sx:{boxShadow:"inset 0 -1px 0 #21262d"},children:(0,k.jsxs)(B.Z,{children:[(0,k.jsx)(E,{}),(0,k.jsx)(P,{path:e.replace(/^\//,""),onChange:t})]})})]})}),[e,t]);return(0,k.jsx)(k.Fragment,{children:o})}},53056:function(n,e,t){n.exports=t.p+"static/media/avator.d90db50e7afd2edec489.jpg"}}]);
//# sourceMappingURL=492.75a59d80.chunk.js.map