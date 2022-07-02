"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const lannisterpay_middleware_1 = require("../middleware/lannisterpay.middleware");
const lannisterpay_controller_1 = require("../controllers/lannisterpay.controller");
router.post('/split-payments/compute', lannisterpay_middleware_1.validatePayload, lannisterpay_controller_1.paymentComputation);
exports.default = router;
//# sourceMappingURL=web.routes.js.map