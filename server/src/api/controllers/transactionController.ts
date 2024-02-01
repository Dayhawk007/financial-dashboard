import { Request, Response } from "express";
import { ITransaction } from "../../interfaces/ITransactions";
import { HttpCodes } from "../../config/httpCodes";
import { TransactionService } from "../../services/transactionsService";

export const createTransaction = async (req: Request, res: Response) => {

    const transaction:ITransaction = req.body;

    console.log(transaction);

    if(transaction.amount <= 0) {
        return res.status(HttpCodes.BAD_REQUEST).send("Amount cannot be negative or zero")
    }
    if(transaction.category === "") {
        return res.status(HttpCodes.BAD_REQUEST).send("Category cannot be empty")
    }
    if(transaction.date === undefined) {
        return res.status(HttpCodes.BAD_REQUEST).send("Date cannot be empty")
    }

    if(transaction.type !== "income" && transaction.type !== "expense" && transaction.type!=="transfer") {
        return res.status(HttpCodes.BAD_REQUEST).send("Type must be either income or expense or transfer")
    }

    const transactionService=new TransactionService();

    try {

        const createdTransaction=await transactionService.createTransaction(transaction);

        return res.status(HttpCodes.CREATED).send(createdTransaction);

    } catch (error:any) {

        return res.status(HttpCodes.INTERNAL_SERVER_ERROR).send({
            message: error.message
        });

    }
}

export const getTransactions = async (req: Request, res: Response) => {

    const pagination = {
        page: Number(req.query.page) || 1,
        limit: Number(req.query.limit) || 10
    }

    if(pagination.page <= 0) {
        return res.status(HttpCodes.BAD_REQUEST).send("Page cannot be negative or zero")
    }
    if(pagination.limit <= 0) {
        return res.status(HttpCodes.BAD_REQUEST).send("Limit cannot be negative or zero")
    }

    const transactionService=new TransactionService();

    try {

        const transactions=await transactionService.getTransactions(pagination);

        if(transactions.paginatedData.length === 0) {
            console.log("No transactions found");
            return res.status(HttpCodes.NO_CONTENT).send({
                message: "No transactions found"
            });
        }

        return res.status(HttpCodes.OK).send(transactions);

    } catch (error:any) {

        return res.status(HttpCodes.INTERNAL_SERVER_ERROR).send({
            message: error.message
        });

    }
}

export const getTransactionsGroupedByCategory = async (req: Request, res: Response) => {

    const transactionService=new TransactionService();

    try {

        const transactions=await transactionService.fetchTransactionsGroupedByCategory();

        if(transactions.length === 0) {
            console.log("No transactions found");
            return res.status(HttpCodes.NO_CONTENT).send({
                message: "No transactions found"
            });
        }

        return res.status(HttpCodes.OK).send(transactions);

    } catch (error:any) {

        return res.status(HttpCodes.INTERNAL_SERVER_ERROR).send({
            message: error.message
        });

    }

}

export const getTransactionsByInterval = async (req: Request, res: Response) => {
    
        const transactionService=new TransactionService();
    
        try {
    
            const transactions=await transactionService.fetchTransactionGroupedByIntervals("Weekly");
    
            if(transactions.length === 0) {
                console.log("No transactions found");
                return res.status(HttpCodes.NO_CONTENT).send({
                    message: "No transactions found"
                });
            }
    
            return res.status(HttpCodes.OK).send(transactions);
    
        } catch (error:any) {
    
            return res.status(HttpCodes.INTERNAL_SERVER_ERROR).send({
                message: error.message
            });
    
        }
}