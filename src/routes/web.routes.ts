import express from "express";
const router = express.Router()
import {validatePayload} from "../middleware/lannisterpay.middleware";
import {paymentComputation} from "../controllers/lannisterpay.controller";

router.post('/split-payments/compute',validatePayload,paymentComputation)

export default router