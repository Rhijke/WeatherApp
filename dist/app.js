!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t){var n,r,o=e.exports={};function c(){throw new Error("setTimeout has not been defined")}function i(){throw new Error("clearTimeout has not been defined")}function l(e){if(n===setTimeout)return setTimeout(e,0);if((n===c||!n)&&setTimeout)return n=setTimeout,setTimeout(e,0);try{return n(e,0)}catch(t){try{return n.call(null,e,0)}catch(t){return n.call(this,e,0)}}}!function(){try{n="function"==typeof setTimeout?setTimeout:c}catch(e){n=c}try{r="function"==typeof clearTimeout?clearTimeout:i}catch(e){r=i}}();var u,s=[],a=!1,f=-1;function d(){a&&u&&(a=!1,u.length?s=u.concat(s):f=-1,s.length&&h())}function h(){if(!a){var e=l(d);a=!0;for(var t=s.length;t;){for(u=s,s=[];++f<t;)u&&u[f].run();f=-1,t=s.length}u=null,a=!1,function(e){if(r===clearTimeout)return clearTimeout(e);if((r===i||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(e);try{r(e)}catch(t){try{return r.call(null,e)}catch(t){return r.call(this,e)}}}(e)}}function p(e,t){this.fun=e,this.array=t}function g(){}o.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];s.push(new p(e,t)),1!==s.length||a||l(h)},p.prototype.run=function(){this.fun.apply(null,this.array)},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.versions={},o.on=g,o.addListener=g,o.once=g,o.off=g,o.removeListener=g,o.removeAllListeners=g,o.emit=g,o.prependListener=g,o.prependOnceListener=g,o.listeners=function(e){return[]},o.binding=function(e){throw new Error("process.binding is not supported")},o.cwd=function(){return"/"},o.chdir=function(e){throw new Error("process.chdir is not supported")},o.umask=function(){return 0}},function(e,t,n){(function(e){n(2).config(),console.log(e.env);const t="pWYAAr0tBI1nbA6qjNhzi9Y6MY5ySP0a",r="4fae24c3fba51aed589f8d54e76ef903";console.log(`${t} ${r}`),window.addEventListener("load",()=>{let e,n,o,c,i,l=document.querySelector(".temperature-description"),u=document.querySelector(".temperature-degree"),s=document.querySelector(".location-timezone"),a=document.querySelector(".temperature-section");const f=document.querySelector(".temperature-section span h2");let d=document.querySelector(".search form i"),h=[document.querySelector("#monday p"),document.querySelector("#tuesday p"),document.querySelector("#wednesday p"),document.querySelector("#thursday p"),document.querySelector("#friday p"),document.querySelector("#saturday p"),document.querySelector("#sunday p")];d.addEventListener("click",()=>{console.log("Search bar clicked"),o=document.getElementById("search-form").elements["search-location"].value,function(){console.log("Called getlocation()");const r=`http://www.mapquestapi.com/geocoding/v1/address?key=${t}&location=${o.replace(/_/,"+")}`;fetch(r).then(e=>e.json()).then(t=>{console.log("Search for "+o),console.log(t);const{lat:r,lng:c}=t.results[0].locations[0].latLng;n=r,e=c,s.textContent=`${t.results[0].locations[0].adminArea5}, ${t.results[0].locations[0].adminArea3}`}).then(()=>{v()})}(),u.removeEventListener("click",m),p.removeEventListener("click",y)});let p=document.querySelector(".temperature-weekly h2");const g=document.querySelector(".temperature-weekly h2 span");var m=function(){console.log("clicked currently"),"F"===f.textContent?(u.textContent=c,f.textContent="C"):(f.textContent="F",u.textContent=i)},y=function(){if("(F)"===g.textContent){for(let e=0;e<7;e++)h[e].textContent=Math.floor((h[e].textContent-32)*(5/9));g.textContent="(C)"}else{for(let e=0;e<7;e++)h[e].textContent=Math.floor(h[e].textContent=1.8*h[e].textContent+33);g.textContent="(F)"}};function v(){console.log("getWeather()"),console.log(`${o} lat = ${n} long = ${e}`);fetch(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${r}/${n},${e}`).then(e=>e.json()).then(e=>{console.log(e);const{temperature:t,summary:n,icon:r}=e.currently,{data:o}=e.daily;f.textContent="F",u.textContent=Math.floor(t),l.textContent=n,console.log(o);for(let e=0;e<7;e++)h[e].textContent=Math.floor(o[e].apparentTemperatureMax);!function(e,t){const n=new Skycons({color:"white"}),r=e.replace(/-/g,"_").toUpperCase();n.play(),n.set(t,Skycons[r])}(r,document.querySelector(".icon"))}).then(()=>{i=u.textContent,c=Math.floor(5/9*(i-32)),a.addEventListener("click",m),p.addEventListener("click",y)})}navigator.geolocation&&!o&&(console.log("No location searched"),navigator.geolocation.getCurrentPosition(r=>{e=r.coords.longitude,n=r.coords.latitude;fetch(`https://cors-anywhere.herokuapp.com/http://open.mapquestapi.com/geocoding/v1/reverse?key=${t}&location=${n},${e}&`).then(e=>(console.log(e),e.json())).then(e=>{console.log(e),s.textContent=`${e.results[0].locations[0].adminArea5}, ${e.results[0].locations[0].adminArea3}`}),v()}))})}).call(this,n(0))},function(e,t,n){(function(t){const r=n(3),o=n(4);function c(e){console.log(`[dotenv][DEBUG] ${e}`)}const i="\n",l=/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/,u=/\\n/g,s=/\n|\r|\r\n/;function a(e,t){const n=Boolean(t&&t.debug),r={};return e.toString().split(s).forEach((function(e,t){const o=e.match(l);if(null!=o){const e=o[1];let t=o[2]||"";const n=t.length-1,c='"'===t[0]&&'"'===t[n];"'"===t[0]&&"'"===t[n]||c?(t=t.substring(1,n),c&&(t=t.replace(u,i))):t=t.trim(),r[e]=t}else n&&c(`did not match key and value when parsing line ${t+1}: ${e}`)})),r}e.exports.config=function(e){let n=o.resolve(t.cwd(),".env"),i="utf8",l=!1;e&&(null!=e.path&&(n=e.path),null!=e.encoding&&(i=e.encoding),null!=e.debug&&(l=!0));try{const e=a(r.readFileSync(n,{encoding:i}),{debug:l});return Object.keys(e).forEach((function(n){Object.prototype.hasOwnProperty.call(t.env,n)?l&&c(`"${n}" is already defined in \`process.env\` and will not be overwritten`):t.env[n]=e[n]})),{parsed:e}}catch(e){return{error:e}}},e.exports.parse=a}).call(this,n(0))},function(e,t){},function(e,t,n){(function(e){function n(e,t){for(var n=0,r=e.length-1;r>=0;r--){var o=e[r];"."===o?e.splice(r,1):".."===o?(e.splice(r,1),n++):n&&(e.splice(r,1),n--)}if(t)for(;n--;n)e.unshift("..");return e}function r(e,t){if(e.filter)return e.filter(t);for(var n=[],r=0;r<e.length;r++)t(e[r],r,e)&&n.push(e[r]);return n}t.resolve=function(){for(var t="",o=!1,c=arguments.length-1;c>=-1&&!o;c--){var i=c>=0?arguments[c]:e.cwd();if("string"!=typeof i)throw new TypeError("Arguments to path.resolve must be strings");i&&(t=i+"/"+t,o="/"===i.charAt(0))}return(o?"/":"")+(t=n(r(t.split("/"),(function(e){return!!e})),!o).join("/"))||"."},t.normalize=function(e){var c=t.isAbsolute(e),i="/"===o(e,-1);return(e=n(r(e.split("/"),(function(e){return!!e})),!c).join("/"))||c||(e="."),e&&i&&(e+="/"),(c?"/":"")+e},t.isAbsolute=function(e){return"/"===e.charAt(0)},t.join=function(){var e=Array.prototype.slice.call(arguments,0);return t.normalize(r(e,(function(e,t){if("string"!=typeof e)throw new TypeError("Arguments to path.join must be strings");return e})).join("/"))},t.relative=function(e,n){function r(e){for(var t=0;t<e.length&&""===e[t];t++);for(var n=e.length-1;n>=0&&""===e[n];n--);return t>n?[]:e.slice(t,n-t+1)}e=t.resolve(e).substr(1),n=t.resolve(n).substr(1);for(var o=r(e.split("/")),c=r(n.split("/")),i=Math.min(o.length,c.length),l=i,u=0;u<i;u++)if(o[u]!==c[u]){l=u;break}var s=[];for(u=l;u<o.length;u++)s.push("..");return(s=s.concat(c.slice(l))).join("/")},t.sep="/",t.delimiter=":",t.dirname=function(e){if("string"!=typeof e&&(e+=""),0===e.length)return".";for(var t=e.charCodeAt(0),n=47===t,r=-1,o=!0,c=e.length-1;c>=1;--c)if(47===(t=e.charCodeAt(c))){if(!o){r=c;break}}else o=!1;return-1===r?n?"/":".":n&&1===r?"/":e.slice(0,r)},t.basename=function(e,t){var n=function(e){"string"!=typeof e&&(e+="");var t,n=0,r=-1,o=!0;for(t=e.length-1;t>=0;--t)if(47===e.charCodeAt(t)){if(!o){n=t+1;break}}else-1===r&&(o=!1,r=t+1);return-1===r?"":e.slice(n,r)}(e);return t&&n.substr(-1*t.length)===t&&(n=n.substr(0,n.length-t.length)),n},t.extname=function(e){"string"!=typeof e&&(e+="");for(var t=-1,n=0,r=-1,o=!0,c=0,i=e.length-1;i>=0;--i){var l=e.charCodeAt(i);if(47!==l)-1===r&&(o=!1,r=i+1),46===l?-1===t?t=i:1!==c&&(c=1):-1!==t&&(c=-1);else if(!o){n=i+1;break}}return-1===t||-1===r||0===c||1===c&&t===r-1&&t===n+1?"":e.slice(t,r)};var o="b"==="ab".substr(-1)?function(e,t,n){return e.substr(t,n)}:function(e,t,n){return t<0&&(t=e.length+t),e.substr(t,n)}}).call(this,n(0))}]);