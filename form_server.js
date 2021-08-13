const fs  = require('fs');
const http = require('http');

let formDocument;

// Asynchronusly fetching html file
fs.readFile('form.html', 'utf-8', (error, data) => {
  formDocument = data;
});


const port = 3000;

const requestListener = function (req, res) {

  if(req.method === 'GET') {
    res.writeHead(200);
    res.end(formDocument);
  }

  if(req.method === 'POST') {

    let data = '';

    req.on('data', function (chunk) {
      data += chunk;
    });

    req.on('end', function () {
      console.log('You POSTed the following data: ' + data);
      res.end('Thank you for submitting data. Your data is saved. ');
      res.writeHead(200);
      
    });

  }

}

const server = http.createServer(requestListener);
server.listen(port);
console.log('Application is started on port ' + port);