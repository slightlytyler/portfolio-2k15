// These are the main ones. Add more as needed.
function getAndroidVersion(ua) {
  var ua = ua || navigator.userAgent; 
  var match = ua.match(/Android\s([0-9\.]*)/);
  return match ? parseFloat(match[1]) : false;
};

function getIOSVersion(ua) {
  var ua = ua || navigator.userAgent;
  var match = parseFloat(
  ('' + (/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent) || [0,''])[1])
  .replace('undefined', '3_2').replace('_', '.').replace('_', '')
  ) || false;
  return match;
}

// If isMobile
function isMobile(ua) {
  var ua = ua || navigator.userAgent; 
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
   return true;
  } else {
    return false;
  }
}