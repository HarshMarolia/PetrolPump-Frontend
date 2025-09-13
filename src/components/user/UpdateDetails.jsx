import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { State, City } from "country-state-city";
import { useUpdateUser } from "@/api/user";

const UpdateDetails = ({ userData }) => {
  const { mutate: updateUser } = useUpdateUser();
  const [formData, setFormData] = useState(userData);

  useEffect(() => {
    setFormData({
      ...userData,
      subscription_expiry: userData.subscription_expiry.split("T")[0],
      blacklisted: userData.blacklisted,
    });
  }, [userData]);

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
    const { _id } = formattedData;
    await updateUser({ id: _id, userData: formattedData });
    toast.success("User updated successfully");
  };

  return (
    <div className="text-white bottom-28">
      <div className="grid gap-4 py-4">
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
        <div className="flex gap-4">
          <label
            htmlFor="blacklisted"
            className="text-sm font-medium text-left"
          >
            User blacklisted
          </label>
          <input
            id="blacklisted"
            name="blacklisted"
            type="checkbox"
            className="p-2 rounded border border-gray-600 bg-[#1d1c20] text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            checked={formData.blacklisted}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="w-11/12 p-2 rounded bg-blue-500 text-white"
          onClick={handleSubmit}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default UpdateDetails;
