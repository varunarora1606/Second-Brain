import { Router } from "express";

const router = Router();

router.route('/signup').post()
router.route('/signin').post()

export default router;