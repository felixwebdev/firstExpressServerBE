import userController from '../app/controller/UserController.js';
import express from 'express';

const router = express.Router();

router.post('/signup', userController.signUp);
router.post('/signin', userController.signIn);
router.get('/introspect', userController.introspect);
router.delete('/delete/:id', userController.deleteUser);
router.put('/update', userController.updateUser);
router.get('/find', userController.findUserByEmail);
router.get('/list', userController.listUsers);
router.get('/', userController.index);

export default router;