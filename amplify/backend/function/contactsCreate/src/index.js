module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/contactsCreate/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/@middy/core/index.js":
/*!********************************************!*\
  !*** ../node_modules/@middy/core/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const isPromise = __webpack_require__(/*! ./isPromise */ "../node_modules/@middy/core/isPromise.js")
const once = __webpack_require__(/*! once */ "../node_modules/once/once.js")

/**
 * @typedef middy
 * @type function
 * @param {Object} event - the AWS Lambda event from the original handler
 * @param {Object} context - the AWS Lambda context from the original handler
 * @param {function} callback - the AWS Lambda callback from the original handler
 * @property {useFunction} use - attach one or more new middlewares
 * @property {applyMiddlewareFunction} applyMiddleware - attach a new middleware
 * @property {middlewareAttachFunction} before - attach a new *before-only* middleware
 * @property {middlewareAttachFunction} after - attach a new *after-only* middleware
 * @property {middlewareAttachFunction} onError - attach a new *error-handler-only* middleware
 * @property {Object} __middlewares - contains the list of all the attached
 *   middlewares organised by type (`before`, `after`, `onError`). To be used only
 *   for testing and debugging purposes
 */

/**
 * @typedef useFunction
 * @type {function}
 * @param {middlewareObject|middlewareObject[]} - the middleware object or array of middleware objects to attach
 * @return {middy}
 */

/**
 * @typedef applyMiddlewareFunction
 * @type {function}
 * @param {middlewareObject} - the middleware object to attach
 * @return {middy}
 */

/**
 * @typedef middlewareAttachFunction
 * @type {function}
 * @param {middlewareFunction} - the middleware function to attach
 * @return {middy}
 */

/**
  * @typedef middlewareNextFunction
  * @type {function}
  * @param {error} error - An optional error object to pass in case an error occurred
  */

/**
 * @typedef middlewareFunction
 * @type {function}
 * @param {function} handler - the original handler function.
 *   It will expose properties `event`, `context`, `response`, `error` and `callback` that can
 *   be used to interact with the middleware lifecycle
 * @param {middlewareNextFunction} next - the callback to invoke to pass the control to the next middleware
 * @return {void|Promise} - A middleware can return a Promise instead of using the `next` function as a callback.
 *                          In this case middy will wait for the promise to resolve (or reject) and it will automatically
 *                          propagate the result to the next middleware.
 */

/**
 * @typedef middlewareObject
 * @type Object
 * @property {middlewareFunction} before - the middleware function to attach as *before* middleware
 * @property {middlewareFunction} after - the middleware function to attach as *after* middleware
 * @property {middlewareFunction} onError - the middleware function to attach as *error* middleware
 */

const runMiddlewares = (middlewares, request, done) => {
  const stack = Array.from(middlewares)
  const runNext = (err) => {
    try {
      if (err) {
        return done(err)
      }

      const nextMiddleware = stack.shift()

      if (nextMiddleware) {
        const retVal = nextMiddleware(request, runNext)

        if (retVal) {
          if (!isPromise(retVal)) {
            throw new Error('Unexpected return value in middleware')
          }

          retVal
            .then(runNext)
            .catch(done)
        }

        return
      }

      return done()
    } catch (err) {
      return done(err)
    }
  }

  runNext()
}

const runErrorMiddlewares = (middlewares, request, done) => {
  const stack = Array.from(middlewares)
  request.__handledError = false
  const runNext = (err) => {
    try {
      if (!err) {
        request.__handledError = true
      }

      const nextMiddleware = stack.shift()

      if (nextMiddleware) {
        const retVal = nextMiddleware(request, runNext)

        if (retVal) {
          if (!isPromise(retVal)) {
            const invalidMiddlewareReturnError = new Error('Unexpected return value in onError middleware')
            // embed original error to avoid swallowing the real exception
            invalidMiddlewareReturnError.originalError = err
            throw invalidMiddlewareReturnError
          }

          retVal
            .then(runNext)
            .catch(done)
        }

        return
      }

      return done(request.__handledError ? null : err)
    } catch (err) {
      return done(err)
    }
  }

  runNext(request.error)
}

/**
 * Middy factory function. Use it to wrap your existing handler to enable middlewares on it.
 * @param  {function} handler - your original AWS Lambda function
 * @return {middy} - a `middy` instance
 */
const middy = (handler) => {
  const beforeMiddlewares = []
  const afterMiddlewares = []
  const errorMiddlewares = []

  const instance = (event, context, callback) => {
    const request = {}
    request.event = event
    request.context = context
    request.callback = callback
    request.response = null
    request.error = null

    const middyPromise = new Promise((resolve, reject) => {
      const terminate = (err) => {
        if (err) {
          return callback ? callback(err) : reject(err)
        }

        return callback ? callback(null, request.response) : resolve(request.response)
      }

      const errorHandler = err => {
        request.error = err
        return runErrorMiddlewares(errorMiddlewares, request, terminate)
      }

      runMiddlewares(beforeMiddlewares, request, (err) => {
        if (err) return errorHandler(err)

        const onHandlerError = once((err) => {
          request.response = null
          errorHandler(err)
        })

        const onHandlerSuccess = once((response) => {
          request.response = response
          runMiddlewares(afterMiddlewares, request, (err) => {
            if (err) return errorHandler(err)

            terminate()
          })
        })

        const handlerReturnValue = handler.call(request, request.event, request.context, (err, response) => {
          if (err) return onHandlerError(err)
          onHandlerSuccess(response)
        })

        // support for async/await promise return in handler
        if (handlerReturnValue) {
          if (!isPromise(handlerReturnValue)) {
            throw new Error('Unexpected return value in handler')
          }

          handlerReturnValue
            .then(onHandlerSuccess)
            .catch(onHandlerError)
        }
      })
    })
    if (!request.callback) return middyPromise
  }

  instance.use = (middlewares) => {
    if (Array.isArray(middlewares)) {
      middlewares.forEach(middleware => instance.applyMiddleware(middleware))
      return instance
    } else if (typeof middlewares === 'object') {
      return instance.applyMiddleware(middlewares)
    } else {
      throw new Error('Middy.use() accepts an object or an array of objects')
    }
  }

  instance.applyMiddleware = (middleware) => {
    if (typeof middleware !== 'object') {
      throw new Error('Middleware must be an object')
    }

    const { before, after, onError } = middleware

    if (!before && !after && !onError) {
      throw new Error('Middleware must contain at least one key among "before", "after", "onError"')
    }

    if (before) {
      instance.before(before)
    }

    if (after) {
      instance.after(after)
    }

    if (onError) {
      instance.onError(onError)
    }

    return instance
  }

  instance.before = (beforeMiddleware) => {
    beforeMiddlewares.push(beforeMiddleware)

    return instance
  }

  instance.after = (afterMiddleware) => {
    afterMiddlewares.unshift(afterMiddleware)

    return instance
  }

  instance.onError = (errorMiddleware) => {
    errorMiddlewares.push(errorMiddleware)

    return instance
  }

  instance.__middlewares = {
    before: beforeMiddlewares,
    after: afterMiddlewares,
    onError: errorMiddlewares
  }

  return instance
}

module.exports = middy


/***/ }),

/***/ "../node_modules/@middy/core/isPromise.js":
/*!************************************************!*\
  !*** ../node_modules/@middy/core/isPromise.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = (val) => {
  return val &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
}


/***/ }),

/***/ "../node_modules/@middy/do-not-wait-for-empty-event-loop/index.js":
/*!************************************************************************!*\
  !*** ../node_modules/@middy/do-not-wait-for-empty-event-loop/index.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = (opts) => {
  const defaults = {
    runOnBefore: true,
    runOnAfter: false,
    runOnError: false
  }

  const options = Object.assign({}, defaults, opts)

  const disableEmptyEventLoopWait = (handler, next) => {
    handler.context.callbackWaitsForEmptyEventLoop = false
    next(handler.error)
  }

  return ({
    before: options.runOnBefore ? disableEmptyEventLoopWait : undefined,
    after: options.runOnAfter ? disableEmptyEventLoopWait : undefined,
    onError: options.runOnError ? disableEmptyEventLoopWait : undefined
  })
}


/***/ }),

/***/ "../node_modules/@middy/http-header-normalizer/index.js":
/*!**************************************************************!*\
  !*** ../node_modules/@middy/http-header-normalizer/index.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = (opts) => {
  const exceptionsList = [
    'ALPN',
    'C-PEP',
    'C-PEP-Info',
    'CalDAV-Timezones',
    'Content-ID',
    'Content-MD5',
    'DASL',
    'DAV',
    'DNT',
    'ETag',
    'GetProfile',
    'HTTP2-Settings',
    'Last-Event-ID',
    'MIME-Version',
    'Optional-WWW-Authenticate',
    'Sec-WebSocket-Accept',
    'Sec-WebSocket-Extensions',
    'Sec-WebSocket-Key',
    'Sec-WebSocket-Protocol',
    'Sec-WebSocket-Version',
    'SLUG',
    'TCN',
    'TE',
    'TTL',
    'WWW-Authenticate',
    'X-ATT-DeviceId',
    'X-DNSPrefetch-Control',
    'X-UIDH'
  ]

  const exceptions = exceptionsList.reduce((acc, curr) => {
    acc[curr.toLowerCase()] = curr
    return acc
  }, {})

  const normalizeHeaderKey = (key, canonical) => {
    if (exceptions[key.toLowerCase()]) {
      return exceptions[key.toLowerCase()]
    }

    if (!canonical) {
      return key.toLowerCase()
    }

    return key
      .split('-')
      .map(text =>
        text.charAt(0).toUpperCase() + text.substr(1).toLowerCase()
      )
      .join('-')
  }

  const defaults = {
    normalizeHeaderKey,
    canonical: false
  }

  const options = Object.assign({}, defaults, opts)

  return ({
    before: (handler, next) => {
      if (handler.event.headers) {
        const rawHeaders = {}
        const headers = {}

        Object.keys(handler.event.headers).forEach((key) => {
          rawHeaders[key] = handler.event.headers[key]
          headers[options.normalizeHeaderKey(key, options.canonical)] = handler.event.headers[key]
        })

        handler.event.headers = headers
        handler.event.rawHeaders = rawHeaders
      }

      if (handler.event.multiValueHeaders) {
        const rawHeaders = {}
        const headers = {}

        Object.keys(handler.event.multiValueHeaders).forEach((key) => {
          rawHeaders[key] = handler.event.multiValueHeaders[key]
          headers[options.normalizeHeaderKey(key, options.canonical)] = handler.event.multiValueHeaders[key]
        })

        handler.event.multiValueHeaders = headers
        handler.event.rawMultiValueHeaders = rawHeaders
      }

      next()
    }
  })
}


/***/ }),

/***/ "../node_modules/debug/node_modules/ms/index.js":
/*!******************************************************!*\
  !*** ../node_modules/debug/node_modules/ms/index.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isFinite(val)) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'weeks':
    case 'week':
    case 'w':
      return n * w;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (msAbs >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (msAbs >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (msAbs >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return plural(ms, msAbs, d, 'day');
  }
  if (msAbs >= h) {
    return plural(ms, msAbs, h, 'hour');
  }
  if (msAbs >= m) {
    return plural(ms, msAbs, m, 'minute');
  }
  if (msAbs >= s) {
    return plural(ms, msAbs, s, 'second');
  }
  return ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, msAbs, n, name) {
  var isPlural = msAbs >= n * 1.5;
  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
}


/***/ }),

/***/ "../node_modules/debug/src/browser.js":
/*!********************************************!*\
  !*** ../node_modules/debug/src/browser.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-env browser */

/**
 * This is the web browser implementation of `debug()`.
 */

exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = localstorage();

/**
 * Colors.
 */

exports.colors = [
	'#0000CC',
	'#0000FF',
	'#0033CC',
	'#0033FF',
	'#0066CC',
	'#0066FF',
	'#0099CC',
	'#0099FF',
	'#00CC00',
	'#00CC33',
	'#00CC66',
	'#00CC99',
	'#00CCCC',
	'#00CCFF',
	'#3300CC',
	'#3300FF',
	'#3333CC',
	'#3333FF',
	'#3366CC',
	'#3366FF',
	'#3399CC',
	'#3399FF',
	'#33CC00',
	'#33CC33',
	'#33CC66',
	'#33CC99',
	'#33CCCC',
	'#33CCFF',
	'#6600CC',
	'#6600FF',
	'#6633CC',
	'#6633FF',
	'#66CC00',
	'#66CC33',
	'#9900CC',
	'#9900FF',
	'#9933CC',
	'#9933FF',
	'#99CC00',
	'#99CC33',
	'#CC0000',
	'#CC0033',
	'#CC0066',
	'#CC0099',
	'#CC00CC',
	'#CC00FF',
	'#CC3300',
	'#CC3333',
	'#CC3366',
	'#CC3399',
	'#CC33CC',
	'#CC33FF',
	'#CC6600',
	'#CC6633',
	'#CC9900',
	'#CC9933',
	'#CCCC00',
	'#CCCC33',
	'#FF0000',
	'#FF0033',
	'#FF0066',
	'#FF0099',
	'#FF00CC',
	'#FF00FF',
	'#FF3300',
	'#FF3333',
	'#FF3366',
	'#FF3399',
	'#FF33CC',
	'#FF33FF',
	'#FF6600',
	'#FF6633',
	'#FF9900',
	'#FF9933',
	'#FFCC00',
	'#FFCC33'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

// eslint-disable-next-line complexity
function useColors() {
	// NB: In an Electron preload script, document will be defined but not fully
	// initialized. Since we know we're in Chrome, we'll just detect this case
	// explicitly
	if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
		return true;
	}

	// Internet Explorer and Edge do not support colors.
	if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
		return false;
	}

	// Is webkit? http://stackoverflow.com/a/16459606/376773
	// document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
	return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
		// Is firebug? http://stackoverflow.com/a/398120/376773
		(typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
		// Is firefox >= v31?
		// https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
		// Double check webkit in userAgent just in case we are in a worker
		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
	args[0] = (this.useColors ? '%c' : '') +
		this.namespace +
		(this.useColors ? ' %c' : ' ') +
		args[0] +
		(this.useColors ? '%c ' : ' ') +
		'+' + module.exports.humanize(this.diff);

	if (!this.useColors) {
		return;
	}

	const c = 'color: ' + this.color;
	args.splice(1, 0, c, 'color: inherit');

	// The final "%c" is somewhat tricky, because there could be other
	// arguments passed either before or after the %c, so we need to
	// figure out the correct index to insert the CSS into
	let index = 0;
	let lastC = 0;
	args[0].replace(/%[a-zA-Z%]/g, match => {
		if (match === '%%') {
			return;
		}
		index++;
		if (match === '%c') {
			// We only are interested in the *last* %c
			// (the user may have provided their own)
			lastC = index;
		}
	});

	args.splice(lastC, 0, c);
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */
function log(...args) {
	// This hackery is required for IE8/9, where
	// the `console.log` function doesn't have 'apply'
	return typeof console === 'object' &&
		console.log &&
		console.log(...args);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */
function save(namespaces) {
	try {
		if (namespaces) {
			exports.storage.setItem('debug', namespaces);
		} else {
			exports.storage.removeItem('debug');
		}
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */
function load() {
	let r;
	try {
		r = exports.storage.getItem('debug');
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}

	// If debug isn't set in LS, and we're in Electron, try to load $DEBUG
	if (!r && typeof process !== 'undefined' && 'env' in process) {
		r = process.env.DEBUG;
	}

	return r;
}

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
	try {
		// TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
		// The Browser also has localStorage in the global context.
		return localStorage;
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}
}

module.exports = __webpack_require__(/*! ./common */ "../node_modules/debug/src/common.js")(exports);

const {formatters} = module.exports;

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

formatters.j = function (v) {
	try {
		return JSON.stringify(v);
	} catch (error) {
		return '[UnexpectedJSONParseError]: ' + error.message;
	}
};


/***/ }),

/***/ "../node_modules/debug/src/common.js":
/*!*******************************************!*\
  !*** ../node_modules/debug/src/common.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */

function setup(env) {
	createDebug.debug = createDebug;
	createDebug.default = createDebug;
	createDebug.coerce = coerce;
	createDebug.disable = disable;
	createDebug.enable = enable;
	createDebug.enabled = enabled;
	createDebug.humanize = __webpack_require__(/*! ms */ "../node_modules/debug/node_modules/ms/index.js");

	Object.keys(env).forEach(key => {
		createDebug[key] = env[key];
	});

	/**
	* Active `debug` instances.
	*/
	createDebug.instances = [];

	/**
	* The currently active debug mode names, and names to skip.
	*/

	createDebug.names = [];
	createDebug.skips = [];

	/**
	* Map of special "%n" handling functions, for the debug "format" argument.
	*
	* Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
	*/
	createDebug.formatters = {};

	/**
	* Selects a color for a debug namespace
	* @param {String} namespace The namespace string for the for the debug instance to be colored
	* @return {Number|String} An ANSI color code for the given namespace
	* @api private
	*/
	function selectColor(namespace) {
		let hash = 0;

		for (let i = 0; i < namespace.length; i++) {
			hash = ((hash << 5) - hash) + namespace.charCodeAt(i);
			hash |= 0; // Convert to 32bit integer
		}

		return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
	}
	createDebug.selectColor = selectColor;

	/**
	* Create a debugger with the given `namespace`.
	*
	* @param {String} namespace
	* @return {Function}
	* @api public
	*/
	function createDebug(namespace) {
		let prevTime;

		function debug(...args) {
			// Disabled?
			if (!debug.enabled) {
				return;
			}

			const self = debug;

			// Set `diff` timestamp
			const curr = Number(new Date());
			const ms = curr - (prevTime || curr);
			self.diff = ms;
			self.prev = prevTime;
			self.curr = curr;
			prevTime = curr;

			args[0] = createDebug.coerce(args[0]);

			if (typeof args[0] !== 'string') {
				// Anything else let's inspect with %O
				args.unshift('%O');
			}

			// Apply any `formatters` transformations
			let index = 0;
			args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
				// If we encounter an escaped % then don't increase the array index
				if (match === '%%') {
					return match;
				}
				index++;
				const formatter = createDebug.formatters[format];
				if (typeof formatter === 'function') {
					const val = args[index];
					match = formatter.call(self, val);

					// Now we need to remove `args[index]` since it's inlined in the `format`
					args.splice(index, 1);
					index--;
				}
				return match;
			});

			// Apply env-specific formatting (colors, etc.)
			createDebug.formatArgs.call(self, args);

			const logFn = self.log || createDebug.log;
			logFn.apply(self, args);
		}

		debug.namespace = namespace;
		debug.enabled = createDebug.enabled(namespace);
		debug.useColors = createDebug.useColors();
		debug.color = selectColor(namespace);
		debug.destroy = destroy;
		debug.extend = extend;
		// Debug.formatArgs = formatArgs;
		// debug.rawLog = rawLog;

		// env-specific initialization logic for debug instances
		if (typeof createDebug.init === 'function') {
			createDebug.init(debug);
		}

		createDebug.instances.push(debug);

		return debug;
	}

	function destroy() {
		const index = createDebug.instances.indexOf(this);
		if (index !== -1) {
			createDebug.instances.splice(index, 1);
			return true;
		}
		return false;
	}

	function extend(namespace, delimiter) {
		const newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
		newDebug.log = this.log;
		return newDebug;
	}

	/**
	* Enables a debug mode by namespaces. This can include modes
	* separated by a colon and wildcards.
	*
	* @param {String} namespaces
	* @api public
	*/
	function enable(namespaces) {
		createDebug.save(namespaces);

		createDebug.names = [];
		createDebug.skips = [];

		let i;
		const split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
		const len = split.length;

		for (i = 0; i < len; i++) {
			if (!split[i]) {
				// ignore empty strings
				continue;
			}

			namespaces = split[i].replace(/\*/g, '.*?');

			if (namespaces[0] === '-') {
				createDebug.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
			} else {
				createDebug.names.push(new RegExp('^' + namespaces + '$'));
			}
		}

		for (i = 0; i < createDebug.instances.length; i++) {
			const instance = createDebug.instances[i];
			instance.enabled = createDebug.enabled(instance.namespace);
		}
	}

	/**
	* Disable debug output.
	*
	* @return {String} namespaces
	* @api public
	*/
	function disable() {
		const namespaces = [
			...createDebug.names.map(toNamespace),
			...createDebug.skips.map(toNamespace).map(namespace => '-' + namespace)
		].join(',');
		createDebug.enable('');
		return namespaces;
	}

	/**
	* Returns true if the given mode name is enabled, false otherwise.
	*
	* @param {String} name
	* @return {Boolean}
	* @api public
	*/
	function enabled(name) {
		if (name[name.length - 1] === '*') {
			return true;
		}

		let i;
		let len;

		for (i = 0, len = createDebug.skips.length; i < len; i++) {
			if (createDebug.skips[i].test(name)) {
				return false;
			}
		}

		for (i = 0, len = createDebug.names.length; i < len; i++) {
			if (createDebug.names[i].test(name)) {
				return true;
			}
		}

		return false;
	}

	/**
	* Convert regexp to namespace
	*
	* @param {RegExp} regxep
	* @return {String} namespace
	* @api private
	*/
	function toNamespace(regexp) {
		return regexp.toString()
			.substring(2, regexp.toString().length - 2)
			.replace(/\.\*\?$/, '*');
	}

	/**
	* Coerce `val`.
	*
	* @param {Mixed} val
	* @return {Mixed}
	* @api private
	*/
	function coerce(val) {
		if (val instanceof Error) {
			return val.stack || val.message;
		}
		return val;
	}

	createDebug.enable(createDebug.load());

	return createDebug;
}

