// Scrolling based blur and overlay
// using scrollmagic!

$.fn.blurFade = function(innerContainer) {
  var self = $(this);
  var blurContainer = self.find(innerContainer); // Find inner blur fade container (#blur-container)
  var navHeight = $('nav.main').outerHeight(); // Get nav height
  var displaceHeight = self.outerHeight(); // Height of the blurred element

  padBlurContainer(blurContainer, navHeight);

  displaceNextSibling(self, displaceHeight);

  if(!isMobile() || getIOSVersion() >= 8 || getAndroidVersion() >= 3) {
    scrollExperience(self, displaceHeight);
  } else {
    console.log('touch experience');
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
};