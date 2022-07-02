import express from 'express'
import webRoutes from './routes/web.routes'
const bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.json())


app.use(function(req , res, next){
    res.header('Access-Control-Allow-Origin',  '*')
    res.header( 'Access-Control-allow-Headers', '*')
    next()
})

app.use('/welcome', (req, res)=> res.send('Welcome to LannisterPay Gateway'))
app.use('/', webRoutes)

const port = process.env.PORT || '8000'

app.listen(port, () =>{
    return console.log(`Server is listening on ${port}`);
})