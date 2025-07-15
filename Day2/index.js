// const http = require('http');
const express = require('express');
const PORT = 5000;
const app = express();

app.get('/laptop', (req, res) => {
 
    res.send("Hello, from my laptop");
});
app.get('/mobile', (req, res) => {
 
    res.send("Hello, from my mobile");
});
app.get('/server', (req, res) => {
 
    res.send("Hello, from my server!");
});
// const myserver = http.createServer((req,res) => {
//     console.log("New request received");

//     res.end("Hello, from my server!");

// })
// myserver.listen(5000, () => {
//    console.log("Server Started"); 
// });
app.listen(PORT, () => {
   console.log("Server Started"); 
});
