import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from "axios"
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Userdatacontext } from '../context/Usercontext';
import { useContext } from 'react';

const Copylogin = () => {
  const [useremail, setUseremail] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { userdata, setUserdata } = useContext(Userdatacontext);
  const [userpassword, setUserpassword] = useState("");

  const handlesubmit = async(e) => {
    e.preventDefault();
    if (!useremail || !userpassword) {
      toast.error("Please fill all the fields");
      return;
    } 
     try {
    const res = await axios.post("http://localhost:3000/user/login" ,{
      email: useremail,
      password: userpassword
    } )
    if(res.status === 200 || res.status === 201){
      setUserdata(res.data.user);
      console.log(res.data.user)
      localStorage.setItem("token", res.data.token);
      toast.success("Login successful");
      navigate("/user-home");
      setUseremail("");
      setUserpassword("");
    }
     }catch (error) {
    if(error.response && error.response.data && Array.isArray(error.response.data.errors)){
      const backendErrors = {}
      error.response.data.errors.forEach(err => {
        if(err.path ==="email"){
          backendErrors.email = err.msg;
        }else if(err.path ==="password"){
          backendErrors.password = err.msg
        }
        else{
          backendErrors[err.path] = err.msg
        }
      })
      setErrors(backendErrors)
      toast.error("Please correct the errors in the form.");
    }else if(error.response && error.response.data && error.response.data.message){
      toast.error(error.response.data.message)
    }else{
      console.error("Login failed", error);
      toast.error("Login failed, please try again.");
    }

    }
  }
  return (
    <StyledWrapper>
      <div className="container">
        <div className="login-box">
          <form onSubmit={handlesubmit} className="form">
            <div className="logo" />
            <span className="header">Welcome Back !</span>
            <input autoComplete='off' value={useremail} onChange={(e) => setUseremail(e.target.value) } type="email" placeholder="Email" className="input" />
             {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
            <input autoComplete='off'  value={userpassword} onChange={(e)=> setUserpassword(e.target.value) } type="password" placeholder="Password" className="input" />
               {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
            <button type="submit" className=" button sign-in">Sign In</button>
            <button className="button google-sign-in">
              <Link to={"/caption-login"} className=" inline-block span two"> Sign in as Caption </Link>
            </button>
            <p className="footer">
              Don't have an account?
              <a href="/user-register" className="link cursor-pointer ml-[0.6rem] ">Sign up, it's free!</a>
              <br />
            </p>
          </form>
        </div>
      </div>
    </StyledWrapper>
  );
}

const ErrorMessage = styled.p`
  color: #ff6b6b;
  font-size: 0.8em;
  margin-top: -5px; 
  margin-bottom: 5px;
  text-align: left;
  padding-left: 5px;
  flex: 1; 
`;

const StyledWrapper = styled.div`
  .container {
    --form-width: 315px;
    --aspect-ratio: 1.33;
    --login-box-color: #272727;
    --input-color: #3a3a3a;
    --button-color: #373737;
    --footer-color: rgba(255, 255, 255, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    background: var(--login-box-color);
    border-radius: 24px;
    width: calc(var(--form-width) + 1px);
    height: calc(var(--form-width) * var(--aspect-ratio) + 1px);
    z-index: 8;
    box-shadow:
      0 4px 8px rgba(0, 0, 0, 0.2),
      0 8px 16px rgba(0, 0, 0, 0.2),
      0 0 8px rgba(255, 255, 255, 0.1),
      0 0 16px rgba(255, 255, 255, 0.08);
  }

  .container::before {
    content: "";
    position: absolute;
    inset: -50px;
    z-index: -2;
    background: conic-gradient(
      from 45deg,
      transparent 75%,
      #fff,
      transparent 100%
    );
    animation: spin 4s ease-in-out infinite;
  }

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }

  .login-box {
    background: var(--login-box-color);
    border-radius: 24px;
    padding: 28px;
    width: var(--form-width);
    height: calc(var(--form-width) * var(--aspect-ratio));
    position: absolute;
    z-index: 10;
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    box-shadow:
      inset 0 40px 60px -8px rgba(255, 255, 255, 0.12),
      inset 4px 0 12px -6px rgba(255, 255, 255, 0.12),
      inset 0 0 12px -4px rgba(255, 255, 255, 0.12);
  }

  .form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10px;
  }

  .logo {
    width: 65px;
    height: 65px;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.2),
      rgba(0, 0, 0, 0.2)
    );
    box-shadow:
      8px 8px 16px rgba(0, 0, 0, 0.2),
      -8px -8px 16px rgba(255, 255, 255, 0.06);
    border-radius: 20px;
    border: 2px solid #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  .logo::before {
    content: "";
    position: absolute;
    bottom: 10px;
    width: 50%;
    height: 20%;
    border-top-left-radius: 40px;
    border-top-right-radius: 40px;
    border-bottom-right-radius: 20px;
    border-bottom-left-radius: 20px;
    border: 2.5px solid #fff;
  }

  .logo::after {
    content: "";
    position: absolute;
    top: 10px;
    width: 30%;
    height: 30%;
    border-radius: 50%;
    border: 2.5px solid #fff;
  }

  .user {
    position: absolute;
    height: 50px;
    color: #fff;
  }

  .header {
    width: 100%;
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    padding: 6px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .input {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 12px;
    background: var(--input-color);
    color: white;
    outline: none;
    font-size: 14px;
  }

  .input:focus {
    border: 1px solid #fff;
  }

  .button {
    width: 100%;
    height: 40px;
    border: none;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    display: grid;
    place-content: center;
    gap: 10px;
    background: var(--button-color);
    color: white;
    transition: 0.3s;
    box-shadow:
      inset 0px 3px 6px -4px rgba(255, 255, 255, 0.6),
      inset 0px -3px 6px -2px rgba(0, 0, 0, 0.8);
  }
  .sign-in {
    margin-top: 5px;
  }

  .google-sign-in {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }

  .button:hover {
    background: rgba(255, 255, 255, 0.25);
    box-shadow:
      inset 0px 3px 6px rgba(255, 255, 255, 0.6),
      inset 0px -3px 6px rgba(0, 0, 0, 0.8),
      0px 0px 8px rgba(255, 255, 255, 0.05);
  }

  .icon {
    height: 16px;
  }

  .footer {
    width: 100%;
    text-align: left;
    color: var(--footer-color);
    font-size: 12px;
  }

  .footer .link {
    position: relative;
    color: #00bfff;
    font-weight: 600;
    text-decoration: none;
    transition: color 0.3s ease;
  }

  .footer .link::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 0;
    border-radius: 6px;
    height: 1px;
    background: currentColor;
    transition: width 0.3s ease;
  }

  .footer .link:hover {
    color: #fff;
  }

  .footer .link:hover::after {
    width: 100%;
}`;
export default Copylogin;
