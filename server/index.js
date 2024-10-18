import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import trouter from "./router/task.router";
import bodyParser from "body-parser";
import cors from 'cors';
import crouter from "./router/category.router";

dotenv.config()

const app = express();
const port = 3008;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

var corsOptions = {
  origin: ['http://localhost:5173', 'https://todo-list-server-iota.vercel.app'],
  optionsSuccessStatus: 200 
}

app.use(cors(corsOptions));

mongoose.connect(`mongodb+srv://ShreyasD:ShreyasD@cluster0.agpjzqh.mongodb.net/taskManagementApp`)
  .then(() => console.log('Connected to database!'))
  .catch(error =>console.log(`Error connecting to database: ${error}`))

app.listen(port, ()=>{
    console.log(`App is listening on port ${port}`);
})  

app.use('/task', trouter);

app.use('/', crouter);
