import { ITransactionDocument } from "../interfaces/ITransactions"

import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema<ITransactionDocument>({
    amount: {
      type: Number,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    description: {
      type: String
    },
    type:{
      type: String,
      required: true
    },
    paymentMode:{
      type: String,
      required: true
    }
});

const TransactionModel = mongoose.model<ITransactionDocument>("Transaction", TransactionSchema);

export default TransactionModel;