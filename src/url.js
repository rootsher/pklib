/**
 * @package pklib.url
 */

/**
 * Url helper manager
 * @namespace
 */
pklib.url = (function () {
    "use strict";

    /**
     * Get all params, and return in JSON object
     *
     * @private
     * @function
     * @returns {Object}
     */
    function get_params() {
        var i,
            item,
            len,
            params = window.location.search,
            params_list = {};

        if (params.substr(0, 1) === "?") {
            params = params.substr(1);
        }

        params = params.split("&");
        len = params.length;

        for (i = 0; i < len; ++i) {
            item = params[i].split("=");
            params_list[item[0]] = item[1];
        }
        return params_list;
    }

    /**
     * Get concrete param from URL.
     * If param if not defined return null
     *
     * @private
     * @function
     * @param {String} key
     * @returns {String}
     */
    function get_param(key) {
        var params = window.location.search,
            i,
            item,
            len;

        if (params.substr(0, 1) === "?") {
            params = params.substr(1);
        }

        params = params.split("&");
        len = params.length;

        for (i = 0; i < len; ++i) {
            item = params[i].split("=");
            if (item[0] === key) {
                return item[1];
            }
        }
        return null;
    }

    // public API
    return {
        get_params: get_params,
        get_param: get_param
    };
}());

