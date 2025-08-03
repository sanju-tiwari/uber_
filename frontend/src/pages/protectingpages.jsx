import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Userdatacontext } from "../context/Usercontext.jsx";

export const Protectingpages = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const { setUserdata } = useContext(Userdatacontext);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      console.log("You are not logged in, please login to continue");
      navigate("/user-login");
      return;
    }

    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserdata(res.data);
      } catch (err) {
        localStorage.removeItem("token");
        navigate("/user-login");
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, [token, navigate, setUserdata]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return <>{children}</>;
};
