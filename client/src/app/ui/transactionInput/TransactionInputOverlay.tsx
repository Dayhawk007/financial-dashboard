'use client'

import React, { useState } from 'react';
import TransactionForm from './TransactionInputForm';

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const TransactionInputOverlay = (props: Props) => {
  return (
    <>
    {props.isOpen && (
      <div className="fixed inset-0 -top-8 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-black rounded-2xl w-1/3">

          <TransactionForm onSubmit={
            (data) => {
              console.log(data)
            }
          } setIsOpen={props.setIsOpen} />
        </div>
      </div>
    )}
    </>
  )
}

export default TransactionInputOverlay