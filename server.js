// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();
const https = require('https');
const querystring = require('querystring');

const imgur3Endpoint = 'https://api.imgur.com/3/gallery/search/time';
const clientId = 'Client-ID 6d3b8c258bd2240';

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/api/imagesearch/:search', function(request, response) {
  var offset = request.query.offset||-999;
  request.params.search;
  var qsObj = {
    q: request.params.search
  };
  var offSetUri;
  if (offset > 0) {
    offSetUri = '/' + offset;
  } else {
    offSetUri = '';
  }
  
  var imgurUri = '/3/gallery/search/time' + offSetUri + '?' + querystring.stringify(qsObj);
  var options = {
    hostname: 'api.imgur.com',
    port: '443',
    path: imgurUri,
    method: 'GET',
    headers: {
      'Authorization': 'Client-ID 5d3b8c258bd2240'
    }
  };

  console.log(JSON.stringify(options));
  var req = https.request(options, (res) => {
    res.on('data', (d) => {
      response.write(d);
    });
    res.on('end', ()=>{
      response.end();
    });
    res.on('error', (err) => {
      console.log(err);
    });
  });
  req.on('error', (e) => {
    console.error(e);
  });
  req.end();
});

// listen for requests :)
var listener = app.listen('9080', function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
