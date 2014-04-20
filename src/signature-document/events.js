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
    var text = prompt('i8n.prompt_text', '');

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
