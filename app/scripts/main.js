'use strict';

$(document).ready(function(){
	var location = window.location.href.toString().split(window.location.host)[1]; //document.write(url.replace(/^(?:\/\/|[^\/]+)*\//, ""));
	
	$('#header').load('layout/_header.html', function(){
		initTranslate();
		$('#footer').load('layout/_footer.html', function(){
			setText(sessionStorage.getItem('language'));
		});
	});
	$('#carousel').load('layout/_carousel.html', function () {
		setImages(sessionStorage.getItem('language'));
		var carousel = $('#main-carousel');
		carousel.carousel({
			pause : false,
			interval : 2000
		});

		$('#main-carousel .carousel-indicators li').on('click', function(){
			var target = this.dataset.slideTo;
			if(target > 0){
				carousel.carousel('pause');
			}else{
				carousel.carousel('cycle');
			}

			var callback = function (){
				setText(sessionStorage.getItem('language'));
				$('#contact').load('layout/_contact.html');
			};

			if(target == 0)
				$('#main-content').load('content/home.html', callback);
			else if(target == 1)
				$('#main-content').load('content/it.html', callback);
			else if(target == 2)
				$('#main-content').load('content/networking.html', callback);
			else if(target == 3)
				$('#main-content').load('content/surveillance.html', callback);
			else if(target == 4)
				$('#main-content').load('content/audio.html', callback);
			else
				$('#main-content').load('content/automation.html', callback);

		});
	});
});
