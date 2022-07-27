const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

const PORT = process.env.PORT || 5000;


app.get('/', (req, res) => {
    res.send('backend')
})

app.listen(5000)
