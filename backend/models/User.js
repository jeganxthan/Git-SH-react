const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    name:{type:String, require: true},
    username:{type:String, require:true, unique:true},
    profileImage:{type:String, default:null}
},{
    timestamps:true
})
module.exports = mongoose.model("User", UserSchema)