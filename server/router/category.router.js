import express from 'express';
import { addCategories, getCategories, deleteCategories } from '../controller/category.controller';

const crouter = express.Router();

crouter.post('/add-category', addCategories);
crouter.get('/get-categories', getCategories);
crouter.delete('/delete-category/:id', deleteCategories);

export default crouter