

$(document).ready(function() { 
	$("#btn-gest,.li-gest,#btn-com").click(function(){
		$("#gestoria,#comfort-car").css("display", "block");


	})   

	$('#sidebar').stickyMojo({footerID: '#footer', contentID: '#content'});

	$('.ancla').click(function(){
		var link = $(this);
		var anchor  = link.attr('href');
		$('html, body').stop().animate({
			scrollTop: jQuery(anchor).offset().top
		}, 1500);
		return false;
	});
});