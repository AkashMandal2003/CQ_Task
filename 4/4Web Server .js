const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  const requestUrl = req.url;
  const timestamp = new Date().toISOString();

  if (requestUrl === '/about') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('About page');
  } else if (requestUrl === '/home') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Home page');
  } else {
    const logEntry = `${timestamp} - Request URL: ${requestUrl}`;
    console.log(logEntry);
    fs.appendFileSync('errors.log', logEntry + '\n');

    // Read the existing log file
    const logFilePath = path.join(__dirname, 'errors.log');
    const logData = fs.readFileSync(logFilePath, 'utf-8').split('\n');

    // Limit the log file to a maximum of 5 entries
    if (logData.length > 5) {
      logData.shift(); // Remove the oldest entry
    }

    // Write the updated log back to the file
    fs.writeFileSync(logFilePath, logData.join('\n'));

    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Page not found');
  }
});

server.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
