'use client';

import React from 'react'

type Props = {
    title: string;
    information: string;
    additionalInformation: string;
}

const Card = (props: Props) => {
  return (
    <div style={{
        boxShadow: "2px 2px 20px rgba(197, 197, 197, 0.40)"
    }} className='flex flex-col items-start space-y-1 py-6 px-8 bg-white rounded-xl w-7/12 group hover:bg-accent cursor-pointer ease-in-out transition-all duration-300'>
        <h3 className='text-sm font-medium pb-3 group-hover:text-white  text-slategray capitalize'>{props.title}</h3>
        <h3 className='text-4xl font-medium group-hover:text-white text-dimgray'>{props.information}</h3>
        <h3 className='text-sm pt-1 font-light group-hover:text-white text-gray-500'><span className='rounded-full text-xs border-green-400 border-[1px] text-green-400 px-2 py-1 mr-2'> {props.additionalInformation}</span> from last month</h3>
    </div>
  )
}

export default Card