module.exports = setup;


/***/ }),

/***/ "../node_modules/debug/src/index.js":
/*!******************************************!*\
  !*** ../node_modules/debug/src/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Detect Electron renderer / nwjs process, which is node, but we should
 * treat as a browser.
 */

if (typeof process === 'undefined' || process.type === 'renderer' || process.browser === true || process.__nwjs) {
	module.exports = __webpack_require__(/*! ./browser.js */ "../node_modules/debug/src/browser.js");
} else {
	module.exports = __webpack_require__(/*! ./node.js */ "../node_modules/debug/src/node.js");
}


/***/ }),

/***/ "../node_modules/debug/src/node.js":
/*!*****************************************!*\
  !*** ../node_modules/debug/src/node.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */

const tty = __webpack_require__(/*! tty */ "tty");
const util = __webpack_require__(/*! util */ "util");

/**
 * This is the Node.js implementation of `debug()`.
 */

exports.init = init;
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;

/**
 * Colors.
 */

exports.colors = [6, 2, 3, 4, 5, 1];

try {
	// Optional dependency (as in, doesn't need to be installed, NOT like optionalDependencies in package.json)
	// eslint-disable-next-line import/no-extraneous-dependencies
	const supportsColor = __webpack_require__(/*! supports-color */ "../node_modules/supports-color/index.js");

	if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
		exports.colors = [
			20,
			21,
			26,
			27,
			32,
			33,
			38,
			39,
			40,
			41,
			42,
			43,
			44,
			45,
			56,
			57,
			62,
			63,
			68,
			69,
			74,
			75,
			76,
			77,
			78,
			79,
			80,
			81,
			92,
			93,
			98,
			99,
			112,
			113,
			128,
			129,
			134,
			135,
			148,
			149,
			160,
			161,
			162,
			163,
			164,
			165,
			166,
			167,
			168,
			169,
			170,
			171,
			172,
			173,
			178,
			179,
			184,
			185,
			196,
			197,
			198,
			199,
			200,
			201,
			202,
			203,
			204,
			205,
			206,
			207,
			208,
			209,
			214,
			215,
			220,
			221
		];
	}
} catch (error) {
	// Swallow - we only care if `supports-color` is available; it doesn't have to be.
}

/**
 * Build up the default `inspectOpts` object from the environment variables.
 *
 *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
 */

exports.inspectOpts = Object.keys(process.env).filter(key => {
	return /^debug_/i.test(key);
}).reduce((obj, key) => {
	// Camel-case
	const prop = key
		.substring(6)
		.toLowerCase()
		.replace(/_([a-z])/g, (_, k) => {
			return k.toUpperCase();
		});

	// Coerce string value into JS value
	let val = process.env[key];
	if (/^(yes|on|true|enabled)$/i.test(val)) {
		val = true;
	} else if (/^(no|off|false|disabled)$/i.test(val)) {
		val = false;
	} else if (val === 'null') {
		val = null;
	} else {
		val = Number(val);
	}

	obj[prop] = val;
	return obj;
}, {});

/**
 * Is stdout a TTY? Colored output is enabled when `true`.
 */

function useColors() {
	return 'colors' in exports.inspectOpts ?
		Boolean(exports.inspectOpts.colors) :
		tty.isatty(process.stderr.fd);
}

/**
 * Adds ANSI color escape codes if enabled.
 *
 * @api public
 */

function formatArgs(args) {
	const {namespace: name, useColors} = this;

	if (useColors) {
		const c = this.color;
		const colorCode = '\u001B[3' + (c < 8 ? c : '8;5;' + c);
		const prefix = `  ${colorCode};1m${name} \u001B[0m`;

		args[0] = prefix + args[0].split('\n').join('\n' + prefix);
		args.push(colorCode + 'm+' + module.exports.humanize(this.diff) + '\u001B[0m');
	} else {
		args[0] = getDate() + name + ' ' + args[0];
	}
}

function getDate() {
	if (exports.inspectOpts.hideDate) {
		return '';
	}
	return new Date().toISOString() + ' ';
}

/**
 * Invokes `util.format()` with the specified arguments and writes to stderr.
 */

function log(...args) {
	return process.stderr.write(util.format(...args) + '\n');
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */
function save(namespaces) {
	if (namespaces) {
		process.env.DEBUG = namespaces;
	} else {
		// If you set a process.env field to null or undefined, it gets cast to the
		// string 'null' or 'undefined'. Just delete instead.
		delete process.env.DEBUG;
	}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
	return process.env.DEBUG;
}

/**
 * Init logic for `debug` instances.
 *
 * Create a new `inspectOpts` object in case `useColors` is set
 * differently for a particular `debug` instance.
 */

function init(debug) {
	debug.inspectOpts = {};

	const keys = Object.keys(exports.inspectOpts);
	for (let i = 0; i < keys.length; i++) {
		debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
	}
}

module.exports = __webpack_require__(/*! ./common */ "../node_modules/debug/src/common.js")(exports);

const {formatters} = module.exports;

/**
 * Map %o to `util.inspect()`, all on a single line.
 */

formatters.o = function (v) {
	this.inspectOpts.colors = this.useColors;
	return util.inspect(v, this.inspectOpts)
		.replace(/\s*\n\s*/g, ' ');
};

/**
 * Map %O to `util.inspect()`, allowing multiple lines if needed.
 */

formatters.O = function (v) {
	this.inspectOpts.colors = this.useColors;
	return util.inspect(v, this.inspectOpts);
};


/***/ }),

/***/ "../node_modules/fast-safe-stringify/index.js":
/*!****************************************************!*\
  !*** ../node_modules/fast-safe-stringify/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = stringify
stringify.default = stringify
stringify.stable = deterministicStringify
stringify.stableStringify = deterministicStringify

var arr = []
var replacerStack = []

// Regular stringify
function stringify (obj, replacer, spacer) {
  decirc(obj, '', [], undefined)
  var res
  if (replacerStack.length === 0) {
    res = JSON.stringify(obj, replacer, spacer)
  } else {
    res = JSON.stringify(obj, replaceGetterValues(replacer), spacer)
  }
  while (arr.length !== 0) {
    var part = arr.pop()
    if (part.length === 4) {
      Object.defineProperty(part[0], part[1], part[3])
    } else {
      part[0][part[1]] = part[2]
    }
  }
  return res
}
function decirc (val, k, stack, parent) {
  var i
  if (typeof val === 'object' && val !== null) {
    for (i = 0; i < stack.length; i++) {
      if (stack[i] === val) {
        var propertyDescriptor = Object.getOwnPropertyDescriptor(parent, k)
        if (propertyDescriptor.get !== undefined) {
          if (propertyDescriptor.configurable) {
            Object.defineProperty(parent, k, { value: '[Circular]' })
            arr.push([parent, k, val, propertyDescriptor])
          } else {
            replacerStack.push([val, k])
          }
        } else {
          parent[k] = '[Circular]'
          arr.push([parent, k, val])
        }
        return
      }
    }
    stack.push(val)
    // Optimize for Arrays. Big arrays could kill the performance otherwise!
    if (Array.isArray(val)) {
      for (i = 0; i < val.length; i++) {
        decirc(val[i], i, stack, val)
      }
    } else {
      var keys = Object.keys(val)
      for (i = 0; i < keys.length; i++) {
        var key = keys[i]
        decirc(val[key], key, stack, val)
      }
    }
    stack.pop()
  }
}

// Stable-stringify
function compareFunction (a, b) {
  if (a < b) {
    return -1
  }
  if (a > b) {
    return 1
  }
  return 0
}

function deterministicStringify (obj, replacer, spacer) {
  var tmp = deterministicDecirc(obj, '', [], undefined) || obj
  var res
  if (replacerStack.length === 0) {
    res = JSON.stringify(tmp, replacer, spacer)
  } else {
    res = JSON.stringify(tmp, replaceGetterValues(replacer), spacer)
  }
  while (arr.length !== 0) {
    var part = arr.pop()
    if (part.length === 4) {
      Object.defineProperty(part[0], part[1], part[3])
    } else {
      part[0][part[1]] = part[2]
    }
  }
  return res
}

function deterministicDecirc (val, k, stack, parent) {
  var i
  if (typeof val === 'object' && val !== null) {
    for (i = 0; i < stack.length; i++) {
      if (stack[i] === val) {
        var propertyDescriptor = Object.getOwnPropertyDescriptor(parent, k)
        if (propertyDescriptor.get !== undefined) {
          if (propertyDescriptor.configurable) {
            Object.defineProperty(parent, k, { value: '[Circular]' })
            arr.push([parent, k, val, propertyDescriptor])
          } else {
            replacerStack.push([val, k])
          }
        } else {
          parent[k] = '[Circular]'
          arr.push([parent, k, val])
        }
        return
      }
    }
    if (typeof val.toJSON === 'function') {
      return
    }
    stack.push(val)
    // Optimize for Arrays. Big arrays could kill the performance otherwise!
    if (Array.isArray(val)) {
      for (i = 0; i < val.length; i++) {
        deterministicDecirc(val[i], i, stack, val)
      }
    } else {
      // Create a temporary object in the required way
      var tmp = {}
      var keys = Object.keys(val).sort(compareFunction)
      for (i = 0; i < keys.length; i++) {
        var key = keys[i]
        deterministicDecirc(val[key], key, stack, val)
        tmp[key] = val[key]
      }
      if (parent !== undefined) {
        arr.push([parent, k, val])
        parent[k] = tmp
      } else {
        return tmp
      }
    }
    stack.pop()
  }
}

// wraps replacer function to handle values we couldn't replace
// and mark them as [Circular]
function replaceGetterValues (replacer) {
  replacer = replacer !== undefined ? replacer : function (k, v) { return v }
  return function (key, val) {
    if (replacerStack.length > 0) {
      for (var i = 0; i < replacerStack.length; i++) {
        var part = replacerStack[i]
        if (part[1] === key && part[0] === val) {
          val = '[Circular]'
          replacerStack.splice(i, 1)
          break
        }
      }
    }
    return replacer.call(this, key, val)
  }
}


/***/ }),

/***/ "../node_modules/follow-redirects/debug.js":
/*!*************************************************!*\
  !*** ../node_modules/follow-redirects/debug.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var debug;
try {
  /* eslint global-require: off */
  debug = __webpack_require__(/*! debug */ "../node_modules/debug/src/index.js")("follow-redirects");
}
catch (error) {
  debug = function () { /* */ };
}
module.exports = debug;


/***/ }),

/***/ "../node_modules/follow-redirects/index.js":
/*!*************************************************!*\
  !*** ../node_modules/follow-redirects/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var url = __webpack_require__(/*! url */ "url");
var URL = url.URL;
var http = __webpack_require__(/*! http */ "http");
var https = __webpack_require__(/*! https */ "https");
var Writable = __webpack_require__(/*! stream */ "stream").Writable;
var assert = __webpack_require__(/*! assert */ "assert");
var debug = __webpack_require__(/*! ./debug */ "../node_modules/follow-redirects/debug.js");

// Create handlers that pass events from native requests
var eventHandlers = Object.create(null);
["abort", "aborted", "connect", "error", "socket", "timeout"].forEach(function (event) {
  eventHandlers[event] = function (arg1, arg2, arg3) {
    this._redirectable.emit(event, arg1, arg2, arg3);
  };
});

// Error types with codes
var RedirectionError = createErrorType(
  "ERR_FR_REDIRECTION_FAILURE",
  ""
);
var TooManyRedirectsError = createErrorType(
  "ERR_FR_TOO_MANY_REDIRECTS",
  "Maximum number of redirects exceeded"
);
var MaxBodyLengthExceededError = createErrorType(
  "ERR_FR_MAX_BODY_LENGTH_EXCEEDED",
  "Request body larger than maxBodyLength limit"
);
var WriteAfterEndError = createErrorType(
  "ERR_STREAM_WRITE_AFTER_END",
  "write after end"
);

// An HTTP(S) request that can be redirected
function RedirectableRequest(options, responseCallback) {
  // Initialize the request
  Writable.call(this);
  this._sanitizeOptions(options);
  this._options = options;
  this._ended = false;
  this._ending = false;
  this._redirectCount = 0;
  this._redirects = [];
  this._requestBodyLength = 0;
  this._requestBodyBuffers = [];

  // Attach a callback if passed
  if (responseCallback) {
    this.on("response", responseCallback);
  }

  // React to responses of native requests
  var self = this;
  this._onNativeResponse = function (response) {
    self._processResponse(response);
  };

  // Perform the first request
  this._performRequest();
}
RedirectableRequest.prototype = Object.create(Writable.prototype);

// Writes buffered data to the current native request
RedirectableRequest.prototype.write = function (data, encoding, callback) {
  // Writing is not allowed if end has been called
  if (this._ending) {
    throw new WriteAfterEndError();
  }

  // Validate input and shift parameters if necessary
  if (!(typeof data === "string" || typeof data === "object" && ("length" in data))) {
    throw new TypeError("data should be a string, Buffer or Uint8Array");
  }
  if (typeof encoding === "function") {
    callback = encoding;
    encoding = null;
  }

  // Ignore empty buffers, since writing them doesn't invoke the callback
  // https://github.com/nodejs/node/issues/22066
  if (data.length === 0) {
    if (callback) {
      callback();
    }
    return;
  }
  // Only write when we don't exceed the maximum body length
  if (this._requestBodyLength + data.length <= this._options.maxBodyLength) {
    this._requestBodyLength += data.length;
    this._requestBodyBuffers.push({ data: data, encoding: encoding });
    this._currentRequest.write(data, encoding, callback);
  }
  // Error when we exceed the maximum body length
  else {
    this.emit("error", new MaxBodyLengthExceededError());
    this.abort();
  }
};

// Ends the current native request
RedirectableRequest.prototype.end = function (data, encoding, callback) {
  // Shift parameters if necessary
  if (typeof data === "function") {
    callback = data;
    data = encoding = null;
  }
  else if (typeof encoding === "function") {
    callback = encoding;
    encoding = null;
  }

  // Write data if needed and end
  if (!data) {
    this._ended = this._ending = true;
    this._currentRequest.end(null, null, callback);
  }
  else {
    var self = this;
    var currentRequest = this._currentRequest;
    this.write(data, encoding, function () {
      self._ended = true;
      currentRequest.end(null, null, callback);
    });
    this._ending = true;
  }
};

// Sets a header value on the current native request
RedirectableRequest.prototype.setHeader = function (name, value) {
  this._options.headers[name] = value;
  this._currentRequest.setHeader(name, value);
};

// Clears a header value on the current native request
RedirectableRequest.prototype.removeHeader = function (name) {
  delete this._options.headers[name];
  this._currentRequest.removeHeader(name);
};

// Global timeout for all underlying requests
RedirectableRequest.prototype.setTimeout = function (msecs, callback) {
  if (callback) {
    this.once("timeout", callback);
  }

  if (this.socket) {
    startTimer(this, msecs);
  }
  else {
    var self = this;
    this._currentRequest.once("socket", function () {
      startTimer(self, msecs);
    });
  }

  this.once("response", clearTimer);
  this.once("error", clearTimer);

  return this;
};

function startTimer(request, msecs) {
  clearTimeout(request._timeout);
  request._timeout = setTimeout(function () {
    request.emit("timeout");
  }, msecs);
}

