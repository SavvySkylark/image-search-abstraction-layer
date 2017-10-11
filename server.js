// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();
const https = require('https');
const querystring = require('querystring');

// const imgur3Endpoint = 'https://api.imgur.com/3/gallery/search/time';
// const clientId = 'Client-ID 6d3b8c258bd2240';
const googleKey = 'AIzaSyCHeLtdeiTuqcJoczSPcuDtWjNuSoY3jzM';
const cx = '011541652210393335320:-1oqqax2pvg';
const numResults = 5;
// const googleSearchEndpoint = 'https://www.googleapis.com/customsearch/v1';

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/api/google/imagesearch/:search', function(request,response) {

  var offset = (request.query.offset||1) - 1;
  var searchTerms = request.params.search;

  var query = {
    key: googleKey,
    cx: cx,
    q: searchTerms,
    num: numResults,
    start: offset * numResults + 1
  };

  var options = {
    hostname: 'www.googleapis.com',
    port: '443',
    path: '/customsearch/v1?' + querystring.stringify(query),
    method: 'GET'
  };
  // response.end('hello world');
  var googleReq =  https.request(options, (res) => {
    res.setEncoding('utf8');
    var payload = '';
    res.on('error', (e) => {
      console.log(`problem with request: ${e.message}`);
      response.end();
    });
    res.on('data', (d) => {
      payload += d;
    });
    res.on('end', () => {
      var myResponsePayload = [];
      var itemToPush;
      payload = JSON.parse(payload);
      payload.items.forEach(function(item) {
        itemToPush = {
          url: item.pagemap.ces_image[0].src,
          snippet: item.snippet,
          thumbnail: item.pagemap.ces_thumbnail[0].src,
          context: item.link
        };
        myResponsePayload.push(itemToPush);
      });
      response.end(myResponsePayload);
    });
  });
  googleReq.on('error', (e) => {
    console.log(`problem with request: ${e.message}`);
    response.end();
  });
  googleReq.end();

});

app.get('/api/imgur/imagesearch/:search', function(request, response) {
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
  var imageList = [];
  console.log(JSON.stringify(options));
  var req = https.request(options, (res) => {
    var body = '';
    res.setEncoding('utf8');
    res.on('data', (d) => {
      body += d;
    });
    res.on('end', ()=>{
      console.log();
      // response.write(body);

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

module.exports = listener;
