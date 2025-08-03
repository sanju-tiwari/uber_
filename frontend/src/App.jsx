import { Route, Routes } from 'react-router-dom'
import Userlogin from './pages/Userlogin'
import Captionlogin from './pages/Captionlogin'
import Captionregister from './pages/Captionregister'
import Userregister from './pages/Userregister'
import Start from './pages/Start'
import Home from "./pages/Home"
import { Protectingpages } from './pages/protectingpages'
import { Logout } from './pages/Logout'
import Captionhome from './pages/Captionhome'
import { Protectingcaption } from './pages/Protectingcaption'
import Captionlogout from './pages/Captionlogout'
import Searchtask from './copyplaceitems/Searchtask'
import Captionriding from './pages/Captionriding'

function App() {
  return (
    <div>
      <Routes>
        <Route  path="/" element={<Start/>} />
        <Route  path="/user-login" element={<Userlogin/>} />
        <Route  path="/caption-login" element={<Captionlogin/>} />
        <Route  path="/caption-register" element={<Captionregister/>} />
        <Route  path="/caption-riding" element={<Captionriding/>} />
        <Route  path="/user-register" element={<Userregister/>} />
        <Route  path='/user-home' element={  
          <Protectingpages>
            <Home /> 
          </ Protectingpages >
        } />
        <Route path='/search-task' element={<Searchtask /> } />
        <Route path="/user-logout" element={<Protectingpages> 
          <Logout></Logout>
        </Protectingpages> } />
        <Route path="/caption-home" element={
          <Protectingcaption>
            <Captionhome></Captionhome>
            </Protectingcaption>
         }/>
        <Route path='/caption-logout' element={
            <Protectingcaption>
              <Captionlogout/>
               </Protectingcaption>
          } />

      </Routes>
    </div>
  )
}

export default App
