!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){(function(e){var t=config.GOOGLE_KEY|e.env.GOOGLE_KEY,n=config.DARK_SKY_KEY|e.env.DARK_SKY_KEY;window.addEventListener("load",()=>{let e,o,r,c,u,l=document.querySelector(".temperature-description"),i=document.querySelector(".temperature-degree"),a=document.querySelector(".location-timezone"),s=document.querySelector(".temperature-section");const d=document.querySelector(".temperature-section span h2");let f=document.querySelector(".search form i"),p=[document.querySelector("#monday p"),document.querySelector("#tuesday p"),document.querySelector("#wednesday p"),document.querySelector("#thursday p"),document.querySelector("#friday p"),document.querySelector("#saturday p"),document.querySelector("#sunday p")];f.addEventListener("click",()=>{r=document.getElementById("search-form").elements["search-location"].value,function(){const n=`https://maps.googleapis.com/maps/api/geocode/json?address=${r.replace(/_/,"+")}&key=${t}`;fetch(n).then(e=>e.json()).then(t=>{const{lat:n,lng:r}=t.results[0].geometry.location;o=n,e=r,a.textContent=t.results[0].formatted_address.replace(/_/," "),console.log(t)}).then(()=>{v()})}(),i.removeEventListener("click",h),m.removeEventListener("click",g)});let m=document.querySelector(".temperature-weekly h2");const y=document.querySelector(".temperature-weekly h2 span");var h=function(){console.log("clicked currently"),"F"===d.textContent?(console.log("F"),i.textContent=c,d.textContent="C"):(console.log("C"),d.textContent="F",i.textContent=u)},g=function(){if(console.log("clicked qweekly"),"(F)"===y.textContent){for(let e=0;e<7;e++)p[e].textContent=Math.floor((p[e].textContent-32)*(5/9));y.textContent="(C)"}else{for(let e=0;e<7;e++)p[e].textContent=Math.floor(p[e].textContent=1.8*p[e].textContent+33);y.textContent="(F)"}};function v(){console.log(`${r} lat = ${o} long = ${e}`);fetch(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${n}/${o},${e}`).then(e=>e.json()).then(e=>{const{temperature:t,summary:n,icon:o}=e.currently,{data:r}=e.daily;d.textContent="F",i.textContent=Math.floor(t),l.textContent=n,console.log(r);for(let e=0;e<7;e++)p[e].textContent=Math.floor(r[e].apparentTemperatureMax);!function(e,t){const n=new Skycons({color:"white"}),o=e.replace(/-/g,"_").toUpperCase();n.play(),n.set(t,Skycons[o])}(o,document.querySelector(".icon"))}).then(()=>{u=i.textContent,c=Math.floor(5/9*(u-32)),s.addEventListener("click",h),m.addEventListener("click",g)})}navigator.geolocation&&!r&&navigator.geolocation.getCurrentPosition(n=>{console.log(n),e=n.coords.longitude,o=n.coords.latitude;fetch(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/geocode/json?latlng=${o},${e}&key=${t}`).then(e=>e.json()).then(e=>{a.textContent=e.results[7].formatted_address}),v()})})}).call(this,n(1))},function(e,t){var n,o,r=e.exports={};function c(){throw new Error("setTimeout has not been defined")}function u(){throw new Error("clearTimeout has not been defined")}function l(e){if(n===setTimeout)return setTimeout(e,0);if((n===c||!n)&&setTimeout)return n=setTimeout,setTimeout(e,0);try{return n(e,0)}catch(t){try{return n.call(null,e,0)}catch(t){return n.call(this,e,0)}}}!function(){try{n="function"==typeof setTimeout?setTimeout:c}catch(e){n=c}try{o="function"==typeof clearTimeout?clearTimeout:u}catch(e){o=u}}();var i,a=[],s=!1,d=-1;function f(){s&&i&&(s=!1,i.length?a=i.concat(a):d=-1,a.length&&p())}function p(){if(!s){var e=l(f);s=!0;for(var t=a.length;t;){for(i=a,a=[];++d<t;)i&&i[d].run();d=-1,t=a.length}i=null,s=!1,function(e){if(o===clearTimeout)return clearTimeout(e);if((o===u||!o)&&clearTimeout)return o=clearTimeout,clearTimeout(e);try{o(e)}catch(t){try{return o.call(null,e)}catch(t){return o.call(this,e)}}}(e)}}function m(e,t){this.fun=e,this.array=t}function y(){}r.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];a.push(new m(e,t)),1!==a.length||s||l(p)},m.prototype.run=function(){this.fun.apply(null,this.array)},r.title="browser",r.browser=!0,r.env={},r.argv=[],r.version="",r.versions={},r.on=y,r.addListener=y,r.once=y,r.off=y,r.removeListener=y,r.removeAllListeners=y,r.emit=y,r.prependListener=y,r.prependOnceListener=y,r.listeners=function(e){return[]},r.binding=function(e){throw new Error("process.binding is not supported")},r.cwd=function(){return"/"},r.chdir=function(e){throw new Error("process.chdir is not supported")},r.umask=function(){return 0}}]);