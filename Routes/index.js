const fs = require("fs").promises
const http = require("http");

const port="8000"
const host="localhost"

const server = http.createServer((req, res) => {
    console.log(req.url)
    console.log("Server is running...")

    if(req.url==="/"){
        res.writeHead(200)
        res.end('this is root page')
    }
    else if(req.url==="/about"){
        fs.readFile(__dirname + "/about.html").then((contents) => {
        res.setHeader("Content-Type", "text/html");
        res.writeHead(200);
        res.end(contents);
        })
    }
    else if(req.url==="/user"){
        const user={
            name:"vikas",
            age:24
        }
        res.setHeader("Content-Type", "application/json");
        res.writeHead(200);
        res.end(JSON.stringify(user));
    }
    else if(req.url==="/contact"){
        fs.readFile(__dirname + "/image.html").then((contents) => {
        res.setHeader("Content-Type", "text/html");
        res.writeHead(200);
        res.end(contents);
        })
    }
    else{
        res.writeHead(200)
        res.end('this page is not found!')
    }
});

server.listen(port,host);