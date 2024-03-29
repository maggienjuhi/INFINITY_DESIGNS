/*
 * Copyright (c) 2011, Yahoo! Inc.  All rights reserved.
 * Copyright (c) 2012, Log-Normal, Inc.  All rights reserved.
 * Copyright (c) 2014, SOASTA, Inc. All rights reserved.
 * Copyrights licensed under the BSD License. See the accompanying LICENSE.txt file for terms.
 */

/**
\file boomerang.js
boomerang measures various performance characteristics of your user's browsing
experience and beacons it back to your server.

\details
To use this you'll need a web site, lots of users and the ability to do
something with the data you collect.  How you collect the data is up to
you, but we have a few ideas.
*/

/*eslint-env browser*/
/*global BOOMR:true, BOOMR_start:true, BOOMR_lstart:true, console:false*/
/*eslint no-mixed-spaces-and-tabs:[2, true], console:0, camelcase:0, strict:0, quotes:[2, "double", "avoid-escape"], new-cap:0*/
/*eslint space-infix-ops:0, no-console:0, no-delete-var:0, no-space-before-semi:0, no-multi-spaces:1, space-unary-ops: 0, key-spacing: 0, dot-notation: [2, {"allowKeywords": false }]*/

// Measure the time the script started
// This has to be global so that we don't wait for the entire
// BOOMR function to download and execute before measuring the
// time.  We also declare it without `var` so that we can later
// `delete` it.  This is the only way that works on Internet Explorer
BOOMR_start = new Date().getTime();

/**
 Check the value of document.domain and fix it if incorrect.
 This function is run at the top of boomerang, and then whenever
 init() is called.  If boomerang is running within an iframe, this
 function checks to see if it can access elements in the parent
 iframe.  If not, it will fudge around with document.domain until
 it finds a value that works.

 This allows customers to change the value of document.domain at
 any point within their page's load process, and we will adapt to
 it.
 */
function BOOMR_check_doc_domain(domain) {
	/*eslint no-unused-vars:0*/
	var test;

	// If domain is not passed in, then this is a global call
	// domain is only passed in if we call ourselves, so we
	// skip the frame check at that point
	if(!domain) {
		// If we're running in the main window, then we don't need this
		if(window.parent === window || !document.getElementById("boomr-if-as")) {
			return;// true;	// nothing to do
		}

		domain = document.domain;
	}

	if(domain.indexOf(".") === -1) {
		return;// false;	// not okay, but we did our best
	}

	// 1. Test without setting document.domain
	try {
		test = window.parent.document;
		return;// test !== undefined;	// all okay
	}
	// 2. Test with document.domain
	catch(err) {
		document.domain = domain;
	}
	try {
		test = window.parent.document;
		return;// test !== undefined;	// all okay
	}
	// 3. Strip off leading part and try again
	catch(err) {
		domain = domain.replace(/^[\w\-]+\./, "");
	}

	BOOMR_check_doc_domain(domain);
}

BOOMR_check_doc_domain();


