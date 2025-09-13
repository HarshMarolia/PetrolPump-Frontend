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
  } = useAllClients();
  const {
    data: employees,
    isLoading: employeesLoading,
    isError: employeesError,
  } = useAllEmployees();

  const { years: clientYears, countPerMonth: clientCountPerMonth } = useMemo(
    () => processEntries(clients || []),
    [clients]
  );

  const { years: employeeYears, countPerMonth: employeeCountPerMonth } =
    useMemo(() => processEntries(employees || []), [employees]);

  const [selectedYear, setSelectedYear] = useState(
    clientYears.length > 0 ? clientYears[0] : null
  );

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
      <div className="border px-10 py-6 my-6 text-white w-fit sm:w-2/5">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-white py-6 text-xl sm:text-3xl font-bold">Price Action</h1>
          <Button onClick={handleResetPriceAction} variant="outline" className="text-black">Reset</Button>
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
    </Layout>
  );
};

export default Ops;
