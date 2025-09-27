import React from "react";
import NavLinks from "./nav-links";
import { PowerIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { SERVER_URL } from "@/constants/constants";
import { useNavigate } from "react-router-dom";
import { setUser } from "@/redux/userSlice";
import { toast } from "sonner";

const Sidenav = () => {
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
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <div
        className="mb-2 flex items-end justify-start rounded-md bg-[#171717] p-4"
        href="/"
      >
        <div className="w-full text-white">
          <div
            className={`flex flex-col items-center leading-none text-white gap-2`}
          >
            <img
              src="/images/Petrol-Pump.png"
              alt=""
              className="rounded-full h-14 w-14"
            />
            <p className="text-2xl font-bold">FuelInfo</p>
          </div>
        </div>
      </div>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-[#171717] md:block"></div>
        <button
          onClick={handleLogout}
          className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-[#171717] p-3 text-sm font-medium text-white hover:bg-sky-100 hover:text-slate-600 md:flex-none md:justify-start md:p-2 md:px-3"
        >
          <PowerIcon className="w-6" />
          <div className="hidden md:block">Sign Out</div>
        </button>
      </div>
    </div>
  );
};

export default Sidenav;
