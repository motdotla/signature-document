/*! signature-document.js - 0.0.1 - 2014-09-15 - scottmotte */
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


(function(exports){

  var SignatureDocument = function() {
    this.pages                      = [];
    this.uuid                       = this.Uuid();
    this.script                     = this.CurrentlyExecutedScript();
    this.parent                     = this.script.parentNode;
    this.json                       = {documents: []};
    this.width                      = 1000.0;
    this.height                     = 1294.0;
    this.max_width                  = 1000.0;
    this.signature_document_url     = this.script.getAttribute("data-signature-document-url");

    // calculate
    this.style_width                = this.calculateStyleWidth();
    this.multiplier                 = this.calculateMultiplier();
    this.style_height               = this.calculateStyleHeight(); 

    this.init();

    return this;
  };

  SignatureDocument.prototype.init = function() {
    this.FireEvent("init", {});

    if (this.script) {
      this.script.className += " signature-document-script";
      this.script.id        = "signature-document-script-"+this.uuid;

      this._getDocument();
    } else {
      console.error("Could not find script tag to initialize on.");
    }
  };

  SignatureDocument.prototype._getDocument = function() {
    var self    = this;

    self._drawCss();
    self._drawDocument();
    self._drawPages(1);

    self.Get(self.signature_document_url, function(resp) {
      self.json       = resp;
      self.page_count = self.json.documents[0].pages.length;

      self._drawPages(self.page_count);
      self._drawPagesBackgrounds();

      self.FireEvent("rendered", {});
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

  SignatureDocument.prototype._calcOffset = function() {
    for (var i=0; i < this.fabrics.length; i++) {
      this.fabrics[i].calcOffset();
    }
  };

  SignatureDocument.prototype._drawDocument = function() {
    this.document                     = document.createElement('article');
    this.document.className           = "signature-document";
    this.document.id                  = "signature-document-"+this.uuid;

    return this.InsertAfter(this.script, this.document);
  };

  SignatureDocument.prototype._drawPagesBackgrounds = function() {
    for (var i = 0; i < this.pages.length; i++) {
      var page = this.json.documents[0].pages[i];
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

  SignatureDocument.prototype.FireEvent = function(event_name, event_data) {
    var self = this;
    setTimeout(function(){
      self.trigger(event_name, event_data);
    }, 50);
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

  SignatureDocument.prototype.getParam = function(name) {
    return decodeURI(
      (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
    );
  };

  exports.SignatureDocument = SignatureDocument;

}(this));


(function(SignatureDocument){SignatureDocument.prototype._drawCss = function() {this.css = '@charset "utf-8";.signature-document{box-sizing:border-box;position:relative;margin:0;padding:55px 0 70px 0;border:0;font-size:100%;vertical-align:baseline;font-family:Helvetica;font-size:.8rem;text-align:center;background:rgba(0,0,0,0.1)}.signature-page{margin:0;padding:0;-webkit-tap-highlight-color:rgba(0,0,0,0);background:#fff;background:#fff url() center center no-repeat;background-size:contain;background-repeat:no-repeat;margin:0 auto;margin-bottom:10px;text-align:left}';var style = document.createElement('style');style.type = 'text/css';if (style.styleSheet) {style.styleSheet.cssText = this.css;} else {style.appendChild(document.createTextNode(this.css));}return document.body.appendChild(style);};}(SignatureDocument));

MicroEvent.mixin(SignatureDocument);

var signature_document = new SignatureDocument();
