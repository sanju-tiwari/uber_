import { IoIosBookmark } from "react-icons/io";
import ubervideo from "../video/uber.mp4"
import uber2 from '../img/uber2.png'
import { FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router-dom'


function Start() {
  return (
    <>
    <div className="w-full hidden sm:flex relative overflow-hidden flex-col items-center justify-between h-screen bg-black"  >
       <img className='w-[7rem] absolute left-3 drop-shadow-[0px_0px_2px_white]' src={uber2} alt="error in uploading img" />
        <div className=' flex md:mt-[5rem] xl:mt-0 flex-col xl:flex-row items-center justify-between h-full ' >
            <div className=' flex  xl:hidden items-center justify-center h-full w-[50rem] '>
             <video loop autoPlay muted className=' rounded-2xl w-full ' src={ubervideo}></video>
          </div>
          <div className='flex items-start xl:items-center flex-col justify-start xl:justify-center w-[40rem] h-full md:w-[50rem] '>
           <div className=' flex flex-col items-start trade-winds-regular ' >
               <h1 className=' text-[2rem] md:text-[3.5rem] -tracking font-bold text-white ' >
                Request a ride for
              </h1>
              <h1 className=' text-[2rem] md:text-[3.5rem] mt-[-1rem] -tracking font-bold text-white ' >
                 now or later
              </h1>

           </div>
           <div className=' flex flex-col items-start mt-[1rem] md:mt-[2rem] text-white lobster-regular  ' >
               <p className='flex items-center justify-around md:text-[1.2rem]' >
                <IoIosBookmark className='text-yellow-200 md:mr-[1rem] md:text-[1.5rem]' />
                Up to 50% off your first 5 Uber rides. T&Cs apply.*
              </p>
              <p className='flex md:ml-[3rem] items-center justify-around  md:text-[1.2rem]' >
                *Valid within 15 days of signup.
              </p>
            </div>
            <Link to={"/user-login"} className=" w-[15rem] md:w-[25rem] h-[3rem] md:h-[4rem] bg-red-800 md:text-[1.2rem] rounded-[10px] flex items-center justify-between px-4 transition duration-200 lobster-regular text-white mt-[2rem] xl:ml-[-4rem] hover:bg-green-800 ">Continue <FaArrowRight /></Link>
          </div>
           <div className=' hidden xl:flex items-center justify-center h-full w-[50rem] '>
             <video loop autoPlay muted className=' rounded-2xl  ' src={ubervideo}></video>
          </div>

   
       </div>
      </div>
        <div className="w-full sm:hidden  flex relative overflow-hidden flex-col items-center justify-between h-auto bg-black"  >
      <div className='flex items-center justify-center h-[40rem] '>
        <video className=' rounded-full ' autoPlay loop muted src={ubervideo}></video>
      </div>
        <img className='w-[7rem] absolute left-3 drop-shadow-[0px_0px_2px_white]' src={uber2} alt="error in uploading img" />
      <div className=' bg-gray-200 w-full  py-10 px-5 flex flex-col rounded-2xl items-center justify-center  gap-y-3 ' >
          <h2 className=' text-2xl lexend-uniquifier ' >Get Started with Uber</h2>
          <Link to={"/user-login"}className="w-[15rem] h-[3rem] bg-black hover:bg-gray-800  rounded-[10px] flex items-center justify-between px-4 transition duration-200 lobster-regular text-yellow-400 ">Continue <FaArrowRight /></Link>
      </div>
    </div>
    
    </>

  )
}

export default Start