function clearTimer() {
  clearTimeout(this._timeout);
}

// Proxy all other public ClientRequest methods
[
  "abort", "flushHeaders", "getHeader",
  "setNoDelay", "setSocketKeepAlive",
].forEach(function (method) {
  RedirectableRequest.prototype[method] = function (a, b) {
    return this._currentRequest[method](a, b);
  };
});

// Proxy all public ClientRequest properties
["aborted", "connection", "socket"].forEach(function (property) {
  Object.defineProperty(RedirectableRequest.prototype, property, {
    get: function () { return this._currentRequest[property]; },
  });
});

RedirectableRequest.prototype._sanitizeOptions = function (options) {
  // Ensure headers are always present
  if (!options.headers) {
    options.headers = {};
  }

  // Since http.request treats host as an alias of hostname,
  // but the url module interprets host as hostname plus port,
  // eliminate the host property to avoid confusion.
  if (options.host) {
    // Use hostname if set, because it has precedence
    if (!options.hostname) {
      options.hostname = options.host;
    }
    delete options.host;
  }

  // Complete the URL object when necessary
  if (!options.pathname && options.path) {
    var searchPos = options.path.indexOf("?");
    if (searchPos < 0) {
      options.pathname = options.path;
    }
    else {
      options.pathname = options.path.substring(0, searchPos);
      options.search = options.path.substring(searchPos);
    }
  }
};


// Executes the next native request (initial or redirect)
RedirectableRequest.prototype._performRequest = function () {
  // Load the native protocol
  var protocol = this._options.protocol;
  var nativeProtocol = this._options.nativeProtocols[protocol];
  if (!nativeProtocol) {
    this.emit("error", new TypeError("Unsupported protocol " + protocol));
    return;
  }

  // If specified, use the agent corresponding to the protocol
  // (HTTP and HTTPS use different types of agents)
  if (this._options.agents) {
    var scheme = protocol.substr(0, protocol.length - 1);
    this._options.agent = this._options.agents[scheme];
  }

  // Create the native request
  var request = this._currentRequest =
        nativeProtocol.request(this._options, this._onNativeResponse);
  this._currentUrl = url.format(this._options);

  // Set up event handlers
  request._redirectable = this;
  for (var event in eventHandlers) {
    /* istanbul ignore else */
    if (event) {
      request.on(event, eventHandlers[event]);
    }
  }

  // End a redirected request
  // (The first request must be ended explicitly with RedirectableRequest#end)
  if (this._isRedirect) {
    // Write the request entity and end.
    var i = 0;
    var self = this;
    var buffers = this._requestBodyBuffers;
    (function writeNext(error) {
      // Only write if this request has not been redirected yet
      /* istanbul ignore else */
      if (request === self._currentRequest) {
        // Report any write errors
        /* istanbul ignore if */
        if (error) {
          self.emit("error", error);
        }
        // Write the next buffer if there are still left
        else if (i < buffers.length) {
          var buffer = buffers[i++];
          /* istanbul ignore else */
          if (!request.finished) {
            request.write(buffer.data, buffer.encoding, writeNext);
          }
        }
        // End the request if `end` has been called on us
        else if (self._ended) {
          request.end();
        }
      }
    }());
  }
};

// Processes a response from the current native request
RedirectableRequest.prototype._processResponse = function (response) {
  // Store the redirected response
  var statusCode = response.statusCode;
  if (this._options.trackRedirects) {
    this._redirects.push({
      url: this._currentUrl,
      headers: response.headers,
      statusCode: statusCode,
    });
  }

  // RFC7231§6.4: The 3xx (Redirection) class of status code indicates
  // that further action needs to be taken by the user agent in order to
  // fulfill the request. If a Location header field is provided,
  // the user agent MAY automatically redirect its request to the URI
  // referenced by the Location field value,
  // even if the specific status code is not understood.
  var location = response.headers.location;
  if (location && this._options.followRedirects !== false &&
      statusCode >= 300 && statusCode < 400) {
    // Abort the current request
    this._currentRequest.removeAllListeners();
    this._currentRequest.on("error", noop);
    this._currentRequest.abort();
    // Discard the remainder of the response to avoid waiting for data
    response.destroy();

    // RFC7231§6.4: A client SHOULD detect and intervene
    // in cyclical redirections (i.e., "infinite" redirection loops).
    if (++this._redirectCount > this._options.maxRedirects) {
      this.emit("error", new TooManyRedirectsError());
      return;
    }

    // RFC7231§6.4: Automatic redirection needs to done with
    // care for methods not known to be safe, […]
    // RFC7231§6.4.2–3: For historical reasons, a user agent MAY change
    // the request method from POST to GET for the subsequent request.
    if ((statusCode === 301 || statusCode === 302) && this._options.method === "POST" ||
        // RFC7231§6.4.4: The 303 (See Other) status code indicates that
        // the server is redirecting the user agent to a different resource […]
        // A user agent can perform a retrieval request targeting that URI
        // (a GET or HEAD request if using HTTP) […]
        (statusCode === 303) && !/^(?:GET|HEAD)$/.test(this._options.method)) {
      this._options.method = "GET";
      // Drop a possible entity and headers related to it
      this._requestBodyBuffers = [];
      removeMatchingHeaders(/^content-/i, this._options.headers);
    }

    // Drop the Host header, as the redirect might lead to a different host
    var previousHostName = removeMatchingHeaders(/^host$/i, this._options.headers) ||
      url.parse(this._currentUrl).hostname;

    // Create the redirected request
    var redirectUrl = url.resolve(this._currentUrl, location);
    debug("redirecting to", redirectUrl);
    this._isRedirect = true;
    var redirectUrlParts = url.parse(redirectUrl);
    Object.assign(this._options, redirectUrlParts);

    // Drop the Authorization header if redirecting to another host
    if (redirectUrlParts.hostname !== previousHostName) {
      removeMatchingHeaders(/^authorization$/i, this._options.headers);
    }

    // Evaluate the beforeRedirect callback
    if (typeof this._options.beforeRedirect === "function") {
      var responseDetails = { headers: response.headers };
      try {
        this._options.beforeRedirect.call(null, this._options, responseDetails);
      }
      catch (err) {
        this.emit("error", err);
        return;
      }
      this._sanitizeOptions(this._options);
    }

    // Perform the redirected request
    try {
      this._performRequest();
    }
    catch (cause) {
      var error = new RedirectionError("Redirected request failed: " + cause.message);
      error.cause = cause;
      this.emit("error", error);
    }
  }
  else {
    // The response is not a redirect; return it as-is
    response.responseUrl = this._currentUrl;
    response.redirects = this._redirects;
    this.emit("response", response);

    // Clean up
    this._requestBodyBuffers = [];
  }
};

// Wraps the key/value object of protocols with redirect functionality
function wrap(protocols) {
  // Default settings
  var exports = {
    maxRedirects: 21,
    maxBodyLength: 10 * 1024 * 1024,
  };

  // Wrap each protocol
  var nativeProtocols = {};
  Object.keys(protocols).forEach(function (scheme) {
    var protocol = scheme + ":";
    var nativeProtocol = nativeProtocols[protocol] = protocols[scheme];
    var wrappedProtocol = exports[scheme] = Object.create(nativeProtocol);

    // Executes a request, following redirects
    wrappedProtocol.request = function (input, options, callback) {
      // Parse parameters
      if (typeof input === "string") {
        var urlStr = input;
        try {
          input = urlToOptions(new URL(urlStr));
        }
        catch (err) {
          /* istanbul ignore next */
          input = url.parse(urlStr);
        }
      }
      else if (URL && (input instanceof URL)) {
        input = urlToOptions(input);
      }
      else {
        callback = options;
        options = input;
        input = { protocol: protocol };
      }
      if (typeof options === "function") {
        callback = options;
        options = null;
      }

      // Set defaults
      options = Object.assign({
        maxRedirects: exports.maxRedirects,
        maxBodyLength: exports.maxBodyLength,
      }, input, options);
      options.nativeProtocols = nativeProtocols;

      assert.equal(options.protocol, protocol, "protocol mismatch");
      debug("options", options);
      return new RedirectableRequest(options, callback);
    };

    // Executes a GET request, following redirects
    wrappedProtocol.get = function (input, options, callback) {
      var request = wrappedProtocol.request(input, options, callback);
      request.end();
      return request;
    };
  });
  return exports;
}

/* istanbul ignore next */
function noop() { /* empty */ }

// from https://github.com/nodejs/node/blob/master/lib/internal/url.js
function urlToOptions(urlObject) {
  var options = {
    protocol: urlObject.protocol,
    hostname: urlObject.hostname.startsWith("[") ?
      /* istanbul ignore next */
      urlObject.hostname.slice(1, -1) :
      urlObject.hostname,
    hash: urlObject.hash,
    search: urlObject.search,
    pathname: urlObject.pathname,
    path: urlObject.pathname + urlObject.search,
    href: urlObject.href,
  };
  if (urlObject.port !== "") {
    options.port = Number(urlObject.port);
  }
  return options;
}

function removeMatchingHeaders(regex, headers) {
  var lastValue;
  for (var header in headers) {
    if (regex.test(header)) {
      lastValue = headers[header];
      delete headers[header];
    }
  }
  return lastValue;
}

function createErrorType(code, defaultMessage) {
  function CustomError(message) {
    Error.captureStackTrace(this, this.constructor);
    this.message = message || defaultMessage;
  }
  CustomError.prototype = new Error();
  CustomError.prototype.constructor = CustomError;
  CustomError.prototype.name = "Error [" + code + "]";
  CustomError.prototype.code = code;
  return CustomError;
}

// Exports
module.exports = wrap({ http: http, https: https });
module.exports.wrap = wrap;


/***/ }),

/***/ "../node_modules/has-flag/index.js":
/*!*****************************************!*\
  !*** ../node_modules/has-flag/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = (flag, argv) => {
	argv = argv || process.argv;
	const prefix = flag.startsWith('-') ? '' : (flag.length === 1 ? '-' : '--');
	const pos = argv.indexOf(prefix + flag);
	const terminatorPos = argv.indexOf('--');
	return pos !== -1 && (terminatorPos === -1 ? true : pos < terminatorPos);
};


/***/ }),

/***/ "../node_modules/http-method-enum/dist-web/index.js":
/*!**********************************************************!*\
  !*** ../node_modules/http-method-enum/dist-web/index.js ***!
  \**********************************************************/
/*! exports provided: default, HTTPMethod */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HTTPMethod", function() { return HTTPMethod; });
/**
 * @license
 * Copyright (c) 2018-present, Loomble Inc <opensource@loomble.com>
 * Copyright (c) 2018-preset, Jay Rylan <jay@jayrylan.com>
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Included documentation is from "[HTTP request methods][MDN]" by
 * [Mozilla Contributors][Contributors] and licensed under
 * [CC-BY-SA 4.0][CC-BY-SA].
 *
 * [MDN]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods
 * [Contributors]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods$history
 * [CC-BY-SA]: https://creativecommons.org/licenses/by-sa/4.0/legalcode
 */

let HTTPMethod;

(function (HTTPMethod) {
  HTTPMethod["CONNECT"] = "CONNECT";
  HTTPMethod["DELETE"] = "DELETE";
  HTTPMethod["GET"] = "GET";
  HTTPMethod["HEAD"] = "HEAD";
  HTTPMethod["OPTIONS"] = "OPTIONS";
  HTTPMethod["PATCH"] = "PATCH";
  HTTPMethod["POST"] = "POST";
  HTTPMethod["PUT"] = "PUT";
  HTTPMethod["TRACE"] = "TRACE";
})(HTTPMethod || (HTTPMethod = {}));

var HTTPMethod$1 = HTTPMethod;

/* harmony default export */ __webpack_exports__["default"] = (HTTPMethod$1);



/***/ }),

/***/ "../node_modules/http-status-codes/build/es/codes.js":
/*!***********************************************************!*\
  !*** ../node_modules/http-status-codes/build/es/codes.js ***!
  \***********************************************************/
