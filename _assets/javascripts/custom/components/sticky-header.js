$.fn.stickyHeader = function(pushID) {
  var self = $(this);
  var navbarHeight = self.outerHeight();

  var push = $(pushID);

  // Call pushHeader
  $(window).scroll(function(){
    pushHeader(push);
  });

  // Now lets extend it if it's retracted and they scroll up a bit
  //
  var didScroll;

  // on scroll, let the interval function know the user has scrolled
  $(window).scroll(function(event){
    didScroll = true;
  });

  // Mobile scroll accounted for
  $('body').bind('touchmove', function(e) { 
    pushHeader(push);
    didScroll = true;
  });

  // Update only on an interval
  setInterval(function() {
    if (didScroll) {
      hasScrolled();
      didScroll = false;
    }
  }, 250);

  var lastScrollTop = 0;
  var delta = 80;

  function hasScrolled() {
    // Store scroll position
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

  function pushHeader(push) {
    // First we need to push the header out of the way

    // Position of the push element relative to window top
    var pushOffset = push.offset().top;
    var pushTop = pushOffset - $(window).scrollTop();
    

    // All 3 cases: currently being pushed, fully pushed, and not pushed
    if(pushTop <= navbarHeight && pushTop > 0) {
      self.css('top', pushTop - navbarHeight + 'px');
      self.addClass('pushed');
      self.removeClass('retracted');
    } else if(pushTop <= 0) {
      self.css('top', -navbarHeight + 'px');
      self.addClass('retracted');
    } else if(pushTop > navbarHeight) {
      self.css('top', '0px');
      self.removeClass('pushed');
      self.removeClass('extend');
    }
  }
};