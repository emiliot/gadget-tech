'use strict';

$(document).ready(function(){
	var location = window.location.href.toString().split(window.location.host)[1]; //document.write(url.replace(/^(?:\/\/|[^\/]+)*\//, ""));
	
	$('#header').load('layout/_header.html');
	$('#contact').load('layout/_contact.html');
	$('#footer').load('layout/_footer.html');
	$('#carousel').load('layout/_carousel.html', function () {
		console.log("hola");
		$('#main-carousel .carousel-indicators li').on('click', function () {
			console.log(location);
			switch(this.dataset.slideTo) {
				case '1':
					console.log("IT Services & Support");
					window.location = '/it-services-and-support.html';
					break;

				case '2':
					console.log("Networking");
					window.location = '/networking.html';
					break;

				case '3':
					console.log("Surveillance Cameras");
					window.location = '/surveillance-cameras.html';
					break;

				case '4':
					console.log("Audio & Video");
					window.location = '/audio-and-video.html';
					break;

				case '5':
					console.log("Automation");
					window.location = '/automation.html';
					break;

				default:
					window.location = '/';
					break;
			}
		});
	});
});
