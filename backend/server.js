//Change start to node in json

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const errorMiddleware = require('./middleware/error')

//Route imports
const productRouter = require("./routes/productRoute")
const userRouter = require("./routes/userRoute")

//Handling uncaught exception
process.on("uncaughtException", (err)=>{
    console.log(`Error: ${err.message}`)
    console.log(`Shutting down`)
    process.exit(1)
})

//config
dotenv.config({path:"./config/config.env"})

//Connect to database
mongoose.connect(process.env.DB_URL, {useNewUrlParser:true, useUnifiedTopology:true}).then(
    (data)=>{console.log(`Connected to mongodb`)}) 

//Server
const app = express();

const PORT = process.env.PORT || 5000;

//middleware
app.use(express.json())
app.use(cors())
app.use("/api/v1", productRouter)
app.use("/api/v1", userRouter)
app.use(errorMiddleware)

//routing
app.get('/', (req, res) => {
    res.send('backend')
})

const server = app.listen(PORT)

//unhandled promise rejection
process.on("unhandledRejection", err=>{
    console.log(`Error: ${err.message}`)
    console.log(`Shutting down`) 

    server.close(()=>{
        process.exit(1 )
    })
})

