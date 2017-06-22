// JavaScript Document
if( !window.AnclasPlugin ){
	function AnclasPlugin(){
		
		function init(){
			var root = $('html, body');
				
			$('a[href^=#]').click(function(){
					
				var href = $(this).attr('href');
				var name = href.substring(1);
				root.animate({
					scrollTop: $( 'a[name="'+name+'"]' ).offset().top
				}, 500);
					
				var urlBase = window.location.href.split('#')[0];
					
				window.location.href = urlBase + href;
					
				return false;
				
			});
		}

		$(document).ready( init );
		
	}
	
}
AnclasPlugin();