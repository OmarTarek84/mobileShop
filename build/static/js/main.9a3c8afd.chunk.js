(window.webpackJsonp=window.webpackJsonp||[]).push([[2],[,,function(e,t,n){"use strict";n.d(t,"m",function(){return a}),n.d(t,"n",function(){return r}),n.d(t,"i",function(){return c}),n.d(t,"d",function(){return l}),n.d(t,"g",function(){return i}),n.d(t,"h",function(){return o}),n.d(t,"b",function(){return u}),n.d(t,"k",function(){return s}),n.d(t,"e",function(){return m}),n.d(t,"l",function(){return d}),n.d(t,"f",function(){return f}),n.d(t,"o",function(){return E}),n.d(t,"c",function(){return b}),n.d(t,"j",function(){return g}),n.d(t,"a",function(){return p});var a="LOGIN",r="LOGOUT",c="FETCH_MOBILES",l="CREATE_MOBILE",i="EDIT_MOBILE",o="FETCH_CARTS",u="ADD_TO_CART",s="INCREASE_CART_QUANTITY_BY_ONE",m="DECREASE_CART_QUANTITY_BY_ONE",d="INCREMENT_CART_ERROR",f="DECREMENT_CART_ERROR",E="REMOVE_ITEM_FROM_CART",b="CLEAR_CART",g="FETCH_ORDERS",p="ADD_ORDER"},,,,,,,,,,,,,,,,function(e,t,n){"use strict";n.d(t,"a",function(){return r}),n.d(t,"b",function(){return c});var a=n(2),r=function(e,t,n,r){localStorage.setItem("token",e),localStorage.setItem("userId",t),localStorage.setItem("firstname",n);var c=r||new Date((new Date).getTime()+36e5);return localStorage.setItem("expDate",c),function(c){c(function(e,t,n,r){return{type:a.m,token:e,userId:t,firstname:n,error:null,expDate:r}}(e,t,n,r))}},c=function(){return localStorage.removeItem("token"),localStorage.removeItem("userId"),localStorage.removeItem("firstname"),localStorage.removeItem("expDate"),{type:a.n}}},,,function(e,t,n){e.exports=n.p+"static/media/logo.9f7e506d.svg"},,,function(e,t,n){"use strict";var a=n(0),r=n.n(a);n(48);t.a=function(e){return r.a.createElement("div",{className:"Loader"})}},,,,function(e,t,n){"use strict";var a=n(0),r=n.n(a);n(46);t.a=function(e){return e.show?r.a.createElement("div",{className:"backdrop",onClick:e.close},e.children):null}},,,,function(e,t,n){e.exports=n(49)},,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},,,,,function(e,t,n){},,function(e,t,n){},function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(15),l=n.n(c),i=(n(37),n(38),n(10)),o=(n(39),n(23)),u=(n(40),n(41),n(13)),s=function(e){return r.a.createElement("li",{className:"nav-li"},r.a.createElement(u.b,{to:e.link,onClick:e.close,exact:!0},e.children))},m=n(21),d=n.n(m),f=n(28),E=n(8),b=function(e){var t,n=Object(a.useState)(!0),c=Object(o.a)(n,2),l=c[0],i=c[1],u=Object(E.c)(function(e){return e.auth.firstname}),m=(Object(E.c)(function(e){return e.auth.userId}),function(){i(!0)}),b={transform:"translateX(0)"};return b=l?{transform:"translateX(-105%)"}:{transform:"translateX(0)"},t=Object(E.c)(function(e){return e.auth.token})?r.a.createElement("ul",null,r.a.createElement(s,{close:m,link:"/"},"Mobiles"),r.a.createElement(s,{close:m,link:"/new"},"Create"),r.a.createElement(s,{close:m,link:"/cart"},"My Cart"),r.a.createElement(s,{close:m,link:"/orders"},"My Orders"),r.a.createElement(s,{close:m,link:"/logout"},"Log Out")):r.a.createElement("ul",null,r.a.createElement(s,{close:m,link:"/"},"Mobiles"),r.a.createElement(s,{close:m,link:"/authenticate"},"Sign Up"),r.a.createElement(s,{close:m,link:"/signin"},"Sign In")),r.a.createElement(r.a.Fragment,null,r.a.createElement("nav",{className:"big-screen"},r.a.createElement("div",{className:"logo"},r.a.createElement("img",{src:d.a,alt:"mobile"}),u?r.a.createElement("p",{style:{display:"inline-block",marginLeft:"10px",color:"white"}},"Welcome ",u):null),r.a.createElement("div",{className:"navitems"},t)),r.a.createElement("nav",{className:"small-screen"},r.a.createElement("div",{className:"nav-sidedrawer"},r.a.createElement("div",{className:"toggleButton",onClick:function(){i(!1)}},r.a.createElement("span",null),r.a.createElement("span",null),r.a.createElement("span",null)),r.a.createElement("div",{className:"sidedrawer",style:b},r.a.createElement("div",{className:"sidedrawer-close",onClick:m},r.a.createElement("p",null,"Close")),r.a.createElement("div",{className:"sidedrawer-nav"},t))),r.a.createElement("div",{className:"logo"},r.a.createElement("img",{src:d.a,alt:"mobile"}))),r.a.createElement(f.a,{close:m,show:!l}))},g=function(e){return r.a.createElement("div",{className:"layout"},r.a.createElement(b,null),r.a.createElement("main",{className:"main"},e.children))},p=n(18),O=n(24),I=r.a.lazy(function(){return Promise.all([n.e(0),n.e(11)]).then(n.bind(null,167))}),v=r.a.lazy(function(){return Promise.all([n.e(0),n.e(7)]).then(n.bind(null,168))}),h=r.a.lazy(function(){return Promise.all([n.e(0),n.e(10)]).then(n.bind(null,169))}),_=r.a.lazy(function(){return n.e(14).then(n.bind(null,170))}),j=r.a.lazy(function(){return Promise.all([n.e(0),n.e(4),n.e(8)]).then(n.bind(null,174))}),k=r.a.lazy(function(){return Promise.all([n.e(0),n.e(6)]).then(n.bind(null,171))}),x=r.a.lazy(function(){return Promise.all([n.e(0),n.e(9)]).then(n.bind(null,175))}),y=r.a.lazy(function(){return Promise.all([n.e(0),n.e(1),n.e(12)]).then(n.bind(null,173))}),T=r.a.lazy(function(){return Promise.all([n.e(0),n.e(1),n.e(13)]).then(n.bind(null,172))}),S=Object(i.g)(function(){var e,t=Object(E.c)(function(e){return null!=e.auth.token}),n=Object(E.b)(),c=Object(a.useCallback)(function(){n(p.b())},[n]),l=Object(a.useCallback)(function(e,t,a,r){n(p.a(e,t,a,r))},[n]);return Object(a.useEffect)(function(){var t=localStorage.getItem("token"),n=localStorage.getItem("expDate");if(t&&n){var a=new Date(n).getTime()-(new Date).getTime();e=setTimeout(c,a)}else clearTimeout(e)},[localStorage.getItem("expDate"),localStorage.getItem("token"),c]),Object(a.useEffect)(function(){var e=localStorage.getItem("token"),t=localStorage.getItem("expDate"),n=localStorage.getItem("firstname"),a=localStorage.getItem("userId");a&&e&&new Date(t)>new Date&&l(e,a,n,t)},[l]),r.a.createElement(g,null,r.a.createElement(a.Suspense,{fallback:r.a.createElement("div",{style:{position:"fixed",top:"50%",left:"50%"}},r.a.createElement(O.a,null))},r.a.createElement(i.d,null,t?null:r.a.createElement(i.b,{path:"/authenticate",exact:!0,render:function(e){return r.a.createElement(h,e)}}),t?null:r.a.createElement(i.b,{path:"/signin",exact:!0,render:function(e){return r.a.createElement(I,e)}}),t?r.a.createElement(i.b,{path:"/logout",exact:!0,render:function(e){return r.a.createElement(_,e)}}):null,t?r.a.createElement(i.b,{path:"/new",exact:!0,render:function(e){return r.a.createElement(k,e)}}):null,t?r.a.createElement(i.b,{path:"/edit/:id",exact:!0,render:function(e){return r.a.createElement(v,e)}}):null,t?r.a.createElement(i.b,{path:"/cart",exact:!0,render:function(e){return r.a.createElement(y,e)}}):null,t?r.a.createElement(i.b,{path:"/edit/:id",exact:!0,render:function(e){return r.a.createElement(k,e)}}):null,t?r.a.createElement(i.b,{path:"/orders",exact:!0,render:function(e){return r.a.createElement(T,e)}}):null,t?r.a.createElement(i.b,{path:"/mobile/:id",exact:!0,render:function(e){return r.a.createElement(x,e)}}):null,r.a.createElement(i.b,{path:"/",exact:!0,render:function(e){return r.a.createElement(j,e)}}))))}),w=n(11),C=n(3),D=n(2),R={token:null,userId:null,firstname:null,expDate:null},N=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:R,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case D.m:return Object(C.a)({},e,{token:t.token,userId:t.userId,firstname:t.firstname,expDate:t.expDate,error:null});case D.n:return Object(C.a)({},e,{token:null,userId:null,firstname:null,error:null,expDate:null});default:return e}},P=n(31),A=n(9),M={mobiles:[]},L=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:M,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case D.i:return Object(C.a)({},e,{mobiles:t.mobiles});case D.d:return Object(C.a)({},e,{mobiles:e.mobiles.concat(t.mobile)});case D.g:var n=Object(A.a)(e.mobiles),a=e.mobiles.findIndex(function(e){return e._id===t.id});return n[a].title=t.title,n[a].description=t.description,n[a].price=t.price,n[a].model=t.model,n[a].imageUrl=t.imageUrl,Object(C.a)({},e,{mobiles:n});default:return e}},z={carts:[],totalPrice:0},q=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:z,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case D.h:return Object(C.a)({},e,{carts:t.carts,totalPrice:t.totalPrice});case D.k:var n=Object(A.a)(e.carts),a=n.findIndex(function(e){return e._id===t.id});return n[a].quantity+=1,Object(C.a)({},e,{carts:n,totalPrice:e.totalPrice+n[a].mobileId.price});case D.e:var r,c=Object(A.a)(e.carts),l=c.findIndex(function(e){return e._id===t.id});return r=c[l].mobileId.price,c[l].quantity-=1,0===c[l].quantity&&c.splice(l,1),Object(C.a)({},e,{carts:c,totalPrice:e.totalPrice-r});case D.b:var i=e.carts.find(function(e){return e.mobileId._id===t.cart.mobileId._id}),o=e.carts.findIndex(function(e){return e.mobileId._id===t.cart.mobileId._id}),u=Object(A.a)(e.carts);return i?u[o].quantity+=1:u.push(t.cart),Object(C.a)({},e,{carts:u});case D.o:var s=Object(A.a)(e.carts),m=s.find(function(e){return e._id===t.cartId}),d=s.findIndex(function(e){return e._id===t.cartId}),f=e.totalPrice-m.quantity*m.mobileId.price;return console.log("beforeee => ",s),s.splice(d,1),console.log("after => ",s),Object(C.a)({},e,{carts:s,totalPrice:f});case D.c:case D.a:return Object(C.a)({},e,{carts:[],totalPrice:0});case D.l:var E,b=Object(A.a)(e.carts),g=b.find(function(e){return e._id===t.cartid}),p=b.findIndex(function(e){return e._id===t.cartid});return console.log(g),g.quantity-=1,E=e.totalPrice-g.mobileId.price,b[p]=g,Object(C.a)({},e,{carts:b,totalPrice:E});case D.f:var O=Object(A.a)(e.carts),I=O.find(function(e){return e._id===t.cartid}),v=0,h=O.findIndex(function(e){return e._id===t.cartid});return I?(I.quantity+=1,v=e.totalPrice+I.mobileId.price,O[h]=I):((I=t.item).quantity=1,O.push(I),v=e.totalPrice+I.mobileId.price,console.log("all carts",O)),Object(C.a)({},e,{carts:O,totalPrice:v});default:return e}},B={orders:[]},U=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:B,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case D.j:return Object(C.a)({},e,{orders:t.orders});case D.a:return Object(C.a)({},e,{orders:e.orders.concat(t.order)});default:return e}},F=Object(w.c)({auth:N,mobiles:L,carts:q,orders:U}),X=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||w.d,Y=Object(w.e)(F,X(Object(w.a)(function(e){return function(e){return function(t){return e(t)}}},P.a))),H=r.a.createElement(E.a,{store:Y},r.a.createElement(u.a,null,r.a.createElement(S,null)));l.a.render(H,document.getElementById("root"))}],[[32,3,5]]]);
//# sourceMappingURL=main.9a3c8afd.chunk.js.map