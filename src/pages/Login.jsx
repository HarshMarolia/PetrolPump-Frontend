import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SERVER_URL } from "@/constants/constants";
import { setUser } from "@/redux/userSlice";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      switch (user.role) {
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
          navigate(from, { replace: true });
          break;
      }
    }
  }, [user]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${SERVER_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      console.log(data);
      dispatch(setUser(data.user));
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="bg-[#18181b] flex flex-wrap w-full h-screen">
      <div className="flex flex-col w-full md:w-1/2">
        <div className="flex justify-center pt-12 md:justify-start md:pl-12 md:-mb-24">
          <h1 className="p-4 text-xl font-bold text-white">Design.</h1>
        </div>
      </div>
      <div className="w-full md:w-1/2 shadow-2xl bg-black h-screen flex items-center justify-center">
        <div className="flex flex-col justify-center px-8 pt-8 my-auto md:justify-start md:pt-0 md:px-24 lg:px-32">
          <p className="text-3xl text-center text-white">Welcome.</p>
          <form className="flex flex-col pt-3 md:pt-8" onSubmit={handleLogin}>
            <div className="flex flex-col pt-4">
              <div className="flex relative">
                <span className="inline-flex items-center px-3 border-t bg-white border-l border-b border-gray-300 text-gray-500 shadow-sm text-sm">
                  <svg
                    width="15"
                    height="15"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.58-.35-.11-.76-.02-1.03.25l-2.2 2.2c-3.38-1.78-6.12-4.53-7.9-7.9l2.2-2.2c.28-.28.37-.68.26-1.03-.38-1.12-.58-2.32-.58-3.57C7.5 2.67 6.83 2 6 2H3.5C2.67 2 2 2.67 2 3.5 2 15.24 8.76 22 20.5 22c.83 0 1.5-.67 1.5-1.5V18c0-.83-.67-1.5-1.5-1.5z"></path>
                  </svg>
                </span>
                <input
                  type="text"
                  id="design-login-email"
                  className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Phone Number"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col pt-4 mb-12">
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
                  className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

export default Login;
