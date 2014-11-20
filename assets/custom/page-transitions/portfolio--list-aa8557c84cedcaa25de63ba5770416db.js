$.fn.portfolioListOnStart = function() {
  // Portfolio transition
  //
  $anchor = $(this);
  var $portfolioListItem = $anchor.parent();
  var $offsetTop = $portfolioListItem.windowOffset('top');

  // Offset selected item so it stays the same in position fixed
  $portfolioListItem.css('top', $offsetTop);

  // Add margin top to compensate for selcted portfolio item
  // being out of the flow of the document
  $portfolioListItem.next().css('margin-top', $portfolioListItem.outerHeight())
}
;
