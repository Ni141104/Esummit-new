'use client'
import React from 'react';
import Image from 'next/image'; // Import Next.js Image component
import './hello.css'
import { useState } from 'react';

import Navbar from '../components/Navbar';
const PaymentGateway = () => {
   const [TransactionId, setTransactionId] = useState('')
   const [ContactNumber, setContactNumber] = useState('')
   const [ScoutId, setScoutId] = useState('');

   const handleSubmit=()=>{
    console.log(TransactionId);
    console.log(ContactNumber);
    console.log(ScoutId);

    const transactionform=new FormData();
    transactionform.append({'TransactionId' :TransactionId})
    transactionform.append({'ContactNumber' :ContactNumber})
    transactionform.append({'ScoutId' :ScoutId});

    const res=fetch('http://localhost:3000/payment/create-transaction',{
      method:"POST",
      body:transactionform,
      headers:{
        'Content-Type': 'application/json', 
        }
    })
   }
  return (
    <>
    <Navbar/>
      <div className='text-[30px] text-center mt-[120px]'>Payment Section</div>
      <div className='flex flex-col justify-center items-center gap-[20px]'>
        <div className='qr-image'>
          <Image
            className='w-[300px] h-[300px] rounded-[40px]'
            src='/QRCODE.jpg' // Use the public directory path
            alt='QR Image'
            width={400} // Define width for Next.js Image
            height={400} // Define height for Next.js Image
          />
        </div>
        <div className='flex flex-col '>
          <input
            className='mx-[20px] sm:mx-[100px] border-[3px] border-black w-[300px] rounded-[20px] px-[20px] text-[20px] text-black'
            type='text'
            placeholder='Enter TransactionID'
            value={TransactionId}
            onChange={(e)=>setTransactionId(e.target.value)}
          />
          <input
            className='mx-[20px] sm:mx-[100px] border-[3px] border-black w-[300px] rounded-[20px] px-[20px] text-[20px] text-black'
            type='text'
            placeholder='Enter Referal_ID'
            value={ScoutId}
            onChange={(e)=>setScoutId(e.target.value)}
          />
          <input
            className='mx-[20px] sm:mx-[100px] border-[3px] border-black w-[300px] rounded-[20px] px-[20px] text-[20px] text-black'
            type='text'
            placeholder='Enter Phone Number'
            value={ContactNumber}
            onChange={(e)=>setContactNumber(e.target.value)}
          />
          <button className='self-center mt-3 bg-green-400 text-white w-[100px] text-[20px] rounded-[20px]' onClick={handleSubmit}>Send</button>
        </div>
      </div>
      <div className='flex items-center justify-center w-[100%]'>
      <div class="slider mt-[20px] mx-[40px] h-[30px] sm:h-[50px] text-black bg-white text-[15px] w-[80%] sm:text-[20px] rounded-[30px]  ">
	<div class="slide-track flex w-[100vw] py-[10px] flex-row gap-[70px] items-center justify-center">
      
      <span>Notification :</span>
      <span>Rahul Bought the ticket</span>
      <span>Sahil Bought the Ticket</span>
      <span>Navjot Bought the Ticke</span>
      <span>Zaid Bought the Ticket</span>
    </div>
    </div>
    </div>
    </>
  );
};

export default PaymentGateway;
