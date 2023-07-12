const express = require('express');
const router = express.Router();

router.post('https://myfoodapp-kffs.onrender.com/foodData',(req,res)=>{
    try {
        res.send([global.food_items,global.foodCategory])
    } catch (error) {
        console.log(error.message);
        res.send("Server Error");
        
    }
})


module.exports = router;
