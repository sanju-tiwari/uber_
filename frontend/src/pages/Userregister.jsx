import uber2 from '../img/uber2.png'
import Copyregister from '../copyplaceitems/Copyregister'

function Userregister() {
  return (
    <div className=' bg-black h-screen w-screen flex items-center justify-center '>
        <img className='w-[7rem] absolute left-3 top-0 ' src={uber2} alt="error in uploading img" />
      <Copyregister/>
    </div>
  )
}

export default Userregister
