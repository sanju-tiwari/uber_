import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useRef, useState } from 'react'
import { FaChevronUp } from "react-icons/fa";
import Completeride from '../../component/Completeride';
import { useLocation } from 'react-router-dom';
import LiveTracking from '../../component/livetraking';
function Captionriding() {
    const [confirmride , setconfirmride] = useState(false)
    const location = useLocation()
    const { ridedata } = location.state || {};
    console.log("Ride data in Captionriding:", ridedata);
    const confirmref = useRef(null)
    useGSAP(() => {
  if (!confirmride) {
    gsap.to(confirmref.current, {
      y: 850,
      duration: 1,
    });
  } else {
    gsap.to(confirmref.current, {
      y: 0,
      duration: 0.5,
    });
  }
}, [confirmride]);
  

  return (
    <div className=' flex flex-col h-auto relative overflow-hidden w-screen bg-black ' >
    <div className="h-[40rem] overflow-hidden bg-red-400" >
       < LiveTracking />
    </div>
    <div className='bg-yellow-500 relative overflow-hidden flex-row h-[10rem] w-full flex items-center justify-center p-4 ' >
             <h1 onClick={()=>setconfirmride(true)} className='absolute w-full font-mono  top-2 flex  items-center  justify-center text-xl text-black'><FaChevronUp/></h1>
           <button onClick={()=> setconfirmride(true)} className='bg-green-800 text-white font-semibold w-[12rem] rounded-[8px] h-[3rem] ' >
             Complete Ride
           </button>
    </div>
     <div ref={confirmref} className="absolute bottom-0 bg-black h-[30rem] w-full">
            <Completeride 
            ridedata={ridedata}
            setconfirmride={setconfirmride}/>      
        </div>

    </div>
  )
}

export default Captionriding
