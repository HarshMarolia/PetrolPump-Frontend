import React, { useState, useEffect } from "react";
import Navbar from "@/components/common/Navbar";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import PriceAction from "@/components/user/PriceAction";
import News from "@/components/common/News";
import { useSelector } from "react-redux";
import { SearchedResult } from "@/components/user/SearchedResult";
import SearchDetails from "@/components/user/SearchDetails";
import DrawerForm from "@/components/user/Drawer";
import NewsPage from "@/components/user/NewsPage";

const SuperUser = () => {
  const user = useSelector((state) => state.user);
  const [searchedData, setSearchedData] = useState(
    "Search Something to see the results here..."
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [daysLeft, setDaysLeft] = useState(0);
  useEffect(() => {
    const currentDate = new Date();
    const expiryDate = new Date(user.subscription_expiry);
    const timeDiff = expiryDate - currentDate;
    const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    if (daysRemaining <= 30) {
      setDaysLeft(daysRemaining);
      setIsModalOpen(true);
    }
  }, [user.subscription_expiry]);

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="bg-[#212121] h-full sm:h-[100vh] w-screen overflow-x-auto">
      <Navbar />
      <div className="sm:fixed ml-5 bottom-10 right-16 gap-3 flex sm:flex-col items-end">
        <NewsPage />
        <DrawerForm />
      </div>
      <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem] gap-10">
        <BentoGridItem
          title={""}
          description={""}
          header={<PriceAction />}
          className={"md:col-span-1 bg-[#212121] text-white"}
          icon={
            <div className="relative group">
              <button className="text-white focus:outline-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                  />
                </svg>
              </button>
              <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded p-2 w-56 shadow-lg">
                The price indicators are not certain and are for the future.
              </div>
            </div>
          }
        />
        <BentoGridItem
          title={""}
          description={""}
          header={<News state={user.state} city={user.city} />}
          className={"md:col-span-2 bg-[#212121] items-center w-auto"}
        />
        <BentoGridItem
          title={""}
          description={""}
          header={<SearchDetails searchData={searchedData} />}
          className={"md:col-span-2 bg-[#212121]"}
        />
        <BentoGridItem
          title={""}
          description={""}
          header={<SearchedResult setSearchedData={setSearchedData} />}
          className={"md:col-span-1 bg-[#212121]"}
        />
      </BentoGrid>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 text-white">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold mb-4">
              Subscription Expiry Alert
            </h2>
            <p>
              Dear {user.name}, your subscription is getting expired after{" "}
              {daysLeft} days.
            </p>
            <button
              onClick={closeModal}
              className="mt-4 px-4 py-2 border rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperUser;
