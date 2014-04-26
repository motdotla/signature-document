module.exports = (grunt) ->
  # custom task to embed css into the view
  grunt.registerTask 'embedcss', 'Embed CSS.', ->
    sqwish          = require('sqwish')

    src             = grunt.file.read("src/css/application.css")
    minified_css    = sqwish.minify(src)

    combined = "(function(SignatureDocument){" +
      "SignatureDocument.prototype._drawCss = function() {" +
        "this.css = '" + minified_css + "';" +
        "var style = document.createElement('style');" +
        "style.type = 'text/css';" +
        "if (style.styleSheet) {" +
          "style.styleSheet.cssText = this.css;" +
        "} else {" +
          "style.appendChild(document.createTextNode(this.css));" +
        "}" +
        "var self = this;" +
        "setTimeout(function() { self.trigger('_drawCss', self); }, 1);" +
        "return document.body.appendChild(style);" +
      "};" +
    "}(SignatureDocument));"

    grunt.file.write("src/signature-document/css.js", combined)
    
  i8nSetValues = (original_src, language_code) ->
    en_i8n  = grunt.file.readJSON("locales/en.json")
    i8n     = grunt.file.readJSON("locales/#{language_code}.json")
    i8n     = grunt.util._.extend(en_i8n, i8n)

    src = original_src
    src = src.replace "i8n.done_confirmation_msg", i8n.done_confirmation_msg
    src = src.replace "i8n.done_msg", i8n.done_msg
    src = src.replace "i8n.done", i8n.done
    src = src.replace "i8n.yes", i8n.yes
    src = src.replace "i8n.no", i8n.no
    src = src.replace "i8n.prompt_text", i8n.prompt_text
    src = src.replace "i8n.processing_document", i8n.processing_document
    src = src.replace "i8n.wait_patiently", i8n.wait_patiently
    src = src.replace "i8n.download", i8n.download
    src

  grunt.initConfig
    pkg: grunt.file.readJSON("package.json")
    banner: "/*! <%= pkg.name %>.js - <%= pkg.version %> - <%= grunt.template.today(\"yyyy-mm-dd\") %> - <%= pkg.author %> */\n"
    uglify:
      options:
        banner: "<%= banner %>"
      en:
        src: "build/signature-document.js"
        dest: "build/signature-document.min.js"
      fr:
        src: "build/signature-document.fr.js"
        dest: "build/signature-document.fr.min.js"
    concat:
      options:
        banner: "<%= banner %>"
        separator: '\n\n'
        stripBanners : true
      en:
        options:
          process: (src, filepath) ->
            i8nSetValues(src, "en")
        src: ["src/libs/microevent.js", "src/libs/fabric.js", "src/libs/signature-pad.js", "src/extensions/*.js", "src/signature-document.js", "src/signature-document/*.js"]
        dest: "build/signature-document.js"
      fr:
        options:
          process: (src, filepath) ->
            i8nSetValues(src, "fr")
        src: ["src/libs/microevent.js", "src/libs/fabric.js", "src/libs/signature-pad.fr.js", "src/extensions/*.js", "src/signature-document.js", "src/signature-document/*.js"]
        dest: "build/signature-document.fr.js"
    jshint:
      all: ['src/signature-document.js', 'src/signature-document/*.js']
    connect:
      server:
        options:
          hostname: "*"
          port: 3000,
          base: './public'
          keepalive: true
    simplemocha:
      all:
        src: 'test/*.js'


  grunt.loadNpmTasks "grunt-contrib-concat"
  grunt.loadNpmTasks "grunt-contrib-uglify"
  grunt.loadNpmTasks "grunt-contrib-connect"
  grunt.loadNpmTasks "grunt-simple-mocha"
  grunt.loadNpmTasks "grunt-contrib-jshint"

  grunt.registerTask "test", ["simplemocha", "jshint"]
  grunt.registerTask "default", ["embedcss", "jshint", "concat", "uglify", "connect"]

  # Some available commands
  # grunt
  # grunt test
  # grunt connect
