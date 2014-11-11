// Any scripts that need to be executed on 
// traditional document ready need to be 
// placed here to be executed via smoothstate.

function pageLoad(_callback) {
  $('nav.main').stickyHeader('#current-content #nav-push');
  $('#current-content .blur-fade').blurFade('#blur-container');
  console.log(_callback)

  if (typeof _callback === "undefined" || _callback === null) {
    console.log('No callback on pageLoad, proceeding');
  } else {
    console.log('Callback found, firing ' + _callback);
    _callback(); 
  }
}