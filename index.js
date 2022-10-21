const express = require('express')
const router = require('./router/router')
const app = express();

app.use(router);


app.listen(3535, (require, response) => {
    console.log('server running 3535')
})

