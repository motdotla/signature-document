/*! signature-document.js - 0.0.1 - 2014-04-20 - scottmotte */
var MicroEvent  = function(){};
MicroEvent.prototype  = {
  bind  : function(event, fct){
    this._events = this._events || {};
    this._events[event] = this._events[event] || [];
    this._events[event].push(fct);
  },
  unbind  : function(event, fct){
    this._events = this._events || {};
    if( event in this._events === false  )  return;
    this._events[event].splice(this._events[event].indexOf(fct), 1);
  },
  trigger : function(event /* , args... */){
    this._events = this._events || {};
    if( event in this._events === false  )  return;
    for(var i = 0; i < this._events[event].length; i++){
      this._events[event][i].apply(this, Array.prototype.slice.call(arguments, 1));
    }
  }
};

/**
 * mixin will delegate all MicroEvent.js function in the destination object
 *
 * - require('MicroEvent').mixin(Foobar) will make Foobar able to use MicroEvent
 *
 * @param {Object} the object which will support MicroEvent
*/
MicroEvent.mixin  = function(destObject){
  var props = ['bind', 'unbind', 'trigger'];
  for(var i = 0; i < props.length; i ++){
    if( typeof destObject === 'function' ){
      destObject.prototype[props[i]]  = MicroEvent.prototype[props[i]];
    }else{
      destObject[props[i]] = MicroEvent.prototype[props[i]];
    }
  }
}

// export in common js
if( typeof module !== "undefined" && ('exports' in module)){
  module.exports  = MicroEvent;
}


