var http  = require('http');
var proxy = require('http-proxy').createProxyServer();

var listenPort = parseInt(process.argv[2]);
var target = 'http://localhost:' + process.argv[3];
if (process.argv.length < 3) {
	listenPort = 80;
	target = 'http://localhost:3232';
}

proxy.on('error', function (err, req, res) {
	res.writeHead(500, {'Content-Type': 'text/plain'});
	res.end('Server Error');
});

var server = http.createServer(function(req,res) {
	proxy.web(req, res, {target: target, changeOrigin: true});
});

console.log('[+] Proxying 0.0.0.0:' + listenPort + ' to ' + target)
server.listen(listenPort);