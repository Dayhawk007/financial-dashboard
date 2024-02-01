'use client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { OpenSans } from "@/config/fonts";
import { SetStateAction } from "react";

type Props = {
    name: string;
    setTransactionInputOpen: React.Dispatch<SetStateAction<boolean>>;
}

const Header = (props: Props) => {
  return (
    <div className="flex flex-row justify-between w-full py-2">
        <div className={`${OpenSans.className} flex flex-col items-start space-y-1`}>
            <h1 className="text-2xl font-semibold text-secondary">Welcome Back, {props.name}</h1>
            <h3 className="text-sm font-light text-lightergray">Here is an overview of your financial data</h3>
        </div>
        <div className="flex flex-col bg-black rounded-2xl items-center py-1 w-[24%]">
            <div className="flex flex-row space-x-3 h-full items-center text-white cursor-pointer shadow-lg" onClick={()=>props.setTransactionInputOpen(true)}>
                <FontAwesomeIcon icon={faPlus} className="text-xl" />
                <h3 className={`text-base font-semibold`}>Add Transaction</h3>
            </div>
        </div>
    </div>
  )
}

export default Header