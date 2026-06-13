/**
 * Titanium Mobile Utility Functions
 *
 * @author      Joshua Priddle <jpriddle@nevercraft.net>
 * @url         https://github.com/itspriddle/titanium_mobile-helpers
 * @version     0.0.5
 */

var $ = (function() {

  /**
   * Shorthand for Ti.API logger methods
   *
   * JSON.stringifys message if it is not a string
   */

  this.log = this.console = function(message, level) {
    if (typeof message != "string") {
      message = JSON.stringify(message);
    }
    Ti.API[level || 'info'](message);
  };

  // --------------------------------------------------------------------

  /**
   * Fire an alert, should be used for debugging only
   *
   * JSON.stringifys message if it is not a string
   */

  this.alert = function(message) {
    if (typeof message != "string") {
      message = JSON.stringify(message);
    }
    alert(message);
  };

  // --------------------------------------------------------------------

  /**
   * Iterates over an object invoking callback for each member
   *
   * callback: function(value, key) {}
   */

  this.each = function(object, callback, context) {
    for (var key in object) {
      if (object[key]) {
        callback.call(context, object[key], key, object);
      }
    }
  };

  // --------------------------------------------------------------------

  /**
   * Iterates over an object returning callback for each member
   *
   * callback: function(value, key) { return "Value is " + value; }
   */

  this.map = function(object, callback, context) {
    var out = [];
    for (var key in object) {
      if (object[key]) {
        out.push(callback.call(context, object[key], key, object));
      }
    }
    return out;
  };

  // --------------------------------------------------------------------

  /**
   * Extends destination with source's attributes
   */

  this.extend = function(destination, source) {
    for (var prop in source) {
      if (source[prop]) {
        destination[prop] = source[prop];
      }
    }
    return destination;
  };

  // --------------------------------------------------------------------

  /**
   * Simple key/value store using Ti.App.Properties
   *
   * Set config:
   *   $.config('user', {username: 'itspriddle'})
   *
   * Get config:
   *   $.config('user')
   *
   * Delete config:
   *   $.config('user', null);
   */

  this.config = function(key, value) {
    if (arguments.length == 2) {
      if (value === null && Ti.App.Properties.hasProperty(key)) {
        Ti.App.Properties.removeProperty(key);
      } else {
        Ti.App.Properties.setString(key, JSON.stringify(value));
      }
    } else if (arguments.length == 1) {
      var data = Ti.App.Properties.getString(key, false);
      return data && JSON.parse(data) || undefined;
    }
  };

  // --------------------------------------------------------------------

  /**
   * Detect simulators
   *
   * If callback is supplied and we're using the simulator, execute/return it
   * Otherwise return true or false if were using the simulator
   */

  this.development = function(callback) {
    var sim = Ti.Platform.model == 'google_sdk' || Ti.Platform.model == 'Simulator';
    if (sim && callback) {
      return callback();
    } else {
      return sim;
    }
  };

  // --------------------------------------------------------------------

  /**
   * Detect production (basically the opposite of $.development)
   */

  this.production = function(callback) {
    var production = ! $.development();
    if (production && callback) {
      return callback();
    } else {
      return production;
    }
  };

  // --------------------------------------------------------------------

  /**
   * Detect iphone
   *
   * If callback is supplied and this is iphone, execute and return it
   * Otherwise return true if iphone or false
   */

  this.iphone = function(callback) {
    var iphone = Ti.Platform.osname == 'iphone';
    if (iphone && callback) {
      return callback();
    } else {
      return iphone;
    }
  };

  // --------------------------------------------------------------------

  /**
   * Detect ipad
   *
   * If callback is supplied and this is ipad, execute and return it
   * Otherwise return true if ipad or false
   */

  this.ipad = function(callback) {
    var ipad = Ti.Platform.osname == 'ipad';
    if (ipad && callback) {
      return callback();
    } else {
      return ipad;
    }
  };

  // --------------------------------------------------------------------

  /**
   * Detect android
   *
   * If callback is supplied and this is android, execute and return it
   * Otherwise return true if android or false
   */

  this.android = function(callback) {
    var android = Ti.Platform.osname == 'android';
    if (android && callback) {
      return callback();
    } else {
      return android;
    }
  };

  // --------------------------------------------------------------------

  /**
   * strftime, based on http://github.com/github/jquery-relatize_date
   */

  this.strftime = function(date, format) {
    var shortDays   = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ],
        days        = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ],
        shortMonths = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
        months      = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ],
        day         = date.getDay(), month = date.getMonth(),
        hours       = date.getHours(), minutes = date.getMinutes(),
        pad         = function(num) {
          var string = num.toString(10);
          return new Array((2 - string.length) + 1).join('0') + string;
        };

    return format.replace(/\%([aAbBcdHImMpSwyY])/g, function(part) {
      var out = null;
      switch (part[1]) {
        case 'a': out = shortDays[day]; break;
        case 'A': out = days[day]; break;
        case 'b': out = shortMonths[month]; break;
        case 'B': out = months[month]; break;
        case 'c': out = date.toString(); break;
        case 'd': out = pad(date.getDate()); break;
        case 'H': out = pad(hours); break;
        case 'I': out = pad((hours + 12) % 12); break;
        case 'm': out = pad(month + 1); break;
        case 'M': out = pad(minutes); break;
        case 'p': out = hours > 12 ? 'PM' : 'AM'; break;
        case 'S': out = pad(date.getSeconds()); break;
        case 'w': out = day; break;
        case 'y': out = pad(date.getFullYear() % 100); break;
        case 'Y': out = date.getFullYear().toString(); break;
      }
      return out;
    });
  };

  // --------------------------------------------------------------------

  this.relatizeDate = function(date, includeTime) {
    function distanceOfTimeInWords(fromTime, toTime, includeTime) {

      var delta = parseInt((toTime.getTime() - fromTime.getTime()) / 1000, 10);
      if (delta < 60) {
        return 'less than a minute ago';
      } else if (delta < 120) {
        return 'about a minute ago';
      } else if (delta < (45 * 60)) {
        return (parseInt(delta / 60, 10)).toString() + ' minutes ago';
      } else if (delta < (120 * 60)) {
        return 'about an hour ago';
      } else if (delta < (24 * 60 * 60)) {
        return 'about ' + (parseInt(delta / 3600, 10)).toString() + ' hours ago';
      } else if (delta < (48 * 60 * 60)) {
        return '1 day ago';
      } else {
        var days = (parseInt(delta / 86400, 10)).toString();
        if (days > 5) {
          var fmt  = '%B %d, %Y';
          if (includeTime) {
            fmt += ' %I:%M %p';
          }
          return $.strftime(fromTime, fmt);
        } else {
          return days + " days ago";
        }
      }
    }

    return distanceOfTimeInWords(new Date(date), new Date(), includeTime);
  };

  // --------------------------------------------------------------------

  /**
   * Trim leading/trailing whitespace
   */

  this.trim = function(string) {
    return String(string).replace(/^\s+|\s+$/g, '');
  };

  // --------------------------------------------------------------------

  /**
   * Returns false if object is false/undefined or a blank string
   */

  this.isset = function(object) {
    return object && object !== undefined && $.trim(object) !== '';
  };

  // --------------------------------------------------------------------

  /**
   * Format string (like sprintf), aliased to String.format
   *
   * Usage:
   *
   *   // Returns: 'The cow says "moo"!'
   *   $.format('The cow says "%s"!', 'moo');
   *
   *   // Returns: 'I <3 javascript and ruby'
   *   $.format('I <3 %s and %s', 'javascript', 'ruby');
   */

  this.format = function() {
    $.log('$.format is deprecated. Use String.format');
    return String.format.apply(null, arguments);
  };

  // --------------------------------------------------------------------

  /**
   * Get data via AJAX
   *
   * Usage:
   *
   *   // Syncronous by default, code execution will halt until $.ajax
   *   // returns data
   *   var output = $.ajax({
   *     url: '/pong',
   *     method: 'GET'
   *   });
   *
   *   // Asyncronous style
   *   $.ajax({
   *     url: '/pong',
   *     method: 'PUT',
   *     async: true,
   *     onload: function() {
   *       alert('It worked!');
   *     },
   *     onerror: function() {
   *       alert('Awww, it broke :(');
   *     },
   *     headers: {
   *       'X-My-Custom-Header': 'I like turtles!',
   *       'X-XHIBIT': 'Yo Dawg, I heard you like custom request headers...'
   *     }
   *   });
   */

  this.ajax = function(settings) {

    if ( ! settings.url) {
      return "ERROR: Must set settings.url!";
    }

    var xhr = Ti.Network.createHTTPClient();
    xhr.open(settings.method || 'GET', settings.url, settings.async || false);
    if (settings.method == 'PUT' || settings.method == 'DELETE') {
      xhr.setRequestHeader('X-HTTP-Method-Override', settings.method);
    }

    this.each(['onload', 'onerror', 'onreadystatechange', 'onsendstream'], function(callback) {
      if (settings[callback] && typeof settings[callback] == 'function') {
        xhr[callback] = settings[callback];
      }
    });

    if (settings.headers && settings.headers.length > 0) {
      this.each(settings.headers, function(val, key) {
        xhr.setRequestHeader(key, val);
      });
    }

    xhr.send(settings.payload || {});
    return xhr;
  };

  // --------------------------------------------------------------------

  /**
   * (Private) Get JSON via AJAX, returns a JavaScript object
   */

  function getJSON(settings) {
    var ajax = $.ajax(settings);
    return JSON.parse(ajax.responseText);
  }

  // --------------------------------------------------------------------

  /**
   * Get JSON from url
   */

  this.get = function(url) {
    return getJSON({url: url});
  };

  // --------------------------------------------------------------------

  /**
   * POST data to url
   */

  this.post = function(url, data) {
    return getJSON({url: url, payload: data, method: 'POST'});
  };

  // --------------------------------------------------------------------

  /**
   * PUT data to url
   */

  this.put = function(url, data) {
    return getJSON({url: url, payload: data, method: 'PUT'});
  };

  // --------------------------------------------------------------------

  /**
   * Send DELETE to url
   */

  this.del = function(url) {
    return getJSON({url: url, method: 'DELETE'});
  };

  // --------------------------------------------------------------------

  /**
   * Prompt user to rate this app (iPhone only).
   * Greg Pierce - https://gist.github.com/470113
   */

  this.rater = function(settings) {
    if ($.android()) {
      return;
    }

    // Name of your App in the App Store
    var appName = settings.appName,

    // URL for your App in iTunes
    appURL = settings.appURL,

    // Interval to prompt for feedback
    interval = settings.interval || 20,

    // Title of the alert box
    title = settings.title || 'Feedback',

    // Message displayed in the alert box
    // The string '{app_name}' will be replaced by settings.appName
    message = settings.message || 'Thanks for using {app_name}, please rate us in the App Store!',

    // Store the launch count and if user declined feedback prompt
    data = {
      launchCount: 0,
      neverRemind: false
    };

    // Save launch count and load rater if it's time
    function load() {
      var stored = $.config('RaterData');
      if (prop) {
        data = stored;
      }
      data.launchCount++;
      $.config('RaterData', data);

      if (data.neverRemind || data.launchCount % interval !== 0) { return; }

      var alert = Ti.UI.createAlertDialog({
        title:       "Feedback",
        message:     message.replace('{app_name}', appName),
        buttonNames: [ "Rate Now", "Don't Remind Me", "Not Now" ],
        cancel:      2
      });

      alert.addEventListener('click', function(e) {
        if (e.index === 0 || e.index === 1) {
          data.neverRemind = true;
          $.config('RaterData', data);
        }

        if (e.index === 0) {
          Ti.Platform.openURL(appURL);
        }
      });
      alert.show();
    };

    load();
  };

  // --------------------------------------------------------------------

  return this;

})();
