import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import Usercontext from './context/Usercontext.jsx'
import { Bounce, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Captioncontext from './context/Captioncontext.jsx'
import {Socketprovider} from "../src/context/socket.jsx"

createRoot(document.getElementById('root')).render(
    <StrictMode>
    <Captioncontext>
    <Usercontext>
      <Socketprovider>
    <BrowserRouter>
    <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
transition={Bounce}/>
        <App />

  </BrowserRouter>
  </Socketprovider>
  </Usercontext>
  </Captioncontext>
  </StrictMode>
)
