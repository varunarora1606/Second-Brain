"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const link_controller_1 = require("../controllers/link.controller");
const router = (0, express_1.Router)();
router.route('/share').get(auth_middleware_1.verifyJWT, link_controller_1.createShareBrainLink);
router.route('/get/:hash').get(link_controller_1.getUserBrain);
exports.default = router;
