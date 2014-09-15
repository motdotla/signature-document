# signature-document

<img src="https://raw.githubusercontent.com/motdotla/signature-document/master/signature-document.png" alt="signature-document" align="right" width="400" />

JavaScript rendering engine for a [signature-document]().

```html
<script src='/path/to/signature-document.js' data-signature-document-url="http://example.com/path/to/signature/document.json"></script>
```

## Usage

Here's a working example. Paste this somewhere on a blank html page.

```html
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style type="text/css">* {padding: 0; margin: 0;}</style>
</head>
<body>
  <script src='https://raw.githubusercontent.com/motdotla/signature-document/master/build/signature-document.min.js' data-signature-document-url="http://signature-api.herokuapp.com/api/v0/documents/0a564265-6429-4852-9014-1e9249934f5c.json"></script>
</body>
</html>
```

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
