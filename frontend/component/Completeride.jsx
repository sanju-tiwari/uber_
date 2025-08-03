import { FaAngleDown, FaDotCircle, FaUser } from "react-icons/fa"
import { FaLocationDot } from "react-icons/fa6"
import { TfiCreditCard } from "react-icons/tfi"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { useState } from "react"
const Completeride = (props) => {
 const navigate = useNavigate()

 console.log("Ride data in Completeride:", props.ridedata);

 const handleclick = async()=>{
   
   try {
       const response = await axios.post("http://localhost:3000/rider/completed" , {
       rideId: props.ridedata._id,
       caption:props.ridedata.caption._id
    }, {
       headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
   } )
      
   // const updatedCaption = response.data;
   // console.log("Updated totalearning:", updatedCaption.totalearning);
         console.log("Ride cancelled successfully:", response.data);
         props.setconfirmride(false);
         navigate('/caption-home' , {state:{ride:response.data}})
        
   } catch (error) {
      console.log(error.message)
   }
 }
  return (
     <div>
              <h1 onClick={()=>props.setconfirmride(false)} className=" cursor-pointer absolute top-4 right-2 text-2xl font-medium text-white " ><FaAngleDown /> </h1>
         <h1 className=' text-white  text-xl font-normal mt-[2rem] mb-[1rem] lexend-uniquifier ml-1 ' >Finish This Ride  </h1>
         <div className=' flex items-center justify-between' >
             <div className=' bg-yellow-400 w-full p-4 h-[4rem] flex items-center justify-between rounded-xl ' >
             <div className=' flex items-center flex-row  ' >
             <div className=' h-[3rem] text-xl w-[3rem] rounded-full bg-white flex items-center justify-center ' >
                        <FaUser />
             </div>
             <h1 className=' text-xl font-medium ml-2.5 ' >{props?.ridedata?.user?.name }</h1>
             </div>
             <h1 className='font-semibold text-xl ' >2.2 KM </h1>
             </div>
         </div>
             <div className=" border-[1px] mt-8 mb-4 flex flex-row items-center  border-gray-300 w-full h-auto " >
                   
                                            <div className="text-white mr-3 ml-2 " >
                                             <FaLocationDot />
                                            </div>
                                            <div className=" text-white " >
                                               <h1 className=" font-medium text-xl " >Pickup</h1>
                                               <h2 className=" text-gray-300 " >{props?.ridedata?.pickup}</h2>
                                            </div>
             </div>
             <div className=" border-[1px] mt-2 mb-4 flex flex-row items-center  border-gray-300 w-full h-auto " >
                                            <div className="text-white mr-3 ml-2 " >
                                            <FaDotCircle />
                                            </div>
                                            <div className=" text-white " >
                                               <h1 className=" font-medium text-xl " >Destination</h1>
                                               <h2 className=" text-gray-300 " >{props?.ridedata?.destination} </h2>
                                            </div>
             </div>
             <div className=" border-[1px] mt-2 mb-2 flex flex-row items-center  border-gray-300 w-full h-[4rem] " >
                                            <div className="text-white mr-3 ml-2 " >
                                             <TfiCreditCard />
                                            </div>
                                            <div className=" text-white " >
                                               <h1 className=" font-medium text-xl " >₹{props?.ridedata?.fare}</h1>
                                               <h2 className=" text-gray-300">Cash Cash</h2>
                                            </div>             
    </div>
         <button onClick={handleclick} className=' flex justify-center items-center 
          bg-green-600 h-[3rem] mt-2 w-full rounded-[8px] font-medium text-white ' >Finish Ride </button>
        </div>
  )
}

export default Completeride
