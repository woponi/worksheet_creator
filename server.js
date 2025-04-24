const { createServer } = require("https");
const http = require("http");
const { parse } = require("url");
const next = require("next");
const fs = require("fs");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// Add error handling for certificate loading
let httpsOptions;
try {
  httpsOptions = {
    key: fs.readFileSync("./cert/localhost+2-key.pem"),
    cert: fs.readFileSync("./cert/localhost+2.pem"),
  };
} catch (error) {
  console.error("Error loading SSL certificates:", error);
  process.exit(1);
}

app.prepare().then(() => {
  console.log("Next.js app prepared successfully");
  
  // Create HTTPS server
  const httpsServer = createServer(httpsOptions, (req, res) => {
    try {
      console.log(`HTTPS: Incoming request: ${req.method} ${req.url}`);
      const parsedUrl = parse(req.url, true);
      
      // Add a health check endpoint
      if (parsedUrl.pathname === '/health') {
        res.statusCode = 200;
        res.end('OK');
        return;
      }

      // Log request headers for debugging
      console.log('Request headers:', req.headers);
      
      handle(req, res, parsedUrl).catch((error) => {
        console.error('Error in HTTPS request handler:', error);
        if (!res.headersSent) {
          res.statusCode = 500;
          res.end('Internal Server Error');
        }
      });
    } catch (error) {
      console.error("Error handling HTTPS request:", error);
      if (!res.headersSent) {
        res.statusCode = 500;
        res.end("Internal Server Error");
      }
    }
  });

  // Create HTTP server that redirects to HTTPS
  const httpServer = http.createServer((req, res) => {
    console.log(`HTTP: Redirecting to HTTPS: ${req.method} ${req.url}`);
    res.writeHead(301, {
      'Location': `https://${req.headers.host.replace(':3002', ':3001')}${req.url}`
    });
    res.end();
  });

  httpsServer.on('error', (error) => {
    console.error("HTTPS Server error:", error);
  });

  httpServer.on('error', (error) => {
    console.error("HTTP Server error:", error);
  });

  // Start HTTPS server
  httpsServer.listen(3001, (err) => {
    if (err) {
      console.error("Error starting HTTPS server:", err);
      throw err;
    }
    console.log("> HTTPS Server started on https://localhost:3001");
  });

  // Start HTTP server
  httpServer.listen(3002, (err) => {
    if (err) {
      console.error("Error starting HTTP server:", err);
      throw err;
    }
    console.log("> HTTP Server started on http://localhost:3002");
  });
}).catch((error) => {
  console.error("Error preparing Next.js app:", error);
  process.exit(1);
});