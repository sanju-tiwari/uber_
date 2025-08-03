import uber2 from '../img/uber2.png'
import Copylogin from '../copyplaceitems/copylogin'

function Userlogin() {
  return (
    <div className='bg-black h-screen w-screen flex items-center justify-center'>
        <img className='w-[7rem] absolute left-3 top-0 ' src={uber2} alt="error in uploading img" />
     <Copylogin></Copylogin>      
    </div>
  )
}

export default Userlogin
