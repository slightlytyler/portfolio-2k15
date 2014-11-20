$(function() {
    $('#drawer-toggle').sidr({
      name: 'drawer',
      body: '#current-content',
      displace: false,
      speed: 150,
      onOpen: function() {
        // Lock Scrolling
        $('body').addClass('scroll-lock');

        // Add open classes
        $('#drawer-toggle').addClass('open');
        $('.drawer').addClass('open');

        // Extend Nav
        $('nav.main').addClass('extend');
      },
      onClose: function() {
        // Unlock Scrolling
        $('body').removeClass('scroll-lock');

        // Remove open classes
        $('#drawer-toggle').removeClass('open');
        $('.drawer').removeClass('open');
      }
    });

    $( "a:not(#drawer-toggle)" ).bind( "click", function() {
      window.setTimeout(function(){
        // Close the drawer
        $.sidr('close', 'drawer');
      }, 300);
    });  
});
