import { Request, Response } from 'express'
import {LannisterPayload, SplitInfo} from "lannisterPayTypes";

export const paymentComputation = async (req: Request, res: Response) => {
    const {ID, SplitInfo, Amount} = req.body as LannisterPayload
    const sortedSplitInfoArray = SplitInfo.map((items) => {
        if (items.SplitType === 'FLAT') {
            return {...items, weight: 1}
        } else if (items.SplitType === 'PERCENTAGE') {
            return {...items, weight: 2}
        } else {
            return {...items, weight: 3}
        }
    }).sort((a, b) => {
        return a.weight < b.weight ? -1 : 1
    })

    const modifiedArray = sortedSplitInfoArray.map((item) => {
        const {weight, ...other} = item
        return other
    })

    const computedValue = await compute({ID, initialAmount: Amount, splitInfoArray: modifiedArray})
    res.status(200).json(computedValue)
}

    interface ComputePayload{
        ID: number
        initialAmount: number
        splitInfoArray: SplitInfo[]
    }
    const compute = async (payload: ComputePayload) => {
        const {initialAmount, splitInfoArray, ID} = payload
        let computationBalance = initialAmount
        const totalRatio = splitInfoArray.reduce((acc:number, item: SplitInfo) => {
          return item.SplitType === 'RATIO' ? acc + item.SplitValue : 0
        },0)
        let tempRatioBalance = initialAmount
        const computedArray = splitInfoArray.map((item ) => {
            let result = {}
            switch (item.SplitType){
                case 'FLAT':
                    computationBalance = computationBalance - item.SplitValue
                    result = {SplitEntityId: item.SplitEntityId, Amount: item.SplitValue}
                    tempRatioBalance = computationBalance
                    break
                case 'PERCENTAGE':
                    const percentageValue = (item.SplitValue / 100) * computationBalance
                    computationBalance = computationBalance - percentageValue
                    result = {SplitEntityId: item.SplitEntityId, Amount: percentageValue}
                    tempRatioBalance = computationBalance
                    break
                case 'RATIO':
                    const ratioValue = ((item.SplitValue / totalRatio) * tempRatioBalance)
                    result = {SplitEntityId: item.SplitEntityId, Amount: ratioValue}
                    computationBalance = computationBalance - ratioValue
                    break
                default:
                    break
            }
            return result
        })
            return {
                ID,
                Balance: computationBalance >=0 ? computationBalance: 0,
                SplitBreakdown: computedArray
            }

    }