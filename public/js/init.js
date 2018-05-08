$(document).ready(() => {
    $('.sidenav').sidenav();
    $('select').formSelect();
    $('.modal').modal();

    var profImageUpload = $("#profImageUpload")[0];
    profImageUpload.onchange = function(event) {
    	$('#profImageForm').submit();
    }
    if ($("#ckeditor")[0]) {
		CKEDITOR.replace('ckeditor', {
			plugins: 'wysiwygarea,toolbar,basicstyles,link'
		});
	}
});
