const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes/routes');
const bodyParser = require('body-parser');
require('dotenv').config();

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

app.use("/",routes)
app.get('/',(req,res)=>res.send('working fyne'))

const DATABASE = process.env.DATABASE;
const PORT = process.env.PORT || 8080
app.listen(PORT, async()=>{
    try{
        mongoose.connect(DATABASE,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('http://localhost:8080')
    }catch(err){
        console.log(`Error occurred, ${err.message}`)
    }
})
