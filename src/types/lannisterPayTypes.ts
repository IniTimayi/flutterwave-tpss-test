export interface SplitInfo {
    SplitType: SplitTypes
    SplitValue: number
    SplitEntityId: string
}

export interface LannisterPayload {
    ID: number
    Amount: number
    Currency:string
    CustomerEmail: string
    SplitInfo: Array<SplitInfo>
}

enum SplitTypes {
    FLAT ='FLAT',
    PERCENTAGE = 'PERCENTAGE',
    RATIO = 'RATIO'
}