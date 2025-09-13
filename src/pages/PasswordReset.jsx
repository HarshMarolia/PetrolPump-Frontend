import React, { useState } from "react";
import { SERVER_URL } from "@/constants/constants";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const PasswordReset = () => {
  const navigate = useNavigate();
  const { userId, token } = useParams();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast("Please enter your new Password", {
        action: {
          label: "Okay",
          onClick: () => console.log("ok"),
        },
      });
      return;
    }
    if (password !== confirmPassword) {
      toast("Your Password doesn't match!", {
        action: {
          label: "Okay",
          onClick: () => console.log("ok"),
        },
      });
      return;
    }
    try {
      const response = await fetch(`${SERVER_URL}/auth/reset-password`, {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({ id: userId, token: token, password }),
      });

      if (!response.ok) {
        throw new Error("Reset Password failed");
      }

      const data = await response.json();
      toast("Your Password has been reset!", {
        description: data.message,
        action: {
          label: "Okay",
          onClick: () => console.log("ok"),
        },
      });
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Error resetting password:", error);
    }
  };

  return (
    <div className="bg-[#18181b] flex flex-wrap w-full h-screen">
      <div className="flex flex-col w-full md:w-1/2">
        <div className="flex justify-center pt-12 md:justify-start md:pl-12 md:-mb-24">
          <h1 className="p-4 text-xl font-bold text-white">Reset Password</h1>
        </div>
      </div>
      <div className="w-full md:w-1/2 shadow-2xl bg-black sm:h-screen h-[80vh] flex items-center justify-center">
        <div className="flex flex-col justify-center px-8 sm:pt-8 my-auto md:justify-start md:pt-0 md:px-24 lg:px-32">
          <p className="text-3xl text-center text-white">Welcome.</p>
          <form
            className="flex flex-col pt-3 md:pt-8"
            onSubmit={handleResetPassword}
          >
            <div className="flex flex-col pt-4">
              <div className="flex relative">
                <span className="inline-flex items-center px-3 border-t bg-white border-l border-b border-gray-300 text-gray-500 shadow-sm text-sm">
                  <svg
                    width="15"
                    height="15"
                    fill="currentColor"
                    viewBox="0 0 1792 1792"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z"></path>
                  </svg>
                </span>
                <input
                  type="password"
                  id="design-login-password"
                  className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2   focus:border-transparent"
                  placeholder="New Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col pt-4 mb-10">
              <div className="flex relative">
                <span className="inline-flex items-center px-3 border-t bg-white border-l border-b border-gray-300 text-gray-500 shadow-sm text-sm">
                  <svg
                    width="15"
                    height="15"
                    fill="currentColor"
                    viewBox="0 0 1792 1792"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z"></path>
                  </svg>
                </span>
                <input
                  type="password"
                  id="design-login-confirm-password"
                  className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2   focus:border-transparent"
                  placeholder="Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-black shadow-md hover:text-black hover:bg-white focus:outline-none focus:ring-2"
            >
              <span className="w-full">Submit</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;
