import express from 'express';

import { createTransaction, getTransactions, getTransactionsByInterval, getTransactionsGroupedByCategory } from '../controllers/transactionController';

const router = express.Router();

router.post('/', createTransaction);

router.get('/', getTransactions);

router.get('/grouped-by-category', getTransactionsGroupedByCategory);

router.get('/grouped-by-intervals', getTransactionsByInterval);

console.log("Routes established for transactions");
export {router as transactionRoutes}