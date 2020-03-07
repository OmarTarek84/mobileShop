(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{124:function(e,t,n){},125:function(e,t,n){},126:function(e,t,n){},157:function(e,t){},174:function(e,t,n){"use strict";n.r(t);var a=n(23),r=n(0),i=n.n(r),c=(n(124),n(125),n(50)),o=(n(126),function(e){return i.a.createElement("div",{className:"mobile-card",key:e.id},e.isAuthorized&&e.userId!==e.mobileUserID?i.a.createElement("div",{className:"AddToCart"},i.a.createElement(c.a,{clicked:e.addToCart,disabled:e.onDisabled},"Add To Cart")):null,i.a.createElement("div",{className:"mobile-image"},i.a.createElement("img",{src:e.image,alt:"mobileImage"})),i.a.createElement("div",{className:"mobile-type-price"},i.a.createElement("div",{className:"mobile-type"},i.a.createElement("p",null,e.title)),i.a.createElement("div",{className:"mobile-price"},i.a.createElement("p",null,"$",e.price))),i.a.createElement("div",{className:"createdby"},i.a.createElement("p",null,"Created By: ",i.a.createElement("span",{style:{fontWeight:"bolder"}},e.firstname," ",e.lastname))),e.isAuthorized?i.a.createElement("div",{className:"buttons"},e.userId===e.mobileUserID?i.a.createElement(i.a.Fragment,null,i.a.createElement(c.a,{clicked:e.editClicked},"Edit"),i.a.createElement(c.a,{clicked:e.detailClicked},"Details")):i.a.createElement(c.a,{clicked:e.detailClicked},"Details")):null)}),l=n(24),u=function(e){var t;if(e.loading)t=i.a.createElement(l.a,null);else if(e.mobilesExist)t=e.mobiles.map(function(t){return i.a.createElement(o,{key:t._id,id:t._id,title:t.title,price:t.price,firstname:t.userId.firstname,lastname:t.userId.lastname,editClicked:e.clickedEdit.bind(void 0,t._id),mobileUserID:t.userId._id,detailClicked:e.goToDetail.bind(void 0,t._id),image:t.imageUrl,addToCart:e.addCart.bind(void 0,t),onDisabled:e.buttonDisabled,userId:e.userId,isAuthorized:e.isAuthorized})});else if(e.error)return i.a.createElement("h2",null,"An Error Occurred");return i.a.createElement(i.a.Fragment,null,t)},s=n(8),d=n(63),p=n(28),m=n(127),f=n.n(m),h=n(51),b=n(66);t.default=function(e){var t=Object(r.useState)(!1),n=Object(a.a)(t,2),o=n[0],l=n[1],m=Object(r.useState)(null),y=Object(a.a)(m,2),g=y[0],v=y[1],E=Object(r.useState)(!1),I=Object(a.a)(E,2),k=I[0],x=I[1],w=Object(r.useState)(!1),C=Object(a.a)(w,2),j=C[0],O=C[1],T=Object(r.useState)(!1),A=Object(a.a)(T,2),$=A[0],q=A[1],U=Object(s.b)(),_=Object(s.c)(function(e){return e.mobiles.mobiles}),B=Object(s.c)(function(e){return e.auth.userId}),M=Object(s.c)(function(e){return null!==e.auth.token}),S=f()("http://localhost:8080"),N=Object(r.useCallback)(function(){O(""),q(!0),U(d.e()).then(function(){O(""),q(!1)}).catch(function(e){O(e),q(!1)})},[U]);Object(r.useEffect)(function(){N()},[U,N]),Object(r.useEffect)(function(){return S.on("newMobile",function(e){U(d.b(e.mobile))}),function(){S.close()}},[]),Object(r.useEffect)(function(){return S.on("editedMobile",function(e){U(d.d(e.mobile._id,e.mobile.title,e.mobile.description,e.mobile.price,e.mobile.model,e.mobile.imageUrl))}),function(){S.close()}},[]);var z=function(){l(!1)};return i.a.createElement(i.a.Fragment,null,i.a.createElement("h1",{className:"mobiles-title"},"Our ",i.a.createElement("span",null,"Mobiles")),i.a.createElement("div",{className:"mobiles"},i.a.createElement(u,{mobiles:_,mobilesExist:_.length>0,clickedEdit:function(t){e.history.push({pathname:"/edit/"+t,search:"?edit=true"})},goToDetail:function(t){e.history.push({pathname:"/mobile/"+t})},addCart:function(e){x(!0),U(b.a(e)).then(function(){x(!1),v(e),l(!0)}).catch(function(e){x(!1)})},buttonDisabled:k,error:j,loading:!!$,userId:B,isAuthorized:M})),o?i.a.createElement(p.a,{show:!0,close:z},i.a.createElement("div",{className:"item-added-parent"},i.a.createElement("h3",null,"Item added To Cart"),i.a.createElement("div",{className:"item-added-image"},i.a.createElement("img",{src:g.imageUrl,alt:"cart-mobile"})),i.a.createElement("p",null,g.title),i.a.createElement("p",null,"Price: ",i.a.createElement("span",null,"$",g.price)),i.a.createElement("div",{style:{marginTop:"7px"}},i.a.createElement(c.a,{clicked:z},"Continue Shopping")),i.a.createElement("div",{style:{marginTop:"5px"}},i.a.createElement(c.a,{clicked:function(){e.history.push({pathname:"/cart"})}},"Go To Cart")))):null,i.a.createElement(h.a,{open:!!j,onClose:function(){return O("")},errorMessage:j.response&&j.response.data&&j.response.data.errors[0]?j.response.data.errors[0].message:"Unknown Error, We'll fix it soon",firstButton:!0,firstButtonMethod:N,firstButtonTitle:"Try Again Now",secondButton:!0,secondButtonMethod:function(){e.history.push("/new")},secondButtonTitle:"Create a new Mobile Product!"}))}},50:function(e,t,n){"use strict";var a=n(0),r=n.n(a);n(52);t.a=function(e){return r.a.createElement("button",{onClick:e.clicked,type:e.type,disabled:e.disabled,className:"buttonn"},e.children)}},51:function(e,t,n){"use strict";var a=n(0),r=n.n(a),i=n(50),c=n(64);t.a=function(e){return r.a.createElement(c.a,{open:e.open,onClose:e.onClose,center:!0},r.a.createElement("h2",{style:{textAlign:"center",marginTop:"11%"}},"An Error Occurred"),r.a.createElement("p",{style:{marginTop:"12px"}},e.errorMessage),r.a.createElement("div",{style:{marginTop:"25px",textAlign:"center",display:"flex",justifyContent:"space-around"}},e.firstButton?r.a.createElement(i.a,{type:"button",clicked:e.firstButtonMethod},e.firstButtonTitle):null,e.secondButton?r.a.createElement(i.a,{type:"button",clicked:e.secondButtonMethod},e.secondButtonTitle):null))}},52:function(e,t,n){},63:function(e,t,n){"use strict";n.d(t,"e",function(){return u}),n.d(t,"a",function(){return s}),n.d(t,"d",function(){return d}),n.d(t,"b",function(){return p}),n.d(t,"c",function(){return m});var a=n(54),r=n.n(a),i=n(55),c=n(57),o=n.n(c),l=n(2),u=function(){return function(){var e=Object(i.a)(r.a.mark(function e(t,n){var a,i,c;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(a={query:"\n            query {\n                mobiles {\n                  _id\n                  title\n                  description\n                  price\n                  model\n                  imageUrl\n                  createdAt\n                  userId {\n                    _id\n                    firstname\n                    lastname\n                    email\n                  }\n                }\n              }\n            "},!(n().mobiles.mobiles.length<=1)){e.next=15;break}return e.prev=2,e.next=5,o.a.post("http://localhost:8080/graphql",JSON.stringify(a),{headers:{"Content-Type":"application/json"}});case 5:i=e.sent,c=i.data.data.mobiles,t({type:l.i,mobiles:c}),e.next=13;break;case 10:throw e.prev=10,e.t0=e.catch(2),e.t0;case 13:e.next=16;break;case 15:return e.abrupt("return",null);case 16:case"end":return e.stop()}},e,null,[[2,10]])}));return function(t,n){return e.apply(this,arguments)}}()},s=function(e,t,n,a,c){return function(){var u=Object(i.a)(r.a.mark(function i(u,s){var d,p,m,f,h,b;return r.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:if(r.prev=0,"string"!==typeof c){r.next=5;break}d=c,r.next=14;break;case 5:return(p=new FormData).append("pic",c),r.next=9,fetch("http://localhost:8080/post-image",{method:"PUT",headers:{Authorization:"Bearer "+s().auth.token},body:p});case 9:return m=r.sent,r.next=12,m.json();case 12:f=r.sent,d=f.filePath;case 14:return h={query:"\n                      mutation CreateMobile($title: String!, $description: String!, $price: Float!, $model: String!, $imageUrl: String!) {\n                          createMobile(mobileInput: {\n                              title: $title,\n                              description: $description,\n                              price: $price,\n                              model: $model,\n                              imageUrl: $imageUrl\n                            }) {\n                              _id\n                              title\n                              description\n                              price\n                              model\n                              userId {\n                                _id\n                                email\n                                firstname\n                                lastname\n                              }\n                              imageUrl\n                              createdAt\n                              updatedAt\n                            }\n                      }\n                  ",variables:{title:e,description:t,price:n,model:a,imageUrl:d}},r.next=17,o.a.post("http://localhost:8080/graphql",JSON.stringify(h),{headers:{"Content-Type":"application/json",Authorization:"Bearer "+s().auth.token}});case 17:b=r.sent,u({type:l.d,mobile:b.data.data.createMobile}),r.next=24;break;case 21:throw r.prev=21,r.t0=r.catch(0),r.t0;case 24:case"end":return r.stop()}},i,null,[[0,21]])}));return function(e,t){return u.apply(this,arguments)}}()},d=function(e,t,n,a,r,i){return function(c){c({type:l.g,id:e,title:t,description:n,model:r,price:a,imageUrl:i})}},p=function(e){return function(t){t({type:l.d,mobile:e})}},m=function(e,t,n,a,c,u){return function(){var s=Object(i.a)(r.a.mark(function i(s,d){var p,m,f,h,b,y,g;return r.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:if(r.prev=0,m=new FormData,"string"!==typeof u){r.next=6;break}p=u,r.next=14;break;case 6:return m.append("pic",u),r.next=9,fetch("http://localhost:8080/post-image",{method:"PUT",headers:{Authorization:"Bearer "+d().auth.token},body:m});case 9:return f=r.sent,r.next=12,f.json();case 12:h=r.sent,p=h.filePath;case 14:return b={query:"\n                          mutation EditMobile($mobileId: String!, $newMobile: MobileInput!) {\n                              editMobile(mobileId: $mobileId, newMobile: $newMobile) {\n                                  _id\n                                  title\n                                  description\n                                  price\n                                  model\n                                  imageUrl\n                                  userId {\n                                      _id\n                                      firstname\n                                      lastname\n                                      email\n                                  }\n                                  createdAt\n                                  updatedAt\n                                }\n                          }\n                      ",variables:{mobileId:e,newMobile:{title:t,description:n,price:a,model:c,imageUrl:p}}},r.next=17,o.a.post("http://localhost:8080/graphql",JSON.stringify(b),{headers:{"Content-Type":"application/json",Authorization:"Bearer "+d().auth.token}});case 17:y=r.sent,g=y.data.data.editMobile,s({type:l.g,id:e,title:g.title,description:g.description,model:g.model,price:g.price,imageUrl:g.imageUrl}),r.next=25;break;case 22:throw r.prev=22,r.t0=r.catch(0),r.t0;case 25:case"end":return r.stop()}},i,null,[[0,22]])}));return function(e,t){return s.apply(this,arguments)}}()}},66:function(e,t,n){"use strict";n.d(t,"d",function(){return u}),n.d(t,"e",function(){return m}),n.d(t,"c",function(){return f}),n.d(t,"a",function(){return h}),n.d(t,"f",function(){return b}),n.d(t,"b",function(){return y});var a=n(54),r=n.n(a),i=n(55),c=n(2),o=n(57),l=n.n(o),u=function(){return function(){var e=Object(i.a)(r.a.mark(function e(t,n){var a,i,o,u;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(a={query:"\n                      query Cart($userId: String) {\n                          cart(userId: $userId) {\n                              _id\n                              mobileId {\n                                  _id\n                                  title\n                                  imageUrl\n                                  price\n                              }\n                              userId {\n                                  _id\n                                  email\n                                  firstname\n                                  lastname\n                              }\n                              quantity\n                        }\n                      }\n                  ",variables:{userId:n().auth.userId}},i=0,n().carts.carts.forEach(function(e){i+=+e.mobileId.price*e.quantity}),!(n().carts.carts.length<=0||n().carts.totalPrice!==i)){e.next=16;break}return e.prev=4,e.next=7,l.a.post("http://localhost:8080/graphql",JSON.stringify(a),{headers:{"Content-Type":"application/json",Authorization:"Bearer "+n().auth.token}});case 7:o=e.sent,u=0,o.data.data.cart.forEach(function(e){u+=+e.mobileId.price*e.quantity}),t({type:c.h,carts:o.data.data.cart,totalPrice:u}),e.next=16;break;case 13:throw e.prev=13,e.t0=e.catch(4),e.t0;case 16:case"end":return e.stop()}},e,null,[[4,13]])}));return function(t,n){return e.apply(this,arguments)}}()},s=function(e){return function(){var t=Object(i.a)(r.a.mark(function t(n){return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:n({type:c.k,id:e});case 1:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}()},d=function(e){return function(t){t({type:c.l,cartid:e})}},p=function(e,t){return function(n){n({type:c.f,cartid:e,item:t})}},m=function(e){return function(){var t=Object(i.a)(r.a.mark(function t(n,a){var i,c;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return i=a().carts.carts.find(function(t){return t._id===e}),c={query:"\n                mutation IncrementItemToCart($cartId: String!, $cartQuantity: Int!) {\n                    incrementItemToCart(cartId: $cartId, cartQuantity: $cartQuantity) {\n                        quantity\n                        userId {\n                          email\n                        }\n                        mobileId {\n                          title\n                          description\n                          price\n                        }\n                      }\n                }\n            ",variables:{cartId:e,cartQuantity:i.quantity}},n(s(e)),t.prev=3,t.next=6,l.a.post("http://localhost:8080/graphql",JSON.stringify(c),{headers:{"Content-Type":"application/json",Authorization:"Bearer "+a().auth.token}});case 6:t.next=12;break;case 8:throw t.prev=8,t.t0=t.catch(3),n(d(e)),t.t0;case 12:case"end":return t.stop()}},t,null,[[3,8]])}));return function(e,n){return t.apply(this,arguments)}}()},f=function(e){return function(){var t=Object(i.a)(r.a.mark(function t(n,a){var i,o;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return i=a().carts.carts.find(function(t){return t._id===e}),o={query:"\n      mutation DecrementItemToCart($cartId: String!, $cartQuantity: Int!) {\n        decrementItemToCart(cartId: $cartId, cartQuantity: $cartQuantity) {\n            quantity\n            userId {\n              email\n            }\n            mobileId {\n              title\n              description\n              price\n            }\n          }\n    }\n            ",variables:{cartId:e,cartQuantity:i.quantity}},n({type:c.e,id:e}),t.prev=3,t.next=6,l.a.post("http://localhost:8080/graphql",JSON.stringify(o),{headers:{"Content-Type":"application/json",Authorization:"Bearer "+a().auth.token}});case 6:t.next=12;break;case 8:throw t.prev=8,t.t0=t.catch(3),n(p(e,i)),t.t0;case 12:case"end":return t.stop()}},t,null,[[3,8]])}));return function(e,n){return t.apply(this,arguments)}}()},h=function(e){return function(){var t=Object(i.a)(r.a.mark(function t(n,a){var i,o;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return i={query:"\n                mutation AddToCart($mobile: AddedMobileToCartInput!) {\n                    addToCart(mobile: $mobile) {\n                      _id\n                        mobileId {\n                        _id\n                        title\n                        price\n                        createdAt\n                        updatedAt\n                        imageUrl\n                        }\n                        quantity\n                        userId {\n                        _id\n                        email\n                        firstname\n                        lastname\n                        }\n                    }\n                }\n            ",variables:{mobile:{_id:e._id,title:e.title,description:e.description,model:e.model,price:e.price,imageUrl:e.imageUrl}}},t.next=3,l.a.post("http://localhost:8080/graphql",i,{headers:{"Content-Type":"application/json",Authorization:"Bearer "+a().auth.token}});case 3:o=t.sent,n({type:c.b,cart:o.data.data.addToCart});case 5:case"end":return t.stop()}},t)}));return function(e,n){return t.apply(this,arguments)}}()},b=function(e){return function(){var t=Object(i.a)(r.a.mark(function t(n,a){var i;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return i={query:"\n                mutation RemoveCart($cartId: String!) {\n                    removeCart(cartId: $cartId) {\n                        _id\n                        mobileId {\n                            _id\n                            title\n                            imageUrl\n                            price\n                        }\n                        userId {\n                            _id\n                            email\n                            firstname\n                            lastname\n                        }\n                        quantity\n                      }\n                }\n            ",variables:{cartId:e}},n({type:c.o,cartId:e}),t.next=4,l.a.post("http://localhost:8080/graphql",i,{headers:{"Content-Type":"application/json",Authorization:"Bearer "+a().auth.token}});case 4:case"end":return t.stop()}},t)}));return function(e,n){return t.apply(this,arguments)}}()},y=function(){return function(){var e=Object(i.a)(r.a.mark(function e(t,n){var a;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a={query:"\n                mutation {\n                    clearCart {\n                    email\n                    }\n                }  \n            "},t({type:c.c}),e.next=4,l.a.post("http://localhost:8080/graphql",a,{headers:{"Content-Type":"application/json",Authorization:"Bearer "+n().auth.token}});case 4:case"end":return e.stop()}},e)}));return function(t,n){return e.apply(this,arguments)}}()}}}]);
//# sourceMappingURL=8.f2f7bfc7.chunk.js.map