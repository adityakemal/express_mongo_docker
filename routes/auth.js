const router = require('express').Router()
const User = require('../models/User')
const {registerValidation, loginValidation} = require('../validation/authValidation')

const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')


// REGISTER 
router.post('/register', async (req,res)=>{
    //LEST VALIDATE
    const {error} = registerValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    // validate if eail exist
    const emailExist = await User.findOne({email : req.body.email})
    if(emailExist) return res.status(400).json('Email sudah terdaftar')


    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(req.body.password, salt)

    //create new user
    const user = new User({
        username : req.body.username,
        email : req.body.email,
        password : hashedPass,
    })
    try {
        const savedUser = await user.save()
        const data ={
            message : 'user telah tersimpan',
            data : savedUser
        }
        res.status(200).json(data)
    } catch (err) {
        res.send(err)
    }
})


//LOGIN
router.post('/login', async (req,res)=>{
    //LEST VALIDATE
    const {error} = loginValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    //validate if email doesn't exist
    const user = await User.findOne({email : req.body.email})
    if(!user) return res.status(400).json('Email tidak di temukan')
    
    //if password correct
    const isCorrectPass = await bcrypt.compare(req.body.password, user.password)
    if(!isCorrectPass) return res.status(400).json('Password salah')

    //CREATE TOKEN
    const token = jwt.sign({_id : user._id}, process.env.SECRET_KEY_TOKEN)
    res.send(`logedin ${token}`)

})





//GET ALL USERS
router.get('/users', async (req, res)=>{
    try {
        const allUsers = await User.find()
        res.json(allUsers)
    } catch (error) {
        res.send(error)
    }
})

//delete ALL USERS
router.delete('/users', async (req, res)=>{
    try {
        const deletedUser = await User.deleteMany()
        res.json(deletedUser.deletedCount)
    } catch (error) {
        res.send(error)
    }
})

module.exports = router