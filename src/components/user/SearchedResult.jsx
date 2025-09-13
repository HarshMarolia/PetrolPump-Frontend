import * as React from "react";

export function SearchedResult({ setSearchedData }) {
  const initialState = {
    id: "",
    type: "client",
  };
  const [formData, setFormData] = React.useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchedData(formData);
  };

  return (
    <div className="border border-gray-700 p-6 rounded-lg text-gray-200">
      <form onSubmit={handleSubmit}>
        <div className="grid w-full">
          <div className="flex flex-col space-y-4">
            <label htmlFor="id" className="text-sm font-medium">
              Enter Employee/Client ID
            </label>
            <input
              id="id"
              name="id"
              placeholder="Enter ID"
              className="p-2 rounded border border-gray-600 bg-gray-900 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.id}
              onChange={handleChange}
            />
            <select
              name="type"
              id="type"
              className="p-2 rounded border border-gray-600 bg-gray-900 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="client">Client</option>
              <option value="employee">Employee</option>
            </select>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
            >
              Search
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
