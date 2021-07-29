const express = require('express')
const router = express.Router()

const Post = require('../models/Post')

const verifyToken = require('../middleware/verifyToken')


// get datas 
router.get('/', verifyToken,  (req,res)=>{
    Post.find().then(data=>{
        res.json({data : data, status : 200, length : data.length, token_user_id : req.user})
    }).catch(err=>{
        res.json({message : err})
    })

})

// post datas
router.post('/',(req,res)=>{
    console.log(req.body)
    const post = new Post({
        title : req.body.title,
        desc : req.body.desc,
    })
    post.save().then(data=>{
        res.json(data)
    }).catch(err =>{
        res.json({message : err})
    })
})

// detail datas
router.get('/:postId', (req,res)=>{
    console.log(req.params.postId)
    Post.findById(req.params.postId).then(data=>{
        res.json({data :data, status : 200})
    }).catch(err=>{
        res.json({message : err, status : 400})
    })
})

// delete datas
router.delete('/:postId', (req,res)=>{
    // console.log(req.params.postId)
    Post.remove({_id : req.params.postId}).then(data=>{
        res.json({data :data, status : 200, message : 'success delete'})
    }).catch(err=>{
        res.json({message : err, status : 400})
    })
})

// update datas
router.patch('/:postId', (req,res)=>{
    // console.log(req.body)
    Post.updateOne(
        {_id : req.params.postId}, 
        {
            $set : {
                title : req.body.title,
                desc : req.body.desc,
            }
        }
    ).then(data=>{
        res.json(data)
    }).catch(err =>{
        res.json({message : err})
    })
})

module.exports = router

