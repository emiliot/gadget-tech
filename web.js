var express = require('express');
var app = express();

app.use(express.static(__dirname + '/dist'));

app.set('port', (process.env.PORT || 5000));
app.set('views', __dirname + '/dist');
app.set('view engine', 'html');

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

app.get('/', function(request, response){
	response.render('dist/index.html');
});
