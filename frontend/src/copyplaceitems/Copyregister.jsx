import axios from 'axios';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { Userdatacontext } from '../context/Usercontext';

const Copyregister = () => {
  const [useremail, setUseremail] = useState("");
  const navigate = useNavigate();
  const { userdata, setUserdata } = useContext(Userdatacontext);
  const [userpassword, setUserpassword] = useState("");
  const [userFullname, setUserFullname] = useState({
    firstName: "",
    lastName: ""
  });
  
  const [errors, setErrors] = useState({});

  const handlesubmit = async(e) => {
    e.preventDefault();
    setErrors({});

    if (!useremail || !userpassword || !userFullname.firstName || !userFullname.lastName) {
      toast.error("Please fill all the fields");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/user/register", {
        email: useremail,
        password: userpassword,
        fullName: {
          firstname: userFullname.firstName,
          lastname: userFullname.lastName
        }
      });
      
      if (res.status === 201 || res.status === 200) {
        setUserdata(res.data.user);
        toast.success("Registration successful");
        localStorage.setItem("token", res.data.token);
        navigate("/home");
        setUserFullname({ firstName: "", lastName: "" });
        setUseremail("");
        setUserpassword("");
      }
    } catch (error) {
      if (error.response && error.response.data && Array.isArray(error.response.data.errors)) {
        const backendErrors = {};
        error.response.data.errors.forEach(err => {
          if (err.path === 'fullName.firstname'){
            backendErrors.firstName = err.msg;
          } else if (err.path === 'fullName.lastname'){
            backendErrors.lastName = err.msg;
          } else {
            backendErrors[err.path] = err.msg;
          }
        });
        setErrors(backendErrors);
        toast.error("Please correct the errors in the form.");
      } else if (error.response && error.response.data && error.response.data.errors){
        toast.error(error.response.data.message);
      } else {
        console.error("Registration failed", error);
        toast.error("Registration failed, please try again");
      }
    }
  }
  
  return (
    <StyledWrapper>
      <form onSubmit={handlesubmit} className="form">
        <p className="title">Register </p>
        <p className="message">Signup now and get full access to our app. </p>
        <div className="flex">
          <label>
            <input autoComplete='off' value={userFullname.firstName} onChange={(e) => setUserFullname({ ...userFullname, firstName: e.target.value })} className="input" type="text" placeholder="" required />
            <span>Firstname</span>
          </label>
          <label>
            <input autoComplete='off' value={userFullname.lastName} onChange={(e) => setUserFullname({ ...userFullname, lastName: e.target.value })} className="input" type="text" placeholder="" required />
            <span>Lastname</span>
          </label>
        </div>
        <div className="flex-errors">
            {errors.firstName && <ErrorMessage>{errors.firstName}</ErrorMessage>}
            {errors.lastName && <ErrorMessage>{errors.lastName}</ErrorMessage>}
        </div>

        <label>
          <input autoComplete='off' value={useremail} onChange={(e) => setUseremail(e.target.value)} className="input" type="email" placeholder="" required />
          <span>Email</span>
        </label>
        {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}

        <label>
          <input autoComplete='off' value={userpassword} onChange={(e) => setUserpassword(e.target.value)} className="input" type="password" placeholder="" required />
          <span>Password</span>
        </label>
        {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}

        <button className="submit">Submit</button>
        <p className="signin">Already have an acount? <a href="/user-login">Signin</a> </p>
      </form>
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
  
  .flex-errors {
    display: flex;
    width: 100%;
    gap: 6px;
  }

  .title {
    font-size: 28px;
    font-weight: 600;
    letter-spacing: -1px;
    position: relative;
    display: flex;
    align-items: center;
    padding-left: 30px;
    color: #00bfff;
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
    background-color: #00bfff;
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
    width: 100%; /* Ensure label takes full width inside flex */
  }
  .form label .input {
    background-color: #333;
    color: #fff;
    width: 100%;
    padding: 20px 05px 05px 10px;
    outline: 0;
    border: 1px solid rgba(105, 105, 105, 0.397);
    border-radius: 10px;
    box-sizing: border-box; /* Important for width calculation */
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
    color: black;
    font-size: 16px;
    transform: .3s ease;
    background-color:  #00bfff;
    cursor: pointer;
    font-weight: 600;
  }
  .submit:hover {
    background-color: #00bfff96;
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
  }
`;

export default Copyregister;
