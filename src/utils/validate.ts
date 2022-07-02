import Validator, {Errors} from 'validatorjs'

const validator = (body: Record<string, any>, rules: Record<string, any>, customMessages: Record<string, any>, callback:(err:Errors, status: boolean) => void) => {
    const validation = new Validator(body, rules, customMessages)
    validation.passes( () => callback(null, true));
    validation.fails(  ()=> callback(validation.errors, false))
}

export default validator