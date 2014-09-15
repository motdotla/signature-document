(function(exports){

  var SignatureDocument = function() {
    //if(!(this instanceof SignatureDocument)){
    //  return new SignatureDocument();
    //}

    this.last_click                 = {};
    this.pages                      = [];
    this.canvases                   = [];
    this.fabrics                    = [];
    this.signature_nav_btns         = [];
    this.pad                        = signature_pad;
    this.uuid                       = this.Uuid();
    this.script                     = this.CurrentlyExecutedScript();
    this.parent                     = this.script.parentNode;
    this.json                       = {documents: []};
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

      this._drawCss();
      this.getDocument();
      this._drawNav();
      this._drawDoneNav();
      this._drawDone();
      this._drawDoneConfirmation();
      this.events();
    } else {
      console.error("Could not find script tag to initialize on.");
    }
  };

  SignatureDocument.prototype.getDocument = function() {
    var self    = this;

    self._drawDocument();
    self._drawPages(1);
    setTimeout(function(){
      self.trigger("fart", "dude");
    }, 50);
    //self._drawProcessing(); // need a better and simple processing message. or make it a bindable event

    var url = self.getParam("url");
    self.Get(url, function(resp) {
      self.json       = resp;
      self.page_count = self.json.documents[0].pages.length;

      self._drawPages(self.page_count);
      self._drawPagesBackgrounds();
      self._drawPagesCanvases();
      //self._drawCanvasesTextElements();
      //self._drawCanvasesSignatureElements();
      //self._maintainElementPositions();
      //setTimeout(function(){ self._calcOffset(); }, 1000);

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

}(this));

