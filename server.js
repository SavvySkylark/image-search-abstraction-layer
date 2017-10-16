// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();
const https = require('https');
const querystring = require('querystring');

//information needed to successfully call google api
const googleKey = 'AIzaSyCHeLtdeiTuqcJoczSPcuDtWjNuSoY3jzM';
const cx = '011541652210393335320:-1oqqax2pvg';
const numResults = 5;

//list containing lastest searches
var latestSearches = [];

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/api/imagesearch/:search', function(request,response) {

  var offset = (request.query.offset||1) - 1;
  var searchTerms = request.params.search;
  var currentDate = new Date();

  if(latestSearches.length > 9) {
    latestSearches.pop();
  }

  latestSearches.unshift({
    term: searchTerms,
    when: currentDate.toDateString() 
  });

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
          url: item.pagemap.cse_image[0].src,
          snippet: item.snippet,
          thumbnail: item.pagemap.cse_thumbnail[0].src,
          context: item.link
        };
        myResponsePayload.push(itemToPush);
      });
      response.setHeader('Content-Type', 'application/json');
      response.end(JSON.stringify(myResponsePayload));
    });
  });
  googleReq.on('error', (e) => {
    console.log(`problem with request: ${e.message}`);
    response.end();
  });
  googleReq.end();

});

app.get('/api/latest/imagesearch', function(request, response) {
  response.setHeader('Content-Type', 'application/json');
  response.end(JSON.stringify(latestSearches));
});

// listen for requests :)
var listener = app.listen('9080', function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

module.exports = listener;
