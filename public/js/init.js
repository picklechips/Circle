$(document).ready(() => {
    $('.sidenav').sidenav();
    $('select').formSelect();
});

CKEDITOR.replace('ckeditor', {
	plugins: 'wysiwygarea,toolbar,basicstyles,link'
});