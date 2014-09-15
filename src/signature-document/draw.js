(function(SignatureDocument){
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

}(SignatureDocument));
