import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SERVER_URL } from "@/constants/constants";
import { useNavigate } from "react-router-dom";
import { setUser } from "@/redux/userSlice";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/auth/logout`, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      dispatch(setUser(null));
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  return (
    <div className="flex justify-between items-center py-6 px-14">
      <div className="flex items-center gap-2">
        <img
          src="images/Petrol-Pump.png"
          alt=""
          className="rounded-full invert w-16 h-16"
        />
        <h1 className="text-white">Petrol Pump</h1>
      </div>
      <div>
        {user === null ? (
          <Link to="/login">
            <button className="text-black bg-white px-9 py-2 font-semibold rounded-3xl">
              Login
            </button>
          </Link>
        ) : (
          <button
            className="text-black bg-white px-9 py-2 font-semibold rounded-3xl"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
