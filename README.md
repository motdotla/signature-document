# signature-document

<img src="https://raw.githubusercontent.com/motdotla/signature-document/master/signature-document.gif" alt="signature-document" align="right" width="220" />

JavaScript rendering engine for a [signature-document](https://github.com/motdotla/signature-document#signature-document-blueprint).

It renders out the contents of the signature-document JSON to a formatted and readable document-like format but friendly to the web. It very basically displays the pages as background images, appropriately sized, and fitting to your viewable screen.

```html
<script src='/path/to/signature-document.js' data-signature-document-url="http://example.com/path/to/signature/document.json"></script>
<script>
  signature_document.init();
</script>
```


## Usage

Place the script tag in the body of an html page. Set data-signature-document-url to the url of a [signature-document file](https://github.com/motdotla/signature-document#signature-document-blueprint). Then initialize the script.

```html
<script src='/path/to/signature-document.js' data-signature-document-url="http://example.com/path/to/signature/document.json"></script>
<script>
  signature_document.init();
</script>
```

### Events

You can bind to the following events.

#### rendered

```javascript
signature_document.init();
signature_document.bind('rendered', function(values) {
  console.log('rendered', values);
});
```

This will expose a spattering of values.

* elements.pages - List of pages' dom rendered for the document.

```javascript
{
  elements: {
    pages: []
  }
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
  <script>
    signature_document.bind('rendered', function(value) {
      console.log('done rendering');
    });
  </script>
</body>
</html>
```

It will render out to look like the following image.

<img src="https://raw.githubusercontent.com/motdotla/signature-document/master/signature-document.png" alt="signature-document" />

## Signature Document Blueprint

A signature-document should be built in the following format. This is a working blueprint and subject to change.

The format borrows from [json:api](http://jsonapi.org/). It should have a documents array, but with only one document in the array. Nested inside shall be a pages array. Each page should have a sort as an integer, and a url to the PNG or JPG image of the page. The status should say 'processed'. 

```json
{
  "documents": [
    {
      "pages": [
        {
          "sort": 1,
          "url": "https://carveproduction.s3.amazonaws.com/48bb42cd-413b-4859-7173-a2e90b41f9fb/1.png"
        },
        {
          "sort": 2,
          "url": "https://carveproduction.s3.amazonaws.com/48bb42cd-413b-4859-7173-a2e90b41f9fb/2.png"
        },
        {
          "sort": 3,
          "url": "https://carveproduction.s3.amazonaws.com/48bb42cd-413b-4859-7173-a2e90b41f9fb/3.png"
        },
        {
          "sort": 4,
          "url": "https://carveproduction.s3.amazonaws.com/48bb42cd-413b-4859-7173-a2e90b41f9fb/4.png"
        },
        {
          "sort": 5,
          "url": "https://carveproduction.s3.amazonaws.com/48bb42cd-413b-4859-7173-a2e90b41f9fb/5.png"
        },
        {
          "sort": 6,
          "url": "https://carveproduction.s3.amazonaws.com/48bb42cd-413b-4859-7173-a2e90b41f9fb/6.png"
        },
        {
          "sort": 7,
          "url": "https://carveproduction.s3.amazonaws.com/48bb42cd-413b-4859-7173-a2e90b41f9fb/7.png"
        },
        {
          "sort": 8,
          "url": "https://carveproduction.s3.amazonaws.com/48bb42cd-413b-4859-7173-a2e90b41f9fb/8.png"
        },
        {
          "sort": 9,
          "url": "https://carveproduction.s3.amazonaws.com/48bb42cd-413b-4859-7173-a2e90b41f9fb/9.png"
        },
        {
          "sort": 10,
          "url": "https://carveproduction.s3.amazonaws.com/48bb42cd-413b-4859-7173-a2e90b41f9fb/10.png"
        },
        {
          "sort": 11,
          "url": "https://carveproduction.s3.amazonaws.com/48bb42cd-413b-4859-7173-a2e90b41f9fb/11.png"
        },
        {
          "sort": 12,
          "url": "https://carveproduction.s3.amazonaws.com/48bb42cd-413b-4859-7173-a2e90b41f9fb/12.png"
        },
        {
          "sort": 13,
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
