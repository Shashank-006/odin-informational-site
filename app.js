const http = require("http");
const fs = require('fs/promises');
const { text } = require("stream/consumers");

const server = http.createServer((req, res) => {
    async function sendData(path) {
        const fd = await fs.open(path);
        const data = await fd.readFile();
        res.end(data);
    };
    res.setHeader("Content-type", "text-html");
    switch (req.url) {
        case "/":
            res.statusCode = 200;
            sendData("./index.html");
        case "/about":
            res.statusCode = 200;
            sendData("./about.html");
        case "/contact-me":
            res.statusCode = 200;
            sendData("./contact-me.html");
        default:
            res.statusCode = 404;
            sendData("./404.html");
    }
});

server.listen(8080, "localhost");