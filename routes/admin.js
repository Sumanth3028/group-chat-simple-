const express=require('express')

const fs=require('fs')

const router=express.Router()



router.get("/login",(req,res,next)=>{
    res.send('<form  onsubmit="localStorage.setItem(`username`, document.getElementById(`username`).value)" action="/" method="POST"><input id="username" type="text" name="message"><button>Submit</button></form>')
})

router.post("/",(req,res,next)=>{
    fs.readFile('username.txt',(err,data)=>{
        if(err){
            console.log(err)
            data='No Chat Exists'

        }
        res.send(`${data}<form onSubmit="document.getElementById('username').value=localStorage.getItem('username').value" action="/" method="POST"><input type="text" name="message"><button>send</button></form>`)
    })
    
})

router.post("/",(req,res,next)=>{
   fs.writeFile(`username.txt`,`${req.body.username}:${req.body.message}`,{flag:'a'},(err)=>{
    err? console.log(err):res.redirect('/')
   })
})

module.exports=router