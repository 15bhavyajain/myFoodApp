const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require ("bcryptjs");
const jwt = require("jsonwebtoken")
const jwtSecret="myNameisBhavyaJainAndIamFromHere";
const { body, validationResult } = require('express-validator');
router.post("https://myfoodapp-kffs.onrender.com/createuser",[body('email').isEmail(),
body('password',"wrong Password").isLength({ min: 4 })
], 
async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const salt =await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password,salt);

    try {
        await User.create({
            name:req.body.name,
            password:secPassword,
            email:req.body.email,
            location:req.body.location
        })
        res.json({success:true});
    } catch (error) {
        console.log(error);
        req.json({success:false});
    }
})

router.post("https://myfoodapp-kffs.onrender.com/loginuser",[body('email').isEmail(),
body('password',"wrong Password").isLength({ min: 4 })
], 
async (req,res)=>{


    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
        let email = req.body.email; 

    try {
        let userData= await User.findOne({email});
        if(!userData)
        {
            return res.status(400).json({ errors: "Enter Valid Credentials"});
        }

        const pwdCheck = bcrypt.compare(req.body.password,userData.password );
        if(!pwdCheck)
            return res.status(400).json({ errors: "Enter Valid Credentials"});

        const data={
            user:{
                id:userData.id
            }
        };    
        const authToken = jwt.sign(data,jwtSecret);
        return res.json({success:true,authToken:authToken});
    } catch (error) {
        console.log(error);
        req.json({success:false});
    }
})

module.exports = router;
