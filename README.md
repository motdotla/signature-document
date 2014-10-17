# signature-document

<img src="https://raw.githubusercontent.com/motdotla/signature-document/master/signature-document.gif" alt="signature-document" align="right" width="220" />

JavaScript rendering engine for a [signature-document](https://github.com/motdotla/signature-document#signature-document-blueprint).

It renders out the contents of the signature-document JSON to a formatted and readable document-like format but friendly to the web. It very basically displays the pages as background images, appropriately sized, and fitting to your viewable screen.

```html
<script src='/path/to/signature-document.js' data-signature-document-url="http://example.com/path/to/signature/document.json"></script>
<script src="/path/to/jafja.js"></script>
<script>
  signature_document.jafja = jafja;
  signature_document.init();
</script>
```


## Usage

Place the script tag in the body of an html page. Set data-signature-document-url to the url of a [signature-document file](https://github.com/motdotla/signature-document#signature-document-blueprint). Then initialize the script.

```html
<script src='/path/to/signature-document.js' data-signature-document-url="http://example.com/path/to/signature/document.json"></script>
<script src="/path/to/jafja.js"></script>
<script>
  signature_document.jafja = jafja;
  signature_document.init();
</script>
```

### init()

```javascript
signature_document.init();
```

### jafja

```javascript
signature_chrome.jafja = jafja
```

Set jafja to a [jafja](https://github.com/motdotla/jafja) object.                                                                              
This exposes a series of events you can bind to. 

### Events

#### signature_document.rendered

```javascript
jafja.bind('signature_document.rendered', function(values) {
  console.log('signature_document.rendered', values);
});
```

The result is an object of values.

* `multipler` - The width and height calculation multiplier.
* `fabrics` - List of fabrics' dom rendered for the document.

```javascript
{
  multiplier: 1,
  fabrics: []
}
```

#### signature_document.fabric.clicked

```javascript
jafja.bind('signature_document.fabric.clicked', function(values) {
  console.log('signature_document.fabric.clicked', values);
});
```

The result is an object of values.

* `page_number` - The number of the page (fabric) clicked.
* `x` - The x position of the last click.
* `y` - The y position of the last click.

```javascript
{
  page_number: 1,
  x: 20,
  y: 20
}
```

#### signature_document.object.selected

```javascript
jafja.bind('signature_document.object.selected', function(values) {
  console.log('signature_document.object.selected', values);
});
```

The result is an empty object.

```javascript
{}
```

#### signature_document.fabric.modified

```javascript
jafja.bind('signature_document.fabric.modified', function(values) {
  console.log('signature_document.fabric.modified', values);
});
```

The result is an object of values.

* `id` - The id of the object (element) modified.
* `x` - The x position of the last click.
* `y` - The y position of the last click.
* `type` - Either 'signature_element' or 'text_element'.

```javascript
{
  id: "some-id",
  x: 20,
  y: 20,
  type: 'signature_element'
}
```

### Example

Copy & paste the following to a blank html page.

```html
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style type="text/css">* {padding: 0; margin: 0;}</style>
</head>
<body>
  <script src='https://rawgit.com/motdotla/signature-document/master/build/signature-document.min.js' data-signature-document-url="http://signature-api.herokuapp.com/api/v0/documents/8abddacd-2bb0-498c-b4f6-e3259d7edb35.json"></script>
  <script src='https://rawgit.com/motdotla/jafja/master/build/jafja.min.js'></script>
  <script>
    signature_document.jafja = jafja;
    signature_document.init();
    jafja.bind('signature_document.rendered', function(result) {
      console.log('done rendering', result);
    });
  </script>
</body>
</html>
```

It will render out to look like the following image.

<img src="https://raw.githubusercontent.com/motdotla/signature-document/master/signature-document.png" alt="signature-document" />

## Signature Document Blueprint

A signature-document should be built in the following format. This is a working blueprint and subject to change.

The format borrows from [json:api](http://jsonapi.org/). It should have a documents array, but with only one document in the array. Nested inside shall be a pages array. Each page should have a number as an integer, and a url to the PNG or JPG image of the page. The status should say 'processed'. 

```json
{
  "documents": [
    {
      "pages": [
        {
          "number": 1,
          "url": "https://carveproduction.s3.amazonaws.com/48bb42cd-413b-4859-7173-a2e90b41f9fb/1.png"
        },
        {
          "number": 2,
          "url": "https://carveproduction.s3.amazonaws.com/48bb42cd-413b-4859-7173-a2e90b41f9fb/2.png"
        },
        {
          "number": 3,
          "url": "https://carveproduction.s3.amazonaws.com/48bb42cd-413b-4859-7173-a2e90b41f9fb/3.png"
        },
        {
          "number": 4,
          "url": "https://carveproduction.s3.amazonaws.com/48bb42cd-413b-4859-7173-a2e90b41f9fb/4.png"
        },
        {
          "number": 5,
          "url": "https://carveproduction.s3.amazonaws.com/48bb42cd-413b-4859-7173-a2e90b41f9fb/5.png"
        },
        {
          "number": 6,
          "url": "https://carveproduction.s3.amazonaws.com/48bb42cd-413b-4859-7173-a2e90b41f9fb/6.png"
        },
        {
          "number": 7,
          "url": "https://carveproduction.s3.amazonaws.com/48bb42cd-413b-4859-7173-a2e90b41f9fb/7.png"
        },
        {
          "number": 8,
          "url": "https://carveproduction.s3.amazonaws.com/48bb42cd-413b-4859-7173-a2e90b41f9fb/8.png"
        },
        {
          "number": 9,
          "url": "https://carveproduction.s3.amazonaws.com/48bb42cd-413b-4859-7173-a2e90b41f9fb/9.png"
        },
        {
          "number": 10,
          "url": "https://carveproduction.s3.amazonaws.com/48bb42cd-413b-4859-7173-a2e90b41f9fb/10.png"
        },
        {
          "number": 11,
          "url": "https://carveproduction.s3.amazonaws.com/48bb42cd-413b-4859-7173-a2e90b41f9fb/11.png"
        },
        {
          "number": 12,
          "url": "https://carveproduction.s3.amazonaws.com/48bb42cd-413b-4859-7173-a2e90b41f9fb/12.png"
        },
        {
          "number": 13,
          "url": "https://carveproduction.s3.amazonaws.com/48bb42cd-413b-4859-7173-a2e90b41f9fb/13.png"
        }
      ],
      "status": "processed",
      "url": "http://www.bramstoker.org/pdf/stories/03guest/01guest.pdf",
    }
  ]
}
```

## Development

```
npm install -g grunt-cli
npm install
grunt
```

Visit <http://localhost:3000/>

You can change the document being rendering by adjusting the script tag's data-signature-document-url in public/index.html.
