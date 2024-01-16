import express from 'express';
const router=express.Router();
import { protect } from '../middleware/adminAuthMiddleware.js';
import {
     authAdmin,
     logoutAdmin,
     getAllUser,
     updateUserData,
     deleteUser,
     addNewUser     
    } from '../controllers/adminController.js';

router.post('/auth',authAdmin);    ///first one
router.post('/logout',logoutAdmin) ; // second one
router.get('/getAllUser',getAllUser);// third one
router.put('/updateUserData',updateUserData);// fourth one
router.delete('/deleteUser',deleteUser);// fifth one
router.post('/addNewUser',addNewUser);// sixth one


export default router;









