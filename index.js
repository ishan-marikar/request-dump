#!/usr/bin/env node

var http = require('http');
var httpProxy = require('http-proxy');
var chalk = require('chalk');
var argv = require('minimist')(process.argv.slice(2));
var multiline = require('multiline');
var server = http.createServer();
var proxy = httpProxy.createProxyServer({});

var showHelp = function() {
  var title = multiline(function(){
    /*
    ____  ____  __   _  _  ____  ____  ____     ____  _  _  _  _  ____
   (  _ \(  __)/  \ / )( \(  __)/ ___)(_  _)___(    \/ )( \( \/ )(  _ \
    )   / ) _)(  O )) \/ ( ) _) \___ \  )( (___)) D () \/ (/ \/ \ ) __/
   (__\_)(____)\__\)\____/(____)(____/ (__)    (____/\____/\_)(_/(__)
                                                                        v0.0.1-ALPHA
USAGE:
    --port=<port> - Port to listen on for requests (ex. --port=1234) Mandatory
    --host<host> - Host to forward traffic from port to. (ex. --host=http://localhost:8080) Optional
EXAMPLE:
    request-dump --port=8080 --host=http://localhost:3000
     */
  });
  console.log(title);
};

var logRequest = function(request) {
  console.log('\n', new Date().toISOString());
  console.log(chalk.white.bold(request.method), chalk.blue.bold(request.url));
  console.log(chalk.gray.bold('Headers:'));
  for (var header in request.headers) {
    console.log('\t', chalk.underline.bold.yellow(header), chalk.dim(': '), chalk.white.bold(request.headers[header]));
  }
};

if (!argv.port) {
  console.error('Port is missing. Please run the command with --port=<port>');
  showHelp();
  process.exit(1);
}

server.on('request', function(request, response) {
  logRequest(request);
  var body = [];
  request.on('data', function(chunk) {
    body.push(chunk);
  }).on('end', function() {
    body = Buffer.concat(body).toString();
    console.log('\n\t', chalk.white.bold(body));
    if (!argv.host) {
      console.log(chalk.gray.bold('Body:'));
      response.end(body);
    } else {
      proxy.web(request, response, {
        target: argv.host
      });
    }
  });
});

server.listen(argv.port);
