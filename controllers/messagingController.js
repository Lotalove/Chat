var User = require("../models/users")
var Chat = require("../models/chats")

exports.loginPage = (req,res,next) =>{ 
    res.render("index")
    next()
}
exports.signupPage = (req,res,next)=> {
    res.render("signup")
}
exports.dashboard = async (req,res) => {
    var session = req.session
    const usermessages =  await Chat.find({users:{$regex:`${session.passport.user}`}})
    res.render("dashboard", {session, usermessages})
    console.log(usermessages.length)
}
exports.startPage = (req,res)=>{
    const user = req.body.recipient
    res.render("startchatpage",{user})
}
exports.chatpage = async (req,res) =>{
    const chatid  = req.params.chatid
    var session = req.session
    var chatroom =  await Chat.findOne({_id:`${chatid}`})
    res.render("chatpage", {chatroom , session})
}
exports.sendnewmsg = async(req,res)=>{
    var existingChats = await Chat.find({users:[`${req.session.passport.user}`, `${req.body.recipients}`]},(err)=>{
        if(err){
        res.render(`${err}`)
        return
        }
    })
    if(existingChats.length > 0){
     const oldchat = await Chat.updateOne({_id:`${existingChats[0].id}`},
        {$push: {messages: {txt: `${req.body.msg}`, sender: `${req.session.passport.user}`}}})
        res.redirect(`/chat/${oldchat.id}`)
    }
    else{
        console.log(existingChats)
        var chat = new Chat ({ users: [`${req.session.passport.user}`,`${req.body.recipients}`] , messages: [{txt: req.body.msg , sender: `${req.session.passport.user}`}]})
        await chat.save()
        res.redirect(`/chat/${chat.id}`)
    }
}
exports.send= async (req,res)=>{
    const chat = await Chat.updateOne({_id:`${req.body.userid}`},
    {$push: {messages: {txt: `${req.body.msg}`, sender: `${req.session.passport.user}`}}})
    res.redirect(`/chat/${req.body.userid}`)
}
exports.resultsPage = async (req,res)=>{
   const users = await User.find({username:`${req.query.search}`},(err,users)=>{
        if(err){
            console.log(err)
            res.render("results",{users,err})
            return
        }})
    res.render("results",{users})
}