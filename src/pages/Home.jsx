import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SERVER_URL } from "@/constants/constants";
import { setUser } from "@/redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "@/components/common/Navbar";

const Home = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleSession = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/auth/login`, {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
        });

        if (!response.ok) {
          return;
        }

        const data = await response.json();
        dispatch(setUser(data.user));

        if (data.user) {
          switch (data.user.role) {
            case "admin":
              navigate("/dashboard", { replace: true });
              break;
            case "superUser":
              navigate("/superuser", { replace: true });
              break;
            case "user":
              navigate("/user", { replace: true });
              break;
            default:
              break;
          }
        }
      } catch (error) {
        console.error("Error logging in:", error);
      }
    };

    if (!user) {
      handleSession();
    }
  }, [user, navigate, dispatch]);

  return (
    <div className="h-screen w-full bg-black">
      <Navbar />
    </div>
  );
};

export default Home;