/*! exports provided: StatusCodes, ReasonPhrases, statusCodeToReasonPhrase, reasonPhraseToStatusCode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StatusCodes", function() { return StatusCodes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReasonPhrases", function() { return ReasonPhrases; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "statusCodeToReasonPhrase", function() { return statusCodeToReasonPhrase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reasonPhraseToStatusCode", function() { return reasonPhraseToStatusCode; });
// Generated file. Do not edit
var StatusCodes;
(function (StatusCodes) {
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.3.3
     *
     * The request has been received but not yet acted upon. It is non-committal, meaning that there is no way in HTTP to later send an asynchronous response indicating the outcome of processing the request. It is intended for cases where another process or server handles the request, or for batch processing.
     */
    StatusCodes[StatusCodes["ACCEPTED"] = 202] = "ACCEPTED";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.6.3
     *
     * This error response means that the server, while working as a gateway to get a response needed to handle the request, got an invalid response.
     */
    StatusCodes[StatusCodes["BAD_GATEWAY"] = 502] = "BAD_GATEWAY";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.1
     *
     * This response means that server could not understand the request due to invalid syntax.
     */
    StatusCodes[StatusCodes["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.8
     *
     * This response is sent when a request conflicts with the current state of the server.
     */
    StatusCodes[StatusCodes["CONFLICT"] = 409] = "CONFLICT";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.2.1
     *
     * This interim response indicates that everything so far is OK and that the client should continue with the request or ignore it if it is already finished.
     */
    StatusCodes[StatusCodes["CONTINUE"] = 100] = "CONTINUE";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.3.2
     *
     * The request has succeeded and a new resource has been created as a result of it. This is typically the response sent after a PUT request.
     */
    StatusCodes[StatusCodes["CREATED"] = 201] = "CREATED";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.14
     *
     * This response code means the expectation indicated by the Expect request header field can't be met by the server.
     */
    StatusCodes[StatusCodes["EXPECTATION_FAILED"] = 417] = "EXPECTATION_FAILED";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc2518#section-10.5
     *
     * The request failed due to failure of a previous request.
     */
    StatusCodes[StatusCodes["FAILED_DEPENDENCY"] = 424] = "FAILED_DEPENDENCY";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.3
     *
     * The client does not have access rights to the content, i.e. they are unauthorized, so server is rejecting to give proper response. Unlike 401, the client's identity is known to the server.
     */
    StatusCodes[StatusCodes["FORBIDDEN"] = 403] = "FORBIDDEN";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.6.5
     *
     * This error response is given when the server is acting as a gateway and cannot get a response in time.
     */
    StatusCodes[StatusCodes["GATEWAY_TIMEOUT"] = 504] = "GATEWAY_TIMEOUT";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.9
     *
     * This response would be sent when the requested content has been permenantly deleted from server, with no forwarding address. Clients are expected to remove their caches and links to the resource. The HTTP specification intends this status code to be used for "limited-time, promotional services". APIs should not feel compelled to indicate resources that have been deleted with this status code.
     */
    StatusCodes[StatusCodes["GONE"] = 410] = "GONE";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.6.6
     *
     * The HTTP version used in the request is not supported by the server.
     */
    StatusCodes[StatusCodes["HTTP_VERSION_NOT_SUPPORTED"] = 505] = "HTTP_VERSION_NOT_SUPPORTED";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc2324#section-2.3.2
     *
     * Any attempt to brew coffee with a teapot should result in the error code "418 I'm a teapot". The resulting entity body MAY be short and stout.
     */
    StatusCodes[StatusCodes["IM_A_TEAPOT"] = 418] = "IM_A_TEAPOT";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc2518#section-10.6
     *
     * The 507 (Insufficient Storage) status code means the method could not be performed on the resource because the server is unable to store the representation needed to successfully complete the request. This condition is considered to be temporary. If the request which received this status code was the result of a user action, the request MUST NOT be repeated until it is requested by a separate user action.
     */
    StatusCodes[StatusCodes["INSUFFICIENT_SPACE_ON_RESOURCE"] = 419] = "INSUFFICIENT_SPACE_ON_RESOURCE";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc2518#section-10.6
     *
     * The server has an internal configuration error: the chosen variant resource is configured to engage in transparent content negotiation itself, and is therefore not a proper end point in the negotiation process.
     */
    StatusCodes[StatusCodes["INSUFFICIENT_STORAGE"] = 507] = "INSUFFICIENT_STORAGE";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.6.1
     *
     * The server encountered an unexpected condition that prevented it from fulfilling the request.
     */
    StatusCodes[StatusCodes["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.10
     *
     * The server rejected the request because the Content-Length header field is not defined and the server requires it.
     */
    StatusCodes[StatusCodes["LENGTH_REQUIRED"] = 411] = "LENGTH_REQUIRED";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc2518#section-10.4
     *
     * The resource that is being accessed is locked.
     */
    StatusCodes[StatusCodes["LOCKED"] = 423] = "LOCKED";
    /**
     * @deprecated
     * Official Documentation @ https://tools.ietf.org/rfcdiff?difftype=--hwdiff&url2=draft-ietf-webdav-protocol-06.txt
     *
     * A deprecated response used by the Spring Framework when a method has failed.
     */
    StatusCodes[StatusCodes["METHOD_FAILURE"] = 420] = "METHOD_FAILURE";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.5
     *
     * The request method is known by the server but has been disabled and cannot be used. For example, an API may forbid DELETE-ing a resource. The two mandatory methods, GET and HEAD, must never be disabled and should not return this error code.
     */
    StatusCodes[StatusCodes["METHOD_NOT_ALLOWED"] = 405] = "METHOD_NOT_ALLOWED";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.4.2
     *
     * This response code means that URI of requested resource has been changed. Probably, new URI would be given in the response.
     */
    StatusCodes[StatusCodes["MOVED_PERMANENTLY"] = 301] = "MOVED_PERMANENTLY";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.4.3
     *
     * This response code means that URI of requested resource has been changed temporarily. New changes in the URI might be made in the future. Therefore, this same URI should be used by the client in future requests.
     */
    StatusCodes[StatusCodes["MOVED_TEMPORARILY"] = 302] = "MOVED_TEMPORARILY";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc2518#section-10.2
     *
     * A Multi-Status response conveys information about multiple resources in situations where multiple status codes might be appropriate.
     */
    StatusCodes[StatusCodes["MULTI_STATUS"] = 207] = "MULTI_STATUS";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.4.1
     *
     * The request has more than one possible responses. User-agent or user should choose one of them. There is no standardized way to choose one of the responses.
     */
    StatusCodes[StatusCodes["MULTIPLE_CHOICES"] = 300] = "MULTIPLE_CHOICES";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc6585#section-6
     *
     * The 511 status code indicates that the client needs to authenticate to gain network access.
     */
    StatusCodes[StatusCodes["NETWORK_AUTHENTICATION_REQUIRED"] = 511] = "NETWORK_AUTHENTICATION_REQUIRED";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.3.5
     *
     * There is no content to send for this request, but the headers may be useful. The user-agent may update its cached headers for this resource with the new ones.
     */
    StatusCodes[StatusCodes["NO_CONTENT"] = 204] = "NO_CONTENT";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.3.4
     *
     * This response code means returned meta-information set is not exact set as available from the origin server, but collected from a local or a third party copy. Except this condition, 200 OK response should be preferred instead of this response.
     */
    StatusCodes[StatusCodes["NON_AUTHORITATIVE_INFORMATION"] = 203] = "NON_AUTHORITATIVE_INFORMATION";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.6
     *
     * This response is sent when the web server, after performing server-driven content negotiation, doesn't find any content following the criteria given by the user agent.
     */
    StatusCodes[StatusCodes["NOT_ACCEPTABLE"] = 406] = "NOT_ACCEPTABLE";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.4
     *
     * The server can not find requested resource. In the browser, this means the URL is not recognized. In an API, this can also mean that the endpoint is valid but the resource itself does not exist. Servers may also send this response instead of 403 to hide the existence of a resource from an unauthorized client. This response code is probably the most famous one due to its frequent occurence on the web.
     */
    StatusCodes[StatusCodes["NOT_FOUND"] = 404] = "NOT_FOUND";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.6.2
     *
     * The request method is not supported by the server and cannot be handled. The only methods that servers are required to support (and therefore that must not return this code) are GET and HEAD.
     */
    StatusCodes[StatusCodes["NOT_IMPLEMENTED"] = 501] = "NOT_IMPLEMENTED";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7232#section-4.1
     *
     * This is used for caching purposes. It is telling to client that response has not been modified. So, client can continue to use same cached version of response.
     */
    StatusCodes[StatusCodes["NOT_MODIFIED"] = 304] = "NOT_MODIFIED";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.3.1
     *
     * The request has succeeded. The meaning of a success varies depending on the HTTP method:
     * GET: The resource has been fetched and is transmitted in the message body.
     * HEAD: The entity headers are in the message body.
     * POST: The resource describing the result of the action is transmitted in the message body.
     * TRACE: The message body contains the request message as received by the server
     */
    StatusCodes[StatusCodes["OK"] = 200] = "OK";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7233#section-4.1
     *
     * This response code is used because of range header sent by the client to separate download into multiple streams.
     */
    StatusCodes[StatusCodes["PARTIAL_CONTENT"] = 206] = "PARTIAL_CONTENT";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.2
     *
     * This response code is reserved for future use. Initial aim for creating this code was using it for digital payment systems however this is not used currently.
     */
    StatusCodes[StatusCodes["PAYMENT_REQUIRED"] = 402] = "PAYMENT_REQUIRED";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7538#section-3
     *
     * This means that the resource is now permanently located at another URI, specified by the Location: HTTP Response header. This has the same semantics as the 301 Moved Permanently HTTP response code, with the exception that the user agent must not change the HTTP method used: if a POST was used in the first request, a POST must be used in the second request.
     */
    StatusCodes[StatusCodes["PERMANENT_REDIRECT"] = 308] = "PERMANENT_REDIRECT";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7232#section-4.2
     *
     * The client has indicated preconditions in its headers which the server does not meet.
     */
    StatusCodes[StatusCodes["PRECONDITION_FAILED"] = 412] = "PRECONDITION_FAILED";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc6585#section-3
     *
     * The origin server requires the request to be conditional. Intended to prevent the 'lost update' problem, where a client GETs a resource's state, modifies it, and PUTs it back to the server, when meanwhile a third party has modified the state on the server, leading to a conflict.
     */
    StatusCodes[StatusCodes["PRECONDITION_REQUIRED"] = 428] = "PRECONDITION_REQUIRED";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc2518#section-10.1
     *
     * This code indicates that the server has received and is processing the request, but no response is available yet.
     */
    StatusCodes[StatusCodes["PROCESSING"] = 102] = "PROCESSING";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7235#section-3.2
     *
     * This is similar to 401 but authentication is needed to be done by a proxy.
     */
    StatusCodes[StatusCodes["PROXY_AUTHENTICATION_REQUIRED"] = 407] = "PROXY_AUTHENTICATION_REQUIRED";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc6585#section-5
     *
     * The server is unwilling to process the request because its header fields are too large. The request MAY be resubmitted after reducing the size of the request header fields.
     */
    StatusCodes[StatusCodes["REQUEST_HEADER_FIELDS_TOO_LARGE"] = 431] = "REQUEST_HEADER_FIELDS_TOO_LARGE";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.7
     *
     * This response is sent on an idle connection by some servers, even without any previous request by the client. It means that the server would like to shut down this unused connection. This response is used much more since some browsers, like Chrome, Firefox 27+, or IE9, use HTTP pre-connection mechanisms to speed up surfing. Also note that some servers merely shut down the connection without sending this message.
     */
    StatusCodes[StatusCodes["REQUEST_TIMEOUT"] = 408] = "REQUEST_TIMEOUT";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.11
     *
     * Request entity is larger than limits defined by server; the server might close the connection or return an Retry-After header field.
     */
    StatusCodes[StatusCodes["REQUEST_TOO_LONG"] = 413] = "REQUEST_TOO_LONG";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.12
     *
     * The URI requested by the client is longer than the server is willing to interpret.
     */
    StatusCodes[StatusCodes["REQUEST_URI_TOO_LONG"] = 414] = "REQUEST_URI_TOO_LONG";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7233#section-4.4
     *
     * The range specified by the Range header field in the request can't be fulfilled; it's possible that the range is outside the size of the target URI's data.
     */
    StatusCodes[StatusCodes["REQUESTED_RANGE_NOT_SATISFIABLE"] = 416] = "REQUESTED_RANGE_NOT_SATISFIABLE";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.3.6
     *
     * This response code is sent after accomplishing request to tell user agent reset document view which sent this request.
     */
    StatusCodes[StatusCodes["RESET_CONTENT"] = 205] = "RESET_CONTENT";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.4.4
     *
     * Server sent this response to directing client to get requested resource to another URI with an GET request.
     */
    StatusCodes[StatusCodes["SEE_OTHER"] = 303] = "SEE_OTHER";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.6.4
     *
     * The server is not ready to handle the request. Common causes are a server that is down for maintenance or that is overloaded. Note that together with this response, a user-friendly page explaining the problem should be sent. This responses should be used for temporary conditions and the Retry-After: HTTP header should, if possible, contain the estimated time before the recovery of the service. The webmaster must also take care about the caching-related headers that are sent along with this response, as these temporary condition responses should usually not be cached.
     */
    StatusCodes[StatusCodes["SERVICE_UNAVAILABLE"] = 503] = "SERVICE_UNAVAILABLE";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.2.2
     *
     * This code is sent in response to an Upgrade request header by the client, and indicates the protocol the server is switching too.
     */
    StatusCodes[StatusCodes["SWITCHING_PROTOCOLS"] = 101] = "SWITCHING_PROTOCOLS";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.4.7
     *
     * Server sent this response to directing client to get requested resource to another URI with same method that used prior request. This has the same semantic than the 302 Found HTTP response code, with the exception that the user agent must not change the HTTP method used: if a POST was used in the first request, a POST must be used in the second request.
     */
    StatusCodes[StatusCodes["TEMPORARY_REDIRECT"] = 307] = "TEMPORARY_REDIRECT";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc6585#section-4
     *
     * The user has sent too many requests in a given amount of time ("rate limiting").
     */
    StatusCodes[StatusCodes["TOO_MANY_REQUESTS"] = 429] = "TOO_MANY_REQUESTS";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7235#section-3.1
     *
     * Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated". That is, the client must authenticate itself to get the requested response.
     */
    StatusCodes[StatusCodes["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7725
     *
     * The user-agent requested a resource that cannot legally be provided, such as a web page censored by a government.
     */
    StatusCodes[StatusCodes["UNAVAILABLE_FOR_LEGAL_REASONS"] = 451] = "UNAVAILABLE_FOR_LEGAL_REASONS";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc2518#section-10.3
     *
     * The request was well-formed but was unable to be followed due to semantic errors.
     */
    StatusCodes[StatusCodes["UNPROCESSABLE_ENTITY"] = 422] = "UNPROCESSABLE_ENTITY";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.13
     *
     * The media format of the requested data is not supported by the server, so the server is rejecting the request.
     */
    StatusCodes[StatusCodes["UNSUPPORTED_MEDIA_TYPE"] = 415] = "UNSUPPORTED_MEDIA_TYPE";
    /**
     * @deprecated
     * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.4.6
     *
     * Was defined in a previous version of the HTTP specification to indicate that a requested response must be accessed by a proxy. It has been deprecated due to security concerns regarding in-band configuration of a proxy.
     */
    StatusCodes[StatusCodes["USE_PROXY"] = 305] = "USE_PROXY";
})(StatusCodes || (StatusCodes = {}));
var ReasonPhrases;
(function (ReasonPhrases) {
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.3.3
     *
     * The request has been received but not yet acted upon. It is non-committal, meaning that there is no way in HTTP to later send an asynchronous response indicating the outcome of processing the request. It is intended for cases where another process or server handles the request, or for batch processing.
     */
    ReasonPhrases["ACCEPTED"] = "Accepted";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.6.3
     *
     * This error response means that the server, while working as a gateway to get a response needed to handle the request, got an invalid response.
     */
    ReasonPhrases["BAD_GATEWAY"] = "Bad Gateway";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.1
     *
     * This response means that server could not understand the request due to invalid syntax.
     */
    ReasonPhrases["BAD_REQUEST"] = "Bad Request";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.8
     *
     * This response is sent when a request conflicts with the current state of the server.
     */
    ReasonPhrases["CONFLICT"] = "Conflict";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.2.1
     *
     * This interim response indicates that everything so far is OK and that the client should continue with the request or ignore it if it is already finished.
     */
    ReasonPhrases["CONTINUE"] = "Continue";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.3.2
     *
     * The request has succeeded and a new resource has been created as a result of it. This is typically the response sent after a PUT request.
     */
    ReasonPhrases["CREATED"] = "Created";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.14
     *
     * This response code means the expectation indicated by the Expect request header field can't be met by the server.
     */
    ReasonPhrases["EXPECTATION_FAILED"] = "Expectation Failed";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc2518#section-10.5
     *
     * The request failed due to failure of a previous request.
     */
    ReasonPhrases["FAILED_DEPENDENCY"] = "Failed Dependency";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.3
     *
     * The client does not have access rights to the content, i.e. they are unauthorized, so server is rejecting to give proper response. Unlike 401, the client's identity is known to the server.
     */
    ReasonPhrases["FORBIDDEN"] = "Forbidden";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.6.5
     *
     * This error response is given when the server is acting as a gateway and cannot get a response in time.
     */
    ReasonPhrases["GATEWAY_TIMEOUT"] = "Gateway Timeout";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.9
     *
     * This response would be sent when the requested content has been permenantly deleted from server, with no forwarding address. Clients are expected to remove their caches and links to the resource. The HTTP specification intends this status code to be used for "limited-time, promotional services". APIs should not feel compelled to indicate resources that have been deleted with this status code.
     */
    ReasonPhrases["GONE"] = "Gone";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.6.6
     *
     * The HTTP version used in the request is not supported by the server.
     */
    ReasonPhrases["HTTP_VERSION_NOT_SUPPORTED"] = "HTTP Version Not Supported";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc2324#section-2.3.2
     *
     * Any attempt to brew coffee with a teapot should result in the error code "418 I'm a teapot". The resulting entity body MAY be short and stout.
     */
    ReasonPhrases["IM_A_TEAPOT"] = "I'm a teapot";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc2518#section-10.6
     *
     * The 507 (Insufficient Storage) status code means the method could not be performed on the resource because the server is unable to store the representation needed to successfully complete the request. This condition is considered to be temporary. If the request which received this status code was the result of a user action, the request MUST NOT be repeated until it is requested by a separate user action.
     */
    ReasonPhrases["INSUFFICIENT_SPACE_ON_RESOURCE"] = "Insufficient Space on Resource";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc2518#section-10.6
     *
     * The server has an internal configuration error: the chosen variant resource is configured to engage in transparent content negotiation itself, and is therefore not a proper end point in the negotiation process.
     */
    ReasonPhrases["INSUFFICIENT_STORAGE"] = "Insufficient Storage";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.6.1
     *
     * The server encountered an unexpected condition that prevented it from fulfilling the request.
     */
    ReasonPhrases["INTERNAL_SERVER_ERROR"] = "Internal Server Error";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.10
     *
     * The server rejected the request because the Content-Length header field is not defined and the server requires it.
     */
    ReasonPhrases["LENGTH_REQUIRED"] = "Length Required";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc2518#section-10.4
     *
     * The resource that is being accessed is locked.
     */
    ReasonPhrases["LOCKED"] = "Locked";
    /**
     * @deprecated
     * Official Documentation @ https://tools.ietf.org/rfcdiff?difftype=--hwdiff&url2=draft-ietf-webdav-protocol-06.txt
     *
     * A deprecated response used by the Spring Framework when a method has failed.
     */
    ReasonPhrases["METHOD_FAILURE"] = "Method Failure";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.5
     *
     * The request method is known by the server but has been disabled and cannot be used. For example, an API may forbid DELETE-ing a resource. The two mandatory methods, GET and HEAD, must never be disabled and should not return this error code.
     */
    ReasonPhrases["METHOD_NOT_ALLOWED"] = "Method Not Allowed";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.4.2
     *
     * This response code means that URI of requested resource has been changed. Probably, new URI would be given in the response.
     */
    ReasonPhrases["MOVED_PERMANENTLY"] = "Moved Permanently";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.4.3
     *
     * This response code means that URI of requested resource has been changed temporarily. New changes in the URI might be made in the future. Therefore, this same URI should be used by the client in future requests.
     */
    ReasonPhrases["MOVED_TEMPORARILY"] = "Moved Temporarily";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc2518#section-10.2
     *
     * A Multi-Status response conveys information about multiple resources in situations where multiple status codes might be appropriate.
     */
    ReasonPhrases["MULTI_STATUS"] = "Multi-Status";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.4.1
     *
     * The request has more than one possible responses. User-agent or user should choose one of them. There is no standardized way to choose one of the responses.
     */
    ReasonPhrases["MULTIPLE_CHOICES"] = "Multiple Choices";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc6585#section-6
     *
     * The 511 status code indicates that the client needs to authenticate to gain network access.
     */
    ReasonPhrases["NETWORK_AUTHENTICATION_REQUIRED"] = "Network Authentication Required";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.3.5
     *
     * There is no content to send for this request, but the headers may be useful. The user-agent may update its cached headers for this resource with the new ones.
     */
    ReasonPhrases["NO_CONTENT"] = "No Content";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.3.4
     *
     * This response code means returned meta-information set is not exact set as available from the origin server, but collected from a local or a third party copy. Except this condition, 200 OK response should be preferred instead of this response.
     */
    ReasonPhrases["NON_AUTHORITATIVE_INFORMATION"] = "Non Authoritative Information";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.6
     *
     * This response is sent when the web server, after performing server-driven content negotiation, doesn't find any content following the criteria given by the user agent.
     */
    ReasonPhrases["NOT_ACCEPTABLE"] = "Not Acceptable";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.4
     *
     * The server can not find requested resource. In the browser, this means the URL is not recognized. In an API, this can also mean that the endpoint is valid but the resource itself does not exist. Servers may also send this response instead of 403 to hide the existence of a resource from an unauthorized client. This response code is probably the most famous one due to its frequent occurence on the web.
     */
    ReasonPhrases["NOT_FOUND"] = "Not Found";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.6.2
     *
     * The request method is not supported by the server and cannot be handled. The only methods that servers are required to support (and therefore that must not return this code) are GET and HEAD.
     */
    ReasonPhrases["NOT_IMPLEMENTED"] = "Not Implemented";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7232#section-4.1
     *
     * This is used for caching purposes. It is telling to client that response has not been modified. So, client can continue to use same cached version of response.
     */
    ReasonPhrases["NOT_MODIFIED"] = "Not Modified";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.3.1
     *
     * The request has succeeded. The meaning of a success varies depending on the HTTP method:
     * GET: The resource has been fetched and is transmitted in the message body.
     * HEAD: The entity headers are in the message body.
     * POST: The resource describing the result of the action is transmitted in the message body.
     * TRACE: The message body contains the request message as received by the server
     */
    ReasonPhrases["OK"] = "OK";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7233#section-4.1
     *
     * This response code is used because of range header sent by the client to separate download into multiple streams.
     */
    ReasonPhrases["PARTIAL_CONTENT"] = "Partial Content";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.2
     *
     * This response code is reserved for future use. Initial aim for creating this code was using it for digital payment systems however this is not used currently.
     */
    ReasonPhrases["PAYMENT_REQUIRED"] = "Payment Required";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7538#section-3
     *
     * This means that the resource is now permanently located at another URI, specified by the Location: HTTP Response header. This has the same semantics as the 301 Moved Permanently HTTP response code, with the exception that the user agent must not change the HTTP method used: if a POST was used in the first request, a POST must be used in the second request.
     */
    ReasonPhrases["PERMANENT_REDIRECT"] = "Permanent Redirect";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7232#section-4.2
     *
     * The client has indicated preconditions in its headers which the server does not meet.
     */
    ReasonPhrases["PRECONDITION_FAILED"] = "Precondition Failed";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc6585#section-3
     *
     * The origin server requires the request to be conditional. Intended to prevent the 'lost update' problem, where a client GETs a resource's state, modifies it, and PUTs it back to the server, when meanwhile a third party has modified the state on the server, leading to a conflict.
     */
    ReasonPhrases["PRECONDITION_REQUIRED"] = "Precondition Required";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc2518#section-10.1
     *
     * This code indicates that the server has received and is processing the request, but no response is available yet.
     */
    ReasonPhrases["PROCESSING"] = "Processing";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7235#section-3.2
     *
     * This is similar to 401 but authentication is needed to be done by a proxy.
     */
    ReasonPhrases["PROXY_AUTHENTICATION_REQUIRED"] = "Proxy Authentication Required";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc6585#section-5
     *
     * The server is unwilling to process the request because its header fields are too large. The request MAY be resubmitted after reducing the size of the request header fields.
     */
    ReasonPhrases["REQUEST_HEADER_FIELDS_TOO_LARGE"] = "Request Header Fields Too Large";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.7
     *
     * This response is sent on an idle connection by some servers, even without any previous request by the client. It means that the server would like to shut down this unused connection. This response is used much more since some browsers, like Chrome, Firefox 27+, or IE9, use HTTP pre-connection mechanisms to speed up surfing. Also note that some servers merely shut down the connection without sending this message.
     */
    ReasonPhrases["REQUEST_TIMEOUT"] = "Request Timeout";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.11
     *
     * Request entity is larger than limits defined by server; the server might close the connection or return an Retry-After header field.
     */
    ReasonPhrases["REQUEST_TOO_LONG"] = "Request Entity Too Large";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.12
     *
     * The URI requested by the client is longer than the server is willing to interpret.
     */
    ReasonPhrases["REQUEST_URI_TOO_LONG"] = "Request-URI Too Long";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7233#section-4.4
     *
     * The range specified by the Range header field in the request can't be fulfilled; it's possible that the range is outside the size of the target URI's data.
     */
    ReasonPhrases["REQUESTED_RANGE_NOT_SATISFIABLE"] = "Requested Range Not Satisfiable";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.3.6
     *
     * This response code is sent after accomplishing request to tell user agent reset document view which sent this request.
     */
    ReasonPhrases["RESET_CONTENT"] = "Reset Content";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.4.4
     *
     * Server sent this response to directing client to get requested resource to another URI with an GET request.
     */
    ReasonPhrases["SEE_OTHER"] = "See Other";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.6.4
     *
     * The server is not ready to handle the request. Common causes are a server that is down for maintenance or that is overloaded. Note that together with this response, a user-friendly page explaining the problem should be sent. This responses should be used for temporary conditions and the Retry-After: HTTP header should, if possible, contain the estimated time before the recovery of the service. The webmaster must also take care about the caching-related headers that are sent along with this response, as these temporary condition responses should usually not be cached.
     */
    ReasonPhrases["SERVICE_UNAVAILABLE"] = "Service Unavailable";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.2.2
     *
     * This code is sent in response to an Upgrade request header by the client, and indicates the protocol the server is switching too.
     */
    ReasonPhrases["SWITCHING_PROTOCOLS"] = "Switching Protocols";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.4.7
     *
     * Server sent this response to directing client to get requested resource to another URI with same method that used prior request. This has the same semantic than the 302 Found HTTP response code, with the exception that the user agent must not change the HTTP method used: if a POST was used in the first request, a POST must be used in the second request.
     */
    ReasonPhrases["TEMPORARY_REDIRECT"] = "Temporary Redirect";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc6585#section-4
     *
     * The user has sent too many requests in a given amount of time ("rate limiting").
     */
    ReasonPhrases["TOO_MANY_REQUESTS"] = "Too Many Requests";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7235#section-3.1
     *
     * Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated". That is, the client must authenticate itself to get the requested response.
     */
    ReasonPhrases["UNAUTHORIZED"] = "Unauthorized";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7725
     *
     * The user-agent requested a resource that cannot legally be provided, such as a web page censored by a government.
     */
    ReasonPhrases["UNAVAILABLE_FOR_LEGAL_REASONS"] = "Unavailable For Legal Reasons";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc2518#section-10.3
     *
     * The request was well-formed but was unable to be followed due to semantic errors.
     */
    ReasonPhrases["UNPROCESSABLE_ENTITY"] = "Unprocessable Entity";
    /**
     * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.13
     *
     * The media format of the requested data is not supported by the server, so the server is rejecting the request.
     */
    ReasonPhrases["UNSUPPORTED_MEDIA_TYPE"] = "Unsupported Media Type";
    /**
     * @deprecated
     * Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.4.6
     *
     * Was defined in a previous version of the HTTP specification to indicate that a requested response must be accessed by a proxy. It has been deprecated due to security concerns regarding in-band configuration of a proxy.
     */
    ReasonPhrases["USE_PROXY"] = "Use Proxy";
})(ReasonPhrases || (ReasonPhrases = {}));
var statusCodeToReasonPhrase = {
    "202": "Accepted",
    "502": "Bad Gateway",
    "400": "Bad Request",
    "409": "Conflict",
    "100": "Continue",
    "201": "Created",
    "417": "Expectation Failed",
    "424": "Failed Dependency",
    "403": "Forbidden",
    "504": "Gateway Timeout",
    "410": "Gone",
    "505": "HTTP Version Not Supported",
    "418": "I'm a teapot",
    "419": "Insufficient Space on Resource",
    "507": "Insufficient Storage",
    "500": "Internal Server Error",
    "411": "Length Required",
    "423": "Locked",
    "420": "Method Failure",
    "405": "Method Not Allowed",
    "301": "Moved Permanently",
    "302": "Moved Temporarily",
    "207": "Multi-Status",
    "300": "Multiple Choices",
    "511": "Network Authentication Required",
    "204": "No Content",
    "203": "Non Authoritative Information",
    "406": "Not Acceptable",
    "404": "Not Found",
    "501": "Not Implemented",
    "304": "Not Modified",
    "200": "OK",
    "206": "Partial Content",
    "402": "Payment Required",
    "308": "Permanent Redirect",
    "412": "Precondition Failed",
    "428": "Precondition Required",
    "102": "Processing",
    "407": "Proxy Authentication Required",
    "431": "Request Header Fields Too Large",
    "408": "Request Timeout",
    "413": "Request Entity Too Large",
    "414": "Request-URI Too Long",
    "416": "Requested Range Not Satisfiable",
    "205": "Reset Content",
    "303": "See Other",
    "503": "Service Unavailable",
    "101": "Switching Protocols",
    "307": "Temporary Redirect",
    "429": "Too Many Requests",
    "401": "Unauthorized",
    "451": "Unavailable For Legal Reasons",
    "422": "Unprocessable Entity",
    "415": "Unsupported Media Type",
    "305": "Use Proxy"
};
var reasonPhraseToStatusCode = {
    "Accepted": 202,
    "Bad Gateway": 502,
    "Bad Request": 400,
    "Conflict": 409,
    "Continue": 100,
    "Created": 201,
    "Expectation Failed": 417,
    "Failed Dependency": 424,
    "Forbidden": 403,
    "Gateway Timeout": 504,
    "Gone": 410,
    "HTTP Version Not Supported": 505,
    "I'm a teapot": 418,
    "Insufficient Space on Resource": 419,
    "Insufficient Storage": 507,
    "Internal Server Error": 500,
    "Length Required": 411,
    "Locked": 423,
    "Method Failure": 420,
    "Method Not Allowed": 405,
    "Moved Permanently": 301,
    "Moved Temporarily": 302,
    "Multi-Status": 207,
    "Multiple Choices": 300,
    "Network Authentication Required": 511,
    "No Content": 204,
    "Non Authoritative Information": 203,
    "Not Acceptable": 406,
    "Not Found": 404,
    "Not Implemented": 501,
    "Not Modified": 304,
    "OK": 200,
    "Partial Content": 206,
    "Payment Required": 402,
    "Permanent Redirect": 308,
    "Precondition Failed": 412,
    "Precondition Required": 428,
    "Processing": 102,
    "Proxy Authentication Required": 407,
    "Request Header Fields Too Large": 431,
    "Request Timeout": 408,
    "Request Entity Too Large": 413,
    "Request-URI Too Long": 414,
    "Requested Range Not Satisfiable": 416,
    "Reset Content": 205,
    "See Other": 303,
    "Service Unavailable": 503,
    "Switching Protocols": 101,
    "Temporary Redirect": 307,
    "Too Many Requests": 429,
    "Unauthorized": 401,
    "Unavailable For Legal Reasons": 451,
    "Unprocessable Entity": 422,
    "Unsupported Media Type": 415,
    "Use Proxy": 305
};


/***/ }),

/***/ "../node_modules/http-status-codes/build/es/index.js":
/*!***********************************************************!*\
  !*** ../node_modules/http-status-codes/build/es/index.js ***!
  \***********************************************************/
/*! exports provided: getReasonPhrase, getStatusCode, getStatusText, StatusCodes, ReasonPhrases, ACCEPTED, BAD_GATEWAY, BAD_REQUEST, CONFLICT, CONTINUE, CREATED, EXPECTATION_FAILED, FAILED_DEPENDENCY, FORBIDDEN, GATEWAY_TIMEOUT, GONE, HTTP_VERSION_NOT_SUPPORTED, IM_A_TEAPOT, INSUFFICIENT_SPACE_ON_RESOURCE, INSUFFICIENT_STORAGE, INTERNAL_SERVER_ERROR, LENGTH_REQUIRED, LOCKED, METHOD_FAILURE, METHOD_NOT_ALLOWED, MOVED_PERMANENTLY, MOVED_TEMPORARILY, MULTI_STATUS, MULTIPLE_CHOICES, NETWORK_AUTHENTICATION_REQUIRED, NO_CONTENT, NON_AUTHORITATIVE_INFORMATION, NOT_ACCEPTABLE, NOT_FOUND, NOT_IMPLEMENTED, NOT_MODIFIED, OK, PARTIAL_CONTENT, PAYMENT_REQUIRED, PERMANENT_REDIRECT, PRECONDITION_FAILED, PRECONDITION_REQUIRED, PROCESSING, PROXY_AUTHENTICATION_REQUIRED, REQUEST_HEADER_FIELDS_TOO_LARGE, REQUEST_TIMEOUT, REQUEST_TOO_LONG, REQUEST_URI_TOO_LONG, REQUESTED_RANGE_NOT_SATISFIABLE, RESET_CONTENT, SEE_OTHER, SERVICE_UNAVAILABLE, SWITCHING_PROTOCOLS, TEMPORARY_REDIRECT, TOO_MANY_REQUESTS, UNAUTHORIZED, UNPROCESSABLE_ENTITY, UNSUPPORTED_MEDIA_TYPE, USE_PROXY, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getReasonPhrase", function() { return getReasonPhrase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStatusCode", function() { return getStatusCode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStatusText", function() { return getStatusText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ACCEPTED", function() { return ACCEPTED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BAD_GATEWAY", function() { return BAD_GATEWAY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BAD_REQUEST", function() { return BAD_REQUEST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CONFLICT", function() { return CONFLICT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CONTINUE", function() { return CONTINUE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CREATED", function() { return CREATED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EXPECTATION_FAILED", function() { return EXPECTATION_FAILED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FAILED_DEPENDENCY", function() { return FAILED_DEPENDENCY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FORBIDDEN", function() { return FORBIDDEN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GATEWAY_TIMEOUT", function() { return GATEWAY_TIMEOUT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GONE", function() { return GONE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HTTP_VERSION_NOT_SUPPORTED", function() { return HTTP_VERSION_NOT_SUPPORTED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IM_A_TEAPOT", function() { return IM_A_TEAPOT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INSUFFICIENT_SPACE_ON_RESOURCE", function() { return INSUFFICIENT_SPACE_ON_RESOURCE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INSUFFICIENT_STORAGE", function() { return INSUFFICIENT_STORAGE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INTERNAL_SERVER_ERROR", function() { return INTERNAL_SERVER_ERROR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LENGTH_REQUIRED", function() { return LENGTH_REQUIRED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LOCKED", function() { return LOCKED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "METHOD_FAILURE", function() { return METHOD_FAILURE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "METHOD_NOT_ALLOWED", function() { return METHOD_NOT_ALLOWED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MOVED_PERMANENTLY", function() { return MOVED_PERMANENTLY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MOVED_TEMPORARILY", function() { return MOVED_TEMPORARILY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MULTI_STATUS", function() { return MULTI_STATUS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MULTIPLE_CHOICES", function() { return MULTIPLE_CHOICES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NETWORK_AUTHENTICATION_REQUIRED", function() { return NETWORK_AUTHENTICATION_REQUIRED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NO_CONTENT", function() { return NO_CONTENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NON_AUTHORITATIVE_INFORMATION", function() { return NON_AUTHORITATIVE_INFORMATION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NOT_ACCEPTABLE", function() { return NOT_ACCEPTABLE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NOT_FOUND", function() { return NOT_FOUND; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NOT_IMPLEMENTED", function() { return NOT_IMPLEMENTED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NOT_MODIFIED", function() { return NOT_MODIFIED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OK", function() { return OK; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PARTIAL_CONTENT", function() { return PARTIAL_CONTENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PAYMENT_REQUIRED", function() { return PAYMENT_REQUIRED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PERMANENT_REDIRECT", function() { return PERMANENT_REDIRECT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PRECONDITION_FAILED", function() { return PRECONDITION_FAILED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PRECONDITION_REQUIRED", function() { return PRECONDITION_REQUIRED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PROCESSING", function() { return PROCESSING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PROXY_AUTHENTICATION_REQUIRED", function() { return PROXY_AUTHENTICATION_REQUIRED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REQUEST_HEADER_FIELDS_TOO_LARGE", function() { return REQUEST_HEADER_FIELDS_TOO_LARGE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REQUEST_TIMEOUT", function() { return REQUEST_TIMEOUT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REQUEST_TOO_LONG", function() { return REQUEST_TOO_LONG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REQUEST_URI_TOO_LONG", function() { return REQUEST_URI_TOO_LONG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REQUESTED_RANGE_NOT_SATISFIABLE", function() { return REQUESTED_RANGE_NOT_SATISFIABLE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RESET_CONTENT", function() { return RESET_CONTENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SEE_OTHER", function() { return SEE_OTHER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SERVICE_UNAVAILABLE", function() { return SERVICE_UNAVAILABLE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SWITCHING_PROTOCOLS", function() { return SWITCHING_PROTOCOLS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TEMPORARY_REDIRECT", function() { return TEMPORARY_REDIRECT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOO_MANY_REQUESTS", function() { return TOO_MANY_REQUESTS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UNAUTHORIZED", function() { return UNAUTHORIZED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UNPROCESSABLE_ENTITY", function() { return UNPROCESSABLE_ENTITY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UNSUPPORTED_MEDIA_TYPE", function() { return UNSUPPORTED_MEDIA_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "USE_PROXY", function() { return USE_PROXY; });
/* harmony import */ var _codes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./codes */ "../node_modules/http-status-codes/build/es/codes.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StatusCodes", function() { return _codes__WEBPACK_IMPORTED_MODULE_0__["StatusCodes"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ReasonPhrases", function() { return _codes__WEBPACK_IMPORTED_MODULE_0__["ReasonPhrases"]; });


/**
 * Returns the reason phrase for the given status code.
 * If the given status code does not exist, an error is thrown.
 *
 * @param {number|string} statusCode The HTTP status code
 * @returns {string} The associated reason phrase (e.g. "Bad Request", "OK")
 * */
function getReasonPhrase(statusCode) {
    var result = _codes__WEBPACK_IMPORTED_MODULE_0__["statusCodeToReasonPhrase"][statusCode.toString()];
    if (!result) {
        throw new Error("Status code does not exist: " + statusCode);
    }
    return result;
}
/**
 * Returns the status code for the given reason phrase.
 * If the given reason phrase does not exist, undefined is returned.
 *
 * @param {string} reasonPhrase The HTTP reason phrase (e.g. "Bad Request", "OK")
 * @returns {string} The associated status code
 * */
function getStatusCode(reasonPhrase) {
    var result = _codes__WEBPACK_IMPORTED_MODULE_0__["reasonPhraseToStatusCode"][reasonPhrase];
    if (!result) {
        throw new Error("Reason phrase does not exist: " + reasonPhrase);
    }
    return result;
}
/**
 * @deprecated
 *
 * Returns the reason phrase for the given status code.
 * If the given status code does not exist, undefined is returned.
 *
 * Deprecated in favor of getReasonPhrase
 *
 * @param {number|string} statusCode The HTTP status code
 * @returns {string|undefined} The associated reason phrase (e.g. "Bad Request", "OK")
 * */
var getStatusText = getReasonPhrase;

// Exporting constants directly to maintain compatability with v1
// These are deprecated. Please don't add any new codes here.
/**
 * @deprecated Please use StatusCodes.ACCEPTED
 *
 * */
var ACCEPTED = 202;
/**
 * @deprecated Please use StatusCodes.BAD_GATEWAY
 *
 * */
var BAD_GATEWAY = 502;
/**
 * @deprecated Please use StatusCodes.BAD_REQUEST
 *
 * */
var BAD_REQUEST = 400;
/**
 * @deprecated Please use StatusCodes.CONFLICT
 *
 * */
var CONFLICT = 409;
/**
 * @deprecated Please use StatusCodes.CONTINUE
 *
 * */
var CONTINUE = 100;
/**
 * @deprecated Please use StatusCodes.CREATED
 *
 * */
var CREATED = 201;
/**
 * @deprecated Please use StatusCodes.EXPECTATION_FAILED
 *
 * */
var EXPECTATION_FAILED = 417;
/**
 * @deprecated Please use StatusCodes.FAILED_DEPENDENCY
 *
 * */
var FAILED_DEPENDENCY = 424;
/**
 * @deprecated Please use StatusCodes.FORBIDDEN
 *
 * */
var FORBIDDEN = 403;
/**
 * @deprecated Please use StatusCodes.GATEWAY_TIMEOUT
 *
 * */
var GATEWAY_TIMEOUT = 504;
/**
 * @deprecated Please use StatusCodes.GONE
 *
 * */
var GONE = 410;
/**
 * @deprecated Please use StatusCodes.HTTP_VERSION_NOT_SUPPORTED
 *
 * */
var HTTP_VERSION_NOT_SUPPORTED = 505;
/**
 * @deprecated Please use StatusCodes.IM_A_TEAPOT
 *
 * */
var IM_A_TEAPOT = 418;
/**
 * @deprecated Please use StatusCodes.INSUFFICIENT_SPACE_ON_RESOURCE
 *
 * */
var INSUFFICIENT_SPACE_ON_RESOURCE = 419;
/**
 * @deprecated Please use StatusCodes.INSUFFICIENT_STORAGE
 *
 * */
var INSUFFICIENT_STORAGE = 507;
/**
 * @deprecated Please use StatusCodes.INTERNAL_SERVER_ERROR
 *
 * */
var INTERNAL_SERVER_ERROR = 500;
/**
 * @deprecated Please use StatusCodes.LENGTH_REQUIRED
 *
 * */
var LENGTH_REQUIRED = 411;
/**
 * @deprecated Please use StatusCodes.LOCKED
 *
 * */
var LOCKED = 423;
/**
 * @deprecated Please use StatusCodes.METHOD_FAILURE
 *
 * */
var METHOD_FAILURE = 420;
/**
 * @deprecated Please use StatusCodes.METHOD_NOT_ALLOWED
 *
 * */
var METHOD_NOT_ALLOWED = 405;
/**
 * @deprecated Please use StatusCodes.MOVED_PERMANENTLY
 *
 * */
var MOVED_PERMANENTLY = 301;
/**
 * @deprecated Please use StatusCodes.MOVED_TEMPORARILY
 *
 * */
var MOVED_TEMPORARILY = 302;
/**
 * @deprecated Please use StatusCodes.MULTI_STATUS
 *
 * */
var MULTI_STATUS = 207;
/**
 * @deprecated Please use StatusCodes.MULTIPLE_CHOICES
 *
 * */
var MULTIPLE_CHOICES = 300;
/**
 * @deprecated Please use StatusCodes.NETWORK_AUTHENTICATION_REQUIRED
 *
 * */
var NETWORK_AUTHENTICATION_REQUIRED = 511;
/**
 * @deprecated Please use StatusCodes.NO_CONTENT
 *
 * */
var NO_CONTENT = 204;
/**
 * @deprecated Please use StatusCodes.NON_AUTHORITATIVE_INFORMATION
 *
 * */
var NON_AUTHORITATIVE_INFORMATION = 203;
/**
 * @deprecated Please use StatusCodes.NOT_ACCEPTABLE
 *
 * */
var NOT_ACCEPTABLE = 406;
/**
 * @deprecated Please use StatusCodes.NOT_FOUND
 *
 * */
var NOT_FOUND = 404;
/**
 * @deprecated Please use StatusCodes.NOT_IMPLEMENTED
 *
 * */
var NOT_IMPLEMENTED = 501;
/**
 * @deprecated Please use StatusCodes.NOT_MODIFIED
 *
 * */
var NOT_MODIFIED = 304;
/**
 * @deprecated Please use StatusCodes.OK
 *
 * */
var OK = 200;
/**
 * @deprecated Please use StatusCodes.PARTIAL_CONTENT
 *
 * */
var PARTIAL_CONTENT = 206;
/**
 * @deprecated Please use StatusCodes.PAYMENT_REQUIRED
 *
 * */
var PAYMENT_REQUIRED = 402;
/**
 * @deprecated Please use StatusCodes.PERMANENT_REDIRECT
 *
 * */
var PERMANENT_REDIRECT = 308;
/**
 * @deprecated Please use StatusCodes.PRECONDITION_FAILED
 *
 * */
var PRECONDITION_FAILED = 412;
/**
 * @deprecated Please use StatusCodes.PRECONDITION_REQUIRED
 *
 * */
var PRECONDITION_REQUIRED = 428;
/**
 * @deprecated Please use StatusCodes.PROCESSING
 *
 * */
var PROCESSING = 102;
/**
 * @deprecated Please use StatusCodes.PROXY_AUTHENTICATION_REQUIRED
 *
 * */
var PROXY_AUTHENTICATION_REQUIRED = 407;
/**
 * @deprecated Please use StatusCodes.REQUEST_HEADER_FIELDS_TOO_LARGE
 *
 * */
var REQUEST_HEADER_FIELDS_TOO_LARGE = 431;
/**
 * @deprecated Please use StatusCodes.REQUEST_TIMEOUT
 *
 * */
var REQUEST_TIMEOUT = 408;
/**
 * @deprecated Please use StatusCodes.REQUEST_TOO_LONG
 *
 * */
var REQUEST_TOO_LONG = 413;
/**
 * @deprecated Please use StatusCodes.REQUEST_URI_TOO_LONG
 *
 * */
var REQUEST_URI_TOO_LONG = 414;
/**
 * @deprecated Please use StatusCodes.REQUESTED_RANGE_NOT_SATISFIABLE
 *
 * */
var REQUESTED_RANGE_NOT_SATISFIABLE = 416;
/**
 * @deprecated Please use StatusCodes.RESET_CONTENT
 *
 * */
var RESET_CONTENT = 205;
/**
 * @deprecated Please use StatusCodes.SEE_OTHER
 *
 * */
var SEE_OTHER = 303;
/**
 * @deprecated Please use StatusCodes.SERVICE_UNAVAILABLE
 *
 * */
var SERVICE_UNAVAILABLE = 503;
/**
 * @deprecated Please use StatusCodes.SWITCHING_PROTOCOLS
 *
 * */
var SWITCHING_PROTOCOLS = 101;
/**
 * @deprecated Please use StatusCodes.TEMPORARY_REDIRECT
 *
 * */
var TEMPORARY_REDIRECT = 307;
/**
 * @deprecated Please use StatusCodes.TOO_MANY_REQUESTS
 *
 * */
var TOO_MANY_REQUESTS = 429;
/**
 * @deprecated Please use StatusCodes.UNAUTHORIZED
 *
 * */
var UNAUTHORIZED = 401;
/**
 * @deprecated Please use StatusCodes.UNPROCESSABLE_ENTITY
 *
 * */
var UNPROCESSABLE_ENTITY = 422;
/**
 * @deprecated Please use StatusCodes.UNSUPPORTED_MEDIA_TYPE
 *
 * */
var UNSUPPORTED_MEDIA_TYPE = 415;
/**
 * @deprecated Please use StatusCodes.USE_PROXY
 *
 * */
var USE_PROXY = 305;
/* harmony default export */ __webpack_exports__["default"] = ({
    ACCEPTED: ACCEPTED,
    BAD_GATEWAY: BAD_GATEWAY,
    BAD_REQUEST: BAD_REQUEST,
    CONFLICT: CONFLICT,
    CONTINUE: CONTINUE,
    CREATED: CREATED,
    EXPECTATION_FAILED: EXPECTATION_FAILED,
    FORBIDDEN: FORBIDDEN,
    GATEWAY_TIMEOUT: GATEWAY_TIMEOUT,
    GONE: GONE,
    HTTP_VERSION_NOT_SUPPORTED: HTTP_VERSION_NOT_SUPPORTED,
    IM_A_TEAPOT: IM_A_TEAPOT,
    INSUFFICIENT_SPACE_ON_RESOURCE: INSUFFICIENT_SPACE_ON_RESOURCE,
    INSUFFICIENT_STORAGE: INSUFFICIENT_STORAGE,
    INTERNAL_SERVER_ERROR: INTERNAL_SERVER_ERROR,
    LENGTH_REQUIRED: LENGTH_REQUIRED,
    LOCKED: LOCKED,
    METHOD_FAILURE: METHOD_FAILURE,
    METHOD_NOT_ALLOWED: METHOD_NOT_ALLOWED,
    MOVED_PERMANENTLY: MOVED_PERMANENTLY,
    MOVED_TEMPORARILY: MOVED_TEMPORARILY,
    MULTI_STATUS: MULTI_STATUS,
    MULTIPLE_CHOICES: MULTIPLE_CHOICES,
    NETWORK_AUTHENTICATION_REQUIRED: NETWORK_AUTHENTICATION_REQUIRED,
    NO_CONTENT: NO_CONTENT,
    NON_AUTHORITATIVE_INFORMATION: NON_AUTHORITATIVE_INFORMATION,
    NOT_ACCEPTABLE: NOT_ACCEPTABLE,
    NOT_FOUND: NOT_FOUND,
    NOT_IMPLEMENTED: NOT_IMPLEMENTED,
    NOT_MODIFIED: NOT_MODIFIED,
    OK: OK,
    PARTIAL_CONTENT: PARTIAL_CONTENT,
    PAYMENT_REQUIRED: PAYMENT_REQUIRED,
    PERMANENT_REDIRECT: PERMANENT_REDIRECT,
    PRECONDITION_FAILED: PRECONDITION_FAILED,
    PRECONDITION_REQUIRED: PRECONDITION_REQUIRED,
    PROCESSING: PROCESSING,
    PROXY_AUTHENTICATION_REQUIRED: PROXY_AUTHENTICATION_REQUIRED,
    REQUEST_HEADER_FIELDS_TOO_LARGE: REQUEST_HEADER_FIELDS_TOO_LARGE,
    REQUEST_TIMEOUT: REQUEST_TIMEOUT,
    REQUEST_TOO_LONG: REQUEST_TOO_LONG,
    REQUEST_URI_TOO_LONG: REQUEST_URI_TOO_LONG,
    REQUESTED_RANGE_NOT_SATISFIABLE: REQUESTED_RANGE_NOT_SATISFIABLE,
    RESET_CONTENT: RESET_CONTENT,
    SEE_OTHER: SEE_OTHER,
    SERVICE_UNAVAILABLE: SERVICE_UNAVAILABLE,
    SWITCHING_PROTOCOLS: SWITCHING_PROTOCOLS,
    TEMPORARY_REDIRECT: TEMPORARY_REDIRECT,
    TOO_MANY_REQUESTS: TOO_MANY_REQUESTS,
    UNAUTHORIZED: UNAUTHORIZED,
    UNPROCESSABLE_ENTITY: UNPROCESSABLE_ENTITY,
    UNSUPPORTED_MEDIA_TYPE: UNSUPPORTED_MEDIA_TYPE,
    USE_PROXY: USE_PROXY,
    getStatusText: getStatusText,
    getStatusCode: getStatusCode,
});


/***/ }),

/***/ "../node_modules/lambda-log/index.js":
/*!*******************************************!*\
  !*** ../node_modules/lambda-log/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @module lambda-log
 */

const LambdaLog = __webpack_require__(/*! ./lib/LambdaLog */ "../node_modules/lambda-log/lib/LambdaLog.js");
/**
 * Instance of the [LambdaLog](#lambdalog) class which is exported when calling `require('lambda-log')`. 
 * For more advanced usage, you can create a new instance of the LambdaLog class via `new log.LambdaLog()`.
 * @type LambdaLog
 * @kind LambdaLog Instance
 * @alias module:lambda-log
 * 
 * @example 
 * const log = require('lambda-log');
 * 
 * // Advanced usage, create new instance of LambdaLog:
 * const LambdaLog = require('lambda-log').LambdaLog;
 * const log = new LambdaLog();
 */
const log = new LambdaLog();

module.exports = log;


/***/ }),

