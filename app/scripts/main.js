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
			interval : 5000
		});

		var callback = function(target){
			if(target > 0){
				carousel.carousel('pause');
			}else{
				carousel.carousel('cycle');
			}

			var cb = function (){
				setText(sessionStorage.getItem('language'));
				$('#contact').load('layout/_contact.html');
			};

			if(target == 0)
				$('#main-content').load('content/home.html', cb);
			else if(target == 1)
				$('#main-content').load('content/it.html', cb);
			else if(target == 2)
				$('#main-content').load('content/networking.html', cb);
			else if(target == 3)
				$('#main-content').load('content/surveillance.html', cb);
			else if(target == 4)
				$('#main-content').load('content/audio.html', cb);
			else
				$('#main-content').load('content/automation.html', cb);
		};

		$('#main-carousel .item').on('click', function(){
			var classes = $(this).attr('class');
			var target = classes.split(' ').filter(function(next){
				if(next.startsWith('item-'))
					return true;
				return false;
			})[0];
			
			if(target == 'item-home')
				callback(0);
			else if(target == 'item-it')
				callback(1);
			else if(target == 'item-networking')
				callback(2);
			else if(target == 'item-surveillance')
				callback(3);
			else if(target == 'item-audio')
				callback(4);
			else
				callback(5);
		});

		$('#main-carousel .carousel-indicators li').on('click', function(){
			var target = this.dataset.slideTo;
			callback(target);
		});
	});
});
