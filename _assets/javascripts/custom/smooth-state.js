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

          // Add exiting animation class to exiting content
          $('#exiting-content').addClass('is-exiting');

          // Refire page javascript
          pageLoad();
        }
      },
      callback : function(url, $container, $content) {
        // Empty exiting container
        $('#exiting-content').empty();

        // And remove animation class
        $('#exiting-content').removeClass('is-exiting');
      }
    }).data('smoothState');

    $('header a').bind('click',function(e){
      e.preventDefault();
      var href = $(this).attr('href');
      content.load(href);
    });
});