/***/ "../node_modules/lambda-log/lib/LambdaLog.js":
/*!***************************************************!*\
  !*** ../node_modules/lambda-log/lib/LambdaLog.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const EventEmitter = __webpack_require__(/*! events */ "events");
const LogMessage = __webpack_require__(/*! ./LogMessage */ "../node_modules/lambda-log/lib/LogMessage.js");

/**
 * @external EventEmitter
 * @see https://nodejs.org/api/events.html#events_class_eventemitter
 */

/**
 * @extends {external:EventEmitter}
 * @typicalname log
 */
class LambdaLog extends EventEmitter {
    /**
     * Constructor for the LambdaLog class. Provided to be utilized in more advanced cases to allow overriding and configuration. By default, this module will export an instance of this class, but you may access the class and create your own instance via `log.LambdaLog`.
     * @constructor
     * @param {Object} [options={}] Options object. See [<code>log.options</code>](#logoptions) for available options.
     * @param {Object} [levels={}]  Allows adding and customizing log levels. See [Custom Log Levels](#custom-log-levels).
     */
    constructor(options = {}, levels = {}) {
        super();
        /**
         * Access to the uninstantiated LambdaLog class. This allows more advanced functionality and customization.
         * @type {LambdaLog}
         * @example 
         * const LambdaLog = require('lambda-log').LambdaLog;
         * const log = new LambdaLog();
         */
        this.LambdaLog = LambdaLog;
        
        /**
         * Access to the uninstantiated LogMessage class. You can override this property to use a custom logging class that inherits the same methods.
         * @type {LogMessage}
         * @since 2.2.0
         * @example 
         * const log = require('lambda-log');
         * const MyCustomLogMessageClass = require('./myCustomLogMessageClass.js');
         * 
         * log.LogMessage = MyCustomLogMessageClass;
         */
        this.LogMessage = LogMessage;
        
        /**
         * Configuration object for LambdaLog. Most options can be changed at any time via `log.options.OPTION = VALUE;` unless otherwise noted.
         * @property {Object} [meta={}] Global metadata to be included in all logs.
         * @property {String[]} [tags=[]] Global tags to be included in all logs.
         * @property {Function} [dynamicMeta=null] Function that runs for each log that returns additional metadata. See [Dynamic Metadata](#dynamic-metadata).
         * @property {Boolean} [debug=false] Enables `log.debug()`.
         * @property {Boolean} [dev=false] Enable development mode which pretty-prints JSON to the console.
         * @property {Boolean} [silent=false] Disables logging to `console` but messages and events are still generated.
         * @property {Function} [replacer=null] Replacer function for `JSON.stringify()` to allow handling of sensitive data before logs are written. See [JSON.stringify](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#The_replacer_parameter).
         * @property {Object} [logHandler=console] A console-like object containing all standard console functions. Allows logs to be written to any custom location. See [Log Handler](#loghandler).
         */
        this.options = Object.assign({
            meta: {},
            tags: [],
            dynamicMeta: null,
            debug: false,
            dev: false,
            silent: ![undefined, null, '0', 'no', 'false'].includes(process.env.LAMBDALOG_SILENT),
            replacer: null,
            logHandler: console
        }, options);
        
        /**
         * Global configuration for log levels
         * @type {Object}
         * @private
         */
        this._logLevels = Object.assign({
            info: 'info',
            warn: 'warn',
            error: 'error',
            debug: function() {
                if(this.options.debug) return 'debug';
                return false;
            }
        }, levels || {});
        
        this._levels = Object.keys(this._logLevels);
        
        /**
         * Console-like log handler to use for logging messages
         * @type {Object}
         * @private 
         */
        this.console = this.options.logHandler;

        this._levels.forEach((lvl) => {
            /**
             * Shortcut methods for `log.log()`. By default, the following methods are available: `log.info()`, `log.warn()`, `log.error()` and `log.debug()`. 
             * Additional methods will be added for any [custom log levels](#custom-log-levels) provided.<br><br>The provided msg can be any type, although a string 
             * or `Error` is recommended. If `Error` is provided the stack trace is added as metadata to the log as `stack`.
             * @alias LambdaLog#&lt;info|warn|error|debug|*&gt;
             * @param {*}      msg  Message to log. Can be any type, but string or `Error` reccommended.
             * @param {Object} [meta={}] Optional meta data to attach to the log.
             * @param {Array}  [tags=[]] Additional tags to append to this log.
             * @return {LogMessage}  The LogMessage instance for the log.
             * 
             * @example
             * const log = require('lambda-log');
             * 
             * log.info('Test info log');
             * log.debug('Test debug log');
             * log.warn('Test warn log');
             * log.error('Test error log');
             */
            this[lvl] = (msg, meta = {}, tags = []) => {
                return this.log(lvl, msg, meta, tags);
            };
        });
    }

