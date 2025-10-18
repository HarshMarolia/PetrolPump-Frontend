import React, { useState, useMemo, useCallback } from "react";
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
import { useSelector } from "react-redux";
import { useCreateNews } from "@/api/news";
import { toast } from "sonner";
import { getAllStates, getCitiesForState } from "@/constants/state_city";

const NewsPage = () => {
  const { mutate: createNews, isError } = useCreateNews();
  const user = useSelector((state) => state.user);
  const initialState = {
    newsWriter: user._id,
    title: "",
    content: "",
    sourceLink: "",
    newsFor: "country",
    city: "Abhaneri",
    state: "Andaman and Nicobar Islands",
  };
  const [formData, setFormData] = useState(initialState);
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      const newState = {
        ...prevState,
        [name]: value,
      };
      
      // Reset city when state changes
      if (name === "state") {
        newState.city = "";
      }
      
      return newState;
    });
  }, []);
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    createNews(formData);
    if (!isError) {
      toast("News Published successfully", {
        action: {
          label: "Okay",
          onClick: () => console.log("ok"),
        },
      });
      setFormData(initialState);
    } else {
      toast("News Publishing Failed", {
        action: {
          label: "Okay",
          onClick: () => console.log("ok"),
        },
      });
    }
  }, [formData, createNews, isError, initialState]);

  // Memoized options for better performance
  const stateOptions = useMemo(() => 
    getAllStates().map((state, index) => (
      <option value={state} key={index}>
        {state}
      </option>
    )), []
  );

  const cityOptions = useMemo(() => {
    if (!formData.state) {
      return <option value="">Select a state first</option>;
    }
    
    const cities = getCitiesForState(formData.state);
    return cities.map((city, index) => (
      <option value={city} key={index}>
        {city}
      </option>
    ));
  }, [formData.state]);

  return (
    <div className="text-white bottom-28">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="bg-[#212121] text-white rounded-md gap-2"
          >
            News
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
            <DialogTitle>Create News</DialogTitle>
            <DialogDescription>Your news will help others.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <>
              <label htmlFor="title" className="text-sm font-medium text-left">
                Enter News Title
              </label>
              <input
                id="title"
                name="title"
                placeholder="Enter title"
                className="p-2 rounded border border-gray-600 bg-[#1d1c20] text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </>
            <>
              <label
                htmlFor="content"
                className="text-sm font-medium text-left"
              >
                Enter News Content
              </label>
              <input
                id="content"
                name="content"
                placeholder="Enter News content"
                className="p-2 rounded border border-gray-600 bg-[#1d1c20] text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.content}
                onChange={handleChange}
                required
              />
            </>
            <>
              <label
                htmlFor="sourceLink"
                className="text-sm font-medium text-left"
              >
                Enter News Content
              </label>
              <input
                id="sourceLink"
                name="sourceLink"
                placeholder="Enter News Source Link"
                className="p-2 rounded border border-gray-600 bg-[#1d1c20] text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.sourceLink}
                onChange={handleChange}
                required
              />
            </>
            <>
              <label htmlFor="type" className="text-sm font-medium text-left">
                Select News For
              </label>
              <select
                name="newsFor"
                id="newsFor"
                className="p-2 rounded border border-gray-600 bg-[#1d1c20] text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.newsFor}
                onChange={handleChange}
              >
                <option value="country">Country</option>
                <option value="state">State</option>
                <option value="city">City</option>
              </select>
            </>
            <>
              <label htmlFor="state" className="text-sm font-medium text-left">
                Select State
              </label>
              <select
                name="state"
                id="state"
                className="p-2 rounded border border-gray-600 bg-[#1d1c20] text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.state}
                onChange={handleChange}
              >
                {stateOptions}
              </select>
            </>
            <>
              <label htmlFor="city" className="text-sm font-medium text-left">
                Select City
              </label>
              <select
                name="city"
                id="city"
                className="p-2 rounded border border-gray-600 bg-[#1d1c20] text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.city}
                onChange={handleChange}
                disabled={!formData.state}
              >
                {cityOptions}
              </select>
            </>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleSubmit}>
              Publish News
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NewsPage;
