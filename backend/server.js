//Change start to node in json

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

//Route imports
const productRouter = require("./routes/productRoute")
//config
dotenv.config({path:"backend/config/config.env"})

const app = express();

const PORT = process.env.PORT || 5000;

app.use("/api/v1", productRouter)

app.get('/', (req, res) => {
    res.send('backend')
})

app.listen(PORT)
