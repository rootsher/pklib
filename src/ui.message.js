/**
 * Show layer on special place.
 * @package pklib.message
 * @dependence pklib.dom, pklib.event, pklib.string, pklib.utils
 */
(function (global) {
    "use strict";
    var pklib = global.pklib || {},
        document = global.document || {},
        id = "pklib-message-wrapper",
        settings = {
            container: null,
            style: {
                width: 300,
                height: 300,
                zIndex: 1010
            }
        };

    if (typeof pklib.ui === "undefined") {
        pklib.ui = {};
    }

    pklib.ui.message = {
        /**
         * @type string
         */
        objId: id,
        /**
         * @type Null
         */
        content: null,
        /**
         * @param config {Object}
         * @param callback {Function}
         */
        show: function show(config, callback) {
            settings.container = document.body;
            settings = pklib.object.mixin(settings, config);

            var message = document.createElement("div"),
                messageStyle = message.style,
                style;

            message.setAttribute("id", this.objId);
            for (style in settings.style) {
                if (settings.style.hasOwnProperty(style)) {
                    messageStyle[style] = settings.style[style];
                }
            }

            if (pklib.string.isString(this.content)) {
                message.innerHTML = this.content;
            } else if (pklib.dom.isNode(this.content)) {
                message.appendChild(this.content);
            }

            settings.container.appendChild(message);
            pklib.ui.center(message, settings.container);

            pklib.event.add(global, "resize", function () {
                pklib.ui.center(message, settings.container);
            });
            if (typeof callback === "function") {
                callback();
            }
            return message;
        },
        /**
         * @param callback {Function}
         */
        close: function close(callback) {
            var message = pklib.dom.byId(this.objId),
                result = false;
            if (message !== null) {
                message.parentNode.removeChild(message);
                this.close(callback);
                result = true;
            }
            if (typeof callback === "function") {
                callback();
            }
            return result;
        }
    };
}(this));
