'use strict';

$(document).ready(function(){
	var location = window.location.href.toString().split(window.location.host)[1]; //document.write(url.replace(/^(?:\/\/|[^\/]+)*\//, ""));
	
	$('#header').load('layout/_header.html', function(){
		translateText();
	});
	$('#contact').load('layout/_contact.html');
	$('#footer').load('layout/_footer.html');
	$('#carousel').load('layout/_carousel.html', function () {
		$('#main-carousel .carousel-indicators li').on('click', function () {			
			switch(this.dataset.slideTo) {
				case '1':
					console.log('/it-services-and-support.html');
					window.location = '/it-services-and-support.html';
					break;

				case '2':
					console.log('/networking.html');
					window.location = '/networking.html';
					break;

				case '3':
					console.log('/surveillance-cameras.html');
					window.location = '/surveillance-cameras.html';
					break;

				case '4':
					console.log('/audio-and-video.html');
					window.location = '/audio-and-video.html';
					break;

				case '5':
					console.log('/automation.html');
					window.location = '/automation.html';
					break;

				default:
					window.location = '/';
					break;
			}
		});


		var carrusel = $(this).children('.carousel')[0];
		$(carrusel).carousel({ pause: true, interval: false });
		switch($(this).attr('class')) {
			case 'carousel-it':
				$(carrusel).carousel(1);
				console.log("IT Services & Support");
				break;
			case 'carousel-networking':
				$(carrusel).carousel(2);
				console.log("Networking");
				break;
			case 'carousel-surveillance':
				$(carrusel).carousel(3);
				console.log("Surveillance Cameras");
				break;
			case 'carousel-audio':
				$(carrusel).carousel(4);
				console.log("Audio and Video");
				break;
			default:
				$(this).carousel(0);
				$(carrusel).carousel({ pause: false, interval: 5000 });
				console.log("Index");
				break;
		}
	});
});
