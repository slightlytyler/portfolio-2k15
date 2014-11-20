// Any scripts that need to be executed or 
// unbound when a page prepares to exit
// placed here to be executed via smoothstate.

function pageExit(_callback) {
  $('nav.main').stickyHeader('destroy');

  if (typeof _callback === "undefined" || _callback === null) {
    console.log('No callback on pageLoad, proceeding');
  } else {
    _callback(); 
  }
}
;
