const protect = async(req, res)=>{
    if(req.isAuthenticated()){
        return next();
    }
    res.status(401).json({message:'Unauthorized'});
}
module.exports={protect}