const express = require('express');
const http = require('http');
const url = require('url');
const connectDB = require('./config/db');
const basicRoute= require('./routes/index');
const urlRoute= require('./routes/url');
const check= require('./routes/check');

const app = express();
connectDB();

app.use(express.json({ extended:false}));

app.use('/',basicRoute);
app.use('/url',urlRoute);
app.use('/check',check);

const port = 3000;
app.listen(port, () => console.log(`Connected to port ${port}`));


