var User = require("../models/users")
var Chat = require("../models/chats")
const Passport = require("passport")
const {check, validationResult} =require("express-validator/check")
const {sanitize} = require("express-validator/filter")

exports.createUser = async (req,res,next)=>{
    check("username").isLength({min:3 , max:16}).withMessage("username must be less than 16 characters")
    check("password").isLength({min:6}).withMessage("password must have 6 or more characters")
    sanitize("*").trim().escape()
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        console.log(errors)
    }
    else{     
        const user = new User({username: req.body.username , password: req.body.password})
        User.register(user, req.body.password)
        res.redirect("/")
    }
}
exports.isLoggedin =(req,res,next)=>{
    if(req.session && req.isAuthenticated()){
        res.redirect("/dashboard")
        return
    }
    else{
        next()
    }
}
exports.isAuthorized = (req, res,next)=>{
    req.isAuthenticated() ? next() : res.redirect("/login")   
}
exports.isMember = async(req,res,next)=>{
if(req.isAuthenticated()){
    await Chat.find({_id:`${req.params.chatid}`},(err,result)=>{
        if(err){res.end(`${err}`)}
        else{result[0].users.includes(`${req.session.passport.user}`) ? next() : res.end("NO PERMISION")}
    })}
else{res.redirect("/login")}
}
exports.findUser = (req,res,next)=>{
   
}
exports.login = Passport.authenticate("local",{
    successRedirect: "/dashboard" , 
    failureRedirect: "/"
})
exports.logout = (req,res)=>{
    req.logout()
    req.session.destroy((err)=>{
        if(err){console.log(error)}
    })
    res.redirect("/")
}
