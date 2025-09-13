import React from "react";
import Sidenav from "@/components/dashboard/sidenav";

const Layout = ({ children }) => {
  return (
    <div className="flex sm:h-screen h-full flex-col md:flex-row md:overflow-hidden bg-[#212121]">
      <div className="w-full flex-none md:w-64">
        <Sidenav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
};

export default Layout;
