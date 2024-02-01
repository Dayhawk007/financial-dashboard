"use client";

import { MoreVert, LocalHospital, AttachMoney, House, ShoppingBasket, Movie, CardGiftcard, CardGiftcardOutlined, ReceiptOutlined, ReceiptTwoTone, Favorite, ShowChart, LocalLibrary, School, LocalDining } from '@material-ui/icons';
import React, { useState } from 'react';
import {MaterialSymbol} from "react-material-symbols"
import { MenuItem, Menu, IconButton } from '@material-ui/core';


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
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  
    const handleDropdownClick = (transaction: Transaction, event: React.MouseEvent<HTMLElement>) => {
      setSelectedTransaction(transaction);
      setAnchorEl(event.currentTarget);
    };
  
    const handleMenuClose = () => {
      setSelectedTransaction(null);
      setAnchorEl(null);
    };
  
    const handleEdit = () => {
      // Implement your edit logic here
      console.log('Edit Transaction:', selectedTransaction);
      handleMenuClose();
    };
  
    const handleDelete = () => {
      // Implement your delete logic here
      console.log('Delete Transaction:', selectedTransaction);
      handleMenuClose();
    };

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
  

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className='text-slategray text-base text-left'>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Category</th>
            <th className="py-2 px-4">Date</th>
            <th className="py-2 px-4">Amount</th>
            <th className="py-2 px-4">Payment Method</th>
            <th className="py-2 px-4">Type</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((transaction) => (
            <tr key={transaction.id} className='text-black font-medium text-sm'>
              <td className="py-4 pl-4 pr-8 w-56  capitalize">{transaction.description}</td>
              <td className="py-2 px-4 w-44 capitalize"><div className="flex flex-row space-x-2 items-center"><div>
                {categoryIconMap[transaction.category.toLowerCase()]} </div><div>{transaction.category}  </div></div> </td>
              <td className="py-2 px-4">
                <div className="flex flex-col w-full">
                    <h3 className="text-sm font-semibold">{new Date(transaction.date).toLocaleDateString('en-GB').replace(/\//g, '-')}</h3>
                    <h5 className="text-xs text-slategray">{formatTime(transaction.date)}</h5>
                </div>
              </td>
              <td className="py-2 px-4 font-bold text-sm">₹{transaction.amount.toFixed(2)}</td>
              <td className="py-2 px-4 font-medium text-base">{transaction.paymentMode}</td>
              <td className="py-2 px-4 font-medium text-base">{transaction.type}</td>
              <td className="py-2 px-4">
                <div className="flex items-center shadow-none">
                  <IconButton
                    aria-controls={`transaction-menu-${transaction.id}`}
                    aria-haspopup="true"
                    onClick={(e) => handleDropdownClick(transaction, e)}
                  >
                    <MoreVert />
                  </IconButton>
                  <Menu
                    id={`transaction-menu-${transaction.id}`}
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    PaperProps={{
                        style: {
                            boxShadow: "2px 4px 7px rgba(197, 197, 197, 0.2)",
                            backgroundColor: "#304DAF",
                            color: "white",

                        },
                    }}
                  >
                    <MenuItem onClick={handleEdit}>Edit</MenuItem>
                    <MenuItem onClick={handleDelete}>Delete</MenuItem>
                  </Menu>
                </div>
              </td>
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
