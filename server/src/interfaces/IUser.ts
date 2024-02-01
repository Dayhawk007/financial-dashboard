export interface IUser {
    email: string;
    password: string;
    name: string;
    balance: number;
    income: number;
    expenses: number;
    monthlyBudget: number;
    dailyBudget: number;
}

export interface IUserDocument extends IUser, Document {
    
};