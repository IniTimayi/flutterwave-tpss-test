"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentComputation = void 0;
const paymentComputation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ID, SplitInfo, Amount } = req.body;
    const sortedSplitInfoArray = SplitInfo.map((items) => {
        if (items.SplitType === 'FLAT') {
            return Object.assign(Object.assign({}, items), { weight: 1 });
        }
        else if (items.SplitType === 'PERCENTAGE') {
            return Object.assign(Object.assign({}, items), { weight: 2 });
        }
        else {
            return Object.assign(Object.assign({}, items), { weight: 3 });
        }
    }).sort((a, b) => {
        return a.weight < b.weight ? -1 : 1;
    });
    const modifiedArray = sortedSplitInfoArray.map((item) => {
        const { weight } = item, other = __rest(item, ["weight"]);
        return other;
    });
    const computedValue = yield compute({ ID, initialAmount: Amount, splitInfoArray: modifiedArray });
    res.status(200).json(computedValue);
});
exports.paymentComputation = paymentComputation;
const compute = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { initialAmount, splitInfoArray, ID } = payload;
    let computationBalance = initialAmount;
    const totalRatio = splitInfoArray.reduce((acc, item) => {
        return item.SplitType === 'RATIO' ? acc + item.SplitValue : 0;
    }, 0);
    let tempRatioBalance = initialAmount;
    const computedArray = splitInfoArray.map((item) => {
        let result = {};
        switch (item.SplitType) {
            case 'FLAT':
                computationBalance = computationBalance - item.SplitValue;
                result = { SplitEntityId: item.SplitEntityId, Amount: item.SplitValue };
                tempRatioBalance = computationBalance;
                break;
            case 'PERCENTAGE':
                const percentageValue = (item.SplitValue / 100) * computationBalance;
                computationBalance = computationBalance - percentageValue;
                result = { SplitEntityId: item.SplitEntityId, Amount: percentageValue };
                tempRatioBalance = computationBalance;
                break;
            case 'RATIO':
                const ratioValue = ((item.SplitValue / totalRatio) * tempRatioBalance);
                result = { SplitEntityId: item.SplitEntityId, Amount: ratioValue };
                computationBalance = computationBalance - ratioValue;
                break;
            default:
                break;
        }
        return result;
    });
    return {
        ID,
        Balance: computationBalance >= 0 ? computationBalance : 0,
        SplitBreakdown: computedArray
    };
});
//# sourceMappingURL=lannisterpay.controller.js.map