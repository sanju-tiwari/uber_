import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { Captiondatacontext } from '../context/Captioncontext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Captionregisters = () => { 
  const navigate = useNavigate()
  const [errors, setErrors] = useState({});
  const [location, setLocation] = useState(null);
  const {captiondata, setCaptiondata} = useContext(Captiondatacontext);
  const [fullname, setFullname] = useState({
    firstname: '',
    lastname: ''
  });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [vehicle , setVehicle] = useState({
    color:"",
    plate:"",
    vehicleType:"",
    capacity:""
  })
  useEffect(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setLocation({
        type: 'Point',
        coordinates: [longitude, latitude] 
      });
    }, (error) => {
      console.error("Error getting location", error);
      toast.error("Could not get location. Please enable location services.");
    });
  } else {
    toast.error("Geolocation is not supported by this browser.");
  }
}, []);
 
  const handlesubmit = async (e) => {
    e.preventDefault()
     try {
    if (!fullname.firstname || !fullname.lastname || !email || !password || !vehicle.color || !vehicle.plate || !vehicle.vehicleType || !vehicle.capacity) {
      toast.error("Please fill all the fields");
      return;
    }
    const datacaption = {
      fullName: {
        firstname: fullname.firstname,
        lastname: fullname.lastname
      },
      email,
      password,
       vehicle: {
        color: vehicle.color,
        plate: vehicle.plate,
        vehicleType: vehicle.vehicleType,
        capacity: Number(vehicle.capacity) 
      },
      location:location
    }
    const res = await axios.post("http://localhost:3000/caption/register" , datacaption)
    if (res.status === 200 || res.status === 201){
      setCaptiondata(res.data.caption)
   
      localStorage.setItem("token", res.data.token);
      toast.success("Registration successful");
       navigate("/caption-home")
    } else {
        
      toast.error("Registration failed, please try again");
    }
    setFullname({ firstname: '', lastname: '' });
    setEmail(''); 
    setPassword('');
    setVehicle({
      color: '',
      plate: '',
      vehicleType: '',
      capacity: ''
    });
      
     } catch (error) {
      console.error("Validation error:", error.response?.data?.errors || error.message);
      setErrors({});

      if ( error.response && error.response?.data?.errors && Array.isArray(error.response.data.errors)) {
        const fieldErrors = {};
        error.response.data.errors.forEach((err) => {
          if(err.path ==="fullName.firstname"){
            fieldErrors.firstname = err.msg
          }else if(err.path === 'fullName.lastname'){
            fieldErrors.lastname =err.msg
          }else if(err.path === "email"){
            fieldErrors.email = err.msg
          }else if(err.path === "password"){
            fieldErrors.password = err.msg
          }else if(err.path ==="vehicle.color"){
            fieldErrors.color = err.msg
          }else if(err.path === "vehicle.plate"){
            fieldErrors.plate = err.msg
          }else if(err.path === "vehicle.vehicleType"){
            fieldErrors.vehicleType = err.msg
          }else if(err.path === "vehicle.capacity"){
            fieldErrors.capacity = err.msg
          }else{
            fieldErrors[err.path] = err.msg
          }
        });
        setErrors(fieldErrors);
      } else if(error.response && error.response.data && error.response.data.errors){
              toast.error(error.response.data.message);
      } else {
        toast.error("Registration failed, please try again");
      }
    }
   
  }
  return (
    <StyledWrapper>
           <form onSubmit={handlesubmit} className="form">
        <p className="title">Register Caption</p>
        <p className="message">Signup now and get full access to our app.</p>

        <div className="flex">
          <label>
            <input
              autoComplete='off'
              value={fullname.firstname}
              onChange={(e) => {
                setFullname({ ...fullname, firstname: e.target.value });
                setErrors(prev => ({ ...prev, firstname: "" }));
              }}
              className="input"
              type="text"
              required
            />
            <span>Firstname</span>
            {errors.firstname && <p className="text-red-500 text-sm">{errors.firstname}</p>}
          </label>

          <label>
            <input
              autoComplete='off'
              value={fullname.lastname}
              onChange={(e) => {
                setFullname({ ...fullname, lastname: e.target.value });
                setErrors(prev => ({ ...prev, lastname: "" }));
              }}
              className="input"
              type="text"
              required
            />
            <span>Lastname</span>
            {errors.lastname && <p className="text-red-500 text-sm">{errors.lastname}</p>}
          </label>
        </div>

        <label>
          <input
            autoComplete='off'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors(prev => ({ ...prev, email: "" }));
            }}
            className="input"
            type="email"
            required
          />
          <span>Email</span>
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </label>

        <label>
          <input
            autoComplete='off'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors(prev => ({ ...prev, password: "" }));
            }}
            className="input"
            type="password"
            required
          />
          <span>Password</span>
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </label>

        <div className='flex flex-row'>
          <label>
            <select
              value={vehicle.vehicleType}
              onChange={(e) => {
                setVehicle({ ...vehicle, vehicleType: e.target.value });
                setErrors(prev => ({ ...prev, vehicleType: "" }));
              }}
              className="input w-full border rounded-lg p-2 text-center"
              required
            >
              <option value="">Select</option>
              <option value="Car">Car</option>
              <option value="Bike">Bike</option>
              <option value="Auto">Auto</option>
            </select>
            {errors.vehicleType && <p className="text-red-500 text-sm">{errors.vehicleType}</p>}
          </label>

          <label>
            <input
              autoComplete='off'
              value={vehicle.color}
              onChange={(e) => {
                setVehicle({ ...vehicle, color: e.target.value });
                setErrors(prev => ({ ...prev, color: "" }));
              }}
              className="input"
              type="text"
              required
            />
            <span>Vehicle Color</span>
            {errors.color && <p className="text-red-500 text-sm">{errors.color}</p>}
          </label>
        </div>

        <div className='flex flex-row'>
          <label>
            <input
              autoComplete='off'
              value={vehicle.plate}
              onChange={(e) => {
                setVehicle({ ...vehicle, plate: e.target.value });
                setErrors(prev => ({ ...prev, plate: "" }));
              }}
              className="input"
              type="text"
              required
            />
            <span>Plate Number</span>
            {errors.plate && <p className="text-red-500 text-sm">{errors.plate}</p>}
          </label>

          <label>
            <input
              autoComplete='off'
              value={vehicle.capacity}
              onChange={(e) => {
                setVehicle({ ...vehicle, capacity: e.target.value });
                setErrors(prev => ({ ...prev, capacity: "" }));
              }}
              className="input"
              type="number"
              required
            />
            <span>Vehicle Capacity</span>
            {errors.capacity && <p className="text-red-500 text-sm">{errors.capacity}</p>}
          </label>
        </div>

        <button type='submit' className="submit">Submit</button>
        <p className="signin">Already have an account? <a href="/caption-login">Signin</a></p>
      </form>
    </StyledWrapper>
);
}
const StyledWrapper = styled.div`
  .form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 350px;
    padding: 20px;
    border-radius: 20px;
    position: relative;
    background-color: #1a1a1a;
    color: #fff;
    border: 1px solid #333;
  }

  .title {
    font-size: 28px;
    font-weight: 600;
    letter-spacing: -1px;
    position: relative;
    display: flex;
    align-items: center;
    padding-left: 30px;
    color: #4fbb4f;
  }

  .title::before {
    width: 18px;
    height: 18px;
  }

  .title::after {
    width: 18px;
    height: 18px;
    animation: pulse 1s linear infinite;
  }

  .title::before,
  .title::after {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    border-radius: 50%;
    left: 0px;
    background-color: #4aaf4a;
  }

  .message, 
  .signin {
    font-size: 14.5px;
    color: rgba(255, 255, 255, 0.7);
  }

  .signin {
    text-align: center;
  }

  .signin a:hover {
    text-decoration: underline royalblue;
  }

  .signin a {
    color: #00bfff;
  }

  .flex {
    display: flex;
    width: 100%;
    gap: 6px;
  }

  .form label {
    position: relative;
  }

  .form label .input {
    background-color: #333;
    color: #fff;
    width: 100%;
    padding: 20px 05px 05px 10px;
    outline: 0;
    border: 1px solid rgba(105, 105, 105, 0.397);
    border-radius: 10px;
  }

  .form label .input + span {
    color: rgba(255, 255, 255, 0.5);
    position: absolute;
    left: 10px;
    top: 0px;
    font-size: 0.9em;
    cursor: text;
    transition: 0.3s ease;
  }

  .form label .input:placeholder-shown + span {
    top: 12.5px;
    font-size: 0.9em;
  }

  .form label .input:focus + span,
  .form label .input:valid + span {
    color: #00bfff;
    top: 0px;
    font-size: 0.7em;
    font-weight: 600;
  }

  .input {
    font-size: medium;
  }

  .submit {
    border: none;
    outline: none;
    padding: 10px;
    border-radius: 10px;
    color: white;
    font-size: 16px;
    transform: .3s ease;
    background-color:  green;
    cursor: pointer;
    font-weight: 600;
  }

  .submit:hover {
    background-color: #0b4b0b;
  }

  @keyframes pulse {
    from {
      transform: scale(0.9);
      opacity: 1;
    }

    to {
      transform: scale(1.8);
      opacity: 0;
    }
}`;

export default Captionregisters;

