const mongoose = require('mongoose')

let UserSchema = mongoose.Schema({
    username : {
        type : String,
        required : true,
        min : 6,
        max : 225
    },
    email :  {
        type : String,
        required : true,
        min : 6,
        max : 225
    },
    password :  {
        type : String,
        required : true,
        min : 4,
        max : 225
    },
    date :  {
        type : Date,
        default : Date.now
    },
})

module.exports = mongoose.model('User', UserSchema)