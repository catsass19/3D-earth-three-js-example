(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{1:function(n,e,t){"use strict";t.d(e,"b",function(){return o}),t.d(e,"a",function(){return u}),t.d(e,"c",function(){return i});
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
var r=function(n,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,e){n.__proto__=e}||function(n,e){for(var t in e)e.hasOwnProperty(t)&&(n[t]=e[t])})(n,e)};function o(n,e){function t(){this.constructor=n}r(n,e),n.prototype=null===e?Object.create(e):(t.prototype=e.prototype,new t)}function u(n,e,t,r){return new(t||(t=Promise))(function(o,u){function i(n){try{l(r.next(n))}catch(n){u(n)}}function c(n){try{l(r.throw(n))}catch(n){u(n)}}function l(n){n.done?o(n.value):new t(function(e){e(n.value)}).then(i,c)}l((r=r.apply(n,e||[])).next())})}function i(n,e){var t,r,o,u,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return u={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(u[Symbol.iterator]=function(){return this}),u;function c(u){return function(c){return function(u){if(t)throw new TypeError("Generator is already executing.");for(;i;)try{if(t=1,r&&(o=2&u[0]?r.return:u[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,u[1])).done)return o;switch(r=0,o&&(u=[2&u[0],o.value]),u[0]){case 0:case 1:o=u;break;case 4:return i.label++,{value:u[1],done:!1};case 5:i.label++,r=u[1],u=[0];continue;case 7:u=i.ops.pop(),i.trys.pop();continue;default:if(!(o=(o=i.trys).length>0&&o[o.length-1])&&(6===u[0]||2===u[0])){i=0;continue}if(3===u[0]&&(!o||u[1]>o[0]&&u[1]<o[3])){i.label=u[1];break}if(6===u[0]&&i.label<o[1]){i.label=o[1],o=u;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(u);break}o[2]&&i.ops.pop(),i.trys.pop();continue}u=e.call(n,i)}catch(n){u=[6,n],r=0}finally{t=o=0}if(5&u[0])throw u[1];return{value:u[0]?u[1]:void 0,done:!0}}([u,c])}}}},9:function(n,e,t){"use strict";t.r(e);var r=t(1),o=t(2),u=t(0),i=t.n(u),c=Object(u.lazy)(function(){return Promise.all([t.e(5),t.e(0)]).then(t.bind(null,38))}),l={display:"flex",flexDirection:"column",height:"100vh",width:"100vw"},a=function(n){function e(){return null!==n&&n.apply(this,arguments)||this}return r.b(e,n),e.prototype.render=function(){return i.a.createElement("div",{style:l},i.a.createElement(u.Suspense,{fallback:i.a.createElement("div",null,"Loading...")},i.a.createElement(c,null)))},e}(i.a.Component),s=i.a.createElement(a,null),f=new(function(){return function(){this.isDEBUG=!1}}());r.a(void 0,void 0,void 0,function(){var n;return r.c(this,function(e){switch(e.label){case 0:if(!f.isDEBUG)return[3,4];console.log("Running in DEBUG mode"),e.label=1;case 1:return e.trys.push([1,3,,4]),[4,t.e(2).then(t.bind(null,37))];case 2:return e.sent(),[3,4];case 3:return n=e.sent(),console.error("Failed to inject debug service",n),[3,4];case 4:return o.render(s,document.getElementById("content")),[2]}})})}},[[9,3,4]]]);