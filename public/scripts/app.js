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

'use strict';

var defaultLanguage = 'eng';
var text = {
	'esp' : [
		{
			key : "hello",
			value : "mundo"
		},
		{
			key : "home-title",
			value : "Inicio"
		},
		{
			key : "home-description",
			value : "Ofrecemos soluciones, servicios y productos de tecnología a través de una ingeniosa organización adaptable a las necesidades de su empresa, negocio, hogar o espacio, con la capacidad de proveerle lo más novedoso y práctico en cualquiera de las siguientes áreas:"
		},
		{
			key : 'it-services-title',
			value : 'Servicios IT y Soporte'
		},
		{
			key : "it-service-desk-description",
			value : "El área de Servicios de Tecnología evoluciona constantemente y Service Desk es la práctica que marca la pauta en este sentido. Las empresas más competitivas del mercado nacional e internacional lo han seleccionado por su adaptabilidad, versatilidad y por la capacidad que ofrece de gestionar y solucionar toda posible incidencia de manera integral, planificada y metódica. Sus características son las siguientes:"
		},
		{
			key : "it-service-desk-b1",
			value : "Establecimiento del punto único de contacto, real o virtual"
		},
		{
			key : "it-service-desk-b2",
			value : "Inicio de la Gestión de Niveles de Servicio (Service Level Management)"
		},
		{
			key : "it-service-desk-b3",
			value : "Uso de varios canales de acceso"
		},
		{
			key : "it-service-desk-b4",
			value : "Énfasis en el seguimiento"
		},
		{
			key : "it-service-desk-b5",
			value : "Reporte y monitoreo de las actividades"
		},
		{
			key : "it-service-desk-b6",
			value : "Integración de las distintas áreas de IT"
		},
		{
			key : "it-service-desk-b7",
			value : "Filosofía de mejora continua"
		},
		{
			key : "it-service-desk-b8",
			value : "Respuesta proactiva"
		},
		{
			key : "it-service-desk-b9",
			value : "El cliente obtiene lo que demanda"
		},
		{
			key : "it-service-outsourcing-desc",
			value : "Si su empresa u organización no cuenta con el personal de soporte de IT dedicado, podemos actuar como su departamento para esta área. Le ofrecemos nuestra solución de outsourcing con planes adaptables a sus necesidades. En Gadget Technology le proporcionamos todo, desde la instalación y mantenimiento de servidores y estaciones de trabajo, hasta la administración de redes cableadas o inalámbricas."
		},
		{
			key : 'networking-title',
			value : 'Redes'
		},
		{
			key : "networking-desc",
			value : "Entre nuestras principales soluciones le ofrecemos el análisis, la logística e implementación de Redes de Área Local (LAN), Redes Inalámbricas (Wireless) y la infraestructura necesaria para configurar Redes Privadas Virtuales (VPN) en empresas y hogares. Instalamos todo tipo de redes, Cableadas  (UTP, Fibra Óptica) o inalámbricas (WI-FI)."
		},
		{
			key : "surveillance-title",
			value : "Cámaras de Seguridad"
		},
		{
			key : "surveillance-desc",
			value : "Instalación, configuración y soporte técnico en sistemas de cámaras de seguridad. Contamos con todo tipo de cámaras Análogas, IP o Wi-Fi, así como equipos de grabación DVR o NVR."
		},
		{
			key : "surveillance-t1",
			value : "Cámaras de Interiores"
		},
		{
			key : "surveillance-t1-desc",
			value : "Son las cámaras más sencillas que podemos encontrar. No necesitan una carcasa estanca o visión nocturna, ya que suele haber iluminación permanente durante las horas que se necesita supervisión."
		},
		{
			key : "surveillance-t2",
			value : "Cámaras con Infrarrojos"
		},
		{
			key : "surveillance-t2-desc",
			value : "Si van a estar colocadas en un lugar con poca iluminación o se necesita vigilancia las 24 horas, la mejor opción son las cámaras con visión nocturna. Estas cámaras graban durante el día a todo color y cuando hay poca iluminación encienden de forma automática sus infrarrojos para seguir grabando en blanco y negro."
		},
		{
			key : "surveillance-t3",
			value : "Cámaras Antivandálicas"
		},
		{
			key : "surveillance-t3-desc",
			value : "Las zonas transitadas por mucho público o locales especialmente vulnerables a robos y agresiones, son lugares indicados para el uso de cámaras antivandálicas. Estas cámaras se montan con una carcasa resistente a golpes y se mantienen fijas para seguir grabando todo lo que ocurre. Son perfectas para estacionamientos, almacenes, discotecas, bares o exteriores de tiendas."
		},
		{
			key : "surveillance-t4",
			value : "Cámaras IP"
		},
		{
			key : "surveillance-t4-desc",
			value : "Las cámaras IP son sistemas completos que se conectan directamente a Internet y muestran la imagen del lugar donde está colocada. Con una cámara IP puede utilizar su móvil para ver su casa desde cualquier parte del mundo, sin necesidad de otros equipos."
		},
		{
			key : "surveillance-t5",
			value : "Con Movimiento y Zoom  (PTZ)"
		},
		{
			key : "surveillance-t5-desc",
			value : "Las cámaras con zoom y movimiento son ideales para instalaciones de CCTV (Circuito Cerrado de Televisión) que tienen a una persona monitoreando las cámaras o para grandes superficies que se vigilan siguiendo una ruta de movimiento."
		},
		{
			key : "surveillance-t6",
			value : "Cámaras Ocultas"
		},
		{
			key : "surveillance-t6-desc",
			value : "Si necesita total discreción para vigilar algún lugar de su casa o negocio, le recomendamos las cámaras espías. Estas se colocan dentro de algún objeto (detectores de humo, sensores de movimiento, espejos, tornillos, enchufes, etc.) y pasan desapercibidas a todas las personas que circulen delante de ellas."
		},
		{
			key : "surveillance-t7",
			value : "Monitoreo Remoto"
		},
		{
			key : "surveillance-t7-desc",
			value : 'Le ofrecemos los mejores sistemas para mantener "a la vista" la seguridad de su negocio, hogar o empresa, desde donde quiera que usted se encuentre.'
		},
		{
			key : "audio-title",
			value : "Sistemas de Audio y Video"
		},
		{
			key : "audio-desc-p1",
			value : "Somos profesionales en la instalación de equipos de audio y video, así como en proyectores y teatro en casa (Home Teather), ya sea residencial, comercial o para su empresa."
		},
		{
			key : "audio-desc-p2",
			value : "Contamos con el personal capacitado para darle el mejor servicio y asesoría técnica, brindándole las mejores alternativas de ubicación de sus equipos de audio y optimizando los mismos, así también le ayudamos a mejorar la calidad de sonido de su teatro en casa y de sus amplificadores por medio de una calibración y cambio de cables de una alta gama."
		},
		{
			key : "audio-desc-p3",
			value : "Comercializamos e instalamos una amplia variedad de productos en los segmentos de equipos electrónicos, sistemas acústicos y automatización, desde parlantes, amplificadores, pre-amplificadores, CD y DVD players, sintonizadores, receivers surround, Blu-Ray players, proyectores, pantallas, plasmas, LCDs y cables para Home Theater e instalaciones comerciales."
		},
		{
			key : "audio-desc-tb1",
			value : "Para casas:"
		},
		{
			key : "audio-desc-tb1-text",
			value : "Home Theater, media room, etc."
		},
		{
			key : "audio-desc-tb2",
			value : "Para empresas:"
		},
		{
			key : "audio-desc-tb2-text",
			value : "Salas de conferencia, etc."
		},
		{
			key : "audio-desc-tb3",
			value : "Para comercios:"
		},
		{
			key : "audio-desc-tb3-text",
			value : "Sport Bar, Locales comerciales, etc."
		},
		{
			key : "automation-title",
			value : "Automatización"
		},
		{
			key : "automation-desc-p1",
			value : "Desarrollamos, distribuimos, instalamos e integramos productos y servicios enfocados a casas  inteligentes, automatización de oficinas, comercios, edificios corporativos, hoteles, hospitales, etc. Control y ajuste automático de escenas de iluminación, temperatura (para piso, espacios y albercas) y niveles de agua (cisternas, albercas, spas) desde su smartphone y/o dispositivo de preferencia."
		},
		{
			key : "automation-desc-p2-tb",
			value : "¿Qué es una Casa Inteligente?"
		},
		{
			key : "automation-desc-p2",
			value : "Una Casa Inteligente ajusta automáticamente la seguridad, la iluminación, la calefacción, el aire acondicionado, cámaras, persianas, sistemas de riego, audio y vídeo, para confort, conveniencia y ahorro de energía."
		},
		{
			key : "automation-desc-p3",
			value : "Una instalación puede incluir algunos o todos los sistemas anteriores e inclusive más, dependiendo de las necesidades y gustos. Estos sistemas funcionarán integrados y funcionarán como uno solo. Con el tiempo la casa gradualmente incrementa su valor, seguridad y eficiencia."
		},
		{
			key : "automation-desc-p4",
			value : "Una Casa Inteligente nos puede ayudar en disminuir el gasto energético para ahorrar dinero y a su vez cuidar el  medio ambiente, brindar comodidad y tranquilidad cuando estamos dentro o fuera de la casa, aumentar nuestra seguridad, auxiliar y facilitar la organización de nuestras actividades cotidianas, realizar nuevas tareas desde casa, etc."
		}

	],

	'eng' : [
		{
			key : "hello",
			value : "world"
		},
		{
			key : "home-title",
			value : "Home"
		},
		{
			key : "home-description",
			value : "We offer solutions, services and technology products, through an ingenious organization adaptive to the needs of your company, business, home or space, with the ability to provide the most innovative and practical in any of the following areas:"
		},
		{
			key : 'it-services-title',
			value : 'IT Services and Support'
		},
		{
			key : "it-service-desk-description",
			value : "Technology Services are continuously evolving and Service Desk is the practice that sets the standard in this regard. The most competitive companies in the domestic and international markets have chosen for its adaptability, versatility and the ability to manage and offered to settle potential impact of comprehensive, planned and methodical way. Its features are:"
		},
		{
			key : "it-service-desk-b1",
			value : "Establishment of a single point of contact, real or virtual"
		},
		{
			key : "it-service-desk-b2",
			value : "Home Management Service Level"
		},
		{
			key : "it-service-desk-b3",
			value : "Using multiple access channels"
		},
		{
			key : "it-service-desk-b4",
			value : "Emphasis on track"
		},
		{
			key : "it-service-desk-b5",
			value : "Reporting and monitoring activities"
		},
		{
			key : "it-service-desk-b6",
			value : "Integration of the different areas of IT"
		},
		{
			key : "it-service-desk-b7",
			value : "Philosophy of continuous improvement"
		},
		{
			key : "it-service-desk-b8",
			value : "Proactive response"
		},
		{
			key : "it-service-desk-b9",
			value : "The customer gets what demand"
		},
		{
			key : "it-service-outsourcing-desc",
			value : "If your company or organization does not have personnel dedicated IT support, we can act as your department for this area. We offer our outsourcing solution adapted to your needs plans. Gadget Technology provides everything from installation and maintenance of servers and workstations, to management of wired and wireless networks."
		},
		{
			key : 'networking-title',
			value : 'Networking'
		},
		{
			key : "networking-desc",
			value : "Among our main solutions we offer analysis, logistics and implementation of Local Area Networks (LAN) , wireless networks (Wireless) and the infrastructure to configure Virtual Private Networks (VPN) in businesses and homes. We install all types of networks, Wired (UTP, fiber) or wireless (WI-FI)."
		},
		{
			key : "surveillance-title",
			value : "Surveillance Cameras"
		},
		{
			key : "surveillance-desc",
			value : "Installation, configuration and support in systems security cameras. We have all types of analog cameras, IP or Wi-Fi, as well as recording equipment DVR or NVR."
		},
		{
			key : "surveillance-t1",
			value : "Interior Cameras"
		},
		{
			key : "surveillance-t1-desc",
			value : "The simplest cameras that we can find are the interior. They do not need a waterproof case or night vision since there is usually permanent lighting during the hours that monitoring is needed."
		},
		{
			key : "surveillance-t2",
			value : "Infrared Cameras"
		},
		{
			key : "surveillance-t2-desc",
			value : "If they are to be placed in a location with poor lighting or surveillance is needed 24 hours, the best option is with night vision cameras. These cameras record full color during the day and in low light conditions, automatically turn on their infrared to continue recording in black and white."
		},
		{
			key : "surveillance-t3",
			value : "Vandal Proof Cameras"
		},
		{
			key : "surveillance-t3-desc",
			value : "The much-traveled public areas and local especially vulnerable to robbery and assault are places indicated for use in vandal proof cameras. These cameras are mounted with a shock resistant casing and remain fixed to continue recording everything that happens. They are perfect for parking lots, stores, discos, bars and outdoor shops."
		},
		{
			key : "surveillance-t4",
			value : "IP Cameras"
		},
		{
			key : "surveillance-t4-desc",
			value : "IP cameras are complete systems that connect directly to the Internet and display the image of where it is placed. With an IP camera you can use your phone to see your home from anywhere in the world, without additional equipment."
		},
		{
			key : "surveillance-t5",
			value : "Cameras with Zoom and movement (PTZ)"
		},
		{
			key : "surveillance-t5-desc",
			value : "These cameras are ideal for installations of CCTV (Closed Circuit Television) having one person monitoring, or for large areas that are monitored following a motion path."
		},
		{
			key : "surveillance-t6",
			value : "Hidden Cameras"
		},
		{
			key : "surveillance-t6-desc",
			value : "If you need complete discretion to monitor somewhere in your home or business, we recommend spy cameras. These are placed within an object (smoke detectors, motion sensors, mirrors, screws, plugs, etc.) and go unnoticed to all persons traveling in front of them."
		},
		{
			key : 'audio-title',
			value : 'Audio & Video'
		},
		{
			key : "audio-desc-p1",
			value : "We are professionals in the installation of audio and video, as well as projectors and home theater, whether residential, commercial or for your company."
		},
		{
			key : "audio-desc-p2",
			value : "Our staff is trained to give the best service and technical support staff, providing the best alternative location for its audio and optimizing them, so help you improve the sound quality of your home theater and its amplifiers through a calibration and change of high-end cables."
		},
		{
			key : "audio-desc-p3",
			value : "We sell and install a wide variety of products in the sectors of electronics, acoustic systems and automation. Speakers, amplifiers, pre-amplifiers, CD and DVD players, tuners, surround receivers, Blu-Ray players, projectors, screens, plasmas, LCDs and cables for Home Theater and commercial facilities."
		},
		{
			key : "audio-desc-tb1",
			value : "For homes:"
		},
		{
			key : "audio-desc-tb1-text",
			value : "Home Theater, media room, etc."
		},
		{
			key : "audio-desc-tb2",
			value : "Business:"
		},
		{
			key : "audio-desc-tb2-text",
			value : "Conference room, etc."
		},
		{
			key : "audio-desc-tb3",
			value : "To shops:"
		},
		{
			key : "audio-desc-tb3-text",
			value : "Sport Bar, Commercial premises, etc."
		},
		{
			key : "automation-title",
			value : "Automation"
		},
		{
			key : "automation-desc-p1",
			value : "We develop, distribute, install and integrate products and services focused on smart homes, office automation, shops, office buildings, hotels, hospitals, etc. Automatic adjustment of lighting scenes, temperature (for floor, spaces and pools) and water levels (tanks, swimming pools, spas) from your smartphone and / or device of choice."
		},
		{
			key : "automation-desc-p2-tb",
			value : "¿What is a Smart Home?"
		},
		{
			key : "automation-desc-p2",
			value : "A Smart Home automatically adjusts security, lighting, heating, air conditioning, cameras, blinds, irrigation systems , audio and video , for comfort, convenience and energy savings."
		},
		{
			key : "automation-desc-p3",
			value : "An installation may include some or all of the above systems or even more, depending on the needs and tastes. These integrated systems work and function as one. The house gradually increases its value, safety and efficiency."
		},
		{
			key : "automation-desc-p4",
			value : "A Smart Home can help us reduce energy spending to save money and in turn the environment care, providing comfort and quiet when we are inside or outside the house, increase our security, assistant and facilitate the organization of our daily activities, making new work from home, etc."
		}
	]
}

var setText = function(language){
	var translations = text[language];
	for (var i = translations.length - 1; i >= 0; i--) {
		$("."+translations[i].key).each(function(){
			$(this).text(translations[i].value);
		});
	};
	console.log('translating');
}

var setImages = function(language){
	$(".item>img").each(function(){
		var elem = $(this),
			src = elem.attr('src'),
			re = language === 'esp' ? /eng/gi : /esp/gi;
		var newSrc = src.replace(re, language);
		elem.attr('src', newSrc);
		console.log(re, language, src, newSrc);
	});
}

var initTranslate = function (){
	var elem = $("#language-switch");
	
	var language = sessionStorage.getItem('language');
	language = !language ? defaultLanguage : language;

	sessionStorage.setItem('language', language);
	elem.html(language);
	
	elem.on('click', function(){
		var language = sessionStorage.getItem('language');
		if(language === 'eng')
			language = 'esp';
		else
			language = 'eng';

		elem.html(language);
		sessionStorage.setItem('language', language);
		setText(language);
		setImages(language);
	});

	$(".gadget-language-sw-arrow").on('click', function(){
		elem.click();
	});
	
	setText(language);
}