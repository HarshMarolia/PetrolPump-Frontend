import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SERVER_URL } from "@/constants/constants";
import { setUser } from "@/redux/userSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [togglePage, setTogglePage] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
  }, [user, navigate, from]);

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (!username) {
      toast.warning("Email required", {
        description: "Please enter your email address",
        action: {
          label: "Okay",
          onClick: () => console.log("ok"),
        },
      });
      return;
    }
    
    try {
      const response = await fetch(`${SERVER_URL}/auth/forgot-password`, {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: username }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        toast.error("Failed to send reset email", {
          description: errorData.message || "Please try again later",
          action: {
            label: "Okay",
            onClick: () => console.log("ok"),
          },
        });
        return;
      }

      const data = await response.json();
      toast.success("Email has been sent!", {
        description: data.message || "Check your inbox for password reset instructions",
        action: {
          label: "Okay",
          onClick: () => console.log("ok"),
        },
      });
      
      // Reset form and go back to login
      setUsername("");
      setTogglePage(false);
      
    } catch (error) {
      console.error("Error forgetting password:", error);
      toast.error("Network error", {
        description: "Unable to connect to server. Please check your internet connection.",
        action: {
          label: "Okay",
          onClick: () => console.log("ok"),
        },
      });
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      toast.warning("Missing credentials", {
        description: "Please enter your email address and password",
        action: {
          label: "Okay",
          onClick: () => console.log("ok"),
        },
      });
      return;
    }

    try {
      const response = await fetch(`${SERVER_URL}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        // backend commonly expects `email` field; send email instead of username
        body: JSON.stringify({ email: username, password }),
      });

      // Read raw response text (works for JSON or plain text). Then try to parse JSON.
      const rawText = await response.text().catch(() => null);
      let parsed = null;
      if (rawText) {
        try {
          parsed = JSON.parse(rawText);
        } catch (e) {
          parsed = null; // not JSON
        }
      }

      // Log status and response for debugging (don't log the password)
      console.log("[auth/login] status:", response.status, "responseText:", rawText, "parsed:", parsed, {
        email: username,
        password: password ? `*${password.length}` : "",
      });

      if (!response.ok) {
        const errorMsg = (parsed && (parsed.message || parsed.error)) || rawText || "Something went wrong";

        if (response.status === 401) {
          toast.error("Login failed", {
            description: errorMsg || "Invalid email or password",
            action: {
              label: "Okay",
              onClick: () => console.log("ok"),
            },
          });
        } else if (response.status === 400) {
          toast.error("Bad request", {
            description: errorMsg || "Request was malformed. Check the request payload.",
            action: {
              label: "Okay",
              onClick: () => console.log("ok"),
            },
          });
        } else {
          toast.error("Login failed", {
            description: errorMsg || "Something went wrong. Please try again.",
            action: {
              label: "Okay",
              onClick: () => console.log("ok"),
            },
          });
        }
        return;
      }

      const data = parsed || null;
      
      if (!data.user) {
        toast.error("Login failed", {
          description: "Invalid response from server",
          action: {
            label: "Okay",
            onClick: () => console.log("ok"),
          },
        });
        return;
      }
      
      toast.success("Logged in successfully!", {
        description: `Welcome back${data.user.name ? ', ' + data.user.name : ''}!`,
        action: {
          label: "Okay",
          onClick: () => console.log("ok"),
        },
      });
      
      dispatch(setUser(data.user));
      
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("Network error", {
        description: "Unable to connect to server. Please check your internet connection.",
        action: {
          label: "Okay",
          onClick: () => console.log("ok"),
        },
      });
    }
  };

  const handleTogglePage = (e) => {
    e.preventDefault();
    setTogglePage(!togglePage);
  };

  return (
    <div className="bg-[#18181b] flex flex-wrap w-full h-screen">
      <div className="flex flex-col w-full md:w-1/2">
        <div className="flex justify-center pt-12 md:justify-center md:mt-64 md:pl-12 md:-mb-24">
          <h1 className="p-4 text-xl font-bold text-white md:text-3xl">LOGIN</h1>
        </div>
      </div>
      {!togglePage ? (
        <div className="w-full md:w-1/2 shadow-2xl bg-black sm:h-screen h-[80vh] flex items-center justify-center">
          <div className="flex flex-col justify-center px-8 sm:pt-8 my-auto md:justify-start md:pt-0 md:px-24 lg:px-32">
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
                      <path
                        d="M20.4,3.6H3.6C2.716,3.6,2,4.316,2,5.2v13.6c0,0.884,0.716,1.6,1.6,1.6h16.8c0.884,0,1.6-0.716,1.6-1.6V5.2
    C22,4.316,21.284,3.6,20.4,3.6z M20,7.017l-7.4,4.737c-0.347,0.222-0.778,0.222-1.125,0L4,7.017V5.6l8,5.127L20,5.6V7.017z"
                      />
                    </svg>
                  </span>
                  <input
                    type="text"
                    id="design-login-email"
                    className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:border-transparent"
                    placeholder="Email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
                    id="design-login-password"
                    className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:border-transparent"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="flex justify-end">
                  <span
                    className="text-gray-500 hover:text-white text-sm pt-3 w-fit cursor-pointer"
                    onClick={handleTogglePage}
                  >
                    Forgot Password?
                  </span>
                </div>
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 text-base shadow-[#033363] font-semibold text-center text-white transition duration-200 ease-in bg-black shadow-md hover:text-black hover:bg-white focus:outline-none focus:ring-2"
              >
                <span className="w-full">Submit</span>
              </button>
              <Link to="/">
                <button
                  type="button"
                  className="w-full px-4 py-2 mt-2 text-base font-semibold shadow-[#033363] text-center text-white transition duration-200 ease-in bg-black shadow-md hover:text-black hover:bg-white focus:outline-none focus:ring-2"
                >
                  <span className="w-full">Back to Home !</span>
                </button>
              </Link>
            </form>
          </div>
        </div>
      ) : (
        <div className="w-full md:w-1/2 shadow-2xl bg-black sm:h-screen h-[80vh] flex items-center justify-center">
          <div className="flex flex-col justify-center px-8 sm:pt-8 my-auto md:justify-start md:pt-0 md:px-24 lg:px-32">
            <p className="text-3xl text-center text-white">Forgot Password?</p>
            <form
              className="flex flex-col pt-3 md:pt-8"
              onSubmit={handleForgotPassword}
            >
              <div>
                <h1 className="text-sm text-white">
                  Enter your registered email below.
                </h1>
              </div>
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
                      <path
                        d="M20.4,3.6H3.6C2.716,3.6,2,4.316,2,5.2v13.6c0,0.884,0.716,1.6,1.6,1.6h16.8c0.884,0,1.6-0.716,1.6-1.6V5.2
    C22,4.316,21.284,3.6,20.4,3.6z M20,7.017l-7.4,4.737c-0.347,0.222-0.778,0.222-1.125,0L4,7.017V5.6l8,5.127L20,5.6V7.017z"
                      />
                    </svg>
                  </span>
                  <input
                    type="text"
                    id="design-login-email"
                    className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:border-transparent"
                    placeholder="Email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="text-gray-500 hover:text-white text-sm pt-3 w-fit"
                    onClick={handleTogglePage}
                  >
                    Back to Login?
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="w-full px-4 my-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-black shadow-md hover:text-black hover:bg-white focus:outline-none focus:ring-2"
              >
                <span className="w-full">Submit</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;