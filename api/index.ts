import express from 'express'
import webRoutes from './routes/web.routes'
const bodyParser = require('body-parser')
const index = express();
index.use(bodyParser.json())


index.use(function(req , res, next){
    res.header('Access-Control-Allow-Origin',  '*')
    res.header( 'Access-Control-allow-Headers', '*')
    next()
})

index.use('/welcome', (req, res)=> res.send('Welcome to LannisterPay Gateway'))
index.use('/', webRoutes)

const port = process.env.PORT || '8000'

index.listen(port, () =>{
    return console.log(`Server is listening on ${port}`);
})