const express = require("express")
const path = require("path")
const app = express()
const http= require('http');
const routes = require("./routes").router
const socketio = require("socket.io")
const mongoose = require("mongoose")
const passport = require("passport")
const session = require("express-session")
const MongoStore = require("connect-mongo")
require("dotenv").config()
const User = require("./models/users")
const server = http.createServer(app)
const io = socketio(server)
//loading up static files
app.use(express.static('public'))
app.use("/css",express.static(__dirname + "public/css"))

app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: process.env.SECRET ,
    saveUninitialized: false , 
    resave: false , 
    store: MongoStore.create({mongoUrl: process.env.DB})
}))
//load the view engine
app.set("views", path.join(__dirname, "views"))
app.set('view engine', 'pug')

//set up passport middleware
app.use(passport.initialize())
app.use(passport.session())  //allows use of sessions 
passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

//get data from mongo
mongoose.connect(process.env.DB,{useNewUrlParser: true,useCreateIndex: true,useUnifiedTopology: true})
mongoose.Promise = global.Promise 
mongoose.connection.on("error", (error)=>{console.error(error.message)})
// set up the route for home page will respond with layout.ejs
app.use("/", routes)

// socket.io for realtime capabilities
io.on('connection', (socket)=>{
    socket.on('sentmessage', (msg)=>{io.emit("new message", msg)})
})
//making the server on port 3000S
server.listen(4000,function(){console.log("server started")}) 