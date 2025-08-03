import uber2 from "../img/uber2.png"
import { FaUserLarge } from "react-icons/fa6";
import { MdArrowCircleRight } from "react-icons/md";
import { HiStopCircle } from "react-icons/hi2";
import car from "../img/car.png"
import bike from "../img/bike.png"
import auto from "../img/auto.png"
import uberbike from "../img/bikeimg.png"
import uberauto from "../img/autoimg.png"
import { FaLongArrowAltRight } from "react-icons/fa";
import ubercar from "../img/ubercar.jpg"
import ubertravel from "../img/ubertravel.jpg"
import ubertravel2 from "../img/ubertravel2.jpg"
import ubertravel3 from "../img/ubertravel3.jpg"
import ride from "../img/ride.webp"
import ubercar1 from "../img/ubercar.webp"
import ubercar2 from "../img/ubercar2.webp"
import ubercar3 from "../img/ubercar3.webp"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import {SocketContext} from "../context/socket"
import {Userdatacontext} from "../context/Usercontext"
import { useContext } from "react";
import LiveTracking from "../../component/livetraking";

function Home() {
  const navigate = useNavigate()
  const [navigated, setNavigated] = useState(false);
   const {socket} = useContext(SocketContext)
   const {userdata} = useContext(Userdatacontext)
   
  const handlesubmit = (e)=>{
    e.preventDefault()
  }
  const handleclick = ()=>{
  if (navigated) return; 
  setNavigated(true);
  navigate("/search-task");
  }
  useEffect(() => {
  setNavigated(false);
}, []);
  return (
    <>

    <div className="bg-black relative flex flex-col  h-auto overflow-hidden w-screen " >
    <img className='w-[5rem] relative top-0 left-5 ' src={uber2} alt="error in uploading img" />  
     <form onSubmit={handlesubmit} className=" bg-white md:hidden flex flex-col items-center relative h-[10rem] overflow-hidden justify-center  w-full ">
           <div className="absolute h-[2rem] w-1 bg-red-600 left-10 "></div>
           <label className="relative overflow-hidden">
               <input onClick={handleclick} type="text" placeholder="Pickup location" className="  bg-black text-white placeholder:text-white border-[1px] rounded-[2px] border-black w-[20rem] h-[3rem] " />
               <span>
                    <span className="absolute right-2 text-white top-3 text-2xl " >
                    <MdArrowCircleRight />
                   </span>
               </span>
           </label>
             <label className=" relative overflow-hidden " >
              <input onClick={handleclick} type="text" placeholder="Dropoff location" className="  bg-black text-white mt-[1rem] border-[1px] rounded-[2px] border-black placeholder:text-white  w-[20rem] h-[3rem] " />
                <span  className="absolute right-2 text-white top-6.5 text-2xl " >
                     <HiStopCircle />
                   </span>
             </label>
       </form>    
       <div className=" hidden  xl:flex items-center justify-between  " >
            <form onSubmit={handlesubmit} className=" bg-white flex flex-col items-center relative xl:ml-[5rem] xl:mt-[2rem] overflow-hidden justify-center sm:h-[10rem] xl:h-[15rem] sm:w-full xl:w-[25rem] ">
           <div className="absolute h-[2rem] w-1 bg-red-600 left-10 "></div>
           <label className="relative overflow-hidden">
               <input onClick={handleclick} type="text" placeholder="Pickup location" className="  bg-black text-white placeholder:text-white border-[1px] rounded-[2px] border-black w-[20rem] h-[3rem] " />
               <span>
                    <span className="absolute right-2 text-white top-3 text-2xl " >
                    <MdArrowCircleRight />
                   </span>
               </span>
           </label>
             <label className=" relative overflow-hidden " >
              <input onClick={handleclick} type="text" placeholder="Dropoff location" className="  bg-black text-white mt-[1rem] border-[1px] rounded-[2px] border-black placeholder:text-white  w-[20rem] h-[3rem] " />
                <span  className="absolute right-2 text-white top-6.5 text-2xl " >
                     <HiStopCircle />
                   </span>
             </label>
       </form>
       <div className=" hidden xl:flex w-[60rem] h-[25rem] " >
         <div className=" w-[55rem] h-[25rem]  " >
            <LiveTracking />
         </div>
       </div>


       </div>

       <div className=" md:hidden h-[5rem] w-full mt-2 flex items-center justify-around " > 
          <figure className=" drop-shadow-[0px_0px_2px_white] h-[3rem] w-[5rem] rounded-[7px] flex items-center justify-center bg-gray-700  " >
            <img className=" w-[6rem] " src={car} alt="error" />
          </figure>
               <figure className=" drop-shadow-[0px_0px_2px_white] h-[3rem] w-[5rem] rounded-[7px] flex items-center justify-center bg-gray-700  " >
            <img className=" w-[3.5rem] "  src={bike} alt="error" />
          </figure>
               <figure className=" drop-shadow-[0px_0px_2px_white] h-[3rem] w-[5rem] rounded-[7px] flex items-center justify-center bg-gray-700  " >
            <img className=" w-[3.5rem] " src={auto} alt="error" />
          </figure>

       </div>
         <h1 className="  lobster-regular mt-2 text-white text-[1rem] ml-3.5 md:text-4xl md:ml-[2rem] ">
    Ride as you like it
  </h1>
<div className=" h-[11.5rem] md:h-[20rem] ml-3 relative overflow-x-auto flex flex-row items-center justify-around  gap-x-4 px-4 w-full scroll-smooth snap-x snap-mandatory">
  <figure className="snap-start shrink-0 h-[10.5rem] md:h-[15rem] bg-green-800 w-[10rem] md:w-[20rem]  rounded-2xl overflow-hidden flex flex-col justify-between p-2">
    <img src={ubercar} className="h-[6rem] md:h-[10rem]  w-full object-cover rounded-md" alt="Car" />
    <figcaption>
      <h1 className="flex items-center gap-2 text-white text-[0.9rem] md:text-xl">
        Book Car <FaLongArrowAltRight />
      </h1>
      <h3 className="text-white text-[0.7rem]">Travel with luggage and friend</h3>
    </figcaption>
  </figure>


  <figure className="snap-start shrink-0 h-[10.5rem] md:h-[15rem] bg-green-800 w-[10rem] md:w-[20rem]  rounded-2xl overflow-hidden flex flex-col justify-between p-2">
    <img src={uberauto} className="h-[6rem] md:h-[10rem]  w-full object-cover rounded-md" alt="Auto" />
    <figcaption>
      <h1 className="flex items-center gap-2 text-white text-[0.9rem] md:text-xl">
        Book Auto <FaLongArrowAltRight />
      </h1>
      <h3 className="text-white text-[0.7rem]">Everyday commute made effortless</h3>
    </figcaption>
  </figure>

  <figure className="snap-start shrink-0 h-[10.5rem] md:h-[15rem] bg-green-800 w-[10rem] md:w-[20rem]  rounded-2xl overflow-hidden flex flex-col justify-between p-2">
    <img src={uberbike} className="h-[6rem] md:h-[10rem]  w-full object-cover rounded-md" alt="Bike" />
    <figcaption>
      <h1 className="flex items-center gap-2 text-white text-[0.9rem] md:text-x">
        Book Bike <FaLongArrowAltRight />
      </h1>
      <h3 className="text-white text-[0.7rem]">Zip through traffic</h3>
    </figcaption>
  </figure>
</div>
     <h1 className="  lobster-regular mt-2 text-white text-[1rem] ml-3.5 md:text-4xl md:ml-[2rem] ">
    More ways to use uber
  </h1>
  <div className=" h-[11.5rem] md:h-[25rem] ml-3 relative overflow-x-auto flex flex-row items-center justify-around  gap-x-4 px-4 w-full scroll-smooth snap-x snap-mandatory">
  <figure className="snap-start shrink-0 h-[10.5rem] md:h-[15rem] bg-red-800 w-[10rem] md:w-[20rem]  rounded-2xl overflow-hidden flex flex-col justify-between p-2">
    <img src={ubertravel} className="h-[6rem] md:h-[10rem]  w-full object-cover rounded-md" alt="Car" />
    <figcaption>
      <h1 className="flex items-center gap-2 text-white text-[0.9rem] md:text-xl ">
        Premier trips <FaLongArrowAltRight />
      </h1>
      <h3 className="text-white text-[0.7rem]  ">Top-rated drivers newers cars</h3>
    </figcaption>
  </figure>

  <figure className="snap-start shrink-0 h-[10.5rem] md:h-[15rem] bg-red-800 w-[10rem] md:w-[20rem]  rounded-2xl overflow-hidden flex flex-col justify-between p-2">
    <img src={ubertravel2} className="h-[6rem] md:h-[10rem]  w-full object-cover rounded-md" alt="Auto" />
    <figcaption>
      <h1 className="flex items-center gap-2 text-white text-[0.9rem] md:text-xl ">
        Insure your rides <FaLongArrowAltRight />
      </h1>
      <h3 className="text-white text-[0.7rem]">₹10L coverage,OPO & more,TCA  </h3>
    </figcaption>
  </figure>

  <figure className="snap-start shrink-0 h-[10.5rem] md:h-[15rem] bg-red-800 w-[10rem] md:w-[20rem]  rounded-2xl overflow-hidden flex flex-col justify-between p-2">
    <img src={ubertravel3} className="h-[6rem] md:h-[10rem] w-full object-cover rounded-md" alt="Bike" />
    <figcaption>
      <h1 className="flex items-center mt-[-3.5rem] gap-2 text-white text-[0.9rem] md:text-xl ">
        Safety Tools <FaLongArrowAltRight />
      </h1>
      <h3 className="text-white text-[0.7rem]">On-trip help with safety issues</h3>
    </figcaption>
  </figure>
</div>
    </div>
    </>


  )
}

export default Home
