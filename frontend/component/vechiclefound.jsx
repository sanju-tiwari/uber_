import car from "../../frontend/src/img/car.png"
import bike from "../../frontend/src/img/uberbike.webp"
import auto from "../../frontend/src/img/uberauto.webp"
import { FaAngleDown, FaLocationDot } from "react-icons/fa6"
import { FaDotCircle } from "react-icons/fa"
import { TfiCreditCard } from "react-icons/tfi"

function Vechiclefound(props) {
  return (
    <div>
       <h1 onClick={()=>props.setvechical(false)} className=" cursor-pointer absolute top-4 right-2 text-2xl font-medium text-white " ><FaAngleDown /> </h1>
                         <h1 className="text-xl font-medium text-center text-white mt-2  " >Looking for a driver</h1>
                          <div className="flex items-center justify-center " >
                              <img className=" w-[10rem] drop-shadow-[0px_0px_2px_white] " src={car} alt="error" />
                          </div>
                         <div className=" border-[1px] mt-2 mb-4 flex flex-row items-center  border-gray-300 w-full h-auto " >
      
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
                                  <h1 className=" font-medium text-xl " >₹{props.fare[ props.VehicleType]}</h1>
                                  <h2 className=" text-gray-300 " >Cash Cash</h2>
                               </div>
                         </div>
    </div>
  )
}

export default Vechiclefound
