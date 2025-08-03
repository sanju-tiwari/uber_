import { FaAngleDown, FaDotCircle } from 'react-icons/fa'
import { FaLocationDot } from 'react-icons/fa6'
import { TfiCreditCard } from 'react-icons/tfi'
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from "axios"

function Rideconfirm(props) {
   const [otp , setotp] = useState("")
   const navigate = useNavigate()
   console.log("checking ridedata --->" , props.ridedata)
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post("http://localhost:3000/rider/check", {
            rideId: props.ridedata._id,
            otp
        }, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        console.log("OTP successfully checked, ride updated:", response.data); 
        props.setconfirmride(false); 
        navigate("/caption-riding" , {state:{ridedata:response.data} } );
        setotp("");

    } catch (error) {
        if (error.response) {
            console.error("Server Error:", error.response.data.message);
            alert(error.response.data.message || "An error occurred during OTP confirmation.");
        } else if (error.request) {
            console.error("Network Error: No response received from server.");
            alert("Network error: Could not connect to the server. Please try again.");
        } else {
            console.error("Client-side Error:", error.message);
            alert("An unexpected error occurred. Please try again.");
        }
    }
};
  return (
      <div>
         <h1 onClick={()=>props.setconfirmride(false)} className=" cursor-pointer absolute top-[4rem] right-2 text-2xl font-medium text-white "><FaAngleDown /> </h1>
         <h1 className=' text-white  text-xl font-normal mt-[5rem] mb-[1rem] lexend-uniquifier ml-1 ' >Confirm this ride to start ! </h1>
         <div className=' flex items-center justify-between' >
             <div className=' bg-yellow-400 w-full p-4 h-[4rem] flex items-center justify-between rounded-xl ' >
             <div className=' flex items-center flex-row  ' >
             <div className=' h-[3rem] text-xl w-[3rem] rounded-full bg-white flex items-center justify-center ' >
                        <FaUser />
             </div>
             <h1 className='text-xl font-medium ml-2.5'>{props.ridedata.user?.name}</h1>
             </div>
             <h1 className='font-semibold text-xl'>2.2 KM </h1>
 
             </div>
         </div>
             <div className=" border-[1px] mt-8 mb-4 flex flex-row items-center  border-gray-300 w-full h-auto " >
                   
                                            <div className="text-white mr-3 ml-2 " >
                                             <FaLocationDot />
                                            </div>
                                            <div className=" text-white " >
                                               <h1 className=" font-medium text-xl " >Pickup</h1>
                                               <h2 className=" text-gray-300 " >{props.ridedata.pickup}</h2>
                                            </div>
             </div>
             <div className=" border-[1px] mt-2 mb-4 flex flex-row items-center  border-gray-300 w-full h-auto " >
                                            <div className="text-white mr-3 ml-2 " >
                                            <FaDotCircle />
                                            </div>
                                            <div className=" text-white " >
                                               <h1 className=" font-medium text-xl " >Destination</h1>
                                               <h2 className=" text-gray-300 " >{props.ridedata.destination}</h2>
                                            </div>
             </div>
             <div className=" border-[1px] mt-2 mb-2 flex flex-row items-center  border-gray-300 w-full h-[4rem] " >
                                            <div className="text-white mr-3 ml-2 " >
                                             <TfiCreditCard />
                                            </div>
                                            <div className=" text-white " >
                                               <h1 className=" font-medium text-xl " >₹{props.ridedata.fare}</h1>
                                               <h2 className=" text-gray-300">Cash Cash</h2>
                                            </div>             
    </div>
       <form onSubmit={handlesubmit} className=' flex items-center justify-center flex-col'>
         <input value={otp} onChange={(e)=> setotp(e.target.value) } type="text" placeholder='Enter The OTP ' className=' text-center h-[4rem] w-full bg-gray-300 text-xl rounded-[10px] font-semibold mt-[2rem] mb-[1rem] placeholder:text-black placeholder:font-semibold placeholder:text-center '  />
         <button type='submit'  className=' flex justify-center items-center 
          bg-green-700 h-[3rem] mt-2 w-full rounded-[8px] font-medium text-white mb-2 ' >Confirm </button>
         <button onClick={()=>(props.settakingride(false) , props.setconfirmride(false))} className=' bg-red-700 h-[3rem] mt-2 w-full rounded-[8px] font-medium text-white'>Cancel</button>
       </form>
        </div>
  )
}

export default Rideconfirm
