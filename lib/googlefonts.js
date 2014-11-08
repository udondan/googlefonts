// Require NPM modules in Node AND Meteor style!
var https = typeof Meteor === 'undefined' ? require('https') : Npm.require('https');
var endOfLine = (typeof Meteor === 'undefined' ? require('os') : Npm.require('os')).EOL;

var instance = false; // Holds the singleton instance

// Wrapper for singleton
googlefonts = function(apiKey, options) {
  instance = instance || new singleton(apiKey, options);
  return instance;
}

// To prevent concurrent requests to the Google API we make use of a singleton.
// There will only be one instance which handled concurrent requests internally.
var singleton = function(apiKey, options) {
  
  self = this;
  
  self.options = options || {};
  
  self.apiKey = apiKey; // Holds the API key, may it be browser or server
  
  self._buffer; // Buffer for API response
  self._cache = false; // Cache for API response
  self._lastFetch = false; // Timestamp when data was last fetched from googleapis.com
  self.requestInProgress = false; // Will be true when API is currently queried
  
  // Holds all callbacks to fire when API response completes. So why is this an
  // array? Becuase we prevent concurrent requests. In case a fetch is called
  // while alredy an API reqeusts is running, we simply collect the callbacks
  // and fire them all together when the first reqeusts has finished.
  self.callbacks = [];
  
  // If nothing else specified, we cache API results for 1 hour
  self.options.cacheLifeTime = self.options.cacheLifeTime || 3600;
  
  // Fetch API result, save it to buffer + cache and call given callbacks
  self.fetch = function(callback) {
    
    // Check if we serve from cache or request the API
    var now = new Date() / 1000;
    if (self._cache && now - self._lastFetch < self.options.cacheLifeTime) {
      callback(undefined,self._cache);
      return self;
    }
    
    // If a new callback was given, add it to the list of callbacks
    if (typeof callback === "function") {
      self.callbacks.push(callback);
    }
    
    // If there already is a requests running, just return. The callback will be
    // called later
    if (self.requestInProgress === true) {
      return self;
    }
    
    self.requestInProgress = true;
    
    var options = {
      host: 'www.googleapis.com',
      path: '/webfonts/v1/webfonts?key=' + self.apiKey
    };
    
    self._buffer = "";
    
    var request = https.request(options, function(result) {
      result.setEncoding('utf8');
      
      // Writing incoming chunks to internal buffer
      result.on('data', function (chunk) {
        self._buffer += chunk;
      });
      
      // Parse buffer into object, save into cache and call all callbacks
      result.on('end', function () {
        
        var parsed = JSON.parse(self._buffer);
        
        // Google returned an error
        if (typeof parsed.error != "undefined") {
          var errorBuffer = options.host + " returned errors:";
          parsed.error.errors.forEach(function(error) {
            errorBuffer += endOfLine + "  " + error.message + ": " + error.reason;
          });
          var error = new Error(errorBuffer);
        }
        
        self._lastFetch = new Date() / 1000;
        self._cache = parsed;
        self.requestInProgress = false;
        
        //We have callbacks to fire
        if (self.callbacks.length) {
          self.callbacks.forEach(function(callback) {
            if (typeof callback === "function") {
              callback(error || undefined, self._cache);
            }
          });
        }
        self.requestInProgress = false;
        self.callbacks = [];
      });
      
      // Error handler
      result.on('error', function (error) {
        self.callbacks.forEach(function(callback) {
          if (typeof callback === "function") {
            callback(error, undefined);
          }
        });
        self.requestInProgress = false;
        self.callbacks = [];
      });
      
    }).end();
    return self;
  }
};

// Only export if this is not called within Meteor
if (typeof Meteor === 'undefined') {
  exports.googlefonts = googlefonts;
}
