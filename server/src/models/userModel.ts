import mongoose from "mongoose";
import { IUserDocument } from "../interfaces/IUser";

const UserSchema = new mongoose.Schema<IUserDocument>({
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  balance: {
    type: Number,
    required: true
  },
  income: {
    type: Number,
    required: true
  },
  expenses: {
    type: Number,
    required: true
  },
  dailyBudget: {
    type: Number,
    required: true
  },
  monthlyBudget: {
    type: Number,
    required: true
  }
});

const UserModel = mongoose.model<IUserDocument>("Users", UserSchema);

export default UserModel;