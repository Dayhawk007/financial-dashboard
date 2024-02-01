import { ITransaction } from "../interfaces/ITransactions";
import TransactionModel from "../models/transactionsModel";

class TransactionService {
    async createTransaction(transaction: ITransaction) {

        if(transaction.amount <= 0) {
            throw new Error("Amount cannot be negative or zero")
        }
        if(transaction.category === "") {
            throw new Error("Category cannot be empty")
        }
        if(transaction.date === undefined) {
            throw new Error("Date cannot be empty")
        }

        const createdTransaction=await TransactionModel.create(transaction);

        return createdTransaction;

    }

    async fetchTransactionsGroupedByCategory() {
        const transactions = await TransactionModel.aggregate([
            {
                $match:{
                    date:{
                        $gte: new Date(new Date().setDate(new Date().getDate()-30))
                    },
                    type: "expense"
                },
            }
            ,{
                $group: {
                    _id: "$category",
                    total: { $sum: "$amount" }
                }
            }
        ]);

        return transactions;
    }

    async getTransactions(pagination: {page: number, limit: number}) {

        if(pagination.page <= 0) {
            throw new Error("Page cannot be negative or zero")
        }
        if(pagination.limit <= 0) {
            throw new Error("Limit cannot be negative or zero")
        }

        const transactions = await TransactionModel.find()
        .skip((pagination.page - 1) * pagination.limit)
        .limit(pagination.limit)
        .sort({date: -1});

        const count = await TransactionModel.countDocuments();

        return {
            paginatedData: transactions,
            itemCount: count
        }

    }
}

export {TransactionService}