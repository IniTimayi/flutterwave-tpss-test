import validator from '../utils/validate'
import { Request, Response, NextFunction} from 'express'

export const validatePayload = (req: Request, res: Response, next: NextFunction) => {
    const validationRule = {
        ID: 'required',
        Amount: 'required|numeric',
        SplitInfo: 'required|array|min:1|max:20',
        "SplitInfo.*.SplitType": 'required|in:FLAT,PERCENTAGE,RATIO',
        "SplitInfo.*.SplitValue": 'required|numeric|min:0',
        "SplitInfo.*.SplitEntityId": 'required|string',
    }
    validator(req.body, validationRule, {'max.SplitInfo': 'You have more :max items in the splitInfo array', 'min.SplitInfo':'You have less than :min item(s) in the splitInfo array'}, (err, status ) =>{
        if (status){
            next ()
        } else {
            res.status(422).json(err.errors)
        }
    })

}