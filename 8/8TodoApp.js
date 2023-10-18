const http = require('http');
const url = require('url');
const fs = require('fs');

const PORT = 3001;
const todoFilePath = './todo.json';

const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true);

  if (pathname === '/') {
    fs.readFile(todoFilePath, (err, data) => {
      if (err) {
        res.end('Internal Server Error');
      } else {
        res.end(data);
      }
    });
  } else if (pathname === '/delete' && query.id) {
    fs.readFile(todoFilePath, (err, data) => {
      if (err) {
        res.end('Internal Server Error');
      } else {
        const todoList = JSON.parse(data);
        const updatedList = todoList.filter(task => task.id !== parseInt(query.id));
        fs.writeFile(todoFilePath, JSON.stringify(updatedList), err => {
          if (err) {
            res.end('Internal Server Error');
          } else {
            res.end(JSON.stringify(updatedList));
          }
        });
      }
    });
  } else {
    res.end('Not Found');
  }
});

server.listen(PORT, (err) => {
  if (err) {
    console.error('Unable to start server');
  } else {
    console.log('Server started...');
  }
});
