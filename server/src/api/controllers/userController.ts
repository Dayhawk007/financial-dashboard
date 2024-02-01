import { Request, Response } from 'express';
import UserModel from '../../models/userModel';
import { IUser, IUserDocument } from '../../interfaces/IUser';
import { HttpCodes } from '../../config/httpCodes';

export const getDefaultUser = async(req:Request,res:Response) => {
    try {
        const user= await UserModel.findOne({email:"ayushchandwani26@gmail.com"});

        console.log(user);

        if(!user) return res.status(HttpCodes.OK).json({msg:"User does not exist"});

        return res.status(HttpCodes.OK).json(user);
        
    } catch (error:any) {
        return res.status(HttpCodes.INTERNAL_SERVER_ERROR).json({msg:"Error while fetching user "+error.message});
    }
}