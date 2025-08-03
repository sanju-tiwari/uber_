import uber2 from "../img/uber2.png"
import { HiUser } from "react-icons/hi2";
import { SlSpeedometer } from "react-icons/sl";
import { FaRegClock } from "react-icons/fa";
import { PiNewspaperClipping } from "react-icons/pi";
import Driverfontpage from "../../component/Driverfontpage";
import Takingride from "../../component/Takingride";
import { useGSAP } from "@gsap/react"
import {gsap} from "gsap"
import { useRef, useState   , useEffect , useContext } from "react";
import Rideconfirm from "../../component/Rideconfirm"
import { SocketContext } from "../context/socket";
import { Captiondatacontext } from "../context/Captioncontext";
import axios from "axios";
import LiveTracking from "../../component/livetraking";
import { useLocation } from "react-router-dom";

function Captionhome(){
  const location = useLocation()
  const { ride } = location.state || {};
  const [takingride , settakingride] = useState(false)
  const[ridedata , setridedata] = useState("")
  const [confirmride , setconfirmride] = useState(false)
  const takingrideref = useRef(null)
  const confirmrideref = useRef(null)
  const {socket} = useContext(SocketContext)
  const {captiondata} = useContext(Captiondatacontext)

socket.on("new-ride",(data)=>{
    console.log( "new-ride" , data)
    settakingride(true)
    setridedata(data)
})

const confirm = async()=>{
  try {
    const token = localStorage.getItem("token")
    if(!token){
      return console.log("error no token")
    }
    const response = await axios.post("http://localhost:3000/rider/confirm",{
      rideId:ridedata?._id,
      caption:captiondata?.id
    },{
      headers:{Authorization : `Bearer ${localStorage.getItem('token')}`}
    })
    console.log("confirm ride data----->" ,response)

  } catch (error) {
    console.log(error.message)
  }
}

  useEffect(() => {
        socket.emit('join', {
            userID: captiondata.id,
            userType:'captain'
        })
        console.log(captiondata.id)
        const updateLocation = () => {
            if (navigator.geolocation){
                navigator.geolocation.getCurrentPosition(position =>{
                   console.log( "location in frontend" , { userID: captiondata.id,
                        location:{
                            ltd: position.coords.latitude,
                            lng: position.coords.longitude
                        }})    

                    socket.emit('update-location-caption',{
                        userID: captiondata.id,
                        location:{
                            ltd: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                  
                    })
                })
            } 

        }
   
    updateLocation()
}, [captiondata])

  useEffect(()=>{
   socket.emit("join" , {userType:"caption" , userID:captiondata?.id } )

},[captiondata])

  useGSAP(() => {
  if (!takingride) {
    gsap.to(takingrideref.current, {
      y: 700,
      duration: 1,
    });
  } else {
    gsap.to(takingrideref.current, {
      y: 0,
      duration: 0.5,
    });
  }
},[takingride]);

  useGSAP(() => {
  if (!confirmride) {
    gsap.to(confirmrideref.current, {
      y: 850,
      duration: 1,
    });
  } else {
    gsap.to(confirmrideref.current, {
      y: 0,
      duration: 0.5,
    });
  }
},[confirmride]);
 


  return (
    <div className='bg-black  relative overflow-hidden h-auto w-screen ' >
    <img className='w-[5rem] absolute top-0 left-5 drop-shadow-[0px_0px_5px_black]  ' src={uber2} alt="error in uploading img" />      
    <div className="h-[33rem] overflow-hidden bg-red-400" >
        <LiveTracking/>
    </div>
      <Driverfontpage 
       ride={ride}
      />
        <div ref={takingrideref} className="absolute bottom-0 bg-black h-[35rem] w-full">
              <Takingride confirm={confirm} ridedata={ridedata} setconfirmride={setconfirmride} settakingride={settakingride}/>      
        </div> 
         <div ref={confirmrideref} className="absolute bottom-0 bg-black h-auto w-full">
            <Rideconfirm ridedata={ridedata} setconfirmride={setconfirmride} settakingride={settakingride}/>      
        </div>
        
    </div>
  )
}

export default Captionhome
 


