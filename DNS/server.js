const http = require("http");
const dns= require("dns");

const port="8000"
const host="localhost"

const server = http.createServer((req, res) => {
    const param=req.url.split("=")

    console.log("Server is running...")
    if(req.url==="/"){
        res.end("this is home page \nto search go to /lookup?domain='searching domain name' ")
    }
    if(param.length>1){
        dns.lookup(param[1],4, (err, address, family) => {
        
        res.end(` IPV${family} Address of ${param[1]} is ${address} \n\n or \n\n {\n domain:${param[1]},\n IP:${address}\n }`)
        });
    }
});

server.listen(port,host);