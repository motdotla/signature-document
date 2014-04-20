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
