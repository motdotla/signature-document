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
    self.FireEvent("fart", "again");

    self.Get(self.signature_document_url, function(resp) {
      self.json       = resp;
      self.page_count = self.json.documents[0].pages.length;

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

}(this));

