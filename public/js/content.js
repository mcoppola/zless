$(function(){

	$('section').addClass('hide');

	$('.front').click(function(e){
		$('section').removeClass('hide');
		$('.enter').html('hello  :)');
	});


});