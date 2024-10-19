import express from 'express';
import { register, login, logout } from "../controller/auth.controller";

const arouter = express.Router();

arouter.post('/signup', register);
arouter.post('/login', login);
arouter.post('/logout', logout);

export default arouter 
