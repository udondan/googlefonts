googlefonts
================

Node/Meteor wrapper for googlefonts API. 

This module will work in plain Node.js and within Meteor applications. By default it will cache the API result for 1 hour and assures there will be no concurrent requests to the Google API.

To use the Google Fonts API, you need to [acquire an API key](https://developers.google.com/fonts/docs/developer_api#Auth) for server applications.

##Install
The module is registered in [npm](https://www.npmjs.org/package/googlefonts) and [Atmosphere](https://atmospherejs.com/package/googlefonts) repositories.

###Install via NPM:
``` sh
$ npm install googlefonts
```

###Install via [Meteorite](http://oortcloud.github.io/meteorite/)

``` sh
$ mrt add googlefonts
```


##Usage
###In plain Node.js you need to require the module manually:
``` JavaScript
var googlefonts = new require("googlefonts").googlefonts;
```

###Fetching all fonts from Google:
``` JavaScript
var serverKey = "YOUR-GOOGLE-API-KEY";
var gfonts = new googlefonts(serverKey, options);
gfonts.fetch(function(fonts) {
	console.log(fonts);
});
```

The result is a JSON object as returned from the API. It's the same exact content as returned from this request: [https://www.googleapis.com/webfonts/v1/webfonts?sort=popularity&key=YOUR-GOOGLE-API-KEY](https://www.googleapis.com/webfonts/v1/webfonts?sort=popularity&key=YOUR-GOOGLE-API-KEY)

```JSON
{
 "kind": "webfonts#webfontList",
 "items": [
  {
   "kind": "webfonts#webfont",
   "family": "Open Sans",
   "category": "sans-serif",
   "variants": [
    "300",
    "300italic",
    "regular",
    "italic",
    "600",
    "600italic",
    "700",
    "700italic",
    "800",
    "800italic"
   ],
   "subsets": [
    "vietnamese",
    "greek",
    "cyrillic",
    "latin-ext",
    "devanagari",
    "cyrillic-ext",
    "greek-ext",
    "latin"
   ],
   "version": "v8",
   "lastModified": "2014-02-24",
   "files": {
    "300": "http://themes.googleusercontent.com/static/fonts/opensans/v8/DXI1ORHCpsQm3Vp6mXoaTS3USBnSvpkopQaUR-2r7iU.ttf",
    "300italic": "http://themes.googleusercontent.com/static/fonts/opensans/v8/PRmiXeptR36kaC0GEAetxi9-WlPSxbfiI49GsXo3q0g.ttf",
    "regular": "http://themes.googleusercontent.com/static/fonts/opensans/v8/IgZJs4-7SA1XX_edsoXWog.ttf",
    "italic": "http://themes.googleusercontent.com/static/fonts/opensans/v8/O4NhV7_qs9r9seTo7fnsVKCWcynf_cDxXwCLxiixG1c.ttf",
    "600": "http://themes.googleusercontent.com/static/fonts/opensans/v8/MTP_ySUJH_bn48VBG8sNSi3USBnSvpkopQaUR-2r7iU.ttf",
    "600italic": "http://themes.googleusercontent.com/static/fonts/opensans/v8/PRmiXeptR36kaC0GEAetxpZ7xm-Bj30Bj2KNdXDzSZg.ttf",
    "700": "http://themes.googleusercontent.com/static/fonts/opensans/v8/k3k702ZOKiLJc3WVjuplzC3USBnSvpkopQaUR-2r7iU.ttf",
    "700italic": "http://themes.googleusercontent.com/static/fonts/opensans/v8/PRmiXeptR36kaC0GEAetxne1Pd76Vl7zRpE7NLJQ7XU.ttf",
    "800": "http://themes.googleusercontent.com/static/fonts/opensans/v8/EInbV5DfGHOiMmvb1Xr-hi3USBnSvpkopQaUR-2r7iU.ttf",
    "800italic": "http://themes.googleusercontent.com/static/fonts/opensans/v8/PRmiXeptR36kaC0GEAetxg89PwPrYLaRFJ-HNCU9NbA.ttf"
   }
  }
  // ...more fonts...
}
```

##Options

###cacheLifeTime
Sets the space of time for how long results will be served from cache in seconds. Defaults to 3600 (1 hour).