import express from 'express';
import userController from '../controllers/userControllers.js';

const router = express.Router();

router.post('/register', userController.createUser);
router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.post('/login', userController.loginUser);
router.post('/forgot-password', userController.forgotPassword);
router.post('/change-password', userController.changePassword);

export default router; 
