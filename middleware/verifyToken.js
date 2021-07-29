const jwt = require('jsonwebtoken')

module.exports = function(req, res, next){
    const token = req.header('Authorization')
    if(!token) return res.status(401).send('Access denied!')

    try {
        const verified = jwt.verify(token, process.env.SECRET_KEY_TOKEN)
        // console.log(verified)
        req.user = verified
        next()
    } catch (error) {
        res.status(400).send('invalid Token')
    }
}