(this.webpackJsonptoddle=this.webpackJsonptoddle||[]).push([[0],[,,,,,,,function(e,n,t){e.exports=t(19)},,,,,function(e,n,t){},function(e,n,t){},function(e,n,t){},function(e,n,t){},function(e,n,t){},function(e,n,t){},function(e,n,t){},function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),l=t(5),c=t.n(l),i=(t(12),t(13),function(e){var n=e.name;return r.a.createElement("div",null,r.a.createElement("h1",{className:"title"},n))}),u=(t(14),function(){return r.a.createElement("div",null,r.a.createElement("h3",null,"Actions"),r.a.createElement("div",null,r.a.createElement("div",null,r.a.createElement("span",null,"Ident, "),r.a.createElement("span",null,"Outdent, "),r.a.createElement("span",null,"Delete "))))}),o=(t(15),function(){return r.a.createElement("div",{className:"container"},r.a.createElement("h3",null,"Standard"),r.a.createElement("p",null,"The text of standard"))}),d=t(1),s=t(3),f=(t(16),t(17),function e(n){var t=n.node,a=n.onIndent,l=n.onOutdent,c=n.onDelete,i=function(e){a(e)},u=function(e){l(e)},o=function(e){c(e)};return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"main"},r.a.createElement("div",{className:"arrow",onClick:function(e){return u(t)}},r.a.createElement("i",{className:"fas fa-arrow-left"})),r.a.createElement("div",{className:"arrow",onClick:function(e){return i(t)}},r.a.createElement("i",{className:"fas fa-arrow-right"})),r.a.createElement("div",{className:"delete",onClick:function(e){return o(t)}},r.a.createElement("i",{class:"far fa-trash-alt"})),r.a.createElement("div",{className:"indent",style:{marginLeft:t.level>0?"".concat(20*t.level,"px"):0}},"-"),r.a.createElement("div",{className:"text",placeholder:"Add a standard",style:{color:1===t.level?"#18dc60":2===t.level?"grey":"#ccc"}},t.value)),t.children.map((function(n){return r.a.createElement(e,{node:n,key:n.id,onIndent:function(e){return i(e)},onOutdent:function(e){return u(e)},onDelete:function(e){return o(e)}})})))}),m=function e(n){if("object"!==typeof n||null===n)return n;var t={};for(var a in n)Array.isArray(n[a])?t[a]=n[a].map((function(n){return e(n)})):t[a]=e(n[a]);return t},v=function(e){return Object.values(m(e))},h=t(6),p=function e(n,t,a){Object(h.a)(this,e),this.id="_"+Math.random().toString(36).substr(2,9),this.value=n,this.children=[],this.parentId=a,this.level=t},E=function(e,n){if(!n)return e;var t,a=Object(s.a)(e);try{for(a.s();!(t=a.n()).done;){var r=t.value;if(r.id===n)return r;N(r,n)}}catch(l){a.e(l)}finally{a.f()}},N=function e(n,t){if(n.id===t)return n;var a,r=Object(s.a)(n.children);try{for(r.s();!(a=r.n()).done;){e(a.value,t)}}catch(l){r.e(l)}finally{r.f()}},b=function(e,n){for(var t=0;t<n.length;t++)if(n[t].id===e)return t};function O(){var e=Object(a.useState)([]),n=Object(d.a)(e,2),t=n[0],l=n[1],c=Object(a.useState)(""),i=Object(d.a)(c,2),u=i[0],o=i[1],s=Object(a.useState)(null),h=Object(d.a)(s,2),N=h[0],O=h[1],j=Object(a.useState)(1),I=Object(d.a)(j,2),g=I[0],y=I[1],w="data:text/json;charset=utf-8,"+encodeURIComponent(JSON.stringify(t)),S=function(e,n){var a=v(t);l(e?function(t){return E(a,e).children.push(n),a}:function(e){return a.push(n),a})},k=function(e){l((function(n){var t=v(n),a=m(e);if(e.parentId){var r=E(t,e.parentId),l=r.children,c=l[b(e.id,l)-1];return a.level=a.level+1,y(c.level+1),r.children=r.children.filter((function(n){return n.id!==e.id})),c.children.push(a),t}var i=b(e.id,t);if(!i)return n;var u=t[i-1];return O(u),a.parentId=u.id,a.level=u.level+1,y(u.level+1),u.children.push(a),t.filter((function(n){return n.id!==e.id}))}))},x=function(e){l((function(n){if(!e.parentId)return n;var t=v(n),a=m(e),r=E(t,e.parentId);(r.children=r.children.filter((function(n){return n.id!==e.id})),a.level=e.level-1,a.parentId=null,y(e.level-1),O(null),r.parentId)?E(t,r.parentId).children.push(a):t.push(a);return t}))},A=function(e){l((function(n){var t=v(n),a=(m(e),E(t,e.id),e.parentId);if(a){var r=E(t,a);return r.children=r.children.filter((function(n){return n.id!==e.id})),t}return t.filter((function(n){return n.id!==e.id}))}))},C=function(e){var n=e.target.result;console.log("file content",n),l(JSON.parse(n))};return r.a.createElement("div",null,r.a.createElement("div",{className:"tree-container"},t.map((function(e){return r.a.createElement(f,{key:e.id,node:e,onIndent:k,onOutdent:x,onDelete:A})}))),r.a.createElement("input",{type:"text",className:"input-text",onChange:function(e){o(e.target.value)},placeholder:"add a standard"}),r.a.createElement("button",{className:"button",onClick:function(e){1===g?S(null,new p(u,g,null)):S(N.id,new p(u,g,N.id))}},r.a.createElement("i",{className:"fas fa-plus-circle"}),"Add a standard"),r.a.createElement("a",{href:w,download:"treeStrc.json"},"Download as json"),r.a.createElement("div",null,r.a.createElement("p",null,"Upload file to generate structure"),r.a.createElement("input",{type:"file",accept:".json",onChange:function(e){return function(e){var n=new FileReader;n.onloadend=C,n.readAsText(e)}(e.target.files[0])}})))}t(18);var j=function(){return r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"content"},r.a.createElement(i,{name:"MATHEMATICS"}),r.a.createElement("div",{className:"heading"},r.a.createElement(u,null),r.a.createElement(o,null)),r.a.createElement(O,null)))};c.a.render(r.a.createElement(j,null),document.getElementById("root"))}],[[7,1,2]]]);
//# sourceMappingURL=main.24f72079.chunk.js.map