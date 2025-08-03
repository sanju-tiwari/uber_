import { FaRegClock } from 'react-icons/fa'
import { HiUser } from 'react-icons/hi2'
import { PiNewspaperClipping } from 'react-icons/pi'
import { SlSpeedometer } from 'react-icons/sl'
import {Captiondatacontext} from "../src/context/Captioncontext"
import axios from "axios"
import { useContext } from 'react'
import { useEffect } from 'react'
function Driverfontpage(props) {
  
  const { captiondata, setCaptiondata } = useContext(Captiondatacontext);

     useEffect(() => {
    if (!captiondata?.fullName?.firstname) {
      const fetchProfile = async () => {
        try {
          const res = await axios.get("http://localhost:3000/caption/profile", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          setCaptiondata(res.data.caption);
        } catch (err) {
          console.log("Profile fetch failed", err);
        }
      };
      fetchProfile();
    }
  }, []);

  console.log("Caption data in Driverfontpage:", captiondata);

  return (
     <div className="h-[18rem] bg-white w-full">
          <div className=" h-[6rem] flex items-center justify-between w-full " >
              <div className=" flex items-center ml-3 ">
                <div className=" h-[4rem] w-[4rem] flex items-center justify-center text-2xl text-white  bg-black rounded-full " >
                    <HiUser/>
                </div>
                <div className=" ml-1.5 font-medium text-[1.2rem] " >
                  <h1> {captiondata?.fullName?.firstname + " " + captiondata?.fullName?.lastname || "Guest" }</h1>
                </div>
                </div> 
                <div className="text-black mr-3.5 " >
                  <h1 className="font-medium text-[1.4rem] " >
                    ₹{captiondata?.totalearning ?? 0}
                  </h1>
                  <h3 className=" text-gray-600 " >Earned</h3>
                </div>
          </div>
          <div className=" h-[12rem] bg-amber-500 flex   " >        
            <div className="  w-full flex items-center justify-around ">
                   <div className=" flex flex-col items-center justify-center w-[8rem] h-[5rem] " >
                       < FaRegClock className=" text-black text-3xl  " />
                       <h1 className=" text-[1.2rem] mt-1 font-medium " >18.9 </h1>
                       <h2 className=" text-sm " >Hours online</h2>
                   </div>
                      <div className=" w-[8rem] h-[5rem] flex flex-col items-center justify-center " >
                        <SlSpeedometer className=" text-black text-3xl "  />
                                <h1 className=" text-[1.2rem] mt-1 font-medium " >30 kM</h1>
                                <h2 className=" text-sm">Total Distance</h2>
                   </div>
                      <div className=" w-[8rem] flex flex-col items-center justify-center h-[5rem] " >
                        <PiNewspaperClipping className=" text-black text-3xl " />
                        <h1 className=" text-[1.2rem] mt-1 font-medium " >30 </h1>
                                <h2 className=" text-sm">Total Jobs</h2>
                   </div> 
            </div>
          </div>
       </div>
  )
}

export default Driverfontpage
