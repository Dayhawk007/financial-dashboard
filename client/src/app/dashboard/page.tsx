'use client';
import Header from "../ui/header/Header";
import Analytics from "../ui/analytics/Analytics";
import TransactionInputOverlay from "../ui/transactionInput/TransactionInputOverlay";
import { useEffect, useState } from "react";
import FrameHeader from "../ui/test/SampleComponent";
import { getUserInfo } from "@/lib/userController";
import {IUser} from "@/interfaces/userInterface"

export default function Dashboard() {
    const [isTransactionInputOpen, setIsTransactionInputOpen] = useState(false);
    

    const [userInfo, setUserInfo] = useState<IUser | null>(null);

    const getUser = async () => {
        const userInfo = await getUserInfo();
        if(userInfo != null)
            setUserInfo(userInfo);
        else
            setUserInfo(null);
    }

    useEffect(() => {
        getUser();
        console.log(userInfo);
    }, []);


    return(
        <div className="bg-primary-bg w-screen h-screen flex flex-col py-4 pr-6 pl-4 space-y-4 z-0">
            <Header name={userInfo?.name || "N/A"} setTransactionInputOpen={setIsTransactionInputOpen} />
            <Analytics balance={userInfo?.balance || 0} income={userInfo?.income || 0} expense={userInfo?.expenses || 0} />
            <TransactionInputOverlay isOpen={isTransactionInputOpen} setIsOpen={setIsTransactionInputOpen} />
        </div>
    );
}