    /**
     * Generates JSON log message based on the provided parameters and the global configuration. Once the JSON message is created, it is properly logged to the `console` 
     * and emitted through an event. If an `Error` or `Error`-like object is provided for `msg`, it will parse out the message and include the stacktrace in the metadata.
     * @throws {Error} If improper log level is provided.
     * @param  {String} level Log level (`info`, `debug`, `warn`, `error` or a [custom log level](#custom-log-levels))
     * @param  {*}      msg   Message to log. Can be any type, but string or `Error` reccommended.
     * @param  {Object} [meta={}]  Optional meta data to attach to the log.
     * @param  {Array}  [tags=[]]  Additional tags to append to this log.
     * @return {LogMessage|Boolean}  Returns instance of LogMessage or `false` if `level = "debug"` and `options.debug = false`. May also return `false` when a [custom log level](#custom-log-levels) handler function prevents the log from being logged.
     * 
     * @example 
     * log.log('error', 'Something failed!');
     * // same as:
     * log.error('Something failed!');
     */
    log(level, msg, meta = {}, tags = []) {
        if(this._levels.indexOf(level) === -1) {
            throw new Error(`"${level}" is not a valid log level`);
        }
        
        let message = new this.LogMessage({
            level,
            msg,
            meta,
            tags
        }, this.options);
        
        let method = this._logLevels[level];
        
        if(typeof method === 'function') {
            method = method.call(this, message);
        }
        
        if(!method) return false;
        
        if(!this.options.silent) {
            this.console[method](message.toJSON(this.options.dev));
        }

        /**
         * The log event is emitted (using EventEmitter) for every log generated. This allows for custom integrations, such as logging to a thrid-party service. 
         * This event is emitted with the [LogMessage](#logmessage) instance for the log. You may control events using all the methods of EventEmitter.
         * @event LambdaLog#log
         * @type {LogMessage}
         * 
         * @example 
         * log.on('log', message => {
         *     // an example would be sending the log message to another service
         *     someLogService(message.toJSON());
         * });
         */
        this.emit('log', message);
        return message;
    }

    /**
     * Generates a log message if `test` is a falsy value. If `test` is truthy, the log message is skipped and returns `false`. Allows creating log messages without the need to 
     * wrap them in an if statement. The log level will be `error`.
     * @since  1.4.0
     * @param  {*}              test      A value which is tested for a falsy value.
     * @param  {*}              msg       Message to log if `test` is falsy. Can be any type, but string or `Error` reccommended.
     * @param  {Object}         [meta={}] Optional meta data to attach to the log.
     * @param  {Array}          [tags=[]] Additional tags to append to this log.
     * @return {LogMessage|Boolean}       The LogMessage instance for the log or `false` if test passed.
     * 
     * @example 
     * let results = null;
     * // This log will be displayed since `results` is a falsy value.
     * log.assert(results, 'No results provided!');
     * //=> { msg: "No results provided!" ... }
     * 
     * // But if they are truthy, the log is ignored:
     * results = [1, 2, 3];
     * log.assert(results, 'No results provided!');
     * //=> false
     */
    assert(test, msg, meta = {}, tags = []) {
        if(test) return false;
        return this.log('error', msg, meta, tags);
    }
    
