/*jshint node:true*/

module.exports = function(app) {
  var redis = require('redis');
  var requestProxy = require('express-request-proxy');
  var https = require('https');
  var through2 = require('through2');

  require('redis-streams')(redis);

  app.get('/api/*',  requestProxy({
    cache: redis.createClient(),
    cacheMaxAge: 300,
    url: 'https://www.reserveamerica.com/*',
    query: {
      xml: true
    }
  }));

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

  var svgTransform = {
      contentType: 'image/svg+xml',
      transform: function() {
        return through2(function(chunk, enc, cb) {
          this.push(chunk);
          cb();
        });
      }
    };

  app.get('/map/background/:cc/:pid',
    getSessionId,
    requestProxy({
      // cache: redis.createClient(),
      // cacheMaxAge: 300,
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
        // cache: redis.createClient(),
        // cacheMaxAge: 300,
          url: 'https://www.reserveamerica.com/getSVGFragment.do',
          query: {
            'olAction': 'getIcons'
          },
          transforms: [svgTransform]
        })
      );


};
