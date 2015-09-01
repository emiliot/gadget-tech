'use strict';

function translateText(){
	var elem = $("#language-switch");
	elem.on('click', function(){
		console.log('translated');
	});
	console.log('in translate');
}