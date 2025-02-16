const jwt = require('jsonwebtoken');

const verifyUser = (req, res, next)=>{
    const utoken = req.headers.authorization;
    const verify = jwt.verify(utoken, process.env.JWT_SECRET);
    if(!verify){
        return res.send({status:"failed", message:"Invalid User"});
    }
    next()
}

module.exports = verifyUser;
