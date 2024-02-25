// const express = require('express')
import express from 'express'
const app = express()
const port = 8000
import Connection from './db/database.js'
import Router from './routes/route.js'
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();


app.use(cors())
app.use(bodyParser.json({extended:true}))
app.use(bodyParser.urlencoded({extended:true}))



const data={
    first_name : 'Muhammad Asad',
    last_name : 'Afzal',
}


// app.get('/', (req, res) => {
//   res.send(data)
// })

app.get('/blog', (req, res) => {
    res.send('Hello Blog')
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Example 2 app listening on portss ${PORT}`)
})

Connection();

app.use('/',Router);