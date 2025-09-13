import React, { useState, useMemo, useEffect } from "react";
import Layout from "./Layout";
import AreaChart from "@/components/common/AreaChart";
import { useAllUsers } from "@/api/user";
import PaginatedTable from "@/components/user/PaginateTable";
import UserDetails from "@/components/user/UserDetails";

function processUsers(data) {
  const yearMap = {};
  const years = new Set();
  let totalUsers = data.length;
  let activeUsers = 0;
  let blacklistedUsers = 0;

  data.forEach((user) => {
    const createdAt = new Date(user.createdAt);
    const year = createdAt.getFullYear();
    const month = createdAt.getMonth();

    years.add(year);

    if (new Date() < new Date(user.subscription_expiry)) {
      activeUsers++;
    }

    if (user.blacklisted) {
      blacklistedUsers++;
    }

    if (!yearMap[year]) {
      yearMap[year] = new Array(12).fill(0);
    }

    yearMap[year][month]++;
  });

  return {
    years: Array.from(years),
    userCountPerMonth: yearMap,
    totalUsers,
    activeUsers,
    blacklistedUsers,
  };
}

const Users = () => {
  const { data: users, isLoading, isError } = useAllUsers();

  const {
    years,
    userCountPerMonth,
    totalUsers,
    activeUsers,
    blacklistedUsers,
  } = useMemo(() => processUsers(users || []), [users]);

  const [selectedYear, setSelectedYear] = useState(
    years.length > 0 ? years[0] : null
  );
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (years.length > 0 && selectedYear === null) {
      setSelectedYear(years[0]);
    }
  }, [years, selectedYear]);

  const onChangeHandler = (e) => {
    setSelectedYear(e.target.value);
  };

  if (isError) {
    return <div>Error</div>;
  }

  if (isLoading) {
    return <Layout>Loading</Layout>;
  }

  const columns = [
    { header: "Pump Name", accessor: "name" },
    { header: "Owner Name", accessor: "pumpOwner" },
    { header: "Email", accessor: "email" },
    { header: "Role", accessor: "role" },
    { header: "City", accessor: "city" },
    { header: "State", accessor: "state" },
  ];

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.pumpOwner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="text-gray-200 flex sm:flex-row flex-col gap-4">
        <div className="bg-[#171717] w-full sm:w-1/2 p-8 flex flex-col gap-4 text-xl">
          Total Users{" "}
          <span className="font-bold text-white text-2xl">{totalUsers}</span>
        </div>
        <div className="bg-[#171717] w-full sm:w-1/2 p-8 flex flex-col gap-4 text-xl">
          Active Users{" "}
          <span className="font-bold text-white text-2xl">{activeUsers}</span>
        </div>
        <div className="bg-[#171717] w-full sm:w-1/2 p-8 flex flex-col gap-4 text-xl">
          Blacklisted Users{" "}
          <span className="font-bold text-white text-2xl">
            {blacklistedUsers}
          </span>
        </div>
      </div>
      <div>
        <select
          className="px-3 py-2 my-3 text-white bg-[#171717]"
          onChange={onChangeHandler}
          value={selectedYear}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      {selectedYear && (
        <AreaChart
          chartTitle="Users Joined"
          chartData={[
            {
              name: selectedYear,
              data: userCountPerMonth[selectedYear],
            },
          ]}
          xAxisTitle="Months"
          yAxisTitle="Users"
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

      <div className="my-10">
        <UserDetails />
        <input
          type="text"
          placeholder="Search by name or email"
          className="my-5 p-2 border border-gray-300 bg-[#171717] text-gray-200 rounded"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <PaginatedTable
          columns={columns}
          data={filteredUsers}
          itemsPerPage={5}
        />
      </div>
    </Layout>
  );
};

export default Users;
