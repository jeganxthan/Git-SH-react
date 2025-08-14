const router = require("express").Router();
const passport = require("passport");
const {
  registerUser,
  loginUser,
  getUserProfile
} = require("../controller/authController");
//google
router.get("/login/success", (req,res)=>{
    if(req.user){
        res.status(200).json({
            error:false,
            message:"Successfullt logged in",
            user: req.user,
        })
    }else{
        res.status(403).json({error:true, message:"Not Authorized"});
    }
})

router.get("/login/failed", (req, res)=>{
    res.status(401).json({
        error:true,
        message:"Log in failure",
    })
})

router.get(
    "/google/callback",
    passport.authenticate("google",{
        successRedirect:process.env.CLIENT_URL,
        failureRedirect:"/login/failed",
    })
)

router.get("/google", passport.authenticate("google", ["profile", "email"]));


//github

router.get('/github', passport.authenticate('github', ["profile", "email"]));

router.get(
    "/github/callback",
    passport.authenticate("github",{
        successRedirect:process.env.CLIENT_URL,
        failureRedirect:"/login/failed",
    })
)

router.get("/logout", (req, res)=>{
    req.logout();
    res.redirect(process.env.CLIENT_URL);
})

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", getUserProfile);

module.exports=router;