// Blur Fade
// Author: Tyler Martinez
// slightlytyler.com

// Link to repo
;(function ( $, window, document, undefined ) {

    var pluginName = "blurFade",
      defaults = {
        innerContainer: "#blur-container"
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
          var innerContainer = this.settings.innerContainer;
          var blurContainer = self.find(innerContainer); // Find inner blur fade container (#blur-container)
          var navHeight = $('nav.main').outerHeight(); // Get nav height
          var displaceHeight = self.outerHeight(); // Height of the blurred element
          var didScroll; // Will be true while scrolling but reset on intervale

          // Add padding to top of blur container to account for nav height
          padBlurContainer(blurContainer, navHeight);

          // Add margin-top to sibling to account for blur contaienr being out of the flow 
          // of the document do to position: fixed
          displaceNextSibling(self, displaceHeight);

          // Seperate experience for < iOS8 or Android 3
          if(!isMobile() || getIOSVersion() >= 8 || getAndroidVersion() >= 3) {
            scrollExperience(self, displaceHeight);
          } else {
            touchExperience();
          }

          // Pad blur container to account for the main nav overlaying
          // it's top due to position: fixed
          function padBlurContainer(blurContainer, navHeight) {
            blurContainer.css({ "padding-top": navHeight });
          }

          // Manually displace next sibling to accoutn for the
          // blur container being out of the flow of the document
          function displaceNextSibling(self, displaceHeight) {    
            // Second, need to displace the next sibling of
            // blur-fade element as blur-fade is fixed
            var displaceElement = self.next();
            var displaceHeight = self.outerHeight();

            displaceElement.css({ 'margin-top': displaceHeight });
          }

          function scrollExperience(self, displaceHeight) {
            // Set up scroll magic to blur element
            var controller = new ScrollMagic();

            // Can't tween filter so let's make a blue variable
            var blurAmount = {b:0};

            // build tween
            var blurTween = TweenMax.to(
              blurAmount, 1, 
              {b:4, onUpdate:applyBlur}
            );

            // Attach to DOM
            function applyBlur() {
              if(blurAmount.b > 0) {
                TweenMax.set(blurContainer, {webkitFilter: "blur(" + blurAmount.b + "px)"});
              } else {
                TweenMax.set(blurContainer, {webkitFilter: ""});
              }
            }

             // Can't tween rgba so let's make a alpha variable
            var alphaAmount = {a:0};

            // tween effects .blur-fade:after background color 
            // through background-color: inherit
            var overlayTween = TweenMax.to(
              alphaAmount, 1, 
              {a:.65, onUpdate:applyAlpha}
            );

            // Attach to DOM
            function applyAlpha() {
              TweenMax.set(self, {backgroundColor: "rgba(0,0,0," + alphaAmount.a + ")"});
            }

            // build scenes
            var blurScene = new ScrollScene({triggerElement: $(window), triggerHook: "onLeave", duration: displaceHeight})
              .setTween(blurTween)
              .addTo(controller);

            var overlayScene = new ScrollScene({triggerElement: $(window), triggerHook: "onLeave", duration: displaceHeight})
              .setTween(overlayTween)
              .addTo(controller);
          }

          function touchExperience() {
            // Init our scroll events
            $(window).bind("scroll.blurFade", Scroll);
            $(window).bind("touchstart.blurFade", Scroll);

            // Touch end and normal scroll
            function Scroll() {
              didScroll = true;
            }

             // Update only on an interval
            setInterval(function() {
              if (didScroll) {
                if($(window).scrollTop() > 10) {
                  console.log('force-fade');
                  self.addClass('force-fade');
                } else {
                  console.log('remove force-fade');
                  self.removeClass('force-fade');
                }

                didScroll = false; // Reset
              }
            }, 250);
          }
        },
        destroy: function() {
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
