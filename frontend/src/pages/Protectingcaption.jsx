import axios from "axios"
import { useContext, useState } from "react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Captiondatacontext } from "../context/Captioncontext"

export const Protectingcaption = ({children})=>{
    const {captiondata, setCaptiondata} = useContext(Captiondatacontext)
    const [loading , setloading] = useState(true)
    const navigate = useNavigate()

    useEffect(()=>{
        const token = localStorage.getItem("token")
         if(!token){
        navigate("/caption-login")
       return;
      }
      const profilegetting = ()=>{
        axios.get("http://localhost:3000/caption/profile",{
        headers:{
        Authorization:`Bearer ${token}`
    }
  }).then((reponse) => {
    if(reponse.status === 200 ){
        setCaptiondata(reponse.data)
        setloading(false)
    }
  }).catch((err) =>{
    console.log(err.message)
      if (err.response?.status === 401) {
      localStorage.removeItem("token");
      navigate("/caption-login");
    }else{
      console.log("unauthorized" , err.message )
    }
  })
  }
    profilegetting()
    },[ navigate , setCaptiondata])

  if(loading){
    return <>
     <h1>loading...</h1>
    </>
  }
  return <>{children}</>


}