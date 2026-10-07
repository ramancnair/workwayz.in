const http = require('http');
const fs = require('fs');
const path = require('path');

let port = parseInt(process.env.PORT || '8080', 10);

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

function createServer() {
  const server = http.createServer((req, res) => {
    let safeUrl = decodeURI(req.url.split('?')[0]);
    if (safeUrl === '/' || safeUrl === '') {
      safeUrl = '/index.html';
    }

    const filePath = path.join(__dirname, safeUrl);

    // Security guard against path traversal
    if (!filePath.startsWith(__dirname)) {
      res.writeHead(403, { 'Content-Type': 'text/plain' });
      res.end('403 Forbidden');
      return;
    }

    fs.stat(filePath, (err, stats) => {
      if (err || !stats.isFile()) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end(`404 Not Found: ${safeUrl}`);
        return;
      }

      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';

      res.writeHead(200, {
        'Content-Type': contentType,
        'Content-Length': stats.size,
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*'
      });

      const stream = fs.createReadStream(filePath);
      stream.pipe(res);
    });
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`[Notice] Port ${port} is in use. Auto-trying next port ${port + 1}...`);
      port++;
      server.listen(port, '0.0.0.0');
    } else {
      console.error('Server error:', err);
    }
  });

  server.listen(port, '0.0.0.0', () => {
    console.log('\n======================================================');
    console.log(`  🚀 Workwayz Preview Server is Running!`);
    console.log(`  👉 Local URL:     http://localhost:${port}`);
    console.log(`  👉 Network IPv4:  http://127.0.0.1:${port}`);
    console.log(`  👉 User Manual:   http://localhost:${port}/docs.html`);
    console.log('======================================================\n');
  });
}

createServer();
