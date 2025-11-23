import React, { useState } from "react";
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
import { toast } from "sonner";
import { useCreateClient } from "@/api/client";
import { useCreateEmployee } from "@/api/employee";
import { useSelector } from "react-redux";

const DrawerForm = () => {
  const user = useSelector((state) => state.user);
  const initialState = {
    id: "",
    name: "",
    type: "client",
  };
  const [formData, setFormData] = useState(initialState);
  const { mutate: createClient } = useCreateClient();
  const { mutate: createEmployee } = useCreateEmployee();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.type === "client") {
      createClient(
        {
          pan_number: formData.id,
          name: formData.name,
          userId: user._id,
        },
        {
          onSuccess: () => {
            toast("Client details added successfully", {
              action: {
                label: "Okay",
                onClick: () => console.log("ok"),
              },
            });
            setFormData(initialState);
          },
          onError: (error) => {
            toast(error?.message || "Error adding Client details", {
              action: {
                label: "Okay",
                onClick: () => console.log("ok"),
              },
            });
          },
        }
      );
    } else {
      createEmployee(
        {
          aadhar_number: formData.id,
          name: formData.name,
          userId: user._id,
        },
        {
          onSuccess: () => {
            toast("Employee details added successfully", {
              action: {
                label: "Okay",
                onClick: () => console.log("ok"),
              },
            });
            setFormData(initialState);
          },
          onError: (error) => {
            toast(error?.message || "Error adding Employee details", {
              action: {
                label: "Okay",
                onClick: () => console.log("ok"),
              },
            });
          },
        }
      );
    }
  };
  return (
    <Drawer className="w-screen">
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className="bg-[#212121] text-white rounded-md gap-2"
        >
         Employee/Client
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="15px"
            height="15px"
            fill="#ffffff"
          >
            <path
              fillRule="evenodd"
              d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z"
            />
          </svg>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="bg-[#212121]">
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle className="text-gray-200">Enter Details</DrawerTitle>
            <DrawerDescription className="flex flex-col gap-4">
              <>
                <label htmlFor="id" className="text-sm font-medium text-left">
                  Enter Unique ID
                </label>
                <input
                  id="id"
                  name="id"
                  placeholder="Enter ID"
                  className="p-2 rounded border border-gray-600 bg-[#1d1c20] text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.id}
                  onChange={handleChange}
                />
              </>
              <>
                <label htmlFor="name" className="text-sm font-medium text-left">
                  Enter Name
                </label>
                <input
                  id="name"
                  name="name"
                  placeholder="Enter Name"
                  className="p-2 rounded border border-gray-600 bg-[#1d1c20] text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.name}
                  onChange={handleChange}
                />
              </>
              <>
                <label htmlFor="type" className="text-sm font-medium text-left">
                  Select Type
                </label>
                <select
                  name="type"
                  id="type"
                  className="p-2 rounded border border-gray-600 bg-[#1d1c20] text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.type}
                  onChange={handleChange}
                >
                  <option value="client">Client</option>
                  <option value="employee">Employee</option>
                </select>
              </>
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button onClick={handleSubmit} className="bg-blue-700">
                Submit
              </Button>
            </DrawerClose>
            <DrawerClose asChild>
              <Button variant="outline" className="bg-[#212121] text-white">
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerForm;
