"use client";

import { MoreVert, LocalHospital, AttachMoney, House, ShoppingBasket, Movie, CardGiftcard, CardGiftcardOutlined, ReceiptOutlined, ReceiptTwoTone, Favorite, ShowChart, LocalLibrary, School, LocalDining } from '@material-ui/icons';
import React, { useState } from 'react';
import {MaterialSymbol} from "react-material-symbols"


interface Transaction {
  id: number;
  description: string;
  category: string;
  date: string;
  amount: number;
  paymentMode: string;
  type: string;
}

interface TableProps {
  data: Transaction[];
}

const TransactionHistoryTable: React.FC<TableProps> = ({ data }) => {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  const categoryIconMap:any={
    "gifts":<CardGiftcardOutlined className="text-pink-400" />,
    "taxes":<ReceiptTwoTone className="text-gray-400" />,
    "personal care":<Favorite className="text-red-400" />,
    "medical": <LocalHospital className="text-blue-400" />,
    "investments":<ShowChart className="text-green-400" />,
    "salary": <AttachMoney className="text-green-400" />,
    "education":<School className="text-purple-400" />,
    "rent": <House className="text-yellow-400" />,
    "shopping": <ShoppingBasket className="text-cyan-400" />,
    "entertainment": <Movie className="text-orange-400" />,
    "food and dining": <LocalDining className="text-red-600" />,
  }
  const handleDropdownClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
  };

  const closeDropdown = () => {
    setSelectedTransaction(null);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className='text-slategray text-sm text-left'>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Category</th>
            <th className="py-2 px-4">Date</th>
            <th className="py-2 px-4">Amount</th>
            <th className="py-2 px-4">Payment Method</th>
            <th className="py-2 px-4">Type</th>
          </tr>
        </thead>
        <tbody>
          {data.map((transaction) => (
            <tr key={transaction.id} className='text-black font-medium text-sm'>
              <td className="py-4 pl-4  capitalize">{transaction.description}</td>
              <td className="py-2 px-4 capitalize"><div className="flex flex-row space-x-2 items-center"><div>
                {categoryIconMap[transaction.category.toLowerCase()]} </div><div>{transaction.category}  </div></div> </td>
              <td className="py-2 px-4">
                <div className="flex flex-col w-full">
                    <h3 className="text-sm font-semibold">{new Date(transaction.date).toLocaleDateString('en-GB').replace(/\//g, '-')}</h3>
                    <h5 className="text-xs text-slategray">{formatTime(transaction.date)}</h5>
                </div>
              </td>
              <td className="py-2 px-4 font-medium text-sm">₹{transaction.amount.toFixed(2)}</td>
              <td className="py-2 px-4 font-medium text-base">{transaction.paymentMode}</td>
              <td className="py-2 px-4 font-medium text-slategray">{transaction.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
const formatTime = (dateString:string) => {
    const options = { hour: 'numeric', minute: '2-digit', hour12: true };
    return new Date(dateString).toLocaleTimeString('en-GB', options);
};
  

export default TransactionHistoryTable;
