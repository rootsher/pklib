/**
 * Module to service asynchronous request.
 * @package ajax
 * @dependence array
 */
(function (global) {
    "use strict";

    var pklib = global.pklib || {},
        cache = [];
    
    /**
     * @constructor
     * @this {XHRError}
     * @param {String} message
     */
    function XHRError (message) {
    	this.name = "XHRError";
    	this.message = message || "";
    }
    
    XHRError.prototype = new Error();
    XHRError.prototype.constructor = XHRError;

    /**
     * @param {Object} settings
     * @param {XMLHttpRequest} xhr
     */
    function handler(settings, xhr) {
        var contentType,
            xmlContentType = ["application/xml", "text/xml"],
            property = "responseText";

        if (xhr.readyState === 4) {
            cache[settings.url] = xhr;

            contentType = xhr.getResponseHeader("Content-Type");

            if (pklib.array.inArray(contentType, xmlContentType)) {
            	property = "responseXML";
            }

            settings.done.call(null, xhr[property]);
        }
    }
    /**
     * @param {Object} settings
     * @param {XMLHttpRequest} xhr
     */
    function timeoutHandler(settings, xhr) {
        // pass
    }
    /**
     * @param {Object} settings
     * @param {XMLHttpRequest} xhr
     */
    function requestTimeout(settings, xhr) {
        if (xhr.readyState !== 4) {
        	xhr.abort();
            timeoutHandler.call(null, settings, xhr);
        }
    }
    /**
     * @throws XHRError
     * @return {Object}
     */
    function getXhr() {
        var xhr;
        try {
            xhr = new XMLHttpRequest();
        } catch (a) {
            try {
                xhr = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (b) {
                try {
                    xhr = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (c) {
                    throw new XHRError("XHRError: Cannot create XHR object");
                }
            }
        }
        return xhr;
    }

    pklib.ajax = {

        /**
         * Lazy load file.
         *
         * @param config {Object}
         * <pre>
         * {
         *      type {String|default: "get"}
         *      async {Boolean|default: true}
         *      cache {Boolean|default: false}
         *      url {String}
         *      params {Object}
         *      headers {Object}
         *      done {Function}
         * }
         * </pre>
         * @return {XMLHttpRequest}
         */
        load: function (config) {
            var header,
                xhr = null,
                settings = {
                    type: "get",
                    async: true,
                    cache: false,
                    url: null,
                    params: null,
                    timeout: 30000,
                    headers: {},
                    done: function () {
                        // pass
                    }
                };
            settings = pklib.array.mixin(settings, config);
            settings.type = settings.type.toUpperCase();

            if (settings.cache && cache[settings.url]) {
                handler.call(null, settings, cache[settings.url]);
            } else {
            	xhr = getXhr();
            	xhr.onreadystatechange = handler.bind(null, settings, xhr);
                xhr.open(settings.type, settings.url, settings.async);

                if (settings.headers !== null) {
                    for (header in settings.headers) {
                        if (settings.headers.hasOwnProperty(header)) {
                        	xhr.setRequestHeader(header, settings.headers[header]);
                        }
                    }
                }
                xhr.send(settings.params);

                if (typeof xhr.ontimeout === "function") {
                    xhr.ontimeout = timeoutHandler.bind(null, settings, xhr);
                } else {
                    setTimeout(requestTimeout.bind(null, settings, xhr), settings.timeout);
                }
                
                return xhr;
            }
        }
    };
}(this));
