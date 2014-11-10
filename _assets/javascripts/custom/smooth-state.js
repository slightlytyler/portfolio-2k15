// Initialize smoothstate

$(function() {
  'use strict';
  var $body    = $('html, body'),
    content  = $('#current-content').smoothState({  
      prefetch: true,
      pageCacheSize: 4,
      onStart: {
        duration: 100,
        render: function (url, $container) {
          // Lock scrolling
          $('body').addClass('scroll-lock');

          // Get selected anchor
          var $directory = url.replace(/https?:\/\/[^\/]+/i, "");
          var $anchor = $('a[href="' + $directory + '"]');

          // Page specific onStart javascript
          var pageTransFunction = $anchor.data("page-trans-function");

          if (pageTransFunction) {
            var pageTransFunctionOnStart = pageTransFunction + "OnStart";
            $anchor[pageTransFunctionOnStart]();
          }

          // Add smooth-state--select class to click link
          addSmoothSelectTarget($anchor); 

          // Get animation class from the anchor's data-page-trans 
          var animationClass = $anchor.data("page-trans");

          // Add animation class to content container
          $('#current-content, #exiting-content').addClass(animationClass);

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

          // Add in-progress class to exiting content
          $("#exiting-content").addClass('in-progress');

          // Change cursor to reflect loading
          $body.css('cursor', 'wait');
          $body.find('a').css('cursor', 'wait');
        }
      },
      onEnd: {
        duration: 300,
        render: function(url, $container, $content) {
          // Remove loading cursor
          $body.css('cursor', 'auto');
          $body.find('a').css('cursor', 'auto');

          // Add current content
          $container.html($content);

          // Scroll top
          $body.animate({
            scrollTop: 0
          });

          // Refire page javascript
          pageLoad();
          
          // Remove in-progress class to exiting content
          $("#exiting-content").removeClass('in-progress');

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

        // Remove page-trans classes
        $("#exiting-content, #current-content").removeClass(removePageTransClasses);

        // Unlock scrolling
        $('body').removeClass('scroll-lock');
      }
    }).data('smoothState');
  
    // Header is outsite our container so we need to load those manually
    // In addition we will use this space to set animation classes
    $('header a').bind('click',function(e){
      e.preventDefault();
      var self = $(this);

      // Get the url
      var href = self.attr('href');

      // Load url into smooth state
      content.load(href);
    });

});

// Function to get the smooth-select target from anchors
// data-smooth-select-target attr
function addSmoothSelectTarget ($anchor) {
  // Get smooth-select-target from data-smooth-select-target
  var smoothSelectTarget = $anchor.data("smooth-select-target");

  // Determing smooth-selected target
  // Add smooth-state--selected class to it

  if(smoothSelectTarget == 'self') {
    // if target is itself, the anchor

    $anchor.addClass('smooth-state--select');
  } else if(smoothSelectTarget == 'parent') {
    // if target is the parent

    $anchor.parent().addClass('smooth-state--select');
  } else if(smoothSelectTarget == 'child') {
    // if target is it's immediate chiled

    $anchor.children('*:first-child').addClass('smooth-state--select');
  } else {
    // else target is a specific class

    $(smoothSelectTarget).addClass('smooth-state--select');
  }
}

// Function to remove page-trans classes
function removePageTransClasses (index, classNames) {
  var current_classes = classNames.split(" "), // Change the list into an array
      classes_to_remove = []; // Array of classes which are to be removed

  $.each(current_classes, function (index, class_name) {
    // If the classname begins with page-trans add it to the classes_to_remove array
    if (/page-trans.*/.test(class_name)) {
      classes_to_remove.push(class_name);
    }
  });
  // turn the array back into a string
  return classes_to_remove.join(" ");
}