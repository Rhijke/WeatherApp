!function(e){var t={};function o(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.m=e,o.c=t,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(n,r,function(t){return e[t]}.bind(null,r));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=0)}([function(e,t,o){const n="pWYAAr0tBI1nbA6qjNhzi9Y6MY5ySP0a",r="4fae24c3fba51aed589f8d54e76ef903",c="https://cors-anywhere.herokuapp.com/";window.addEventListener("load",()=>{let e,t,o,l,a;const u=document.querySelector(".temperature-description"),s=document.querySelector(".temperature-degree"),i=document.querySelector(".location-timezone"),d=document.querySelector(".temperature-section"),p=document.querySelector(".temperature-section span h2"),m=document.querySelector(".search form input"),f=document.querySelector(".search form i"),y=[document.querySelector("#monday p"),document.querySelector("#tuesday p"),document.querySelector("#wednesday p"),document.querySelector("#thursday p"),document.querySelector("#friday p"),document.querySelector("#saturday p"),document.querySelector("#sunday p")];m.addEventListener("keydown",e=>{13==e.keyCode&&(e.preventDefault(),console.log("Search bar clicked"),o=document.getElementById("search-form").elements["search-location"].value,v(),s.removeEventListener("click",C),h.removeEventListener("click",x))}),f.addEventListener("click",e=>{console.log("Clicked seardch submit"),o=document.getElementById("search-form").elements["search-location"].value,v(),s.removeEventListener("click",C),h.removeEventListener("click",x)});let h=document.querySelector(".temperature-weekly h2");const g=document.querySelector(".temperature-weekly h2 span");var C=function(){console.log("clicked currently"),"F"===p.textContent?(s.textContent=l,p.textContent="C"):(p.textContent="F",s.textContent=a)},x=function(){if("(F)"===g.textContent){for(let e=0;e<7;e++){let t=y[e].querySelectorAll("span");t[0].textContent=Math.floor((t[0].textContent-32)*(5/9)),t[1].textContent=Math.floor((t[1].textContent-32)*(5/9))}g.textContent="(C)"}else{for(let e=0;e<7;e++){let t=y[e].querySelectorAll("span");t[0].textContent=Math.floor(t[0].textContent=1.8*t[0].textContent+33),t[1].textContent=Math.floor(t[1].textContent=1.8*t[1].textContent+33)}g.textContent="(F)"}};function v(){console.log("Called getlocation()");const r=`${c}https://www.mapquestapi.com/geocoding/v1/address?key=${n}&location=${o.replace(/_/,"+")}`;fetch(r).then(e=>e.json()).then(n=>{console.log("Search for "+o),console.log(n);const{lat:r,lng:c}=n.results[0].locations[0].latLng;t=r,e=c,i.textContent=`${n.results[0].locations[0].adminArea5}, ${n.results[0].locations[0].adminArea3}`}).then(()=>{S()})}function S(){console.log("getWeather()"),console.log(`${o} lat = ${t} long = ${e}`),fetch(`${c}https://api.darksky.net/forecast/${r}/${t},${e}`).then(e=>e.json()).then(e=>{console.log(e);const{temperature:t,summary:o,icon:n}=e.currently,{data:r}=e.daily;p.textContent="F",s.textContent=Math.floor(t),u.textContent=o,console.log(r);for(let e=0;e<7;e++){let t=y[e].querySelectorAll("span");t[0].textContent=Math.floor(r[e].apparentTemperatureMax),t[1].textContent=Math.floor(r[e].apparentTemperatureMin)}!function(e,t){const o=new Skycons({color:"white"}),n=e.replace(/-/g,"_").toUpperCase();o.play(),o.set(t,Skycons[n])}(n,document.querySelector(".icon"))}).then(()=>{a=s.textContent,l=Math.floor(5/9*(a-32)),d.addEventListener("click",C),h.addEventListener("click",x)})}navigator.geolocation&&!o&&(console.log("No location searched"),navigator.geolocation.getCurrentPosition(o=>{e=o.coords.longitude,t=o.coords.latitude,fetch(`${c}http://open.mapquestapi.com/geocoding/v1/reverse?key=${n}&location=${t},${e}&`).then(e=>(console.log(e),e.json())).then(e=>{console.log(e),i.textContent=`${e.results[0].locations[0].adminArea5}, ${e.results[0].locations[0].adminArea3}`}),S()}))})}]);