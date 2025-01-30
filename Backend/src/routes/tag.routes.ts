import { Router } from "express";
import { createTag, getTags } from "../controllers/tag.controller";

const router = Router()

router.route('/get').get(getTags)
router.route('/create').post(createTag)

export default router