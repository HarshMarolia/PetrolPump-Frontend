import React, { useEffect, useState } from "react";
import { useClientById } from "@/api/client";
import { useEmployeeById } from "@/api/employee";

const SearchDetails = ({ searchData }) => {
  const [data, setData] = useState(null);

  // Only fetch if we have a valid searchData object with a non-empty ID
  const clientId = searchData?.type === "client" && searchData?.id && searchData.id.trim() !== "" ? searchData.id : null;
  const employeeId = searchData?.type === "employee" && searchData?.id && searchData.id.trim() !== "" ? searchData.id : null;

  const clientData = useClientById(clientId);
  const employeeData = useEmployeeById(employeeId);

  useEffect(() => {
    // Reset data when searchData changes to a new search
    if (typeof searchData === "string") {
      setData(null);
      return;
    }

    // Only set data if we have valid search data and successful API response
    if (clientId && clientData?.data) {
      setData(clientData.data);
    } else if (employeeId && employeeData?.data) {
      setData(employeeData.data);
    } else if (clientId && clientData?.isError) {
      setData(null);
    } else if (employeeId && employeeData?.isError) {
      setData(null);
    }
  }, [searchData, clientData, employeeData, clientId, employeeId]);

  if (typeof searchData === "string") {
    return <p className="text-center text-gray-200">{searchData}</p>;
  }

  if (data) {
    const isBlacklisted = data.blacklisted;

    return (
      <div className="flex flex-col text-gray-200">
        <p className="font-bold flex flex-wrap items-center gap-2">
          <span>Name: {data.name}</span>
          {isBlacklisted && (
            <span className="text-xs font-semibold uppercase tracking-wide px-2 py-0.5 rounded bg-red-600 text-white">
              Blacklisted
            </span>
          )}
        </p>
        {searchData.type === "client" ? (
          <p className="font-bold">Pan Number: {data.pan_number}</p>
        ) : (
          <p className="font-bold">Aadhar Number: {data.aadhar_number}</p>
        )}
        <div className="w-full">
          <h1 className="text-xl font-bold mb-1 text-gray-200">Petrol Pumps</h1>
          <div
            className="bg-[#212121] flex flex-col h-36 overflow-y-scroll"
            style={{ scrollbarWidth: "none" }}
          >
            {data?.petrol_pumps.map((pump, index) => (
              <div
                key={index}
                className="news-tile border rounded shadow-lg p-4 my-4 w-full"
              >
                <h2 className="text-xl font-semibold mb-2 text-gray-200">
                  {pump.name}
                </h2>
                <p className="mb-2 text-gray-400">Pump Owner: {pump.pumpOwner}</p>
                <p className="mb-2 text-gray-400">Email: {pump.email}</p>
                <p className="mb-2 text-gray-400">Phone-Number: {pump.phoneNumber}</p>
                <div className="">
                  <p className="text-gray-400">
                    Location: {pump.city}, {pump.state}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return <p className="text-center text-gray-200">No Data Found</p>;
};

export default SearchDetails;
