const express = require('express')
const mysql = require('mysql')
const dotenv = require('dotenv').config()
const cors = require('cors')
const db = require('./db')
const bodyParser = require('body-parser');

const app = express()

app.use(cors())
app.use(bodyParser.json());
app.use(express.json())


app.use("/burgerbliss", require('./routes/dataRoutes'))

app.get("/", (req,res) => res.json("server is running"))
app.listen(8000, () => {
    console.log("Server Running on localhost 8000")
})