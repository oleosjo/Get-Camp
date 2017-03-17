/*jshint node:true*/

module.exports = function(app) {
  var redis = require('redis');
  var requestProxy = require('express-request-proxy');
  var https = require('https');
  var http = require('http');
  var through2 = require('through2');

  require('redis-streams')(redis);

  app.get('/api/v1/*',  requestProxy({
    cache: redis.createClient(),
    cacheMaxAge: 86400,
    url: 'https://www.reserveamerica.com/*',
    query: {
      xml: true
    }
  }));

  var svgTransform = {
    contentType: 'image/svg+xml',
    transform: function() {
      return through2(function(chunk, enc, cb) {
        this.push(chunk);
        cb();
      });
    }
  };

  var getSessionId = function (req, res, next) {
      https.get({host: 'www.reserveamerica.com',
                path: '/campgroundDetails.do?contractCode=' + req.params.cc + '&parkId=' + req.params.pid},
        function(res) {
          var cookieString = JSON.stringify(res.headers['set-cookie']);
          var re = /JSESSIONID=([^;]*)/ig;
          var id = re.exec(cookieString)[0];

          req.headers["Cookie"] = id;

          next();
        });
    };

  app.get('/map/background/:cc/:pid',
    getSessionId,
    requestProxy({
      cache: redis.createClient(),
      cacheMaxAge: 86400,
        url: 'https://www.reserveamerica.com/getSVGFragment.do',
        query: {
          'olAction': 'getCampgroundMap'
        },
        transforms: [svgTransform]
      })
    );

  app.get('/map/icons/:cc/:pid',
      getSessionId,
      requestProxy({
        cache: redis.createClient(),
        cacheMaxAge: 86400,
          url: 'https://www.reserveamerica.com/getSVGFragment.do',
          query: {
            'olAction': 'getIcons'
          },
          transforms: [svgTransform]
        })
      );

  app.get('/campsitephotos/:cc/:pid/:sid', function(req, res, next) {

    function tryPhotos(callback) {
      var photourls = [];

      var tryPhoto = function(index) {
        var pathString = '/webphotos/' + req.params.cc + '/pid' + req.params.pid + '/sid' + req.params.sid + '/' + index + '/540x360.jpg';
        http.get(
        {host: 'www.reserveamerica.com', path: pathString},
        function(photores) {
          if (photores.statusCode === 200) {
            // photo exists, try next
            photourls[index] = 'http://reserveamerica.com' + pathString;
            tryPhoto(index + 1, photourls);
          } else {
            return callback(photourls);
          }
        });
      }
      tryPhoto(0);
    }

    tryPhotos(function(urls) {
      res.send(urls);
    });

  });


};
