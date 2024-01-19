const mongoose = require("mongoose")
const {Schema} = mongoose

const userSchema = new Schema({
    name:{type:String, required:true},
    email:{type:String, required:true},
    mobile:{type:String, required:true},
    password:{type:String, required:true},
    // confirmPassword:{type:String, required:true}
})


const User = mongoose.model("User", userSchema)
module.exports = User