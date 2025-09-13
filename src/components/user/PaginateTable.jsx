import React, { useState, useMemo } from "react";
import UpdateDetails from "./UpdateDetails";

const PaginatedTable = ({ columns, data, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const pageCount = Math.ceil(data.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const sortedData = useMemo(() => {
    const sorted = [...data].sort((a, b) => {
      const dateA = new Date(a.subscription_expiry);
      const dateB = new Date(b.subscription_expiry);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });
    return sorted;
  }, [data, sortOrder]);

  const currentItems = useMemo(() => {
    return sortedData.slice(indexOfFirstItem, indexOfLastItem);
  }, [sortedData, indexOfFirstItem, indexOfLastItem]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleRowClick = (item) => {
    setSelectedData(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedData(null);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setCurrentPage(1); // Reset to first page after sorting
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={toggleSortOrder}
          className="bg-gray-700 text-white rounded px-4 py-2"
        >
          Sort by Expiry Date ({sortOrder === "asc" ? "Asc" : "Desc"})
        </button>
      </div>
      <div className={`overflow-x-auto ${isModalOpen ? "blur-sm" : ""}`}>
        <table className="w-full table-auto text-gray-200">
          <thead>
            <tr className="dark:border-darkborder border-b">
              {columns.map((column) => (
                <th
                  key={column.accessor}
                  className="px-2 py-1 text-left text-sm font-medium text-white sm:px-6 sm:py-3"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="dark:divide-darkborder divide-y">
            {currentItems.map((item, index) => (
              <tr
                key={index}
                className="cursor-pointer hover:bg-gray-700"
                onClick={() => handleRowClick(item)}
              >
                {columns.map((column) => (
                  <td
                    key={column.accessor}
                    className="whitespace-nowrap px-2 py-1 sm:px-6 sm:py-4"
                  >
                    {item[column.accessor]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 flex justify-center flex-wrap">
          {Array.from({ length: pageCount }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={`mx-1 my-1 rounded px-4 py-2 ${
                i + 1 === currentPage ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 overflow-hidden">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={closeModal}
          ></div>
          <div className="relative bg-[#212121] p-6 rounded shadow-lg z-50 border max-w-full max-h-full overflow-auto" style={{ scrollbarWidth: "none" }}>
            <button
              className="absolute top-0 right-0 mt-2 mr-2 text-gray-300 hover:text-white"
              onClick={closeModal}
            >
              &times;
            </button>
            <div className="overflow-auto max-h-full">
              <UpdateDetails userData={selectedData} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaginatedTable;