/*! Fabric.js Copyright 2008-2013, Printio (Juriy Zaytsev, Maxim Chernyak) */var fabric=fabric||{version:"1.1.0"};typeof exports!="undefined"&&(exports.fabric=fabric),typeof document!="undefined"&&typeof window!="undefined"?(fabric.document=document,fabric.window=window):(fabric.document=require("jsdom").jsdom("<!DOCTYPE html><html><head></head><body></body></html>"),fabric.window=fabric.document.createWindow()),fabric.isTouchSupported="ontouchstart"in fabric.document.documentElement,fabric.isLikelyNode=typeof Buffer!="undefined"&&typeof window=="undefined";var Cufon=function(){function r(e){var t=this.face=e.face;this.glyphs=e.glyphs,this.w=e.w,this.baseSize=parseInt(t["units-per-em"],10),this.family=t["font-family"].toLowerCase(),this.weight=t["font-weight"],this.style=t["font-style"]||"normal",this.viewBox=function(){var e=t.bbox.split(/\s+/),n={minX:parseInt(e[0],10),minY:parseInt(e[1],10),maxX:parseInt(e[2],10),maxY:parseInt(e[3],10)};return n.width=n.maxX-n.minX,n.height=n.maxY-n.minY,n.toString=function(){return[this.minX,this.minY,this.width,this.height].join(" ")},n}(),this.ascent=-parseInt(t.ascent,10),this.descent=-parseInt(t.descent,10),this.height=-this.ascent+this.descent}function i(){var e={},t={oblique:"italic",italic:"oblique"};this.add=function(t){(e[t.style]||(e[t.style]={}))[t.weight]=t},this.get=function(n,r){var i=e[n]||e[t[n]]||e.normal||e.italic||e.oblique;if(!i)return null;r={normal:400,bold:700}[r]||parseInt(r,10);if(i[r])return i[r];var s={1:1,99:0}[r%100],o=[],u,a;s===undefined&&(s=r>400),r==500&&(r=400);for(var f in i){f=parseInt(f,10);if(!u||f<u)u=f;if(!a||f>a)a=f;o.push(f)}return r<u&&(r=u),r>a&&(r=a),o.sort(function(e,t){return(s?e>r&&t>r?e<t:e>t:e<r&&t<r?e>t:e<t)?-1:1}),i[o[0]]}}function s(){function t(e,t){return e.contains?e.contains(t):e.compareDocumentPosition(t)&16}function n(e){var n=e.relatedTarget;if(!n||t(this,n))return;i(this)}function r(e){i(this)}function i(t){setTimeout(function(){e.replace(t,g.get(t).options,!0)},10)}this.attach=function(e){e.onmouseenter===undefined?(a(e,"mouseover",n),a(e,"mouseout",n)):(a(e,"mouseenter",r),a(e,"mouseleave",r))}}function o(){function n(e){return e.cufid||(e.cufid=++t)}var e={},t=0;this.get=function(t){var r=n(t);return e[r]||(e[r]={})}}function u(e){var t={},r={};this.get=function(n){return t[n]!=undefined?t[n]:e[n]},this.getSize=function(e,t){return r[e]||(r[e]=new n.Size(this.get(e),t))},this.extend=function(e){for(var n in e)t[n]=e[n];return this}}function a(e,t,n){e.addEventListener?e.addEventListener(t,n,!1):e.attachEvent&&e.attachEvent("on"+t,function(){return n.call(e,fabric.window.event)})}function f(e,t){var n=g.get(e);return n.options?e:(t.hover&&t.hoverables[e.nodeName.toLowerCase()]&&y.attach(e),n.options=t,e)}function l(e){var t={};return function(n){return t.hasOwnProperty(n)||(t[n]=e.apply(null,arguments)),t[n]}}function c(e,t){t||(t=n.getStyle(e));var r=n.quotedList(t.get("fontFamily").toLowerCase()),i;for(var s=0,o=r.length;s<o;++s){i=r[s];if(E[i])return E[i].get(t.get("fontStyle"),t.get("fontWeight"))}return null}function h(e){return fabric.document.getElementsByTagName(e)}function p(){var e={},t;for(var n=0,r=arguments.length;n<r;++n)for(t in arguments[n])e[t]=arguments[n][t];return e}function d(e,t,r,i,s,o){var u=i.separate;if(u=="none")return w[i.engine].apply(null,arguments);var a=fabric.document.createDocumentFragment(),f,l=t.split(x[u]),c=u=="words";c&&m&&(/^\s/.test(t)&&l.unshift(""),/\s$/.test(t)&&l.push(""));for(var h=0,p=l.length;h<p;++h)f=w[i.engine](e,c?n.textAlign(l[h],r,h,p):l[h],r,i,s,o,h<p-1),f&&a.appendChild(f);return a}function v(e,t){var r,i,s,o;for(var u=f(e,t).firstChild;u;u=s){s=u.nextSibling,o=!1;if(u.nodeType==1){if(!u.firstChild)continue;if(!/cufon/.test(u.className)){arguments.callee(u,t);continue}o=!0}i||(i=n.getStyle(e).extend(t)),r||(r=c(e,i));if(!r)continue;if(o){w[t.engine](r,null,i,t,u,e);continue}var a=u.data;typeof G_vmlCanvasManager!="undefined"&&(a=a.replace(/\r/g,"\n"));if(a==="")continue;var l=d(r,a,i,t,u,e);l?u.parentNode.replaceChild(l,u):u.parentNode.removeChild(u)}}var e=function(){return e.replace.apply(null,arguments)},t=e.DOM={ready:function(){var e=!1,t={loaded:1,complete:1},n=[],r=function(){if(e)return;e=!0;for(var t;t=n.shift();t());};return fabric.document.addEventListener&&(fabric.document.addEventListener("DOMContentLoaded",r,!1),fabric.window.addEventListener("pageshow",r,!1)),!fabric.window.opera&&fabric.document.readyState&&function(){t[fabric.document.readyState]?r():setTimeout(arguments.callee,10)}(),fabric.document.readyState&&fabric.document.createStyleSheet&&function(){try{fabric.document.body.doScroll("left"),r()}catch(e){setTimeout(arguments.callee,1)}}(),a(fabric.window,"load",r),function(t){arguments.length?e?t():n.push(t):r()}}()},n=e.CSS={Size:function(e,t){this.value=parseFloat(e),this.unit=String(e).match(/[a-z%]*$/)[0]||"px",this.convert=function(e){return e/t*this.value},this.convertFrom=function(e){return e/this.value*t},this.toString=function(){return this.value+this.unit}},getStyle:function(e){return new u(e.style)},quotedList:l(function(e){var t=[],n=/\s*((["'])([\s\S]*?[^\\])\2|[^,]+)\s*/g,r;while(r=n.exec(e))t.push(r[3]||r[1]);return t}),ready:function(){var e=!1,n=[],r=function(){e=!0;for(var t;t=n.shift();t());},i=Object.prototype.propertyIsEnumerable?h("style"):{length:0},s=h("link");return t.ready(function(){var e=0,t;for(var n=0,o=s.length;t=s[n],n<o;++n)!t.disabled&&t.rel.toLowerCase()=="stylesheet"&&++e;fabric.document.styleSheets.length>=i.length+e?r():setTimeout(arguments.callee,10)}),function(t){e?t():n.push(t)}}(),supports:function(e,t){var n=fabric.document.createElement("span").style;return n[e]===undefined?!1:(n[e]=t,n[e]===t)},textAlign:function(e,t,n,r){return t.get("textAlign")=="right"?n>0&&(e=" "+e):n<r-1&&(e+=" "),e},textDecoration:function(e,t){t||(t=this.getStyle(e));var n={underline:null,overline:null,"line-through":null};for(var r=e;r.parentNode&&r.parentNode.nodeType==1;){var i=!0;for(var s in n){if(n[s])continue;t.get("textDecoration").indexOf(s)!=-1&&(n[s]=t.get("color")),i=!1}if(i)break;t=this.getStyle(r=r.parentNode)}return n},textShadow:l(function(e){if(e=="none")return null;var t=[],n={},r,i=0,s=/(#[a-f0-9]+|[a-z]+\(.*?\)|[a-z]+)|(-?[\d.]+[a-z%]*)|,/ig;while(r=s.exec(e))r[0]==","?(t.push(n),n={},i=0):r[1]?n.color=r[1]:n[["offX","offY","blur"][i++]]=r[2];return t.push(n),t}),color:l(function(e){var t={};return t.color=e.replace(/^rgba\((.*?),\s*([\d.]+)\)/,function(e,n,r){return t.opacity=parseFloat(r),"rgb("+n+")"}),t}),textTransform:function(e,t){return e[{uppercase:"toUpperCase",lowercase:"toLowerCase"}[t.get("textTransform")]||"toString"]()}},m=" ".split(/\s+/).length==0,g=new o,y=new s,b=[],w={},E={},S={engine:null,hover:!1,hoverables:{a:!0},printable:!0,selector:fabric.window.Sizzle||fabric.window.jQuery&&function(e){return jQuery(e)}||fabric.window.dojo&&dojo.query||fabric.window.$$&&function(e){return $$(e)}||fabric.window.$&&function(e){return $(e)}||fabric.document.querySelectorAll&&function(e){return fabric.document.querySelectorAll(e)}||h,separate:"words",textShadow:"none"},x={words:/\s+/,characters:""};return e.now=function(){return t.ready(),e},e.refresh=function(){var t=b.splice(0,b.length);for(var n=0,r=t.length;n<r;++n)e.replace.apply(null,t[n]);return e},e.registerEngine=function(t,n){return n?(w[t]=n,e.set("engine",t)):e},e.registerFont=function(t){var n=new r(t),s=n.family;return E[s]||(E[s]=new i),E[s].add(n),e.set("fontFamily",'"'+s+'"')},e.replace=function(t,r,i){r=p(S,r);if(!r.engine)return e;typeof r.textShadow=="string"&&r.textShadow&&(r.textShadow=n.textShadow(r.textShadow)),i||b.push(arguments);if(t.nodeType||typeof t=="string")t=[t];return n.ready(function(){for(var n=0,i=t.length;n<i;++n){var s=t[n];typeof s=="string"?e.replace(r.selector(s),r,!0):v(s,r)}}),e},e.replaceElement=function(e,t){return t=p(S,t),typeof t.textShadow=="string"&&t.textShadow&&(t.textShadow=n.textShadow(t.textShadow)),v(e,t)},e.engines=w,e.fonts=E,e.getOptions=function(){return p(S)},e.set=function(t,n){return S[t]=n,e},e}();Cufon.registerEngine("canvas",function(){function s(e,t){var n=0,r=0,i=[],s=/([mrvxe])([^a-z]*)/g,o;e:for(var u=0;o=s.exec(e);++u){var a=o[2].split(",");switch(o[1]){case"v":i[u]={m:"bezierCurveTo",a:[n+~~a[0],r+~~a[1],n+~~a[2],r+~~a[3],n+=~~a[4],r+=~~a[5]]};break;case"r":i[u]={m:"lineTo",a:[n+=~~a[0],r+=~~a[1]]};break;case"m":i[u]={m:"moveTo",a:[n=~~a[0],r=~~a[1]]};break;case"x":i[u]={m:"closePath",a:[]};break;case"e":break e}t[i[u].m].apply(t,i[u].a)}return i}function o(e,t){for(var n=0,r=e.length;n<r;++n){var i=e[n];t[i.m].apply(t,i.a)}}var e=Cufon.CSS.supports("display","inline-block"),t=!e&&(fabric.document.compatMode=="BackCompat"||/frameset|transitional/i.test(fabric.document.doctype.publicId)),n=fabric.document.createElement("style");n.type="text/css";var r=fabric.document.createTextNode(".cufon-canvas{text-indent:0}@media screen,projection{.cufon-canvas{display:inline;display:inline-block;position:relative;vertical-align:middle"+(t?"":";font-size:1px;line-height:1px")+"}.cufon-canvas .cufon-alt{display:-moz-inline-box;display:inline-block;width:0;height:0;overflow:hidden}"+(e?".cufon-canvas canvas{position:relative}":".cufon-canvas canvas{position:absolute}")+"}"+"@media print{"+".cufon-canvas{padding:0 !important}"+".cufon-canvas canvas{display:none}"+".cufon-canvas .cufon-alt{display:inline}"+"}");try{n.appendChild(r)}catch(i){n.setAttribute("type","text/css"),n.styleSheet.cssText=r.data}return fabric.document.getElementsByTagName("head")[0].appendChild(n),function(t,n,r,i,u,a){function $(e,t){W.strokeStyle=t,W.beginPath(),W.moveTo(0,e),W.lineTo(N,e),W.stroke()}function Q(){W.save();var e=0,n=0,r=[{left:0}];i.backgroundColor&&(W.save(),W.fillStyle=i.backgroundColor,W.translate(0,t.ascent),W.fillRect(0,0,N+10,(-t.ascent+t.descent)*L),W.restore()),i.textAlign==="right"?(W.translate(M[n],0),r[0].left=M[n]*X):i.textAlign==="center"&&(W.translate(M[n]/2,0),r[0].left=M[n]/2*X);for(var s=0,o=T.length;s<o;++s){if(T[s]==="\n"){n++;var u=-t.ascent-t.ascent/5*i.lineHeight,a=r[r.length-1],f={left:0};a.width=e*X,a.height=(-t.ascent+t.descent)*X,i.textAlign==="right"?(W.translate(-N,u),W.translate(M[n],0),f.left=M[n]*X):i.textAlign==="center"?(W.translate(-e-M[n-1]/2,u),W.translate(M[n]/2,0),f.left=M[n]/2*X):W.translate(-e,u),r.push(f),e=0;continue}var l=t.glyphs[T[s]]||t.missingGlyph;if(!l)continue;var c=Number(l.w||t.w)+h;i.textBackgroundColor&&(W.save(),W.fillStyle=i.textBackgroundColor,W.translate(0,t.ascent),W.fillRect(0,0,c+10,-t.ascent+t.descent),W.restore()),W.translate(c,0),e+=c,s==o-1&&(r[r.length-1].width=e*X,r[r.length-1].height=(-t.ascent+t.descent)*X)}W.restore(),Cufon.textOptions.boundaries=r}function G(e){W.fillStyle=e||Cufon.textOptions.color||r.get("color");var n=0,u=0;i.textAlign==="right"?W.translate(M[u],0):i.textAlign==="center"&&W.translate(M[u]/2,0);for(var a=0,f=T.length;a<f;++a){if(T[a]==="\n"){u++;var l=-t.ascent-t.ascent/5*i.lineHeight;i.textAlign==="right"?(W.translate(-N,l),W.translate(M[u],0)):i.textAlign==="center"?(W.translate(-n-M[u-1]/2,l),W.translate(M[u]/2,0)):W.translate(-n,l),n=0;continue}var c=t.glyphs[T[a]]||t.missingGlyph;if(!c)continue;var p=Number(c.w||t.w)+h;J&&(W.save(),W.strokeStyle=W.fillStyle,W.lineWidth+=W.lineWidth,W.beginPath(),J.underline&&(W.moveTo(0,-t.face["underline-position"]+.5),W.lineTo(p,-t.face["underline-position"]+.5)),J.overline&&(W.moveTo(0,t.ascent+.5),W.lineTo(p,t.ascent+.5)),J["line-through"]&&(W.moveTo(0,-t.descent+.5),W.lineTo(p,-t.descent+.5)),W.stroke(),W.restore()),K&&(W.save(),W.transform(1,0,-0.25,1,0,0)),W.beginPath(),c.d&&(c.code?o(c.code,W):c.code=s("m"+c.d,W)),W.fill(),i.strokeStyle&&(W.closePath(),W.save(),W.lineWidth=i.strokeWidth,W.strokeStyle=i.strokeStyle,W.stroke(),W.restore()),K&&W.restore(),W.translate(p,0),n+=p}}var f=n===null,l=t.viewBox,c=r.getSize("fontSize",t.baseSize),h=r.get("letterSpacing");h=h=="normal"?0:c.convertFrom(parseInt(h,10));var p=0,d=0,v=0,m=0,g=i.textShadow,y=[];Cufon.textOptions.shadowOffsets=[],Cufon.textOptions.shadows=null;if(g){Cufon.textOptions.shadows=g;for(var b=0,w=g.length;b<w;++b){var E=g[b],S=c.convertFrom(parseFloat(E.offX)),x=c.convertFrom(parseFloat(E.offY));y[b]=[S,x]}}var T=Cufon.CSS.textTransform(f?u.alt:n,r).split(""),N=0,C=null,k=0,L=1,A=[];for(var b=0,w=T.length;b<w;++b){if(T[b]==="\n"){L++,N>k&&(k=N),A.push(N),N=0;continue}var O=t.glyphs[T[b]]||t.missingGlyph;if(!O)continue;N+=C=Number(O.w||t.w)+h}A.push(N),N=Math.max(k,N);var M=[];for(var b=A.length;b--;)M[b]=N-A[b];if(C===null)return null;d+=l.width-C,m+=l.minX;var _,D;if(f)_=u,D=u.firstChild;else{_=fabric.document.createElement("span"),_.className="cufon cufon-canvas",_.alt=n,D=fabric.document.createElement("canvas"),_.appendChild(D);if(i.printable){var P=fabric.document.createElement("span");P.className="cufon-alt",P.appendChild(fabric.document.createTextNode(n)),_.appendChild(P)}}var H=_.style,B=D.style||{},j=c.convert(l.height-p+v),F=Math.ceil(j),I=F/j;D.width=Math.ceil(c.convert(N+d-m)*I),D.height=F,p+=l.minY,B.top=Math.round(c.convert(p-t.ascent))+"px",B.left=Math.round(c.convert(m))+"px";var q=Math.ceil(c.convert(N*I)),R=q+"px",U=c.convert(t.height),z=(i.lineHeight-1)*c.convert(-t.ascent/5)*(L-1);Cufon.textOptions.width=q,Cufon.textOptions.height=U*L+z,Cufon.textOptions.lines=L,Cufon.textOptions.totalLineHeight=z,e?(H.width=R,H.height=U+"px"):(H.paddingLeft=R,H.paddingBottom=U-1+"px");var W=Cufon.textOptions.context||D.getContext("2d"),X=F/l.height;Cufon.textOptions.fontAscent=t.ascent*X,Cufon.textOptions.boundaries=null;for(var V=Cufon.textOptions.shadowOffsets,b=y.length;b--;)V[b]=[y[b][0]*X,y[b][1]*X];W.save(),W.scale(X,X),W.translate(-m-1/X*D.width/2+(Cufon.fonts[t.family].offsetLeft||0),-p-Cufon.textOptions.height/X/2+(Cufon.fonts[t.family].offsetTop||0)),W.lineWidth=t.face["underline-thickness"],W.save();var J=Cufon.getTextDecoration(i),K=i.fontStyle==="italic";W.save(),Q();if(g)for(var b=0,w=g.length;b<w;++b){var E=g[b];W.save(),W.translate.apply(W,y[b]),G(E.color),W.restore()}return G(),W.restore(),W.restore(),W.restore(),_}}()),Cufon.registerEngine("vml",function(){function n(e,t){return r(e,/(?:em|ex|%)$/i.test(t)?"1em":t)}function r(e,t){if(/px$/i.test(t))return parseFloat(t);var n=e.style.left,r=e.runtimeStyle.left;e.runtimeStyle.left=e.currentStyle.left,e.style.left=t;var i=e.style.pixelLeft;return e.style.left=n,e.runtimeStyle.left=r,i}if(!fabric.document.namespaces)return;var e=fabric.document.createElement("canvas");if(e&&e.getContext&&e.getContext.apply)return;fabric.document.namespaces.cvml==null&&fabric.document.namespaces.add("cvml","urn:schemas-microsoft-com:vml");var t=fabric.document.createElement("cvml:shape");t.style.behavior="url(#default#VML)";if(!t.coordsize)return;return t=null,fabric.document.write('<style type="text/css">.cufon-vml-canvas{text-indent:0}@media screen{cvml\\:shape,cvml\\:shadow{behavior:url(#default#VML);display:block;antialias:true;position:absolute}.cufon-vml-canvas{position:absolute;text-align:left}.cufon-vml{display:inline-block;position:relative;vertical-align:middle}.cufon-vml .cufon-alt{position:absolute;left:-10000in;font-size:1px}a .cufon-vml{cursor:pointer}}@media print{.cufon-vml *{display:none}.cufon-vml .cufon-alt{display:inline}}</style>'),function(e,t,i,s,o,u,a){var f=t===null;f&&(t=o.alt);var l=e.viewBox,c=i.computedFontSize||(i.computedFontSize=new Cufon.CSS.Size(n(u,i.get("fontSize"))+"px",e.baseSize)),h=i.computedLSpacing;h==undefined&&(h=i.get("letterSpacing"),i.computedLSpacing=h=h=="normal"?0:~~c.convertFrom(r(u,h)));var p,d;if(f)p=o,d=o.firstChild;else{p=fabric.document.createElement("span"),p.className="cufon cufon-vml",p.alt=t,d=fabric.document.createElement("span"),d.className="cufon-vml-canvas",p.appendChild(d);if(s.printable){var v=fabric.document.createElement("span");v.className="cufon-alt",v.appendChild(fabric.document.createTextNode(t)),p.appendChild(v)}a||p.appendChild(fabric.document.createElement("cvml:shape"))}var m=p.style,g=d.style,y=c.convert(l.height),b=Math.ceil(y),w=b/y,E=l.minX,S=l.minY;g.height=b,g.top=Math.round(c.convert(S-e.ascent)),g.left=Math.round(c.convert(E)),m.height=c.convert(e.height)+"px";var x=Cufon.getTextDecoration(s),T=i.get("color"),N=Cufon.CSS.textTransform(t,i).split(""),C=0,k=0,L=null,A,O,M=s.textShadow;for(var _=0,D=0,P=N.length;_<P;++_)A=e.glyphs[N[_]]||e.missingGlyph,A&&(C+=L=~~(A.w||e.w)+h);if(L===null)return null;var H=-E+C+(l.width-L),B=c.convert(H*w),j=Math.round(B),F=H+","+l.height,I,q="r"+F+"nsnf";for(_=0;_<P;++_){A=e.glyphs[N[_]]||e.missingGlyph;if(!A)continue;f?(O=d.childNodes[D],O.firstChild&&O.removeChild(O.firstChild)):(O=fabric.document.createElement("cvml:shape"),d.appendChild(O)),O.stroked="f",O.coordsize=F,O.coordorigin=I=E-k+","+S,O.path=(A.d?"m"+A.d+"xe":"")+"m"+I+q,O.fillcolor=T;var R=O.style;R.width=j,R.height=b;if(M){var U=M[0],z=M[1],W=Cufon.CSS.color(U.color),X,V=fabric.document.createElement("cvml:shadow");V.on="t",V.color=W.color,V.offset=U.offX+","+U.offY,z&&(X=Cufon.CSS.color(z.color),V.type="double",V.color2=X.color,V.offset2=z.offX+","+z.offY),V.opacity=W.opacity||X&&X.opacity||1,O.appendChild(V)}k+=~~(A.w||e.w)+h,++D}return m.width=Math.max(Math.ceil(c.convert(C*w)),0),p}}()),Cufon.getTextDecoration=function(e){return{underline:e.textDecoration==="underline",overline:e.textDecoration==="overline","line-through":e.textDecoration==="line-through"}},typeof exports!="undefined"&&(exports.Cufon=Cufon);var JSON;JSON||(JSON={}),function(){"use strict";function f(e){return e<10?"0"+e:e}function quote(e){return escapable.lastIndex=0,escapable.test(e)?'"'+e.replace(escapable,function(e){var t=meta[e];return typeof t=="string"?t:"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+e+'"'}function str(e,t){var n,r,i,s,o=gap,u,a=t[e];a&&typeof a=="object"&&typeof a.toJSON=="function"&&(a=a.toJSON(e)),typeof rep=="function"&&(a=rep.call(t,e,a));switch(typeof a){case"string":return quote(a);case"number":return isFinite(a)?String(a):"null";case"boolean":case"null":return String(a);case"object":if(!a)return"null";gap+=indent,u=[];if(Object.prototype.toString.apply(a)==="[object Array]"){s=a.length;for(n=0;n<s;n+=1)u[n]=str(n,a)||"null";return i=u.length===0?"[]":gap?"[\n"+gap+u.join(",\n"+gap)+"\n"+o+"]":"["+u.join(",")+"]",gap=o,i}if(rep&&typeof rep=="object"){s=rep.length;for(n=0;n<s;n+=1)typeof rep[n]=="string"&&(r=rep[n],i=str(r,a),i&&u.push(quote(r)+(gap?": ":":")+i))}else for(r in a)Object.prototype.hasOwnProperty.call(a,r)&&(i=str(r,a),i&&u.push(quote(r)+(gap?": ":":")+i));return i=u.length===0?"{}":gap?"{\n"+gap+u.join(",\n"+gap)+"\n"+o+"}":"{"+u.join(",")+"}",gap=o,i}}typeof Date.prototype.toJSON!="function"&&(Date.prototype.toJSON=function(e){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(e){return this.valueOf()});var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","  ":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;typeof JSON.stringify!="function"&&(JSON.stringify=function(e,t,n){var r;gap="",indent="";if(typeof n=="number")for(r=0;r<n;r+=1)indent+=" ";else typeof n=="string"&&(indent=n);rep=t;if(!t||typeof t=="function"||typeof t=="object"&&typeof t.length=="number")return str("",{"":e});throw new Error("JSON.stringify")}),typeof JSON.parse!="function"&&(JSON.parse=function(text,reviver){function walk(e,t){var n,r,i=e[t];if(i&&typeof i=="object")for(n in i)Object.prototype.hasOwnProperty.call(i,n)&&(r=walk(i,n),r!==undefined?i[n]=r:delete i[n]);return reviver.call(e,t,i)}var j;text=String(text),cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(e){return"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)}));if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return j=eval("("+text+")"),typeof reviver=="function"?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}(),fabric.log=function(){},fabric.warn=function(){},typeof console!="undefined"&&(typeof console.log!="undefined"&&console.log.apply&&(fabric.log=function(){return console.log.apply(console,arguments)}),typeof console.warn!="undefined"&&console.warn.apply&&(fabric.warn=function(){return console.warn.apply(console,arguments)})),fabric.Observable={observe:function(e,t){this.__eventListeners||(this.__eventListeners={});if(arguments.length===1)for(var n in e)this.on(n,e[n]);else this.__eventListeners[e]||(this.__eventListeners[e]=[]),this.__eventListeners[e].push(t)},stopObserving:function(e,t){this.__eventListeners||(this.__eventListeners={}),this.__eventListeners[e]&&(t?fabric.util.removeFromArray(this.__eventListeners[e],t):this.__eventListeners[e].length=0)},fire:function(e,t){this.__eventListeners||(this.__eventListeners={});var n=this.__eventListeners[e];if(!n)return;for(var r=0,i=n.length;r<i;r++)n[r](t||{})}},fabric.Observable.on=fabric.Observable.observe,fabric.Observable.off=fabric.Observable.stopObserving,fabric.Observable.trigger=fabric.Observable.fire,function(){function n(e,t){var n=e.indexOf(t);return n!==-1&&e.splice(n,1),e}function r(e,t){return Math.floor(Math.random()*(t-e+1))+e}function s(e){return e*i}function o(e){return e/i}function u(e,t,n){var r=Math.sin(n),i=Math.cos(n);e.subtractEquals(t);var s=e.x*i-e.y*r,o=e.x*r+e.y*i;return(new fabric.Point(s,o)).addEquals(t)}function a(e,t){return parseFloat(Number(e).toFixed(t))}function f(){return!1}function l(e){e||(e={});var t=+(new Date),n=e.duration||500,r=t+n,i,s=e.onChange||function(){},o=e.abort||function(){return!1},u=e.easing||function(e,t,n,r){return-n*Math.cos(e/r*(Math.PI/2))+n+t},a="startValue"in e?e.startValue:0,f="endValue"in e?e.endValue:100,l=e.byValue||f-a;e.onStart&&e.onStart(),function c(){i=+(new Date);var f=i>r?n:i-t;s(u(f,a,l,n));if(i>r||o()){e.onComplete&&e.onComplete();return}h(c)}()}function p(e,t,n){if(e){var r=new Image;r.onload=function(){t&&t.call(n,r),r=r.onload=null},r.src=e}else t&&t.call(n,e)}function d(e,t){function n(e){return fabric[fabric.util.string.camelize(fabric.util.string.capitalize(e))]}function r(){++s===o&&t&&t(i)}var i=[],s=0,o=e.length;e.forEach(function(e,t){if(!e.type)return;var s=n(e.type);s.async?s.fromObject(e,function(e,n){n||(i[t]=e),r()}):(i[t]=s.fromObject(e),r())})}function v(e,t,n){var r;if(e.length>1){var i=e.some(function(e){return e.type==="text"});i?(r=new fabric.Group([],t),e.reverse().forEach(function(e){e.cx&&(e.left=e.cx),e.cy&&(e.top=e.cy),r.addWithUpdate(e)})):r=new fabric.PathGroup(e,t)}else r=e[0];return typeof n!="undefined"&&r.setSourcePath(n),r}function m(e,t,n){if(n&&Object.prototype.toString.call(n)==="[object Array]")for(var r=0,i=n.length;r<i;r++)t[n[r]]=e[n[r]]}function g(n,r,i,s,o,u){var a=s-r,f=o-i,l=e(a*a+f*f),c=t(f,a),h=u.length,p=0,d=!0;n.save(),n.translate(r,i),n.moveTo(0,0),n.rotate(c),r=0;while(l>r)r+=u[p++%h],r>l&&(r=l),n[d?"lineTo":"moveTo"](r,0),d=!d;n.restore()}function y(e){return e||(e=fabric.document.createElement("canvas")),!e.getContext&&typeof G_vmlCanvasManager!="undefined"&&G_vmlCanvasManager.initElement(e),e}function b(e){var t=e.prototype;for(var n=t.stateProperties.length;n--;){var r=t.stateProperties[n],i=r.charAt(0).toUpperCase()+r.slice(1),s="set"+i,o="get"+i;t[o]||(t[o]=function(e){return new Function('return this.get("'+e+'")')}(r)),t[s]||(t[s]=function(e){return new Function("value",'return this.set("'+e+'", value)')}(r))}}function w(e,t){t.save(),t.beginPath(),e.clipTo(t),t.clip()}var e=Math.sqrt,t=Math.atan2;fabric.util={};var i=Math.PI/180,c=fabric.window.requestAnimationFrame||fabric.window.webkitRequestAnimationFrame||fabric.window.mozRequestAnimationFrame||fabric.window.oRequestAnimationFrame||fabric.window.msRequestAnimationFrame||function(e){fabric.window.setTimeout(e,1e3/60)},h=function(){return c.apply(fabric.window,arguments)};fabric.util.removeFromArray=n,fabric.util.degreesToRadians=s,fabric.util.radiansToDegrees=o,fabric.util.rotatePoint=u,fabric.util.toFixed=a,fabric.util.getRandomInt=r,fabric.util.falseFunction=f,fabric.util.animate=l,fabric.util.requestAnimFrame=h,fabric.util.loadImage=p,fabric.util.enlivenObjects=d,fabric.util.groupSVGElements=v,fabric.util.populateWithProperties=m,fabric.util.drawDashedLine=g,fabric.util.createCanvasElement=y,fabric.util.createAccessors=b,fabric.util.clipContext=w}(),function(){function t(t,n){var r=e.call(arguments,2),i=[];for(var s=0,o=t.length;s<o;s++)i[s]=r.length?t[s][n].apply(t[s],r):t[s][n].call(t[s]);return i}function n(e,t){if(!e||e.length===0)return undefined;var n=e.length-1,r=t?e[n][t]:e[n];if(t)while(n--)e[n][t]>=r&&(r=e[n][t]);else while(n--)e[n]>=r&&(r=e[n]);return r}function r(e,t){if(!e||e.length===0)return undefined;var n=e.length-1,r=t?e[n][t]:e[n];if(t)while(n--)e[n][t]<r&&(r=e[n][t]);else while(n--)e[n]<r&&(r=e[n]);return r}var e=Array.prototype.slice;Array.prototype.indexOf||(Array.prototype.indexOf=function(e){if(this===void 0||this===null)throw new TypeError;var t=Object(this),n=t.length>>>0;if(n===0)return-1;var r=0;arguments.length>0&&(r=Number(arguments[1]),r!==r?r=0:r!==0&&r!==Number.POSITIVE_INFINITY&&r!==Number.NEGATIVE_INFINITY&&(r=(r>0||-1)*Math.floor(Math.abs(r))));if(r>=n)return-1;var i=r>=0?r:Math.max(n-Math.abs(r),0);for(;i<n;i++)if(i in t&&t[i]===e)return i;return-1}),Array.prototype.forEach||(Array.prototype.forEach=function(e,t){for(var n=0,r=this.length>>>0;n<r;n++)n in this&&e.call(t,this[n],n,this)}),Array.prototype.map||(Array.prototype.map=function(e,t){var n=[];for(var r=0,i=this.length>>>0;r<i;r++)r in this&&(n[r]=e.call(t,this[r],r,this));return n}),Array.prototype.every||(Array.prototype.every=function(e,t){for(var n=0,r=this.length>>>0;n<r;n++)if(n in this&&!e.call(t,this[n],n,this))return!1;return!0}),Array.prototype.some||(Array.prototype.some=function(e,t){for(var n=0,r=this.length>>>0;n<r;n++)if(n in this&&e.call(t,this[n],n,this))return!0;return!1}),Array.prototype.filter||(Array.prototype.filter=function(e,t){var n=[],r;for(var i=0,s=this.length>>>0;i<s;i++)i in this&&(r=this[i],e.call(t,r,i,this)&&n.push(r));return n}),Array.prototype.reduce||(Array.prototype.reduce=function(e){var t=this.length>>>0,n=0,r;if(arguments.length>1)r=arguments[1];else do{if(n in this){r=this[n++];break}if(++n>=t)throw new TypeError}while(!0);for(;n<t;n++)n in this&&(r=e.call(null,r,this[n],n,this));return r}),fabric.util.array={invoke:t,min:r,max:n}}(),function(){function e(e,t){for(var n in t)e[n]=t[n];return e}function t(t){return e({},t)}fabric.util.object={extend:e,clone:t}}(),function(){function e(e){return e.replace(/-+(.)?/g,function(e,t){return t?t.toUpperCase():""})}function t(e){return e.charAt(0).toUpperCase()+e.slice(1).toLowerCase()}function n(e){return e.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&apos;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}String.prototype.trim||(String.prototype.trim=function(){return this.replace(/^[\s\xA0]+/,"").replace(/[\s\xA0]+$/,"")}),fabric.util.string={camelize:e,capitalize:t,escapeXml:n}}(),function(){var e=Array.prototype.slice,t=Function.prototype.apply,n=function(){};Function.prototype.bind||(Function.prototype.bind=function(r){var i=this,s=e.call(arguments,1),o;return s.length?o=function(){return t.call(i,this instanceof n?this:r,s.concat(e.call(arguments)))}:o=function(){return t.call(i,this instanceof n?this:r,arguments)},n.prototype=this.prototype,o.prototype=new n,o})}(),function(){function i(){}function s(t){var n=this.constructor.superclass.prototype[t];return arguments.length>1?n.apply(this,e.call(arguments,1)):n.call(this)}function o(){function u(){this.initialize.apply(this,arguments)}var n=null,o=e.call(arguments,0);typeof o[0]=="function"&&(n=o.shift()),u.superclass=n,u.subclasses=[],n&&(i.prototype=n.prototype,u.prototype=new i,n.subclasses.push(u));for(var a=0,f=o.length;a<f;a++)r(u,o[a],n);return u.prototype.initialize||(u.prototype.initialize=t),u.prototype.constructor=u,u.prototype.callSuper=s,u}var e=Array.prototype.slice,t=function(){},n=function(){for(var e in{toString:1})if(e==="toString")return!1;return!0}(),r=function(e,t,r){for(var i in t)i in e.prototype&&typeof e.prototype[i]=="function"&&(t[i]+"").indexOf("callSuper")>-1?e.prototype[i]=function(e){return function(){var n=this.constructor.superclass;this.constructor.superclass=r;var i=t[e].apply(this,arguments);this.constructor.superclass=n;if(e!=="initialize")return i}}(i):e.prototype[i]=t[i],n&&(t.toString!==Object.prototype.toString&&(e.prototype.toString=t.toString),t.valueOf!==Object.prototype.valueOf&&(e.prototype.valueOf=t.valueOf))};fabric.util.createClass=o}(),function(){function e(e){var t=Array.prototype.slice.call(arguments,1),n,r,i=t.length;for(r=0;r<i;r++){n=typeof e[t[r]];if(!/^(?:function|object|unknown)$/.test(n))return!1}return!0}function i(e,t){return{handler:t,wrappedHandler:s(e,t)}}function s(e,t){return function(r){t.call(n(e),r||fabric.window.event)}}function o(e,t){return function(n){if(l[e]&&l[e][t]){var r=l[e][t];for(var i=0,s=r.length;i<s;i++)r[i].call(this,n||fabric.window.event)}}}function p(e,t){e||(e=fabric.window.event);var n=e.target||(typeof e.srcElement!="unknown"?e.srcElement:null),r=fabric.document.body||{scrollLeft:0,scrollTop:0},i=fabric.document.documentElement,s=n,o=0,u=0,a;while(n&&n.parentNode&&!a)n=n.parentNode,n!==fabric.document&&fabric.util.getElementPosition(n)==="fixed"&&(a=n),n!==fabric.document&&s!==t&&fabric.util.getElementPosition(n)==="absolute"?(o=0,u=0):n===fabric.document&&s!==t?(o=r.scrollLeft||i.scrollLeft||0,u=r.scrollTop||i.scrollTop||0):(o+=n.scrollLeft||0,u+=n.scrollTop||0);return{x:d(e)+o,y:v(e)+u}}var t=function(){var e=0;return function(t){return t.__uniqueID||(t.__uniqueID="uniqueID__"+e++)}}(),n,r;(function(){var e={};n=function(t){return e[t]},r=function(t,n){e[t]=n}})();var u=e(fabric.document.documentElement,"addEventListener","removeEventListener")&&e(fabric.window,"addEventListener","removeEventListener"),a=e(fabric.document.documentElement,"attachEvent","detachEvent")&&e(fabric.window,"attachEvent","detachEvent"),f={},l={},c,h;u?(c=function(e,t,n){e.addEventListener(t,n,!1)},h=function(e,t,n){e.removeEventListener(t,n,!1)}):a?(c=function(e,n,s){var o=t(e);r(o,e),f[o]||(f[o]={}),f[o][n]||(f[o][n]=[]);var u=i(o,s);f[o][n].push(u),e.attachEvent("on"+n,u.wrappedHandler)},h=function(e,n,r){var i=t(e),s;if(f[i]&&f[i][n])for(var o=0,u=f[i][n].length;o<u;o++)s=f[i][n][o],s&&s.handler===r&&(e.detachEvent("on"+n,s.wrappedHandler),f[i][n][o]=null)}):(c=function(e,n,r){var i=t(e);l[i]||(l[i]={});if(!l[i][n]){l[i][n]=[];var s=e["on"+n];s&&l[i][n].push(s),e["on"+n]=o(i,n)}l[i][n].push(r)},h=function(e,n,r){var i=t(e);if(l[i]&&l[i][n]){var s=l[i][n];for(var o=0,u=s.length;o<u;o++)s[o]===r&&s.splice(o,1)}}),fabric.util.addListener=c,fabric.util.removeListener=h;var d=function(e){return typeof e.clientX!="unknown"?e.clientX:0},v=function(e){return typeof e.clientY!="unknown"?e.clientY:0};fabric.isTouchSupported&&(d=function(e){return e.type!=="touchend"?e.touches&&e.touches[0]?e.touches[0].pageX-(e.touches[0].pageX-e.touches[0].clientX)||e.clientX:e.clientX:e.changedTouches&&e.changedTouches[0]?e.changedTouches[0].pageX-(e.changedTouches[0].pageX-e.changedTouches[0].clientX)||e.clientX:e.clientX},v=function(e){return e.type!=="touchend"?e.touches&&e.touches[0]?e.touches[0].pageY-(e.touches[0].pageY-e.touches[0].clientY)||e.clientY:e.clientY:e.changedTouches&&e.changedTouches[0]?e.changedTouches[0].pageY-(e.changedTouches[0].pageY-e.changedTouches[0].clientY)||e.clientY:e.clientY}),fabric.util.getPointer=p,fabric.util.object.extend(fabric.util,fabric.Observable)}(),function(){function e(e,t){var n=e.style;if(!n)return e;if(typeof t=="string")return e.style.cssText+=";"+t,t.indexOf("opacity")>-1?s(e,t.match(/opacity:\s*(\d?\.?\d*)/)[1]):e;for(var r in t)if(r==="opacity")s(e,t[r]);else{var i=r==="float"||r==="cssFloat"?typeof n.styleFloat=="undefined"?"cssFloat":"styleFloat":r;n[i]=t[r]}return e}var t=fabric.document.createElement("div"),n=typeof t.style.opacity=="string",r=typeof t.style.filter=="string",i=/alpha\s*\(\s*opacity\s*=\s*([^\)]+)\)/,s=function(e){return e};n?s=function(e,t){return e.style.opacity=t,e}:r&&(s=function(e,t){var n=e.style;return e.currentStyle&&!e.currentStyle.hasLayout&&
(n.zoom=1),i.test(n.filter)?(t=t>=.9999?"":"alpha(opacity="+t*100+")",n.filter=n.filter.replace(i,t)):n.filter+=" alpha(opacity="+t*100+")",e}),fabric.util.setStyle=e}(),function(){function t(e){return typeof e=="string"?fabric.document.getElementById(e):e}function s(e,t){var n=fabric.document.createElement(e);for(var r in t)r==="class"?n.className=t[r]:r==="for"?n.htmlFor=t[r]:n.setAttribute(r,t[r]);return n}function o(e,t){(" "+e.className+" ").indexOf(" "+t+" ")===-1&&(e.className+=(e.className?" ":"")+t)}function u(e,t,n){return typeof t=="string"&&(t=s(t,n)),e.parentNode&&e.parentNode.replaceChild(t,e),t.appendChild(e),t}function a(e){var t=0,n=0;do t+=e.offsetTop||0,n+=e.offsetLeft||0,e=e.offsetParent;while(e);return{left:n,top:t}}var e=Array.prototype.slice,n=function(t){return e.call(t,0)},r;try{r=n(fabric.document.childNodes)instanceof Array}catch(i){}r||(n=function(e){var t=new Array(e.length),n=e.length;while(n--)t[n]=e[n];return t});var f;fabric.document.defaultView&&fabric.document.defaultView.getComputedStyle?f=function(e){return fabric.document.defaultView.getComputedStyle(e,null).position}:f=function(e){var t=e.style.position;return!t&&e.currentStyle&&(t=e.currentStyle.position),t},function(){function n(e){return typeof e.onselectstart!="undefined"&&(e.onselectstart=fabric.util.falseFunction),t?e.style[t]="none":typeof e.unselectable=="string"&&(e.unselectable="on"),e}function r(e){return typeof e.onselectstart!="undefined"&&(e.onselectstart=null),t?e.style[t]="":typeof e.unselectable=="string"&&(e.unselectable=""),e}var e=fabric.document.documentElement.style,t="userSelect"in e?"userSelect":"MozUserSelect"in e?"MozUserSelect":"WebkitUserSelect"in e?"WebkitUserSelect":"KhtmlUserSelect"in e?"KhtmlUserSelect":"";fabric.util.makeElementUnselectable=n,fabric.util.makeElementSelectable=r}(),function(){function e(e,t){var n=fabric.document.getElementsByTagName("head")[0],r=fabric.document.createElement("script"),i=!0;r.type="text/javascript",r.setAttribute("runat","server"),r.onload=r.onreadystatechange=function(e){if(i){if(typeof this.readyState=="string"&&this.readyState!=="loaded"&&this.readyState!=="complete")return;i=!1,t(e||fabric.window.event),r=r.onload=r.onreadystatechange=null}},r.src=e,n.appendChild(r)}fabric.util.getScript=e}(),fabric.util.getById=t,fabric.util.toArray=n,fabric.util.makeElement=s,fabric.util.addClass=o,fabric.util.wrapElement=u,fabric.util.getElementOffset=a,fabric.util.getElementPosition=f}(),function(){function e(e,t){return e+(/\?/.test(e)?"&":"?")+t}function n(){}function r(r,i){i||(i={});var s=i.method?i.method.toUpperCase():"GET",o=i.onComplete||function(){},u=t(),a;return u.onreadystatechange=function(){u.readyState===4&&(o(u),u.onreadystatechange=n)},s==="GET"&&(a=null,typeof i.parameters=="string"&&(r=e(r,i.parameters))),u.open(s,r,!0),(s==="POST"||s==="PUT")&&u.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),u.send(a),u}var t=function(){var e=[function(){return new ActiveXObject("Microsoft.XMLHTTP")},function(){return new ActiveXObject("Msxml2.XMLHTTP")},function(){return new ActiveXObject("Msxml2.XMLHTTP.3.0")},function(){return new XMLHttpRequest}];for(var t=e.length;t--;)try{var n=e[t]();if(n)return e[t]}catch(r){}}();fabric.util.request=r}(),function(){function e(e,t,n,r){return n*(e/=r)*e+t}function t(e,t,n,r){return-n*(e/=r)*(e-2)+t}function n(e,t,n,r){return e/=r/2,e<1?n/2*e*e+t:-n/2*(--e*(e-2)-1)+t}function r(e,t,n,r){return n*(e/=r)*e*e+t}function i(e,t,n,r){return n*((e=e/r-1)*e*e+1)+t}function s(e,t,n,r){return e/=r/2,e<1?n/2*e*e*e+t:n/2*((e-=2)*e*e+2)+t}function o(e,t,n,r){return n*(e/=r)*e*e*e+t}function u(e,t,n,r){return-n*((e=e/r-1)*e*e*e-1)+t}function a(e,t,n,r){return e/=r/2,e<1?n/2*e*e*e*e+t:-n/2*((e-=2)*e*e*e-2)+t}function f(e,t,n,r){return n*(e/=r)*e*e*e*e+t}function l(e,t,n,r){return n*((e=e/r-1)*e*e*e*e+1)+t}function c(e,t,n,r){return e/=r/2,e<1?n/2*e*e*e*e*e+t:n/2*((e-=2)*e*e*e*e+2)+t}function h(e,t,n,r){return-n*Math.cos(e/r*(Math.PI/2))+n+t}function p(e,t,n,r){return n*Math.sin(e/r*(Math.PI/2))+t}function d(e,t,n,r){return-n/2*(Math.cos(Math.PI*e/r)-1)+t}function v(e,t,n,r){return e===0?t:n*Math.pow(2,10*(e/r-1))+t}function m(e,t,n,r){return e===r?t+n:n*(-Math.pow(2,-10*e/r)+1)+t}function g(e,t,n,r){return e===0?t:e===r?t+n:(e/=r/2,e<1?n/2*Math.pow(2,10*(e-1))+t:n/2*(-Math.pow(2,-10*--e)+2)+t)}function y(e,t,n,r){return-n*(Math.sqrt(1-(e/=r)*e)-1)+t}function b(e,t,n,r){return n*Math.sqrt(1-(e=e/r-1)*e)+t}function w(e,t,n,r){return e/=r/2,e<1?-n/2*(Math.sqrt(1-e*e)-1)+t:n/2*(Math.sqrt(1-(e-=2)*e)+1)+t}function E(e,t,n,r){var i=1.70158,s=0,o=n;return e===0?t:(e/=r,e===1?t+n:(s||(s=r*.3),o<Math.abs(n)?(o=n,i=s/4):i=s/(2*Math.PI)*Math.asin(n/o),-(o*Math.pow(2,10*(e-=1))*Math.sin((e*r-i)*2*Math.PI/s))+t))}function S(e,t,n,r){var i=1.70158,s=0,o=n;return e===0?t:(e/=r,e===1?t+n:(s||(s=r*.3),o<Math.abs(n)?(o=n,i=s/4):i=s/(2*Math.PI)*Math.asin(n/o),o*Math.pow(2,-10*e)*Math.sin((e*r-i)*2*Math.PI/s)+n+t))}function x(e,t,n,r){var i=1.70158,s=0,o=n;return e===0?t:(e/=r/2,e===2?t+n:(s||(s=r*.3*1.5),o<Math.abs(n)?(o=n,i=s/4):i=s/(2*Math.PI)*Math.asin(n/o),e<1?-0.5*o*Math.pow(2,10*(e-=1))*Math.sin((e*r-i)*2*Math.PI/s)+t:o*Math.pow(2,-10*(e-=1))*Math.sin((e*r-i)*2*Math.PI/s)*.5+n+t))}function T(e,t,n,r,i){return i===undefined&&(i=1.70158),n*(e/=r)*e*((i+1)*e-i)+t}function N(e,t,n,r,i){return i===undefined&&(i=1.70158),n*((e=e/r-1)*e*((i+1)*e+i)+1)+t}function C(e,t,n,r,i){return i===undefined&&(i=1.70158),e/=r/2,e<1?n/2*e*e*(((i*=1.525)+1)*e-i)+t:n/2*((e-=2)*e*(((i*=1.525)+1)*e+i)+2)+t}function k(e,t,n,r){return n-L(r-e,0,n,r)+t}function L(e,t,n,r){return(e/=r)<1/2.75?n*7.5625*e*e+t:e<2/2.75?n*(7.5625*(e-=1.5/2.75)*e+.75)+t:e<2.5/2.75?n*(7.5625*(e-=2.25/2.75)*e+.9375)+t:n*(7.5625*(e-=2.625/2.75)*e+.984375)+t}function A(e,t,n,r){return e<r/2?k(e*2,0,n,r)*.5+t:L(e*2-r,0,n,r)*.5+n*.5+t}fabric.util.ease={easeInQuad:e,easeOutQuad:t,easeInOutQuad:n,easeInCubic:r,easeOutCubic:i,easeInOutCubic:s,easeInQuart:o,easeOutQuart:u,easeInOutQuart:a,easeInQuint:f,easeOutQuint:l,easeInOutQuint:c,easeInSine:h,easeOutSine:p,easeInOutSine:d,easeInExpo:v,easeOutExpo:m,easeInOutExpo:g,easeInCirc:y,easeOutCirc:b,easeInOutCirc:w,easeInElastic:E,easeOutElastic:S,easeInOutElastic:x,easeInBack:T,easeOutBack:N,easeInOutBack:C,easeInBounce:k,easeOutBounce:L,easeInOutBounce:A}}(),function(e){"use strict";function o(e){return e in s?s[e]:e}function u(e,r){if(!e)return;var i,s,u={};e.parentNode&&/^g$/i.test(e.parentNode.nodeName)&&(u=t.parseAttributes(e.parentNode,r));var a=r.reduce(function(n,r){return i=e.getAttribute(r),s=parseFloat(i),i&&((r==="fill"||r==="stroke")&&i==="none"&&(i=""),r==="fill-rule"&&(i=i==="evenodd"?"destination-over":i),r==="transform"&&(i=t.parseTransformAttribute(i)),r=o(r),n[r]=isNaN(s)?i:s),n},{});return a=n(a,n(p(e),t.parseStyleAttribute(e))),n(u,a)}function a(e){if(!e)return null;e=e.trim();var t=e.indexOf(",")>-1;e=e.split(/\s+/);var n=[],r,i;if(t){r=0,i=e.length;for(;r<i;r++){var s=e[r].split(",");n.push({x:parseFloat(s[0]),y:parseFloat(s[1])})}}else{r=0,i=e.length;for(;r<i;r+=2)n.push({x:parseFloat(e[r]),y:parseFloat(e[r+1])})}return n.length%2!==0,n}function f(e){var t={},n=e.getAttribute("style");if(!n)return t;if(typeof n=="string")n=n.replace(/;$/,"").split(";").forEach(function(e){var n=e.split(":"),r=n[1].trim(),i=parseFloat(r);t[o(n[0].trim().toLowerCase())]=isNaN(i)?r:i});else for(var r in n){if(typeof n[r]=="undefined")continue;var i=parseFloat(n[r]);t[o(r.toLowerCase())]=isNaN(i)?n[r]:i}return t}function l(e){for(var n=e.length;n--;){var r=e[n].get("fill");if(/^url\(/.test(r)){var i=r.slice(5,r.length-1);t.gradientDefs[i]&&e[n].set("fill",t.Gradient.fromElement(t.gradientDefs[i],e[n]))}}}function c(e,n,i,s){function a(){--u===0&&(o=o.filter(function(e){return e!=null}),l(o),n(o))}var o=new Array(e.length),u=e.length;for(var f=0,c,h=e.length;f<h;f++){c=e[f];var p=t[r(c.tagName)];if(p&&p.fromElement)try{if(p.async)p.fromElement(c,function(e,t){return function(n){s&&s(t,n),o.splice(e,0,n),a()}}(f),i);else{var d=p.fromElement(c,i);s&&s(c,d),o.splice(f,0,d),a()}}catch(v){t.log(v)}else a()}}function h(e){var t=e.getElementsByTagName("style"),n={},r;for(var i=0,s=t.length;i<s;i++){var o=t[0].textContent;o=o.replace(/\/\*[\s\S]*?\*\//g,""),r=o.match(/[^{]*\{[\s\S]*?\}/g),r=r.map(function(e){return e.trim()}),r.forEach(function(e){var t=e.match(/([\s\S]*?)\s*\{([^}]*)\}/);e=t[1];var r=t[2].trim(),i=r.replace(/;$/,"").split(/\s*;\s*/);n[e]||(n[e]={});for(var s=0,o=i.length;s<o;s++){var u=i[s].split(/\s*:\s*/),a=u[0],f=u[1];n[e][a]=f}})}return n}function p(e){var n=e.nodeName,r=e.getAttribute("class"),i=e.getAttribute("id"),s={};for(var o in t.cssRules){var u=r&&(new RegExp("^\\."+r)).test(o)||i&&(new RegExp("^#"+i)).test(o)||(new RegExp("^"+n)).test(o);if(u)for(var a in t.cssRules[o])s[a]=t.cssRules[o][a]}return s}function v(e,n,r){function i(i){var s=i.responseXML;!s.documentElement&&t.window.ActiveXObject&&i.responseText&&(s=new ActiveXObject("Microsoft.XMLDOM"),s.async="false",s.loadXML(i.responseText.replace(/<!DOCTYPE[\s\S]*?(\[[\s\S]*\])*?>/i,"")));if(!s.documentElement)return;t.parseSVGDocument(s.documentElement,function(r,i){d.set(e,{objects:t.util.array.invoke(r,"toObject"),options:i}),n(r,i)},r)}e=e.replace(/^\n\s*/,"").trim(),d.has(e,function(r){r?d.get(e,function(e){var t=m(e);n(t.objects,t.options)}):new t.util.request(e,{method:"get",onComplete:i})})}function m(e){var n=e.objects,i=e.options;return n=n.map(function(e){return t[r(e.type)].fromObject(e)}),{objects:n,options:i}}function g(e,n,r){e=e.trim();var i;if(typeof DOMParser!="undefined"){var s=new DOMParser;s&&s.parseFromString&&(i=s.parseFromString(e,"text/xml"))}else t.window.ActiveXObject&&(i=new ActiveXObject("Microsoft.XMLDOM"),i.async="false",i.loadXML(e.replace(/<!DOCTYPE[\s\S]*?(\[[\s\S]*\])*?>/i,"")));t.parseSVGDocument(i.documentElement,function(e,t){n(e,t)},r)}function y(e){var t="";for(var n=0,r=e.length;n<r;n++){if(e[n].type!=="text"||!e[n].path)continue;t+=["@font-face {","font-family: ",e[n].fontFamily,"; ","src: url('",e[n].path,"')","}"].join("")}return t&&(t=['<style type="text/css">',"<![CDATA[",t,"]]>","</style>"].join("")),t}function b(e){var t="";return e.backgroundColor&&e.backgroundColor.source&&(t=['<pattern x="0" y="0" id="backgroundColorPattern" ','width="',e.backgroundColor.source.width,'" height="',e.backgroundColor.source.height,'" patternUnits="userSpaceOnUse">','<image x="0" y="0" ','width="',e.backgroundColor.source.width,'" height="',e.backgroundColor.source.height,'" xlink:href="',e.backgroundColor.source.src,'"></image></pattern>'].join("")),t}var t=e.fabric||(e.fabric={}),n=t.util.object.extend,r=t.util.string.capitalize,i=t.util.object.clone,s={cx:"left",x:"left",cy:"top",y:"top",r:"radius","fill-opacity":"opacity","fill-rule":"fillRule","stroke-width":"strokeWidth",transform:"transformMatrix","text-decoration":"textDecoration","font-size":"fontSize","font-weight":"fontWeight","font-style":"fontStyle","font-family":"fontFamily"};t.parseTransformAttribute=function(){function e(e,t){var n=t[0];e[0]=Math.cos(n),e[1]=Math.sin(n),e[2]=-Math.sin(n),e[3]=Math.cos(n)}function t(e,t){var n=t[0],r=t.length===2?t[1]:t[0];e[0]=n,e[3]=r}function n(e,t){e[2]=t[0]}function r(e,t){e[1]=t[0]}function i(e,t){e[4]=t[0],t.length===2&&(e[5]=t[1])}var s=[1,0,0,1,0,0],o="(?:[-+]?\\d+(?:\\.\\d+)?(?:e[-+]?\\d+)?)",u="(?:\\s+,?\\s*|,\\s*)",a="(?:(skewX)\\s*\\(\\s*("+o+")\\s*\\))",f="(?:(skewY)\\s*\\(\\s*("+o+")\\s*\\))",l="(?:(rotate)\\s*\\(\\s*("+o+")(?:"+u+"("+o+")"+u+"("+o+"))?\\s*\\))",c="(?:(scale)\\s*\\(\\s*("+o+")(?:"+u+"("+o+"))?\\s*\\))",h="(?:(translate)\\s*\\(\\s*("+o+")(?:"+u+"("+o+"))?\\s*\\))",p="(?:(matrix)\\s*\\(\\s*("+o+")"+u+"("+o+")"+u+"("+o+")"+u+"("+o+")"+u+"("+o+")"+u+"("+o+")"+"\\s*\\))",d="(?:"+p+"|"+h+"|"+c+"|"+l+"|"+a+"|"+f+")",v="(?:"+d+"(?:"+u+d+")*"+")",m="^\\s*(?:"+v+"?)\\s*$",g=new RegExp(m),y=new RegExp(d);return function(o){var u=s.concat();return!o||o&&!g.test(o)?u:(o.replace(y,function(s){var o=(new RegExp(d)).exec(s).filter(function(e){return e!==""&&e!=null}),a=o[1],f=o.slice(2).map(parseFloat);switch(a){case"translate":i(u,f);break;case"rotate":e(u,f);break;case"scale":t(u,f);break;case"skewX":n(u,f);break;case"skewY":r(u,f);break;case"matrix":u=f}}),u)}}(),t.parseSVGDocument=function(){function s(e,t){while(e&&(e=e.parentNode))if(t.test(e.nodeName))return!0;return!1}var e=/^(path|circle|polygon|polyline|ellipse|rect|line|image|text)$/,n="(?:[-+]?\\d+(?:\\.\\d+)?(?:e[-+]?\\d+)?)",r=new RegExp("^\\s*("+n+"+)\\s*,?"+"\\s*("+n+"+)\\s*,?"+"\\s*("+n+"+)\\s*,?"+"\\s*("+n+"+)\\s*"+"$");return function(n,o,u){if(!n)return;var a=new Date,f=t.util.toArray(n.getElementsByTagName("*"));if(f.length===0){f=n.selectNodes("//*[name(.)!='svg']");var l=[];for(var c=0,p=f.length;c<p;c++)l[c]=f[c];f=l}var d=f.filter(function(t){return e.test(t.tagName)&&!s(t,/^(?:pattern|defs)$/)});if(!d||d&&!d.length)return;var v=n.getAttribute("viewBox"),m=n.getAttribute("width"),g=n.getAttribute("height"),y=null,b=null,w,E;v&&(v=v.match(r))&&(w=parseInt(v[1],10),E=parseInt(v[2],10),y=parseInt(v[3],10),b=parseInt(v[4],10)),y=m?parseFloat(m):y,b=g?parseFloat(g):b;var S={width:y,height:b};t.gradientDefs=t.getGradientDefs(n),t.cssRules=h(n),t.parseElements(d,function(e){t.documentParsingTime=new Date-a,o&&o(e,S)},i(S),u)}}();var d={has:function(e,t){t(!1)},get:function(){},set:function(){}};n(t,{parseAttributes:u,parseElements:c,parseStyleAttribute:f,parsePointsAttribute:a,getCSSRules:h,loadSVGFromURL:v,loadSVGFromString:g,createSVGFontFacesMarkup:y,createSVGRefElementsMarkup:b})}(typeof exports!="undefined"?exports:this),function(){function e(e){var t=e.getAttribute("style"),n=e.getAttribute("offset"),r,i;n=parseFloat(n)/(/%$/.test(n)?100:1);if(t){var s=t.split(/\s*;\s*/);s[s.length-1]===""&&s.pop();for(var o=s.length;o--;){var u=s[o].split(/\s*:\s*/),a=u[0].trim(),f=u[1].trim();a==="stop-color"?r=f:a==="stop-opacity"&&(i=f)}}return r||(r=e.getAttribute("stop-color")),i||(i=e.getAttribute("stop-opacity")),r=(new fabric.Color(r)).toRgb(),{offset:n,color:r,opacity:i}}function t(e,t){for(var n in t){if(typeof t[n]=="string"&&/^\d+%$/.test(t[n])){var r=parseFloat(t[n],10);if(n==="x1"||n==="x2"||n==="r2")t[n]=fabric.util.toFixed(e.width*r/100,2);else if(n==="y1"||n==="y2")t[n]=fabric.util.toFixed(e.height*r/100,2)}if(n==="x1"||n==="x2")t[n]-=fabric.util.toFixed(e.width/2,2);else if(n==="y1"||n==="y2")t[n]-=fabric.util.toFixed(e.height/2,2)}}function n(e,t){for(var n in t){if(n==="x1"||n==="x2")t[n]+=fabric.util.toFixed(e.width/2,2);else if(n==="y1"||n==="y2")t[n]+=fabric.util.toFixed(e.height/2,2);if(n==="x1"||n==="x2"||n==="r2")t[n]=fabric.util.toFixed(t[n]/e.width*100,2)+"%";else if(n==="y1"||n==="y2")t[n]=fabric.util.toFixed(t[n]/e.height*100,2)+"%"}}function r(e){var t=e.getElementsByTagName("linearGradient"),n=e.getElementsByTagName("radialGradient"),r,i,s={};i=t.length;for(;i--;)r=t[i],s[r.getAttribute("id")]=r;i=n.length;for(;i--;)r=n[i],s[r.getAttribute("id")]=r;return s}fabric.Gradient=fabric.util.createClass({initialize:function(e){e||(e={});var t={};this.id=fabric.Object.__uid++,this.type=e.type||"linear",t={x1:e.coords?e.coords.x1:0,y1:e.coords?e.coords.y1:0,x2:e.coords?e.coords.x2:0,y2:e.coords?e.coords.y2:0},this.type==="radial"&&(t.r1=e.coords.r1||0,t.r2=e.coords.r2||0),this.coords=t,this.gradientUnits=e.gradientUnits||"objectBoundingBox",this.colorStops=fabric.util.object.clone(e.colorStops)},addColorStop:function(e){for(var t in e){var n=new fabric.Color(e[t]);this.colorStops.push({offset:t,color:n.toRgb(),opacity:n.getAlpha()})}return this},toObject:function(){return{type:this.type,coords:this.coords,gradientUnits:this.gradientUnits,colorStops:this.colorStops}},toLive:function(e){var t;if(!this.type)return;this.type==="linear"?t=e.createLinearGradient(this.coords.x1,this.coords.y1,this.coords.x2||e.canvas.width,this.coords.y2):this.type==="radial"&&(t=e.createRadialGradient(this.coords.x1,this.coords.y1,this.coords.r1,this.coords.x2,this.coords.y2,this.coords.r2));for(var n=0;n<this.colorStops.length;n++){var r=this.colorStops[n].color,i=this.colorStops[n].opacity,s=this.colorStops[n].offset;i&&(r=(new fabric.Color(r)).setAlpha(i).toRgba()),t.addColorStop(parseFloat(s),r)}return t},toSVG:function(e,t){var r=fabric.util.object.clone(this.coords),i;this.colorStops.sort(function(e,t){return e.offset-t.offset}),t&&this.gradientUnits==="userSpaceOnUse"?(r.x1+=e.width/2,r.y1+=e.height/2,r.x2+=e.width/2,r.y2+=e.height/2):this.gradientUnits==="objectBoundingBox"&&n(e,r),this.type==="linear"?i=["<linearGradient ",'id="SVGID_',this.id,'" gradientUnits="',this.gradientUnits,'" x1="',r.x1,'" y1="',r.y1,'" x2="',r.x2,'" y2="',r.y2,'">']:this.type==="radial"&&(i=["<radialGradient ",'id="SVGID_',this.id,'" gradientUnits="',this.gradientUnits,'" cx="',r.x2,'" cy="',r.y2,'" r="',r.r2,'" fx="',r.x1,'" fy="',r.y1,'">']);for(var s=0;s<this.colorStops.length;s++)i.push("<stop ",'offset="',this.colorStops[s].offset*100+"%",'" style="stop-color:',this.colorStops[s].color,this.colorStops[s].opacity?";stop-opacity: "+this.colorStops[s].opacity:";",'"/>');return i.push(this.type==="linear"?"</linearGradient>":"</radialGradient>"),i.join("")}}),fabric.util.object.extend(fabric.Gradient,{fromElement:function(n,r){var i=n.getElementsByTagName("stop"),s=n.nodeName==="linearGradient"?"linear":"radial",o=n.getAttribute("gradientUnits")||"objectBoundingBox",u=[],a={};s==="linear"?a={x1:n.getAttribute("x1")||0,y1:n.getAttribute("y1")||0,x2:n.getAttribute("x2")||"100%",y2:n.getAttribute("y2")||0}:s==="radial"&&(a={x1:n.getAttribute("fx")||n.getAttribute("cx")||"50%",y1:n.getAttribute("fy")||n.getAttribute("cy")||"50%",r1:0,x2:n.getAttribute("cx")||"50%",y2:n.getAttribute("cy")||"50%",r2:n.getAttribute("r")||"50%"});for(var f=i.length;f--;)u.push(e(i[f]));return t(r,a),new fabric.Gradient({type:s,coords:a,gradientUnits:o,colorStops:u})},forObject:function(e,n){return n||(n={}),t(e,n),new fabric.Gradient(n)}}),fabric.getGradientDefs=r}(),fabric.Pattern=fabric.util.createClass({repeat:"repeat",initialize:function(e){e||(e={}),e.source&&(this.source=typeof e.source=="string"?new Function(e.source):e.source),e.repeat&&(this.repeat=e.repeat)},toObject:function(){var e;return typeof this.source=="function"?e=String(this.source).match(/function\s+\w*\s*\(.*\)\s+\{([\s\S]*)\}/)[1]:typeof this.source.src=="string"&&(e=this.source.src),{source:e,repeat:this.repeat}},toLive:function(e){var t=typeof this.source=="function"?this.source():this.source;return e.createPattern(t,this.repeat)}}),fabric.Shadow=fabric.util.createClass({color:"rgb(0,0,0)",blur:0,offsetX:0,offsetY:0,initialize:function(e){for(var t in e)this[t]=e[t]},toObject:function(){return{color:this.color,blur:this.blur,offsetX:this.offsetX,offsetY:this.offsetY}},toSVG:function(){}}),function(e){"use strict";function n(e,t){arguments.length>0&&this.init(e,t)}var t=e.fabric||(e.fabric={});if(t.Point){t.warn("fabric.Point is already defined");return}t.Point=n,n.prototype={constructor:n,init:function(e,t){this.x=e,this.y=t},add:function(e){return new n(this.x+e.x,this.y+e.y)},addEquals:function(e){return this.x+=e.x,this.y+=e.y,this},scalarAdd:function(e){return new n(this.x+e,this.y+e)},scalarAddEquals:function(e){return this.x+=e,this.y+=e,this},subtract:function(e){return new n(this.x-e.x,this.y-e.y)},subtractEquals:function(e){return this.x-=e.x,this.y-=e.y,this},scalarSubtract:function(e){return new n(this.x-e,this.y-e)},scalarSubtractEquals:function(e){return this.x-=e,this.y-=e,this},multiply:function(e){return new n(this.x*e,this.y*e)},multiplyEquals:function(e){return this.x*=e,this.y*=e,this},divide:function(e){return new n(this.x/e,this.y/e)},divideEquals:function(e){return this.x/=e,this.y/=e,this},eq:function(e){return this.x===e.x&&this.y===e.y},lt:function(e){return this.x<e.x&&this.y<e.y},lte:function(e){return this.x<=e.x&&this.y<=e.y},gt:function(e){return this.x>e.x&&this.y>e.y},gte:function(e){return this.x>=e.x&&this.y>=e.y},lerp:function(e,t){return new n(this.x+(e.x-this.x)*t,this.y+(e.y-this.y)*t)},distanceFrom:function(e){var t=this.x-e.x,n=this.y-e.y;return Math.sqrt(t*t+n*n)},midPointFrom:function(e){return new n(this.x+(e.x-this.x)/2,this.y+(e.y-this.y)/2)},min:function(e){return new n(Math.min(this.x,e.x),Math.min(this.y,e.y))},max:function(e){return new n(Math.max(this.x,e.x),Math.max(this.y,e.y))},toString:function(){return this.x+","+this.y},setXY:function(e,t){this.x=e,this.y=t},setFromPoint:function(e){this.x=e.x,this.y=e.y},swap:function(e){var t=this.x,n=this.y;this.x=e.x,this.y=e.y,e.x=t,e.y=n}}}(typeof exports!="undefined"?exports:this),function(e){"use strict";function n(e){arguments.length>0&&this.init(e)}var t=e.fabric||(e.fabric={});if(t.Intersection){t.warn("fabric.Intersection is already defined");return}t.Intersection=n,t.Intersection.prototype={init:function(e){this.status=e,this.points=[]},appendPoint:function(e){this.points.push(e)},appendPoints:function(e){this.points=this.points.concat(e)}},t.Intersection.intersectLineLine=function(e,r,i,s){var o,u=(s.x-i.x)*(e.y-i.y)-(s.y-i.y)*(e.x-i.x),a=(r.x-e.x)*(e.y-i.y)-(r.y-e.y)*(e.x-i.x),f=(s.y-i.y)*(r.x-e.x)-(s.x-i.x)*(r.y-e.y);if(f!==0){var l=u/f,c=a/f;0<=l&&l<=1&&0<=c&&c<=1?(o=new n("Intersection"),o.points.push(new t.Point(e.x+l*(r.x-e.x),e.y+l*(r.y-e.y)))):o=new n("No Intersection")}else u===0||a===0?o=new n("Coincident"):o=new n("Parallel");return o},t.Intersection.intersectLinePolygon=function(e,t,r){var i=new n("No Intersection"),s=r.length;for(var o=0;o<s;o++){var u=r[o],a=r[(o+1)%s],f=n.intersectLineLine(e,t,u,a);i.appendPoints(f.points)}return i.points.length>0&&(i.status="Intersection"),i},t.Intersection.intersectPolygonPolygon=function(e,t){var r=new n("No Intersection"),i=e.length;for(var s=0;s<i;s++){var o=e[s],u=e[(s+1)%i],a=n.intersectLinePolygon(o,u,t);r.appendPoints(a.points)}return r.points.length>0&&(r.status="Intersection"),r},t.Intersection.intersectPolygonRectangle=function(e,r,i){var s=r.min(i),o=r.max(i),u=new t.Point(o.x,s.y),a=new t.Point(s.x,o.y),f=n.intersectLinePolygon(s,u,e),l=n.intersectLinePolygon(u,o,e),c=n.intersectLinePolygon(o,a,e),h=n.intersectLinePolygon(a,s,e),p=new n("No Intersection");return p.appendPoints(f.points),p.appendPoints(l.points),p.appendPoints(c.points),p.appendPoints(h.points),p.points.length>0&&(p.status="Intersection"),p}}(typeof exports!="undefined"?exports:this),function(e){"use strict";function n(e){e?this._tryParsingColor(e):this.setSource([0,0,0,1])}var t=e.fabric||(e.fabric={});if(t.Color){t.warn("fabric.Color is already defined.");return}t.Color=n,t.Color.prototype={_tryParsingColor:function(e){var t;e in n.colorNameMap&&(e=n.colorNameMap[e]),t=n.sourceFromHex(e),t||(t=n.sourceFromRgb(e)),t&&this.setSource(t)},getSource:function(){return this._source},setSource:function(e){this._source=e},toRgb:function(){var e=this.getSource();return"rgb("+e[0]+","+e[1]+","+e[2]+")"},toRgba:function(){var e=this.getSource();return"rgba("+e[0]+","+e[1]+","+e[2]+","+e[3]+")"},toHex:function(){var e=this.getSource(),t=e[0].toString(16);t=t.length===1?"0"+t:t;var n=e[1].toString(16);n=n.length===1?"0"+n:n;var r=e[2].toString(16);return r=r.length===1?"0"+r:r,t.toUpperCase()+n.toUpperCase()+r.toUpperCase()},getAlpha:function(){return this.getSource()[3]},setAlpha:function(e){var t=this.getSource();return t[3]=e,this.setSource(t),this},toGrayscale:function(){var e=this.getSource(),t=parseInt((e[0]*.3+e[1]*.59+e[2]*.11).toFixed(0),10),n=e[3];return this.setSource([t,t,t,n]),this},toBlackWhite:function(e){var t=this.getSource(),n=(t[0]*.3+t[1]*.59+t[2]*.11).toFixed(0),r=t[3];return e=e||127,n=Number(n)<Number(e)?0:255,this.setSource([n,n,n,r]),this},overlayWith:function(e){e instanceof n||(e=new n(e));var t=[],r=this.getAlpha(),i=.5,s=this.getSource(),o=e.getSource();for(var u=0;u<3;u++)t.push(Math.round(s[u]*(1-i)+o[u]*i));return t[3]=r,this.setSource(t),this}},t.Color.reRGBa=/^rgba?\((\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})(?:\s*,\s*(\d+(?:\.\d+)?))?\)$/,t.Color.reHex=/^#?([0-9a-f]{6}|[0-9a-f]{3})$/i,t.Color.colorNameMap={aqua:"#00FFFF",black:"#000000",blue:"#0000FF",fuchsia:"#FF00FF",gray:"#808080",green:"#008000",lime:"#00FF00",maroon:"#800000",navy:"#000080",olive:"#808000",purple:"#800080",red:"#FF0000",silver:"#C0C0C0",teal:"#008080",white:"#FFFFFF",yellow:"#FFFF00"},t.Color.fromRgb=function(e){return n.fromSource(n.sourceFromRgb(e))},t.Color.sourceFromRgb=function(e){var t=e.match(n.reRGBa);if(t)return[parseInt(t[1],10),parseInt(t[2],10),parseInt(t[3],10),t[4]?parseFloat(t[4]):1]},t.Color.fromRgba=n.fromRgb,t.Color.fromHex=function(e){return n.fromSource(n.sourceFromHex(e))},t.Color.sourceFromHex=function(e){if(e.match(n.reHex)){var t=e.slice(e.indexOf("#")+1),r=t.length===3,i=r?t.charAt(0)+t.charAt(0):t.substring(0,2),s=r?t.charAt(1)+t.charAt(1):t.substring(2,4),o=r?t.charAt(2)+t.charAt(2):t.substring(4,6);return[parseInt(i,16),parseInt(s,16),parseInt(o,16),1]}},t.Color.fromSource=function(e){var t=new n;return t.setSource(e),t}}(typeof exports!="undefined"?exports:this),function(){"use strict";if(fabric.StaticCanvas){fabric.warn("fabric.StaticCanvas is already defined.");return}var e=fabric.util.object.extend,t=fabric.util.getElementOffset,n=fabric.util.removeFromArray,r=fabric.util.removeListener,i=new Error("Could not initialize `canvas` element");fabric.StaticCanvas=function(e,t){t||(t={}),this._initStatic(e,t),fabric.StaticCanvas.activeInstance=this},e(fabric.StaticCanvas.prototype,fabric.Observable),e(fabric.StaticCanvas.prototype,{backgroundColor:"",backgroundImage:"",backgroundImageOpacity:1,backgroundImageStretch:!0,overlayImage:"",overlayImageLeft:0,overlayImageTop:0,includeDefaultValues:!0,stateful:!0,renderOnAddition:!0,clipTo:null,controlsAboveOverlay:!1,onBeforeScaleRotate:function(){},_initStatic:function(e,t){this._objects=[],this._createLowerCanvas(e),this._initOptions(t),t.overlayImage&&this.setOverlayImage(t.overlayImage,this.renderAll.bind(this)),t.backgroundImage&&this.setBackgroundImage(t.backgroundImage,this.renderAll.bind(this)),t.backgroundColor&&this.setBackgroundColor(t.backgroundColor,this.renderAll.bind(this)),this.calcOffset()},calcOffset:function(){return this._offset=t(this.lowerCanvasEl),this},setOverlayImage:function(e,t,n){return fabric.util.loadImage(e,function(e){this.overlayImage=e,n&&"overlayImageLeft"in n&&(this.overlayImageLeft=n.overlayImageLeft),n&&"overlayImageTop"in n&&(this.overlayImageTop=n.overlayImageTop),t&&t()},this),this},setBackgroundImage:function(e,t,n){return fabric.util.loadImage(e,function(e){this.backgroundImage=e,n&&"backgroundImageOpacity"in n&&(this.backgroundImageOpacity=n.backgroundImageOpacity),n&&"backgroundImageStretch"in n&&(this.backgroundImageStretch=n.backgroundImageStretch),t&&t()},this),this},setBackgroundColor:function(e,t){if(e.source){var n=this;fabric.util.loadImage(e.source,function(r){n.backgroundColor=new fabric.Pattern({source:r,repeat:e.repeat}),t&&t()})}else this.backgroundColor=e,t&&t();return this},_createCanvasElement:function(){var e=fabric.document.createElement("canvas");e.style||(e.style={});if(!e)throw i;return this._initCanvasElement(e),e},_initCanvasElement:function(e){fabric.util.createCanvasElement(e);if(typeof e.getContext=="undefined")throw i},_initOptions:function(e){for(var t in e)this[t]=e[t];this.width=parseInt(this.lowerCanvasEl.width,10)||0,this.height=parseInt(this.lowerCanvasEl.height,10)||0;if(!this.lowerCanvasEl.style)return;this.lowerCanvasEl.style.width=this.width+"px",this.lowerCanvasEl.style.height=this.height+"px"},_createLowerCanvas:function(e){this.lowerCanvasEl=fabric.util.getById(e)||this._createCanvasElement(),this._initCanvasElement(this.lowerCanvasEl),fabric.util.addClass(this.lowerCanvasEl,"lower-canvas"),this.interactive&&this._applyCanvasStyle(this.lowerCanvasEl),this.contextContainer=this.lowerCanvasEl.getContext("2d")},getWidth:function(){return this.width},getHeight:function(){return this.height},setWidth:function(e){return this._setDimension("width",e)},setHeight:function(e){return this._setDimension("height",e)},setDimensions:function(e){for(var t in e)this._setDimension(t,e[t]);return this},_setDimension:function(e,t){return this.lowerCanvasEl[e]=t,this.lowerCanvasEl.style[e]=t+"px",this.upperCanvasEl&&(this.upperCanvasEl[e]=t,this.upperCanvasEl.style[e]=t+"px"),this.cacheCanvasEl&&(this.cacheCanvasEl[e]=t),this.wrapperEl&&(this.wrapperEl.style[e]=t+"px"),this[e]=t,this.calcOffset(),this.renderAll(),this},getElement:function(){return this.lowerCanvasEl},getActiveObject:function(){return null},getActiveGroup:function(){return null},_draw:function(e,t){if(!t)return;if(this.controlsAboveOverlay){var n=t.hasBorders,r=t.hasControls;t.hasBorders=t.hasControls=!1,t.render(e),t.hasBorders=n,t.hasControls=r}else t.render(e)},add:function(){this._objects.push.apply(this._objects,arguments);for(var e=arguments.length;e--;)this._initObject(arguments[e]);return this.renderOnAddition&&this.renderAll(),this},_initObject:function(e){this.stateful&&e.setupState(),e.setCoords(),e.canvas=this,this.fire("object:added",{target:e}),e.fire("added")},insertAt:function(e,t,n){return n?this._objects[t]=e:this._objects.splice(t,0,e),this._initObject(e),this.renderOnAddition&&this.renderAll(),this},getObjects:function(){return this._objects},clearContext:function(e){return e.clearRect(0,0,this.width,this.height),this},getContext:function(){return this.contextContainer},clear:function(){return this._objects.length=0,this.discardActiveGroup&&this.discardActiveGroup(),this.clearContext(this.contextContainer),this.contextTop&&this.clearContext(this.contextTop),this.fire("canvas:cleared"),this.renderAll(),this},renderAll:function(e){var t=this[e===!0&&this.interactive?"contextTop":"contextContainer"];this.contextTop&&this.selection&&this.clearContext(this.contextTop),e||this.clearContext(t),this.fire("before:render"),this.clipTo&&fabric.util.clipCanvas(this,t),this.backgroundColor&&(t.fillStyle=this.backgroundColor.toLive?this.backgroundColor.toLive(t):this.backgroundColor,t.fillRect(0,0,this.width,this.height)),typeof this.backgroundImage=="object"&&this._drawBackroundImage(t);var n=this.getActiveGroup();for(var r=0,i=this._objects.length;r<i;++r)(!n||n&&this._objects[r]&&!n.contains(this._objects[r]))&&this._draw(t,this._objects[r]);if(n){var s=[];this.forEachObject(function(e){n.contains(e)&&s.push(e)}),n._set("objects",s),this._draw(t,n)}return this.clipTo&&t.restore(),this.overlayImage&&t.drawImage(this.overlayImage,this.overlayImageLeft,this.overlayImageTop),this.controlsAboveOverlay&&this.drawControls(t),this.fire("after:render"),this},_drawBackroundImage:function(e){e.save(),e.globalAlpha=this.backgroundImageOpacity,this.backgroundImageStretch?e.drawImage(this.backgroundImage,0,0,this.width,this.height):e.drawImage(this.backgroundImage,0,0),e.restore()},renderTop:function(){var e=this.contextTop||this.contextContainer;this.clearContext(e),this.selection&&this._groupSelector&&this._drawSelection();var t=this.getActiveGroup();return t&&t.render(e),this.overlayImage&&e.drawImage(this.overlayImage,this.overlayImageLeft,this.overlayImageTop),this.fire("after:render"),this},drawControls:function(e){var t=this.getActiveGroup();if(t)e.save(),fabric.Group.prototype.transform.call(t,e),t.drawBorders(e).drawControls(e),e.restore();else for(var n=0,r=this._objects.length;n<r;++n){if(!this._objects[n]||!this._objects[n].active)continue;e.save(),fabric.Object.prototype.transform.call(this._objects[n],e),this._objects[n].drawBorders(e).drawControls(e),e.restore(),this.lastRenderedObjectWithControlsAboveOverlay=this._objects[n]}},toDataURL:function(e){e||(e={});var t=e.format||"png",n=e.quality||1,r=e.multiplier||1;return r!==1?this.__toDataURLWithMultiplier(t,n,r):this.__toDataURL(t,n)},__toDataURL:function(e,t){this.renderAll(!0);var n=this.upperCanvasEl||this.lowerCanvasEl,r=fabric.StaticCanvas.supports("toDataURLWithQuality")?n.toDataURL("image/"+e,t):n.toDataURL("image/"+e);return this.contextTop&&this.clearContext(this.contextTop),this.renderAll(),r},__toDataURLWithMultiplier:function(e,t,n){var r=this.getWidth(),i=this.getHeight(),s=r*n,o=i*n,u=this.getActiveObject(),a=this.getActiveGroup(),f=this.contextTop||this.contextContainer;this.setWidth(s).setHeight(o),f.scale(n,n),a?this._tempRemoveBordersControlsFromGroup(a):u&&this.deactivateAll&&this.deactivateAll(),this.width=r,this.height=i,this.renderAll(!0);var l=this.toDataURL(e,t);return f.scale(1/n,1/n),this.setWidth(r).setHeight(i),a?this._restoreBordersControlsOnGroup(a):u&&this.setActiveObject&&this.setActiveObject(u),this.contextTop&&this.clearContext(this.contextTop),this.renderAll(),l},toDataURLWithMultiplier:function(e,t,n){return this.toDataURL({format:e,multiplier
:t,quality:n})},_tempRemoveBordersControlsFromGroup:function(e){e.origHasControls=e.hasControls,e.origBorderColor=e.borderColor,e.hasControls=!0,e.borderColor="rgba(0,0,0,0)",e.forEachObject(function(e){e.origBorderColor=e.borderColor,e.borderColor="rgba(0,0,0,0)"})},_restoreBordersControlsOnGroup:function(e){e.hideControls=e.origHideControls,e.borderColor=e.origBorderColor,e.forEachObject(function(e){e.borderColor=e.origBorderColor,delete e.origBorderColor})},getCenter:function(){return{top:this.getHeight()/2,left:this.getWidth()/2}},centerObjectH:function(e){return e.set("left",this.getCenter().left),this.renderAll(),this},centerObjectV:function(e){return e.set("top",this.getCenter().top),this.renderAll(),this},centerObject:function(e){return this.centerObjectH(e).centerObjectV(e)},toDatalessJSON:function(e){return this.toDatalessObject(e)},toObject:function(e){return this._toObjectMethod("toObject",e)},toDatalessObject:function(e){return this._toObjectMethod("toDatalessObject",e)},_toObjectMethod:function(e,t){var n={objects:this._objects.map(function(n){var r;this.includeDefaultValues||(r=n.includeDefaultValues,n.includeDefaultValues=!1);var i=n[e](t);return this.includeDefaultValues||(n.includeDefaultValues=r),i},this),background:this.backgroundColor&&this.backgroundColor.toObject?this.backgroundColor.toObject():this.backgroundColor};return this.backgroundImage&&(n.backgroundImage=this.backgroundImage.src,n.backgroundImageOpacity=this.backgroundImageOpacity,n.backgroundImageStretch=this.backgroundImageStretch),this.overlayImage&&(n.overlayImage=this.overlayImage.src,n.overlayImageLeft=this.overlayImageLeft,n.overlayImageTop=this.overlayImageTop),fabric.util.populateWithProperties(this,n,t),n},toSVG:function(e){e||(e={});var t=[];e.suppressPreamble||t.push('<?xml version="1.0" standalone="no" ?>','<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" ','"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">'),t.push("<svg ",'xmlns="http://www.w3.org/2000/svg" ','xmlns:xlink="http://www.w3.org/1999/xlink" ','version="1.1" ','width="',this.width,'" ','height="',this.height,'" ',this.backgroundColor&&!this.backgroundColor.source?'style="background-color: '+this.backgroundColor+'" ':null,'xml:space="preserve">',"<desc>Created with Fabric.js ",fabric.version,"</desc>","<defs>",fabric.createSVGFontFacesMarkup(this.getObjects()),fabric.createSVGRefElementsMarkup(this),"</defs>"),this.backgroundColor&&this.backgroundColor.source&&t.push('<rect x="0" y="0" ','width="',this.backgroundColor.repeat==="repeat-y"||this.backgroundColor.repeat==="no-repeat"?this.backgroundColor.source.width:this.width,'" height="',this.backgroundColor.repeat==="repeat-x"||this.backgroundColor.repeat==="no-repeat"?this.backgroundColor.source.height:this.height,'" fill="url(#backgroundColorPattern)"',"></rect>"),this.backgroundImage&&t.push('<image x="0" y="0" ','width="',this.backgroundImageStretch?this.width:this.backgroundImage.width,'" height="',this.backgroundImageStretch?this.height:this.backgroundImage.height,'" preserveAspectRatio="',this.backgroundImageStretch?"none":"defer",'" xlink:href="',this.backgroundImage.src,'" style="opacity:',this.backgroundImageOpacity,'"></image>'),this.overlayImage&&t.push('<image x="',this.overlayImageLeft,'" y="',this.overlayImageTop,'" width="',this.overlayImage.width,'" height="',this.overlayImage.height,'" xlink:href="',this.overlayImage.src,'"></image>');for(var n=0,r=this.getObjects(),i=r.length;n<i;n++)t.push(r[n].toSVG());return t.push("</svg>"),t.join("")},isEmpty:function(){return this._objects.length===0},remove:function(e){this.getActiveObject()===e&&(this.fire("before:selection:cleared",{target:e}),this.discardActiveObject(),this.fire("selection:cleared"));var t=this._objects,n=t.indexOf(e);return n!==-1&&(t.splice(n,1),this.fire("object:removed",{target:e})),this.renderAll(),e},sendToBack:function(e){return n(this._objects,e),this._objects.unshift(e),this.renderAll()},bringToFront:function(e){return n(this._objects,e),this._objects.push(e),this.renderAll()},sendBackwards:function(e){var t=this._objects.indexOf(e),r=t;if(t!==0){for(var i=t-1;i>=0;--i){var s=e.intersectsWithObject(this._objects[i])||e.isContainedWithinObject(this._objects[i])||this._objects[i].isContainedWithinObject(e);if(s){r=i;break}}n(this._objects,e),this._objects.splice(r,0,e)}return this.renderAll()},bringForward:function(e){var t=this.getObjects(),r=t.indexOf(e),i=r;if(r!==t.length-1){for(var s=r+1,o=this._objects.length;s<o;++s){var u=e.intersectsWithObject(t[s])||e.isContainedWithinObject(this._objects[s])||this._objects[s].isContainedWithinObject(e);if(u){i=s;break}}n(t,e),t.splice(i,0,e)}this.renderAll()},item:function(e){return this.getObjects()[e]},complexity:function(){return this.getObjects().reduce(function(e,t){return e+=t.complexity?t.complexity():0,e},0)},forEachObject:function(e,t){var n=this.getObjects(),r=n.length;while(r--)e.call(t,n[r],r,n);return this},dispose:function(){return this.clear(),this.interactive&&(r(this.upperCanvasEl,"mousedown",this._onMouseDown),r(this.upperCanvasEl,"mousemove",this._onMouseMove),r(fabric.window,"resize",this._onResize)),this},_resizeImageToFit:function(e){var t=e.width||e.offsetWidth,n=this.getWidth()/t;t&&(e.width=t*n)}}),fabric.StaticCanvas.prototype.toString=function(){return"#<fabric.Canvas ("+this.complexity()+"): "+"{ objects: "+this.getObjects().length+" }>"},e(fabric.StaticCanvas,{EMPTY_JSON:'{"objects": [], "background": "white"}',toGrayscale:function(e){var t=e.getContext("2d"),n=t.getImageData(0,0,e.width,e.height),r=n.data,i=n.width,s=n.height,o,u,a,f;for(a=0;a<i;a++)for(f=0;f<s;f++)o=a*4*s+f*4,u=(r[o]+r[o+1]+r[o+2])/3,r[o]=u,r[o+1]=u,r[o+2]=u;t.putImageData(n,0,0)},supports:function(e){var t=fabric.util.createCanvasElement();if(!t||!t.getContext)return null;var n=t.getContext("2d");if(!n)return null;switch(e){case"getImageData":return typeof n.getImageData!="undefined";case"toDataURL":return typeof t.toDataURL!="undefined";case"toDataURLWithQuality":try{return t.toDataURL("image/jpeg",0),!0}catch(r){}return!1;default:return null}}}),fabric.StaticCanvas.prototype.toJSON=fabric.StaticCanvas.prototype.toObject}(),function(e){"use strict";var t=e.fabric||(e.fabric={}),n=t.util.array.min,r=t.util.array.max;if(t.FreeDrawing){t.warn("fabric.FreeDrawing is already defined");return}t.FreeDrawing=t.util.createClass({initialize:function(e){this.canvas=e,this._points=[]},_addPoint:function(e){this._points.push(e)},_reset:function(){this._points.length=0;var e=this.canvas.contextTop;e.strokeStyle=this.canvas.freeDrawingColor,e.lineWidth=this.canvas.freeDrawingLineWidth,e.lineCap=e.lineJoin="round"},_prepareForDrawing:function(e){this.canvas._isCurrentlyDrawing=!0,this.canvas.discardActiveObject().renderAll();var n=new t.Point(e.x,e.y);this._reset(),this._addPoint(n),this.canvas.contextTop.moveTo(n.x,n.y)},_captureDrawingPath:function(e){var n=new t.Point(e.x,e.y);this._addPoint(n)},_render:function(){var e=this.canvas.contextTop;e.beginPath();var t=this._points[0],n=this._points[1];e.moveTo(t.x,t.y);for(var r=1,i=this._points.length;r<i;r++){var s=t.midPointFrom(n);e.quadraticCurveTo(t.x,t.y,s.x,s.y),t=this._points[r],n=this._points[r+1]}e.lineTo(t.x,t.y),e.stroke()},_getSVGPathData:function(){return this.box=this.getPathBoundingBox(this._points),this.convertPointsToSVGPath(this._points,this.box.minx,this.box.maxx,this.box.miny,this.box.maxy)},getPathBoundingBox:function(e){var t=[],i=[],s=e[0],o=e[1],u=s;for(var a=1,f=e.length;a<f;a++){var l=s.midPointFrom(o);t.push(u.x),t.push(l.x),i.push(u.y),i.push(l.y),s=e[a],o=e[a+1],u=l}return t.push(s.x),i.push(s.y),{minx:n(t),miny:n(i),maxx:r(t),maxy:r(i)}},convertPointsToSVGPath:function(e,n,r,i){var s=[],o=new t.Point(e[0].x-n,e[0].y-i),u=new t.Point(e[1].x-n,e[1].y-i);s.push("M ",e[0].x-n," ",e[0].y-i," ");for(var a=1,f=e.length;a<f;a++){var l=o.midPointFrom(u);s.push("Q ",o.x," ",o.y," ",l.x," ",l.y," "),o=new t.Point(e[a].x-n,e[a].y-i),a+1<e.length&&(u=new t.Point(e[a+1].x-n,e[a+1].y-i))}return s.push("L ",o.x," ",o.y," "),s},createPath:function(e){var n=new t.Path(e);return n.fill=null,n.stroke=this.canvas.freeDrawingColor,n.strokeWidth=this.canvas.freeDrawingLineWidth,n},_finalizeAndAddPath:function(){this.canvas._isCurrentlyDrawing=!1;var e=this.canvas.contextTop;e.closePath();var t=this._getSVGPathData().join("");if(t==="M 0 0 Q 0 0 0 0 L 0 0"){this.canvas.renderAll();return}var n=this.box.minx+(this.box.maxx-this.box.minx)/2,r=this.box.miny+(this.box.maxy-this.box.miny)/2;this.canvas.contextTop.arc(n,r,3,0,Math.PI*2,!1);var i=this.createPath(t);i.set({left:n,top:r}),this.canvas.add(i),i.setCoords(),this.canvas.contextTop&&this.canvas.clearContext(this.canvas.contextTop),this.canvas.renderAll(),this.canvas.fire("path:created",{path:i})}})}(typeof exports!="undefined"?exports:this),function(){function f(){}var e=fabric.util.object.extend,t=fabric.util.getPointer,n=fabric.util.degreesToRadians,r=fabric.util.radiansToDegrees,i=Math.atan2,s=Math.abs,o=Math.min,u=Math.max,a=.5;fabric.Canvas=function(e,t){t||(t={}),this._initStatic(e,t),this._initInteractive(),this._createCacheCanvas(),fabric.Canvas.activeInstance=this},f.prototype=fabric.StaticCanvas.prototype,fabric.Canvas.prototype=new f;var l={uniScaleTransform:!1,centerTransform:!1,interactive:!0,selection:!0,selectionColor:"rgba(100, 100, 255, 0.3)",selectionDashArray:[],selectionBorderColor:"rgba(255, 255, 255, 0.3)",selectionLineWidth:1,freeDrawingColor:"rgb(0, 0, 0)",freeDrawingLineWidth:1,hoverCursor:"move",moveCursor:"move",defaultCursor:"default",freeDrawingCursor:"crosshair",rotationCursor:"crosshair",containerClass:"canvas-container",perPixelTargetFind:!1,targetFindTolerance:0,_initInteractive:function(){this._currentTransform=null,this._groupSelector=null,this.freeDrawing=fabric.FreeDrawing&&new fabric.FreeDrawing(this),this._initWrapperElement(),this._createUpperCanvas(),this._initEvents(),this.calcOffset()},_resetCurrentTransform:function(e){var t=this._currentTransform;t.target.set("scaleX",t.original.scaleX),t.target.set("scaleY",t.original.scaleY),t.target.set("left",t.original.left),t.target.set("top",t.original.top),e.altKey||this.centerTransform?(t.originX!=="center"&&(t.originX==="right"?t.mouseXSign=-1:t.mouseXSign=1),t.originY!=="center"&&(t.originY==="bottom"?t.mouseYSign=-1:t.mouseYSign=1),t.originX="center",t.originY="center"):(t.originX=t.original.originX,t.originY=t.original.originY)},containsPoint:function(e,t){var n=this.getPointer(e),r=this._normalizePointer(t,n),i=r.x,s=r.y,o=t._getImageLines(t.oCoords),u=t._findCrossPoints(i,s,o);return u&&u%2===1||t._findTargetCorner(e,this._offset)?!0:!1},_normalizePointer:function(e,t){var n=this.getActiveGroup(),r=t.x,i=t.y,s=n&&e.type!=="group"&&n.contains(e);return s&&(r-=n.left,i-=n.top),{x:r,y:i}},_isTargetTransparent:function(e,t,n){var r=this.contextCache,i=e.hasBorders,s=e.transparentCorners;e.hasBorders=e.transparentCorners=!1,this._draw(r,e),e.hasBorders=i,e.transparentCorners=s,this.targetFindTolerance>0&&(t>this.targetFindTolerance?t-=this.targetFindTolerance:t=0,n>this.targetFindTolerance?n-=this.targetFindTolerance:n=0);var o=!0,u=r.getImageData(t,n,this.targetFindTolerance*2||1,this.targetFindTolerance*2||1);for(var a=3;a<u.data.length;a+=4){var f=u.data[a];o=f<=0;if(o===!1)break}return u=null,this.clearContext(r),o},_shouldClearSelection:function(e){var t=this.findTarget(e),n=this.getActiveGroup();return!t||t&&n&&!n.contains(t)&&n!==t&&!e.shiftKey},_setupCurrentTransform:function(e,r){var i="drag",s,o=t(e,r.canvas.upperCanvasEl);s=r._findTargetCorner(e,this._offset),s&&(i=s==="ml"||s==="mr"?"scaleX":s==="mt"||s==="mb"?"scaleY":s==="mtr"?"rotate":"scale");var u="center",a="center";if(s==="ml"||s==="tl"||s==="bl")u="right";else if(s==="mr"||s==="tr"||s==="br")u="left";if(s==="tl"||s==="mt"||s==="tr")a="bottom";else if(s==="bl"||s==="mb"||s==="br")a="top";s==="mtr"&&(u="center",a="center"),this._currentTransform={target:r,action:i,scaleX:r.scaleX,scaleY:r.scaleY,offsetX:o.x-r.left,offsetY:o.y-r.top,originX:u,originY:a,ex:o.x,ey:o.y,left:r.left,top:r.top,theta:n(r.angle),width:r.width*r.scaleX,mouseXSign:1,mouseYSign:1},this._currentTransform.original={left:r.left,top:r.top,scaleX:r.scaleX,scaleY:r.scaleY,originX:u,originY:a},this._resetCurrentTransform(e)},_shouldHandleGroupLogic:function(e,t){var n=this.getActiveObject();return e.shiftKey&&(this.getActiveGroup()||n&&n!==t)&&this.selection},_handleGroupLogic:function(e,t){if(t===this.getActiveGroup()){t=this.findTarget(e,!0);if(!t||t.isType("group"))return}var n=this.getActiveGroup();if(n)n.contains(t)?(n.removeWithUpdate(t),this._resetObjectTransform(n),t.setActive(!1),n.size()===1&&this.discardActiveGroup()):(n.addWithUpdate(t),this._resetObjectTransform(n)),this.fire("selection:created",{target:n,e:e}),n.setActive(!0);else{if(this._activeObject&&t!==this._activeObject){var r=new fabric.Group([this._activeObject,t]);this.setActiveGroup(r),n=this.getActiveGroup()}t.setActive(!0)}n&&n.saveCoords()},_translateObject:function(e,t){var n=this._currentTransform.target;n.get("lockMovementX")||n.set("left",e-this._currentTransform.offsetX),n.get("lockMovementY")||n.set("top",t-this._currentTransform.offsetY)},_scaleObject:function(e,t,n){var r=this._currentTransform,i=this._offset,s=r.target,o=s.get("lockScalingX"),u=s.get("lockScalingY");if(o&&u)return;var a=s.translateToOriginPoint(s.getCenterPoint(),r.originX,r.originY),f=s.toLocalPoint(new fabric.Point(e-i.left,t-i.top),r.originX,r.originY);r.originX==="right"?f.x*=-1:r.originX==="center"&&(f.x*=r.mouseXSign*2,f.x<0&&(r.mouseXSign=-r.mouseXSign)),r.originY==="bottom"?f.y*=-1:r.originY==="center"&&(f.y*=r.mouseYSign*2,f.y<0&&(r.mouseYSign=-r.mouseYSign));var l=s.scaleX,c=s.scaleY;if(n==="equally"&&!o&&!u){var h=f.y+f.x,p=s.height*r.original.scaleY+s.width*r.original.scaleX+s.padding*2-s.strokeWidth*2+1;l=r.original.scaleX*h/p,c=r.original.scaleY*h/p,s.set("scaleX",l),s.set("scaleY",c)}else n?n==="x"&&!s.get("lockUniScaling")?(l=f.x/(s.width+s.padding),o||s.set("scaleX",l)):n==="y"&&!s.get("lockUniScaling")&&(c=f.y/(s.height+s.padding),u||s.set("scaleY",c)):(l=f.x/(s.width+s.padding),c=f.y/(s.height+s.padding),o||s.set("scaleX",l),u||s.set("scaleY",c));l<0&&(r.originX==="left"?r.originX="right":r.originX==="right"&&(r.originX="left")),c<0&&(r.originY==="top"?r.originY="bottom":r.originY==="bottom"&&(r.originY="top")),s.setPositionByOrigin(a,r.originX,r.originY)},_rotateObject:function(e,t){var n=this._currentTransform,s=this._offset;if(n.target.get("lockRotation"))return;var o=i(n.ey-n.top-s.top,n.ex-n.left-s.left),u=i(t-n.top-s.top,e-n.left-s.left);n.target.angle=r(u-o+n.theta)},_setCursor:function(e){this.upperCanvasEl.style.cursor=e},_resetObjectTransform:function(e){e.scaleX=1,e.scaleY=1,e.setAngle(0)},_drawSelection:function(){var e=this.contextTop,t=this._groupSelector,n=t.left,r=t.top,i=s(n),o=s(r);e.fillStyle=this.selectionColor,e.fillRect(t.ex-(n>0?0:-n),t.ey-(r>0?0:-r),i,o),e.lineWidth=this.selectionLineWidth,e.strokeStyle=this.selectionBorderColor;if(this.selectionDashArray.length>1){var u=t.ex+a-(n>0?0:i),f=t.ey+a-(r>0?0:o);e.beginPath(),fabric.util.drawDashedLine(e,u,f,u+i,f,this.selectionDashArray),fabric.util.drawDashedLine(e,u,f+o-1,u+i,f+o-1,this.selectionDashArray),fabric.util.drawDashedLine(e,u,f,u,f+o,this.selectionDashArray),fabric.util.drawDashedLine(e,u+i-1,f,u+i-1,f+o,this.selectionDashArray),e.closePath(),e.stroke()}else e.strokeRect(t.ex+a-(n>0?0:i),t.ey+a-(r>0?0:o),i,o)},_findSelectedObjects:function(e){var t=[],n=this._groupSelector.ex,r=this._groupSelector.ey,i=n+this._groupSelector.left,s=r+this._groupSelector.top,a,f=new fabric.Point(o(n,i),o(r,s)),l=new fabric.Point(u(n,i),u(r,s));for(var c=0,h=this._objects.length;c<h;++c){a=this._objects[c];if(!a)continue;(a.intersectsWithRect(f,l)||a.isContainedWithinRect(f,l))&&this.selection&&a.selectable&&(a.setActive(!0),t.push(a))}t.length===1?this.setActiveObject(t[0],e):t.length>1&&(t=new fabric.Group(t),this.setActiveGroup(t),t.saveCoords(),this.fire("selection:created",{target:t})),this.renderAll()},findTarget:function(e,t){var n,r=this.getPointer(e);if(this.controlsAboveOverlay&&this.lastRenderedObjectWithControlsAboveOverlay&&this.containsPoint(e,this.lastRenderedObjectWithControlsAboveOverlay)&&this.lastRenderedObjectWithControlsAboveOverlay._findTargetCorner(e,this._offset))return n=this.lastRenderedObjectWithControlsAboveOverlay,n;var i=this.getActiveGroup();if(i&&!t&&this.containsPoint(e,i))return n=i,n;var s=[];for(var o=this._objects.length;o--;)if(this._objects[o]&&this.containsPoint(e,this._objects[o])){if(!this.perPixelTargetFind&&!this._objects[o].perPixelTargetFind){n=this._objects[o],this.relatedTarget=n;break}s[s.length]=this._objects[o]}for(var u=0,a=s.length;u<a;u++){r=this.getPointer(e);var f=this._isTargetTransparent(s[u],r.x,r.y);if(!f){n=s[u],this.relatedTarget=n;break}}if(n&&n.selectable)return n},getPointer:function(e){var n=t(e,this.upperCanvasEl);return{x:n.x-this._offset.left,y:n.y-this._offset.top}},_createUpperCanvas:function(){this.upperCanvasEl=this._createCanvasElement(),this.upperCanvasEl.className="upper-canvas",this.wrapperEl.appendChild(this.upperCanvasEl),this._applyCanvasStyle(this.upperCanvasEl),this.contextTop=this.upperCanvasEl.getContext("2d")},_createCacheCanvas:function(){this.cacheCanvasEl=this._createCanvasElement(),this.cacheCanvasEl.setAttribute("width",this.width),this.cacheCanvasEl.setAttribute("height",this.height),this.contextCache=this.cacheCanvasEl.getContext("2d")},_initWrapperElement:function(){this.wrapperEl=fabric.util.wrapElement(this.lowerCanvasEl,"div",{"class":this.containerClass}),fabric.util.setStyle(this.wrapperEl,{width:this.getWidth()+"px",height:this.getHeight()+"px",position:"relative"}),fabric.util.makeElementUnselectable(this.wrapperEl)},_applyCanvasStyle:function(e){var t=this.getWidth()||e.width,n=this.getHeight()||e.height;fabric.util.setStyle(e,{position:"absolute",width:t+"px",height:n+"px",left:0,top:0}),e.width=t,e.height=n,fabric.util.makeElementUnselectable(e)},getSelectionContext:function(){return this.contextTop},getSelectionElement:function(){return this.upperCanvasEl},setActiveObject:function(e,t){return this._activeObject&&this._activeObject.setActive(!1),this._activeObject=e,e.setActive(!0),this.renderAll(),this.fire("object:selected",{target:e,e:t}),e.fire("selected",{e:t}),this},getActiveObject:function(){return this._activeObject},discardActiveObject:function(){return this._activeObject&&this._activeObject.setActive(!1),this._activeObject=null,this},setActiveGroup:function(e){return this._activeGroup=e,e&&(e.canvas=this,e.setActive(!0)),this},getActiveGroup:function(){return this._activeGroup},discardActiveGroup:function(){var e=this.getActiveGroup();return e&&e.destroy(),this.setActiveGroup(null)},deactivateAll:function(){var e=this.getObjects(),t=0,n=e.length;for(;t<n;t++)e[t].setActive(!1);return this.discardActiveGroup(),this.discardActiveObject(),this},deactivateAllWithDispatch:function(){var e=this.getActiveGroup()||this.getActiveObject();return e&&this.fire("before:selection:cleared",{target:e}),this.deactivateAll(),e&&this.fire("selection:cleared"),this}};fabric.Canvas.prototype.toString=fabric.StaticCanvas.prototype.toString,e(fabric.Canvas.prototype,l);for(var c in fabric.StaticCanvas)c!=="prototype"&&(fabric.Canvas[c]=fabric.StaticCanvas[c]);fabric.isTouchSupported&&(fabric.Canvas.prototype._setCursorFromEvent=function(){}),fabric.Element=fabric.Canvas}(),function(){var e={tr:"ne-resize",br:"se-resize",bl:"sw-resize",tl:"nw-resize",ml:"w-resize",mt:"n-resize",mr:"e-resize",mb:"s-resize"},t=fabric.util.addListener,n=fabric.util.removeListener,r=fabric.util.getPointer;fabric.util.object.extend(fabric.Canvas.prototype,{_initEvents:function(){var e=this;this._onMouseDown=this._onMouseDown.bind(this),this._onMouseMove=this._onMouseMove.bind(this),this._onMouseUp=this._onMouseUp.bind(this),this._onResize=this._onResize.bind(this),t(fabric.window,"resize",this._onResize),fabric.isTouchSupported?(t(this.upperCanvasEl,"touchstart",this._onMouseDown),t(this.upperCanvasEl,"touchmove",this._onMouseMove),typeof Event!="undefined"&&"add"in Event&&Event.add(this.upperCanvasEl,"gesture",function(t,n){e.__onTransformGesture(t,n)})):(t(this.upperCanvasEl,"mousedown",this._onMouseDown),t(this.upperCanvasEl,"mousemove",this._onMouseMove))},_onMouseDown:function(e){this.__onMouseDown(e),!fabric.isTouchSupported&&t(fabric.document,"mouseup",this._onMouseUp),fabric.isTouchSupported&&t(fabric.document,"touchend",this._onMouseUp),!fabric.isTouchSupported&&t(fabric.document,"mousemove",this._onMouseMove),fabric.isTouchSupported&&t(fabric.document,"touchmove",this._onMouseMove),!fabric.isTouchSupported&&n(this.upperCanvasEl,"mousemove",this._onMouseMove),fabric.isTouchSupported&&n(this.upperCanvasEl,"touchmove",this._onMouseMove)},_onMouseUp:function(e){this.__onMouseUp(e),!fabric.isTouchSupported&&n(fabric.document,"mouseup",this._onMouseUp),fabric.isTouchSupported&&n(fabric.document,"touchend",this._onMouseUp),!fabric.isTouchSupported&&n(fabric.document,"mousemove",this._onMouseMove),fabric.isTouchSupported&&n(fabric.document,"touchmove",this._onMouseMove),!fabric.isTouchSupported&&t(this.upperCanvasEl,"mousemove",this._onMouseMove),fabric.isTouchSupported&&t(this.upperCanvasEl,"touchmove",this._onMouseMove)},_onMouseMove:function(e){e.preventDefault&&e.preventDefault(),this.__onMouseMove(e)},_onResize:function(){this.calcOffset()},__onMouseUp:function(e){var t;if(this.isDrawingMode&&this._isCurrentlyDrawing){this.freeDrawing._finalizeAndAddPath(),this.fire("mouse:up",{e:e});return}if(this._currentTransform){var n=this._currentTransform;t=n.target,t._scaling&&(t._scaling=!1);var r=this._objects.length;while(r--)this._objects[r].setCoords();t.isMoving=!1,this.stateful&&t.hasStateChanged()&&(this.fire("object:modified",{target:t}),t.fire("modified")),this._previousOriginX&&(this._currentTransform.target.adjustPosition(this._previousOriginX),this._previousOriginX=null)}this._currentTransform=null,this._groupSelector&&this._findSelectedObjects(e);var i=this.getActiveGroup();i&&(i.setObjectsCoords(),i.set("isMoving",!1),this._setCursor(this.defaultCursor)),this._groupSelector=null,this.renderAll(),this._setCursorFromEvent(e,t),this._setCursor("");var s=this;setTimeout(function(){s._setCursorFromEvent(e,t)},50),this.fire("mouse:up",{target:t,e:e}),t&&t.fire("mouseup",{e:e})},__onMouseDown:function(e){var t,n="which"in e?e.which===1:e.button===1;if(!n&&!fabric.isTouchSupported)return;if(this.isDrawingMode){t=this.getPointer(e),this.freeDrawing._prepareForDrawing(t),this.freeDrawing._captureDrawingPath(t),this.fire("mouse:down",{e:e});return}if(this._currentTransform)return;var r=this.findTarget(e),i;t=this.getPointer(e),this._shouldClearSelection(e)?(this._groupSelector={ex:t.x,ey:t.y,top:0,left:0},this.deactivateAllWithDispatch()):(this.stateful&&r.saveState(),(i=r._findTargetCorner(e,this._offset))&&this.onBeforeScaleRotate(r),this._shouldHandleGroupLogic(e,r)?(this._handleGroupLogic(e,r),r=this.getActiveGroup()):(r!==this.getActiveGroup()&&this.deactivateAll(),this.setActiveObject(r,e)),this._setupCurrentTransform(e,r)),this.renderAll(),this.fire("mouse:down",{target:r,e:e}),r&&r.fire("mousedown",{e:e}),i==="mtr"&&(this._previousOriginX=this._currentTransform.target.originX,this._currentTransform.target.adjustPosition("center"),this._currentTransform.left=this._currentTransform.target.left,this._currentTransform.top=this._currentTransform.target.top)},__onMouseMove:function(e){var t,n;if(this.isDrawingMode){this._isCurrentlyDrawing&&(n=this.getPointer(e),this.freeDrawing._captureDrawingPath(n),this.clearContext(this.contextTop),this.freeDrawing._render(this.contextTop)),this.upperCanvasEl.style.cursor=this.freeDrawingCursor,this.fire("mouse:move",{e:e});return}var i=this._groupSelector;if(i!==null)n=r(e,this.upperCanvasEl),i.left=n.x-this._offset.left-i.ex,i.top=n.y-this._offset.top-i.ey,this.renderTop();else if(!this._currentTransform){var s=this.upperCanvasEl.style;t=this.findTarget(e);if(!t){for(var o=this._objects.length;o--;)this._objects[o]&&!this._objects[o].active&&this._objects[o].setActive(!1);s.cursor=this.defaultCursor}else this._setCursorFromEvent(e,t)}else{n=r(e,this.upperCanvasEl);var u=n.x,a=n.y;this._currentTransform.target.isMoving=!0;var f=this._currentTransform,l=!1;(f.action==="scale"||f.action==="scaleX"||f.action==="scaleY")&&(e.altKey&&(f.originX!=="center"||f.originY!=="center")||!e.altKey&&f.originX==="center"&&f.originY==="center")&&(this._resetCurrentTransform(e),l=!0),this._currentTransform.action==="rotate"?(this._rotateObject(u,a),this.fire("object:rotating",{target:this._currentTransform.target,e:e}),this._currentTransform.target.fire("rotating")):this._currentTransform.action==="scale"?(e.shiftKey||this.uniScaleTransform?(this._currentTransform.currentAction="scale",this._scaleObject(u,a)):(!l&&f.currentAction==="scale"&&this._resetCurrentTransform(e),this._currentTransform.currentAction="scaleEqually",this._scaleObject(u,a,"equally")),this.fire("object:scaling",{target:this._currentTransform.target,e:e})):this._currentTransform.action==="scaleX"?(this._scaleObject(u,a,"x"),this.fire("object:scaling",{target:this._currentTransform.target,e:e}),this._currentTransform.target.fire("scaling",{e:e})):this._currentTransform.action==="scaleY"?(this._scaleObject(u,a,"y"),this.fire("object:scaling",{target:this._currentTransform.target,e:e}),this._currentTransform.target.fire("scaling",{e:e})):(this._translateObject(u,a),this.fire("object:moving",{target:this._currentTransform.target,e:e}),this._setCursor(this.moveCursor),this._currentTransform.target.fire("moving",{e:e})),this.renderAll()}this.fire("mouse:move",{target:t,e:e}),t&&t.fire("mousemove",{e:e})},_setCursorFromEvent:function(t,n){var r=this.upperCanvasEl.style;if(!n)return r.cursor=this.defaultCursor,!1;var i=this.getActiveGroup(),s=n._findTargetCorner&&(!i||!i.contains(n))&&n._findTargetCorner(t,this._offset);if(!s)r.cursor=this.hoverCursor;else if(s in e)r.cursor=e[s];else{if(s!=="mtr"||!n.hasRotatingPoint)return r.cursor=this.defaultCursor,!1;r.cursor=this.rotationCursor}return!0}})}(),fabric.util.object.extend(fabric.StaticCanvas.prototype,{FX_DURATION:500,fxCenterObjectH:function(e,t){t=t||{};var n=function(){},r=t.onComplete||n,i=t.onChange||n,s=this;return fabric.util.animate({startValue:e.get("left"),endValue:this.getCenter().left,duration:this.FX_DURATION,onChange:function(t){e.set("left",t),s.renderAll(),i()},onComplete:function(){e.setCoords(),r()}}),this},fxCenterObjectV:function(e,t){t=t||{};var n=function(){},r=t.onComplete||n,i=t.onChange||n,s=this;return fabric.util.animate({startValue:e.get("top"),endValue:this.getCenter().top,duration:this.FX_DURATION,onChange:function(t){e.set("top",t),s.renderAll(),i()},onComplete:function(){e.setCoords(),r()}}),this},fxRemove:function(e,t){t=t||{};var n=function(){},r=t.onComplete||n,i=t.onChange||n,s=this;return fabric.util.animate({startValue:e.get("opacity"),endValue:0,duration:this.FX_DURATION,onStart:function(){e.setActive(!1)},onChange:function(t){e.set("opacity",t),s.renderAll(),i()},onComplete:function(){s.remove(e),r()}}),this}}),fabric.util.object.extend(fabric.StaticCanvas.prototype,{loadFromDatalessJSON:function(e,t){if(!e)return;var n=typeof e=="string"?JSON.parse(e):e;if(!n||n&&!n.objects)return;this.clear();var r=this;this._enlivenDatalessObjects(n.objects,function(){r._setBgOverlayImages(n,t)})},_enlivenDatalessObjects:function(e,t){function s(e,s){n.insertAt(e,s,!0),e.setCoords(),++r===i&&t&&t()}function o(e,t){var n=e.paths?"paths":"path",r=e[n];delete e[n];if(typeof r!="string")if(e.type==="image"||e.type==="group")fabric[fabric.util.string.capitalize(e.type)].fromObject(e,function(e){s(e,t)});else{var i=fabric[fabric.util.string.camelize(fabric.util.string.capitalize(e.type))];if(!i||!i.fromObject)return;r&&(e[n]=r),s(i.fromObject(e),t)}else if(e.type==="image")fabric.util.loadImage(r,function(n){var i=new fabric.Image(n);i.setSourcePath(r),fabric.util.object.extend(i,e),i.setAngle(e.angle),s(i,t)});else if(e.type==="text")if(e.useNative)s(fabric.Text.fromObject(e),t);else{e.path=r;var o=fabric.Text.fromObject(e),u=function(){Object.prototype.toString.call(fabric.window.opera)==="[object Opera]"?setTimeout(function(){s(o,t)},500):s(o,t)};fabric.util.getScript(r,u)}else fabric.loadSVGFromURL(r,function(n){var i=fabric.util.groupSVGElements(n,e,r);i instanceof fabric.PathGroup||(fabric.util.object.extend(i,e),typeof e.angle!="undefined"&&i.setAngle(e.angle)),s(i,t)})}var n=this,r=0,i=e.length;i===0&&t&&t();try{e.forEach(o,this)}catch(u){fabric.log(u)}},loadFromJSON:function(e,t){if(!e)return;var n=typeof e=="string"?JSON.parse(e):e,r=this;return this._enlivenObjects(n.objects,function(){r._setBgOverlayImages(n,t)}),this},_setBgOverlayImages:function(e,t){var n=this,r,i,s;e.backgroundImage?this.setBackgroundImage(e.backgroundImage,function(){n.backgroundImageOpacity=e.backgroundImageOpacity,n.backgroundImageStretch=e.backgroundImageStretch,n.renderAll(),i=!0,t&&s&&r&&t()}):i=!0,e.overlayImage?this.setOverlayImage(e.overlayImage,function(){n.overlayImageLeft=e.overlayImageLeft||0,n.overlayImageTop=e.overlayImageTop||0,n.renderAll(),s=!0,t&&i&&r&&t()}):s=!0,e.background?this.setBackgroundColor(e.background,function(){n.renderAll(),r=!0,t&&s&&i&&t()}):r=!0,!e.backgroundImage&&!e.overlayImage&&!e.background&&t&&t()},_enlivenObjects:function(e,t){var n=this;fabric.util.enlivenObjects(e,function(e){e.forEach(function(e,t){n.insertAt(e,t,!0)}),t&&t()})},_toDataURL:function(e,t){this.clone(function(n){t(n.toDataURL(e))})},_toDataURLWithMultiplier:function(e,t,n){this.clone(function(r){n(r.toDataURLWithMultiplier(e,t))})},clone:function(e){var t=JSON.stringify(this);this.cloneWithoutData(function(n){n.loadFromJSON(t,function(){e&&e(n)})})},cloneWithoutData:function(e){var t=fabric.document.createElement("canvas");t.width=this.getWidth(),t.height=this.getHeight();var n=new fabric.Canvas(t);n.clipTo=this.clipTo,this.backgroundImage?(n.setBackgroundImage(this.backgroundImage.src,function(){n.renderAll(),e&&e(n)}),n.backgroundImageOpacity=this.backgroundImageOpacity,n.backgroundImageStretch=this.backgroundImageStretch):e&&e(n)}}),function(e){"use strict";var t=e.fabric||(e.fabric={}),n=t.util.object.extend,r=t.util.toFixed,i=t.util.string.capitalize,s=t.util.degreesToRadians;if(t.Object)return;var o=e.Image;try{var u=typeof require!="undefined"&&require("canvas").Image;u&&(o=u)}catch(a){t.log(a)}t.Object=t.util.createClass({type:"object",originX:"center",originY:"center",top:0,left:0,width:0,height:0,scaleX:1,scaleY:1,flipX:!1,flipY:!1,opacity:1,angle:0,cornerSize:12,transparentCorners:!0,padding:0,borderColor:"rgba(102,153,255,0.75)",cornerColor:"rgba(102,153,255,0.5)",fill:"rgb(0,0,0)",fillRule:"source-over",overlayFill:null,stroke:null,strokeWidth:1,strokeDashArray:null,shadow:null,borderOpacityWhenMoving:.4,borderScaleFactor:1,transformMatrix:null,minScaleLimit:.01,selectable:!0,visible:!0,hasControls:!0,hasBorders:!0,hasRotatingPoint:!0,rotatingPointOffset:40,perPixelTargetFind:!1,includeDefaultValues:!0,clipTo:null,stateProperties:"top left width height scaleX scaleY flipX flipY angle opacity cornerSize fill overlayFill originX originY stroke strokeWidth strokeDashArray fillRule borderScaleFactor transformMatrix selectable shadow visible".split(" "),initialize:function(e){e&&this.setOptions(e)},_initGradient:function(e){e.fill&&e.fill.colorStops&&!(e.fill instanceof t.Gradient)&&this.set("fill",new t.Gradient(e.fill))},_initPattern:function(e){e.fill&&e.fill.source&&!(e.fill instanceof t.Pattern)&&this.set("fill",new t.Pattern(e.fill)),e.stroke&&e.stroke.source&&!(e.stroke instanceof t.Pattern)&&this.set("stroke",new t.Pattern(e.stroke))},_initShadow:function(e){e.shadow&&!(e.shadow instanceof t.Shadow)&&this.setShadow(e.shadow)},setOptions:function(e){for(var t in e)this.set(t,e[t]);this._initGradient(e),this._initPattern(e),this._initShadow(e)},transform:function(e){e.globalAlpha=this.opacity;var t=this.getCenterPoint();e.translate(t.x,t.y),e.rotate(s(this.angle)),e.scale(this.scaleX*(this.flipX?-1:1),this.scaleY*(this.flipY?-1:1))},toObject:function(e){var n=t.Object.NUM_FRACTION_DIGITS,i={type:this.type,originX:this.originX,originY:this.originY,left:r(this.left,n),top:r(this.top,n),width:r(this.width,n),height:r(this.height,n),fill:this.fill&&this.fill.toObject?this.fill.toObject():this.fill,overlayFill:this.overlayFill,stroke:this.stroke&&this.stroke.toObject?this.stroke.toObject():this.stroke,strokeWidth:this.strokeWidth,strokeDashArray:this.strokeDashArray,scaleX:r(this.scaleX,n),scaleY:r(this.scaleY,n),angle:r(this.getAngle
(),n),flipX:this.flipX,flipY:this.flipY,opacity:r(this.opacity,n),selectable:this.selectable,hasControls:this.hasControls,hasBorders:this.hasBorders,hasRotatingPoint:this.hasRotatingPoint,transparentCorners:this.transparentCorners,perPixelTargetFind:this.perPixelTargetFind,shadow:this.shadow&&this.shadow.toObject?this.shadow.toObject():this.shadow,visible:this.visible};return this.includeDefaultValues||(i=this._removeDefaultValues(i)),t.util.populateWithProperties(this,i,e),i},toDatalessObject:function(e){return this.toObject(e)},getSvgStyles:function(){return["stroke: ",this.stroke?this.stroke:"none","; ","stroke-width: ",this.strokeWidth?this.strokeWidth:"0","; ","stroke-dasharray: ",this.strokeDashArray?this.strokeDashArray.join(" "):"; ","fill: ",this.fill?this.fill&&this.fill.toLive?"url(#SVGID_"+this.fill.id+")":this.fill:"none","; ","opacity: ",this.opacity?this.opacity:"1",";",this.visible?"":" visibility: hidden;"].join("")},getSvgTransform:function(){var e=this.getAngle(),n=this.getCenterPoint(),i=t.Object.NUM_FRACTION_DIGITS,s="translate("+r(n.x,i)+" "+r(n.y,i)+")",o=e!==0?" rotate("+r(e,i)+")":"",u=this.scaleX===1&&this.scaleY===1?"":" scale("+r(this.scaleX,i)+" "+r(this.scaleY,i)+")",a=this.flipX?"matrix(-1 0 0 1 0 0) ":"",f=this.flipY?"matrix(1 0 0 -1 0 0)":"";return[s,o,u,a,f].join("")},_removeDefaultValues:function(e){var n=t.Object.prototype.options;return n&&this.stateProperties.forEach(function(t){e[t]===n[t]&&delete e[t]}),e},isActive:function(){return!!this.active},setActive:function(e){return this.active=!!e,this},toString:function(){return"#<fabric."+i(this.type)+">"},get:function(e){return this[e]},set:function(e,t){if(typeof e=="object")for(var n in e)this._set(n,e[n]);else typeof t=="function"?this._set(e,t(this.get(e))):this._set(e,t);return this},_set:function(e,t){var n=e==="scaleX"||e==="scaleY";n&&(t=this._constrainScale(t));if(e==="scaleX"&&t<0)this.flipX=!this.flipX,t*=-1;else if(e==="scaleY"&&t<0)this.flipY=!this.flipY,t*=-1;else if(e==="width"||e==="height")this.minScaleLimit=r(Math.min(.1,1/Math.max(this.width,this.height)),2);return this[e]=t,this},toggle:function(e){var t=this.get(e);return typeof t=="boolean"&&this.set(e,!t),this},setSourcePath:function(e){return this.sourcePath=e,this},render:function(e,n){if(this.width===0||this.height===0||!this.visible)return;e.save();var r=this.transformMatrix;r&&!this.group&&e.setTransform(r[0],r[1],r[2],r[3],r[4],r[5]),n||this.transform(e);if(this.stroke||this.strokeDashArray)e.lineWidth=this.strokeWidth,this.stroke&&this.stroke.toLive?e.strokeStyle=this.stroke.toLive(e):e.strokeStyle=this.stroke;this.overlayFill?e.fillStyle=this.overlayFill:this.fill&&(e.fillStyle=this.fill.toLive?this.fill.toLive(e):this.fill),r&&this.group&&(e.translate(-this.group.width/2,-this.group.height/2),e.transform(r[0],r[1],r[2],r[3],r[4],r[5])),this._setShadow(e),this.clipTo&&t.util.clipContext(this,e),this._render(e,n),this.clipTo&&e.restore(),this._removeShadow(e),this.active&&!n&&(this.drawBorders(e),this.drawControls(e)),e.restore()},_setShadow:function(e){if(!this.shadow)return;e.shadowColor=this.shadow.color,e.shadowBlur=this.shadow.blur,e.shadowOffsetX=this.shadow.offsetX,e.shadowOffsetY=this.shadow.offsetY},_removeShadow:function(e){e.shadowColor="",e.shadowBlur=e.shadowOffsetX=e.shadowOffsetY=0},clone:function(e,n){return this.constructor.fromObject?this.constructor.fromObject(this.toObject(n),e):new t.Object(this.toObject(n))},cloneAsImage:function(e){if(t.Image){var n=new o;n.onload=function(){e&&e(new t.Image(n),r),n=n.onload=null};var r={angle:this.getAngle(),flipX:this.getFlipX(),flipY:this.getFlipY()};this.set({angle:0,flipX:!1,flipY:!1}),this.toDataURL(function(e){n.src=e})}return this},toDataURL:function(e){function i(t){t.left=n.width/2,t.top=n.height/2,t.setActive(!1),r.add(t);var i=r.toDataURL();r.dispose(),r=t=null,e&&e(i)}var n=t.util.createCanvasElement();n.width=this.getBoundingRectWidth(),n.height=this.getBoundingRectHeight(),t.util.wrapElement(n,"div");var r=new t.Canvas(n);r.backgroundColor="transparent",r.renderAll(),this.constructor.async?this.clone(i):i(this.clone())},hasStateChanged:function(){return this.stateProperties.some(function(e){return this[e]!==this.originalState[e]},this)},saveState:function(e){return this.stateProperties.forEach(function(e){this.originalState[e]=this.get(e)},this),e&&e.stateProperties&&e.stateProperties.forEach(function(e){this.originalState[e]=this.get(e)},this),this},setupState:function(){this.originalState={},this.saveState()},isType:function(e){return this.type===e},toGrayscale:function(){var e=this.get("fill");return e&&this.set("overlayFill",(new t.Color(e)).toGrayscale().toRgb()),this},complexity:function(){return 0},toJSON:function(e){return this.toObject(e)},setGradient:function(e,n){n||(n={});var r={colorStops:[]};r.type=n.type||(n.r1||n.r2?"radial":"linear"),r.coords={x1:n.x1,y1:n.y1,x2:n.x2,y2:n.y2};if(n.r1||n.r2)r.coords.r1=n.r1,r.coords.r2=n.r2;for(var i in n.colorStops){var s=new t.Color(n.colorStops[i]);r.colorStops.push({offset:i,color:s.toRgb(),opacity:s.getAlpha()})}this.set(e,t.Gradient.forObject(this,r))},setPatternFill:function(e){this.set("fill",new t.Pattern(e))},setShadow:function(e){this.set("shadow",new t.Shadow(e))},animate:function(){if(arguments[0]&&typeof arguments[0]=="object")for(var e in arguments[0])this._animate(e,arguments[0][e],arguments[1]);else this._animate.apply(this,arguments);return this},_animate:function(e,n,r){var i=this,s;n=n.toString(),r?r=t.util.object.clone(r):r={},~e.indexOf(".")&&(s=e.split("."));var o=s?this.get(s[0])[s[1]]:this.get(e);"from"in r||(r.from=o),~n.indexOf("=")?n=o+parseFloat(n.replace("=","")):n=parseFloat(n),t.util.animate({startValue:r.from,endValue:n,byValue:r.by,easing:r.easing,duration:r.duration,onChange:function(t){s?i[s[0]][s[1]]=t:i.set(e,t),r.onChange&&r.onChange()},onComplete:function(){i.setCoords(),r.onComplete&&r.onComplete()}})},centerH:function(){return this.canvas.centerObjectH(this),this},centerV:function(){return this.canvas.centerObjectV(this),this},center:function(){return this.centerH().centerV()},remove:function(){return this.canvas.remove(this)},sendToBack:function(){return this.canvas.sendToBack(this),this},bringToFront:function(){return this.canvas.bringToFront(this),this},sendBackwards:function(){return this.canvas.sendBackwards(this),this},bringForward:function(){return this.canvas.bringForward(this),this}}),t.util.createAccessors(t.Object),t.Object.prototype.rotate=t.Object.prototype.setAngle,n(t.Object.prototype,t.Observable),t.Object.NUM_FRACTION_DIGITS=2,t.Object.__uid=0}(typeof exports!="undefined"?exports:this),function(){var e=fabric.util.degreesToRadians;fabric.util.object.extend(fabric.Object.prototype,{translateToCenterPoint:function(t,n,r){var i=t.x,s=t.y;return n==="left"?i=t.x+this.getWidth()/2:n==="right"&&(i=t.x-this.getWidth()/2),r==="top"?s=t.y+this.getHeight()/2:r==="bottom"&&(s=t.y-this.getHeight()/2),fabric.util.rotatePoint(new fabric.Point(i,s),t,e(this.angle))},translateToOriginPoint:function(t,n,r){var i=t.x,s=t.y;return n==="left"?i=t.x-this.getWidth()/2:n==="right"&&(i=t.x+this.getWidth()/2),r==="top"?s=t.y-this.getHeight()/2:r==="bottom"&&(s=t.y+this.getHeight()/2),fabric.util.rotatePoint(new fabric.Point(i,s),t,e(this.angle))},getCenterPoint:function(){return this.translateToCenterPoint(new fabric.Point(this.left,this.top),this.originX,this.originY)},toLocalPoint:function(t,n,r){var i=this.getCenterPoint(),s,o;return n!==undefined&&r!==undefined?(n==="left"?s=i.x-this.getWidth()/2:n==="right"?s=i.x+this.getWidth()/2:s=i.x,r==="top"?o=i.y-this.getHeight()/2:r==="bottom"?o=i.y+this.getHeight()/2:o=i.y):(s=this.left,o=this.top),fabric.util.rotatePoint(new fabric.Point(t.x,t.y),i,-e(this.angle)).subtractEquals(new fabric.Point(s,o))},setPositionByOrigin:function(e,t,n){var r=this.translateToCenterPoint(e,t,n),i=this.translateToOriginPoint(r,this.originX,this.originY);this.set("left",i.x),this.set("top",i.y)},adjustPosition:function(t){var n=e(this.angle),r=this.getWidth()/2,i=Math.cos(n)*r,s=Math.sin(n)*r,o=this.getWidth(),u=Math.cos(n)*o,a=Math.sin(n)*o;this.originX==="center"&&t==="left"||this.originX==="right"&&t==="center"?(this.left-=i,this.top-=s):this.originX==="left"&&t==="center"||this.originX==="center"&&t==="right"?(this.left+=i,this.top+=s):this.originX==="left"&&t==="right"?(this.left+=u,this.top+=a):this.originX==="right"&&t==="left"&&(this.left-=u,this.top-=a),this.setCoords(),this.originX=t}})}(),function(){var e=fabric.util.degreesToRadians;fabric.util.object.extend(fabric.Object.prototype,{intersectsWithRect:function(e,t){var n=this.oCoords,r=new fabric.Point(n.tl.x,n.tl.y),i=new fabric.Point(n.tr.x,n.tr.y),s=new fabric.Point(n.bl.x,n.bl.y),o=new fabric.Point(n.br.x,n.br.y),u=fabric.Intersection.intersectPolygonRectangle([r,i,o,s],e,t);return u.status==="Intersection"},intersectsWithObject:function(e){function t(e){return{tl:new fabric.Point(e.tl.x,e.tl.y),tr:new fabric.Point(e.tr.x,e.tr.y),bl:new fabric.Point(e.bl.x,e.bl.y),br:new fabric.Point(e.br.x,e.br.y)}}var n=t(this.oCoords),r=t(e.oCoords),i=fabric.Intersection.intersectPolygonPolygon([n.tl,n.tr,n.br,n.bl],[r.tl,r.tr,r.br,r.bl]);return i.status==="Intersection"},isContainedWithinObject:function(e){return this.isContainedWithinRect(e.oCoords.tl,e.oCoords.br)},isContainedWithinRect:function(e,t){var n=this.oCoords,r=new fabric.Point(n.tl.x,n.tl.y),i=new fabric.Point(n.tr.x,n.tr.y),s=new fabric.Point(n.bl.x,n.bl.y);return r.x>e.x&&i.x<t.x&&r.y>e.y&&s.y<t.y},getBoundingRectWidth:function(){return this.getBoundingRect().width},getBoundingRectHeight:function(){return this.getBoundingRect().height},getBoundingRect:function(){this.oCoords||this.setCoords();var e=[this.oCoords.tl.x,this.oCoords.tr.x,this.oCoords.br.x,this.oCoords.bl.x],t=fabric.util.array.min(e),n=fabric.util.array.max(e),r=Math.abs(t-n),i=[this.oCoords.tl.y,this.oCoords.tr.y,this.oCoords.br.y,this.oCoords.bl.y],s=fabric.util.array.min(i),o=fabric.util.array.max(i),u=Math.abs(s-o);return{left:t,top:s,width:r,height:u}},getWidth:function(){return this.width*this.scaleX},getHeight:function(){return this.height*this.scaleY},_constrainScale:function(e){return Math.abs(e)<this.minScaleLimit?e<0?-this.minScaleLimit:this.minScaleLimit:e},scale:function(e){return e=this._constrainScale(e),e<0&&(this.flipX=!this.flipX,this.flipY=!this.flipY,e*=-1),this.scaleX=e,this.scaleY=e,this.setCoords(),this},scaleToWidth:function(e){var t=this.getBoundingRectWidth()/this.getWidth();return this.scale(e/this.width/t)},scaleToHeight:function(e){var t=this.getBoundingRectHeight()/this.getHeight();return this.scale(e/this.height/t)},setCoords:function(){var t=this.strokeWidth>1?this.strokeWidth:0,n=this.padding,r=e(this.angle);this.currentWidth=(this.width+t)*this.scaleX+n*2,this.currentHeight=(this.height+t)*this.scaleY+n*2,this.currentWidth<0&&(this.currentWidth=Math.abs(this.currentWidth));var i=Math.sqrt(Math.pow(this.currentWidth/2,2)+Math.pow(this.currentHeight/2,2)),s=Math.atan(this.currentHeight/this.currentWidth),o=Math.cos(s+r)*i,u=Math.sin(s+r)*i,a=Math.sin(r),f=Math.cos(r),l=this.getCenterPoint(),c={x:l.x-o,y:l.y-u},h={x:c.x+this.currentWidth*f,y:c.y+this.currentWidth*a},p={x:h.x-this.currentHeight*a,y:h.y+this.currentHeight*f},d={x:c.x-this.currentHeight*a,y:c.y+this.currentHeight*f},v={x:c.x-this.currentHeight/2*a,y:c.y+this.currentHeight/2*f},m={x:c.x+this.currentWidth/2*f,y:c.y+this.currentWidth/2*a},g={x:h.x-this.currentHeight/2*a,y:h.y+this.currentHeight/2*f},y={x:d.x+this.currentWidth/2*f,y:d.y+this.currentWidth/2*a},b={x:c.x+this.currentWidth/2*f,y:c.y+this.currentWidth/2*a};return this.oCoords={tl:c,tr:h,br:p,bl:d,ml:v,mt:m,mr:g,mb:y,mtr:b},this._setCornerCoords(),this}})}(),function(){var e=fabric.util.getPointer,t=fabric.util.degreesToRadians;fabric.util.object.extend(fabric.Object.prototype,{_findTargetCorner:function(t,n){if(!this.hasControls||!this.active)return!1;var r=e(t,this.canvas.upperCanvasEl),i=r.x-n.left,s=r.y-n.top,o,u;for(var a in this.oCoords){if(a==="mtr"&&!this.hasRotatingPoint)continue;if(!(!this.get("lockUniScaling")||a!=="mt"&&a!=="mr"&&a!=="mb"&&a!=="ml"))continue;u=this._getImageLines(this.oCoords[a].corner,a),o=this._findCrossPoints(i,s,u);if(o%2===1&&o!==0)return this.__corner=a,a}return!1},_findCrossPoints:function(e,t,n){var r,i,s,o,u,a,f=0,l;for(var c in n){l=n[c];if(l.o.y<t&&l.d.y<t)continue;if(l.o.y>=t&&l.d.y>=t)continue;l.o.x===l.d.x&&l.o.x>=e?(u=l.o.x,a=t):(r=0,i=(l.d.y-l.o.y)/(l.d.x-l.o.x),s=t-r*e,o=l.o.y-i*l.o.x,u=-(s-o)/(r-i),a=s+r*u),u>=e&&(f+=1);if(f===2)break}return f},_getImageLines:function(e){return{topline:{o:e.tl,d:e.tr},rightline:{o:e.tr,d:e.br},bottomline:{o:e.br,d:e.bl},leftline:{o:e.bl,d:e.tl}}},_setCornerCoords:function(){var e=this.oCoords,n=t(this.angle),r=t(45-this.angle),i=Math.sqrt(2*Math.pow(this.cornerSize,2))/2,s=i*Math.cos(r),o=i*Math.sin(r),u=Math.sin(n),a=Math.cos(n);e.tl.corner={tl:{x:e.tl.x-o,y:e.tl.y-s},tr:{x:e.tl.x+s,y:e.tl.y-o},bl:{x:e.tl.x-s,y:e.tl.y+o},br:{x:e.tl.x+o,y:e.tl.y+s}},e.tr.corner={tl:{x:e.tr.x-o,y:e.tr.y-s},tr:{x:e.tr.x+s,y:e.tr.y-o},br:{x:e.tr.x+o,y:e.tr.y+s},bl:{x:e.tr.x-s,y:e.tr.y+o}},e.bl.corner={tl:{x:e.bl.x-o,y:e.bl.y-s},bl:{x:e.bl.x-s,y:e.bl.y+o},br:{x:e.bl.x+o,y:e.bl.y+s},tr:{x:e.bl.x+s,y:e.bl.y-o}},e.br.corner={tr:{x:e.br.x+s,y:e.br.y-o},bl:{x:e.br.x-s,y:e.br.y+o},br:{x:e.br.x+o,y:e.br.y+s},tl:{x:e.br.x-o,y:e.br.y-s}},e.ml.corner={tl:{x:e.ml.x-o,y:e.ml.y-s},tr:{x:e.ml.x+s,y:e.ml.y-o},bl:{x:e.ml.x-s,y:e.ml.y+o},br:{x:e.ml.x+o,y:e.ml.y+s}},e.mt.corner={tl:{x:e.mt.x-o,y:e.mt.y-s},tr:{x:e.mt.x+s,y:e.mt.y-o},bl:{x:e.mt.x-s,y:e.mt.y+o},br:{x:e.mt.x+o,y:e.mt.y+s}},e.mr.corner={tl:{x:e.mr.x-o,y:e.mr.y-s},tr:{x:e.mr.x+s,y:e.mr.y-o},bl:{x:e.mr.x-s,y:e.mr.y+o},br:{x:e.mr.x+o,y:e.mr.y+s}},e.mb.corner={tl:{x:e.mb.x-o,y:e.mb.y-s},tr:{x:e.mb.x+s,y:e.mb.y-o},bl:{x:e.mb.x-s,y:e.mb.y+o},br:{x:e.mb.x+o,y:e.mb.y+s}},e.mtr.corner={tl:{x:e.mtr.x-o+u*this.rotatingPointOffset,y:e.mtr.y-s-a*this.rotatingPointOffset},tr:{x:e.mtr.x+s+u*this.rotatingPointOffset,y:e.mtr.y-o-a*this.rotatingPointOffset},bl:{x:e.mtr.x-s+u*this.rotatingPointOffset,y:e.mtr.y+o-a*this.rotatingPointOffset},br:{x:e.mtr.x+o+u*this.rotatingPointOffset,y:e.mtr.y+s-a*this.rotatingPointOffset}}},drawBorders:function(e){if(!this.hasBorders)return;var t=this.padding,n=t*2,r=this.strokeWidth>1?this.strokeWidth:0;e.save(),e.globalAlpha=this.isMoving?this.borderOpacityWhenMoving:1,e.strokeStyle=this.borderColor;var i=1/this._constrainScale(this.scaleX),s=1/this._constrainScale(this.scaleY);e.lineWidth=1/this.borderScaleFactor,e.scale(i,s);var o=this.getWidth(),u=this.getHeight();e.strokeRect(~~(-(o/2)-t-r/2*this.scaleX)+.5,~~(-(u/2)-t-r/2*this.scaleY)+.5,~~(o+n+r*this.scaleX),~~(u+n+r*this.scaleY));if(this.hasRotatingPoint&&!this.get("lockRotation")&&this.hasControls){var a=(this.flipY?u+r*this.scaleY+t*2:-u-r*this.scaleY-t*2)/2;e.beginPath(),e.moveTo(0,a),e.lineTo(0,a+(this.flipY?this.rotatingPointOffset:-this.rotatingPointOffset)),e.closePath(),e.stroke()}return e.restore(),this},drawControls:function(e){if(!this.hasControls)return;var t=this.cornerSize,n=t/2,r=this.strokeWidth/2,i=-(this.width/2),s=-(this.height/2),o,u,a=t/this.scaleX,f=t/this.scaleY,l=this.padding/this.scaleX,c=this.padding/this.scaleY,h=n/this.scaleY,p=n/this.scaleX,d=(n-t)/this.scaleX,v=(n-t)/this.scaleY,m=this.height,g=this.width,y=this.transparentCorners?"strokeRect":"fillRect",b=typeof G_vmlCanvasManager!="undefined";return e.save(),e.lineWidth=1/Math.max(this.scaleX,this.scaleY),e.globalAlpha=this.isMoving?this.borderOpacityWhenMoving:1,e.strokeStyle=e.fillStyle=this.cornerColor,o=i-p-r-l,u=s-h-r-c,b||e.clearRect(o,u,a,f),e[y](o,u,a,f),o=i+g-p+r+l,u=s-h-r-c,b||e.clearRect(o,u,a,f),e[y](o,u,a,f),o=i-p-r-l,u=s+m+v+r+c,b||e.clearRect(o,u,a,f),e[y](o,u,a,f),o=i+g+d+r+l,u=s+m+v+r+c,b||e.clearRect(o,u,a,f),e[y](o,u,a,f),this.get("lockUniScaling")||(o=i+g/2-p,u=s-h-r-c,b||e.clearRect(o,u,a,f),e[y](o,u,a,f),o=i+g/2-p,u=s+m+v+r+c,b||e.clearRect(o,u,a,f),e[y](o,u,a,f),o=i+g+d+r+l,u=s+m/2-h,b||e.clearRect(o,u,a,f),e[y](o,u,a,f),o=i-p-r-l,u=s+m/2-h,b||e.clearRect(o,u,a,f),e[y](o,u,a,f)),this.hasRotatingPoint&&(o=i+g/2-p,u=this.flipY?s+m+this.rotatingPointOffset/this.scaleY-f/2+r+c:s-this.rotatingPointOffset/this.scaleY-f/2-r-c,b||e.clearRect(o,u,a,f),e[y](o,u,a,f)),e.restore(),this}})}(),function(e){"use strict";var t=e.fabric||(e.fabric={}),n=t.util.object.extend,r={x1:1,x2:1,y1:1,y2:1};if(t.Line){t.warn("fabric.Line is already defined");return}t.Line=t.util.createClass(t.Object,{type:"line",initialize:function(e,t){t=t||{},e||(e=[0,0,0,0]),this.callSuper("initialize",t),this.set("x1",e[0]),this.set("y1",e[1]),this.set("x2",e[2]),this.set("y2",e[3]),this._setWidthHeight(t)},_setWidthHeight:function(e){e||(e={}),this.set("width",this.x2-this.x1||1),this.set("height",this.y2-this.y1||1),this.set("left","left"in e?e.left:this.x1+this.width/2),this.set("top","top"in e?e.top:this.y1+this.height/2)},_set:function(e,t){return this[e]=t,e in r&&this._setWidthHeight(),this},_render:function(e){e.beginPath(),this.group&&e.translate(-this.group.width/2+this.left,-this.group.height/2+this.top),e.moveTo(this.width===1?0:-this.width/2,this.height===1?0:-this.height/2),e.lineTo(this.width===1?0:this.width/2,this.height===1?0:this.height/2),e.lineWidth=this.strokeWidth;var t=e.strokeStyle;e.strokeStyle=e.fillStyle,e.stroke(),e.strokeStyle=t},complexity:function(){return 1},toObject:function(e){return n(this.callSuper("toObject",e),{x1:this.get("x1"),y1:this.get("y1"),x2:this.get("x2"),y2:this.get("y2")})},toSVG:function(){var e=[];return this.stroke&&this.stroke.toLive&&e.push(this.stroke.toSVG(this,!0)),e.push("<line ",'x1="',this.get("x1"),'" y1="',this.get("y1"),'" x2="',this.get("x2"),'" y2="',this.get("y2"),'" style="',this.getSvgStyles(),'"/>'),e.join("")}}),t.Line.ATTRIBUTE_NAMES="x1 y1 x2 y2 stroke stroke-width transform".split(" "),t.Line.fromElement=function(e,r){var i=t.parseAttributes(e,t.Line.ATTRIBUTE_NAMES),s=[i.x1||0,i.y1||0,i.x2||0,i.y2||0];return new t.Line(s,n(i,r))},t.Line.fromObject=function(e){var n=[e.x1,e.y1,e.x2,e.y2];return new t.Line(n,e)}}(typeof exports!="undefined"?exports:this),function(e){"use strict";function i(e){return"radius"in e&&e.radius>0}var t=e.fabric||(e.fabric={}),n=Math.PI*2,r=t.util.object.extend;if(t.Circle){t.warn("fabric.Circle is already defined.");return}t.Circle=t.util.createClass(t.Object,{type:"circle",initialize:function(e){e=e||{},this.set("radius",e.radius||0),this.callSuper("initialize",e);var t=this.get("radius")*2;this.set("width",t).set("height",t)},toObject:function(e){return r(this.callSuper("toObject",e),{radius:this.get("radius")})},toSVG:function(){var e=[];return this.fill&&this.fill.toLive&&e.push(this.fill.toSVG(this,!1)),this.stroke&&this.stroke.toLive&&e.push(this.stroke.toSVG(this,!1)),e.push("<circle ",'cx="0" cy="0" ','r="',this.radius,'" style="',this.getSvgStyles(),'" transform="',this.getSvgTransform(),'"/>'),e.join("")},_render:function(e,t){e.beginPath(),e.globalAlpha=this.group?e.globalAlpha*this.opacity:this.opacity,e.arc(t?this.left:0,t?this.top:0,this.radius,0,n,!1),e.closePath(),this.fill&&e.fill(),this._removeShadow(e),this.stroke&&e.stroke()},getRadiusX:function(){return this.get("radius")*this.get("scaleX")},getRadiusY:function(){return this.get("radius")*this.get("scaleY")},setRadius:function(e){this.radius=e,this.set("width",e*2).set("height",e*2)},complexity:function(){return 1}}),t.Circle.ATTRIBUTE_NAMES="cx cy r fill fill-opacity opacity stroke stroke-width transform".split(" "),t.Circle.fromElement=function(e,n){n||(n={});var s=t.parseAttributes(e,t.Circle.ATTRIBUTE_NAMES);if(!i(s))throw new Error("value of `r` attribute is required and can not be negative");"left"in s&&(s.left-=n.width/2||0),"top"in s&&(s.top-=n.height/2||0);var o=new t.Circle(r(s,n));return o.cx=parseFloat(e.getAttribute("cx"))||0,o.cy=parseFloat(e.getAttribute("cy"))||0,o},t.Circle.fromObject=function(e){return new t.Circle(e)}}(typeof exports!="undefined"?exports:this),function(e){"use strict";var t=e.fabric||(e.fabric={});if(t.Triangle){t.warn("fabric.Triangle is already defined");return}t.Triangle=t.util.createClass(t.Object,{type:"triangle",initialize:function(e){e=e||{},this.callSuper("initialize",e),this.set("width",e.width||100).set("height",e.height||100)},_render:function(e){var t=this.width/2,n=this.height/2;e.beginPath(),e.moveTo(-t,n),e.lineTo(0,-n),e.lineTo(t,n),e.closePath(),this.fill&&e.fill(),this.stroke&&e.stroke()},complexity:function(){return 1},toSVG:function(){var e=[],t=this.width/2,n=this.height/2,r=[-t+" "+n,"0 "+ -n,t+" "+n].join(",");return this.fill&&this.fill.toLive&&e.push(this.fill.toSVG(this,!0)),this.stroke&&this.stroke.toLive&&e.push(this.stroke.toSVG(this,!0)),e.push("<polygon ",'points="',r,'" style="',this.getSvgStyles(),'" transform="',this.getSvgTransform(),'"/>'),e.join("")}}),t.Triangle.fromObject=function(e){return new t.Triangle(e)}}(typeof exports!="undefined"?exports:this),function(e){"use strict";var t=e.fabric||(e.fabric={}),n=Math.PI*2,r=t.util.object.extend;if(t.Ellipse){t.warn("fabric.Ellipse is already defined.");return}t.Ellipse=t.util.createClass(t.Object,{type:"ellipse",rx:0,ry:0,initialize:function(e){e=e||{},this.callSuper("initialize",e),this.set("rx",e.rx||0),this.set("ry",e.ry||0),this.set("width",this.get("rx")*2),this.set("height",this.get("ry")*2)},toObject:function(e){return r(this.callSuper("toObject",e),{rx:this.get("rx"),ry:this.get("ry")})},toSVG:function(){var e=[];return this.fill&&this.fill.toLive&&e.push(this.fill.toSVG(this,!1)),this.stroke&&this.stroke.toLive&&e.push(this.stroke.toSVG(this,!1)),e.push("<ellipse ",'rx="',this.get("rx"),'" ry="',this.get("ry"),'" style="',this.getSvgStyles(),'" transform="',this.getSvgTransform(),'"/>'),e.join("")},render:function(e,t){if(this.rx===0||this.ry===0)return;return this.callSuper("render",e,t)},_render:function(e,t){e.beginPath(),e.save(),e.globalAlpha=this.group?e.globalAlpha*this.opacity:this.opacity,this.transformMatrix&&this.group&&e.translate(this.cx,this.cy),e.transform(1,0,0,this.ry/this.rx,0,0),e.arc(t?this.left:0,t?this.top:0,this.rx,0,n,!1),this.stroke&&e.stroke(),this._removeShadow(e),this.fill&&e.fill(),e.restore()},complexity:function(){return 1}}),t.Ellipse.ATTRIBUTE_NAMES="cx cy rx ry fill fill-opacity opacity stroke stroke-width transform".split(" "),t.Ellipse.fromElement=function(e,n){n||(n={});var i=t.parseAttributes(e,t.Ellipse.ATTRIBUTE_NAMES),s=i.left,o=i.top;"left"in i&&(i.left-=n.width/2||0),"top"in i&&(i.top-=n.height/2||0);var u=new t.Ellipse(r(i,n));return u.cx=s||0,u.cy=o||0,u},t.Ellipse.fromObject=function(e){return new t.Ellipse(e)}}(typeof exports!="undefined"?exports:this),function(e){"use strict";function r(e){return e.left=e.left||0,e.top=e.top||0,e}var t=e.fabric||(e.fabric={}),n=t.util.object.extend;if(t.Rect){console.warn("fabric.Rect is already defined");return}t.Rect=t.util.createClass(t.Object,{type:"rect",rx:0,ry:0,initialize:function(e){e=e||{},this._initStateProperties(),this.callSuper("initialize",e),this._initRxRy(),this.x=0,this.y=0},_initStateProperties:function(){this.stateProperties=this.stateProperties.concat(["rx","ry"])},_initRxRy:function(){this.rx&&!this.ry?this.ry=this.rx:this.ry&&!this.rx&&(this.rx=this.ry)},_render:function(e){var t=this.rx||0,n=this.ry||0,r=-this.width/2,i=-this.height/2,s=this.width,o=this.height;e.beginPath(),e.globalAlpha=this.group?e.globalAlpha*this.opacity:this.opacity,this.transformMatrix&&this.group&&e.translate(this.width/2+this.x,this.height/2+this.y),!this.transformMatrix&&this.group&&e.translate(-this.group.width/2+this.width/2+this.x,-this.group.height/2+this.height/2+this.y),e.moveTo(r+t,i),e.lineTo(r+s-t,i),e.quadraticCurveTo(r+s,i,r+s,i+n,r+s,i+n),e.lineTo(r+s,i+o-n),e.quadraticCurveTo(r+s,i+o,r+s-t,i+o,r+s-t,i+o),e.lineTo(r+t,i+o),e.quadraticCurveTo(r,i+o,r,i+o-n,r,i+o-n),e.lineTo(r,i+n),e.quadraticCurveTo(r,i,r+t,i,r+t,i),e.closePath(),this.fill&&e.fill(),this._removeShadow(e),this.strokeDashArray?this._renderDashedStroke(e):this.stroke&&e.stroke()},_renderDashedStroke:function(e){function u(u,a){var f=0,l=0,c=(a?i.height:i.width)+s*2;while(f<c){var h=i.strokeDashArray[t++];f+=h,f>c&&(l=f-c),u?n+=h*u-(l*u||0):r+=h*a-(l*a||0),e[1&t?"moveTo":"lineTo"](n,r),t>=o&&(t=0)}}1&this.strokeDashArray.length&&this.strokeDashArray.push.apply(this.strokeDashArray,this.strokeDashArray);var t=0,n=-this.width/2,r=-this.height/2,i=this,s=this.padding,o=this.strokeDashArray.length;e.save(),e.beginPath(),u(1,0),u(0,1),u(-1,0),u(0,-1),e.stroke(),e.closePath(),e.restore()},_normalizeLeftTopProperties:function(e){return e.left&&this.set("left",e.left+this.getWidth()/2),this.set("x",e.left||0),e.top&&this.set("top",e.top+this.getHeight()/2),this.set("y",e.top||0),this},complexity:function(){return 1},toObject:function(e){return n(this.callSuper("toObject",e),{rx:this.get("rx")||0,ry:this.get("ry")||0})},toSVG:function(){var e=[];return this.fill&&this.fill.toLive&&e.push(this.fill.toSVG(this,!1)),this.stroke&&this.stroke.toLive&&e.push(this.stroke.toSVG(this,!1)),e.push("<rect ",'x="',-1*this.width/2,'" y="',-1*this.height/2,'" rx="',this.get("rx"),'" ry="',this.get("ry"),'" width="',this.width,'" height="',this.height,'" style="',this.getSvgStyles(),'" transform="',this.getSvgTransform(),'"/>'),e.join("")}}),t.Rect.ATTRIBUTE_NAMES="x y width height rx ry fill fill-opacity opacity stroke stroke-width transform".split(" "),t.Rect.fromElement=function(e,i){if(!e)return null;var s=t.parseAttributes(e,t.Rect.ATTRIBUTE_NAMES);s=r(s);var o=new t.Rect(n(i?t.util.object.clone(i):{},s));return o._normalizeLeftTopProperties(s),o},t.Rect.fromObject=function(e){return new t.Rect(e)}}(typeof exports!="undefined"?exports:this),function(e){"use strict";var t=e.fabric||(e.fabric={}),n=t.util.toFixed;if(t.Polyline){t.warn("fabric.Polyline is already defined");return}t.Polyline=t.util.createClass(t.Object,{type:"polyline",initialize:function(e,t,n){t=t||{},this.set("points",e),this.callSuper("initialize",t),this._calcDimensions(n)},_calcDimensions:function(e){return t.Polygon.prototype._calcDimensions.call(this,e)},toObject:function(e){return t.Polygon.prototype.toObject.call(this,e)},toSVG:function(){var e=[],t=[];for(var r=0,i=this.points.length;r<i;r++)e.push(n(this.points[r].x,2),",",n(this.points[r].y,2)," ");return this.fill&&this.fill.toLive&&t.push(this.fill.toSVG(this,!1)),this.stroke&&this.stroke.toLive&&t.push(this.stroke.toSVG(this,!1)),t.push("<polyline ",'points="',e.join(""),'" style="',this.getSvgStyles(),'" transform="',this.getSvgTransform(),'"/>'),t.join("")},_render:function(e){var t;e.beginPath(),e.moveTo(this.points[0].x,this.points[0].y);for(var n=0,r=this.points.length;n<r;n++)t=this.points[n],e.lineTo(t.x,t.y);this.fill&&e.fill(),this._removeShadow(e),this.stroke&&e.stroke()},complexity:function(){return this.get("points").length}}),t.Polyline.ATTRIBUTE_NAMES="fill fill-opacity opacity stroke stroke-width transform".split(" "),t.Polyline.fromElement=function(e,n){if(!e)return null;n||(n={});var r=t.parsePointsAttribute(e.getAttribute("points")),i=t.parseAttributes(e,t.Polyline.ATTRIBUTE_NAMES);for(var s=0,o=r.length;s<o;s++)r[s].x-=n.width/2||0,r[s].y-=n.height/2||0;return new t.Polyline(r,t.util.object.extend(i,n),!0)},t.Polyline.fromObject=function(e){var n=e.points;return new t.Polyline(n,e,!0)}}(typeof exports!="undefined"?exports:this),function(e){"use strict";var t=e.fabric||(e.fabric={}),n=t.util.object.extend,r=t.util.array.min,i=t.util.array.max,s=t.util.toFixed;if(t.Polygon){t.warn("fabric.Polygon is already defined");return}t.Polygon=t.util.createClass(t.Object,{type:"polygon",initialize:function(e,t,n){t=t||{},this.points=e,this.callSuper("initialize",t),this._calcDimensions(n)},_calcDimensions:function(e){var t=this.points,n=r(t,"x"),s=r(t,"y"),o=i(t,"x"),u=i(t,"y");this.width=o-n||1,this.height=u-s||1,this.minX=n,this.minY=s;if(e)return;var a=this.width/2,f=this.height/2;this.points.forEach(function(e){e.x-=a,e.y-=f},this)},toObject:function(e){return n(this.callSuper("toObject",e),{points:this.points.concat()})},toSVG:function(){var e=[],t=[];for(var n=0,r=this.points.length;n<r;n++)e.push(s(this.points[n].x,2),",",s(this.points[n].y,2)," ");return this.fill&&this.fill.toLive&&t.push(this.fill.toSVG(this,!1)),this.stroke&&this.stroke.toLive&&t.push(this.stroke.toSVG(this,!1)),t.push("<polygon ",'points="',e.join(""),'" style="',this.getSvgStyles(),'" transform="',this.getSvgTransform(),'"/>'),t.join("")},_render:function(e){var t;e.beginPath(),e.moveTo(this.points[0].x,this.points[0].y);for(var n=0,r=this.points.length;n<r;n++)t=this.points[n],e.lineTo(t.x,t.y);this.fill&&e.fill(),this._removeShadow(e),this.stroke&&(e.closePath(),e.stroke())},complexity:function(){return this.points.length}}),t.Polygon.ATTRIBUTE_NAMES="fill fill-opacity opacity stroke stroke-width transform".split(" "),t.Polygon.fromElement=function(e,r){if(!e)return null;r||(r={});var i=t.parsePointsAttribute(e.getAttribute("points")),s=t.parseAttributes(e,t.Polygon.ATTRIBUTE_NAMES);for(var o=0,u=i.length;o<u;o++)i[o].x-=r.width/2||0,i[o].y-=r.height/2||0;return new t.Polygon(i,n(s,r),!0)},t.Polygon.fromObject=function(e){return new t.Polygon(e.points,e,!0)}}(typeof exports!="undefined"?exports:this),function(e){function n(e,t,n,r){var i=r[0],s=r[1],o=r[2],f=r[3],l=r[4],c=r[5],h=r[6],p=u(c,h,i,s,f,l,o,t,n);for(var d=0;d<p.length;d++){var v=a.apply(this,p[d]);e.bezierCurveTo.apply(e,v)}}function u(e,t,n,i,u,a,f,l,c){o=s.call(arguments);if(r[o])return r[o];var h=f*(Math.PI/180),p=Math.sin(h),d=Math.cos(h);n=Math.abs(n),i=Math.abs(i);var v=d*(l-e)*.5+p*(c-t)*.5,m=d*(c-t)*.5-p*(l-e)*.5,g=v*v/(n*n)+m*m/(i*i);g>1&&(g=Math.sqrt(g),n*=g,i*=g);var y=d/n,b=p/n,w=-p/i,E=d/i,S=y*l+b*c,x=w*l+E*c,T=y*e+b*t,N=w*e+E*t,C=(T-S)*(T-S)+(N-x)*(N-x),k=1/C-.25;k<0&&(k=0);var L=Math.sqrt(k);a===u&&(L=-L);var A=.5*(S+T)-L*(N-x),O=.5*(x+N)+L*(T-S),M=Math.atan2(x-O,S-A),_=Math.atan2(N-O,T-A),D=_-M;D<0&&a===1?D+=2*Math.PI:D>0&&a===0&&(D-=2*Math.PI);var P=Math.ceil(Math.abs(D/(Math.PI*.5+.001))),H=[];for(var B=0;B<P;B++){var j=M+B*D/P,F=M+(B+1)*D/P;H[B]=[A,O,j,F,n,i,p,d]}return r[o]=H}function a(e,t,n,r,u,a,f,l){o=s.call(arguments);if(i[o])return i[o];var c=l*u,h=-f*a,p=f*u,d=l*a,v=.5*(r-n),m=8/3*Math.sin(v*.5)*Math.sin(v*.5)/Math.sin(v),g=e+Math.cos(n)-m*Math.sin(n),y=t+Math.sin(n)+m*Math.cos(n),b=e+Math.cos(r),w=t+Math.sin(r),E=b+m*Math.sin(r),S=w-m*Math.cos(r);return i[o]=[c*g+h*y,p*g+d*y,c*E+h*S,p*E+d*S,c*b+h*w,p*b+d*w]}function d(e){return e[0]==="H"?e[1]:e[e.length-2]}function v(e){return e[0]==="V"?e[1]:e[e.length-1]}var t={m:2,l:2,h:1,v:1,c:6,s:4,q:4,t:2,a:7},r={},i={},s=Array.prototype.join,o;"use strict";var f=e.fabric||(e.fabric={}),l=f.util.array.min,c=f.util.array.max,h=f.util.object.extend,p=Object.prototype.toString;if(f.Path){f.warn("fabric.Path is already defined");return}f.Path=f.util.createClass(f.Object,{type:"path",initialize:function(e,t){t=t||{},this.setOptions(t);if(!e)throw new Error("`path` argument is required");var n=p.call(e)==="[object Array]";this.path=n?e:e.match&&e.match(/[mzlhvcsqta][^mzlhvcsqta]*/gi);if(!this.path)return;n||(this.path=this._parsePath()),this._initializePath(t),t.sourcePath&&this.setSourcePath(t.sourcePath)},_initializePath:function(e){var t="width"in e,n="height"in e,r="left"in e,i="top"in e;!t||!n?(h(this,this._parseDimensions()),t&&(this.width=e.width),n&&(this.height=e.height)):(i||(this.top=this.height/2),r||(this.left=this.width/2)),this.pathOffset=this._calculatePathOffset(i||r)},_calculatePathOffset:function(e){return{x:e?0:this.left-this.width/2,y:e?0:this.top-this.height/2}},_render:function(e){var t,r=null,i=0,s=0,o=0,u=0,a,f,l,c,h=-(this.width/2+this.pathOffset.x),p=-(this.height/2+this.pathOffset.y);for(var d=0,v=this.path.length;d<v;++d){t=this.path[d];switch(t[0]){case"l":i+=t[1],s+=t[2],e.lineTo(i+h,s+p);break;case"L":i=t[1],s=t[2],e.lineTo(i+h,s+p);break;case"h":i+=t[1],e.lineTo(i+h,s+p);break;case"H":i=t[1],e.lineTo(i+h,s+p);break;case"v":s+=t[1],e.lineTo(i+h,s+p);break;case"V":s=t[1],e.lineTo(i+h,s+p);break;case"m":i+=t[1],s+=t[2],e[!r||r[0]!=="m"&&r[0]!=="M"?"moveTo":"lineTo"](i+h,s+p);break;case"M":i=t[1],s=t[2],e[!r||r[0]!=="m"&&r[0]!=="M"?"moveTo":"lineTo"](i+h,s+p);break;case"c":a=i+t[5],f=s+t[6],o=i+t[3],u=s+t[4],e.bezierCurveTo(i+t[1]+h,s+t[2]+p,o+h,u+p,a+h,f+p),i=a,s=f;break;case"C":i=t[5],s=t[6],o=t[3],u=t[4],e.bezierCurveTo(t[1]+h,t[2]+p,o+h,u+p,i+h,s+p);break;case"s":a=i+t[3],f=s+t[4],o=o?2*i-o:i,u=u?2*s-u:s,e.bezierCurveTo(o+h,u+p,i+t[1]+h,s+t[2]+p,a+h,f+p),o=i+t[1],u=s+t[2],i=a,s=f;break;case"S":a=t[3],f=t[4],o=2*i-o,u=2*s-u,e.bezierCurveTo(o+h,u+p,t[1]+h,t[2]+p,a+h,f+p),i=a,s=f,o=t[1],u=t[2];break;case"q":a=i+t[3
],f=s+t[4],o=i+t[1],u=s+t[2],e.quadraticCurveTo(o+h,u+p,a+h,f+p),i=a,s=f;break;case"Q":a=t[3],f=t[4],e.quadraticCurveTo(t[1]+h,t[2]+p,a+h,f+p),i=a,s=f,o=t[1],u=t[2];break;case"t":a=i+t[1],f=s+t[2],r[0].match(/[QqTt]/)===null?(o=i,u=s):r[0]==="t"?(o=2*i-l,u=2*s-c):r[0]==="q"&&(o=2*i-o,u=2*s-u),l=o,c=u,e.quadraticCurveTo(o+h,u+p,a+h,f+p),i=a,s=f,o=i+t[1],u=s+t[2];break;case"T":a=t[1],f=t[2],o=2*i-o,u=2*s-u,e.quadraticCurveTo(o+h,u+p,a+h,f+p),i=a,s=f;break;case"a":n(e,i+h,s+p,[t[1],t[2],t[3],t[4],t[5],t[6]+i+h,t[7]+s+p]),i+=t[6],s+=t[7];break;case"A":n(e,i+h,s+p,[t[1],t[2],t[3],t[4],t[5],t[6]+h,t[7]+p]),i=t[6],s=t[7];break;case"z":case"Z":e.closePath()}r=t}},render:function(e,t){e.save();var n=this.transformMatrix;n&&e.transform(n[0],n[1],n[2],n[3],n[4],n[5]),t||this.transform(e),this.overlayFill?e.fillStyle=this.overlayFill:this.fill&&(e.fillStyle=this.fill.toLive?this.fill.toLive(e):this.fill),this.stroke&&(e.strokeStyle=this.stroke.toLive?this.stroke.toLive(e):this.stroke),this._setShadow(e),this.clipTo&&f.util.clipContext(this,e),e.beginPath(),this._render(e),this.fill&&e.fill(),this.clipTo&&e.restore(),this._removeShadow(e),this.stroke&&(e.strokeStyle=this.stroke,e.lineWidth=this.strokeWidth,e.lineCap=e.lineJoin="round",e.stroke()),!t&&this.active&&(this.drawBorders(e),this.drawControls(e)),e.restore()},toString:function(){return"#<fabric.Path ("+this.complexity()+'): { "top": '+this.top+', "left": '+this.left+" }>"},toObject:function(e){var t=h(this.callSuper("toObject",e),{path:this.path});return this.sourcePath&&(t.sourcePath=this.sourcePath),this.transformMatrix&&(t.transformMatrix=this.transformMatrix),t},toDatalessObject:function(e){var t=this.toObject(e);return this.sourcePath&&(t.path=this.sourcePath),delete t.sourcePath,t},toSVG:function(){var e=[],t=[];for(var n=0,r=this.path.length;n<r;n++)e.push(this.path[n].join(" "));var i=e.join(" ");return this.fill&&this.fill.toLive&&t.push(this.fill.toSVG(this,!0)),this.stroke&&this.stroke.toLive&&t.push(this.stroke.toSVG(this,!0)),t.push('<g transform="',this.group?"":this.getSvgTransform(),'">',"<path ",'d="',i,'" style="',this.getSvgStyles(),'" transform="translate(',-this.width/2," ",-this.height/2,")",'" stroke-linecap="round" ',"/>","</g>"),t.join("")},complexity:function(){return this.path.length},_parsePath:function(){var e=[],n,r,i;for(var s=0,o,u=this.path.length;s<u;s++){n=this.path[s],r=n.slice(1).trim().replace(/(\d)-/g,"$1###-").split(/\s|,|###/),o=[n.charAt(0)];for(var a=0,f=r.length;a<f;a++)i=parseFloat(r[a]),isNaN(i)||o.push(i);var l=o[0].toLowerCase(),c=t[l];if(o.length-1>c)for(var h=1,p=o.length;h<p;h+=c)e.push([o[0]].concat(o.slice(h,h+c)));else e.push(o)}return e},_parseDimensions:function(){var e=[],t=[],n,r,i=!1,s,o;this.path.forEach(function(u,a){u[0]!=="H"&&(n=a===0?d(u):d(this.path[a-1])),u[0]!=="V"&&(r=a===0?v(u):v(this.path[a-1])),u[0]===u[0].toLowerCase()&&(i=!0),s=i?n+d(u):u[0]==="V"?n:d(u),o=i?r+v(u):u[0]==="H"?r:v(u);var f=parseInt(s,10);isNaN(f)||e.push(f),f=parseInt(o,10),isNaN(f)||t.push(f)},this);var u=l(e),a=l(t),f=c(e),h=c(t),p=f-u,m=h-a,g={top:a+m/2,left:u+p/2,bottom:c(t)-m,right:c(e)-p};return g.width=p,g.height=m,g}}),f.Path.fromObject=function(e){return new f.Path(e.path,e)},f.Path.ATTRIBUTE_NAMES="d fill fill-opacity opacity fill-rule stroke stroke-width transform".split(" "),f.Path.fromElement=function(e,t){var n=f.parseAttributes(e,f.Path.ATTRIBUTE_NAMES);return new f.Path(n.d,h(n,t))}}(typeof exports!="undefined"?exports:this),function(e){"use strict";function u(e){for(var n=0,r=e.length;n<r;n++)if(!(e[n]instanceof t.Object)){var i=s(o(e[n].type));e[n]=t[i].fromObject(e[n])}return e}var t=e.fabric||(e.fabric={}),n=t.util.object.extend,r=t.util.array.invoke,i=t.Object.prototype.toObject,s=t.util.string.camelize,o=t.util.string.capitalize;if(t.PathGroup){t.warn("fabric.PathGroup is already defined");return}t.PathGroup=t.util.createClass(t.Path,{type:"path-group",fill:"",initialize:function(e,t){t=t||{},this.paths=e||[];for(var n=this.paths.length;n--;)this.paths[n].group=this;this.setOptions(t),this.setCoords(),t.sourcePath&&this.setSourcePath(t.sourcePath)},render:function(e){if(!this.visible)return;e.save();var n=this.transformMatrix;n&&e.transform(n[0],n[1],n[2],n[3],n[4],n[5]),this.transform(e),this._setShadow(e),this.clipTo&&t.util.clipContext(this,e);for(var r=0,i=this.paths.length;r<i;++r)this.paths[r].render(e,!0);this.clipTo&&e.restore(),this._removeShadow(e),this.active&&(this.drawBorders(e),this.drawControls(e)),e.restore()},_set:function(e,t){if((e==="fill"||e==="overlayFill")&&t&&this.isSameColor()){var n=this.paths.length;while(n--)this.paths[n]._set(e,t)}return this.callSuper("_set",e,t)},toObject:function(e){return n(i.call(this,e),{paths:r(this.getObjects(),"toObject",e),sourcePath:this.sourcePath})},toDatalessObject:function(e){var t=this.toObject(e);return this.sourcePath&&(t.paths=this.sourcePath),t},toSVG:function(){var e=this.getObjects(),t=["<g ",'style="',this.getSvgStyles(),'" ','transform="',this.getSvgTransform(),'" ',">"];for(var n=0,r=e.length;n<r;n++)t.push(e[n].toSVG());return t.push("</g>"),t.join("")},toString:function(){return"#<fabric.PathGroup ("+this.complexity()+"): { top: "+this.top+", left: "+this.left+" }>"},isSameColor:function(){var e=this.getObjects()[0].get("fill");return this.getObjects().every(function(t){return t.get("fill")===e})},complexity:function(){return this.paths.reduce(function(e,t){return e+(t&&t.complexity?t.complexity():0)},0)},toGrayscale:function(){var e=this.paths.length;while(e--)this.paths[e].toGrayscale();return this},getObjects:function(){return this.paths}}),t.PathGroup.fromObject=function(e){var n=u(e.paths);return new t.PathGroup(n,e)}}(typeof exports!="undefined"?exports:this),function(e){"use strict";var t=e.fabric||(e.fabric={}),n=t.util.object.extend,r=t.util.array.min,i=t.util.array.max,s=t.util.array.invoke,o=t.util.removeFromArray;if(t.Group)return;var u={lockMovementX:!0,lockMovementY:!0,lockRotation:!0,lockScalingX:!0,lockScalingY:!0,lockUniScaling:!0};t.Group=t.util.createClass(t.Object,{type:"group",initialize:function(e,t){t=t||{},this.objects=e||[],this.originalState={},this.callSuper("initialize"),this._calcBounds(),this._updateObjectsCoords(),t&&n(this,t),this._setOpacityIfSame(),this.setCoords(!0),this.saveCoords()},_updateObjectsCoords:function(){var e=this.left,t=this.top;this.forEachObject(function(n){var r=n.get("left"),i=n.get("top");n.set("originalLeft",r),n.set("originalTop",i),n.set("left",r-e),n.set("top",i-t),n.setCoords(),n.__origHasControls=n.hasControls,n.hasControls=!1},this)},toString:function(){return"#<fabric.Group: ("+this.complexity()+")>"},getObjects:function(){return this.objects},addWithUpdate:function(e){return this._restoreObjectsState(),this.objects.push(e),this._calcBounds(),this._updateObjectsCoords(),this},removeWithUpdate:function(e){return this._restoreObjectsState(),o(this.objects,e),e.setActive(!1),this._calcBounds(),this._updateObjectsCoords(),this},add:function(e){return this.objects.push(e),this},remove:function(e){return o(this.objects,e),this},size:function(){return this.getObjects().length},delegatedProperties:{fill:!0,opacity:!0,fontFamily:!0,fontWeight:!0,fontSize:!0,fontStyle:!0,lineHeight:!0,textDecoration:!0,textShadow:!0,textAlign:!0,backgroundColor:!0},_set:function(e,t){if(e in this.delegatedProperties){var n=this.objects.length;this[e]=t;while(n--)this.objects[n].set(e,t)}else this[e]=t},contains:function(e){return this.objects.indexOf(e)>-1},toObject:function(e){return n(this.callSuper("toObject",e),{objects:s(this.objects,"toObject",e)})},render:function(e,n){e.save(),this.transform(e);var r=Math.max(this.scaleX,this.scaleY);this.clipTo&&t.util.clipContext(this,e);for(var i=this.objects.length;i>0;i--){var s=this.objects[i-1],o=s.borderScaleFactor,u=s.hasRotatingPoint;s.borderScaleFactor=r,s.hasRotatingPoint=!1,s.render(e),s.borderScaleFactor=o,s.hasRotatingPoint=u}this.clipTo&&e.restore(),!n&&this.active&&(this.drawBorders(e),this.drawControls(e)),e.restore(),this.setCoords()},item:function(e){return this.getObjects()[e]},complexity:function(){return this.getObjects().reduce(function(e,t){return e+=typeof t.complexity=="function"?t.complexity():0,e},0)},_restoreObjectsState:function(){return this.objects.forEach(this._restoreObjectState,this),this},_restoreObjectState:function(e){var t=this.get("left"),n=this.get("top"),r=this.getAngle()*(Math.PI/180),i=Math.cos(r)*e.get("top")+Math.sin(r)*e.get("left"),s=-Math.sin(r)*e.get("top")+Math.cos(r)*e.get("left");return e.setAngle(e.getAngle()+this.getAngle()),e.set("left",t+s*this.get("scaleX")),e.set("top",n+i*this.get("scaleY")),e.set("scaleX",e.get("scaleX")*this.get("scaleX")),e.set("scaleY",e.get("scaleY")*this.get("scaleY")),e.setCoords(),e.hasControls=e.__origHasControls,delete e.__origHasControls,e.setActive(!1),e.setCoords(),this},destroy:function(){return this._restoreObjectsState()},saveCoords:function(){return this._originalLeft=this.get("left"),this._originalTop=this.get("top"),this},hasMoved:function(){return this._originalLeft!==this.get("left")||this._originalTop!==this.get("top")},setObjectsCoords:function(){return this.forEachObject(function(e){e.setCoords()}),this},activateAllObjects:function(){return this.forEachObject(function(e){e.setActive()}),this},forEachObject:t.StaticCanvas.prototype.forEachObject,_setOpacityIfSame:function(){var e=this.getObjects(),t=e[0]?e[0].get("opacity"):1,n=e.every(function(e){return e.get("opacity")===t});n&&(this.opacity=t)},_calcBounds:function(){var e=[],t=[],n,s,o,u,a,f,l,c=0,h=this.objects.length;for(;c<h;++c){a=this.objects[c],a.setCoords();for(var p in a.oCoords)e.push(a.oCoords[p].x),t.push(a.oCoords[p].y)}n=r(e),o=i(e),s=r(t),u=i(t),f=o-n||0,l=u-s||0,this.width=f,this.height=l,this.left=n+f/2||0,this.top=s+l/2||0},containsPoint:function(e){var t=this.get("width")/2,n=this.get("height")/2,r=this.get("left"),i=this.get("top");return r-t<e.x&&r+t>e.x&&i-n<e.y&&i+n>e.y},toGrayscale:function(){var e=this.objects.length;while(e--)this.objects[e].toGrayscale();return this},toSVG:function(){var e=[];for(var t=this.objects.length;t--;)e.push(this.objects[t].toSVG());return'<g transform="'+this.getSvgTransform()+'">'+e.join("")+"</g>"},get:function(e){if(e in u){if(this[e])return this[e];for(var t=0,n=this.objects.length;t<n;t++)if(this.objects[t][e])return!0;return!1}return e in this.delegatedProperties?this.objects[0]&&this.objects[0].get(e):this[e]}}),t.Group.fromObject=function(e,n){t.util.enlivenObjects(e.objects,function(r){delete e.objects,n&&n(new t.Group(r,e))})},t.Group.async=!0}(typeof exports!="undefined"?exports:this),function(e){"use strict";var t=fabric.util.object.extend;e.fabric||(e.fabric={});if(e.fabric.Image){fabric.warn("fabric.Image is already defined.");return}fabric.Image=fabric.util.createClass(fabric.Object,{type:"image",initialize:function(e,t){t||(t={}),this.callSuper("initialize",t),this._initElement(e),this._originalImage=this.getElement(),this._initConfig(t),this.filters=[],t.filters&&(this.filters=t.filters,this.applyFilters())},getElement:function(){return this._element},setElement:function(e){return this._element=e,this._initConfig(),this},getOriginalSize:function(){var e=this.getElement();return{width:e.width,height:e.height}},render:function(e,t){e.save();var n=this.transformMatrix;this.group&&e.translate(-this.group.width/2+this.width/2,-this.group.height/2+this.height/2),n&&e.transform(n[0],n[1],n[2],n[3],n[4],n[5]),t||this.transform(e),this._setShadow(e),this.clipTo&&fabric.util.clipContext(this,e),this._render(e),this.clipTo&&e.restore(),this._removeShadow(e),this.active&&!t&&(this.drawBorders(e),this.drawControls(e)),e.restore()},toObject:function(e){return t(this.callSuper("toObject",e),{src:this._originalImage.src||this._originalImage._src,filters:this.filters.concat()})},toSVG:function(){return'<g transform="'+this.getSvgTransform()+'">'+'<image xlink:href="'+this.getSvgSrc()+'" '+'style="'+this.getSvgStyles()+'" '+'transform="translate('+ -this.width/2+" "+ -this.height/2+')" '+'width="'+this.width+'" '+'height="'+this.height+'"'+"></image>"+"</g>"},getSrc:function(){return this.getElement().src||this.getElement()._src},toString:function(){return'#<fabric.Image: { src: "'+this.getSrc()+'" }>'},clone:function(e,t){this.constructor.fromObject(this.toObject(t),e)},applyFilters:function(e){if(this.filters.length===0){this.setElement(this._originalImage),e&&e();return}var t=typeof Buffer!="undefined"&&typeof window=="undefined",n=this._originalImage,r=fabric.util.createCanvasElement(),i=t?new(require("canvas").Image):fabric.document.createElement("img"),s=this;r.width=n.width,r.height=n.height,r.getContext("2d").drawImage(n,0,0,n.width,n.height),this.filters.forEach(function(e){e&&e.applyTo(r)}),i.onload=function(){s._element=i,e&&e(),i.onload=r=n=null},i.width=n.width,i.height=n.height;if(t){var o=r.toDataURL("image/png").substring(22);i.src=new Buffer(o,"base64"),s._element=i,e&&e()}else i.src=r.toDataURL("image/png");return this},_render:function(e){e.drawImage(this._element,-this.width/2,-this.height/2,this.width,this.height)},_resetWidthHeight:function(){var e=this.getElement();this.set("width",e.width),this.set("height",e.height)},_initElement:function(e){this.setElement(fabric.util.getById(e)),fabric.util.addClass(this.getElement(),fabric.Image.CSS_CANVAS)},_initConfig:function(e){e||(e={}),this.setOptions(e),this._setWidthHeight(e)},_initFilters:function(e){e.filters&&e.filters.length&&(this.filters=e.filters.map(function(e){return e&&fabric.Image.filters[e.type].fromObject(e)}))},_setWidthHeight:function(e){this.width="width"in e?e.width:this.getElement().width||0,this.height="height"in e?e.height:this.getElement().height||0},complexity:function(){return 1}}),fabric.Image.CSS_CANVAS="canvas-img",fabric.Image.prototype.getSvgSrc=fabric.Image.prototype.getSrc,fabric.Image.fromObject=function(e,t){var n=fabric.document.createElement("img"),r=e.src;e.width&&(n.width=e.width),e.height&&(n.height=e.height),n.onload=function(){fabric.Image.prototype._initFilters.call(e,e);var r=new fabric.Image(n,e);t&&t(r),n=n.onload=n.onerror=null},n.onerror=function(){fabric.log("Error loading "+n.src),t&&t(null,!0),n=n.onload=n.onerror=null},n.src=r},fabric.Image.fromURL=function(e,t,n){var r=fabric.document.createElement("img");r.onload=function(){t&&t(new fabric.Image(r,n)),r=r.onload=null},r.src=e},fabric.Image.ATTRIBUTE_NAMES="x y width height fill fill-opacity opacity stroke stroke-width transform xlink:href".split(" "),fabric.Image.fromElement=function(e,n,r){var i=fabric.parseAttributes(e,fabric.Image.ATTRIBUTE_NAMES);fabric.Image.fromURL(i["xlink:href"],n,t(r?fabric.util.object.clone(r):{},i))},fabric.Image.async=!0}(typeof exports!="undefined"?exports:this),fabric.util.object.extend(fabric.Object.prototype,{_getAngleValueForStraighten:function(){var e=this.getAngle()%360;return e>0?Math.round((e-1)/90)*90:Math.round(e/90)*90},straighten:function(){return this.setAngle(this._getAngleValueForStraighten()),this},fxStraighten:function(e){e=e||{};var t=function(){},n=e.onComplete||t,r=e.onChange||t,i=this;return fabric.util.animate({startValue:this.get("angle"),endValue:this._getAngleValueForStraighten(),duration:this.FX_DURATION,onChange:function(e){i.setAngle(e),r()},onComplete:function(){i.setCoords(),n()},onStart:function(){i.setActive(!1)}}),this}}),fabric.util.object.extend(fabric.StaticCanvas.prototype,{straightenObject:function(e){return e.straighten(),this.renderAll(),this},fxStraightenObject:function(e){return e.fxStraighten({onChange:this.renderAll.bind(this)}),this}}),fabric.Image.filters={},fabric.Image.filters.Grayscale=fabric.util.createClass({type:"Grayscale",applyTo:function(e){var t=e.getContext("2d"),n=t.getImageData(0,0,e.width,e.height),r=n.data,i=n.width,s=n.height,o,u,a,f;for(a=0;a<i;a++)for(f=0;f<s;f++)o=a*4*s+f*4,u=(r[o]+r[o+1]+r[o+2])/3,r[o]=u,r[o+1]=u,r[o+2]=u;t.putImageData(n,0,0)},toJSON:function(){return{type:this.type}}}),fabric.Image.filters.Grayscale.fromObject=function(){return new fabric.Image.filters.Grayscale},fabric.Image.filters.RemoveWhite=fabric.util.createClass({type:"RemoveWhite",initialize:function(e){e||(e={}),this.threshold=e.threshold||30,this.distance=e.distance||20},applyTo:function(e){var t=e.getContext("2d"),n=t.getImageData(0,0,e.width,e.height),r=n.data,i=this.threshold,s=this.distance,o=255-i,u=Math.abs,a,f,l;for(var c=0,h=r.length;c<h;c+=4)a=r[c],f=r[c+1],l=r[c+2],a>o&&f>o&&l>o&&u(a-f)<s&&u(a-l)<s&&u(f-l)<s&&(r[c+3]=1);t.putImageData(n,0,0)},toJSON:function(){return{type:this.type,threshold:this.threshold,distance:this.distance}}}),fabric.Image.filters.RemoveWhite.fromObject=function(e){return new fabric.Image.filters.RemoveWhite(e)},fabric.Image.filters.Invert=fabric.util.createClass({type:"Invert",applyTo:function(e){var t=e.getContext("2d"),n=t.getImageData(0,0,e.width,e.height),r=n.data,i=r.length,s;for(s=0;s<i;s+=4)r[s]=255-r[s],r[s+1]=255-r[s+1],r[s+2]=255-r[s+2];t.putImageData(n,0,0)},toJSON:function(){return{type:this.type}}}),fabric.Image.filters.Invert.fromObject=function(){return new fabric.Image.filters.Invert},fabric.Image.filters.Sepia=fabric.util.createClass({type:"Sepia",applyTo:function(e){var t=e.getContext("2d"),n=t.getImageData(0,0,e.width,e.height),r=n.data,i=r.length,s,o;for(s=0;s<i;s+=4)o=.3*r[s]+.59*r[s+1]+.11*r[s+2],r[s]=o+100,r[s+1]=o+50,r[s+2]=o+255;t.putImageData(n,0,0)},toJSON:function(){return{type:this.type}}}),fabric.Image.filters.Sepia.fromObject=function(){return new fabric.Image.filters.Sepia},fabric.Image.filters.Sepia2=fabric.util.createClass({type:"Sepia2",applyTo:function(e){var t=e.getContext("2d"),n=t.getImageData(0,0,e.width,e.height),r=n.data,i=r.length,s,o,u,a;for(s=0;s<i;s+=4)o=r[s],u=r[s+1],a=r[s+2],r[s]=(o*.393+u*.769+a*.189)/1.351,r[s+1]=(o*.349+u*.686+a*.168)/1.203,r[s+2]=(o*.272+u*.534+a*.131)/2.14;t.putImageData(n,0,0)},toJSON:function(){return{type:this.type}}}),fabric.Image.filters.Sepia2.fromObject=function(){return new fabric.Image.filters.Sepia2},fabric.Image.filters.Brightness=fabric.util.createClass({type:"Brightness",initialize:function(e){e||(e={}),this.brightness=e.brightness||100},applyTo:function(e){var t=e.getContext("2d"),n=t.getImageData(0,0,e.width,e.height),r=n.data,i=this.brightness;for(var s=0,o=r.length;s<o;s+=4)r[s]+=i,r[s+1]+=i,r[s+2]+=i;t.putImageData(n,0,0)},toJSON:function(){return{type:this.type,brightness:this.brightness}}}),fabric.Image.filters.Brightness.fromObject=function(e){return new fabric.Image.filters.Brightness(e)},fabric.Image.filters.Noise=fabric.util.createClass({type:"Noise",initialize:function(e){e||(e={}),this.noise=e.noise||100},applyTo:function(e){var t=e.getContext("2d"),n=t.getImageData(0,0,e.width,e.height),r=n.data,i=this.noise,s;for(var o=0,u=r.length;o<u;o+=4)s=(.5-Math.random())*i,r[o]+=s,r[o+1]+=s,r[o+2]+=s;t.putImageData(n,0,0)},toJSON:function(){return{type:this.type,noise:this.noise}}}),fabric.Image.filters.Noise.fromObject=function(e){return new fabric.Image.filters.Noise(e)},fabric.Image.filters.GradientTransparency=fabric.util.createClass({type:"GradientTransparency",initialize:function(e){e||(e={}),this.threshold=e.threshold||100},applyTo:function(e){var t=e.getContext("2d"),n=t.getImageData(0,0,e.width,e.height),r=n.data,i=this.threshold,s=r.length;for(var o=0,u=r.length;o<u;o+=4)r[o+3]=i+255*(s-o)/s;t.putImageData(n,0,0)},toJSON:function(){return{type:this.type,threshold:this.threshold}}}),fabric.Image.filters.GradientTransparency.fromObject=function(e){return new fabric.Image.filters.GradientTransparency(e)},fabric.Image.filters.Tint=fabric.util.createClass({type:"Tint",initialize:function(e){e||(e={}),this.color=e.color||0},applyTo:function(e){var t=e.getContext("2d"),n=t.getImageData(0,0,e.width,e.height),r=n.data,i=r.length,s,o,u=parseInt(this.color,10).toString(16),a=parseInt("0x"+u.substr(0,2),16),f=parseInt("0x"+u.substr(2,2),16),l=parseInt("0x"+u.substr(4,2),16);for(s=0;s<i;s+=4)o=r[s+3],o>0&&(r[s]=a,r[s+1]=f,r[s+2]=l);t.putImageData(n,0,0)},toJSON:function(){return{type:this.type,color:this.color}}}),fabric.Image.filters.Tint.fromObject=function(e){return new fabric.Image.filters.Tint(e)},fabric.Image.filters.Convolute=fabric.util.createClass({type:"Convolute",initialize:function(e){e||(e={}),this.opaque=e.opaque,this.matrix=e.matrix||[0,0,0,0,1,0,0,0,0];var t=fabric.util.createCanvasElement();this.tmpCtx=t.getContext("2d")},_createImageData:function(e,t){return this.tmpCtx.createImageData(e,t)},applyTo:function(e){var t=this.matrix,n=e.getContext("2d"),r=n.getImageData(0,0,e.width,e.height),i=Math.round(Math.sqrt(t.length)),s=Math.floor(i/2),o=r.data,u=r.width,a=r.height,f=u,l=a,c=this._createImageData(f,l),h=c.data,p=this.opaque?1:0;for(var d=0;d<l;d++)for(var v=0;v<f;v++){var m=d,g=v,y=(d*f+v)*4,b=0,w=0,E=0,S=0;for(var x=0;x<i;x++)for(var T=0;T<i;T++){var N=m+x-s,C=g+T-s;if(N>=0&&N<a&&C>=0&&C<u){var k=(N*u+C)*4,L=t[x*i+T];b+=o[k]*L,w+=o[k+1]*L,E+=o[k+2]*L,S+=o[k+3]*L}}h[y]=b,h[y+1]=w,h[y+2]=E,h[y+3]=S+p*(255-S)}n.putImageData(c,0,0)},toJSON:function(){return{type:this.type,matrix:this.matrix}}}),fabric.Image.filters.Convolute.fromObject=function(e){return new fabric.Image.filters.Convolute(e)},fabric.Image.filters.Pixelate=fabric.util.createClass({type:"Pixelate",initialize:function(e){e||(e={}),this.blocksize=e.blocksize||4},applyTo:function(e){var t=e.getContext("2d"),n=t.getImageData(0,0,e.width,e.height),r=n.data,i=n.width,s=n.height,o,u,a,f,l,c,h;for(u=0;u<i;u+=this.blocksize)for(a=0;a<s;a+=this.blocksize){o=u*4*s+a*4,f=r[o],l=r[o+1],c=r[o+2],h=r[o+3];for(var p=u,d=u+this.blocksize;p<d;p++)for(var v=a,m=a+this.blocksize;v<m;v++)o=p*4*s+v*4,r[o]=f,r[o+1]=l,r[o+2]=c,r[o+3]=h}t.putImageData(n,0,0)},toJSON:function(){return{type:this.type,blocksize:this.blocksize}}}),fabric.Image.filters.Pixelate.fromObject=function(e){return new fabric.Image.filters.Pixelate(e)},function(e){"use strict";var t=e.fabric||(e.fabric={}),n=t.util.object.extend,r=t.util.object.clone,i=t.util.toFixed;if(t.Text){t.warn("fabric.Text is already defined");return}var s={fontSize:!0,fontWeight:!0,fontFamily:!0,textDecoration:!0,fontStyle:!0,lineHeight:!0,strokeStyle:!0,strokeWidth:!0,text:!0},o=t.Object.prototype.stateProperties.concat();o.push("fontFamily","fontWeight","fontSize","path","text","textDecoration","textShadow","textAlign","fontStyle","lineHeight","strokeStyle","strokeWidth","backgroundColor","textBackgroundColor","useNative"),t.Text=t.util.createClass(t.Object,{fontSize:40,fontWeight:"normal",fontFamily:"Times New Roman",textDecoration:"",textShadow:"",textAlign:"left",fontStyle:"",lineHeight:1.3,strokeStyle:"",strokeWidth:1,backgroundColor:"",textBackgroundColor:"",path:null,type:"text",useNative:!0,stateProperties:o,initialize:function(e,t){t=t||{},this.text=e,this.setOptions(t),this._initDimensions(),this.setCoords()},_initDimensions:function(){var e=t.util.createCanvasElement();this._render(e.getContext("2d"))},toString:function(){return"#<fabric.Text ("+this.complexity()+'): { "text": "'+this.text+'", "fontFamily": "'+this.fontFamily+'" }>'},_render:function(e){typeof Cufon=="undefined"||this.useNative===!0?this._renderViaNative(e):this._renderViaCufon(e)},_renderViaCufon:function(e){var t=Cufon.textOptions||(Cufon.textOptions={});t.left=this.left,t.top=this.top,t.context=e,t.color=this.fill;var n=this._initDummyElementForCufon();this.transform(e),Cufon.replaceElement(n,{engine:"canvas",separate:"none",fontFamily:this.fontFamily,fontWeight:this.fontWeight,textDecoration:this.textDecoration,textShadow:this.textShadow,textAlign:this.textAlign,fontStyle:this.fontStyle,lineHeight:this.lineHeight,strokeStyle:this.strokeStyle,strokeWidth:this.strokeWidth,backgroundColor:this.backgroundColor,textBackgroundColor:this.textBackgroundColor}),this.width=t.width,this.height=t.height,this._totalLineHeight=t.totalLineHeight,this._fontAscent=t.fontAscent,this._boundaries=t.boundaries,this._shadowOffsets=t.shadowOffsets,this._shadows=t.shadows||[],n=null,this.setCoords()},_renderViaNative:function(e){this.transform(e),this._setTextStyles(e);var n=this.text.split(/\r?\n/);this.width=this._getTextWidth(e,n),this.height=this._getTextHeight(e,n),this._renderTextBackground(e,n),this.textAlign!=="left"&&this.textAlign!=="justify"&&(e.save(),e.translate(this.textAlign==="center"?this.width/2:this.width,0)),this._setTextShadow(e),this.clipTo&&t.util.clipContext(this,e),this._renderTextFill(e,n),this._renderTextStroke(e,n),this.clipTo&&e.restore(),this.textShadow&&e.restore(),this.textAlign!=="left"&&this.textAlign!=="justify"&&e.restore(),this._renderTextDecoration(e,n),this._setBoundaries(e,n),this._totalLineHeight=0,this.setCoords()},_setBoundaries:function(e,t){this._boundaries=[];for(var n=0,r=t.length;n<r;n++){var i=this._getLineWidth(e,t[n]),s=this._getLineLeftOffset(i);this._boundaries.push({height:this.fontSize*this.lineHeight,width:i,left:s})}},_setTextStyles:function(e){e.fillStyle=this.fill.toLive?this.fill.toLive(e):this.fill,e.strokeStyle=this.strokeStyle,e.lineWidth=this.strokeWidth,e.textBaseline="alphabetic",e.textAlign=this.textAlign,e.font=this._getFontDeclaration()},_getTextHeight:function(e,t){return this.fontSize*t.length*this.lineHeight},_getTextWidth:function(e,t){var n=e.measureText(t[0]).width;for(var r=1,i=t.length;r<i;r++){var s=e.measureText(t[r]).width;s>n&&(n=s)}return n},_setTextShadow:function(e){if(this.textShadow){var t=/\s+(-?\d+)(?:px)?\s+(-?\d+)(?:px)?\s+(\d+)(?:px)?\s*/,n=this.textShadow,r=t.exec(this.textShadow),i=n.replace(t,"");e.save(),e.shadowColor=i,e.shadowOffsetX=parseInt(r[1],10),e.shadowOffsetY=parseInt(r[2],10),e.shadowBlur=parseInt(r[3],10),this._shadows=[{blur:e.shadowBlur,color:e.shadowColor,offX:e.shadowOffsetX,offY:e.shadowOffsetY}],this._shadowOffsets=[[parseInt(e.shadowOffsetX,10),parseInt(e.shadowOffsetY,10)]]}},_drawTextLine:function(e,t,n,r,i){if(this.textAlign!=="justify"){t[e](n,r,i);return}var s=t.measureText(n).width,o=this.width;if(o>s){var u=n.split(/\s+/),a=t.measureText(n.replace(/\s+/g,"")).width,f=o-a,l=u.length-1,c=f/l,h=0;for(var p=0,d=u.length;p<d;p++)t[e](u[p],r+h,i),h+=t.measureText(u[p]).width+c}else t[e](n,r,i)},_renderTextFill:function(e,t){this._boundaries=[];for(var n=0,r=t.length;n<r;n++)this._drawTextLine("fillText",e,t[n],-this.width/2,-this.height/2+n*this.fontSize*this.lineHeight+this.fontSize)},_renderTextStroke:function(e,t){if(this.strokeStyle){e.beginPath();for(var n=0,r=t.length;n<r;n++)this._drawTextLine("strokeText",e,t[n],-this.width/2,-this.height/2+n*this.fontSize*this.lineHeight+this.fontSize);e.closePath()}},_renderTextBackground:function(e,t){this._renderTextBoxBackground(e),this._renderTextLinesBackground(e,t)},_renderTextBoxBackground:function(e){this.backgroundColor&&(e.save(),e.fillStyle=this.backgroundColor,e.fillRect(-this.width/2,-this.height/2,this.width,this.height),e.restore())},_renderTextLinesBackground:function(e,t){if(this.textBackgroundColor){e.save(),e.fillStyle=this.textBackgroundColor;for(var n=0,r=t.length;n<r;n++)if(t[n]!==""){var i=this._getLineWidth(e,t[n]),s=this._getLineLeftOffset(i);e.fillRect(-this.width/2+s,-this.height/2+n*this.fontSize*this.lineHeight,i,this.fontSize*this.lineHeight)}e.restore()}},_getLineLeftOffset:function(e){return this.textAlign==="center"?(this.width-e)/2:this.textAlign==="right"?this.width-e:0},_getLineWidth:function(e,t){return this.textAlign==="justify"?this.width:e.measureText(t).width},_renderTextDecoration:function(e,t){function i(i){for(var s=0,o=t.length;s<o;s++){var u=r._getLineWidth(e,t[s]),a=r._getLineLeftOffset(u);e.fillRect(-r.width/2+a,i+s*r.fontSize*r.lineHeight-n,u,1)}}var n=this._getTextHeight(e,t)/2,r=this;this.textDecoration.indexOf("underline")>-1&&i(this.fontSize),this.textDecoration.indexOf("line-through")>-1&&i(this.fontSize/2),this.textDecoration.indexOf("overline")>-1&&i(0)},_getFontDeclaration:function(){return[t.isLikelyNode?this.fontWeight:this.fontStyle,t.isLikelyNode?this.fontStyle:this.fontWeight,this.fontSize+"px",t.isLikelyNode?'"'+this.fontFamily+'"':this.fontFamily].join(" ")},_initDummyElementForCufon:function(){var e=t.document.createElement("pre"),n=t.document.createElement("div");return n.appendChild(e),typeof G_vmlCanvasManager=="undefined"?e.innerHTML=this.text:e.innerText=this.text.replace(/\r?\n/gi,"\r"),e.style.fontSize=this.fontSize+"px",e.style.letterSpacing="normal",e},render:function(e,t){e.save(),this._render(e),!t&&this.active&&(this.drawBorders(e),this.drawControls(e)),e.restore()},toObject:function(e){return n(this.callSuper("toObject",e),{text:this.text,fontSize:this.fontSize,fontWeight:this.fontWeight,fontFamily:this.fontFamily,fontStyle:this.fontStyle,lineHeight:this.lineHeight,textDecoration:this.textDecoration,textShadow:this.textShadow,textAlign:this.textAlign,path:this.path,strokeStyle:this.strokeStyle,strokeWidth:this.strokeWidth,backgroundColor:this.backgroundColor,textBackgroundColor:this.textBackgroundColor,useNative:this.useNative})},toSVG:function(){var e=this.text.split(/\r?\n/),t=this.useNative?this.fontSize*this.lineHeight:-this._fontAscent-this._fontAscent/5*this.lineHeight,n=-(this.width/2),r=this.useNative?this.fontSize-1:this.height/2-e.length*this.fontSize-this._totalLineHeight,s=this._getSVGTextAndBg(t,n,e),o=this._getSVGShadows(t,e);return r+=this._fontAscent?this._fontAscent/5*this.lineHeight:0,['<g transform="',this.getSvgTransform(),'">',s.textBgRects.join(""),"<text ",this.fontFamily?"font-family=\"'"+this.fontFamily+"'\" ":"",this.fontSize?'font-size="'+this.fontSize+'" ':"",this.fontStyle?'font-style="'+this.fontStyle+'" ':"",this.fontWeight?'font-weight="'+this.fontWeight+'" ':"",this.textDecoration?'text-decoration="'+this.textDecoration+'" ':"",'style="',this.getSvgStyles(),'" ','transform="translate(',i(n,2)," ",i(r,2),')">',o.join(""),s.textSpans.join(""),"</text>","</g>"].join("")},_getSVGShadows:function(e,n){var r=[],s,o,u,a,f=1;if(!this._shadows||!this._boundaries)return r;for(s=0,u=this._shadows.length;s<u;s++)for(o=0,a=n.length;o<a;o++)if(n[o]!==""){var l=this._boundaries&&this._boundaries[o]?this._boundaries[o].left:0;r.push('<tspan x="',i(l+f+this._shadowOffsets[s][0],2),o===0||this.useNative?'" y':'" dy','="',i(this.useNative?e*o-this.height/2+this._shadowOffsets[s][1]:e+(o===0?this._shadowOffsets[s][1]:0),2),'" ',this._getFillAttributes(this._shadows[s].color),">",t.util.string.escapeXml(n[o]),"</tspan>"),f=1}else f++;return r},_getSVGTextAndBg:function(e,n,r){var s=[],o=[],u,a,f,l=1;this.backgroundColor&&this._boundaries&&o.push("<rect ",this._getFillAttributes(this.backgroundColor),' x="',i(-this.width/2,2),'" y="',i(-this.height/2,2),'" width="',i(this.width,2),'" height="',i(this.height,2),'"></rect>');for(u=0,f=r.length;u<f;u++){r[u]!==""?(a=this._boundaries&&this._boundaries[u]?i(this._boundaries[u].left,2):0,s.push('<tspan x="',a,'" ',u===0||this.useNative?"y":"dy",'="',i(this.useNative?e*u-this.height/2:e*l,2),'" ',this._getFillAttributes(this.fill),">",t.util.string.escapeXml(r[u]),"</tspan>"),l=1):l++;if(!this.textBackgroundColor||!this._boundaries)continue;o.push("<rect ",this._getFillAttributes(this.textBackgroundColor),' x="',i(n+this._boundaries[u].left,2),'" y="',i(e*u-this.height/2,2),'" width="',i(this._boundaries[u].width,2),'" height="',i(this._boundaries[u].height,2),'"></rect>')}return{textSpans:s,textBgRects:o}},_getFillAttributes:function(e){var n=e?new t.Color(e):"";return!n||!n.getSource()||n.getAlpha()===1?'fill="'+e+'"':'opacity="'+n.getAlpha()+'" fill="'+n.setAlpha(1).toRgb()+'"'},setColor:function(e){return this.set("fill",e),this},getText:function(){return this.text},_set:function(e,t){e==="fontFamily"&&this.path&&(this.path=this.path.replace(/(.*?)([^\/]*)(\.font\.js)/,"$1"+t+"$3")),this.callSuper("_set",e,t),e in s&&(this._initDimensions(),this.setCoords())}}),t.Text.ATTRIBUTE_NAMES="x y fill fill-opacity opacity stroke stroke-width transform font-family font-style font-weight font-size text-decoration".split(" "),t.Text.fromObject=function(e){return new t.Text(e.text,r(e))},t.Text.fromElement=function(e,n){if(!e)return null;var r=t.parseAttributes(e,t.Text.ATTRIBUTE_NAMES);n=t.util.object.extend(n?t.util.object.clone(n):{},r);var i=new t.Text(e.textContent,n);return i.set({left:i.getLeft()+i.getWidth()/2,top:i.getTop()-i.getHeight()/2}),i},t.util.createAccessors(t.Text)}(typeof exports!="undefined"?exports:this),function(){function request(e,t,n){var r=URL.parse(e),i=HTTP.request({hostname:r.hostname,port:r.port,path:r.pathname,method:"GET"},function(e){var r="";t&&e.setEncoding(t),e.on("end",function(){n(r)}),e.on("data",function(t){e.statusCode===200&&(r+=t)})});i.on("error",function(e){e.errno===process.ECONNREFUSED?fabric.log("ECONNREFUSED: connection refused to "+
r.hostname+":"+r.port):fabric.log(e.message)})}function request_fs(e,t){var n=require("fs"),r=n.createReadStream(e),i="";r.on("data",function(e){i+=e}),r.on("end",function(){t(i)})}if(typeof document!="undefined"&&typeof window!="undefined")return;var DOMParser=(new require("xmldom")).DOMParser,URL=require("url"),HTTP=require("http"),Canvas=require("canvas"),Image=require("canvas").Image;fabric.util.loadImage=function(e,t,n){var r=function(r){i.src=new Buffer(r,"binary"),i._src=e,t&&t.call(n,i)},i=new Image;e&&e.indexOf("data")===0?(i.src=i._src=e,t&&t.call(n,i)):e&&e.indexOf("http")!==0?request_fs(e,r):e&&request(e,"binary",r)},fabric.loadSVGFromURL=function(e,t){e=e.replace(/^\n\s*/,"").replace(/\?.*$/,"").trim(),request(e,"",function(e){fabric.loadSVGFromString(e,t)})},fabric.loadSVGFromString=function(e,t){var n=(new DOMParser).parseFromString(e);fabric.parseSVGDocument(n.documentElement,function(e,n){t(e,n)})},fabric.util.getScript=function(url,callback){request(url,"",function(body){eval(body),callback&&callback()})},fabric.Image.fromObject=function(e,t){fabric.util.loadImage(e.src,function(n){var r=new fabric.Image(n);r._initConfig(e),r._initFilters(e),t(r)})},fabric.createCanvasForNode=function(e,t){var n=fabric.document.createElement("canvas"),r=new Canvas(e||600,t||600);n.style={},n.width=r.width,n.height=r.height;var i=fabric.Canvas||fabric.StaticCanvas,s=new i(n);return s.contextContainer=r.getContext("2d"),s.nodeCanvas=r,s.Font=Canvas.Font,s},fabric.StaticCanvas.prototype.createPNGStream=function(){return this.nodeCanvas.createPNGStream()},fabric.StaticCanvas.prototype.createJPEGStream=function(e){return this.nodeCanvas.createJPEGStream(e)};var origSetWidth=fabric.StaticCanvas.prototype.setWidth;fabric.StaticCanvas.prototype.setWidth=function(e){return origSetWidth.call(this,e),this.nodeCanvas.width=e,this},fabric.Canvas&&(fabric.Canvas.prototype.setWidth=fabric.StaticCanvas.prototype.setWidth);var origSetHeight=fabric.StaticCanvas.prototype.setHeight;fabric.StaticCanvas.prototype.setHeight=function(e){return origSetHeight.call(this,e),this.nodeCanvas.height=e,this},fabric.Canvas&&(fabric.Canvas.prototype.setHeight=fabric.StaticCanvas.prototype.setHeight)}();

/*! signature-pad.js - 0.0.1 - 2013-06-21 - scottmotte */
/*! signature-mark.js - 0.0.1 - 2013-05-21 - scottmotte */
(function(exports){
  var SignatureMark = function(canvas) {
    if(!(this instanceof SignatureMark)){
      return new SignatureMark(canvas);
    }

    this.canvas = canvas;
    this.init();

    return this;
  };

  SignatureMark.prototype.init = function() {
    this.initVariables();
    this.initPainters();
    this.initEvents();
  };

  exports.SignatureMark = SignatureMark;

}(this));

(function(SignatureMark){
  SignatureMark.prototype.initEvents = function() {
    var self = this;
    self.canvas.addEventListener(self.mouse_down, function(e)     { self.onCanvasMouseDown(self, e); }, false);
    self.canvas.addEventListener(self.mouse_move, function(e)     { self.onCanvasMouseMove(self, e); }, false);
    self.canvas.addEventListener('contextmenu', function(e)       { self.preventRightClick(self, e); }, false);

    document.addEventListener(self.mouse_up, function(e)          { self.onCanvasMouseUp(self, e); }, false);
    self.canvas.addEventListener(self.mouse_up, function(e)       { self.onCanvasMouseUp(self, e); }, false);  
  };

  SignatureMark.prototype.preventRightClick = function(self, e) {
    e.preventDefault();
  };

  SignatureMark.prototype.onCanvasMouseDown = function(self, e) {
    e.preventDefault();
    self.setCanvasOffset(self);
    self.startDrawingStroke(self);
    self.setMouseXAndMouseY(self, e);
    self.setPainters(self);
  };

  SignatureMark.prototype.onCanvasMouseMove = function(self, e) {
    e.preventDefault();
    self.setMouseXAndMouseY(self, e);
  };

  SignatureMark.prototype.onCanvasMouseUp = function(self, e) {
    self.stopDrawingStroke(self);
  };

  SignatureMark.prototype.setMouseXAndMouseY = function(self, event) {
    if (!!self.touch_supported) {
      target                 = event.touches[0];
      self.mouseX            = target.pageX - self.canvasOffsetLeft;
      self.mouseY            = target.pageY - self.canvasOffsetTop;
    } else {
      self.mouseX            = event.pageX - self.canvasOffsetLeft;
      self.mouseY            = event.pageY - self.canvasOffsetTop;
    }
  };

  SignatureMark.prototype.setCanvasOffset = function(self) {
    canvasOffset              = self.Offset(self.canvas);
    self.canvasOffsetLeft     = canvasOffset.left;
    self.canvasOffsetTop      = canvasOffset.top;
  };
}(SignatureMark));

(function(SignatureMark){
  SignatureMark.prototype.Offset = function(element) {
    if (element === undefined) return null;
    var obj = element.getBoundingClientRect();
    return {
      left: obj.left + window.pageXOffset,
      top: obj.top + window.pageYOffset
    };
  };
}(SignatureMark));

(function(SignatureMark){  
  SignatureMark.prototype.initPainters = function() {
    this.painters = [];
    for(var i = 0; i < this.max_strokes; i++) {
      var ease = Math.random() * 0.05 + this.easing;
      this.painters.push({
        dx : 0,
        dy : 0,
        ax : 0,
        ay : 0,
        div : 0.1,
        ease : ease
      });
    }
  };

  SignatureMark.prototype.setPainters = function(self) {
    for(var i = 0; i < self.painters.length; i++) {
      pntr    = self.painters[i];
      pntr.dx = self.mouseX;
      pntr.dy = self.mouseY;
    }
  };
}(SignatureMark));

(function(SignatureMark){
  SignatureMark.prototype.drawStroke = function(self) {
    var i;
    for(i = 0; i < self.painters.length; i++) {
      self.context.beginPath();
      
      pntr = self.painters[i];
      self.context.moveTo(pntr.dx, pntr.dy);
      var dx1 = pntr.ax = (pntr.ax + (pntr.dx - self.mouseX) * pntr.div) * pntr.ease;
      pntr.dx -= dx1;
      var dx2 = pntr.dx;
      var dy1 = pntr.ay = (pntr.ay + (pntr.dy - self.mouseY) * pntr.div) * pntr.ease;
      pntr.dy -= dy1;
      var dy2 = pntr.dy;
      self.context.lineTo(dx2, dy2);
      self.context.stroke();
    }
  };

  SignatureMark.prototype.startDrawingStroke = function(self) {
    var interval = setInterval(function() { self.drawStroke(self); }, self.refresh_rate);
    self.strokeIntervals.push(interval);
  };

  SignatureMark.prototype.stopDrawingStroke = function(self) {
    for(var i = 0; i < self.strokeIntervals.length; i++) {
      clearInterval(self.strokeIntervals[i]);
    }
  };
}(SignatureMark));

(function(SignatureMark){
  SignatureMark.prototype.initVariables = function() {
    this.touch_supported      = (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) ? true : false;
    this.context              = this.canvas.getContext('2d');
    this.color                = [0, 0, 0];
    this.brush_pressure       = 0.5;
    this.context.strokeStyle  = "rgba(" + this.color[0] + ", " + this.color[1] + ", " + this.color[2] + ", " + this.brush_pressure + ")";
    this.context.lineWidth    = 2.5; // brush size
    this.painters             = [];
    this.mouseX               = 0;
    this.mouseY               = 0;
    this.strokeIntervals      = [];
    this.refresh_rate         = 5;
    this.max_strokes          = 12;
    this.easing               = 0.7;
    this.mouse_down           = "mousedown";
    this.mouse_move           = "mousemove";
    this.mouse_up             = "mouseup";

    if (!!this.touch_supported) {
      this.mouse_down         = "touchstart";
      this.mouse_move         = "touchmove";
      this.mouse_up           = "touchend";
    } else {
      this.refresh_rate       = 10;
      this.max_strokes        = 100;
    }
  };

}(SignatureMark));

(function(exports){
  var SignaturePad = function() {
    if(!(this instanceof SignaturePad)){
      return new SignaturePad();
    }

    this.uuid      = this.Uuid();
    this.script    = this.CurrentlyExecutedScript();
    this.init();

    return this;
  };

  SignaturePad.prototype.init = function() {
    if (this.script) {
      this.script.className += " signature-pad-script";
      this.script.id        = "signature-pad-script-"+this.uuid;

      this.draw();
      this.events();
      SignatureMark(this.canvas);
    } else {
      console.error("Could not find script tag to initialize on.");
    }
  };

  exports.SignaturePad = SignaturePad;

}(this));

(function(SignaturePad){
  var DEFAULT_SIGNATURE = "data:image/gif;base64,R0lGODlhRAIEAaIAAOLi1v7+5enp2ubm2Pf34e7u3QAAAAAAACH5BAAHAP8ALAAAAABEAgQBAAP/GLrc/jDKSau9OOvNu/9gKI5kaZ5oqq5s675wLM90bd94ru987//AoHBILBqPyKRyyWw6n9CodEqtWq/YrHbL7Xq/4LB4TC6bz+i0es1uu9/wuHxOr9vv+Lx+z+/7/4CBgoOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmpucnZ6foKGio6SlpqeoqaqrrK2ur7CxsrO0tba3uLm6u7y9vr/AwcLDxMXGx8jJysvMzc7P0NHS09TV1tfY2drb3N3e3+Dh4uPk5ebn6Onq6+zt7u/w8fLz9PX29/j5+vv8/f7/AAMKHEiwoMGDCBMqXMiwocOHECNKnEixosWLGDNq3Mix/6PHjyBDihxJsqTJkyhTqlzJsqXLlzBjypxJs6bNmzhz6tzJs6fPn0CDCh1KtKjRo0iTKl3KtKnTp1CjSp1KtarVq1izat3KtavXr2DDih1LtqzZs2jTql3Ltq3bt3Djyp1Lt67du3jz6t3Lt6/fv4ADCx5MuLDhw4gTK17MuLHjx5AjS55MubLly5gza97MubPnz6BDix5NurTp06hTq17NurXr17Bjy55Nu7bt27hz697Nu7fv38CDCx9OvLjx48iTK1/OvLnz59CjS59Ovbr169g5CADAnUCE7QAEZE9DgDuAARAKmB+vZoB57w3Ud2dP3rx4BuXn009jHgD8AP/5AVDAfmrIF94C5g1IoBr9eQfefQumYWABBkbIRn/vWbgGeBlqqEaAAnq4BogKingGiNyZiAaG+qk4xoMBoueiGPLJ2OCMYBgIn4EQ4rhFgP8FcKOPWgRYogITEqlFgg/0pyQWD6bHZAMsYuhAlVZSieV6Wm4JwJVeftnllmB6WSaZY2J5ppppVrmmm22y+KaccWbJQJhi3hnmnHYiuGedTgLKpZ5mCpqioXn6WSihaDLKpqNwQkrnC1FGEKiklyraqKaPchqpp5OC2qcCePKZKal/YnqqkKmKumqpiJo6qKuzoroorYeqWiurt9q6qa+dAvupsKESOyqvvyIbrLKKwzJbLAsERDtBtNIaKmuuuCZq7KutbrsrrLpi6624zh4LbrbXalsut72u+2237pJ77rjqzhtvvfDaq2++/LZr75MAByzwwAQXbPDBCCes8MIMN+zwwxBHLPHEFFds8cUYZ6zxxhx37PHHIIcs8sgkl2zyySinrPLKLLfs8sswxyzzzDTXbPPNbiUAADs=";

  SignaturePad.prototype.draw = function() {   
    this._drawCss();
    this._drawPad();
    this._drawOverlay();
    this._drawRotator();
    this.setSize();
  };

  SignaturePad.prototype.setSize = function(e) {
    if (this.StandardScreen()) {
      this.wrapper.width        = 580;
      this.wrapper.setAttribute("style","width:580px");
      this.canvas.height        = 260;
      this.canvas.width         = 580;
    } else {
      // set for iPhone
      this.wrapper.style.width  = 446;
      this.wrapper.setAttribute("style","width:446px");
      this.wrapper.className    += " signature-iphone";
      this.canvas.height        = 200;
      this.canvas.width         = 446;
    }
  };

  SignaturePad.prototype._drawPad = function() {
    this.pad                          = document.createElement('div');
    // this.pad.setAttribute("style", "display:none");
    this.pad.className                = "signature-pad";
    this.pad.id                       = "signature-pad-"+this.uuid;

    this.pad_img                      = document.createElement('img');
    this.pad_img.className            = "signature-pad-img";
    this.pad_img.id                   = "signature-pad-img-"+this.uuid;
    this.pad_img.src                  = DEFAULT_SIGNATURE;
    this.pad.appendChild(this.pad_img);
    
    var pad_msg                       = document.createElement('div');
    var text_click_sign               = document.createTextNode("Click to Sign");
    var pad_msg_icon                  = document.createElement('span');
    pad_msg_icon.setAttribute("data-icon", "A");

    pad_msg.className                 = "signature-pad-msg";
    pad_msg.id                        = "signature-pad-msg-"+this.uuid;

    pad_msg.appendChild(text_click_sign);
    pad_msg.appendChild(pad_msg_icon);
    this.pad.appendChild(pad_msg);

    return this.InsertAfter(this.script, this.pad);
  };

  SignaturePad.prototype._drawOverlay = function() {
    this.overlay                    = document.createElement('div');
    // this.overlay.setAttribute("style", "display:none");
    this.overlay.className          = "signature-overlay";
    this.overlay.id                 = "signature-overlay-"+this.uuid;

    this.wrapper                    = document.createElement('div');
    this.wrapper.className          = "signature-wrapper";
    this.wrapper.id                 = "signature-wrapper-"+this.uuid;
    this.overlay.appendChild(this.wrapper);

    this.canvas                     = document.createElement('canvas');
    this.canvas.className           = "signature-canvas";
    this.canvas.id                  = "signature-canvas-"+this.uuid;

    this.close_signature            = document.createElement('a');
    var text_x                      = document.createTextNode(" x ");
    var pad_close_icon              = document.createElement('span');
    pad_close_icon.setAttribute("data-icon", "G");

    this.close_signature.className  = "signature-btn close-signature-btn";
    this.close_signature.id         = "close-signature-btn-"+this.uuid;
    this.close_signature.appendChild(text_x);
    this.close_signature.appendChild(pad_close_icon); 

    this.clear_signature            = document.createElement('a');
    var text_clear                  = document.createTextNode("Effacer");

    this.clear_signature.className  = "signature-btn clear-signature-btn";
    this.clear_signature.id         = "clear-signature-btn-"+this.uuid;
    this.clear_signature.appendChild(text_clear);

    this.add_signature              = document.createElement('a');
    var text_done                   = document.createTextNode("Terminé");
    var pad_done_icon               = document.createElement('span');
    pad_done_icon.setAttribute("data-icon", "A");

    this.add_signature.className    = "signature-btn add-signature-btn";
    this.add_signature.id           = "add-signature-btn-"+this.uuid;
    this.add_signature.appendChild(text_done);
    this.add_signature.appendChild(pad_done_icon);

    var clearer                     = document.createElement('div');
    clearer.className               = "signature-clearer";

    this.wrapper.appendChild(this.canvas);
    this.wrapper.appendChild(this.close_signature);
    this.wrapper.appendChild(this.clear_signature);
    this.wrapper.appendChild(this.add_signature);
    this.wrapper.appendChild(clearer);

    return document.body.appendChild(this.overlay);
  };

  SignaturePad.prototype._drawRotator = function() {
    this.rotator                    = document.createElement('div');
    // this.rotator.setAttribute("style", "display:none");
    this.rotator.className          = "signature-rotator";
    this.rotator.id                 = "signature-rotator-"+this.uuid;

    var rotator_msg                 = document.createElement('div');
    rotator_msg.className           = "signature-rotator-msg";
    var text_rotate                 = document.createTextNode("Tourner\u00B0");
    rotator_msg.appendChild(text_rotate);

    var rotator_icon                = document.createElement('div');
    rotator_icon.className          = "signature-rotator-icon";
    rotator_icon.setAttribute("data-icon", "L");

    this.rotator_close              = document.createElement('div');
    this.rotator_close.className    = "signature-rotator-close";
    this.rotator_close.id           = "signature-rotator-close-"+this.uuid;
    var text_x = document.createTextNode(" x ");
    this.rotator_close.appendChild(text_x);

    this.rotator.appendChild(rotator_msg);
    this.rotator.appendChild(rotator_icon);
    this.rotator.appendChild(this.rotator_close);

    return document.body.appendChild(this.rotator);
  };

  SignaturePad.prototype._drawCss = function() {
    this.css = "@font-face{font-family:'Pictos Pad';src:url(data:font/truetype;charset=utf-8;base64,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) format('truetype');src:url(data:font/woff;charset=utf-8;base64,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) format('woff');font-weight:normal;font-style:normal}"+
      ".signature-pad{position:relative;cursor:pointer;text-decoration:underline;background:rgba(253,253,0,0.1);width:200px;height:90px;border:2px dashed #cbd0d5;text-decoration:none}"+
      ".signature-pad [data-icon]:after{font-family:'Pictos Pad'!important;content:attr(data-icon);padding-left:5px}"+
      ".signature-pad .signature-pad-msg{position:absolute;color:#313440;font-family:sans-serif;font-size:14px;background:#eceef1;color:#313440;padding:0;filter:alpha(opacity=80);opacity:.80;top:0;right:0;text-align:center;padding:10px 35px 10px 10px}"+
      ".signature-pad .signature-pad-msg span{line-height:100%;position:absolute;top:4px;right:5px;font-size:30px;height:29px}"+
      ".signature-pad .signature-pad-img{position:absolute;top:0;left:0;width:100%;height:100%;border:none}"+
      ".signature-rotator{display:none;position:fixed;top:0;left:0;right:0;bottom:0;background:#dd4a38;z-index:1;text-align:center;font-family:sans-serif;z-index:99999999}"+
      ".signature-rotator [data-icon]:after{font-family:'Pictos Pad'!important;content:attr(data-icon);padding-left:5px}"+
      ".signature-rotator.signature-show{display:block}"+
      ".signature-rotator div{position:absolute;left:60%;top:44%;width:100%;margin-left:-50%;text-align:center;font-size:100px;line-height:100%}"+
      ".signature-rotator .signature-rotator-icon{top:37%;left:40%}"+
      ".signature-rotator .signature-rotator-msg{font-size:40px;-webkit-transform:rotate(-90deg);-moz-transform:rotate(-90deg);-ms-transform:rotate(-90deg);-o-transform:rotate(-90deg);filter:progid:dximagetransform.microsoft.basicimage(rotation=3)}"+
      ".signature-rotator .signature-rotator-close{font-size:50px;top:0;left:0;color:#9c3528;display:block;cursor:pointer;width:50px;margin-left:0;text-align:center}"+
      ".signature-overlay{display:none;position:fixed;top:0;left:0;right:0;bottom:0;background:#eceef1;z-index:88888888}"+
      ".signature-overlay.signature-show{display:block}"+
      ".signature-overlay .signature-clearer{clear:both}"+
      ".signature-overlay .signature-powered-by{float:right;filter:alpha(opacity=80);opacity:.80;text-decoration:none;display:block}"+
      ".signature-overlay .signature-powered-by text{text-decoration:none}"+
      ".signature-overlay .signature-wrapper{display:block;position:relative;width:100%;max-width:580px;margin:0 auto;margin-top:120px;background:none}"+
      ".signature-overlay .signature-wrapper.signature-iphone{margin-top:3px}"+
      ".signature-overlay .signature-wrapper [data-icon]:after{font-family:'Pictos Pad'!important;content:attr(data-icon);padding-left:5px}"+
      ".signature-overlay canvas{cursor:pointer;background:#fff;background:url(data:image/gif;base64,R0lGODlhRAIEAaIAAOHh4f///+bm5u/v7/j4+AAAAAAAAAAAACH5BAAHAP8ALAAAAABEAgQBAAP/SLHc/jDKSau9OOvNu/9gKI5kaZ5oqq5s675wLM90bd94ru987//AoHBILBqPyKRyyWw6n9CodEqtWq/YrHbL7Xq/4LB4TC6bz+i0es1uu9/wuHxOr9vv+Lx+z+/7/4CBgoOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmpucnZ6foKGio6SlpqeoqaqrrK2ur7CxsrO0tba3uLm6u7y9vr/AwcLDxMXGx8jJysvMzc7P0NHS09TV1tfY2drb3N3e3+Dh4uPk5ebn6Onq6+zt7u/w8fLz9PX29/j5+vv8/f7/AAMKHEiwoMGDCBMqXMiwocOHECNKnEixosWLGDNq3Mix/6PHjyBDihxJsqTJkyhTqlzJsqXLlzBjypxJs6bNmzhz6tzJs6fPn0CDCh1KtKjRo0iTKl3KtKnTp1CjSp1KtarVq1izat3KtavXr2DDih1LtqzZs2jTql3Ltq3bt3Djyp1Lt67du3jz6t3Lt6/fv4ADCx5MuLDhw4gTK17MuLHjx5AjS55MubLly5gza97MubPnz6BDix5NurTp06hTq17NurXr17Bjy55Nu7bt27hz697Nu7fv38CDCx9OvLjx48iTK1/OvLnz59CjS59Ovbr169izcxAAoLuCCALCD9CuZkB3AAIimEdPfg337uMdrBfwvT0aAufTN1gPgEB9+/9nvNcfAwS8Fx+AafBHnwLhCTDAfwiecV5/BTboX4TlnTfAfBBiKOGE3nnIBn8hirgGfhqayAaK8KmoRoET6ufihyB2OCMY4aHHIgA3ksFhAAIe2KMXPwag4JBfsFjfjv7ZiOQULApppIYXPnlFhQBIucCETloJxXsyypeiAyCW+UCZZpKJ5oRnrnlem27yqGacEMbp3X92UthAnlVuaWefAfCJp51wulnomoeimWiaexI6p6GPrlnnn4PSWambgAraqKWbQtopopEqGiqjDOQpw3wTsDmqqp+K2iqpfsa5KIizcnkpqK/SuqqtubJa6p+7vhlsd7UK26uxv8o6rJynxxK7bKaONstsspje6iq1ki5brLPSbjttrJ6+0GSX43YYLbbXgosrurAGeq666bqrbLfa1kvvvezqii+87Zpqb76+8qsvwMgKHLC84RpcMMLrKswtwQ87/C3D8frr5cUYZ6zxxhx37PHHIIcs8sgkl2zyySinrPLKLLfs8sswxyzzzDTXbPPNOOes88489+zzz0AHLfTQRBdt9NFIJ6300kw37fRcCQAAOw%3D%3D) no-repeat;background-size:100%;zoom:1;border:2px solid #cbd0d5;border-top:none;border-left:none}"+
      ".signature-overlay canvas:active{cursor:crosshair}"+
      ".signature-overlay .signature-btn{font-family:sans-serif;position:absolute;padding:9px;cursor:pointer;font-size:14px;text-align:center;background:#eceef1;color:#313440;-webkit-appearance:none;border:none;filter:alpha(opacity=50);opacity:.50;line-height:100%;border-radius:3px;-webkit-border-radius:3px;-moz-border-radius:3px}"+
      ".signature-overlay .signature-btn:hover{text-decoration:none}"+
      ".signature-overlay .signature-btn span{position:absolute;top:10.5px;right:5px;font-size:20px;filter:alpha(opacity=80);opacity:.80}"+
      ".signature-overlay .signature-btn.close-signature-btn{top:5px;left:5px;padding:9px 14px 9px 14px;color:#eceef1}"+
      ".signature-overlay .signature-btn.close-signature-btn span{color:#313440;right:10px}"+
      ".signature-overlay .signature-btn.clear-signature-btn{top:5px;left:45px}"+
      ".signature-overlay .signature-btn.add-signature-btn{top:10px;right:10px;padding-right:34px;border:2px solid #cbd0d5;border-top:1px solid #cbd0d5;border-left:1px solid #cbd0d5;text-transform:uppercase;filter:alpha(opacity=80);opacity:.80}"+
      ".signature-overlay .signature-btn.add-signature-btn span{top:9px;font-size:30px}";

    var style   = document.createElement('style');
    style.type  = 'text/css';
    if (style.styleSheet) {
      style.styleSheet.cssText = this.css;
    } else {
      style.appendChild(document.createTextNode(this.css));
    }
    return document.body.appendChild(style);
  };

}(SignaturePad));


(function(SignaturePad){
  var self;
  var CLICK             = "click";
  var TOUCH_SUPPORTED   = (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) ? true : false;
  if (!!TOUCH_SUPPORTED) {
    CLICK               = "touchend";
  }

  SignaturePad.prototype.events = function() {
    self = this;

    this.pad.addEventListener(CLICK, this.show, false);
    this.add_signature.addEventListener(CLICK, this.saveSignature, false);
    this.close_signature.addEventListener(CLICK, this.hide, false);
    this.clear_signature.addEventListener(CLICK, this.clear, false);
    this.wrapper.addEventListener(CLICK, function(e) { e.stopPropagation(); }, false);
    this.rotator_close.addEventListener(CLICK, this.hideRotatorAndPad, false);
    this.rotator_close.addEventListener(CLICK, this.hideRotatorAndPad, false);
    window.onresize = function(e) { self.showOrHideRotator(e); };
  };

  SignaturePad.prototype.saveSignature = function(e) {
    var data_url = self.canvas.toDataURL("png");
    self.FireEvent("signature_pad:data_url", self.script, data_url);
    self.hide(e);
    self.pad_img.src = data_url;
  };

  SignaturePad.prototype.show = function(e){
    if (e) { e.preventDefault(); }

    self.overlay.className += " signature-show";

    self.showOrHideRotator();
  };

  SignaturePad.prototype.hide = function(e){
    if (e) { e.preventDefault(); }

    self.overlay.className = "signature-overlay";
  };

  SignaturePad.prototype.clear = function(e) {
    if (e) { e.preventDefault(); }

    var context = self.canvas.getContext("2d");
    context.clearRect(0, 0, self.canvas.width, self.canvas.height);
  };

  SignaturePad.prototype.showOrHideRotator = function(e) {
    if (e) { e.preventDefault(); }

    if (!self.StandardScreen() && self.visible()) {
      var mql = window.matchMedia("(orientation: portrait)");
      if(mql.matches) {
        self.showRotator();
      } else {
        self.hideRotator();
      }
    } else {
      self.hideRotator();
    }
  };

  SignaturePad.prototype.visible = function(e){
    if (e) { e.preventDefault(); }

    return self.overlay.className.indexOf("signature-show") > 0;
  };

  SignaturePad.prototype.showRotator = function(e){
    if (e) { e.preventDefault(); }

    if (self.visible()) {
      self.rotator.className += " signature-show";
    }
  };

  SignaturePad.prototype.hideRotator = function(e){
    if (e) { e.preventDefault(); }

    self.rotator.className = "signature-rotator";
  };

  SignaturePad.prototype.hideRotatorAndPad = function(e) {
    if (e) { e.preventDefault(); }

    self.hide();
    self.hideRotator();
  };
}(SignaturePad));

(function(SignaturePad){  
  SignaturePad.prototype.Uuid = function() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
      var r, v;
      r = Math.random() * 16 | 0;
      v = (c === "x" ? r : r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  SignaturePad.prototype.CurrentlyExecutedScript = function() {
    var script;

    if (document) {
      var scripts = document.getElementsByTagName('script');
      script      = scripts[scripts.length - 1];
    }
    return script;
  };

  SignaturePad.prototype.InsertAfter = function(reference_node, new_node) {
    return reference_node.parentNode.insertBefore(new_node, reference_node.nextSibling);
  };
  
  SignaturePad.prototype.StandardScreen = function() {
    return document.body.clientWidth >= 580;
  };

  SignaturePad.prototype.FireEvent = function(name, target, data) {
    //Create a generic event
    var bubbles     = true;
    var cancelable  = true;
    var event       = document.createEvent("Events");
    //Initialize it to be the event we want
    event.initEvent(name, bubbles, cancelable);
    event.data = data;
    //FIRE!
    target.dispatchEvent(event);
  };


}(SignaturePad));

var signature_pad = SignaturePad();


(function(){
  fabric.tapping_target  = false;
  fabric.tapping         = false;

  var cursorMap = {
    'tr': 'ne-resize',
    'br': 'se-resize',
    'bl': 'sw-resize',
    'tl': 'nw-resize',
    'ml': 'w-resize',
    'mt': 'n-resize',
    'mr': 'e-resize',
    'mb': 's-resize'
  },
  addListener = fabric.util.addListener,
  removeListener = fabric.util.removeListener,
  getPointer = fabric.util.getPointer;

  fabric.util.object.extend(fabric.Canvas.prototype, /** @lends fabric.Canvas.prototype */ {
    /**
     * Adds mouse listeners to canvas
     * @private
     */
    _initEvents: function () {
      var _this = this;

      this._onMouseDown = this._onMouseDown.bind(this);
      this._onMouseMove = this._onMouseMove.bind(this);
      this._onMouseUp = this._onMouseUp.bind(this);
      this._onResize = this._onResize.bind(this);

      this._onGesture = function(e, s) {
        _this.__onTransformGesture(e, s);
      };

      addListener(fabric.window, 'resize', this._onResize);

      if (fabric.isTouchSupported) {
        addListener(this.upperCanvasEl, 'touchstart', this._onMouseDown);
        addListener(this.upperCanvasEl, 'touchmove', this._onMouseMove);

        if (typeof Event !== 'undefined' && 'add' in Event) {
          Event.add(this.upperCanvasEl, 'gesture', this._onGesture);
        }
      }
      else {
        addListener(this.upperCanvasEl, 'mousedown', this._onMouseDown);
        addListener(this.upperCanvasEl, 'mousemove', this._onMouseMove);
      }
    },

    /**
     * @private
     * @param {Event} e Event object fired on mousedown
     */
    _onMouseDown: function (e) {
      fabric.tapping = true;

      var target = this.findTarget(e);
      if (target) {
        fabric.tapping_target = true;
      } else {
        fabric.tapping_target = false;
      }

      this.__onMouseDown(e);

      !fabric.isTouchSupported && addListener(fabric.document, 'mouseup', this._onMouseUp);
      fabric.isTouchSupported && addListener(fabric.document, 'touchend', this._onMouseUp);

      !fabric.isTouchSupported && addListener(fabric.document, 'mousemove', this._onMouseMove);
      fabric.isTouchSupported && addListener(fabric.document, 'touchmove', this._onMouseMove);

      !fabric.isTouchSupported && removeListener(this.upperCanvasEl, 'mousemove', this._onMouseMove);
      fabric.isTouchSupported && removeListener(this.upperCanvasEl, 'touchmove', this._onMouseMove);
    },

    /**
     * @private
     * @param {Event} e Event object fired on mouseup
     */
    _onMouseUp: function (e) {
      this.__onMouseUp(e);

      !fabric.isTouchSupported && removeListener(fabric.document, 'mouseup', this._onMouseUp);
      fabric.isTouchSupported && removeListener(fabric.document, 'touchend', this._onMouseUp);

      !fabric.isTouchSupported && removeListener(fabric.document, 'mousemove', this._onMouseMove);
      fabric.isTouchSupported && removeListener(fabric.document, 'touchmove', this._onMouseMove);

      !fabric.isTouchSupported && addListener(this.upperCanvasEl, 'mousemove', this._onMouseMove);
      fabric.isTouchSupported && addListener(this.upperCanvasEl, 'touchmove', this._onMouseMove);

      fabric.tapping_target  = false;
      fabric.tapping         = false;
    },

    /**
     * @private
     * @param {Event} e Event object fired on mousemove
     */
    _onMouseMove: function (e) {
      fabric.tapping = false;

      if (!fabric.selection && fabric.isTouchSupported && !fabric.tapping_target) {
        // do nothing
      } else {
        e.preventDefault && e.preventDefault();
        this.__onMouseMove(e);
      }
    },

    /**
     * @private
     */
    _onResize: function () {
      this.calcOffset();
    },

    /**
     * Method that defines the actions when mouse is released on canvas.
     * The method resets the currentTransform parameters, store the image corner
     * position in the image object and render the canvas on top.
     * @private
     * @param {Event} e Event object fired on mouseup
     */
    __onMouseUp: function (e) {

      var target;

      if (this.isDrawingMode && this._isCurrentlyDrawing) {
        this._isCurrentlyDrawing = false;
        this.freeDrawingBrush.onMouseUp();
        this.fire('mouse:up', { e: e });
        return;
      }

      if (this._currentTransform) {

        var transform = this._currentTransform;

        target = transform.target;
        if (target._scaling) {
          target._scaling = false;
        }

        target.isMoving = false;
        target.setCoords();

        // only fire :modified event if target coordinates were changed during mousedown-mouseup
        if (this.stateful && target.hasStateChanged()) {
          this.fire('object:modified', { target: target });
          target.fire('modified');
        }

        if (this._previousOriginX) {
          this._currentTransform.target.adjustPosition(this._previousOriginX);
          this._previousOriginX = null;
        }
      }

      this._currentTransform = null;

      if (this.selection && this._groupSelector) {
        // group selection was completed, determine its bounds
        this._findSelectedObjects(e);
      }
      var activeGroup = this.getActiveGroup();
      if (activeGroup) {
        activeGroup.setObjectsCoords();
        activeGroup.set('isMoving', false);
        this._setCursor(this.defaultCursor);
      }

      // clear selection
      this._groupSelector = null;
      this.renderAll();

      this._setCursorFromEvent(e, target);

      // fix for FF
      this._setCursor('');

      var _this = this;
      setTimeout(function () {
        _this._setCursorFromEvent(e, target);
      }, 50);

      this.fire('mouse:up', { target: target, e: e });
      target && target.fire('mouseup', { e: e });
    },

    /**
     * Method that defines the actions when mouse is clic ked on canvas.
     * The method inits the currentTransform parameters and renders all the
     * canvas so the current image can be placed on the top canvas and the rest
     * in on the container one.
     * @private
     * @param {Event} e Event object fired on mousedown
     */
    __onMouseDown: function (e) {

      var pointer;

      // accept only left clicks
      var isLeftClick  = 'which' in e ? e.which === 1 : e.button === 1;
      if (!isLeftClick && !fabric.isTouchSupported) return;

      if (this.isDrawingMode) {
        pointer = this.getPointer(e);
        this._isCurrentlyDrawing = true;
        this.discardActiveObject().renderAll();
        this.freeDrawingBrush.onMouseDown(pointer);
        this.fire('mouse:down', { e: e });
        return;
      }

      // ignore if some object is being transformed at this moment
      if (this._currentTransform) return;

      var target = this.findTarget(e), corner;
      pointer = this.getPointer(e);

      if (this._shouldClearSelection(e, target)) {
        this._groupSelector = {
          ex: pointer.x,
          ey: pointer.y,
          top: 0,
          left: 0
        };
        this.deactivateAllWithDispatch();
        target && target.selectable && this.setActiveObject(target, e);
      }
      else if (this._shouldHandleGroupLogic(e, target)) {
        this._handleGroupLogic(e, target);
        target = this.getActiveGroup();
      }
      else {
        // determine if it's a drag or rotate case
        this.stateful && target.saveState();

        if ((corner = target._findTargetCorner(e, this._offset))) {
          this.onBeforeScaleRotate(target);
        }

        if (target !== this.getActiveGroup() && target !== this.getActiveObject()) {
          this.deactivateAll();
          this.setActiveObject(target, e);
        }

        this._setupCurrentTransform(e, target);
      }
      // we must renderAll so that active image is placed on the top canvas
      this.renderAll();

      this.fire('mouse:down', { target: target, e: e });
      target && target.fire('mousedown', { e: e });

      // center origin when rotating
      if (corner === 'mtr') {
        this._previousOriginX = this._currentTransform.target.originX;
        this._currentTransform.target.adjustPosition('center');
        this._currentTransform.left = this._currentTransform.target.left;
        this._currentTransform.top = this._currentTransform.target.top;
      }
    },

    /**
      * Method that defines the actions when mouse is hovering the canvas.
      * The currentTransform parameter will definde whether the user is rotating/scaling/translating
      * an image or neither of them (only hovering). A group selection is also possible and would cancel
      * all any other type of action.
      * In case of an image transformation only the top canvas will be rendered.
      * @private
      * @param {Event} e Event object fired on mousemove
      */
    __onMouseMove: function (e) {

      var target, pointer;

      if (this.isDrawingMode) {
        if (this._isCurrentlyDrawing) {
          pointer = this.getPointer(e);
          this.freeDrawingBrush.onMouseMove(pointer);
        }
        this.upperCanvasEl.style.cursor = this.freeDrawingCursor;
        this.fire('mouse:move', { e: e });
        return;
      }

      var groupSelector = this._groupSelector;

      // We initially clicked in an empty area, so we draw a box for multiple selection.
      if (groupSelector) {
        pointer = getPointer(e, this.upperCanvasEl);

        groupSelector.left = pointer.x - this._offset.left - groupSelector.ex;
        groupSelector.top = pointer.y - this._offset.top - groupSelector.ey;
        this.renderTop();
      }
      else if (!this._currentTransform) {

        // alias style to elimintate unnecessary lookup
        var style = this.upperCanvasEl.style;

        // Here we are hovering the canvas then we will determine
        // what part of the pictures we are hovering to change the caret symbol.
        // We won't do that while dragging or rotating in order to improve the
        // performance.
        target = this.findTarget(e);

        if (!target || target && !target.selectable) {
          // image/text was hovered-out from, we remove its borders
          for (var i = this._objects.length; i--; ) {
            if (this._objects[i] && !this._objects[i].active) {
              this._objects[i].set('active', false);
            }
          }
          style.cursor = this.defaultCursor;
        }
        else {
          // set proper cursor
          this._setCursorFromEvent(e, target);
        }
      }
      else {
        // object is being transformed (scaled/rotated/moved/etc.)
        pointer = getPointer(e, this.upperCanvasEl);

        var x = pointer.x,
            y = pointer.y,
            reset = false,
            transform = this._currentTransform;

        target = transform.target;
        target.isMoving = true;

        if ((transform.action === 'scale' || transform.action === 'scaleX' || transform.action === 'scaleY') &&
           // Switch from a normal resize to center-based
           ((e.altKey && (transform.originX !== 'center' || transform.originY !== 'center')) ||
           // Switch from center-based resize to normal one
           (!e.altKey && transform.originX === 'center' && transform.originY === 'center'))
        ) {
          this._resetCurrentTransform(e);
          reset = true;
        }

        if (transform.action === 'rotate') {
          this._rotateObject(x, y);

          this.fire('object:rotating', { target: target, e: e });
          target.fire('rotating', { e: e });
        }
        else if (transform.action === 'scale') {
          // rotate object only if shift key is not pressed
          // and if it is not a group we are transforming
          if ((e.shiftKey || this.uniScaleTransform) && !target.get('lockUniScaling')) {
            transform.currentAction = 'scale';
            this._scaleObject(x, y);
          }
          else {
            // Switch from a normal resize to proportional
            if (!reset && transform.currentAction === 'scale') {
              this._resetCurrentTransform(e);
            }

            transform.currentAction = 'scaleEqually';
            this._scaleObject(x, y, 'equally');
          }

          this.fire('object:scaling', { target: target, e: e });
          target.fire('scaling', { e: e });
        }
        else if (transform.action === 'scaleX') {
          this._scaleObject(x, y, 'x');

          this.fire('object:scaling', { target: target, e: e});
          target.fire('scaling', { e: e });
        }
        else if (transform.action === 'scaleY') {
          this._scaleObject(x, y, 'y');

          this.fire('object:scaling', { target: target, e: e});
          target.fire('scaling', { e: e });
        }
        else {
          this._translateObject(x, y);

          this.fire('object:moving', { target: target, e: e});
          target.fire('moving', { e: e });
          this._setCursor(this.moveCursor);
        }

        this.renderAll();
      }
      this.fire('mouse:move', { target: target, e: e });
      target && target.fire('mousemove', { e: e });
    },
    /**
     * Sets the cursor depending on where the canvas is being hovered.
     * Note: very buggy in Opera
     * @param {Event} e Event object
     * @param {Object} target Object that the mouse is hovering, if so.
     */
    _setCursorFromEvent: function (e, target) {
      var s = this.upperCanvasEl.style;
      if (!target) {
        s.cursor = this.defaultCursor;
        return false;
      }
      else {
        var activeGroup = this.getActiveGroup();
        // only show proper corner when group selection is not active
        var corner = target._findTargetCorner
                      && (!activeGroup || !activeGroup.contains(target))
                      && target._findTargetCorner(e, this._offset);

        if (!corner) {
          s.cursor = this.hoverCursor;
        }
        else {
          if (corner in cursorMap) {
            s.cursor = cursorMap[corner];
          }
          else if (corner === 'mtr' && target.hasRotatingPoint) {
            s.cursor = this.rotationCursor;
          }
          else {
            s.cursor = this.defaultCursor;
            return false;
          }
        }
      }
      return true;
    }
  });
})();


(function(exports){

  var SignatureDocument = function() {
    if(!(this instanceof SignatureDocument)){
      return new SignatureDocument();
    }


    this.last_click                 = {};
    this.pages                      = [];
    this.canvases                   = [];
    this.fabrics                    = [];
    this.signature_nav_btns         = [];
    this.pad                        = signature_pad;
    this.uuid                       = this.Uuid();
    this.script                     = this.CurrentlyExecutedScript();
    this.parent                     = this.script.parentNode;
    this.json                       = {document: {}};
    this.signature_element_width    = 232.0;
    this.signature_element_height   = 104.0;
    this.endpoint                   = "https://www.signature.io";
    this.key                        = this.script.getAttribute("data-signature-key");
    this.document_id                = this.script.getAttribute("data-signature-document-id");
    this.parent_document_id         = this.document_id;
    this.mode                       = undefined; // undefined, text, signature, edit, confirm, done.
    this.width                      = 1000.0;
    this.height                     = 1294.0;
    this.max_width                  = 1000.0;

    // calculate
    this.style_width                = this.calculateStyleWidth();
    this.multiplier                 = this.calculateMultiplier();
    this.style_height               = this.calculateStyleHeight(); 

    this.font_size                  = 20;
    this.font_family                = 'Helvetica';

    this.init();

    return this;
  };

  SignatureDocument.prototype.init = function() {
    if (this.script) {
      this.script.className += " signature-document-script";
      this.script.id        = "signature-document-script-"+this.uuid;

      this.getDocument();
    } else {
      console.error("Could not find script tag to initialize on.");
    }
  };

  SignatureDocument.prototype.getDocument = function() {
    var self    = this;


    self._drawCss();
    self._drawDocument();
    self._drawPages(1);
    //self._drawProcessing(); // need a better and simple processing message. or make it a bindable event

    var url = self.getParam("url");
    self.Get(url, function(resp) {
      self.json       = resp;
      self.page_count = self.json.document.pages.length;

      self._drawPages(self.page_count);
      self._drawPagesBackgrounds();

      return true;
    });
  };

  SignatureDocument.prototype.calculateStyleWidth = function() {
    var window_width = this.parent.clientWidth || this.parent.offsetWidth;
    return Math.min(window_width, this.max_width);
  };

  SignatureDocument.prototype.calculateMultiplier = function() {
    return this.style_width / this.width;
  };

  SignatureDocument.prototype.calculateStyleHeight = function() {
    return this.height * this.multiplier;
  };

  exports.SignatureDocument = SignatureDocument;

  MicroEvent.mixin(SignatureDocument);

}(this));



(function(SignatureDocument){SignatureDocument.prototype._drawCss = function() {this.css = '@charset "utf-8";.signature-pad{display:none}.signature-nav-span:before{line-height:43px;font-size:30px}.signature-button{display:inline-block;*display:inline;zoom:1;line-height:normal;white-space:nowrap;vertical-align:baseline;text-align:center;cursor:pointer;-webkit-user-drag:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.signature-button::-moz-focus-inner{padding:0;border:0}.signature-button{font-size:100%;*font-size:90%;*overflow:visible;padding:0.5em 1.5em 0.5em;color:#444;color:rgba(0,0,0,0.80);*color:#444;border:1px solid #999;border:none rgba(0,0,0,0);background-color:#E6E6E6;text-decoration:none;border-radius:2px;-webkit-font-smoothing:antialiased;-webkit-transition:0.1s linear -webkit-box-shadow;-moz-transition:0.1s linear -moz-box-shadow;-ms-transition:0.1s linear box-shadow;-o-transition:0.1s linear box-shadow;transition:0.1s linear box-shadow}.signature-button-hover,.signature-button:hover{filter:progid:DXImageTransform.Microsoft.gradient(startColorstr="#00000000",endColorstr="#00000000",GradientType=0);background-image:-webkit-gradient(linear,0 0,0 100%,from(transparent),color-stop(40%,rgba(0,0,0,0.05)),to(rgba(0,0,0,0.05)));background-image:-webkit-linear-gradient(transparent,rgba(0,0,0,0.05) 40%,rgba(0,0,0,0.15));background-image:-moz-linear-gradient(top,rgba(0,0,0,0.05) 0%,rgba(0,0,0,0.05));background-image:-ms-linear-gradient(transparent,rgba(0,0,0,0.05) 40%,rgba(0,0,0,0.15));background-image:-o-linear-gradient(transparent,rgba(0,0,0,0.05) 40%,rgba(0,0,0,0.05));background-image:linear-gradient(transparent,rgba(0,0,0,0.05) 40%,rgba(0,0,0,0.05))}.signature-button-active,.signature-button:active{box-shadow:0 0 0 1px rgba(0,0,0,0.15) inset,0 0 6px rgba(0,0,0,0.20) inset}.signature-button[disabled],.signature-button-disabled,.signature-button-disabled:hover,.signature-button-disabled:active{border:none;background-image:none;filter:progid:DXImageTransform.Microsoft.gradient(enabled = false);filter:alpha(opacity=40);-khtml-opacity:0.40;-moz-opacity:0.40;opacity:0.40;cursor:not-allowed;box-shadow:none}.signature-button-hidden{display:none}.signature-button::-moz-focus-inner{padding:0;border:0}.signature-button-primary,a.signature-button-primary{background:rgba(239,65,54,1);color:#fff}.signature-button:-moz-focusring{outline-color:rgba(0,0,0,0.85)}.signature-hidden{display:none}.signature-processing{z-index:3000;position:fixed;top:0;left:0;width:100%;height:100%;background:#FFF;padding-top:20px;font-size:18px}.signature-document{box-sizing:border-box;position:relative;margin:0;padding:55px 0 70px 0;border:0;font-size:100%;vertical-align:baseline;font-family:Helvetica;font-size:.8rem;text-align:center;background:rgba(0,0,0,0.1)}.signature-page{margin:0;padding:0;-webkit-tap-highlight-color:rgba(0,0,0,0);background:#fff;background:#fff url() center center no-repeat;background-size:contain;background-repeat:no-repeat;margin:0 auto;margin-bottom:10px;text-align:left}.signature-document-canvas{}.signature-header{position:fixed;top:0;left:0;width:100%;z-index:2000}.signature-nav{position:absolute;text-align:center;top:0;left:0;background:#E2E3E1;background:rgba(239,65,54,1);width:100%}.signature-no-list-style{padding:0;margin:0;list-style:none}.signature-nav li{display:inline-block}.signature-nav-btn{font-size:18px;color:rgba(255,255,255,1);display:inline-block;height:44px;width:60px;text-decoration:none;text-transform:uppercase;text-align:center;line-height:44px;border-right:1px dashed #fff;border-top:none;border-bottom:none;cursor:pointer}.signature-nav-btn.signature-nav-btn-first{border-left:1px dashed #fff}.signature-nav-disabled,.signature-nav-disabled:visited{color:rgba(255,255,255,0.5)}.signature-nav-active,.signature-nav-active:visited{color:#fff;background:#222}.signature-done-button{font-size:24px;border-radius:2px 2px 0 0}.signature-done-nav{position:fixed;text-align:center;bottom:0;right:0;width:100%;z-index:2000}.signature-nav a,.signature-nav a:visited{}.signature-done-confirmation{z-index:2010;background:rgba(255,255,255,0.9);width:100%;height:100%;position:fixed;top:0;left:0;text-align:center}.signature-done-confirmation-msg{font-size:300%;color:#000;margin-top:10px}.signature-done-confirmation-yes,.signature-done-confirmation-no{font-size:24px;margin:20px}.signature-done{position:fixed;background:rgba(255,255,255,0.9);top:0;left:0;width:100%;height:100%;text-align:center;z-index:2011}.signature-done-msg{font-size:300%;color:#000;margin-top:10px}.signature-download{font-size:24px;margin:20px}.signature-processing-document{width:144px;height:204px;background:white;border:20.16px solid black;text-align:left;position:relative;margin:0 auto;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;-o-box-sizing:content-box;-ms-box-sizing:content-box;box-sizing:content-box;margin-bottom:10px}.signature-processing-triangle{width:0;height:0;border-bottom:100px solid #1a1a1a;border-right:100px solid white;position:absolute}.signature-processing-corner{border-width:50.4px;right:-20.16px;top:-20.16px}.signature-processing-bar{border-bottom:20.16px solid black;margin-bottom:20.16px;overflow:hidden}.signature-processing-bar.signature-processing-short{margin-right:43.2px}.signature-processing-bars{width:115.2px;padding-top:20.16px;margin:0 auto}@-webkit-keyframes rotate{0%{-webkit-transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg)}}@-moz-keyframes rotate{0%{-moz-transform:rotate(0deg)}100%{-moz-transform:rotate(360deg)}}@-ms-keyframes rotate{0%{-ms-transform:rotate(0deg)}100%{-ms-transform:rotate(360deg)}}@-o-keyframes rotate{0%{-o-transform:rotate(0deg)}100%{-o-transform:rotate(360deg)}}@keyframes rotate{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}@-webkit-keyframes bounceInRightAndBounceOutLeft{0%{opacity:0;-webkit-transform:translateX(2000px)}6%{opacity:1;-webkit-transform:translateX(-30px)}8%{-webkit-transform:translateX(10px)}10%{-webkit-transform:translateX(0)}90%{-webkit-transform:translateX(0)}92%{opacity:1;-webkit-transform:translateX(20px)}100%{opacity:0;-webkit-transform:translateX(-2000px)}}@-moz-keyframes bounceInRightAndBounceOutLeft{0%{opacity:0;-moz-transform:translateX(2000px)}6%{opacity:1;-moz-transform:translateX(-30px)}8%{-moz-transform:translateX(10px)}10%{-moz-transform:translateX(0)}90%{-moz-transform:translateX(0)}92%{opacity:1;-moz-transform:translateX(20px)}100%{opacity:0;-moz-transform:translateX(-2000px)}}@-ms-keyframes bounceInRightAndBounceOutLeft{0%{opacity:0;-ms-transform:translateX(2000px);transform:translateX(2000px)}6%{opacity:1;-ms-transform:translateX(-30px)}8%{-ms-transform:translateX(10px)}10%{-ms-transform:translateX(0)}90%{-ms-transform:translateX(0)}92%{opacity:1;-ms-transform:translateX(20px)}100%{opacity:0;-ms-transform:translateX(-2000px)}}@-o-keyframes bounceInRightAndBounceOutLeft{0%{opacity:0;-o-transform:translateX(2000px)}6%{opacity:1;-o-transform:translateX(-30px)}8%{-o-transform:translateX(10px)}10%{-o-transform:translateX(0)}90%{-o-transform:translateX(0)}92%{opacity:1;-o-transform:translateX(20px)}100%{opacity:0;-o-transform:translateX(-2000px)}}@keyframes bounceInRightAndBounceOutLeft{0%{opacity:0;transform:translateX(2000px)}6%{opacity:1;transform:translateX(-30px)}8%{transform:translateX(10px)}10%{transform:translateX(0)}90%{transform:translateX(0)}92%{opacity:1;transform:translateX(20px)}100%{opacity:0;transform:translateX(-2000px)}}.signature-processing-bounceInRightAndBounceOutLeft{-webkit-animation-name:bounceInRightAndBounceOutLeft;-moz-animation-name:bounceInRightAndBounceOutLeft;-o-animation-name:bounceInRightAndBounceOutLeft;animation-name:bounceInRightAndBounceOutLeft}.signature-processing-spinner{width:40.32px;height:40.32px;border-radius:40.32px;box-sizing:border-box;border:6px dotted white;position:absolute;top:81.84px;left:51.84px;border-top-color:#333;border-left-color:#3d3d3d;border-bottom-color:#474747;border-right-color:#525252;-webkit-animation:rotate 1000ms infinite linear;-moz-animation:rotate 1000ms infinite linear;-ms-animation:rotate 1000ms infinite linear;-o-animation:rotate 1000ms infinite linear;-ms-animation:rotate 1000ms infinite linear;animation:rotate 1000ms infinite linear}.signature-processing-animated{-webkit-animation-fill-mode:both;-moz-animation-fill-mode:both;-ms-animation-fill-mode:both;-o-animation-fill-mode:both;-animation-fill-mode:both;-webkit-animation-duration:1s;-moz-animation-duration:1s;-ms-animation-duration:1s;-o-animation-duration:1s;animation-duration:1s}.signature-processing-infinite-iteration{-webkit-animation-iteration-count:infinite;-moz-animation-iteration-count:infinite;-ms-animation-iteration-count:infinite;-o-animation-iteration-count:infinite;animation-iteration-count:infinite}.signature-processing-lengthy-duration{-webkit-animation-duration:5s;-moz-animation-duration:5s;-ms-animation-duration:5s;-o-animation-duration:5s;animation-duration:5s}.signature-processing-short-duration{-webkit-animation-duration:0.5s;-moz-animation-duration:0.5s;-ms-animation-duration:0.5s;-o-animation-duration:0.5s;animation-duration:0.5s}@-webkit-keyframes fadeInUp{0%{opacity:0;-webkit-transform:translateY(20px)}100%{opacity:1;-webkit-transform:translateY(0)}}@-moz-keyframes fadeInUp{0%{opacity:0;-moz-transform:translateY(20px)}100%{opacity:1;-moz-transform:translateY(0)}}@-o-keyframes fadeInUp{0%{opacity:0;-o-transform:translateY(20px)}100%{opacity:1;-o-transform:translateY(0)}}@keyframes fadeInUp{0%{opacity:0;transform:translateY(20px)}100%{opacity:1;transform:translateY(0)}}.signature-processing-fadeInUp{-webkit-animation-name:fadeInUp;-moz-animation-name:fadeInUp;-o-animation-name:fadeInUp;animation-name:fadeInUp}@import url(https://netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css);';var style = document.createElement('style');style.type = 'text/css';if (style.styleSheet) {style.styleSheet.cssText = this.css;} else {style.appendChild(document.createTextNode(this.css));}var self = this;setTimeout(function() { self.trigger('_drawCss', true); }, 1);return document.body.appendChild(style);};}(SignatureDocument));

(function(SignatureDocument){
  SignatureDocument.prototype.preDraw = function() {
    this._drawCss();
    this._drawDocument();
    //this._drawProcessing();
    //this._drawNav();
    //this._drawDoneNav();
    //this._drawDoneConfirmation();
    //this.events();
  };

  SignatureDocument.prototype.midDraw = function() {
    //this._drawDone();
    //this._drawPages(this.page_count);
  };

  SignatureDocument.prototype.postDraw = function() {
    this._drawPagesBackgrounds();
    this._drawPagesCanvases();
    this._drawCanvasesTextElements();
    this._drawCanvasesSignatureElements();
    this._maintainElementPositions();
    var self = this;
    setTimeout(function(){ self._calcOffset(); }, 1000);
  };

  SignatureDocument.prototype._calcOffset = function() {
    for (var i=0; i < this.fabrics.length; i++) {
      this.fabrics[i].calcOffset();
    }
  };

  SignatureDocument.prototype._drawProcessing = function() {
    this.processing               = document.createElement('div');
    this.processing.className     = "signature-processing";
    this.processing.id            = "signature-processing-"+this.uuid;

    this.processing.innerHTML     = '<div class="signature-processing-document signature-processing-animated signature-processing-lengthy-duration signature-processing-infinite-iteration signature-processing-bounceInRightAndBounceOutLeft"><div class="signature-processing-spinner"></div><div class="signature-processing-corner signature-processing-triangle"></div><div class="signature-processing-bars"><div class="signature-processing-bar signature-processing-short"></div><div class="signature-processing-bar"></div><div class="signature-processing-bar"></div><div class="signature-processing-bar"></div></div></div><p class="signature-processing-text-center signature-processing-animated signature-processing-short-duration signature-processing-fadeInUp">Document en cours de traitement.<br/>Merci de patientez.</p>'; 
    return this.document.appendChild(this.processing);
  };

  SignatureDocument.prototype._drawDocument = function() {
    this.document                     = document.createElement('article');
    this.document.className           = "signature-document";
    this.document.id                  = "signature-document-"+this.uuid;

    return this.InsertAfter(this.script, this.document);
  };

  SignatureDocument.prototype._drawPagesBackgrounds = function() {
    for (var i = 0; i < this.pages.length; i++) {
      var page = this.json.document.pages[i];
      this.pages[i].style.backgroundImage = "url("+page.url+")";
    }

    return true;
  };

  SignatureDocument.prototype._drawPages = function(count) {
    for (var i = 0; i < count; i++) { 
      if (this.pages.length <= i) {
        this._drawPage(i+1);
      }
    }

    return true;
  };

  SignatureDocument.prototype._drawPage = function(page_number) {
    var page            = document.createElement('section');
    page.className      = "signature-page";
    page.id             = "signature-page-"+page_number;
    page.style.width    = this.style_width;
    page.style.height   = this.style_height;
    page.style.maxWidth = this.max_width;

    this.pages.push(page);

    return this.document.appendChild(page);
  };

  SignatureDocument.prototype._drawPagesCanvases = function() {
    for (var i = 0; i < this.pages.length; i++) {
      this._drawPageCanvas(i+1);
    }
  };

  SignatureDocument.prototype._drawPageCanvas = function(page_number) {
    var canvas        = document.createElement('canvas');
    canvas.className  = "signature-document-canvas";
    canvas.id         = "signature-document-canvas-"+page_number;
    canvas.width      = 1000;
    canvas.height     = 1294;

    this.pages[page_number-1].appendChild(canvas);
    this.canvases.push(canvas);

    var fab                         = new fabric.Canvas("signature-document-canvas-"+page_number);
    fab.selection = false; // disable global canvas selection
    fab.signature_page_id           = this.json.document.pages[page_number-1];
    this.fabricEvents(fab);

    fab.setWidth(this.style_width);
    fab.setHeight(this.style_height);
    fab.calcOffset();

    return this.fabrics.push(fab);
  };

  SignatureDocument.prototype._drawCanvasesSignatureElements = function() {
    for (var i = 0; i < this.pages.length; i++) {
      this._drawCanvasSignatureElements(i+1);
    }
  };

  SignatureDocument.prototype._drawCanvasSignatureElements = function(page_number) {
    var page_json = this.json.document.pages[page_number-1];
    if (page_json) {
      for (var i = 0; i < page_json.signature_elements.length; i++) {
        this._drawSignatureElement(this.fabrics[page_number-1], page_json.signature_elements[i]);
      }
    }
  };

  SignatureDocument.prototype._drawSignatureElement = function(fab, element, callback) {
    var self = this;
    var imgObj = new Image();
    imgObj.src = element.url;
    imgObj.onload = function() {
      var img = new fabric.Image(imgObj, {
        honest_left:    parseFloat(element.x),
        honest_top:     parseFloat(element.y),
        honest_height:  self.signature_element_height,
        honest_width:   self.signature_element_width,
        hasControls:    false,
        originX:        'left',
        originY:        'top',
        signature_element_id: element.id
      });

      self._resizeAndPositionFabricObject(self, img);

      fab.add(img).renderAll();

      if (typeof callback === 'function') {
        return callback(img);
      }
    };
  };

  SignatureDocument.prototype._resizeAndPositionFabricObject = function(self, object) {
    var new_left      = object.honest_left * self.multiplier;
    var new_top       = object.honest_top * self.multiplier;
    var new_height    = object.honest_height * self.multiplier;
    var new_width     = object.honest_width * self.multiplier;
    var new_font_size = self.font_size * self.multiplier;

    if (object.text) {
      object.set({ left: new_left, top: new_top, fontSize: new_font_size});
    } else {
      object.set({ left: new_left, top: new_top, height: new_height, width: new_width });
    }
    object.setCoords(); // fixes the select object coordinates to match

  };

  SignatureDocument.prototype._drawCanvasesTextElements = function() {
    for (var i = 0; i < this.pages.length; i++) {
      this._drawCanvasTextElements(i+1);
    }
  };

  SignatureDocument.prototype._drawCanvasTextElements = function(page_number) {
    var page_json = this.json.document.pages[page_number-1];
    if (page_json) {
      for (var i = 0; i < page_json.text_elements.length; i++) {
        this._drawTextElement(this.fabrics[page_number-1], page_json.text_elements[i]);
      }
    }
  };

  SignatureDocument.prototype._drawTextElement = function(fab, element) {
    var self = this;
    var text = new fabric.Text(element.content, { 
      honest_left:  parseFloat(element.x),
      honest_top:   parseFloat(element.y),
      hasControls:  false,
      originX:      "left",
      signature_element_id: element.id,
      fontFamily:   self.font_family
    });

    self._resizeAndPositionFabricObject(self, text);
    
    fab.add(text);

    return text;
  };

  SignatureDocument.prototype._drawDoneNav = function() {
    this.done_nav                 = document.createElement('nav');
    this.done_nav.className       = "signature-done-nav";
    this.done_nav.id              = "signature-done-nav-"+this.uuid;
    var done_nav_ul               = document.createElement("ul");
    done_nav_ul.className         = "signature-no-list-style";
    var done_nav_li               = document.createElement("li");
    this.done_btn                 = document.createElement("a");
    this.done_btn.className       = "signature-button signature-button-primary signature-done-button";
    this.done_btn.innerHTML       = "Terminé";
    done_nav_li.appendChild(this.done_btn);
    done_nav_ul.appendChild(done_nav_li);
    this.done_nav.appendChild(done_nav_ul);

    return this.document.appendChild(this.done_nav);
  };

  SignatureDocument.prototype._drawNav = function() {
    this.header                   = document.createElement('header');
    this.header.className         = "signature-header";
    this.header.id                = "signature-header"+this.uuid;

    this.nav                      = document.createElement('nav');
    this.nav.className            = "signature-nav";
    this.nav.id                   = "signature-nav-"+this.uuid;
    var nav_ul                    = document.createElement('ul');
    nav_ul.className              = "signature-no-list-style";

    // text_mode_btn
    var li1    = document.createElement("li");
    this.text_mode_btn = document.createElement("a");
    this.text_mode_btn.className = "signature-nav-btn signature-nav-btn-first";
    this.signature_nav_btns.push(this.text_mode_btn);
    var span1  = document.createElement("span");
    span1.className = "signature-nav-span icon-font";
    this.text_mode_btn.appendChild(span1);
    li1.appendChild(this.text_mode_btn);
    nav_ul.appendChild(li1);

    // sign_mode_btn
    var li2    = document.createElement("li");
    this.sign_mode_btn = document.createElement("a");
    this.sign_mode_btn.className = "signature-nav-btn";
    this.signature_nav_btns.push(this.sign_mode_btn);
    var span2  = document.createElement("span");
    span2.className = "signature-nav-span icon-pencil";
    this.sign_mode_btn.appendChild(span2);
    li2.appendChild(this.sign_mode_btn);
    nav_ul.appendChild(li2);

    // trash btn
    var li3    = document.createElement("li");
    this.trash_mode_btn = document.createElement("a");
    this.trash_mode_btn.className = "signature-nav-btn signature-nav-disabled";
    this.signature_nav_btns.push(this.trash_mode_btn);
    var span3  = document.createElement("span");
    span3.className = "signature-nav-span icon-trash";
    this.trash_mode_btn.appendChild(span3);
    li3.appendChild(this.trash_mode_btn);
    nav_ul.appendChild(li3);

    this.nav.appendChild(nav_ul);
    this.header.appendChild(this.nav);
    return this.document.appendChild(this.header);
  };

  SignatureDocument.prototype._drawDoneConfirmation = function() {
    this.done_confirmation                = document.createElement('div');
    this.done_confirmation.className      = "signature-hidden signature-done-confirmation";

    var done_confirmation_msg             = document.createElement('p');
    done_confirmation_msg.className       = "signature-done-confirmation-msg";
    done_confirmation_msg.innerHTML       = "Etes-vous sûr que vous avez terminé la signature?";

    this.done_confirmation.appendChild(done_confirmation_msg);

    this.done_confirmation_yes            = document.createElement('a');
    this.done_confirmation_yes.className  = "signature-button signature-button-primary signature-done-confirmation-yes";
    this.done_confirmation_yes.innerHTML  = "Oui";
    this.done_confirmation.appendChild(this.done_confirmation_yes);

    this.done_confirmation_no            = document.createElement('a');
    this.done_confirmation_no.className  = "signature-button signature-done-confirmation-no";
    this.done_confirmation_no.innerHTML  = "Pas";
    this.done_confirmation.appendChild(this.done_confirmation_no);

    return this.document.appendChild(this.done_confirmation);
  };

  SignatureDocument.prototype._drawDone = function() {
    this.done                           = document.createElement('div');
    this.done.className                 = "signature-hidden signature-done";

    var done_msg                        = document.createElement('p');
    done_msg.className                  = "signature-done-msg";
    done_msg.innerHTML                  = "Terminé";
    this.done.appendChild(done_msg);

    this.download                       = document.createElement('a');
    this.download.className             = "signature-hidden signature-download signature-button signature-button-primary";
    this.download.innerHTML             = "Télécharger";
    this.download.href                  = this.endpoint+"/documents/SIGNED-"+this.document_id+".pdf";
    this.done.appendChild(this.download);

    return this.document.appendChild(this.done);
  };

  SignatureDocument.prototype._maintainElementPositions = function() {
    var self = this;
    window.onresize = function(event) {
      self.style_width  = self.calculateStyleWidth();
      self.multiplier   = self.calculateMultiplier();
      self.style_height = self.calculateStyleHeight();
      
      for (var i=0; i < self.fabrics.length; i++) {
        self.fabrics[i].setWidth(self.style_width);
        self.fabrics[i].setHeight(self.style_height);

        var objects  = self.fabrics[i]._objects;
        for (var i2=0; i2 < objects.length; i2++) {
          self._resizeAndPositionFabricObject(self, objects[i2]);
        }

        self.fabrics[i].renderAll();
      }
    };
  };

}(SignatureDocument));


(function(SignatureDocument){   
  var self;
  var CLICK             = "click";
  var TOUCH_SUPPORTED   = (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) ? true : false;
  if (!!TOUCH_SUPPORTED) {
    CLICK               = "touchend";
  }

  SignatureDocument.prototype.events = function() {
    self = this;

    this._signaturePadListeners();
    this._nav();
    this._doneNav();
    this._doneConfirmation();
  };

  SignatureDocument.prototype._nav = function() {
    this.text_mode_btn.addEventListener(CLICK, this.changeTextMode, false);
    this.sign_mode_btn.addEventListener(CLICK, this.changeSignMode, false);
    this.trash_mode_btn.addEventListener(CLICK, this.removeSelectedObject, false);
  };

  SignatureDocument.prototype._doneNav = function() {
    this.done_btn.addEventListener(CLICK, this.showDoneConfirmation, false);
  };

  SignatureDocument.prototype._doneConfirmation = function() {
    this.done_confirmation_no.addEventListener(CLICK, this.hideDoneConfirmation, false);
    this.done_confirmation_yes.addEventListener(CLICK, this.markSigned, false);
  };
  
  SignatureDocument.prototype._handleModeAction = function(fab, options) {
     if (options.target || !fabric.tapping) {
      // let object:modified handle things.
      // if touch scrolling instead of tapping arrive here as well.
    } else {
      if (self.mode == "text") {
        self._promptText(fab, options.e);
      } else if (self.mode == "sign") {
        self._promptSignature(fab, options.e);
      } else {
        // do nothing
      }
    }
  };

  SignatureDocument.prototype.fabricEvents = function(fab) {
    self = this;
    fab.on('mouse:down', function(options) {
      // only use mouse:down for touch events. Won't capture x,y on mouse:up for touch events
      if (options.e.targetTouches && options.e.targetTouches.length > 0) {
        self._setLastClick(fab, options.e);
      }
    });

    fab.on('mouse:up', function(options) {
      self._setLastClick(fab, options.e);
      self._handleModeAction(fab, options);
    });

    fab.on('object:selected', function(options) {
      self.enableTrashBtn();

      for (var i=0; i < self.fabrics.length; i++) {
        if (self.fabrics[i] != fab) {
          self.fabrics[i].deactivateAll().renderAll();
        }
      }
    });

    fab.on('object:modified', function(options) {
      var payload = {      
        x: parseFloat(options.target.left) * (1.0/self.multiplier),
        y: parseFloat(options.target.top) * (1.0/self.multiplier) 
      };

      options.target.set({ honest_left: payload.x, honest_top: payload.y });

      var element_api_path  = "se";
      if (!!options.target.text) {
        element_api_path    = "te";
      }

      self.Post(self.endpoint+"/api/v0/"+element_api_path+"/"+options.target.signature_element_id+"/update.json", payload, function(resp) {
        if (!resp.success) { console.error(resp.error.message); }
      });
    });
  };

  SignatureDocument.prototype._setLastClick = function(fab, event) {
    this.last_click = {
      fab:  fab,
      x:    fab.getPointer(event).x || this.last_click.x,
      y:    fab.getPointer(event).y || this.last_click.y 
    };
  };

  SignatureDocument.prototype._promptText = function(fab, event) {
    self = this;
    var text = prompt('Entrez le texte', '');

    if (!!text) {
      var element = {
        content: text,
        //x: self.last_click.x,
        //y: self.last_click.y
        x: parseFloat(self.last_click.x) * (1.0/self.multiplier),
        y: parseFloat(self.last_click.y) * (1.0/self.multiplier)
      };

      var text_element = self._drawTextElement(fab, element);

      element.page_id = self.last_click.fab.signature_page_id;
      self.Post(self.endpoint+"/api/v0/te.json", element, function(resp) {
        if (!!resp.success) {
          text_element.signature_element_id = resp.text_element.id;
        } else {
          console.error(resp.error.message);
        }
      });
    }
  };

  SignatureDocument.prototype._promptSignature = function(fab, event) {
    signature_document.pad.show();
  };

  SignatureDocument.prototype._signaturePadListeners = function() {
    // watch for data_url
    this.pad.script.addEventListener('signature_pad:data_url', function(e) {
      var element = {
        id:   self.Uuid(),
        x:    parseFloat(self.last_click.x) * (1.0/self.multiplier),
        y:    parseFloat(self.last_click.y) * (1.0/self.multiplier),
        url:  e.data
      };
      
      self._drawSignatureElement(self.last_click.fab, element, function(signature_element) {
        element.page_id = self.last_click.fab.signature_page_id;
        self.Post(self.endpoint+"/api/v0/se.json", element, function(resp) {
          if (!!resp.success) {
            signature_element.signature_element_id = resp.signature_element.id;
          } else {
            console.error(resp.error.message);
          }
        });
      });

    }, false);
  };

  SignatureDocument.prototype.enableTrashBtn = function() {
    self.removeClass(self.trash_mode_btn, "signature-nav-disabled");
  };

  SignatureDocument.prototype.disableTrashBtn = function() {
    self.addClass(self.trash_mode_btn, "signature-nav-disabled");
  };

  SignatureDocument.prototype.unactivateSignatureNavButtons = function() {
    for (var i=0; i < self.signature_nav_btns.length; i++) {
      self.removeClass(self.signature_nav_btns[i], "signature-nav-active");
    }
  };

  SignatureDocument.prototype.deleteTextOrSignatureElement = function(active_object) {
    var te_or_se  = "se";
    if (active_object.text) {
      te_or_se    = "te";
    }
 
    self.Post(self.endpoint+"/api/v0/"+te_or_se+"/"+active_object.signature_element_id+"/delete.json", {}, function(resp) { return true; });
  };

  SignatureDocument.prototype.removeSelectedObject = function(e) {
    if (e) { e.preventDefault(); }

    self.unactivateSignatureNavButtons();
    self.mode = undefined;

    for (var i=0; i < self.fabrics.length; i++) {
      var active_object = self.fabrics[i]._activeObject;
      if (active_object) {
        self.fabrics[i].remove(active_object);
        self.deleteTextOrSignatureElement(active_object);
      }
    }

    self.disableTrashBtn();
  };

  SignatureDocument.prototype.changeTextMode = function(e) {
    if (e) { e.preventDefault(); }

    self.unactivateSignatureNavButtons();

    if (self.mode == "text") {
      self.mode = undefined;
    } else {
      self.addClass(this, "signature-nav-active");
      self.mode = "text";
    }
  };

  SignatureDocument.prototype.changeSignMode = function(e) {
    if (e) { e.preventDefault(); }

    self.unactivateSignatureNavButtons(); 

    if (self.mode == "sign") {
      self.mode = undefined;
    } else {
      self.addClass(this, "signature-nav-active");
      self.mode = "sign";
    }
  };

  SignatureDocument.prototype.showDoneConfirmation = function(e) {
    if (e) { e.preventDefault(); }

    self.removeClass(self.done_confirmation, "signature-hidden");
  };

  SignatureDocument.prototype.hideDoneConfirmation = function(e) {
    if (e) { e.preventDefault(); }

    self.addClass(self.done_confirmation, "signature-hidden");
  };

  SignatureDocument.prototype.showDone = function(e) {
    if (e) { e.preventDefault(); }
    
    self.addClass(self.done_confirmation, "signature-hidden");
    self.removeClass(self.done, "signature-hidden");
  };

  SignatureDocument.prototype.hideProcessing = function(e) {
    if (e) { e.preventDefault(); }

    self.addClass(self.processing, "signature-hidden");
  };

  SignatureDocument.prototype.markSigned = function(e) {
    if (e) { e.preventDefault(); }

    self.showDone();

    self.Post(self.endpoint+"/api/v0/internal/documents/"+self.document_id+"/mark_signed.json", {}, function(resp) {
      if (!!resp.success) {
        self.removeClass(self.download, "signature-hidden");
      } else { 
        alert(resp.error.message);
        self.addClass(self.done, "signature-hidden");
      }
    });
  };
}(SignatureDocument));


(function(SignatureDocument){  
  SignatureDocument.prototype.Uuid = function() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
      var r, v;
      r = Math.random() * 16 | 0;
      v = (c === "x" ? r : r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  SignatureDocument.prototype.CurrentlyExecutedScript = function() {
    var script;

    if (document) {
      var scripts = document.getElementsByTagName('script');
      script      = scripts[scripts.length - 1];
    }
    return script;
  };

  SignatureDocument.prototype.InsertAfter = function(reference_node, new_node) {
    return reference_node.parentNode.insertBefore(new_node, reference_node.nextSibling);
  };
  
  SignatureDocument.prototype.StandardScreen = function() {
    return document.body.clientWidth >= 580;
  };

  SignatureDocument.prototype.FireEvent = function(name, target, data) {
    //Create a generic event
    var bubbles     = true;
    var cancelable  = true;
    var event       = document.createEvent("Events");
    //Initialize it to be the event we want
    event.initEvent(name, bubbles, cancelable, null, null, null, null, null, null, null, null, null, null, null, null);
    event.data = data;
    //FIRE!
    target.dispatchEvent(event);
  };

  SignatureDocument.prototype.Encode64 = function(input) {
    var char, chr1, chr2, chr3, enc1, enc2, enc3, enc4, i, invalidChar, output, _i, _len, _ref,
    CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    output = '';
    i = 0;
    input = unescape(encodeURIComponent(input));
    while (i < input.length) {
      chr1 = input.charCodeAt(i++) || 0;
      chr2 = input.charCodeAt(i++) || 0;
      chr3 = input.charCodeAt(i++) || 0;
      invalidChar = Math.max(chr1, chr2, chr3);
      if (invalidChar > 0xFF) {
        throw (invalidChar + " is an invalid BASE64 character");
      }
      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;
      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }
      _ref = [enc1, enc2, enc3, enc4];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        char = _ref[_i];
        output += CHARACTERS.charAt(char);
      }
    }
    return output;
  };

  SignatureDocument.prototype.Get = function(url, callback){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", url, true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.onreadystatechange = function(){
      if (xmlhttp.readyState==4 && xmlhttp.status==200){
        callback(JSON.parse(xmlhttp.responseText));
      }
    };

    xmlhttp.send();
  };

  SignatureDocument.prototype.Post = function(url, data, callback){
    var xmlhttp = new XMLHttpRequest();
    var key = this.Encode64(data.key);
    delete data.key;
    xmlhttp.open("post", url, true);
    xmlhttp.setRequestHeader("Authorization", "Basic "+key);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.onreadystatechange = function(){
      if (xmlhttp.readyState==4){
        if (xmlhttp.status==200){
          callback(JSON.parse(xmlhttp.responseText));
        } else {
          console.error("You found an ajax error. Contact us at support@signature.io with any information you have, and we will fix it.");
        }
      }
    };

    xmlhttp.send(JSON.stringify(data));
  };

  SignatureDocument.prototype.GetScrollTop = function() {
    if (typeof window.pageYOffset !== 'undefined' ) {
      // Most browsers
      return window.pageYOffset;
    }

    var d = document.documentElement;
    if (d.clientHeight) {
      // IE in standards mode
      return d.scrollTop;
    }

    // IE in quirks mode
    return document.body.scrollTop;
  };

  SignatureDocument.prototype.hasClass = function(el, name) {
    return new RegExp('(\\s|^)'+name+'(\\s|$)').test(el.className);
  };

  SignatureDocument.prototype.addClass = function(el, name) {
    if (!this.hasClass(el, name)) { 
      el.className += (el.className ? ' ' : '') +name; 
    }
  };

  SignatureDocument.prototype.removeClass = function(el, name) {
    if (this.hasClass(el, name)) {
      el.className=el.className.replace(new RegExp('(\\s|^)'+name+'(\\s|$)'),' ').replace(/^\s+|\s+$/g, '');
    }
  };

  SignatureDocument.prototype.SmartPoller = function(poller) {
    var wait = 1000;
    (function startPoller() {
      setTimeout(function() {
        poller.call(this, startPoller);
      }, wait);
      wait = wait * 1.5;
    })();
  };

  SignatureDocument.prototype.getParam = function(name) {
    return decodeURI(
      (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
    );
  };

}(SignatureDocument));


var signature_document = SignatureDocument();
