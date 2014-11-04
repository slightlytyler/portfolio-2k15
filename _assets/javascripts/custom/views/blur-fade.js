$.fn.blurFade = function() {
  var self = $(this);
  var blurContainer = self.find('#blur-container');
  self.addClass('blur-fade');

  // Height of the nav + the element being blurred
  var displaceHeight = $('nav.main').outerHeight() + self.outerHeight();

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
    {a:.35, onUpdate:applyAlpha}
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
};