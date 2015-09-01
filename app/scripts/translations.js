'use strict';

var defaultLanguage = 'en';
var text = {
	'es' : [
		{
			key : "hello",
			value : "mundo"
		}
	],

	'en' : [
		{
			key : "hello",
			value : "world"
		}
	]
}

var setText = function(language){
	var translations = text[language];
	for (var i = translations.length - 1; i >= 0; i--) {
		$("#" + translations[i].key).text(translations[i].value);
		// console.log(translations[i].key, translations[i].value);
	};
}

var initTranslate = function (){
	var elem = $("#language-switch");
	sessionStorage.setItem('language', defaultLanguage)
	elem.on('click', function(){
		var language = sessionStorage.getItem('language');
		if(language === 'en')
			language = 'es';
		else
			language = 'en';

		sessionStorage.setItem('language', language);
		setText(language);
	});
}