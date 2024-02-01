export interface ITransaction {
    amount: number;
    category: string;
    date: Date;
    description?: string;
    type: string;
    paymentMode: string;
}

export interface ITransactionDocument extends ITransaction, Document {
    
};
