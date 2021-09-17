const mongoose = require("mongoose")
const passportLocalMongoose = require("passport-local-mongoose")
const mongooseBcrypt = require("mongoose-bcrypt")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: "username required",
        max: 16 ,
        trim: true , 
        unique: true
    } ,
    password: {
        type: String , 
        required : "password needed" ,
        min: 8 ,
        bcrypt: true

    }
})
userSchema.plugin(mongooseBcrypt)
userSchema.plugin(passportLocalMongoose,{usernameField: "username" , passwordField:"password"})
module.exports = mongoose.model("user", userSchema)