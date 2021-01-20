export interface Transaction {
    transaction:{
        amountCurrency: {
            amount: number
        },
        type: string
    },
    merchant: {
        name: string;
    },
    dates:{
        valueDate: number;
    }
}