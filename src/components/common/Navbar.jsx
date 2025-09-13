import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SERVER_URL } from "@/constants/constants";
import { useNavigate } from "react-router-dom";
import { setUser } from "@/redux/userSlice";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

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
        toast("Error logging out!", {
          action: {
            label: "Okay",
            onClick: () => console.log("ok"),
          },
        });
        throw new Error("Logout failed");
      }
      toast("Logged out successfully!", {
        action: {
          label: "Okay",
          onClick: () => console.log("ok"),
        },
      });
      dispatch(setUser(null));
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  return (
    <div className="flex justify-between items-center py-6 sm:px-14 px-4">
      <div className="flex items-center gap-2">
        <img
          src="images/Petrol-Pump.png"
          alt=""
          className="rounded-full sm:w-14 sm:h-14 w-10 h-10"
        />
        <h1 className="text-white sm:text-2xl">FuleInfo</h1>
      </div>
      <div>
        {user === null ? (
          <Link to="/login">
            <Button variant="outline">Login</Button>
          </Link>
        ) : (
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
