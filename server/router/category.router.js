import express from 'express';
import { addCategories, getCategories, deleteCategories } from '../controller/category.controller';

const crouter = express.Router();

crouter.post('/categories', addCategories);
crouter.get('categories', getCategories);
crouter.delete('categories/ :id', deleteCategories);

export default crouter