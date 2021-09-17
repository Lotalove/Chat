const express = require("express")
var router = express.Router()
var msgController = require("../controllers/messagingController")
var userController = require("../controllers/userContoller")
// setting up all routes

router.get("/",userController.isLoggedin, msgController.loginPage)
router.get("/login" ,userController.isLoggedin ,msgController.loginPage)
router.get("/signup", msgController.signupPage)
router.get("/logout", userController.logout)
router.get("/dashboard",userController.isAuthorized , msgController.dashboard)
router.get("/startchat",userController.isAuthorized ,msgController.startPage)
router.get("/chat/:chatid", userController.isMember , msgController.chatpage)
router.get("/results",userController.isAuthorized, msgController.resultsPage)
router.post("/createuser", userController.createUser)
router.post("/login", userController.login)
router.post("/results" , userController.findUser)
router.post("/startchat", userController.isAuthorized , msgController.startPage)
router.post("/send-new-message", msgController.sendnewmsg)
router.post("/send", msgController.send)

module.exports = {router}