(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports=function e(t,n){for(var o=0;o<n.length;o++){var i=n[o];if(Array.isArray(i))e(t,i);else{if(("number"==typeof i||"boolean"==typeof i||i instanceof Date||i instanceof RegExp)&&(i=i.toString()),"string"==typeof i){if(/^[\n\r\s]+$/.test(i))continue;if(t.lastChild&&"#text"===t.lastChild.nodeName){t.lastChild.nodeValue+=i;continue}i=document.createTextNode(i)}i&&i.nodeType&&t.appendChild(i)}}};

},{}],2:[function(require,module,exports){
module.exports={SET_EXAMPLE_NOTEBOOK:"set-example-notebook",LAUNCH_NOTEBOOK:"sse-launch-notebook"};

},{}],3:[function(require,module,exports){
(function (process){
const css=0,choo=require(9),events=require(2);null;const app=choo();"production"!==process.env.NODE_ENV&&(app.use(require(6)()),app.use(require(7)())),app.use(require(4)),app.use(function(e,r){e.form={address:""},r.on("DOMContentLoaded",function(){r.on(events.SET_EXAMPLE_NOTEBOOK,function(){e.form.address="github://octocat/spoon-knife",r.emit("render")})})}),app.route("/",require(5)),app.mount("body");

}).call(this,require(27))
},{"2":2,"26":26,"27":27,"4":4,"5":5,"6":6,"7":7,"9":9}],4:[function(require,module,exports){
function sse(e,t){e.sse={log:[],url:"",stderr:0,stdout:0},t.on("DOMContentLoaded",function(){t.on(events.LAUNCH_NOTEBOOK,function(n){const s=new window.EventSource("/~launch/"+n);s.addEventListener("stdout",function(n){e.sse.log.push({type:"stdout",data:n.data}),e.sse.stdout+=1,t.emit("render")},!1),s.addEventListener("stderr",function(n){e.sse.log.push({type:"stderr",data:n.data}),e.sse.stderr+=1,t.emit("render")},!1),s.addEventListener("goto",function(n){e.sse.url=n.data,t.emit("render")},!1),s.addEventListener("end",function(e){s.close()},!1),s.onerror=function(e){t.emit("log:error",e),s.close()}})})}var events=require(2);module.exports=sse;

},{"2":2}],5:[function(require,module,exports){
function mainView(e,t){return function(){var e=require(1),t=document.createElement("body");t.setAttribute("class","sans-serif");var n=document.createElement("main");n.setAttribute("class","flex flex-column mw7 pa3 center");var r=document.createElement("section"),s=document.createElement("h1");s.setAttribute("class","f1 f-subheadline-ns ma0 pv3"),e(s,["\n            Sibyl\n          "]);var a=document.createElement("h2");a.setAttribute("class","f3 f2-ns ma0 pt3 pt4-ns"),e(a,["\n            Run interactive notebooks in the browser\n          "]),e(r,["\n          ",s,"\n          ",a,"\n        "]);var i=document.createElement("section");i.setAttribute("class","flex flex-column justify-between content-stretch");var c=document.createElement("section");c.setAttribute("class","w-100"),e(c,["\n            ",arguments[0],"\n          "]);var l=document.createElement("section");return l.setAttribute("class","cf content-stretch mt3 mt5-ns"),e(l,["\n            ",arguments[1],"\n            ",arguments[2],"\n          "]),e(i,["\n          ",c,"\n          ",l,"\n        "]),e(n,["\n        ",r,"\n        ",i,"\n      "]),e(t,["\n      ",n,"\n    "]),t}(function(){var e=require(1),t=document.createElement("form");t.onsubmit=arguments[2],t.setAttribute("class","pt5 flex flex-column align-right");var n=document.createElement("label");n.setAttribute("class","f4 b"),n.setAttribute("for","address"),e(n,["\n        Address\n      "]);var r=document.createElement("input");r.setAttribute("type","text"),r.setAttribute("id","address"),r.setAttribute("value",arguments[0]),r.setAttribute("placeholder","For example github://octocat/spoon-knife"),r.setAttribute("class","mt2 pa2 f5 b--black");var s=document.createElement("span");s.setAttribute("class","mt2 lh-copy");var a=document.createElement("button");a.onclick=arguments[1],a.setAttribute("class","bn bg-white pointer pa0 ma0 link underline"),e(a,["\n          Try an example\n        "]),e(s,["\n        Run a repository containing a notebook. Is this your first time?\n        ",a,"\n      "]);var i=document.createElement("input");return i.setAttribute("type","submit"),i.setAttribute("value","Run notebook"),i.setAttribute("class","mw4 mt4 mh0 bg-white f5 b--black pa2 link pointer"),e(t,["\n      ",n,"\n      ",r,"\n      ",s,"\n      ",i,"\n    "]),t}(e.form.address,function(){t(events.SET_EXAMPLE_NOTEBOOK)},function(e){e.preventDefault();var n=e.target.querySelector("#address").value;t(events.LAUNCH_NOTEBOOK,n)}),createTerminal(e,t),createSummary(e,t))}function createSummary(e,t){if(!e.sse.log.length)return function(){require(1);var e=document.createElement("div");return e.setAttribute("class","fl"),e}();var n;return n=e.sse.url?function(){var e=require(1),t=document.createElement("a");return t.setAttribute("href",arguments[0]),t.setAttribute("class","mh0 bg-white f5 b--black pa2 link pointer"),e(t,["\n        Open notebook\n      "]),t}(e.sse.url):function(){var e=require(1),t=document.createElement("a");return t.setAttribute("class","mh0 bg-light-gray f5 ba b--light-gray pa2 link"),e(t,["\n        Open notebook\n      "]),t}(),function(){var e=require(1),t=document.createElement("div");t.setAttribute("class","fl w-100 w-40-ns pl5-ns");var n=document.createElement("h2");n.setAttribute("class","f4 mv2 mt0-ns mb3-ns"),e(n,["\n        Progress\n      "]);var r=document.createElement("div");r.setAttribute("class","flex");var s=document.createElement("p");s.setAttribute("class","mv0");var a=document.createElement("b");a.setAttribute("class","f4 f3-ns"),e(a,[arguments[0]]);var i=document.createElement("p");i.setAttribute("class","f5 mt2"),e(i,["Lines"]),e(s,["\n          ",a,"\n          ",i,"\n        "]);var c=document.createElement("p");c.setAttribute("class","mv0 ml4");var l=document.createElement("b");l.setAttribute("class","f4 f3-ns"),e(l,[arguments[1]]);var o=document.createElement("p");o.setAttribute("class","f5 mt2"),e(o,["Errors"]),e(c,["\n          ",l,"\n          ",o,"\n        "]),e(r,["\n        ",s,"\n        ",c,"\n      "]);var u=document.createElement("div");return u.setAttribute("class","mt2"),e(u,["\n        ",arguments[2],"\n      "]),e(t,["\n      ",n,"\n      ",r,"\n      ",u,"\n    "]),t}(e.sse.stdout,e.sse.stderr,n)}function createTerminal(e,t){return e.sse.log.length?function(){var e=require(1),t=document.createElement("div");t.setAttribute("class","fl w-100 w-60-ns mt3 mt0-ns");var n=document.createElement("h2");n.setAttribute("class","f4 mv2 mt0-ns mb3-ns"),e(n,["\n        Console\n      "]);var r=document.createElement("div");return r.setAttribute("class","bg-black pa3 f6 pre"),e(r,["\n        ",arguments[0],"\n      "]),e(t,["\n      ",n,"\n      ",r,"\n    "]),t}(e.sse.log.map(function(e){var t;return"stdout"===e.type?t="terminal-white":"stderr"===e.type&&(t="terminal-red"),function(){var e=require(1),t=document.createElement("pre");return t.setAttribute("class",arguments[0]+" ma0 lh-copy"),e(t,["\n              ",arguments[1],"\n            "]),t}(t,e.data)})):function(){require(1);return document.createElement("div")}()}var html=require(8),css=0,events=require(2);null,module.exports=mainView;

},{"1":1,"2":2,"26":26,"8":8}],6:[function(require,module,exports){
function expose(){return function(o,n){window.choo={},window.choo.state=o,window.choo.emit=function(o,e){n.emit(o,e)},window.choo.on=function(o,e){n.on(o,e)}}}module.exports=expose;

},{}],7:[function(require,module,exports){
function logger(n){n=n||{};var e="undefined"!=typeof window&&window.performance&&window.performance.getEntriesByName,o=void 0===n.clearResourceTimings||n.clearResourceTimings,r=void 0===n.timing||n.timing;return e&&o&&(window.performance.onresourcetimingbufferfull=function(){window.performance.clearResourceTimings()}),function(n,o){function i(){var n=window.performance.getEntriesByName("choo:render"),e=n.length-1;if(e<0)return t.info("render");var o=n[e].duration.toFixed(),r=Math.min((600/o).toFixed(),60),i=r+"fps "+o+"ms";60===r?t.info("render",i):t.warn("render",i)}var t=nanologger("choo");o.on("*",function(n,a){e&&r&&"render"===n?window.requestAnimationFrame(i):/^log:\w{4,5}/.test(n)||t.info(n,a);var f=o.listeners(n);"pushState"!==n&&"DOMContentLoaded"!==n&&(f.length||t.error("No listeners for "+n))}),o.on("log:debug",function(n,e){t.debug(n,e)}),o.on("log:info",function(n,e){t.info(n,e)}),o.on("log:warn",function(n,e){t.warn(n,e)}),o.on("log:error",function(n,e){t.error(n,e)}),o.on("log:fatal",function(n,e){t.fatal(n,e)})}}var nanologger=require(15);module.exports=logger;

},{"15":15}],8:[function(require,module,exports){
module.exports={};

},{}],9:[function(require,module,exports){
function Choo(n){function e(){function e(n,e){e&&window.history[n+"State"]({},null,e),u.emit("render"),setTimeout(function(){scrollIntoView()},0)}return!1!==n.history&&(nanohistory(function(n){u.emit("pushState")}),u.prependListener("pushState",e.bind(null,"push")),u.prependListener("replaceState",e.bind(null,"replace")),!1!==n.href&&nanohref(function(n){var e=n.href;e!==window.location.href&&u.emit("pushState",e)})),c=nanoraf(function(){a&&t&&window.performance.mark("choo:renderStart");var n=i(createLocation());d=nanomorph(d,n),a&&t&&(window.performance.mark("choo:renderEnd"),window.performance.measure("choo:render","choo:renderStart","choo:renderEnd"))}),u.prependListener("render",c),documentReady(function(){u.emit("DOMContentLoaded")}),d=i(createLocation())}function o(n,e){u.emit(n,e)}var r={default:(n=n||{}).defaultRoute||"/404",curry:!0},t=void 0===n.timing||n.timing,a="undefined"!=typeof window&&window.performance&&window.performance.mark,i=nanorouter(r),u=nanobus(),c=null,d=null,f={};return{toString:function(n,e){return f=e||{},i(n).toString()},use:function(n){n(f,u)},mount:function(n){var o=e();documentReady(function(){var e=document.querySelector(n);nanomount(e,o),d=e})},router:i,route:function(n,e){i.on(n,function(n){return function(){return f.params=n,e(f,o)}})},start:e}}function scrollIntoView(){var n=window.location.hash;if(n)try{var e=document.querySelector(n);e&&e.scrollIntoView(!0)}catch(n){}}function createLocation(){return window.location.pathname.replace(/\/$/,"")+window.location.hash.replace(/^#/,"/")}var documentReady=require(10),nanohistory=require(13),nanorouter=require(20),nanomount=require(19),nanomorph=require(16),nanohref=require(14),nanoraf=require(11),nanobus=require(12);module.exports=Choo;

},{"10":10,"11":11,"12":12,"13":13,"14":14,"16":16,"19":19,"20":20}],10:[function(require,module,exports){
"use strict";function ready(e){var t=document.readyState;if("complete"===t||"interactive"===t)return setTimeout(e,0);document.addEventListener("DOMContentLoaded",function(){e()})}module.exports=ready;

},{}],11:[function(require,module,exports){
"use strict";function nanoraf(n,r){r||(r=window.requestAnimationFrame);var a=!1,o=null;return function(){null!==o||a||(a=!0,r(function(){a=!1;for(var r=o.length,t=new Array(r),u=0;u<r;u++)t[u]=o[u];n.apply(n,t),o=null})),o=arguments}}module.exports=nanoraf;

},{}],12:[function(require,module,exports){
function Nanobus(t){if(!(this instanceof Nanobus))return new Nanobus(t);this._name=t||"nanobus",this._starListeners=[],this._listeners={},this._timing=nanotiming(this._name)}var nanotiming=require(21);module.exports=Nanobus,Nanobus.prototype.emit=function(t,s){this._timing.start(t);var e=this._listeners[t];return e&&e.length>0&&this._emit(this._listeners[t],s),this._starListeners.length>0&&this._emit(this._starListeners,t,s),this._timing.end(t),this},Nanobus.prototype.on=Nanobus.prototype.addListener=function(t,s){return"*"===t?this._starListeners.push(s):(this._listeners[t]||(this._listeners[t]=[]),this._listeners[t].push(s)),this},Nanobus.prototype.prependListener=function(t,s){return"*"===t?this._starListeners.unshift(s):(this._listeners[t]||(this._listeners[t]=[]),this._listeners[t].unshift(s)),this},Nanobus.prototype.once=function(t,s){function e(){s.apply(i,arguments),i.removeListener(t,e)}var i=this;return this.on(t,e),this},Nanobus.prototype.prependOnceListener=function(t,s){function e(){s.apply(i,arguments),i.removeListener(t,e)}var i=this;return this.prependListener(t,e),this},Nanobus.prototype.removeListener=function(t,s){function e(t,s){if(t){var e=t.indexOf(s);return-1!==e?(t.splice(e,1),!0):void 0}}return"*"===t?(this._starListeners=this._starListeners.slice(),e(this._starListeners,s)):(void 0!==this._listeners[t]&&(this._listeners[t]=this._listeners[t].slice()),e(this._listeners[t],s))},Nanobus.prototype.removeAllListeners=function(t){return t?"*"===t?this._starListeners=[]:this._listeners[t]=[]:(this._starListeners=[],this._listeners={}),this},Nanobus.prototype.listeners=function(t){var s="*"!==t?this._listeners[t]:this._starListeners,e=[];if(s)for(var i=s.length,n=0;n<i;n++)e.push(s[n]);return e},Nanobus.prototype._emit=function(t,s,e){if(void 0!==t){e||(e=s,s=null);for(var i=t.length,n=0;n<i;n++){var r=t[n];s?r(s,e):r(e)}}};

},{"21":21}],13:[function(require,module,exports){
function history(o){window.onpopstate=function(){o(document.location)}}module.exports=history;

},{}],14:[function(require,module,exports){
function href(t,o){o=o||window.document,window.onclick=function(e){if(!(e.button&&0!==e.button||e.ctrlKey||e.metaKey||e.altKey||e.shiftKey)){var n=function t(e){if(e&&e!==o)return"a"!==e.localName?t(e.parentNode):void 0===e.href?t(e.parentNode):window.location.host!==e.host?t(e.parentNode):e}(e.target);n&&(n.hasAttribute(noRoutingAttrName)||(e.preventDefault(),t(n)))}}}module.exports=href;var noRoutingAttrName="data-no-routing";

},{}],15:[function(require,module,exports){
function Nanologger(o){if(!(this instanceof Nanologger))return new Nanologger(o);this._name=o||"";try{this.logLevel=window.localStorage.getItem("logLevel")||"info"}catch(o){this.logLevel="info"}this._logLevel=levels[this.logLevel]}function color(o){return"color: "+o+";"}function getTimeStamp(){var o=new Date;return pad(o.getHours().toString())+":"+pad(o.getMinutes().toString())+":"+pad(o.getSeconds().toString())}function pad(o){return 2!==o.length?0+o:o}var emojis={debug:"🐛",info:"✨",warn:"⚠️",error:"🚨",fatal:"💀"},levels={debug:20,info:30,warn:40,error:50,fatal:60},colors={foreground:"#d3c0c8",background:"#2d2d2d",black:"#2d2d2d",red:"#f2777a",green:"#99cc99",yellow:"#ffcc66",blue:"#6699cc",magenta:"#cc99cc",cyan:"#66cccc",white:"#d3d0c8",brightBlack:"#747369"};module.exports=Nanologger,Nanologger.prototype.debug=function(){for(var o=["debug"],r=0,t=arguments.length;r<t;r++)o.push(arguments[r]);this._print.apply(this,o)},Nanologger.prototype.info=function(){for(var o=["info"],r=0,t=arguments.length;r<t;r++)o.push(arguments[r]);this._print.apply(this,o)},Nanologger.prototype.warn=function(){for(var o=["warn"],r=0,t=arguments.length;r<t;r++)o.push(arguments[r]);this._print.apply(this,o)},Nanologger.prototype.error=function(){for(var o=["error"],r=0,t=arguments.length;r<t;r++)o.push(arguments[r]);this._print.apply(this,o)},Nanologger.prototype.fatal=function(){for(var o=["fatal"],r=0,t=arguments.length;r<t;r++)o.push(arguments[r]);this._print.apply(this,o)},Nanologger.prototype._print=function(o){if(!(levels[o]<this._logLevel)){var r=getTimeStamp(),t=emojis[o],e=this._name||"unknown",n="error"===o||o.fatal?colors.red:"warn"===o?colors.yellow:colors.green,l=[],a=[null],c="%c%s "+t+" %c%s";a.push(color(colors.brightBlack),r),a.push(color(colors.magenta),e);for(var s=1,g=arguments.length;s<g;s++){var i=arguments[s];"string"==typeof i?1===s?(c+=" %c%s",a.push(color(n)),a.push(i)):/ms$/.test(i)?(c+=" %c%s",a.push(color(colors.brightBlack)),a.push(i)):(c+=" %c%s",a.push(color(colors.white)),a.push(i)):"number"==typeof i?(c+=" %c%d",a.push(color(colors.magenta)),a.push(i)):l.push(i)}a[0]=c,l.forEach(function(o){a.push(o)}),console.log.apply(console,a)}};

},{}],16:[function(require,module,exports){
function nanomorph(e,o){return persistStatefulRoot(o,e),walk(o,e)}function walk(e,o){return o?e?e.isSameNode&&e.isSameNode(o)?o:e.tagName!==o.tagName?e:(morph(e,o),updateChildren(e,o),o):null:e}function updateChildren(e,o){if(e.childNodes&&o.childNodes)for(var t=e.childNodes.length,a=o.childNodes.length,r=Math.max(a,t),d=0,l=0,i=0;i<r;i++,d++,l++){var n=e.childNodes[d],h=o.childNodes[l],s=walk(n,h);s?h?s!==h&&(o.replaceChild(s,h),d--):s&&(o.appendChild(s),d--):h&&(o.removeChild(h),l--)}}function persistStatefulRoot(e,o){if(e&&o&&o.nodeType===ELEMENT_NODE&&e.nodeType===ELEMENT_NODE)for(var t,a,r=o.attributes,d=0,l=r.length;d<l;d++)if(t=r[d],a=t.name,rootLabelRegex.test(a)){e.setAttribute(a,t.value);break}}var morph=require(18),rootLabelRegex=/^data-onloadid/,ELEMENT_NODE=1;module.exports=nanomorph;

},{"18":18}],17:[function(require,module,exports){
module.exports=["onclick","ondblclick","onmousedown","onmouseup","onmouseover","onmousemove","onmouseout","onmouseenter","onmouseleave","ondragstart","ondrag","ondragenter","ondragleave","ondragover","ondrop","ondragend","onkeydown","onkeypress","onkeyup","onunload","onabort","onerror","onresize","onscroll","onselect","onchange","onsubmit","onreset","onfocus","onblur","oninput","oncontextmenu","onfocusin","onfocusout"];

},{}],18:[function(require,module,exports){
function morph(e,t){var u=e.nodeType,a=e.nodeName;u===ELEMENT_NODE&&copyAttrs(e,t),u!==TEXT_NODE&&u!==COMMENT_NODE||(t.nodeValue=e.nodeValue),"INPUT"===a?updateInput(e,t):"OPTION"===a?updateOption(e,t):"TEXTAREA"===a?updateTextarea(e,t):"SELECT"===a&&updateSelect(e,t),copyEvents(e,t)}function copyAttrs(e,t){for(var u=t.attributes,a=e.attributes,n=null,r=null,l=null,i=null,o=a.length-1;o>=0;--o)l=(i=a[o]).name,n=i.namespaceURI,r=i.value,n?(l=i.localName||l,t.getAttributeNS(n,l)!==r&&t.setAttributeNS(n,l,r)):t.getAttribute(l)!==r&&("null"===r||"undefined"===r?t.removeAttribute(l):t.setAttribute(l,r));for(var d=u.length-1;d>=0;--d)!1!==(i=u[d]).specified&&(l=i.name,(n=i.namespaceURI)?(l=i.localName||l,e.hasAttributeNS(n,l)||t.removeAttributeNS(n,l)):e.hasAttributeNS(null,l)||t.removeAttribute(l))}function copyEvents(e,t){for(var u=0;u<eventsLength;u++){var a=events[u];e[a]?t[a]=e[a]:t[a]&&(t[a]=void 0)}}function updateOption(e,t){updateAttribute(e,t,"selected")}function updateInput(e,t){var u=e.value,a=t.value;updateAttribute(e,t,"checked"),updateAttribute(e,t,"disabled"),e.hasAttributeNS(null,"value")&&"null"!==u?u!==a?(t.setAttribute("value",u),t.value=u):"range"===t.type&&(t.value=u):(t.value="",t.removeAttribute("value"))}function updateTextarea(e,t){var u=e.value;if(u!==t.value&&(t.value=u),t.firstChild){if(""===u&&t.firstChild.nodeValue===t.placeholder)return;t.firstChild.nodeValue=u}}function updateSelect(e,t){if(!t.hasAttributeNS(null,"multiple")){for(var u=0,a=t.firstChild;a;){var n=a.nodeName;if(n&&"OPTION"===n.toUpperCase()){if(a.hasAttributeNS(null,"selected"))break;u++}a=a.nextSibling}e.selectedIndex=u}}function updateAttribute(e,t,u){e[u]!==t[u]&&(t[u]=e[u],e[u]?t.setAttribute(u,""):t.removeAttribute(u,""))}var events=require(17),eventsLength=events.length,ELEMENT_NODE=1,TEXT_NODE=3,COMMENT_NODE=8;module.exports=morph;

},{"17":17}],19:[function(require,module,exports){
function nanomount(n,o){if("BODY"===n.nodeName)for(var e=n.childNodes,a=0;a<e.length;a++)"SCRIPT"===e[a].nodeName&&o.appendChild(e[a].cloneNode(!0));nanomorph(n,o)}var nanomorph=require(16);module.exports=nanomount;

},{"16":16}],20:[function(require,module,exports){
function Nanorouter(e){function r(e){return n?(e=pathname(e,isLocalFile),e===a?t():(a=e,(t=o(e))())):o(e)}var o=wayfarer((e=e||{}).default||"/404"),n=e.curry||!1,t=null,a=null;return r.router=o,r.on=function(e,r){e=e.replace(/^[#\/]/,""),o.on(e,r)},r}function pathname(e,r){return(e=r?e.replace(stripElectron,""):e.replace(prefix,"")).replace(suffix,"").replace(normalize,"/")}var wayfarer=require(22),isLocalFile=/file:\/\//.test("object"==typeof window&&window.location&&window.location.origin),electron="^(file://|/)(.*.html?/?)?",protocol="^(http(s)?(://))?(www.)?",domain="[a-zA-Z0-9-_.]+(:[0-9]{1,5})?(/{1})?",qs="[?].*$",stripElectron=new RegExp(electron),prefix=new RegExp(protocol+domain),normalize=new RegExp("#"),suffix=new RegExp(qs);module.exports=Nanorouter;

},{"22":22}],21:[function(require,module,exports){
function Nanotiming(n){if(!(this instanceof Nanotiming))return new Nanotiming(n);this._name=n,this._enabled="undefined"!=typeof window&&window.performance&&window.performance.mark}module.exports=Nanotiming,Nanotiming.prototype.start=function(n){if(this._enabled){var e=n?this._name+":"+n:this._name;window.performance.mark(e+"-start")}},Nanotiming.prototype.end=function(n){if(this._enabled){var e=n?this._name+":"+n:this._name;window.performance.mark(e+"-end"),window.performance.measure(e,e+"-start",e+"-end")}};

},{}],22:[function(require,module,exports){
function Wayfarer(r){function e(r){for(var e=new Array(arguments.length),n=1;n<e.length;n++)e[n]=arguments[n];var i=t.match(r);if(i&&i.cb){e[0]=i.params;var c=i.cb;return c.apply(c,e)}var f=t.match(a);if(f&&f.cb){e[0]=f.params;var o=f.cb;return o.apply(o,e)}throw new Error("route '"+r+"' did not match")}if(!(this instanceof Wayfarer))return new Wayfarer(r);var a=(r||"").replace(/^\//,""),t=trie();return e._trie=t,e.emit=e,e.on=function(r,a){return r=r||"/",a.route=r,a&&a._wayfarer&&a._trie?t.mount(r,a._trie.trie):t.create(r).cb=a,e},e._wayfarer=!0,e}var trie=require(23);module.exports=Wayfarer;

},{"23":23}],23:[function(require,module,exports){
function Trie(){if(!(this instanceof Trie))return new Trie;this.trie={nodes:{}}}var mutate=require(25),xtend=require(24);module.exports=Trie,Trie.prototype.create=function(e){function n(e,t){var o=r.hasOwnProperty(e)&&r[e];if(!1===o)return t;var i=null;return/^:|^\*/.test(o)?(t.nodes.hasOwnProperty("$$")?i=t.nodes.$$:(i={nodes:{}},t.nodes.$$=i),"*"===o[0]&&(t.wildcard=!0),t.name=o.replace(/^:|^\*/,"")):t.nodes.hasOwnProperty(o)?i=t.nodes[o]:(i={nodes:{}},t.nodes[o]=i),n(e+1,i)}var r=e.replace(/^\//,"").split("/");return n(0,this.trie)},Trie.prototype.match=function(e){function n(e,o){if(void 0!==o){var i=r[e];if(void 0===i)return o;if(o.nodes.hasOwnProperty(i))return n(e+1,o.nodes[i]);if(o.wildcard){try{t.wildcard=decodeURIComponent(r.slice(e).join("/"))}catch(r){return n(e,void 0)}return o.nodes.$$}if(o.name){try{t[o.name]=decodeURIComponent(i)}catch(r){return n(e,void 0)}return n(e+1,o.nodes.$$)}return n(e+1)}}var r=e.replace(/^\//,"").split("/"),t={},o=n(0,this.trie);if(o)return o=xtend(o),o.params=t,o},Trie.prototype.mount=function(e,n){var r=e.replace(/^\//,"").split("/"),t=null,o=null;if(1===r.length)o=r[0],t=this.create(o);else{var i=r.splice(0,r.length-1).join("/");o=r[0],t=this.create(i)}mutate(t.nodes,n.nodes),n.name&&(t.name=n.name),t.nodes[""]&&(Object.keys(t.nodes[""]).forEach(function(e){"nodes"!==e&&(t[e]=t.nodes[""][e])}),mutate(t.nodes,t.nodes[""].nodes),delete t.nodes[""].nodes)};

},{"24":24,"25":25}],24:[function(require,module,exports){
function extend(){for(var r={},e=0;e<arguments.length;e++){var t=arguments[e];for(var n in t)hasOwnProperty.call(t,n)&&(r[n]=t[n])}return r}module.exports=extend;var hasOwnProperty=Object.prototype.hasOwnProperty;

},{}],25:[function(require,module,exports){
function extend(r){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var n in t)hasOwnProperty.call(t,n)&&(r[n]=t[n])}return r}module.exports=extend;var hasOwnProperty=Object.prototype.hasOwnProperty;

},{}],26:[function(require,module,exports){

},{}],27:[function(require,module,exports){
function defaultSetTimout(){throw new Error("setTimeout has not been defined")}function defaultClearTimeout(){throw new Error("clearTimeout has not been defined")}function runTimeout(e){if(cachedSetTimeout===setTimeout)return setTimeout(e,0);if((cachedSetTimeout===defaultSetTimout||!cachedSetTimeout)&&setTimeout)return cachedSetTimeout=setTimeout,setTimeout(e,0);try{return cachedSetTimeout(e,0)}catch(t){try{return cachedSetTimeout.call(null,e,0)}catch(t){return cachedSetTimeout.call(this,e,0)}}}function runClearTimeout(e){if(cachedClearTimeout===clearTimeout)return clearTimeout(e);if((cachedClearTimeout===defaultClearTimeout||!cachedClearTimeout)&&clearTimeout)return cachedClearTimeout=clearTimeout,clearTimeout(e);try{return cachedClearTimeout(e)}catch(t){try{return cachedClearTimeout.call(null,e)}catch(t){return cachedClearTimeout.call(this,e)}}}function cleanUpNextTick(){draining&&currentQueue&&(draining=!1,currentQueue.length?queue=currentQueue.concat(queue):queueIndex=-1,queue.length&&drainQueue())}function drainQueue(){if(!draining){var e=runTimeout(cleanUpNextTick);draining=!0;for(var t=queue.length;t;){for(currentQueue=queue,queue=[];++queueIndex<t;)currentQueue&&currentQueue[queueIndex].run();queueIndex=-1,t=queue.length}currentQueue=null,draining=!1,runClearTimeout(e)}}function Item(e,t){this.fun=e,this.array=t}function noop(){}var process=module.exports={},cachedSetTimeout,cachedClearTimeout;!function(){try{cachedSetTimeout="function"==typeof setTimeout?setTimeout:defaultSetTimout}catch(e){cachedSetTimeout=defaultSetTimout}try{cachedClearTimeout="function"==typeof clearTimeout?clearTimeout:defaultClearTimeout}catch(e){cachedClearTimeout=defaultClearTimeout}}();var queue=[],draining=!1,currentQueue,queueIndex=-1;process.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)t[r-1]=arguments[r];queue.push(new Item(e,t)),1!==queue.length||draining||runTimeout(drainQueue)},Item.prototype.run=function(){this.fun.apply(null,this.array)},process.title="browser",process.browser=!0,process.env={},process.argv=[],process.version="",process.versions={},process.on=noop,process.addListener=noop,process.once=noop,process.off=noop,process.removeListener=noop,process.removeAllListeners=noop,process.emit=noop,process.prependListener=noop,process.prependOnceListener=noop,process.listeners=function(e){return[]},process.binding=function(e){throw new Error("process.binding is not supported")},process.cwd=function(){return"/"},process.chdir=function(e){throw new Error("process.chdir is not supported")},process.umask=function(){return 0};

},{}]},{},[3]);
