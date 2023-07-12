const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const URI='mongodb+srv://15bhavyajain:15Bhavyajain%40@cluster0.4xeqhyw.mongodb.net/myfoodMERN';
const mongoDB=async()=>{
    await mongoose.connect(URI,{useNewUrlParser :true},async(err,result)=>{
        if(err)
            {console.log("-------",err);}
        else    
        {
            console.log("connected");
            const fetched_data=await mongoose.connection.db.collection("food_items");
            fetched_data.find({}).toArray( async function(err,data){
                
                const foodCategory = await mongoose.connection.db.collection("foodCategory");
                
                
               
                foodCategory.find({}).toArray( function(err,catData){

                    if(err)
                    console.log(err);
                    else{
                        global.food_items=data;
                        global.foodCategory=catData;
                    }
                    
                })
            

                
            });
        }
    });

    
}

module.exports =mongoDB;

