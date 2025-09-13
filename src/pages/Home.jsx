import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SERVER_URL } from "@/constants/constants";
import { setUser } from "@/redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "@/components/common/Navbar";
import { Calendar } from "@/components/ui/calendar";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { LampContainer } from "@/components/ui/lamp";
import LandingPage from "@/mui/LandingPage";

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
    <>
      {/* <Navbar /> */}

      {/* <Calendar mode="single" className="rounded-md border text-white w-fit" /> */}

      {/* <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline">Open Drawer</Button>
        </DrawerTrigger>
        <DrawerContent className="bg-[#212121]">
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Move Goal</DrawerTitle>
              <DrawerDescription>
                Set your daily activity goal.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <Button>Submit</Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer> */}
      {/* Lamp */}
      {/* <LampContainer>
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
        >
          We know your money <br /> is precious to You!
        </motion.h1>
      </LampContainer> */}
      <LandingPage />
    </>
)};

export default Home;
