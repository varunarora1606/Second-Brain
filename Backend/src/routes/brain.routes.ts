import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";
import { createShareBrainLink, getUserBrain } from "../controllers/link.controller";

const router = Router()

router.route('/share').get(verifyJWT, createShareBrainLink)
router.route('/get/:hash').get(getUserBrain)

export default router