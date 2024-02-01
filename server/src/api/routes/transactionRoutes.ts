import express from 'express';

import { createTransaction, getTransactions, getTransactionsGroupedByCategory } from '../controllers/transactionController';

const router = express.Router();

router.post('/', createTransaction);

router.get('/', getTransactions);

router.get('/grouped-by-category', getTransactionsGroupedByCategory);

console.log("Routes established for transactions");
export {router as transactionRoutes}