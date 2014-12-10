
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var omx = require('./omx');
var stream = require('stream');
var fs = require('fs');
var formidable = require('formidable');
var spawn = require('child_process').spawn;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(express.static(__dirname + '/public'));


app.get('/', function(rep, res){

    res.render('index.html');
});

var vlc = spawn('/Applications/VLC.app/Contents/MacOS/VLC', ['-']);

vlc.stdout.on('data', function (data) {
    console.log('vlc stdout' + data);
});

vlc.stderr.on('data', function (data) {
    console.log('vlc stderr: ' + data);
});

vlc.on('close', function (code) {
    console.log('vlc process exited with code ' + code);
});


app.post('/control', function (req, res) {

    console.info(req.body);

    omx[req.body.command]().then(function(){
        res.send('Hello World!')
    });
});


var writeToVLCStdin = function(data) {
    //console.log('Write to stdin');
    vlc.stdin.write(data);
};

app.post('/upload', function (req, res) {

    //vlc -
    var form = new formidable.IncomingForm();
    var writeStream = fs.createWriteStream('./test');
    //var Writable = require('stream').Writable;

    form.onPart = function (part) {
        console.log('Log parts');
        //console.log(part);

        part.removeListener('data', writeToVLCStdin);

        part.addListener('data', writeToVLCStdin);

        part.addListener('end', function () {
            res.send('love');

        })

    };

    form.parse(req, function(err, fields, files) {
        console.log(files);
    });

    //form.on('end', function() {
    //
    //    res.send('love');
    //
    //});




    //console.info(req.body);

    //omx[req.body.command]().then(function(){
    //    res.send('Hello World!')
    //});
});

var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port)
});






