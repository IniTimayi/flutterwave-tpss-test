"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePayload = void 0;
const validate_1 = __importDefault(require("../utils/validate"));
const validatePayload = (req, res, next) => {
    const validationRule = {
        ID: 'required',
        Amount: 'required|numeric',
        SplitInfo: 'required|array|min:1|max:20',
        "SplitInfo.*.SplitType": 'required|in:FLAT,PERCENTAGE,RATIO',
        "SplitInfo.*.SplitValue": 'required|numeric|min:0',
        "SplitInfo.*.SplitEntityId": 'required|string',
    };
    (0, validate_1.default)(req.body, validationRule, { 'max.SplitInfo': 'You have more :max items in the splitInfo array', 'min.SplitInfo': 'You have less than :min item(s) in the splitInfo array' }, (err, status) => {
        if (status) {
            next();
        }
        else {
            res.status(422).json(err.errors);
        }
    });
};
exports.validatePayload = validatePayload;
//# sourceMappingURL=lannisterpay.middleware.js.map