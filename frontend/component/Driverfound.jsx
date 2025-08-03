import car from "../../frontend/src/img/car.png"
import bike from "../../frontend/src/img/uberbike.webp"
import auto from "../../frontend/src/img/uberauto.webp"
import { FaAngleDown, FaLocationDot } from "react-icons/fa6"
import { SiPronounsdotpage } from "react-icons/si";
import { FaDotCircle } from "react-icons/fa"
import { TfiCreditCard } from "react-icons/tfi"

function Driverfound(props) {
  
   const handleclick = ()=>{
      props.setwaiting(false)
      console.log("hello onclick ")
   }
  return (
     <div>
           <h1 onClick={handleclick} className=" cursor-pointer absolute top-4 left-2 text-2xl font-medium text-white"><FaAngleDown /></h1>
            <div className="flex items-center justify-between  " >
                                 <div>
                                     <img className=" w-[10rem] drop-shadow-[0px_0px_2px_white] mt-2 " src={car} alt="error" />
                                 </div>
                                 <div className=" text-white mt-2 mr-2  " >
                                    <h1 className=" text-end text-2xl  font-medium" > {props?.confirmridedata?.caption?.fullName?.firstname + " " + props?.confirmridedata?.caption?.fullName?.lastname || "Guest" }</h1>
                                    <h2 className= " font-bold text-end  " >{props?.confirmridedata?.caption?.vehicle?.plate}</h2>
                                    <h3 className="text-end font-medium" >{props?.confirmridedata?.caption?.vehicle?.vehicleType}</h3>
                                 </div>
            </div>
            <div className=" border-[1px] mt-8 mb-4 flex flex-row items-center  border-gray-300 w-full h-auto " >
          
                                   <div className="text-white mr-3 ml-2 " >
                                    <FaLocationDot />
                                   </div>
                                   <div className=" text-white " >
                                      <h1 className=" font-medium text-xl " >Pickup</h1>
                                      <h2 className=" text-gray-300 " >{props.pickup}</h2>
                                   </div>
            </div>
             <div className=" border-[1px] mt-2 mb-4 flex flex-row items-center  border-gray-300 w-full h-auto " >
                                   <div className="text-white mr-3 ml-2 " >
                                   <FaDotCircle />
                                   </div>
                                   <div className=" text-white " >
                                      <h1 className=" font-medium text-xl " >Destination</h1>
                                      <h2 className=" text-gray-300 " >{props.destination} </h2>
                                   </div>
            </div>
            <div className=" border-[1px] mt-2 mb-2 flex flex-row items-center  border-gray-300 w-full h-[4rem] " >
                                   <div className="text-white mr-3 ml-2 " >
                                    <TfiCreditCard />
                                   </div>
                                   <div className=" text-white " >
                                      <h1 className=" font-medium text-xl " >₹{props.fare[props.VehicleType]}</h1>
                                      <h2 className=" text-gray-300 " >Cash Cash</h2>
                                   </div>
            </div>
               <div className=" border-[1px] mt-2 mb-2 flex flex-row items-center  border-gray-300 w-full h-[4rem] " >
                                   <div className="text-white mr-3 ml-2 " >
                                    <SiPronounsdotpage />
                                   </div>
                                   <div className=" text-white " >
                                      <h1 className=" font-medium text-xl"> <span className=" text-yellow-400 " >OTP</span>-- {props?.confirmridedata?.otp} </h1>
                                   </div>
            </div>
        </div>
  )
}

export default Driverfound
