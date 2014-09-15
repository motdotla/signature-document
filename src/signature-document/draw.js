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

    this.processing.innerHTML     = '<div class="signature-processing-document signature-processing-animated signature-processing-lengthy-duration signature-processing-infinite-iteration signature-processing-bounceInRightAndBounceOutLeft"><div class="signature-processing-spinner"></div><div class="signature-processing-corner signature-processing-triangle"></div><div class="signature-processing-bars"><div class="signature-processing-bar signature-processing-short"></div><div class="signature-processing-bar"></div><div class="signature-processing-bar"></div><div class="signature-processing-bar"></div></div></div><p class="signature-processing-text-center signature-processing-animated signature-processing-short-duration signature-processing-fadeInUp">i8n.processing_document.<br/>i8n.wait_patiently.</p>'; 
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
    fab.signature_page_id           = this.json.documents[0].pages[page_number-1];
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
    var page_json = this.json.documents[0].pages[page_number-1];
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
    var page_json = this.json.documents[0].pages[page_number-1];
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
    this.done_btn.innerHTML       = "i8n.done";
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
    span1.className = "signature-nav-span fa fa-font";
    this.text_mode_btn.appendChild(span1);
    li1.appendChild(this.text_mode_btn);
    nav_ul.appendChild(li1);

    // sign_mode_btn
    var li2    = document.createElement("li");
    this.sign_mode_btn = document.createElement("a");
    this.sign_mode_btn.className = "signature-nav-btn";
    this.signature_nav_btns.push(this.sign_mode_btn);
    var span2  = document.createElement("span");
    span2.className = "signature-nav-span fa fa-pencil";
    this.sign_mode_btn.appendChild(span2);
    li2.appendChild(this.sign_mode_btn);
    nav_ul.appendChild(li2);

    // trash btn
    var li3    = document.createElement("li");
    this.trash_mode_btn = document.createElement("a");
    this.trash_mode_btn.className = "signature-nav-btn signature-nav-disabled";
    this.signature_nav_btns.push(this.trash_mode_btn);
    var span3  = document.createElement("span");
    span3.className = "signature-nav-span fa fa-trash";
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
    done_confirmation_msg.innerHTML       = "i8n.done_confirmation_msg";

    this.done_confirmation.appendChild(done_confirmation_msg);

    this.done_confirmation_yes            = document.createElement('a');
    this.done_confirmation_yes.className  = "signature-button signature-button-primary signature-done-confirmation-yes";
    this.done_confirmation_yes.innerHTML  = "i8n.yes";
    this.done_confirmation.appendChild(this.done_confirmation_yes);

    this.done_confirmation_no            = document.createElement('a');
    this.done_confirmation_no.className  = "signature-button signature-done-confirmation-no";
    this.done_confirmation_no.innerHTML  = "i8n.no";
    this.done_confirmation.appendChild(this.done_confirmation_no);

    return this.document.appendChild(this.done_confirmation);
  };

  SignatureDocument.prototype._drawDone = function() {
    this.done                           = document.createElement('div');
    this.done.className                 = "signature-hidden signature-done";

    var done_msg                        = document.createElement('p');
    done_msg.className                  = "signature-done-msg";
    done_msg.innerHTML                  = "i8n.done_msg";
    this.done.appendChild(done_msg);

    this.download                       = document.createElement('a');
    this.download.className             = "signature-hidden signature-download signature-button signature-button-primary";
    this.download.innerHTML             = "i8n.download";
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
