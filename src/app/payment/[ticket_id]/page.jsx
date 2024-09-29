'use client'
import React from 'react';
import Image from 'next/image'; // Import Next.js Image component
import './hello.css'
import 'react-toastify/dist/ReactToastify.css'

import Navbar from '../../components/Navbar';
import { useSession } from 'next-auth/react';
import { useEffect,useState } from 'react';
import InfinityLoader from '../../components/infinite_loader';
import { toast, ToastContainer } from 'react-toastify';
import Footer from '../../components/Footer';
import { usePathname, useSearchParams } from 'next/navigation';
  const PaymentGateway = () => {
  const {data:session}=useSession()
   const [TransactionId, setTransactionId] = useState('')
   const [ContactNumber, setContactNumber] = useState('')
   const [ScoutId, setScoutId] = useState('');
  
   const pathName=usePathname();

   const id=pathName.split('/').pop();

   const searchParams=useSearchParams();

   const events=searchParams.get('events')

   const eventList=events? events.split(','): [];


   const handleSubmit=async ()=>{

    const QRAmount={
      '1':50,
      '2':200,
      '3':100
    }

    const eventMap = {
    '1':'Startup Survival',
    // '2': 'Big Bull' ,
     '2': 'Breaking Convention',
     '3': 'Brand Brawl' ,
     '4': 'E summit Junior',
      '5': 'Lights Out' ,
    //  '6': 'Stadium Showdown' 
    }
    var eventNames = eventList.map(eventId => eventMap[eventId]);

    if(id==='2')
    {
      eventNames='all'
    }

    if(id==='4')
    {
      eventNames='All online events'
    }

    if (!session) {
      toast.error('You must need to sign in to buy ticket')
      return;
    }

    const isValidPhoneNumber = /^\d{10}$/.test(ContactNumber);
    if (!isValidPhoneNumber) {
      toast.error('Phone number must be exactly 10 digits.');
      return;
    }

    console.log(TransactionId);
    console.log(ContactNumber);
    console.log(ScoutId);

    const transactionform=new FormData();
    transactionform.append('TransactionId',TransactionId)
    transactionform.append('ContactNumber', ContactNumber)
    transactionform.append('ScoutId' ,ScoutId);
try {
  const res=await fetch('/api/transaction/create-transaction',{
    method:"POST",
    headers: {
      'Content-Type': 'application/json',
  },
    body: JSON.stringify({
    email:session?.user.email,
    contactnumber:ContactNumber,
    username:session?.user.name,
    transactionid:TransactionId,
    scoutid:ScoutId,
    amount:QRAmount[id]
    })
  })
  if (!res.ok) {
    const errorText = await res.json();
    console.log(errorText.error)
    toast.error(`${errorText.error}`)
    throw new Error(`HTTP error! status: ${res.status}, message: ${errorText}`);

   }

else{
  const result = await res.json();
  console.log(result);

  toast("Ticket booked");
}
} catch (error) {
  console.log(error);
}
  }

    const [loading, setLoading] = useState(true);
  
    // Simulate a data fetch with a timeout
    useEffect(() => {
      const timer = setTimeout(() => {
        setLoading(false); // Set loading to false after 2 seconds
      }, 2000);
  
      return () => clearTimeout(timer); // Clean up the timeout
    }, []);
       const [visits, setVisits] = useState(0);

  useEffect(() => {
    // Retrieve the visit count from localStorage
    let visitCount = localStorage.getItem('visitCount');

    if (!visitCount) {
      // First visit, initialize it
      visitCount = 1;
    } else {
      // Increment the visit count
      visitCount = parseInt(visitCount) + 1;
    }

    // Store updated visit count in localStorage
    localStorage.setItem('visitCount', visitCount);
    setVisits(visitCount);
  }, []);

    const qrCodeMapping={
      '1':'/assets/50Rs_QR.jpeg',
      '2':'/assets/100Rs_QR.jpeg',
      '3':'/assets/200Rs_QR.jpeg',
      '4':'/QRCODE.jpg'
    }

    const qrCodeImage = qrCodeMapping[id] 
  return (
    <div>
      {loading ? (
        <InfinityLoader /> // Show loader while loading
      ) : (
    <div className='bg-black'>
    <Navbar/>
    <ToastContainer/>
      <div className='text-[20px] sm:text-[30px] text-center mt-[27%] text-white  sm:mt-[10%]'>Don't Miss a Oppurtunity</div>
      <div className='flex flex-col justify-center items-center gap-[20px] mb-[5%]'>
        <div className='qr-image'>
          <Image
            className='w-[300px] h-[300px] rounded-[40px]'
            src={qrCodeImage} // Use the public directory path
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
      
      {/* {notification && <div className='text-red-500'>{notification}</div>}
      <div className='flex items-center justify-center w-[100%]'>
      <div class="slider mt-[20px] mx-[40px] h-[30px] sm:h-[50px] text-black bg-white text-[15px] w-[80%] sm:text-[20px] rounded-[30px]  ">
	<div class="slide-track flex w-[100vw] py-[10px] flex-row gap-[70px] items-center justify-center">
      
      <span>Notification :</span>
      <span>Rahul Bought the ticket</span>
      <span>Sahil Bought the Ticket</span>
      <span>Navjot Bought the Ticke</span>
      <span>Zaid Bought the Ticket</span>
    </div>
    </div> */}
    {/* </div> */}
    <ul className='flex items-center list-disc  justify-center flex-col'>
    <li className='text-[20px] text-white'>Multiple Transaction done from one  user would be counted under one Transaction. </li>
    <li className='text-[20px] text-left text-white'>In case of any Issue Contact Ecell Support Team</li>
    </ul>
    
    <Footer />
    </div>
      )}
      </div>
  );
};

export default PaymentGateway;
