// Sticky Header Plugin
// Author: Tyler Martinez
// slightlytyler.com

// Link to repo
;(function ( $, window, document, undefined ) {

    var pluginName = "stickyHeader",
        defaults = {
        pushElement: "#nav-push"
      };

    function Plugin ( element, options ) {
        this.element = element;
        this.settings = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    var $this = this;

    $.extend(Plugin.prototype, {
        init: function () {
          var self = $(this.element);
          var navbarHeight = self.outerHeight(); // Height of the header
          var push = $(this.settings.pushElement); // Element that will 'push' the sticky header
          var didScroll; // Will be true while scrolling but reset on intervale

          // Touch end and normal scroll
          function Scroll() {
            didScroll = true;
          }

          // Init our scroll events
          $(window).bind("scroll.stickyHeaderScroll", Scroll);
          $(window).bind("touchstart.stickyHeaderTouchStart", Scroll);

          // Update only on an interval
          setInterval(function() {
            if (didScroll) {
              ifScrollDown();
              pushHeader(self, push);

              didScroll = false; // Reset
            }
          }, 250);

          var lastScrollTop = 0; // Value to check against

          function ifScrollDown() {
            var delta = 80;
            var st = $(this).scrollTop();

            // Make sure scroll > delta
            if(Math.abs(lastScrollTop - st) <= delta)
              return;

            // Determine direction
            if (st > lastScrollTop){
                // Scroll Down
                self.removeClass('extend');
            } else {
                // Scroll Up
                if(st + $(window).height() < $(document).height()) {
                    self.addClass('extend');
                }
            }

            // Update lastScrollTop
            lastScrollTop = st;
          }

          function pushHeader(self, push) {
            // First we need to push the header out of the way
            //
            var pushOffset = push.offset().top;
            var pushTop = pushOffset - $(window).scrollTop(); // Position of the push element relative to window top

            if(pushTop <= 0) {
              self.addClass('retracted');
            } else {
              self.removeClass('retracted');
            }
          }
        },
        destroy: function() {
          // Extend Nav
          $(this.element).removeClass('retracted');
          $(this.element).removeClass('extended');

          $(window).unbind('.stickyHeaderScroll');
          $(window).unbind(".stickyHeaderTouchStart");
          push = null;
          //.remove() any helper elements created by the plugin
        }
    });

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        var args = arguments;

        if (options === undefined || typeof options === 'object') {
            return this.each(function () {

                if (!$.data(this, 'plugin_' + pluginName)) {
                    $.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
                }
            });

        } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {

            var returns;

            this.each(function () {
                var instance = $.data(this, 'plugin_' + pluginName);

                if (instance instanceof Plugin && typeof instance[options] === 'function') {
                    returns = instance[options].apply( instance, Array.prototype.slice.call( args, 1 ) );
                }

                if (options === 'destroy') {
                  $.data(this, 'plugin_' + pluginName, null);
                }
            });

            return returns !== undefined ? returns : this;
        }
    };

})( jQuery, window, document );