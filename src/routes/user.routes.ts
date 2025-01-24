import { Router } from "express";
import { logOutUser, signInUser, signUpUser } from "../controllers/user.controller";
import { verifyJWT } from "../middlewares/auth.middleware";

const router = Router();

router.route('/signup').post(signUpUser)
router.route('/signin').post(signInUser)
router.route('/logout').get(verifyJWT, logOutUser)

export default router;