import { addTask, getTask, getSingleTask, deleteTask, updateTask } from "../controller/task.controller";

import express from "express";

const trouter = express.Router();

trouter.post('/add-task', addTask);
trouter.get('/get-task', getTask);
trouter.get('/get-single-task/:taskID', getSingleTask);
trouter.delete('/delete-task/:taskID', deleteTask);
trouter.patch('/update-task/:taskID', updateTask);

export default trouter;
