import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import { transactionRoutes } from './src/api/routes/transactionRoutes';
import { userRoutes } from './src/api/routes/userRoutes';

dotenv.config();

const app: Express = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());

const mongo_url=process.env.MONGO_URI || "mongodb://127.0.0.1:27017/kitchen-spur";


// Connect to MongoDB
mongoose.connect(mongo_url,{
    connectTimeoutMS: 10000,
    retryWrites: true
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Failed to connect to MongoDB:', error);
});
    
app.use('/api/transactions', transactionRoutes);

app.use('/api/users', userRoutes);

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
}).on('error', (error) => {
    console.error('Failed to start server:', error);
});
