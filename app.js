const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv/config')


//middlewares
app.use(express.json())
app.use(cors())

const postRoute = require('./routes/posts')
const authRoute = require('./routes/auth')
//import route
app.use('/posts', postRoute)
app.use('/auth', authRoute)


app.get('/', (req,res)=>{
    res.send('were on HOME!')
})


var server = "mongodb://localhost:27017/db_test";
// connect to db 
mongoose.connect( 
    // process.env.DB_CONNETION, //mlab.com
    server,
    { useNewUrlParser: true, useUnifiedTopology: true }, 
    ()=>{
        console.log('conneted to db')
    })
    





app.listen(8000)