function homePage() {
  var prevHeight = 0;
  var headerHeight = $('body > header').outerHeight();

  $('.home > *:not(.portfolio--list)').each(function () {
    var prevHeight = $(this).prev().outerHeight();
    $(this).css({ top: (prevHeight + headerHeight) });
  });

  var displaceHeight = 0;

  $('.portfolio--list').prevAll().each(function() {
    displaceHeight += $(this).outerHeight();
    console.log(displaceHeight);
  });

  $('.portfolio--list').css({ 'margin-top': displaceHeight });
}