    /**
     * Generates a log message with the result or error provided by a promise. Useful for debugging and testing.
     * @since 2.3.0
     * @param {Promise} promise A promise or promise-like object to retrieve a value from.
     * @param  {Object} [meta={}] Optional meta data to attach to the log.
     * @param  {Array}  [tags=[]] Additional tags to append to this log.
     * @return {Promise<LogMessage>} A new Promise that resolves with the LogMessage object after the promise completes.
     * 
     * @example 
     * let promise = new Promise(resolve => resolve('this is a test'));
     * 
     * log.result(promise);
     * // => { "msg": "this is a test" ... }
     */
    result(promise, meta = {}, tags = []) {
        if(!promise || typeof promise.then !== 'function') {
            throw new Error('A promise must be provided as the first argument');
        }
        
        let wrapper = new Promise((resolve) => {
            promise
                .then(value => resolve(this.log('info', value, meta, tags)))
                .catch(err => resolve(this.log('error', err, meta, tags)));
        });
        
        return wrapper;
    }
}

module.exports = LambdaLog;


/***/ }),

/***/ "../node_modules/lambda-log/lib/LogMessage.js":
/*!****************************************************!*\
  !*** ../node_modules/lambda-log/lib/LogMessage.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const stringify = __webpack_require__(/*! fast-safe-stringify */ "../node_modules/fast-safe-stringify/index.js");

/**
 * The LogMessage class is a private/internal class that is used for generating log messages. All log methods return an instance of LogMessage allowing for a chainable api. 
 * Having a seperate class and instance for each log allows chaining and the ability to further customize this module in the future without major breaking changes. The documentation 
 * provided here is what is available to you for each log message.
 */
class LogMessage {
    /**
     * Constructor for LogMessage
     * @param {Object} log  Object containing all the information for a log.
     * @param {String} log.level The log level.
     * @param {*} log.msg The message for the log.
     * @param {Object} [log.meta] Metadata attached to the log.
     * @param {String[]} [log.tags] Additional tags to attach to the log.
     * @param {Object} opts Configuration options from LambdaLog.
     */
    constructor({ level, msg, meta, tags }, opts) {
        /**
         * String log level of the message.
         * @type {String}
         * @example 
         * log.error('This is an error').level;
         * //=> "error"
         */
        this.level = level;
        /**
         * The fully compiled metadata object for the log. Includes global and dynamic metadata.
         * @type {Object}
         * @example 
         * log.info('This is some info', { hello: 'world' }).meta;
         * //=> { hello: 'world', ... }
         */
        this.meta = meta;
        /**
         * Array of tags attached to this log. Includes global tags.
         * @type {String[]}
         * @example 
         * log.info('This is some info', {}, ['custom-tag']).tags;
         * //=> ["custom-tag", ...]
         */
        this.tags = ['log', level].concat(opts.tags, tags);
        
        let errorMeta = {};
        
        // If `msg` is an Error-like object, use the message and add the `stack` to `meta`
        if(LogMessage.isError(msg)) {
            this._error = msg;
            errorMeta.stack = msg.stack;
            msg = msg.message;
        }
        
        /**
         * The message for the log. If an Error was provided, it will be the message of the error.
         * @type {String}
         * @example 
         * log.error('This is an error').msg;
         * //=> "This is an error"
         */
        this.msg = msg;
        
        if(meta && (typeof meta !== 'object' || Array.isArray(meta))) {
            meta = { meta };
        }
        
        this.meta = Object.assign({}, meta || {}, opts.meta, errorMeta);
        
        if(opts.dynamicMeta && typeof opts.dynamicMeta === 'function') {
            let dynMeta = opts.dynamicMeta(this, opts);
            
            if(typeof dynMeta === 'object') {
                this.meta = Object.assign(this.meta, dynMeta);
            }
        }
        
        this._replacer = typeof opts.replacer === 'function'? opts.replacer : null;
    }
    
    /**
     * The full log object. This is the object used in logMessage.toJSON() and when the log is written to the console. 
     * See [Log Output](#log-output) for more information.
     * @returns {Object} The full log object.
     * @example 
     * log.info('This is some info').value;
     * //=> { _logLevel: 'info', msg: 'This is some info', ... }
     */
    get value() {
        return Object.assign({ _logLevel: this.level, msg: this.msg }, this.meta, { _tags: this.tags });
    }
    
    /**
     * Alias of `logMessage.value`.
     * @returns {Object} The full log object.
     */
    get log() {
        return this.value;
    }
    
    /**
     * Throws the log. If an error was not provided, one will be generated for you and thrown. This is useful in cases where you need to log an 
     * error, but also throw it.
     * @throws {Error} The provided error, or a newly generated error.
     * @example 
     * log.error('This is an error').throw;
     * 
     * //Shorthand for:
     * let logMsg = log.error('This is an error');
     * let error = new Error(logMsg.msg);
     * error.log = logMsg;
     * 
     * throw error;
     */
    get throw() {
        let err = this._error || new Error(this.msg);
        err.log = this;
        
        throw err;
    }
    
    /**
     * Returns the compiled log object converted into JSON. This method utilizes `options.replacer` for the replacer function. It also uses 
     * [json-stringify-safe](https://www.npmjs.com/package/json-stringify-safe) to prevent circular reference issues.
     * @param {Boolean} [format=false] Enable pretty-printing of the JSON object (4 space indentation).
     * @returns {String}  Log object stringified as JSON.
     * @example 
     * log.error('This is an error').toJSON(true);
     * //=> {
     * //      "_logLevel": "error",
     * //      "msg": "This is an error",
     * //      ...
     * //   }
     */
    toJSON(format) {
        return stringify(this.value, this._replacer, format? 4 : 0);
    }
    
    /**
     * Checks if value is an Error or Error-like object
     * @private
     * @param  {*}       val Value to test
     * @return {Boolean}     Whether the value is an Error or Error-like object
     */
    static isError(val) {
        return !!val && typeof val === 'object' && (
            val instanceof Error || (
                val.hasOwnProperty('message') && val.hasOwnProperty('stack')
            )
        );
    }
}

module.exports = LogMessage;


/***/ }),

/***/ "../node_modules/once/once.js":
/*!************************************!*\
  !*** ../node_modules/once/once.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var wrappy = __webpack_require__(/*! wrappy */ "../node_modules/wrappy/wrappy.js")
module.exports = wrappy(once)
module.exports.strict = wrappy(onceStrict)

once.proto = once(function () {
  Object.defineProperty(Function.prototype, 'once', {
    value: function () {
      return once(this)
    },
    configurable: true
  })

  Object.defineProperty(Function.prototype, 'onceStrict', {
    value: function () {
      return onceStrict(this)
    },
    configurable: true
  })
})

function once (fn) {
  var f = function () {
    if (f.called) return f.value
    f.called = true
    return f.value = fn.apply(this, arguments)
  }
  f.called = false
  return f
}

function onceStrict (fn) {
  var f = function () {
    if (f.called)
      throw new Error(f.onceError)
    f.called = true
    return f.value = fn.apply(this, arguments)
  }
  var name = fn.name || 'Function wrapped with `once`'
  f.onceError = name + " shouldn't be called more than once"
  f.called = false
  return f
}


/***/ }),

/***/ "../node_modules/supports-color/index.js":
/*!***********************************************!*\
  !*** ../node_modules/supports-color/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const os = __webpack_require__(/*! os */ "os");
const hasFlag = __webpack_require__(/*! has-flag */ "../node_modules/has-flag/index.js");

const {env} = process;

let forceColor;
if (hasFlag('no-color') ||
	hasFlag('no-colors') ||
	hasFlag('color=false') ||
	hasFlag('color=never')) {
	forceColor = 0;
} else if (hasFlag('color') ||
	hasFlag('colors') ||
	hasFlag('color=true') ||
	hasFlag('color=always')) {
	forceColor = 1;
}
if ('FORCE_COLOR' in env) {
	if (env.FORCE_COLOR === true || env.FORCE_COLOR === 'true') {
		forceColor = 1;
	} else if (env.FORCE_COLOR === false || env.FORCE_COLOR === 'false') {
		forceColor = 0;
	} else {
		forceColor = env.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(env.FORCE_COLOR, 10), 3);
	}
}

function translateLevel(level) {
	if (level === 0) {
		return false;
	}

	return {
		level,
		hasBasic: true,
		has256: level >= 2,
		has16m: level >= 3
	};
}

function supportsColor(stream) {
	if (forceColor === 0) {
		return 0;
	}

	if (hasFlag('color=16m') ||
		hasFlag('color=full') ||
		hasFlag('color=truecolor')) {
		return 3;
	}

	if (hasFlag('color=256')) {
		return 2;
	}

	if (stream && !stream.isTTY && forceColor === undefined) {
		return 0;
	}

	const min = forceColor || 0;

	if (env.TERM === 'dumb') {
		return min;
	}

	if (process.platform === 'win32') {
		// Node.js 7.5.0 is the first version of Node.js to include a patch to
		// libuv that enables 256 color output on Windows. Anything earlier and it
		// won't work. However, here we target Node.js 8 at minimum as it is an LTS
		// release, and Node.js 7 is not. Windows 10 build 10586 is the first Windows
		// release that supports 256 colors. Windows 10 build 14931 is the first release
		// that supports 16m/TrueColor.
		const osRelease = os.release().split('.');
		if (
			Number(process.versions.node.split('.')[0]) >= 8 &&
			Number(osRelease[0]) >= 10 &&
			Number(osRelease[2]) >= 10586
		) {
			return Number(osRelease[2]) >= 14931 ? 3 : 2;
		}

		return 1;
	}

	if ('CI' in env) {
		if (['TRAVIS', 'CIRCLECI', 'APPVEYOR', 'GITLAB_CI'].some(sign => sign in env) || env.CI_NAME === 'codeship') {
			return 1;
		}

		return min;
	}

	if ('TEAMCITY_VERSION' in env) {
		return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
	}

	if (env.COLORTERM === 'truecolor') {
		return 3;
	}

	if ('TERM_PROGRAM' in env) {
		const version = parseInt((env.TERM_PROGRAM_VERSION || '').split('.')[0], 10);

		switch (env.TERM_PROGRAM) {
			case 'iTerm.app':
				return version >= 3 ? 3 : 2;
			case 'Apple_Terminal':
				return 2;
			// No default
		}
	}

	if (/-256(color)?$/i.test(env.TERM)) {
		return 2;
	}

	if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
		return 1;
	}

	if ('COLORTERM' in env) {
		return 1;
	}

	return min;
}

function getSupportLevel(stream) {
	const level = supportsColor(stream);
	return translateLevel(level);
}

module.exports = {
	supportsColor: getSupportLevel,
	stdout: getSupportLevel(process.stdout),
	stderr: getSupportLevel(process.stderr)
};


/***/ }),

/***/ "../node_modules/wrappy/wrappy.js":
/*!****************************************!*\
  !*** ../node_modules/wrappy/wrappy.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Returns a wrapper function that returns a wrapped callback
// The wrapper function should do some stuff, and return a
// presumably different callback function.
// This makes sure that own properties are retained, so that
// decorations and such are not lost along the way.
module.exports = wrappy
function wrappy (fn, cb) {
  if (fn && cb) return wrappy(fn)(cb)

  if (typeof fn !== 'function')
    throw new TypeError('need wrapper function')

  Object.keys(fn).forEach(function (k) {
    wrapper[k] = fn[k]
  })

  return wrapper

  function wrapper() {
    var args = new Array(arguments.length)
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i]
    }
    var ret = fn.apply(this, args)
    var cb = args[args.length-1]
    if (typeof ret === 'function' && ret !== cb) {
      Object.keys(cb).forEach(function (k) {
        ret[k] = cb[k]
      })
    }
    return ret
  }
}


/***/ }),

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/axios */ "./node_modules/axios/lib/axios.js");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/http.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/adapters/http.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "./node_modules/axios/lib/core/settle.js");
var buildFullPath = __webpack_require__(/*! ../core/buildFullPath */ "./node_modules/axios/lib/core/buildFullPath.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var http = __webpack_require__(/*! http */ "http");
var https = __webpack_require__(/*! https */ "https");
var httpFollow = __webpack_require__(/*! follow-redirects */ "../node_modules/follow-redirects/index.js").http;
var httpsFollow = __webpack_require__(/*! follow-redirects */ "../node_modules/follow-redirects/index.js").https;
var url = __webpack_require__(/*! url */ "url");
var zlib = __webpack_require__(/*! zlib */ "zlib");
var pkg = __webpack_require__(/*! ./../../package.json */ "./node_modules/axios/package.json");
var createError = __webpack_require__(/*! ../core/createError */ "./node_modules/axios/lib/core/createError.js");
var enhanceError = __webpack_require__(/*! ../core/enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");

var isHttps = /https:?/;

/*eslint consistent-return:0*/
module.exports = function httpAdapter(config) {
  return new Promise(function dispatchHttpRequest(resolvePromise, rejectPromise) {
    var resolve = function resolve(value) {
      resolvePromise(value);
    };
    var reject = function reject(value) {
      rejectPromise(value);
    };
    var data = config.data;
    var headers = config.headers;

    // Set User-Agent (required by some servers)
    // Only set header if it hasn't been set in config
    // See https://github.com/axios/axios/issues/69
    if (!headers['User-Agent'] && !headers['user-agent']) {
      headers['User-Agent'] = 'axios/' + pkg.version;
    }

    if (data && !utils.isStream(data)) {
      if (Buffer.isBuffer(data)) {
        // Nothing to do...
      } else if (utils.isArrayBuffer(data)) {
        data = Buffer.from(new Uint8Array(data));
      } else if (utils.isString(data)) {
        data = Buffer.from(data, 'utf-8');
      } else {
        return reject(createError(
          'Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream',
          config
        ));
      }

      // Add Content-Length header if data exists
      headers['Content-Length'] = data.length;
    }

    // HTTP basic authentication
    var auth = undefined;
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      auth = username + ':' + password;
    }

    // Parse url
    var fullPath = buildFullPath(config.baseURL, config.url);
    var parsed = url.parse(fullPath);
    var protocol = parsed.protocol || 'http:';

    if (!auth && parsed.auth) {
      var urlAuth = parsed.auth.split(':');
      var urlUsername = urlAuth[0] || '';
      var urlPassword = urlAuth[1] || '';
      auth = urlUsername + ':' + urlPassword;
    }

    if (auth) {
      delete headers.Authorization;
    }

    var isHttpsRequest = isHttps.test(protocol);
    var agent = isHttpsRequest ? config.httpsAgent : config.httpAgent;

    var options = {
      path: buildURL(parsed.path, config.params, config.paramsSerializer).replace(/^\?/, ''),
      method: config.method.toUpperCase(),
      headers: headers,
      agent: agent,
      agents: { http: config.httpAgent, https: config.httpsAgent },
      auth: auth
    };

    if (config.socketPath) {
      options.socketPath = config.socketPath;
    } else {
      options.hostname = parsed.hostname;
      options.port = parsed.port;
    }

    var proxy = config.proxy;
    if (!proxy && proxy !== false) {
      var proxyEnv = protocol.slice(0, -1) + '_proxy';
      var proxyUrl = process.env[proxyEnv] || process.env[proxyEnv.toUpperCase()];
      if (proxyUrl) {
        var parsedProxyUrl = url.parse(proxyUrl);
        var noProxyEnv = process.env.no_proxy || process.env.NO_PROXY;
        var shouldProxy = true;

        if (noProxyEnv) {
          var noProxy = noProxyEnv.split(',').map(function trim(s) {
            return s.trim();
          });

          shouldProxy = !noProxy.some(function proxyMatch(proxyElement) {
            if (!proxyElement) {
              return false;
            }
            if (proxyElement === '*') {
              return true;
            }
            if (proxyElement[0] === '.' &&
                parsed.hostname.substr(parsed.hostname.length - proxyElement.length) === proxyElement) {
              return true;
            }

            return parsed.hostname === proxyElement;
          });
        }


        if (shouldProxy) {
          proxy = {
            host: parsedProxyUrl.hostname,
            port: parsedProxyUrl.port
          };

          if (parsedProxyUrl.auth) {
            var proxyUrlAuth = parsedProxyUrl.auth.split(':');
            proxy.auth = {
              username: proxyUrlAuth[0],
              password: proxyUrlAuth[1]
            };
          }
        }
      }
    }

    if (proxy) {
      options.hostname = proxy.host;
      options.host = proxy.host;
      options.headers.host = parsed.hostname + (parsed.port ? ':' + parsed.port : '');
      options.port = proxy.port;
      options.path = protocol + '//' + parsed.hostname + (parsed.port ? ':' + parsed.port : '') + options.path;

      // Basic proxy authorization
      if (proxy.auth) {
        var base64 = Buffer.from(proxy.auth.username + ':' + proxy.auth.password, 'utf8').toString('base64');
        options.headers['Proxy-Authorization'] = 'Basic ' + base64;
      }
    }

    var transport;
    var isHttpsProxy = isHttpsRequest && (proxy ? isHttps.test(proxy.protocol) : true);
    if (config.transport) {
      transport = config.transport;
    } else if (config.maxRedirects === 0) {
      transport = isHttpsProxy ? https : http;
    } else {
      if (config.maxRedirects) {
        options.maxRedirects = config.maxRedirects;
      }
      transport = isHttpsProxy ? httpsFollow : httpFollow;
    }

    if (config.maxBodyLength > -1) {
      options.maxBodyLength = config.maxBodyLength;
    }

    // Create the request
    var req = transport.request(options, function handleResponse(res) {
      if (req.aborted) return;

      // uncompress the response body transparently if required
      var stream = res;

      // return the last request in case of redirects
      var lastRequest = res.req || req;


      // if no content, is HEAD request or decompress disabled we should not decompress
      if (res.statusCode !== 204 && lastRequest.method !== 'HEAD' && config.decompress !== false) {
        switch (res.headers['content-encoding']) {
        /*eslint default-case:0*/
        case 'gzip':
        case 'compress':
        case 'deflate':
        // add the unzipper to the body stream processing pipeline
          stream = stream.pipe(zlib.createUnzip());

          // remove the content-encoding in order to not confuse downstream operations
          delete res.headers['content-encoding'];
          break;
        }
      }

      var response = {
        status: res.statusCode,
        statusText: res.statusMessage,
        headers: res.headers,
        config: config,
        request: lastRequest
      };

      if (config.responseType === 'stream') {
        response.data = stream;
        settle(resolve, reject, response);
      } else {
        var responseBuffer = [];
        stream.on('data', function handleStreamData(chunk) {
          responseBuffer.push(chunk);

          // make sure the content length is not over the maxContentLength if specified
          if (config.maxContentLength > -1 && Buffer.concat(responseBuffer).length > config.maxContentLength) {
            stream.destroy();
            reject(createError('maxContentLength size of ' + config.maxContentLength + ' exceeded',
              config, null, lastRequest));
          }
        });

        stream.on('error', function handleStreamError(err) {
          if (req.aborted) return;
          reject(enhanceError(err, config, null, lastRequest));
        });

        stream.on('end', function handleStreamEnd() {
          var responseData = Buffer.concat(responseBuffer);
          if (config.responseType !== 'arraybuffer') {
            responseData = responseData.toString(config.responseEncoding);
            if (!config.responseEncoding || config.responseEncoding === 'utf8') {
              responseData = utils.stripBOM(responseData);
            }
          }

          response.data = responseData;
          settle(resolve, reject, response);
        });
      }
    });

    // Handle errors
    req.on('error', function handleRequestError(err) {
      if (req.aborted && err.code !== 'ERR_FR_TOO_MANY_REDIRECTS') return;
      reject(enhanceError(err, config, null, req));
    });

    // Handle request timeout
    if (config.timeout) {
      // Sometime, the response will be very slow, and does not respond, the connect event will be block by event loop system.
      // And timer callback will be fired, and abort() will be invoked before connection, then get "socket hang up" and code ECONNRESET.
      // At this time, if we have a large number of request, nodejs will hang up some socket on background. and the number will up and up.
      // And then these socket which be hang up will devoring CPU little by little.
      // ClientRequest.setTimeout will be fired on the specify milliseconds, and can make sure that abort() will be fired after connect.
      req.setTimeout(config.timeout, function handleRequestTimeout() {
        req.abort();
        reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED', req));
      });
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (req.aborted) return;

        req.abort();
        reject(cancel);
      });
    }

    // Send the request
    if (utils.isStream(data)) {
      data.on('error', function handleStreamError(err) {
        reject(enhanceError(err, config, null, req));
      }).pipe(req);
    } else {
      req.end(data);
    }
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "./node_modules/axios/lib/core/settle.js");
var cookies = __webpack_require__(/*! ./../helpers/cookies */ "./node_modules/axios/lib/helpers/cookies.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var buildFullPath = __webpack_require__(/*! ../core/buildFullPath */ "./node_modules/axios/lib/core/buildFullPath.js");
var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "./node_modules/axios/lib/helpers/parseHeaders.js");
var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js");
var createError = __webpack_require__(/*! ../core/createError */ "./node_modules/axios/lib/core/createError.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    if (
      (utils.isBlob(requestData) || utils.isFile(requestData)) &&
      requestData.type
    ) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = unescape(encodeURIComponent(config.auth.password)) || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (!requestData) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var Axios = __webpack_require__(/*! ./core/Axios */ "./node_modules/axios/lib/core/Axios.js");
var mergeConfig = __webpack_require__(/*! ./core/mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");
var defaults = __webpack_require__(/*! ./defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "./node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(/*! ./helpers/spread */ "./node_modules/axios/lib/helpers/spread.js");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(/*! ./Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var buildURL = __webpack_require__(/*! ../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "./node_modules/axios/lib/core/InterceptorManager.js");
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "./node_modules/axios/lib/core/dispatchRequest.js");
var mergeConfig = __webpack_require__(/*! ./mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ "./node_modules/axios/lib/core/buildFullPath.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/buildFullPath.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isAbsoluteURL = __webpack_require__(/*! ../helpers/isAbsoluteURL */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js");
var combineURLs = __webpack_require__(/*! ../helpers/combineURLs */ "./node_modules/axios/lib/helpers/combineURLs.js");

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var transformData = __webpack_require__(/*! ./transformData */ "./node_modules/axios/lib/core/transformData.js");
var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");
var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/mergeConfig.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/mergeConfig.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  var valueFromConfig2Keys = ['url', 'method', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy', 'params'];
  var defaultToConfig2Keys = [
    'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'timeoutMessage', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'decompress',
    'maxContentLength', 'maxBodyLength', 'maxRedirects', 'transport', 'httpAgent',
    'httpsAgent', 'cancelToken', 'socketPath', 'responseEncoding'
  ];
  var directMergeKeys = ['validateStatus'];

  function getMergedValue(target, source) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge(target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  function mergeDeepProperties(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  }

  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    }
  });

  utils.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);

  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  utils.forEach(directMergeKeys, function merge(prop) {
    if (prop in config2) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  var axiosKeys = valueFromConfig2Keys
    .concat(mergeDeepPropertiesKeys)
    .concat(defaultToConfig2Keys)
    .concat(directMergeKeys);

  var otherKeys = Object
    .keys(config1)
    .concat(Object.keys(config2))
    .filter(function filterAxiosKeys(key) {
      return axiosKeys.indexOf(key) === -1;
    });

  utils.forEach(otherKeys, mergeDeepProperties);

  return config;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(/*! ./createError */ "./node_modules/axios/lib/core/createError.js");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ "./node_modules/axios/lib/helpers/normalizeHeaderName.js");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ./adapters/xhr */ "./node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ./adapters/http */ "./node_modules/axios/lib/adapters/http.js");
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;


/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function encode(val) {
  return encodeURIComponent(val).
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */
function isPlainObject(val) {
  if (toString.call(val) !== '[object Object]') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */
function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isPlainObject: isPlainObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim,
  stripBOM: stripBOM
};


/***/ }),

