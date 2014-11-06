// Initialize smoothstate

$(function() {
  'use strict';
  var $body    = $('html, body'),
    content  = $('#current-content').smoothState({  
      prefetch: true,
      pageCacheSize: 4,
      onStart: {
        duration: 0,
        render: function (url, $container) {
          // Lock scrolling
          $('body').addClass('scroll-lock');

          // Move current content to exiting container
          $("#exiting-content").html($("#current-content").html());

          // Empty current content
          $('#current-content').empty();
        }
      },
      onProgress: {
        duration: 0,
        render: function (url, $container) {
          // Scroll top
          $body.animate({
            scrollTop: 0
          });

          // Change cursor to reflect loading
          $body.css('cursor', 'wait');
          $body.find('a').css('cursor', 'wait');
        }
      },
      onEnd: {
        duration: 1000,
        render: function(url, $container, $content) {
          // Remove loading cursor
          $body.css('cursor', 'auto');
          $body.find('a').css('cursor', 'auto');

          // Add current content
          $container.html($content);

          // Refire page javascript
          pageLoad();
          
          // Add exiting animation class to exiting content
          $('#exiting-content').addClass('is-exiting');
          $('#current-content').addClass('is-entering');
        }
      },
      callback : function(url, $container, $content) {
        // Empty exiting container
        $('#exiting-content').empty();

        // And remove animation class
        $('#exiting-content').removeClass('is-exiting');
        $('#current-content').removeClass('is-entering');

        // Unlock scrolling
        $('body').removeClass('scroll-lock');
      }
    }).data('smoothState');
  
    // Header is outsite our container so we need to load those manually
    // In addition we will use this space to set animation classes
    $('a').bind('click',function(e){
      e.preventDefault();
      var self = $(this);

      // Add selected class to anchor
      self.addClass('smooth-state--selected');

      // Get animation class from the anchor's data-page-trans 
      var animationClass = self.data("page-trans");

      // Add animation class to content container
      $('#current-content, #exiting-content').addClass(animationClass);

      // Get the url
      var href = $(this).attr('href');

      // Load url into smooth state
      content.load(href);
    });

});