// beaconing section
// the parameter is the window
(function(w) {

var impl, boomr, d, myurl, createCustomEvent, dispatchEvent, visibilityState, visibilityChange;

// This is the only block where we use document without the w. qualifier
if(w.parent !== w
		&& document.getElementById("boomr-if-as")
		&& document.getElementById("boomr-if-as").nodeName.toLowerCase() === "script") {
	w = w.parent;
	myurl = document.getElementById("boomr-if-as").src;
}

d = w.document;

// Short namespace because I don't want to keep typing BOOMERANG
if(!w.BOOMR) { w.BOOMR = {}; }
BOOMR = w.BOOMR;
// don't allow this code to be included twice
if(BOOMR.version) {
	return;
}

BOOMR.version = "0.9.1445442589";
BOOMR.window = w;

if (!BOOMR.plugins) { BOOMR.plugins = {}; }

// CustomEvent proxy for IE9 & 10 from https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent
(function() {
	try {
		if (new w.CustomEvent("CustomEvent") !== undefined) {
			createCustomEvent = function (e_name, params) {
				return new w.CustomEvent(e_name, params);
			};
		}
	}
	catch(ignore) {
	}

	try {
		if (!createCustomEvent && d.createEvent && d.createEvent( "CustomEvent" )) {
			createCustomEvent = function (e_name, params) {
				var evt = d.createEvent( "CustomEvent" );
				params = params || { cancelable: false, bubbles: false };
				evt.initCustomEvent( e_name, params.bubbles, params.cancelable, params.detail );

				return evt;
			};
		}
	}
	catch(ignore) {
	}

	if (!createCustomEvent && d.createEventObject) {
		createCustomEvent = function (e_name, params) {
			var evt = d.createEventObject();
			evt.type = evt.propertyName = e_name;
			evt.detail = params.detail;

			return evt;
		};
	}

	if(!createCustomEvent) {
		createCustomEvent = function() { return undefined; };
	}
}());

/**
 dispatch a custom event to the browser
 @param e_name	The custom event name that consumers can subscribe to
 @param e_data	Any data passed to subscribers of the custom event via the `event.detail` property
 @param async	By default, custom events are dispatched immediately.
		Set to true if the event should be dispatched once the browser has finished its current
		JavaScript execution.
 */
dispatchEvent = function(e_name, e_data, async) {
	var ev = createCustomEvent(e_name, {"detail": e_data});
	if (!ev) {
		return;
	}

	function dispatch() {
		if(d.dispatchEvent) {
			d.dispatchEvent(ev);
		}
		else if(d.fireEvent) {
			d.fireEvent("onpropertychange", ev);
		}
	}

	if(async) {
		BOOMR.setImmediate(dispatch);
	}
	else {
		dispatch();
	}
};

// visibilitychange is useful to detect if the page loaded through prerender
// or if the page never became visible
// http://www.w3.org/TR/2011/WD-page-visibility-20110602/
// http://www.nczonline.net/blog/2011/08/09/introduction-to-the-page-visibility-api/
// https://developer.mozilla.org/en-US/docs/Web/Guide/User_experience/Using_the_Page_Visibility_API

// Set the name of the hidden property and the change event for visibility
if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support
	visibilityState = "visibilityState";
	visibilityChange = "visibilitychange";
}
else if (typeof document.mozHidden !== "undefined") {
	visibilityState = "mozVisibilityState";
	visibilityChange = "mozvisibilitychange";
}
else if (typeof document.msHidden !== "undefined") {
	visibilityState = "msVisibilityState";
	visibilityChange = "msvisibilitychange";
}
else if (typeof document.webkitHidden !== "undefined") {
	visibilityState = "webkitVisibilityState";
	visibilityChange = "webkitvisibilitychange";
}


// impl is a private object not reachable from outside the BOOMR object
// users can set properties by passing in to the init() method
impl = {
	// properties
	beacon_url: "",
	// beacon request method, either GET, POST or AUTO. AUTO will check the
	// request size then use GET if the request URL is less than 2000 chars
	// otherwise it will fall back to a POST request.
	beacon_type: "AUTO",
	// strip out everything except last two parts of hostname.
	// This doesn't work well for domains that end with a country tld,
	// but we allow the developer to override site_domain for that.
	// You can disable all cookies by setting site_domain to a falsy value
	site_domain: w.location.hostname.
				replace(/.*?([^.]+\.[^.]+)\.?$/, "$1").
				toLowerCase(),
	//! User's ip address determined on the server.  Used for the BA cookie
	user_ip: "",

	strip_query_string: false,

	onloadfired: false,

	handlers_attached: false,
	events: {
		"page_ready": [],
		"page_unload": [],
		"before_unload": [],
		"dom_loaded": [],
		"visibility_changed": [],
		"before_beacon": [],
		"onbeacon": [],
		"xhr_load": [],
		"click": [],
		"form_submit": []
	},

	public_events: {
		"before_beacon": "onBeforeBoomerangBeacon",
		"onbeacon": "onBoomerangBeacon",
		"onboomerangloaded": "onBoomerangLoaded"
	},

	vars: {},

	errors: {},

	disabled_plugins: {},

	xb_handler: function(type) {
		return function(ev) {
			var target;
			if (!ev) { ev = w.event; }
			if (ev.target) { target = ev.target; }
			else if (ev.srcElement) { target = ev.srcElement; }
			if (target.nodeType === 3) {// defeat Safari bug
				target = target.parentNode;
			}

			// don't capture events on flash objects
			// because of context slowdowns in PepperFlash
			if(target && target.nodeName.toUpperCase() === "OBJECT" && target.type === "application/x-shockwave-flash") {
				return;
			}
			impl.fireEvent(type, target);
		};
	},

	fireEvent: function(e_name, data) {
		var i, handler, handlers;

		e_name = e_name.toLowerCase();

		if(!this.events.hasOwnProperty(e_name)) {
			return false;
		}

		if (this.public_events.hasOwnProperty(e_name)) {
			dispatchEvent(this.public_events[e_name], data);
		}

		handlers = this.events[e_name];

		for(i=0; i<handlers.length; i++) {
			try {
				handler = handlers[i];
				handler.fn.call(handler.scope, data, handler.cb_data);
			}
			catch(err) {
				BOOMR.addError(err, "fireEvent." + e_name + "<" + i + ">");
			}
		}

		return true;
	}
};


// We create a boomr object and then copy all its properties to BOOMR so that
// we don't overwrite anything additional that was added to BOOMR before this
// was called... for example, a plugin.
boomr = {
	t_lstart: null,
	t_start: BOOMR_start,
	t_end: null,

	url: myurl,

	// Utility functions
	utils: {
		objectToString: function(o, separator, nest_level) {
			var value = [], k;

			if(!o || typeof o !== "object") {
				return o;
			}
			if(separator === undefined) {
				separator="\n\t";
			}
			if(!nest_level) {
				nest_level=0;
			}

			if (Object.prototype.toString.call(o) === "[object Array]") {
				for(k=0; k<o.length; k++) {
					if (nest_level > 0 && o[k] !== null && typeof o[k] === "object") {
						value.push(
							this.objectToString(
								o[k],
								separator + (separator === "\n\t" ? "\t" : ""),
								nest_level-1
							)
						);
					}
					else {
						if (separator === "&") {
							value.push(encodeURIComponent(o[k]));
						}
						else {
							value.push(o[k]);
						}
					}
				}
				separator = ",";
			}
			else {
				for(k in o) {
					if(Object.prototype.hasOwnProperty.call(o, k)) {
						if (nest_level > 0 && o[k] !== null && typeof o[k] === "object") {
							value.push(encodeURIComponent(k) + "=" +
								this.objectToString(
									o[k],
									separator + (separator === "\n\t" ? "\t" : ""),
									nest_level-1
								)
							);
						}
						else {
							if (separator === "&") {
								value.push(encodeURIComponent(k) + "=" + encodeURIComponent(o[k]));
							}
							else {
								value.push(k + "=" + o[k]);
							}
						}
					}
				}
			}

			return value.join(separator);
		},

		getCookie: function(name) {
			if(!name) {
				return null;
			}

			name = " " + name + "=";

			var i, cookies;
			cookies = " " + d.cookie + ";";
			if ( (i=cookies.indexOf(name)) >= 0 ) {
				i += name.length;
				cookies = cookies.substring(i, cookies.indexOf(";", i));
				return cookies;
			}

			return null;
		},

		setCookie: function(name, subcookies, max_age) {
			var value, nameval, savedval, c, exp;

			if(!name || !impl.site_domain) {
				
				return false;
			}

			value = this.objectToString(subcookies, "&");
			nameval = name + "=" + value;

			c = [nameval, "path=/", "domain=" + impl.site_domain];
			if(max_age) {
				exp = new Date();
				exp.setTime(exp.getTime() + max_age*1000);
				exp = exp.toGMTString();
				c.push("expires=" + exp);
			}

			if ( nameval.length < 500 ) {
				d.cookie = c.join("; ");
				// confirm cookie was set (could be blocked by user's settings, etc.)
				savedval = this.getCookie(name);
				if(value === savedval) {
					return true;
				}
				
			}
			else {
				
			}

			return false;
		},

		getSubCookies: function(cookie) {
			var cookies_a,
			    i, l, kv,
			    gotcookies=false,
			    cookies={};

			if(!cookie) {
				return null;
			}

			if(typeof cookie !== "string") {
				
				return null;
			}

			cookies_a = cookie.split("&");

			for(i=0, l=cookies_a.length; i<l; i++) {
				kv = cookies_a[i].split("=");
				if(kv[0]) {
					kv.push("");	// just in case there's no value
					cookies[decodeURIComponent(kv[0])] = decodeURIComponent(kv[1]);
					gotcookies=true;
				}
			}

			return gotcookies ? cookies : null;
		},

		removeCookie: function(name) {
			return this.setCookie(name, {}, -86400);
		},

		cleanupURL: function(url) {
			if (!url) {
				return "";
			}
			if(impl.strip_query_string) {
				return url.replace(/\?.*/, "?qs-redacted");
			}
			return url;
		},

		hashQueryString: function(url, stripHash) {
			if(!url) {
				return url;
			}
			if(!url.match) {
				BOOMR.addError("TypeError: Not a string", "hashQueryString", typeof url);
				return "";
			}
			if(url.match(/^\/\//)) {
				url = location.protocol + url;
			}
			if(!url.match(/^(https?|file):/)) {
				
				return "";
			}
			if(stripHash) {
				url = url.replace(/#.*/, "");
			}
			if(!BOOMR.utils.MD5) {
				return url;
			}
			return url.replace(/\?([^#]*)/, function(m0, m1) { return "?" + (m1.length > 10 ? BOOMR.utils.MD5(m1) : m1); });
		},

		pluginConfig: function(o, config, plugin_name, properties) {
			var i, props=0;

			if(!config || !config[plugin_name]) {
				return false;
			}

			for(i=0; i<properties.length; i++) {
				if(config[plugin_name][properties[i]] !== undefined) {
					o[properties[i]] = config[plugin_name][properties[i]];
					props++;
				}
			}

			return (props>0);
		},

		/**
		 Add a MutationObserver for a given element and terminate after `timeout`ms.
		 @param el		DOM element to watch for mutations
		 @param config		MutationObserverInit object (https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver#MutationObserverInit)
		 @param timeout		Number of milliseconds of no mutations after which the observer should be automatically disconnected
					If set to a falsy value, the observer will wait indefinitely for Mutations.
		 @param callback	Callback function to call either on timeout or if mutations are detected.  The signature of this method is:
						function(mutations, callback_data)
					Where:
						mutations is the list of mutations detected by the observer or `undefined` if the observer timed out
						callback_data is the passed in `callback_data` parameter without modifications

					The callback function may return a falsy value to disconnect the observer after it returns, or a truthy value to
					keep watching for mutations. If the return value is numeric and greater than 0, then this will be the new timeout
					if it is boolean instead, then the timeout will not fire any more so the caller MUST call disconnect() at some point
		 @param callback_data	Any data to be passed to the callback function as its second parameter
		 @param callback_ctx	An object that represents the `this` object of the `callback` method.  Leave unset the callback function is not a method of an object

		 @returns	- `null` if a MutationObserver could not be created OR
				- An object containing the observer and the timer object:
				  { observer: <MutationObserver>, timer: <Timeout Timer if any> }

				The caller can use this to disconnect the observer at any point by calling `retval.observer.disconnect()`
				Note that the caller should first check to see if `retval.observer` is set before calling `disconnect()` as it may
				have been cleared automatically.
		 */
		addObserver: function(el, config, timeout, callback, callback_data, callback_ctx) {
			var o = {observer: null, timer: null};

			if(!window.MutationObserver || !callback || !el) {
				return null;
			}

			function done(mutations) {
				var run_again=false;

				if(o.timer) {
					clearTimeout(o.timer);
					o.timer = null;
				}

				if(callback) {
					run_again = callback.call(callback_ctx, mutations, callback_data);

					if(!run_again) {
						callback = null;
					}
				}

				if(!run_again && o.observer) {
					o.observer.disconnect();
					o.observer = null;
				}

				if(typeof run_again === "number" && run_again > 0) {
					o.timer = setTimeout(done, run_again);
				}
			}

			o.observer = new MutationObserver(done);

			if(timeout) {
				o.timer = setTimeout(done, o.timeout);
			}

			o.observer.observe(el, config);

			return o;
		},

		addListener: function(el, type, fn) {
			if (el.addEventListener) {
				el.addEventListener(type, fn, false);
			} else if (el.attachEvent) {
				el.attachEvent( "on" + type, fn );
			}
		},

		removeListener: function (el, type, fn) {
			if (el.removeEventListener) {
				el.removeEventListener(type, fn, false);
			} else if (el.detachEvent) {
				el.detachEvent("on" + type, fn);
			}
		},

		pushVars: function (form, vars, prefix) {
			var k, i, l=0, input;

			for(k in vars) {
				if(vars.hasOwnProperty(k)) {
					if(Object.prototype.toString.call(vars[k]) === "[object Array]") {
						for(i = 0; i < vars[k].length; ++i) {
							l += BOOMR.utils.pushVars(form, vars[k][i], k + "[" + i + "]");
						}
					} else {
						input = document.createElement("input");
						input.type = "hidden";	// we need `hidden` to preserve newlines. see commit message for more details
						input.name = (prefix ? (prefix + "[" + k + "]") : k);
						input.value = (vars[k]===undefined || vars[k]===null ? "" : vars[k]);

						form.appendChild(input);

						l += encodeURIComponent(input.name).length + encodeURIComponent(input.value).length + 2;
					}
				}
			}

			return l;
		},

		sendData: function (form, method) {
			var input  = document.createElement("input"),
			    urls = [ impl.beacon_url ];

			form.method = method;
			form.id = "beacon_form";

			// TODO: Determine if we want to send as JSON
			//if (window.JSON) {
			//	form.innerHTML = "";
			//	form.enctype = "text/plain";
			//	input.name = "data";
			//	input.value = JSON.stringify(impl.vars);
			//	form.appendChild(input);
			//} else {
				form.enctype = "application/x-www-form-urlencoded";
			//}

			if(impl.secondary_beacons && impl.secondary_beacons.length) {
				urls.push.apply(urls, impl.secondary_beacons);
			}


			function remove(id) {
				var el = document.getElementById(id);
				if (el) {
					el.parentNode.removeChild(el);
				}
			}

			function submit() {
				/*eslint-disable no-script-url*/
				var iframe,
				    name = "boomerang_post-" + encodeURIComponent(form.action) + "-" + Math.random();

				// ref: http://terminalapp.net/submitting-a-form-with-target-set-to-a-script-generated-iframe-on-ie/
				try {
					iframe = document.createElement('<iframe name="' + name + '">');	// IE <= 8
				}
				catch (ignore) {
					iframe = document.createElement("iframe");				// everything else
				}

				form.action = urls.shift();
				form.target = iframe.name = iframe.id = name;
				iframe.style.display = form.style.display = "none";
				iframe.src="javascript:false";

				remove(iframe.id);
				remove(form.id);

				document.body.appendChild(iframe);
				document.body.appendChild(form);

				form.submit();

				if (urls.length) {
					BOOMR.setImmediate(submit);
				}

				setTimeout(function() { remove(iframe.id); }, 10000);
			}

			submit();
		}
	},

	init: function(config) {
		var i, k,
		    properties = ["beacon_url", "beacon_type", "site_domain", "user_ip", "strip_query_string", "secondary_beacons"];

		BOOMR_check_doc_domain();

		if(!config) {
			config = {};
		}

		for(i=0; i<properties.length; i++) {
			if(config[properties[i]] !== undefined) {
				impl[properties[i]] = config[properties[i]];
			}
		}

		if(config.log !== undefined) {
			this.log = config.log;
		}
		if(!this.log) {
			this.log = function(/* m,l,s */) {};
		}

		for(k in this.plugins) {
			if(this.plugins.hasOwnProperty(k)) {
				// config[plugin].enabled has been set to false
				if( config[k]
					&& config[k].hasOwnProperty("enabled")
					&& config[k].enabled === false
				) {
					impl.disabled_plugins[k] = 1;
					continue;
				}

				// plugin was previously disabled
				if(impl.disabled_plugins[k]) {

					// and has not been explicitly re-enabled
					if( !config[k]
						|| !config[k].hasOwnProperty("enabled")
						|| config[k].enabled !== true
					) {
						continue;
					}

					// plugin is now enabled
					delete impl.disabled_plugins[k];
				}

				// plugin exists and has an init method
				if(typeof this.plugins[k].init === "function") {
					try {
						this.plugins[k].init(config);
					}
					catch(err) {
						BOOMR.addError(err, k + ".init");
					}
				}
			}
		}

		if(impl.handlers_attached) {
			return this;
		}

		// The developer can override onload by setting autorun to false
		if(!impl.onloadfired && (config.autorun === undefined || config.autorun !== false)) {
			if(d.readyState && d.readyState === "complete") {
				BOOMR.loadedLate = true;
				this.setImmediate(BOOMR.page_ready, null, null, BOOMR);
			}
			else {
				if(w.onpagehide || w.onpagehide === null) {
					BOOMR.utils.addListener(w, "pageshow", BOOMR.page_ready);
				}
				else {
					BOOMR.utils.addListener(w, "load", BOOMR.page_ready);
				}
			}
		}

		BOOMR.utils.addListener(w, "DOMContentLoaded", function() { impl.fireEvent("dom_loaded"); });

		(function() {
			var forms, iterator;
			if(visibilityChange !== undefined) {
				BOOMR.utils.addListener(d, visibilityChange, function() { impl.fireEvent("visibility_changed"); });

				// record the last time each visibility state occurred
				BOOMR.subscribe("visibility_changed", function() {
					BOOMR.lastVisibilityEvent[BOOMR.visibilityState()] = BOOMR.now();
				});
			}

			BOOMR.utils.addListener(d, "mouseup", impl.xb_handler("click"));

			forms = d.getElementsByTagName("form");
			for(iterator = 0; iterator < forms.length; iterator++) {
				BOOMR.utils.addListener(forms[iterator], "submit", impl.xb_handler("form_submit"));
			}

			if(!w.onpagehide && w.onpagehide !== null) {
				// This must be the last one to fire
				// We only clear w on browsers that don't support onpagehide because
				// those that do are new enough to not have memory leak problems of
				// some older browsers
				BOOMR.utils.addListener(w, "unload", function() { BOOMR.window=w=null; });
			}
		}());

		impl.handlers_attached = true;
		return this;
	},

	// The page dev calls this method when they determine the page is usable.
	// Only call this if autorun is explicitly set to false
	page_ready: function(ev) {
		if (!ev) { ev = w.event; }
		if (!ev) { ev = { name: "load" }; }
		if(impl.onloadfired) {
			return this;
		}
		impl.fireEvent("page_ready", ev);
		impl.onloadfired = true;
		return this;
	},

	setImmediate: function(fn, data, cb_data, cb_scope) {
		var cb = function() {
			fn.call(cb_scope || null, data, cb_data || {});
			cb=null;
		};

		if(w.setImmediate) {
			w.setImmediate(cb);
		}
		else if(w.msSetImmediate) {
			w.msSetImmediate(cb);
		}
		else if(w.webkitSetImmediate) {
			w.webkitSetImmediate(cb);
		}
		else if(w.mozSetImmediate) {
			w.mozSetImmediate(cb);
		}
		else {
			setTimeout(cb, 10);
		}
	},

	now: (function() {
		try {
			if("performance" in window && window.performance && window.performance.now) {
				return function() {
					return Math.round(window.performance.now() + window.performance.timing.navigationStart);
				};
			}
		}
		catch(ignore) { }
		return Date.now || function() { return new Date().getTime(); };
	}()),

	visibilityState: ( visibilityState === undefined ? function() { return "visible"; } : function() { return d[visibilityState]; } ),

	lastVisibilityEvent: {},

	subscribe: function(e_name, fn, cb_data, cb_scope) {
		var i, handler, ev, unload_handler;

		e_name = e_name.toLowerCase();

		if(!impl.events.hasOwnProperty(e_name)) {
			return this;
		}

		ev = impl.events[e_name];

		// don't allow a handler to be attached more than once to the same event
		for(i=0; i<ev.length; i++) {
			handler = ev[i];
			if(handler && handler.fn === fn && handler.cb_data === cb_data && handler.scope === cb_scope) {
				return this;
			}
		}
		ev.push({ "fn": fn, "cb_data": cb_data || {}, "scope": cb_scope || null });

		// attaching to page_ready after onload fires, so call soon
		if(e_name === "page_ready" && impl.onloadfired) {
			this.setImmediate(fn, null, cb_data, cb_scope);
		}

		// Attach unload handlers directly to the window.onunload and
		// window.onbeforeunload events. The first of the two to fire will clear
		// fn so that the second doesn't fire. We do this because technically
		// onbeforeunload is the right event to fire, but all browsers don't
		// support it.  This allows us to fall back to onunload when onbeforeunload
		// isn't implemented
		if(e_name === "page_unload" || e_name === "before_unload") {
			unload_handler = function(evt) {
							if(fn) {
								fn.call(cb_scope, evt || w.event, cb_data);
							}
						};

			if(e_name === "page_unload") {
				// pagehide is for iOS devices
				// see http://www.webkit.org/blog/516/webkit-page-cache-ii-the-unload-event/
				if(w.onpagehide || w.onpagehide === null) {
					BOOMR.utils.addListener(w, "pagehide", unload_handler);
				}
				else {
					BOOMR.utils.addListener(w, "unload", unload_handler);
				}
			}
			BOOMR.utils.addListener(w, "beforeunload", unload_handler);
		}

		return this;
	},

	addError: function(err, src, extra) {
		var str;
		if (typeof err !== "string") {
			str = String(err);
			if(str.match(/^\[object/)) {
				str = err.name + ": " + (err.description || err.message).replace(/\r\n$/, "");
			}
			err = str;
		}
		if (src !== undefined) {
			err = "[" + src + ":" + BOOMR.now() + "] " + err;
		}
		if (extra) {
			err += ":: " + extra;
		}

		if (impl.errors[err]) {
			impl.errors[err]++;
		}
		else {
			impl.errors[err] = 1;
		}
	},

	addVar: function(name, value) {
		if(typeof name === "string") {
			impl.vars[name] = value;
		}
		else if(typeof name === "object") {
			var o = name, k;
			for(k in o) {
				if(o.hasOwnProperty(k)) {
					impl.vars[k] = o[k];
				}
			}
		}
		return this;
	},

	removeVar: function(arg0) {
		var i, params;
		if(!arguments.length) {
			return this;
		}

		if(arguments.length === 1
				&& Object.prototype.toString.apply(arg0) === "[object Array]") {
			params = arg0;
		}
		else {
			params = arguments;
		}

		for(i=0; i<params.length; i++) {
			if(impl.vars.hasOwnProperty(params[i])) {
				delete impl.vars[params[i]];
			}
		}

		return this;
	},

	hasVar: function(name) {
		return impl.vars.hasOwnProperty(name);
	},

	requestStart: function(name) {
		var t_start = BOOMR.now();
		BOOMR.plugins.RT.startTimer("xhr_" + name, t_start);

		return {
			loaded: function(data) {
				BOOMR.responseEnd(name, t_start, data);
			}
		};
	},

	responseEnd: function(name, t_start, data) {
		if(typeof name === "object" && name.url) {
			impl.fireEvent("xhr_load", name);
		}
		else {
			BOOMR.plugins.RT.startTimer("xhr_" + name, t_start);
			impl.fireEvent("xhr_load", {
				"name": "xhr_" + name,
				"data": data
			});
		}
	},

	sendBeacon: function() {
		var k, form, furl, img, length, errors=[];

		

		// At this point someone is ready to send the beacon.  We send
		// the beacon only if all plugins have finished doing what they
		// wanted to do
		for(k in this.plugins) {
			if(this.plugins.hasOwnProperty(k)) {
				if(impl.disabled_plugins[k]) {
					continue;
				}
				if(!this.plugins[k].is_complete()) {
					
					return false;
				}
			}
		}

		// use d.URL instead of location.href because of a safari bug
		impl.vars.pgu = BOOMR.utils.cleanupURL(d.URL.replace(/#.*/, ""));
		if(!impl.vars.u) {
			impl.vars.u = impl.vars.pgu;
		}

		if(impl.vars.pgu === impl.vars.u) {
			delete impl.vars.pgu;
		}

		impl.vars.v = BOOMR.version;

		if(BOOMR.visibilityState()) {
			impl.vars["vis.st"] = BOOMR.visibilityState();
			if(BOOMR.lastVisibilityEvent.visible) {
				impl.vars["vis.lv"] = BOOMR.now() - BOOMR.lastVisibilityEvent.visible;
			}
			if(BOOMR.lastVisibilityEvent.hidden) {
				impl.vars["vis.lh"] = BOOMR.now() - BOOMR.lastVisibilityEvent.hidden;
			}
		}

		if(w !== window) {
			impl.vars["if"] = "";
		}

		for (k in impl.errors) {
			if (impl.errors.hasOwnProperty(k)) {
				errors.push(k + (impl.errors[k] > 1 ? " (*" + impl.errors[k] + ")" : ""));
			}
		}

		if(errors.length > 0) {
			impl.vars.errors = errors.join("\n");
		}

		impl.errors = {};

		// If we reach here, all plugins have completed
		impl.fireEvent("before_beacon", impl.vars);

		// Don't send a beacon if no beacon_url has been set
		// you would do this if you want to do some fancy beacon handling
		// in the `before_beacon` event instead of a simple GET request
		
		if(!impl.beacon_url) {
			
			return true;
		}

		form = document.createElement("form");
		length = BOOMR.utils.pushVars(form, impl.vars);

		// If we reach here, we've transferred all vars to the beacon URL.
		impl.fireEvent("onbeacon", impl.vars);

		if(!length) {
			// do not make the request if there is no data
			return this;
		}

		// using 2000 here as a de facto maximum URL length based on:
		// http://stackoverflow.com/questions/417142/what-is-the-maximum-length-of-a-url-in-different-browsers
		BOOMR.utils.sendData(form, impl.beacon_type === "AUTO" ? (length > 2000 ? "POST" : "GET") : "POST");

		return true;
	}

};

delete BOOMR_start;

if(typeof BOOMR_lstart === "number") {
	boomr.t_lstart = BOOMR_lstart;
	delete BOOMR_lstart;
}
else if(typeof BOOMR.window.BOOMR_lstart === "number") {
	boomr.t_lstart = BOOMR.window.BOOMR_lstart;
}

(function() {
	var make_logger;

	if(typeof console === "object" && console.log !== undefined) {
		boomr.log = function(m, l, s) { console.log(s + ": [" + l + "] " + m); };
	}

	make_logger = function(l) {
		return function(m, s) {
			this.log(m, l, "boomerang" + (s?"."+s:""));
			return this;
		};
	};

	boomr.debug = make_logger("debug");
	boomr.info = make_logger("info");
	boomr.warn = make_logger("warn");
	boomr.error = make_logger("error");
}());


(function() {
var ident;
for(ident in boomr) {
	if(boomr.hasOwnProperty(ident)) {
		BOOMR[ident] = boomr[ident];
	}
}
if (!BOOMR.xhr_excludes) {
	//! URLs to exclude from automatic XHR instrumentation
	BOOMR.xhr_excludes={};
}

}());

dispatchEvent("onBoomerangLoaded", { "BOOMR": BOOMR }, true );

}(window));


// end of boomerang beaconing section
/*
 * Copyright (c), Buddy Brewer.
 */

/**
\file navtiming.js
Plugin to collect metrics from the W3C Navigation Timing API. For more information about Navigation Timing,
see: http://www.w3.org/TR/navigation-timing/
*/

(function() {

// First make sure BOOMR is actually defined.  It's possible that your plugin is loaded before boomerang, in which case
// you'll need this.
BOOMR = BOOMR || {};
BOOMR.plugins = BOOMR.plugins || {};
if (BOOMR.plugins.NavigationTiming) {
	return;
}

// A private object to encapsulate all your implementation details
var impl = {
	complete: false,
    sent: false,
	xhr_done: function(edata) {
		var w = BOOMR.window, res, data = {}, k;

		if (!edata) {
			return;
		}

		if (edata.data) {
			edata = edata.data;
		}

		if (edata.url && w.performance && w.performance.getEntriesByName) {
			res = w.performance.getEntriesByName(edata.url);
			if(res && res.length > 0) {
				res = res[0];

				data = {
					nt_red_st: res.redirectStart,
					nt_red_end: res.redirectEnd,
					nt_fet_st: res.fetchStart,
					nt_dns_st: res.domainLookupStart,
					nt_dns_end: res.domainLookupEnd,
					nt_con_st: res.connectStart,
					nt_con_end: res.connectEnd,
					nt_req_st: res.requestStart,
					nt_res_st: res.responseStart,
					nt_res_end: res.responseEnd
				};
				if (res.secureConnectionStart) {
					// secureConnectionStart is OPTIONAL in the spec
					data.nt_ssl_st = res.secureConnectionStart;
				}

				for(k in data) {
					if (data.hasOwnProperty(k) && data[k]) {
						data[k] += w.performance.timing.navigationStart;
					}
				}

			}
		}

		if (edata.timing) {
			res = edata.timing;
			if (!data.nt_req_st) {
				data.nt_req_st = res.requestStart;
			}
			if (!data.nt_res_st) {
				data.nt_res_st = res.responseStart;
			}
			if (!data.nt_res_end) {
				data.nt_res_end = res.responseEnd;
			}
			data.nt_domint = res.domInteractive;
			data.nt_domcomp = res.domComplete;
			data.nt_load_st = res.loadEventEnd;
			data.nt_load_end = res.loadEventEnd;
		}

		for(k in data) {
			if (data.hasOwnProperty(k) && !data[k]) {
				delete data[k];
			}
		}

		BOOMR.addVar(data);

		try { impl.addedVars.push.apply(impl.addedVars, Object.keys(data)); } catch(ignore) {}

		this.complete = true;
        this.sent = true;
		BOOMR.sendBeacon();
	},

	done: function() {
		var w = BOOMR.window, p, pn, pt, data;
		if(this.complete) {
			return this;
		}

		impl.addedVars = [];

		p = w.performance || w.msPerformance || w.webkitPerformance || w.mozPerformance;
		if(p && p.timing && p.navigation) {
			
			pn = p.navigation;
			pt = p.timing;
			data = {
				nt_red_cnt: pn.redirectCount,
				nt_nav_type: pn.type,
				nt_nav_st: pt.navigationStart,
				nt_red_st: pt.redirectStart,
				nt_red_end: pt.redirectEnd,
				nt_fet_st: pt.fetchStart,
				nt_dns_st: pt.domainLookupStart,
				nt_dns_end: pt.domainLookupEnd,
				nt_con_st: pt.connectStart,
				nt_con_end: pt.connectEnd,
				nt_req_st: pt.requestStart,
				nt_res_st: pt.responseStart,
				nt_res_end: pt.responseEnd,
				nt_domloading: pt.domLoading,
				nt_domint: pt.domInteractive,
				nt_domcontloaded_st: pt.domContentLoadedEventStart,
				nt_domcontloaded_end: pt.domContentLoadedEventEnd,
				nt_domcomp: pt.domComplete,
				nt_load_st: pt.loadEventStart,
				nt_load_end: pt.loadEventEnd,
				nt_unload_st: pt.unloadEventStart,
				nt_unload_end: pt.unloadEventEnd
			};
			if (pt.secureConnectionStart) {
				// secureConnectionStart is OPTIONAL in the spec
				data.nt_ssl_st = pt.secureConnectionStart;
			}
			if (pt.msFirstPaint) {
				// msFirstPaint is IE9+ http://msdn.microsoft.com/en-us/library/ff974719
				data.nt_first_paint = pt.msFirstPaint;
			}

			BOOMR.addVar(data);

			try { impl.addedVars.push.apply(impl.addedVars, Object.keys(data)); } catch(ignore) {}
		}

		// XXX Inconsistency warning.  msFirstPaint above is in milliseconds while
		//     firstPaintTime below is in seconds.microseconds.  The server needs to deal with this.

		// This is Chrome only, so will not overwrite nt_first_paint above
		if(w.chrome && w.chrome.loadTimes) {
			pt = w.chrome.loadTimes();
			if(pt) {
				data = {
					nt_spdy: (pt.wasFetchedViaSpdy?1:0),
					nt_cinf: pt.connectionInfo,
					nt_first_paint: pt.firstPaintTime
				};

				BOOMR.addVar(data);

				try { impl.addedVars.push.apply(impl.addedVars, Object.keys(data)); } catch(ignore) {}
			}
		}

		this.complete = true;
        this.sent = true;
		BOOMR.sendBeacon();
	},

    unload: function() {
        if (this.sent) {
            return this;
        }
        return this.done();
    },

	clear: function(vars) {
		if (impl.addedVars && impl.addedVars.length > 0) {
			BOOMR.removeVar(impl.addedVars);
			impl.addedVars = [];
		}
		this.complete = false;
	}
};

BOOMR.plugins.NavigationTiming = {
	init: function() {
		if (!impl.initialized) {
			// we'll fire on whichever happens first
			BOOMR.subscribe("page_ready", impl.done, null, impl);
			BOOMR.subscribe("xhr_load", impl.xhr_done, null, impl);
			BOOMR.subscribe("before_unload", impl.unload, null, impl);
			BOOMR.subscribe("onbeacon", impl.clear, null, impl);

			impl.initialized = true;
		}
		return this;
	},

	is_complete: function() {
		return impl.complete;
	}
};

}());

/**
\file restiming.js
Plugin to collect metrics from the W3C Resource Timing API.
For more information about Resource Timing,
see: http://www.w3.org/TR/resource-timing/
*/

(function() {

BOOMR = BOOMR || {};
BOOMR.plugins = BOOMR.plugins || {};

var restricted = {
	redirectStart: "rt_red_st",
	redirectEnd: "rt_red_end",
	domainLookupStart: "rt_dns_st",
	domainLookupEnd: "rt_dns_end",
	connectStart: "rt_con_st",
	connectEnd: "rt_con_end",
	secureConnectionStart: "rt_scon_st",
	requestStart: "rt_req_st",
	responseStart: "rt_res_st"
},

impl = {
	complete: false,
	done: function() {
		var p = BOOMR.window.performance, r, data, i, k;
		if(impl.complete) {
			return;
		}
		BOOMR.removeVar("restiming");
		if(p && typeof p.getEntriesByType === "function") {
			r = p.getEntriesByType("resource");
			if(r) {
				
				data = {
					restiming: new Array(r.length)
				};
				for(i = 0; i < r.length; ++i) {
					data.restiming[i] = {
						rt_name: r[i].name,
						rt_in_type: r[i].initiatorType,
						rt_st: r[i].startTime,
						rt_dur: r[i].duration,
						rt_fet_st: r[i].fetchStart,
						rt_res_end: r[i].responseEnd
					};
					for(k in restricted) {
						if(restricted.hasOwnProperty(k) && r[i][k] > 0) {
							data.restiming[i][restricted[k]] = r[i][k];
						}
					}
				}
				BOOMR.addVar(data);
			}
		}
		this.complete = true;
		BOOMR.sendBeacon();
	}
};

BOOMR.plugins.ResourceTiming = {
	init: function() {
		BOOMR.subscribe("page_ready", impl.done, null, impl);
		return this;
	},
	is_complete: function() {
		return impl.complete;
	}
};

}());

/**
\file mobile.js
Plugin to capture navigator.connection.type on browsers that support it
*/

(function() {
var connection;

	if(typeof navigator === "object") {
		connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection || navigator.msConnection;
	}

	if(!connection) {
		return;
	}
	BOOMR.addVar("mob.ct", connection.type);
	BOOMR.addVar("mob.bw", connection.bandwidth);
	BOOMR.addVar("mob.mt", connection.metered);

}());

if(typeof(window['pageData']) != 'undefined' && "transactionId" in window["pageData"]) {
    BOOMR.addVar("transactionId", window['pageData'].transactionId);
}

BOOMR.init({
    beacon_url: document.location.protocol + "//" + document.domain + "/boomerang_beacon.php",
    site_domain: "moo.com"
});
BOOMR.t_end = new Date().getTime();

/*jslint continue: true, plusplus: true, regexp: true, unparam: true, sloppy: true, white: true, browser: true, devel: true */
/*properties BOOMR, BOOMR_lstart, BOOMR_start, BOOMR_configt*/
