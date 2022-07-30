//Change start to node in json

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

//Route imports
const productRouter = require("./routes/productRoute")

//config
dotenv.config({path:"./config/config.env"})

//Connect to database
mongoose.connect(process.env.DB_URL, {useNewUrlParser:true, useUnifiedTopology:true}).then(
    (data)=>{console.log(`Connected to mongodb`)}).catch((err)=>console.log(err))


//Server
const app = express();

const PORT = process.env.PORT || 5000;

//middleware
app.use(express.json())
app.use(cors())
app.use("/api/v1", productRouter)

//routing
app.get('/', (req, res) => {
    res.send('backend')
})

app.listen(PORT)
