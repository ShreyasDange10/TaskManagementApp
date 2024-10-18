import express from 'express';
import { register, login, logout } from '../controller/auth.controller';
import { protectRoute } from '../middleware/protectRoute';

const urouter = express.Router();

urouter.post('/signup', register);
urouter.post('/login', protectRoute, login);
urouter.post('/logout', protectRoute, logout);
