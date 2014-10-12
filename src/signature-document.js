(function(exports){

  var SignatureDocument = function() {
    this.pages                      = [];
    this.canvases                   = [];
    this.fabrics                    = [];
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

    this.jafja = undefined;

    return this;
  };

  SignatureDocument.prototype.init = function() {
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
      self._drawPagesCanvases();

      self.jafja.trigger("rendered", {multiplier: self.multiplier, fabrics: self.fabrics});
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
    //fab.signature_page_id           = this.json.documents[0].pages[page_number-1];
    this._fabricEvents(fab);

    fab.setWidth(this.style_width);
    fab.setHeight(this.style_height);
    fab.calcOffset();

    return this.fabrics.push(fab);
  };

  SignatureDocument.prototype._fireLastClick = function(fab, event) {
    this.last_click = {
      fab:  fab,
      x:    fab.getPointer(event).x || this.last_click.x,
      y:    fab.getPointer(event).y || this.last_click.y 
    };

    this.jafja.trigger("fabric.clicked", this.last_click);
  };

  SignatureDocument.prototype._fabricEvents = function(fab) {
    var _this = this;               
    fab.on('mouse:down', function(options) {
      // only use mouse:down for touch events. Won't capture x,y on mouse:up for touch events
      if (options.e.targetTouches && options.e.targetTouches.length > 0) {
        _this._fireLastClick(fab, options.e);
      }
    });

    fab.on('mouse:up', function(options) {
      _this._fireLastClick(fab, options.e);
    });
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

MicroEvent.mixin(SignatureDocument);
var signature_document = new SignatureDocument();
