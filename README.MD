# request-dump

A command line utility to inspect and relay web requests.


## Usage
    --port=<port> - Port to listen on for requests (ex. --port=1234) Mandatory
    --host<host> - Host to forward traffic from port to. (ex. --host=http://localhost:8080) Optional

## Example
    request-dump --port=8080 --host=http://localhost:3000

## Installation

Download node at [nodejs.org](http://nodejs.org) and install it, if you haven't already.

```sh
npm install request-dump -g
```

## Dependencies

- [chalk](https://github.com/chalk/chalk): Terminal string styling done right. Much color.
- [http-proxy](https://github.com/nodejitsu/node-http-proxy): HTTP proxying for the masses
- [minimist](https://github.com/substack/minimist): parse argument options
- [multiline](https://github.com/sindresorhus/multiline): Multiline strings in JavaScript

## License

MIT
