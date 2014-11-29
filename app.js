
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var omx = require('./omx');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

omx.start({
    input: 'test.mp4'
});

app.post('/control', function (req, res) {

    console.info(req.body);

    omx[req.body.command]().then(function(){
        res.send('Hello World!')
    });
});

var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port)

});






