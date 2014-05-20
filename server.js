// bouncy-port
//
// uses seaport and bouncy to route to nodejs apps
//
// params
//  - seaport host:port
//  - domain
//  - health endpoint
//  -
var bouncy = require('bouncy');
var seaport = require('seaport');

module.exports = function (argv) {
  var seaportUrl = argv.seaport.split(':');
  var domain = argv.domain;
  var ports = seaport.connect(seaportUrl[0], parseInt(seaportUrl[1], 10));

  // validate flags
  if (!argv.seaport) return console.log('--seaport=HOST:PORT is required');
  if (!argv.domain) return console.log('--domain=HOST ie. (--domain=*.foo.com)');

  var server = bouncy(function (req, res, bounce) {
    if (req.url === (argv.health || '/health')) {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('Healthy');
    }

    if (req.headers.host.indexOf(domain) === -1) {
      res.writeHead(503, {'Content-Type': 'text/plain'});
      res.end('you have requested a response from the wrong host');
      return;
    }

    var app = req.headers.host.replace(domain, '');
    
    var ps = ports.query(app);

    if (argv.debug) console.log('%s Bouncing to %s',
      (new Date).toString(), JSON.stringify(appProcess));

    if (ps.length === 0) {
      res.writeHead(503, {'Content-Type': 'text/plain'});
      res.end('service not available');
    } else {
      var appProcess = ps[Math.floor(Math.random() * ps.length)];
      bounce(appProcess);
    }
  }).listen(argv.port || 8000);
  return server;
};
