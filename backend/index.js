const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const BASE_URL= process.env.BASE_URL;
const mongoDB = require("./db")
const cors = require('cors');  
app.use(cors());
mongoDB();

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin",'*');
    res.header(
        "Access-Control-Allow-Headers", 
        "Origin , X-Requested-With, Content-Type, Accept"
    );
    next();

})
app.get('/', (req, res) => {
    res.send('Hello World!')
  })
app.use(express.json())
app.use('/api',require("./routes/CreateUser"));
app.use('/api',require("./routes/DisplayData"));
app.use('/api',require("./routes/OrderData"));



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
