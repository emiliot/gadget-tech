'use strict';

$(document).ready(function(){
	var location = window.location.href.toString().split(window.location.host)[1]; //document.write(url.replace(/^(?:\/\/|[^\/]+)*\//, ""));
	
	$('#header').load('layout/_header.html', function(){
		initTranslate();
		$('#footer').load('layout/_footer.html', function(){
			setText(sessionStorage.getItem('language'));
		});
	});
	$('#contact').load('layout/_contact.html');
	$('#carousel').load('layout/_carousel.html', function () {
		$('#main-carousel .carousel-indicators li').on('click', function () {			
			switch(this.dataset.slideTo) {
				case '1':
					window.location = '/it-services-and-support.html';
					break;

				case '2':
					window.location = '/networking.html';
					break;

				case '3':
					window.location = '/surveillance-cameras.html';
					break;

				case '4':
					window.location = '/audio-and-video.html';
					break;

				case '5':
					window.location = '/automation.html';
					break;

				default:
					window.location = '/';
					break;
			}
		});

		setImages(sessionStorage.getItem('language'));


		var carrusel = $(this).children('.carousel')[0];
		$(carrusel).carousel({ pause: true, interval: false });
		switch($(this).attr('class')) {
			case 'carousel-it':
				$(carrusel).carousel(1);
				break;
			case 'carousel-networking':
				$(carrusel).carousel(2);
				break;
			case 'carousel-surveillance':
				$(carrusel).carousel(3);
				break;
			case 'carousel-audio':
				$(carrusel).carousel(4);
				break;
			case 'carousel-automation':
				$(carrusel).carousel(5);
				break;
			default:
				$(this).carousel(0);
				$(carrusel).carousel({ pause: false, interval: 5000 });
				break;
		}
	});
});
