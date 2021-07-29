const mongoose = require('mongoose')

let PostSchema = mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    desc :  {
        type : String,
        required : true
    },
    date :  {
        type : Date,
        default : Date.now
    },
})

module.exports = mongoose.model('Post', PostSchema)