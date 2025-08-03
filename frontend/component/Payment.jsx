import car from "../../frontend/src/img/car.png"
import bike from "../../frontend/src/img/uberbike.webp"
import auto from "../../frontend/src/img/uberauto.webp"
import { FaAngleDown, FaLocationDot } from "react-icons/fa6"
import { FaDotCircle } from "react-icons/fa"
import { TfiCreditCard } from "react-icons/tfi"
import {SocketContext} from "../src/context/socket"
import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Userdatacontext } from "../src/context/Usercontext"

const Payment = (props) => {

  return (
       <div> 
         <h1 onClick={()=>props.setpayment(false)} className=" cursor-pointer absolute top-4 left-2 text-2xl font-medium text-white " ><FaAngleDown /> </h1>
                                  <div className="flex items-center justify-between  " >
                                     <div>
                                         <img className=" w-[10rem] drop-shadow-[0px_0px_2px_white] mt-2 " src={car} alt="error" />
                                     </div>
                                     <div className=" text-white mt-2 mr-2  " >
                                        <h1 className=" text-end text-2xl  font-medium " >{props?.confirmridedata?.caption?.fullName?.firstname + " " + props?.confirmridedata?.caption?.fullName?.lastname || "Guest" }</h1>
                                        <h2 className= " font-bold text-end  " >{props?.confirmridedata?.caption?.vehicle?.plate}</h2>
                                        <h3 className="text-end  font-medium" >{props?.confirmridedata?.caption?.vehicle?.vehicleType}</h3>
                                     </div>
                                  </div>
                                 <div className=" border-[1px] mt-8 mb-4 flex flex-row items-center  border-gray-300 w-full h-auto " >
              
                                       <div className="text-white mr-3 ml-2 " >
                                        <FaLocationDot />
                                       </div>
                                       <div className=" text-white " >
                                          <h1 className=" font-medium text-xl " >Destination</h1>
                                          <h2 className=" text-gray-300 " >{props.destination}</h2>
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
            <button className="w-full h-[3rem]  bg-green-700 rounded-[8px] font-medium text-white mt-2 " >Make a payment</button>
            </div>
  )
}

export default Payment
