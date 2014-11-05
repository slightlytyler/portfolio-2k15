// Any scripts that need to be executed on 
// traditional document ready need to be 
// placed here to be executed via smoothstate.

function pageLoad() {
  $('nav.main').stickyHeader('#nav-push');
  $('.blur-fade').blurFade('#blur-container');
}