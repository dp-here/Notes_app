const express = require("express");
const User = require("../models/User");
const router = express.Router();
const {  
  body,validatorResult,validationResult,} = require("express-validator");
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const JWT_SECRET='Pyaardimenukichahida'
var fetchuser=require('../middleware/fetchuser')

//ROUTE 1: user creation : POST '/api/auth/createuser". No authentication require
//No Login required.

router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be 5 characters.").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success=false
    //in case errors present, return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }
    try {
      //check whether the user with this email exists already.
      let user =await User.findOne({ email: req.body.email });
      if(user){
        return res.status(400).json({success,error:"Sorry, User with this email already exists."})
      }
      const salt=await bcrypt.genSalt(10)
      const secPass=await bcrypt.hash(req.body.password,salt)
      user =await User.create({
        name: req.body.name,
        password:secPass ,
        email: req.body.email,
      });
     const data={
        user:{
            id:user.id
        }
     }
     const authToken= jwt.sign(data,JWT_SECRET)
     success=true;
     res.json({success, authToken}) 
    //   res.json(user);
      } catch (error) {
          console.error(error.message);
        res.status(500).send("Internal error occured");
    }
  }
);



//Route 2: Autheticate a user using POST"api/auth/login". No login req
router.post(
    '/login',
    [  body('email','Enter a valid email').isEmail(),
    body('password','Password cannot be blank').exists() ],
        async (req,res)=>{
          let success=false
        const errors=validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
          }

        const {email,password}=req.body
        try {
          let user=await User.findOne({email}) 
          if(!user){
            return res.status(400).json({error:"Use correct credentials"})
           }
          const passwordCompare=await bcrypt.compare(password,user.password)
          if(!passwordCompare){
            success=false
            return res.status(400).json({success, error:"Use correct credentials"})
          }
          const data={
            user:{
                id:user.id
            }
         }
         const authToken= jwt.sign(data,JWT_SECRET)
         success=true
         res.json({success, authToken}) 
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal error occured");  
        }
        }
)

//Route 3: Get a user details using POST"api/auth/getuser". Login required 
router.post(
  '/getuser', fetchuser,
  async (req,res)=>{
try {                   //getid endpoint will be added everytime, so not scalable, hence we use middleware
  const userID=req.user.id;
  const user=await User.findById(userID).select("-password")
  res.send(user)
} catch (error) {
  console.error(error.message);
  res.status(500).send("Internal error occured"); 
}})
module.exports = router; 
