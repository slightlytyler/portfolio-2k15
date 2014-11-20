$.fn.windowOffset = function(direction) { 
    $self = $(this);

    var $offset = $self.offset();
    var $height = $self.outerHeight();
    var $width = $self.outerWidth();

    var $calculatedOffset = {
        left : 0,
        right: 0,
        top : 0,
        bottom: 0
    };


    $calculatedOffset.top = $offset.top - $(window).scrollTop();
    $calculatedOffset.bottom = $offset.top - $(window).scrollTop() + $height;
    $calculatedOffset.left = $offset.left - $(window).scrollLeft(); 
    $calculatedOffset.right = $offset.left - $(window).scrollLeft() + $width; 

    if(direction == 'top') {
        return $calculatedOffset.top;
    } else if(direction == 'bottom') {
        return $calculatedOffset.bottom;
    } else if(direction == 'left') {
        return $calculatedOffset.left;
    } else if(direction == 'right') {
        return $calculatedOffset.right;
    } else {
        throw('Offset direction not recognized, expecting top, bottom, left, or right.')
    }
}
;
