pklib = this.pklib || {};

pklib.loader = (function() {

	return {

		objClass: 'pklib-loader-wrapper',

        objClassPercent: this.objClass + '-percent',

        autoclosetime: 500,

        closetime: 500,

        showtime: 500,

        loaderImage: 'http://pklib.com/img/icons/loader.gif',

        loaderImageAlt: 'loading...',

        show: function(config, callback) {
            var settings = {
                place: 'body',
                holder: null,
                center: false,
                percent: false,
                percentMargin: 0
            };

            settings = pklib.utils.merge(settings, config);

            settings.holder = (settings.place === 'body') ? window : settings.place;

            var placeHolderChildrens = jQuery(settings.holder).children(),
                insideLoaders = placeHolderChildrens.filter('.' + this.objClass),
                insideLoaderPercents = placeHolderChildrens.filter('.' + this.objClassPercent);

            if (!pklib.validate.empty(insideLoaders.length)){
                this.showtime += 300;
                insideLoaders.remove();
                insideLoaderPercents.remove();
            }

            var loader = jQuery('<img />').attr({
                src: this.loaderImage,
                alt: this.loaderImageAlt
            }).css({
                position: 'absolute',
                width: 32,
                height: 32,
                opacity: 0,
                'z-index': 2000
            }).addClass(this.objClass);

            jQuery(settings.place).append(loader);

            var leftCssVal = 0,
                topCssVal = 0;

            if (settings.center) {
                leftCssVal = (jQuery(settings.holder).width() - loader.width()) / 2;
                topCssVal = (jQuery(settings.holder).height() - loader.height() ) / 2;
            }

            jQuery('.' + this.objClass).css({
                left: leftCssVal,
                top: topCssVal
            }).animate({
                opacity: 1
            }, this.showtime, function(){
                if (typeof callback === "function"){
                    callback();
                }
            });

            if (settings.percent){
                var percentCssClass = this.objClassPercent,
                    percent = jQuery('<span />').css({
                    position: 'absolute',
                    width: loader.width(),
                    textAlign: 'center',
                    opacity: 0,
                    'z-index': 2002
                }).addClass(percentCssClass);

                jQuery(settings.place).append(percent);

                var percentProgress = 0,
                    percentProgressInterval = setInterval(function(){
                    if (percentProgress <= 100) {
                        jQuery('.' + percentCssClass).text(percentProgress + '%');
                        percentProgress += 1;
                    } else {
                        clearInterval(percentProgressInterval);
                    }
                }, 100);

                var topMargin = ((loader.height() - parseInt(percent.css('line-height'), 10)) / 2 );

                jQuery('.' + percentCssClass).css({
                    left: leftCssVal,
                    top: topCssVal + topMargin + parseInt(settings.percentMargin, 10)
                }).animate({
                    opacity: 1
                }, this.showtime);
            }

            // release memory in IE
            loader = null;
            percent = null;
        },

        autoclose: function(config, callback) {
            var settings = config || {},
                Loader = this;
            setTimeout(function(){
                Loader.close(settings, callback);
            }, this.autoclosetime);
        },

        close: function(config, callback) {
            var settings = {
                    place: 'body'
                },
                loader = this;

            settings = pklib.utils.merge(settings, config);

            var className = settings.place + ' .' + this.objClass,
                classNamePercent = settings.place + ' .' + this.objClassPercent,
                loaderElementCssClass = [className, classNamePercent],
                animationComplete = function() {
                    jQuery.each(loaderElementCssClass, function(i,val){
                        jQuery(val).remove();
                    });						
					if (typeof callback === "function"){
						callback();
					}
                };

            jQuery.each(loaderElementCssClass, function(i,val){
                jQuery(val).animate({
                    opacity: 0
                }, loader.closetime, animationComplete);
            });
        }

	};

})();
