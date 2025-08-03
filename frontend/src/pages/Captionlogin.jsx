import Captionlogins from "../copyplaceitems/captionlogin"
import uber2 from "../img/uber2.png"

function Captionlogin() {
  return (
    <div className='bg-black h-screen w-screen flex items-center justify-center'>
    <img className='w-[7rem] absolute left-3 top-0 ' src={uber2} alt="error in uploading img" />
      <Captionlogins></Captionlogins>
    </div>
  )
}

export default Captionlogin
