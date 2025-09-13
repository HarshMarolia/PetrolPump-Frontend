import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { State, City } from "country-state-city";
import { useCreateUser } from "@/api/user";

const UserDetails = () => {
  const { mutate: createUser } = useCreateUser();

  const initialState = {
    name: "",
    pumpOwner: "",
    phoneNumber: "",
    email: "",
    password: "1245678",
    role: "user",
    city: "Abhaneri",
    state: "Andaman and Nicobar Islands",
    subscription_expiry: new Date().toISOString().split("T")[0],
    blackListed: false,
  };

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedData = {
      ...formData,
      subscription_expiry: new Date(formData.subscription_expiry),
    };
    await createUser(formattedData);
    toast.success("User created successfully");
    setFormData(initialState);
  };

  return (
    <div className="text-white bottom-28">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="bg-[#212121] text-white rounded-md gap-2"
          >
            User
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
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-[#212121] text-gray-200">
          <DialogHeader>
            <DialogTitle>Create New User</DialogTitle>
            <DialogDescription>
              You are onboarding a new user.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <>
              <label htmlFor="name" className="text-sm font-medium text-left">
                Enter Petrol Pump Name
              </label>
              <input
                id="name"
                name="name"
                placeholder="Enter name"
                className="p-2 w-11/12 rounded border border-gray-600 bg-[#1d1c20] text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </>
            <>
              <label htmlFor="pumpOwner" className="text-sm font-medium text-left">
                Enter Pump Owner Name
              </label>
              <input
                id="pumpOwner"
                name="pumpOwner"
                placeholder="Enter Pump Owner Name"
                className="p-2 w-11/12 rounded border border-gray-600 bg-[#1d1c20] text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.pumpOwner}
                onChange={handleChange}
                required
              />
            </>
            <>
              <label htmlFor="phoneNumber" className="text-sm font-medium text-left">
                Enter Phone Number
              </label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Enter Phone Number"
                className="p-2 w-11/12 rounded border border-gray-600 bg-[#1d1c20] text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </>
            <>
              <label htmlFor="email" className="text-sm font-medium text-left">
                Enter Email
              </label>
              <input
                id="email"
                name="email"
                placeholder="Enter email"
                className="p-2 w-11/12 rounded border border-gray-600 bg-[#1d1c20] text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </>
            <>
              <label htmlFor="role" className="text-sm font-medium text-left">
                Select Role
              </label>
              <select
                name="role"
                id="role"
                className="p-2 w-11/12 rounded border border-gray-600 bg-[#1d1c20] text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="user">User</option>
                <option value="superUser">SuperUser</option>
                <option value="admin">Admin</option>
              </select>
            </>
            <>
              <label htmlFor="state" className="text-sm font-medium text-left">
                Select State
              </label>
              <select
                name="state"
                id="state"
                className="p-2 w-11/12 rounded border border-gray-600 bg-[#1d1c20] text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.state}
                onChange={handleChange}
              >
                {State.getStatesOfCountry("IN").map((state, index) => (
                  <option value={state.name} key={index}>
                    {state.name}
                  </option>
                ))}
              </select>
            </>
            <>
              <label htmlFor="city" className="text-sm font-medium text-left">
                Select City
              </label>
              <select
                name="city"
                id="city"
                className="p-2 w-11/12 rounded border border-gray-600 bg-[#1d1c20] text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.city}
                onChange={handleChange}
              >
                {City.getCitiesOfCountry("IN").map((city, index) => (
                  <option value={city.name} key={index}>
                    {city.name}
                  </option>
                ))}
              </select>
            </>
            <>
              <label
                htmlFor="subscription_expiry"
                className="text-sm font-medium text-left"
              >
                Subscription Expiry
              </label>
              <input
                id="subscription_expiry"
                type="date"
                name="subscription_expiry"
                className="p-2 w-11/12 rounded border border-gray-600 bg-[#1d1c20] text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.subscription_expiry}
                onChange={handleChange}
                required
              />
            </>
            <div className="flex gap-4">
              <label
                htmlFor="blackListed"
                className="text-sm font-medium text-left"
              >
                User blacklisted
              </label>
              <input
                id="blackListed"
                name="blackListed"
                type="checkbox"
                className="p-2 rounded border border-gray-600 bg-[#1d1c20] text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                checked={formData.blackListed}
                onChange={handleChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleSubmit}>
              Create User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserDetails;
