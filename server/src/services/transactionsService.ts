import { ITransaction } from "../interfaces/ITransactions";
import TransactionModel from "../models/transactionsModel";
import UserModel from "../models/userModel";

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

        if(transaction.type=="income"){
            await UserModel.findOneAndUpdate({email: "ayushchandwani26@gmai.com"},{
                $inc: {income: transaction.amount, balance: transaction.amount}
            });
        }
        else if(transaction.type=="expense"){
            await UserModel.findOneAndUpdate({email: "ayushchandwani26@gmail.com"},{
                $inc: {expenses: transaction.amount, balance: -transaction.amount}
        });
        }
        else if(transaction.type=="transfer"){
            await UserModel.findOneAndUpdate({email: "ayushchandwani26@gmail.com"},{
                $inc: {balance: -transaction.amount}
            });
        }

        const createdTransaction=await TransactionModel.create(transaction);

        return createdTransaction;

    }

    async fetchTransactionsGroupedByCategory() {
        const transactions = await TransactionModel.aggregate([
            {
                $match:{
                   
                    type: "Expense"
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

    async fetchTransactionGroupedByIntervals(intervalType: string) {
        try {
            const currentDate = new Date();
        
            const result = await TransactionModel.aggregate([
              {
                $match: {
                  date: {
                    $gte: new Date(currentDate.getFullYear() - 3, 0, 1), // Adjust the range as needed
                  },
                },
              },
              {
                $group: {
                  _id: {
                    year: { $year: '$date' },
                    month: { $month: '$date' },
                    week: { $isoWeek: '$date' },
                    income: { $cond: [{ $eq: ['$type', 'income'] }, '$amount', 0] },
                    expense: { $cond: [{ $eq: ['$type', 'expense'] }, '$amount', 0] },
                  },
                  total: { $sum: '$amount' },
                  count: { $sum: 1 },
                },
              },
              {
                $sort: { '_id.year': -1, '_id.month': -1, '_id.week': -1 },
              },
              {
                $project: {
                  _id: 0,
                  year: '$_id.year',
                  month: '$_id.month',
                  week: '$_id.week',
                  income: '$_id.income',
                  expense: '$_id.expense',
                  total: 1,
                  count: 1,
                },
              },
            ]);
        
            console.log(result);
            return result;
          } catch (error) {
            console.error(error);
            throw error;
          }

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