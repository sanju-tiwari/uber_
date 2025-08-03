import { useEffect } from "react"
import { createContext, useState } from "react"
import axios from "axios"
export const Userdatacontext = createContext()
function Usercontext({children}) {
  const [userdata, setUserdata] = useState(null)
  const [loading , setloading] = useState(true)

  useEffect(()=>{
     const fethingdata = async()=>{
      try {
         const token = localStorage.getItem("token")
         if(!token){
          console.log("token was not present")
          setloading(false)
          return
         }
         if(token){
          const res = await axios.get("http://localhost:3000/user/profile" , {
            headers:{Authorization : `Bearer ${token}`}
          })
            if(res?.data && res?.data?.user){
              setUserdata(res?.data?.user)
              setloading(false)
            }else{
              setloading(false)
            }

         }
      } catch (error) {
        console.log(error.message)
      } finally{
        setloading(false)
      }       
     }
   
     fethingdata()
  },[])

    if (loading) {
    return <div>Loading...</div>; 
  }


  return (
    <div>
        <Userdatacontext.Provider value={{userdata, setUserdata}}>
            {children}
        </Userdatacontext.Provider>
    </div>
  )
}

export default Usercontext