const http = require('http');

const PORT = 3000;
const logger = console;
const host = {
  hostname: 'www.naver.com',
  port: 80,
};

const filter = req => req.url === 'filter';

const server = http.createServer((req, res) => {
  logger.info(`serve: ${req.url}`);

  if (filter(req)) {
    /* do something */
    logger.info('do something');
  } else {
    const { hostname, port } = host;
    const options = {
      hostname,
      port,
      path: req.url,
      method: req.method,
      headers: req.headers,
    };

    const proxy = http.request(options, host_res => {
      res.writeHead(host_res.statusCode, host_res.headers);
      host_res.pipe(res, {
        end: true,
      });
    });

    req.pipe(proxy, {
      end: true,
    });
  }
});

server.listen(PORT);
