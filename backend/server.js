const express = require('express');
const apiRouter = require('./routes');
const app = express();

app.use(express.json());

app.use('/destinations', apiRouter);

app.listen(process.env.PORT || '3000', () =>{
    console.log("port 3000");
});