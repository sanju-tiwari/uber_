import uber2 from "../img/uber2.png"
import { MdArrowCircleRight } from "react-icons/md";
import { HiStopCircle } from "react-icons/hi2";
import { GoArrowDownRight } from "react-icons/go";
import { IoLocation } from "react-icons/io5";
import { HiUser } from "react-icons/hi2";
import car from "../img/car.png"
import auto from "../img/uberauto.webp"
import bike from "../img/uberbike.webp"
import { useContext, useEffect, useRef, useState } from "react";
import gsap from "gsap"
import { FaAngleDown } from "react-icons/fa6";
import { TfiCreditCard } from "react-icons/tfi";
import { FaLocationDot } from "react-icons/fa6";
import { FaDotCircle } from "react-icons/fa";
import {useGSAP} from "@gsap/react"
import Vechiclefound from "../../component/vechiclefound";
import { Userdatacontext } from "../context/Usercontext";
import {SocketContext} from "../context/socket"
import axios from "axios"
import Driverfound from "../../component/Driverfound";
import Payment from "../../component/Payment";
import { useNavigate } from "react-router-dom";
function Searchtask() {
    const [cars , setcars] = useState(false)
    const [ panelOpen, setPanelOpen ] = useState(false)
    const [choose , setchoose] = useState(false)
    const [vechical , setvechical] = useState(false)
    const [waiting , setwaiting] = useState(false)
    const [payments , setpayment] = useState(false)
    const [ pickupSuggestions, setPickupSuggestions ] = useState([])
    const [ destinationSuggestions, setDestinationSuggestions ] = useState([])
    const [ activeField, setActiveField ] = useState(null)
    const [ fare, setFare ] = useState({})
    const [ pickup, setPickup ] = useState('')
    const {socket} = useContext(SocketContext)
    const [ destination, setDestination ] = useState('')
    const [ vehicleType, setVehicleType ] = useState(null)
    const vechicalref = useRef(null)
    const waitingref = useRef(null)
    const Paymentref = useRef(null)
    const up = useRef(null)
    const choosevehical = useRef(null)
   const {userdata} = useContext(Userdatacontext)
   const [confrimridedata , setconfirmridedata] = useState("")
    const navigate = useNavigate()

   console.log( "userId-->" ,userdata?.user?.id)

  useEffect(()=>{
          socket.emit("join",{userType:"user" , userID:userdata?.user?.id})
  },[userdata])

  socket.on("confirm-ride" , (data)=>{
        console.log( "confirmdata-ride",data)
        console.log("sanju")
        setwaiting(true)
        setconfirmridedata(data)
        setvechical(false)
  })
  socket.on("checking-otp" , (data)=>{
    console.log("checking-otp" , data)
    setwaiting(false)
    setpayment(true)
  } )
  socket.on('completed-ride'  , (data) => {
  navigate("/user-home")
  console.log("cancel-ride" , data)
});


useGSAP(() => {
  if (!cars) {
    gsap.to(up.current, {
      y: 500,
      duration: 0.5,
    });
  } else {
    gsap.to(up.current, {
      y: -40,
      duration: 0.5,
    });
  }
}, [cars]);
useGSAP(() => {
  if (!choose) {
    gsap.to(choosevehical.current, {
      y: 500,
      duration: 0.5,
    });
  } else {
    gsap.to(choosevehical.current, {
      y: -50,
      duration: 0.5,
    });
  }
}, [choose]);
useGSAP(() => {
  if (!vechical) {
    gsap.to(vechicalref.current, {
      y: 500,
      duration: 0.5,
    });
  } else {
    gsap.to(vechicalref.current, {
      y: -50,
      duration: 0.5,
    });
  }
}, [vechical]);
useGSAP(() => {
  if (!waiting) {
    gsap.to(waitingref.current, {
      y: 500,
      duration: 0.5,
    });
  } else {
    gsap.to(waitingref.current, {
      y: -50,
      duration: 0.5,
    });
  }
}, [waiting]);
useGSAP(() => {
  if (!payments) {
    gsap.to(Paymentref.current, {
      y: 500,
      duration: 0.5,
    });
  } else {
    gsap.to(Paymentref.current, {
      y: -50,
      duration: 0.5,
    });
  }
}, [payments]);   

   
    const handlesubmit = (e)=>{
        e.preventDefault()
    }
    const handlechange = async(e)=>{
      setPickup(e.target.value)
      setcars(false)
      try {
         const response = await axios.get(`http://localhost:3000/maps/auto-suggestion`,{
          params:{input:e.target.value},
          headers:{
              Authorization: `Bearer ${localStorage.getItem('token')}`
          }
         })
           setPickupSuggestions(response.data)
      } catch (error) {
        console.log(error.message)

      }
    }
    const handlechange2 = async(e)=>{
      setDestination(e.target.value)
      setcars(false)
      try {
        const response = await axios.get(`http://localhost:3000/maps/auto-suggestion` , {
          params:{input:e.target.value},
          headers:{
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
         })
        setDestinationSuggestions(response.data)
      }catch (error){
        console.log(error.message)
      }
    }
    const handleSuggestionClick = (suggestion)=>{
        if(activeField === 'pickup'){
            setPickup(suggestion);
            setPickupSuggestions([])
        }else if (activeField === 'destination'){
            setDestination(suggestion)
            setDestinationSuggestions([])
    }}  
    const findtrip = async()=>{
       setcars(true)
       setPanelOpen(false)
       try {
        const response = await axios.get("http://localhost:3000/rider/get-fare",{
          params:{ pickup , destination },
          headers:{
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
          setFare(response.data)
       } catch (error) {
        console.error(error.message)
       }
    }
    const createride = async()=>{
     try {
         const response = await axios.post("http://localhost:3000/rider/create" , {
        pickup,
        destination,
        vehicleType
       },{
          headers:{
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
       } )
    setvechical(true)
     setchoose(false)

     } catch (error) {
      console.log(error.message)
     }
    }
    
  return (
    <>
       <div className="h-auto w-screen bg-black relative overflow-hidden ">
              <img className='w-[5rem] relative top-0 left-5 ' src={uber2} alt="error in uploading img" />      
                   <form onSubmit={handlesubmit} className="bg-white flex flex-col items-center relative overflow-hidden justify-top h-[48rem] w-full " >
                       <div className="absolute h-[2rem] w-1 mt-15 bg-red-600 left-10 md:hidden "></div>
                       <label className="relative overflow-hidden mt-5 ">
                           <input value={pickup} onChange={handlechange} onClick={()=> {setPanelOpen(true) 
                            setActiveField("pickup") } }  type="text" placeholder="Pickup location" className="bg-black text-white border-2 border-yellow-400 focus:border-blue-500 focus:ring-2 outline-none px-2 py-1 transition-all placeholder:text-white rounded-[2px] w-[20rem] h-[3rem]"/>
                           <span>
                                <span className="absolute right-2 text-white top-3 text-2xl">
                                <MdArrowCircleRight/>
                               </span>
                           </span>
                       </label>
                         <label className=" relative overflow-hidden">
                          <input value={destination} onChange={handlechange2} onClick={()=>{setPanelOpen(true) 
                            setActiveField("destination")}} type="text" placeholder="Dropoff location" className=" bg-black text-white border-2 mt-3.5 border-yellow-400 focus:border-blue-500 focus:ring-2  outline-none px-2 py-1 transition-all placeholder:text-white rounded-[2px] w-[20rem] h-[3rem]"/>
                            <span  className="absolute right-2 text-white top-6.5 text-2xl">
                                 <HiStopCircle />
                               </span>
                         </label>
                         <button onClick={findtrip}  className="bg-black text-white mt-2 w-[10rem] h-[2rem] rounded-xl " > Find Trip</button>
                           {panelOpen && (
                      <div className="h-[35rem] w-full bg-white  " >
                      {(activeField === "pickup" ? pickupSuggestions : destinationSuggestions || [] ).map( function(elem , i ){
                          return <div key={i} onClick={()=> handleSuggestionClick(elem.description)} className="flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center ">
                             <div>
                                <h2 className="bg-[#eee] h-8 flex items-center justify-center w-8 rounded-full"><IoLocation/> </h2>
                             </div>
                            <div>
                              <h4 className="font-medium">{elem.description}</h4>
                            </div>
                          </div>  
                      })}
                   </div>
                ) }  
                   </form>
    <div ref={up} className="bg-black h-[30rem] w-full bottom-[-3rem]  absolute " >
                        <h1 onClick={()=>setcars(false)} className=" absolute top-4 right-2 text-2xl font-medium text-white " ><FaAngleDown /> </h1>
                        <h1 className=" text-center text-white mt-2 text-[1.3rem] font-medium " >Choose a ride</h1>
                        <h3 className="text-white flex items-center font-light text-center justify-center w-full ml-[-1rem] " > <GoArrowDownRight className="text-green-700 mr-2 " /> Prices are lower than usual </h3>
                            <div onClick={()=>{setchoose(true) 
                               setcars(false)
                               setVehicleType("Car")}} className=" w-full border-2 border-white active:border-red-600 rounded-2xl h-[7rem] mt-2 overflow-hidden flex items-center mb-3.5 " >
                                        <img className=" w-[6rem] " src={car} alt="error in showing img" />
                                        <div>
                                            <h2 className=" flex items-center text-white font-medium text-xl " >Uber Go <HiUser className="text-white ml-1 mr-1 " /> 4 </h2>
                                            <h4 className="text-gray-200 " >Affordable compact rides </h4>
                                        </div>
                                        <div>
                                            <h1 className=" text-white font-medium text-xl ml-6 " > ₹{fare.Car} </h1>
                                        </div>
                            </div>
                                <div onClick={ ()=>{setchoose(true) 
                                 setcars(false)
                                 setVehicleType("Bike")}} className=" w-full border-2 active:border-red-600 border-white rounded-2xl h-[7rem] mt-1 overflow-hidden flex items-center mb-3.5 " >
                                        <img className=" w-[6rem] " src={bike} alt="error in showing img" />
                                        <div>
                                            <h2 className=" flex items-center text-white font-medium text-xl " >Uber Go <HiUser className="text-white ml-1 mr-1 " /> 1 </h2>
                                            <h4 className="text-gray-200 " >Affordable compact rides </h4>
                                        </div>
                                        <div>
                                            <h1 className=" text-white font-medium text-xl ml-6 " > ₹{fare.Bike} </h1>
                                        </div>
                            </div>
                                <div onClick={ ()=>{setchoose(true) 
                                   setcars(false)
                                   setVehicleType("Auto")}} className=" w-full border-2 active:border-red-600 border-white rounded-2xl h-[7rem] mt-1 overflow-hidden flex items-center mb-3.5 " >
                                        <img className=" w-[6rem] " src={auto} alt="error in showing img" />
                                        <div>
                                            <h2 className=" flex items-center text-white font-medium text-xl " >Uber Go <HiUser className="text-white ml-1 mr-1 " /> 3 </h2>
                                            <h4 className="text-gray-200 " >Affordable compact rides </h4>
                                        </div>
                                        <div>
                                            <h1 className=" text-white font-medium text-xl ml-6 " > ₹{fare.Auto} </h1>
                                        </div>
                            </div>
    </div>
           <div  ref={choosevehical} className=" absolute bottom-[-4rem] bg-black h-[35rem] w-full " >
            <h1 onClick={()=>setchoose(false)} className=" cursor-pointer absolute top-4 right-2 text-2xl font-medium text-white"><FaAngleDown /> </h1>
                   <h1 className="text-xl font-medium text-center text-white mt-2">Confirm details</h1>
                    <div className="flex items-center justify-center " >
                        <img className=" w-[10rem] drop-shadow-[0px_0px_2px_white] " src={car} alt="error" />
                    </div>
                   <div className=" border-[1px] mt-2 mb-4 flex flex-row items-center  border-gray-300 w-full h-auto " >
                         <div className="text-white mr-3 ml-2 " >
                          <FaLocationDot />
                         </div>
                         <div className="text-white " >
                            <h1 className="font-medium text-xl ">Pickup</h1>
                            <h2 className="text-gray-300 text-sm ">{pickup}</h2>
                         </div>
                   </div>
                      <div className=" border-[1px] mt-2 mb-4 flex flex-row items-center  border-gray-300 w-full h-auto " >
                         <div className="text-white mr-3 ml-2 " >
                         <FaDotCircle />
                         </div>
                         <div className=" text-white " >
                            <h1 className=" font-medium text-xl " >Destination</h1>
                            <h2 className=" text-gray-300 " >{destination}</h2>
                         </div>
                   </div>
                      <div className=" border-[1px] mt-2 mb-2 flex flex-row items-center  border-gray-300 w-full h-[4rem] " >
                         <div className="text-white mr-3 ml-2 " >
                          <TfiCreditCard />
                         </div>
                         <div className=" text-white " >
                            <h1 className=" font-medium text-xl " >₹{fare[vehicleType]}</h1>
                            <h2 className=" text-gray-300 " >Cash Cash</h2>
                         </div>
                   </div>
                   <button type="submit" onClick={createride}  className=" w-full h-[3rem]  bg-green-700 rounded-2xl font-medium text-white mt-2 " >
                    Confirm
                   </button>
           </div>
           <div ref={vechicalref} className="absolute bottom-[-5rem] bg-black h-[35rem] w-full " >
                     <Vechiclefound
                      destination={destination}
                      fare={fare}
                       pickup={pickup}
                       setvechical={setvechical}
                        VehicleType={vehicleType} 
                        />
           </div>
           <div ref={waitingref} className=" absolute bottom-[-5rem] bg-black h-[30rem] w-full " >
                     <Driverfound 
                      destination={destination}
                      fare={fare}
                      pickup={pickup}
                      confirmridedata={confrimridedata}
                      VehicleType={vehicleType} 
                      setwaiting={setwaiting}
                     />
           </div>
              <div ref={Paymentref} className=" absolute bottom-[-5rem] bg-black h-[30rem] w-full " >
                     <Payment 
                      setpayment={setpayment} 
                      destination={destination}
                      userdata={userdata}
                      confirmridedata={confrimridedata}
                      fare={fare}
                      VehicleType={vehicleType}/>
           </div> 
    </div>
    </>

  )
}

export default Searchtask




