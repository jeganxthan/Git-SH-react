const router = require("express").Router();
const passport = require("passport");


router.get("/login/sucess", (req, res)=>{
    if(req.user){
        res.status(200).json({
            error:false,
            messgae:"Successfully Logged In",
            user:req.user,
        })
    }else{
        res.status(403).json({error:true, message:"Not Authorized"});
    }
})

router.get("/login/failed", (req, res)=>{
    res.status(401).json({
        error:true,
        message:"Log in failure"
    })
})

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login/failed",
  }),
  (req, res) => {
    if (!req.user.username || req.user.isNew) {
      res.redirect(`${process.env.CLIENT_URL}onboarding`);
    } else {
      res.redirect(`${process.env.CLIENT_URL}dashboard`);
    }
  }
);


router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get("/logout", (req, res)=>{
    req.logout();
    res.redirect(process.env.CLIENT_URL);
})

module.exports=router;