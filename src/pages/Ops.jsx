import React, { useState, useMemo, useEffect } from "react";
import Layout from "./Layout";
import AreaChart from "@/components/common/AreaChart";
import { useAllClients } from "@/api/client";
import { useAllEmployees } from "@/api/employee";
import {
  usePriceAction,
  useResetPriceAction,
  useUpdateDieselPrice,
  useUpdatePetrolPrice,
} from "@/api/price";
import { SERVER_URL } from "@/constants/constants";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

function processEntries(data) {
  const yearMap = {};
  const years = new Set();

  data.forEach((entry) => {
    const createdAt = new Date(entry.createdAt);
    const year = createdAt.getFullYear();
    const month = createdAt.getMonth();

    years.add(year);

    if (!yearMap[year]) {
      yearMap[year] = new Array(12).fill(0);
    }

    yearMap[year][month]++;
  });

  return {
    years: Array.from(years),
    countPerMonth: yearMap,
  };
}

const Ops = () => {
  const { data: priceAction } = usePriceAction();
  const { mutate: resetPriceAction } = useResetPriceAction();
  const { mutate: updatePetrolPrice } = useUpdatePetrolPrice();
  const { mutate: updateDieselPrice } = useUpdateDieselPrice();
  const {
    data: clients,
    isLoading: clientsLoading,
    isError: clientsError,
    refetch: refetchClients,
  } = useAllClients();
  const {
    data: employees,
    isLoading: employeesLoading,
    isError: employeesError,
    refetch: refetchEmployees,
  } = useAllEmployees();

  // Admin reset link state
  const [resetEmail, setResetEmail] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");

  const { years: clientYears, countPerMonth: clientCountPerMonth } = useMemo(
    () => processEntries(clients || []),
    [clients]
  );

  const { years: employeeYears, countPerMonth: employeeCountPerMonth } =
    useMemo(() => processEntries(employees || []), [employees]);

  const [selectedYear, setSelectedYear] = useState(
    clientYears.length > 0 ? clientYears[0] : null
  );
  const [blacklistSearch, setBlacklistSearch] = useState("");

  useEffect(() => {
    if (clientYears.length > 0 && selectedYear === null) {
      setSelectedYear(clientYears[0]);
    }
  }, [clientYears, selectedYear]);

  const onChangeHandler = (e) => {
    setSelectedYear(e.target.value);
  };

  const handlePetrolPriceChange = (e) => {
    const price = parseInt(e.target.value, 10);
    updatePetrolPrice(price);
    toast("Petrol price updated successfully!");
  };

  const handleResetPriceAction = () => {
    resetPriceAction();
    toast("Prices reset successfully!");
  };

  const handleDieselPriceChange = (e) => {
    const price = parseInt(e.target.value, 10);
    updateDieselPrice(price);
    toast("Diesel price updated successfully!");
  };

  const handleGenerateResetLink = async (e) => {
    e.preventDefault();

    if (!resetEmail) {
      toast("Please enter the user's email", {
        action: {
          label: "Okay",
          onClick: () => console.log("ok"),
        },
      });
      return;
    }

    try {
      const response = await fetch(`${SERVER_URL}/user/reset-password/link`, {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({ email: resetEmail }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Failed to generate reset link");
      }

      const data = await response.json();
      setGeneratedLink(data.link);
      toast("Password reset link generated", {
        description: "Copy and share this link with the user",
        action: {
          label: "Okay",
          onClick: () => console.log("ok"),
        },
      });
    } catch (error) {
      console.error("Error generating password reset link:", error);
      toast(error.message || "Failed to generate link", {
        action: {
          label: "Okay",
          onClick: () => console.log("ok"),
        },
      });
    }
  };

  const handleCopyLink = async () => {
    if (!generatedLink) return;

    try {
      await navigator.clipboard.writeText(generatedLink);
      toast("Reset link copied to clipboard");
    } catch (error) {
      console.error("Failed to copy reset link:", error);
      toast("Unable to copy automatically. Please copy manually.");
    }
  };

  const toggleClientBlacklist = async (client) => {
    try {
      const response = await fetch(`${SERVER_URL}/client/${client._id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({ blacklisted: !client.blacklisted }),
      });

      if (!response.ok) {
        throw new Error("Failed to update client blacklist status");
      }

      await refetchClients();
      toast(
        client.blacklisted
          ? "Client removed from blacklist"
          : "Client added to blacklist"
      );
    } catch (error) {
      console.error("Error updating client blacklist:", error);
      toast("Failed to update client blacklist status");
    }
  };

  const toggleEmployeeBlacklist = async (employee) => {
    try {
      const response = await fetch(`${SERVER_URL}/employee/${employee._id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({ blacklisted: !employee.blacklisted }),
      });

      if (!response.ok) {
        throw new Error("Failed to update employee blacklist status");
      }

      await refetchEmployees();
      toast(
        employee.blacklisted
          ? "Employee removed from blacklist"
          : "Employee added to blacklist"
      );
    } catch (error) {
      console.error("Error updating employee blacklist:", error);
      toast("Failed to update employee blacklist status");
    }
  };

  const mergedEntries = useMemo(() => {
    const list = [];

    (clients || []).forEach((client) => {
      list.push({
        id: client._id,
        type: "client",
        name: client.name,
        identifierLabel: "PAN",
        identifierValue: client.pan_number,
        entity: client,
        blacklisted: client.blacklisted,
      });
    });

    (employees || []).forEach((employee) => {
      list.push({
        id: employee._id,
        type: "employee",
        name: employee.name,
        identifierLabel: "Aadhar",
        identifierValue: employee.aadhar_number,
        entity: employee,
        blacklisted: employee.blacklisted,
      });
    });

    return list;
  }, [clients, employees]);

  const filteredEntries = useMemo(() => {
    if (!blacklistSearch) {
      return mergedEntries.filter((entry) => entry.blacklisted);
    }

    const term = blacklistSearch.toLowerCase();
    return mergedEntries.filter((entry) => {
      return (
        entry.name.toLowerCase().includes(term) ||
        (entry.identifierValue || "").toLowerCase().includes(term) ||
        entry.type.toLowerCase().includes(term)
      );
    });
  }, [mergedEntries, blacklistSearch]);

  if (clientsError || employeesError) {
    return <div>Error</div>;
  }

  if (clientsLoading || employeesLoading) {
    return <Layout>Loading</Layout>;
  }

  return (
    <Layout>
      <div>
        <select
          className="px-3 py-2 my-3 text-white bg-[#171717]"
          onChange={onChangeHandler}
          value={selectedYear}
        >
          {clientYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        {selectedYear && (
          <AreaChart
            chartTitle="Clients and Employees Joined"
            chartData={[
              {
                name: `${selectedYear} - Clients`,
                data:
                  clientCountPerMonth[selectedYear] || new Array(12).fill(0),
              },
              {
                name: `${selectedYear} - Employees`,
                data:
                  employeeCountPerMonth[selectedYear] || new Array(12).fill(0),
              },
            ]}
            xAxisTitle="Months"
            yAxisTitle="Count"
            labels={[
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ]}
          />
        )}
      </div>
      <div className="w-full grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] gap-6 my-6 items-start">
        <div className="flex flex-col gap-6">
          <div className="border px-10 py-6 text-white w-full">
            <div className="flex justify-between items-center mb-5">
              <h1 className="text-white py-6 text-xl sm:text-3xl font-bold">
                Price Action
              </h1>
              <Button
                onClick={handleResetPriceAction}
                variant="outline"
                className="text-black"
              >
                Reset
              </Button>
            </div>
            <div className="flex gap-4 justify-between items-center py-1">
              <label htmlFor="petrol" className="text-sm font-medium text-left">
                Select Petrol Price Action
              </label>
              <select
                name="petrol"
                id="petrol"
                className="p-2 rounded border border-gray-600 bg-[#1d1c20] text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={priceAction[0]?.petrolPrice || 0}
                onChange={handlePetrolPriceChange}
              >
                <option value="-1">Decrease</option>
                <option value="0">Neutral</option>
                <option value="1">Increase</option>
              </select>
            </div>
            <div className="flex gap-4 justify-between items-center py-3">
              <label htmlFor="diesel" className="text-sm font-medium text-left">
                Select Diesel Price Action
              </label>
              <select
                name="diesel"
                id="diesel"
                className="p-2 rounded border border-gray-600 bg-[#1d1c20] text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={priceAction[0]?.dieselPrice || 0}
                onChange={handleDieselPriceChange}
              >
                <option value="-1">Decrease</option>
                <option value="0">Neutral</option>
                <option value="1">Increase</option>
              </select>
            </div>
          </div>

          {/* Admin password reset link section */}
          <div className="border px-10 py-6 text-white w-full">
            <h1 className="text-white py-2 text-xl sm:text-2xl font-bold">
              Generate Password Reset Link
            </h1>
            <p className="text-sm text-gray-400 mb-4">
              Create a secure password reset link (same as the forgot-password
              flow) and share it manually with the user.
            </p>
            <form
              className="flex flex-col gap-4"
              onSubmit={handleGenerateResetLink}
            >
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="resetEmail"
                  className="text-sm font-medium text-left"
                >
                  User Email
                </label>
                <input
                  id="resetEmail"
                  type="email"
                  className="p-2 rounded border border-gray-600 bg-[#1d1c20] text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="user@example.com"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                />
              </div>
              <Button type="submit" variant="outline" className="text-black">
                Generate Link
              </Button>
            </form>

            <div className="mt-6">
              <p className="text-sm text-gray-400 mb-2">
                Generated Link (valid for 1 day):
              </p>
              <div className="flex flex-col gap-2">
                <textarea
                  readOnly
                  value={generatedLink}
                  placeholder="Link will appear here after generation"
                  className="w-full p-2 rounded border border-gray-600 bg-[#1d1c20] text-gray-200 focus:outline-none h-24 resize-none"
                />
                <Button
                  variant="outline"
                  className="text-black"
                  disabled={!generatedLink}
                  onClick={handleCopyLink}
                >
                  Copy Link
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Combined blacklist management section */}
        <div className="border px-6 py-5 text-white w-full">
          <h1 className="text-white py-5 text-xl sm:text-3xl font-bold">
            Blacklist Manager
          </h1>
          <p className="text-xs text-gray-400 mb-4">
            Search all clients and employees by name or ID. If the search is
            empty, you&apos;ll only see those currently blacklisted.
          </p>
          <div className="flex flex-col gap-2 mb-4">
            <label
              htmlFor="blacklistSearch"
              className="text-xs uppercase tracking-widest text-gray-400"
            >
              Search by name or ID
            </label>
            <input
              id="blacklistSearch"
              type="text"
              placeholder="e.g., Nikhil or PAN1234"
              className="p-2 rounded border border-gray-600 bg-[#1d1c20] text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={blacklistSearch}
              onChange={(e) => setBlacklistSearch(e.target.value)}
            />
          </div>

          <div className="max-h-80 overflow-y-auto space-y-3 pr-1">
            {filteredEntries.length > 0 ? (
              filteredEntries.map((entry) => (
                <div
                  key={`${entry.type}-${entry.id}`}
                  className="flex items-center justify-between border border-gray-700 rounded px-3 py-2"
                >
                  <div className="flex flex-col text-sm">
                    <span className="font-semibold flex items-center gap-2">
                      {entry.name}
                      <span className="text-[10px] uppercase tracking-widest text-gray-400">
                        {entry.type}
                      </span>
                    </span>
                    <span className="text-gray-400 text-xs">
                      {entry.identifierLabel}: {entry.identifierValue || "N/A"}
                    </span>
                    <span className="text-gray-400 text-xs">
                      Status: {entry.blacklisted ? "Blacklisted" : "Active"}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    className="text-black text-xs"
                    onClick={() =>
                      entry.type === "client"
                        ? toggleClientBlacklist(entry.entity)
                        : toggleEmployeeBlacklist(entry.entity)
                    }
                  >
                    {entry.blacklisted ? "Remove" : "Blacklist"}
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-400">
                {mergedEntries.filter((entry) => entry.blacklisted).length === 0
                  ? "No blacklisted records."
                  : "No records match your search."}
              </p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Ops;
