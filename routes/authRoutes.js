import express from "express";
import { login, signup , forgotPassword,resetPassword, userProfile} from "../controller/authController.js";
import { middlewareToProtect } from "../middlewear/authMiddleware.js";


const router=express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/profile',middlewareToProtect,userProfile);


export default router;
