//Change start to node in json

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const errorMiddleware = require('./middleware/error');
const cookieParser = require('cookie-parser');

//Route imports
const productRouter = require("./routes/productRoute")
const userRouter = require("./routes/userRoute")
const orderRouter = require("./routes/orderRoute")

//Handling uncaught exception
process.on("uncaughtException", (err)=>{
    console.log(`UncaughtException Error: ${err.message}`)
    console.log(`Shutting down`)
    process.exit(1)
})

//config
dotenv.config({path:"./config/config.env"})

//Connect to database
mongoose.connect(process.env.DB_URL, {useNewUrlParser:true, useUnifiedTopology:true}).then(
    (data)=>{
        console.log(`Connected to mongodb`)
        console.log(`Running on port ${process.env.PORT}`)
    }
    ) 

//Server
const app = express();

const PORT = process.env.PORT || 5000;

//middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use("/api/v1", productRouter)
app.use("/api/v1", userRouter)
app.use("/api/v1", orderRouter)
app.use(errorMiddleware)

//routing
app.get('/', (req, res) => {
    res.send('backend')
})

const server = app.listen(PORT)

//unhandled promise rejection
process.on("unhandledRejection", err=>{
    console.log(`Unhandled Rejection Error: ${err.message}`)
    console.log(`Shutting down`) 

    server.close(()=>{
        process.exit(1 )
    })
})

