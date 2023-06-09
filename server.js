const http = require("http");

const fs = require("fs");

const express = require("express");

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// const loginRoute=require('./routes/admin')

// app.use(loginRoute)



app.get("/", (req, res, next) => {

    fs.readFile('username.txt',(err,data)=>{
        

        if(err){
            
            console.log(err)
            data='No Chat Exists'

        }

        res.send(
            `${data}<form onSubmit="document.getElementById('username').value=localStorage.getItem('username')" action="/" method="POST">
            <input type="text" name="message" id="message">
            <input type=hidden name="username" id="username">
            <br/>
            <button type="submit">send</button></form>`
          );
    })
  
   
  
});

app.post("/", (req, res, next) => {
    console.log(req.body.username)
  fs.writeFile(
    `username.txt`,
    `${req.body.username}: ${req.body.message}`,
    { flag: "a" },
    (err) => {
      err ? console.log(err) : res.redirect("/");
    },
  
  );
  
});

app.get("/login", (req, res, next) => {
    res.send(
      '<form  onSubmit="localStorage.setItem(`username`, document.getElementById(`username`).value)" action="/" method="POST"><input id="username" type="text" name="username"><button>Submit</button></form>'
    );
  });


app.use((req, res, next) => {
  res.status(404).send("<h1>Page Not Found</h1>");
});

const server = http.createServer(app);

server.listen(3000);
