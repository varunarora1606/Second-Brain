import { Router } from "express";
import { addContent, deleteContent, getAllContents } from "../controllers/content.controller";
import { verifyJWT } from "../middlewares/auth.middleware";

const router = Router()

router.route('/add').post(verifyJWT, addContent)
router.route('/get').get(verifyJWT, getAllContents)
router.route('/delete/:contentId').delete(verifyJWT, deleteContent)

export default router