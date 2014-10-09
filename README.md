googlefonts
================

Node/Meteor wrapper for googlefonts API.

This is basically not doing anything but requesting a single URL from the Google API and converting the result to JSON. The reason why you might want to use this module is, it has an internal cache (defaults to 1 hour) and blocks concurrent API requests and returns the result of the first request to all pending calls. Additionally the returned object is a singleton. So no matter where you instantiate it, it will be using the same cache and shared results for concurrent calls.

This module will work in plain Node.js and within Meteor applications.

To use the Google Fonts API, you need to [acquire an API key][1] for server applications.

##Install
The module is registered in [Atmosphere][3] and [npm][4] repositories.


###Install via Meteor

``` sh
$ meteor add udondan:googlefonts
```

###Install via npm
```sh
$ npm install googlefonts
```


##Usage
###In plain Node.js you need to require the module manually:
``` JavaScript
var googlefonts = require("googlefonts").googlefonts;
```

###Fetching all fonts from Google:
``` JavaScript
var serverKey = "YOUR-GOOGLE-API-KEY";
var gfonts = new googlefonts(serverKey, options);
gfonts.fetch(function(error, fonts) {
    if(typeof error !== "undefined") {
      throw error;
    }
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
  },
  // ...more fonts...
}
```

You can find a description of the fields on the [Google Fonts API manual page](https://developers.google.com/fonts/docs/developer_api#Details).


##Options

###cacheLifeTime
Sets the space of time for how long results will be served from cache in seconds. Defaults to 3600 (1 hour).

  [1]: https://developers.google.com/fonts/docs/developer_api#Auth
  [2]: https://developers.google.com/fonts/docs/developer_api#Details
  [3]: https://atmospherejs.com/udondan/googlefonts
  [4]: https://www.npmjs.org/package/googlefonts