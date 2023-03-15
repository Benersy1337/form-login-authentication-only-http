const http = require('http');
const url = require('url');
const fs = require('fs');

const users = {
    'admin': 'admin',
};

http.createServer(function (req, res) {
    const q = url.parse(req.url, true);
    const filename = '.' + q.pathname;
    if (filename == './login') {
        fs.readFile('login.html', function (err, data) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
        });
    } else if (filename == './validate') {
        let body = '';
        req.on('data', function (data) {
            body += data;
        });
        req.on('end', function () {
            let userName = body.split('&')[0].split('=')[1];
            console.log(userName)
            let password = body.split('&')[1].split('=')[1];
            console.log(password)
            if (users[userName] && users[userName] == password) {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write('<h1>Login successful!</h1>');
                res.end();
            } else {
                res.writeHead(401, { 'Content-Type': 'text/html' });
                res.write('<h1>Invalid credentials!</h1>');
                res.end();
            }
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('404 Not Found');
    }
}).listen(3000);



