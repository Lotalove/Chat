var mongoose = require("mongoose")
 
var chatSchema = new mongoose.Schema({
    users: [String] ,
    messages: [{txt: String , sender: String}]
})
module.exports = mongoose.model("chat", chatSchema)