/***/ "./node_modules/axios/package.json":
/*!*****************************************!*\
  !*** ./node_modules/axios/package.json ***!
  \*****************************************/
/*! exports provided: name, version, description, main, scripts, repository, keywords, author, license, bugs, homepage, devDependencies, browser, jsdelivr, unpkg, typings, dependencies, bundlesize, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"name\":\"axios\",\"version\":\"0.20.0\",\"description\":\"Promise based HTTP client for the browser and node.js\",\"main\":\"index.js\",\"scripts\":{\"test\":\"grunt test && bundlesize\",\"start\":\"node ./sandbox/server.js\",\"build\":\"NODE_ENV=production grunt build\",\"preversion\":\"npm test\",\"version\":\"npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json\",\"postversion\":\"git push && git push --tags\",\"examples\":\"node ./examples/server.js\",\"coveralls\":\"cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js\",\"fix\":\"eslint --fix lib/**/*.js\"},\"repository\":{\"type\":\"git\",\"url\":\"https://github.com/axios/axios.git\"},\"keywords\":[\"xhr\",\"http\",\"ajax\",\"promise\",\"node\"],\"author\":\"Matt Zabriskie\",\"license\":\"MIT\",\"bugs\":{\"url\":\"https://github.com/axios/axios/issues\"},\"homepage\":\"https://github.com/axios/axios\",\"devDependencies\":{\"bundlesize\":\"^0.17.0\",\"coveralls\":\"^3.0.0\",\"es6-promise\":\"^4.2.4\",\"grunt\":\"^1.0.2\",\"grunt-banner\":\"^0.6.0\",\"grunt-cli\":\"^1.2.0\",\"grunt-contrib-clean\":\"^1.1.0\",\"grunt-contrib-watch\":\"^1.0.0\",\"grunt-eslint\":\"^20.1.0\",\"grunt-karma\":\"^2.0.0\",\"grunt-mocha-test\":\"^0.13.3\",\"grunt-ts\":\"^6.0.0-beta.19\",\"grunt-webpack\":\"^1.0.18\",\"istanbul-instrumenter-loader\":\"^1.0.0\",\"jasmine-core\":\"^2.4.1\",\"karma\":\"^1.3.0\",\"karma-chrome-launcher\":\"^2.2.0\",\"karma-coverage\":\"^1.1.1\",\"karma-firefox-launcher\":\"^1.1.0\",\"karma-jasmine\":\"^1.1.1\",\"karma-jasmine-ajax\":\"^0.1.13\",\"karma-opera-launcher\":\"^1.0.0\",\"karma-safari-launcher\":\"^1.0.0\",\"karma-sauce-launcher\":\"^1.2.0\",\"karma-sinon\":\"^1.0.5\",\"karma-sourcemap-loader\":\"^0.3.7\",\"karma-webpack\":\"^1.7.0\",\"load-grunt-tasks\":\"^3.5.2\",\"minimist\":\"^1.2.0\",\"mocha\":\"^5.2.0\",\"sinon\":\"^4.5.0\",\"typescript\":\"^2.8.1\",\"url-search-params\":\"^0.10.0\",\"webpack\":\"^1.13.1\",\"webpack-dev-server\":\"^1.14.1\"},\"browser\":{\"./lib/adapters/http.js\":\"./lib/adapters/xhr.js\"},\"jsdelivr\":\"dist/axios.min.js\",\"unpkg\":\"dist/axios.min.js\",\"typings\":\"./index.d.ts\",\"dependencies\":{\"follow-redirects\":\"^1.10.0\"},\"bundlesize\":[{\"path\":\"./dist/axios.min.js\",\"threshold\":\"5kB\"}]}");

/***/ }),

/***/ "./src/contactsCreate/index.ts":
/*!*************************************!*\
  !*** ./src/contactsCreate/index.ts ***!
  \*************************************/
/*! exports provided: handler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "handler", function() { return handler; });
/* harmony import */ var _middy_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @middy/core */ "../node_modules/@middy/core/index.js");
/* harmony import */ var _middy_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_middy_core__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var http_method_enum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! http-method-enum */ "../node_modules/http-method-enum/dist-web/index.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib */ "./src/lib/index.ts");
/* harmony import */ var _contactsGet__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../contactsGet */ "./src/contactsGet/index.ts");





const contactsCreate = async (event, context, callback) => {
  const request = {
    data: event.arguments.input,
    method: http_method_enum__WEBPACK_IMPORTED_MODULE_1__["HTTPMethod"].POST,
    url: "/layouts/contactdetails/records"
  };
  await Object(_lib__WEBPACK_IMPORTED_MODULE_2__["client"])().request(request);
  return Object(_contactsGet__WEBPACK_IMPORTED_MODULE_3__["contactsGet"])(event, context, callback);
};

const handler = _middy_core__WEBPACK_IMPORTED_MODULE_0___default()(contactsCreate).use(_lib__WEBPACK_IMPORTED_MODULE_2__["defaultMw"]);

/***/ }),

/***/ "./src/contactsGet/index.ts":
/*!**********************************!*\
  !*** ./src/contactsGet/index.ts ***!
  \**********************************/
/*! exports provided: contactsGet, handler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "contactsGet", function() { return contactsGet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "handler", function() { return handler; });
/* harmony import */ var _middy_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @middy/core */ "../node_modules/@middy/core/index.js");
/* harmony import */ var _middy_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_middy_core__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var http_method_enum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! http-method-enum */ "../node_modules/http-method-enum/dist-web/index.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib */ "./src/lib/index.ts");



const contactsGet = async () => {
  const request = {
    method: http_method_enum__WEBPACK_IMPORTED_MODULE_1__["HTTPMethod"].GET,
    url: "/layouts/contactdetails/records"
  };
  const response = await Object(_lib__WEBPACK_IMPORTED_MODULE_2__["client"])().request(request);
  return response.data;
};
const handler = _middy_core__WEBPACK_IMPORTED_MODULE_0___default()(contactsGet).use(_lib__WEBPACK_IMPORTED_MODULE_2__["defaultMw"]);

/***/ }),

/***/ "./src/lib/client.ts":
/*!***************************!*\
  !*** ./src/lib/client.ts ***!
  \***************************/
/*! exports provided: client */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "client", function() { return client; });
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! http */ "http");
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(http__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var https__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! https */ "https");
/* harmony import */ var https__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(https__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);



const client = () => {
  // TODO: get token dynamically
  const token = "6b17554bb93bbb45580eb85b085e6a78bee348b9d081ed5ec46d";
  const base = {
    baseURL: "https://localhost/fmi/data/vLatest/databases/contacts",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    // keepAlive pools and reuses TCP connections, so it's faster
    // HACK: allow self signed certs
    httpAgent: new http__WEBPACK_IMPORTED_MODULE_0___default.a.Agent({
      keepAlive: true
    }),
    httpsAgent: new https__WEBPACK_IMPORTED_MODULE_1___default.a.Agent({
      keepAlive: true,
      rejectUnauthorized: false
    }),
    // cap the maximum content length we'll accept to 50MBs, just in case
    maxContentLength: 50 * 1000 * 1000,
    maxRedirects: 10,
    timeout: 60000
  };
  return axios__WEBPACK_IMPORTED_MODULE_2___default.a.create(base);
};

/***/ }),

/***/ "./src/lib/default-mw.ts":
/*!*******************************!*\
  !*** ./src/lib/default-mw.ts ***!
  \*******************************/
/*! exports provided: defaultMw */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultMw", function() { return defaultMw; });
/* harmony import */ var _middy_do_not_wait_for_empty_event_loop__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @middy/do-not-wait-for-empty-event-loop */ "../node_modules/@middy/do-not-wait-for-empty-event-loop/index.js");
/* harmony import */ var _middy_do_not_wait_for_empty_event_loop__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_middy_do_not_wait_for_empty_event_loop__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _middy_http_header_normalizer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @middy/http-header-normalizer */ "../node_modules/@middy/http-header-normalizer/index.js");
/* harmony import */ var _middy_http_header_normalizer__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_middy_http_header_normalizer__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _middleware_error_handler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./middleware/error-handler */ "./src/lib/middleware/error-handler.ts");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./logger */ "./src/lib/logger.ts");




const defaultMw = [_middy_do_not_wait_for_empty_event_loop__WEBPACK_IMPORTED_MODULE_0___default()(), _middy_http_header_normalizer__WEBPACK_IMPORTED_MODULE_1___default()(), Object(_middleware_error_handler__WEBPACK_IMPORTED_MODULE_2__["errorHandler"])(_logger__WEBPACK_IMPORTED_MODULE_3__["logger"])];

/***/ }),

/***/ "./src/lib/index.ts":
/*!**************************!*\
  !*** ./src/lib/index.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./client */ "./src/lib/client.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "client", function() { return _client__WEBPACK_IMPORTED_MODULE_0__["client"]; });

/* harmony import */ var _default_mw__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./default-mw */ "./src/lib/default-mw.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "defaultMw", function() { return _default_mw__WEBPACK_IMPORTED_MODULE_1__["defaultMw"]; });

/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./logger */ "./src/lib/logger.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "logger", function() { return _logger__WEBPACK_IMPORTED_MODULE_2__["logger"]; });

/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./types */ "./src/lib/types.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _types__WEBPACK_IMPORTED_MODULE_3__) if(["default","client","defaultMw","logger"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _types__WEBPACK_IMPORTED_MODULE_3__[key]; }) }(__WEBPACK_IMPORT_KEY__));





/***/ }),

/***/ "./src/lib/logger.ts":
/*!***************************!*\
  !*** ./src/lib/logger.ts ***!
  \***************************/
/*! exports provided: logger */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "logger", function() { return logger; });
/* harmony import */ var lambda_log__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lambda-log */ "../node_modules/lambda-log/index.js");
/* harmony import */ var lambda_log__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lambda_log__WEBPACK_IMPORTED_MODULE_0__);
 // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call

const logger = new lambda_log__WEBPACK_IMPORTED_MODULE_0__["LambdaLog"]({
  dev: true
});

/***/ }),

/***/ "./src/lib/middleware/error-handler.ts":
/*!*********************************************!*\
  !*** ./src/lib/middleware/error-handler.ts ***!
  \*********************************************/
/*! exports provided: errorHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "errorHandler", function() { return errorHandler; });
/* harmony import */ var http_status_codes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! http-status-codes */ "../node_modules/http-status-codes/build/es/index.js");
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

/* eslint-disable @typescript-eslint/no-unsafe-member-access */

/* eslint-disable no-param-reassign */


const removeUndefined = obj => Object.entries(obj).reduce((a, [k, v]) => v === undefined ? a : { ...a,
  [k]: v
}, {}); // A generic server error


const serverErrResponse = {
  code: http_status_codes__WEBPACK_IMPORTED_MODULE_0__["default"].INTERNAL_SERVER_ERROR,
  message: http_status_codes__WEBPACK_IMPORTED_MODULE_0__["default"].getStatusText(http_status_codes__WEBPACK_IMPORTED_MODULE_0__["default"].INTERNAL_SERVER_ERROR)
}; // A gateway timeout error

const gwTOutErrResponse = {
  code: http_status_codes__WEBPACK_IMPORTED_MODULE_0__["default"].GATEWAY_TIMEOUT,
  message: http_status_codes__WEBPACK_IMPORTED_MODULE_0__["default"].getStatusText(http_status_codes__WEBPACK_IMPORTED_MODULE_0__["default"].GATEWAY_TIMEOUT)
};
const errorHandler = logger => ({
  onError: (handler, next) => {
    if (!logger || !(handler.error instanceof Error)) {
      return next();
    } // HACK - logger.error not printing to console in mock mode


    if (true) {
      // eslint-disable-next-line @typescript-eslint/unbound-method
      logger.error = logger.info;
    }

    try {
      var _handler$response;

      const {
        context,
        event
      } = handler;
      const error = handler.error;
      const {
        baseURL,
        data,
        headers,
        method,
        params
      } = error.config;
      const axiosRequest = removeUndefined({
        baseURL,
        data,
        headers,
        method,
        params
      });
      logger.options.meta = {
        axiosRequest,
        context,
        event
      }; // The request was made and the server responded with a status code that falls out of the range of 2xx

      if (error.response) {
        const {
          data: respData,
          status,
          statusText
        } = error.response;
        const response = { ...respData,
          status,
          statusText
        };
        logger.error("gateway_error", {
          response
        });
        handler.response = response;
        return next();
      } // The request was made but no response was received


      if (error.request) {
        logger.error("gateway_timeout");
        handler.response = {
          messages: [gwTOutErrResponse]
        };
        return next();
      } // Something unknown happened during function invocation that triggered an Error


      logger.error("function_error", {
        error: handler.error.message
      }); // If response.error has not already been set, set to generic error

      if (!((_handler$response = handler.response) === null || _handler$response === void 0 ? void 0 : _handler$response.error)) {
        handler.response = {
          messages: [serverErrResponse]
        };
      }

      return next();
    } catch (error) {
      // Something happened in this function that caused an error
      logger.error("caught_error", {
        error
      });
      handler.response = {
        messages: [serverErrResponse]
      };
      return next();
    }
  }
});

/***/ }),

/***/ "./src/lib/types.ts":
/*!**************************!*\
  !*** ./src/lib/types.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("assert");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("https");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("os");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("stream");

/***/ }),

/***/ "tty":
/*!**********************!*\
  !*** external "tty" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("tty");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("zlib");

/***/ })

/******/ });
//# sourceMappingURL=index.js.map