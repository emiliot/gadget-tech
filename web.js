var express = require('express');
var app = express();

app.use(express.static(__dirname + '/dist'));

app.set('port', (process.env.PORT || 80));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

app.get('/', function(request, response){
	response.sendFile(__dirname + '/dist/index.html');
});
