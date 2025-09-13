import { useQuery, useMutation, useQueryClient } from "react-query";
import { SERVER_URL } from "@/constants/constants";

const fetchAllEmployees = async () => {
  const response = await fetch(`${SERVER_URL}/employee`, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
    },
  });

  if (!response.ok) {
    throw new Error("Error fetching employees");
  }

  return response.json();
};

export const useAllEmployees = () => {
  return useQuery("employees", fetchAllEmployees);
};

export const useCreateEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (employeeData) => {
      const response = await fetch(`${SERVER_URL}/employee`, {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify(employeeData),
      });
      if (!response.ok) {
        throw new Error("Error creating employee");
      }

      return response.json();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("employees");
      },
    }
  );
};

const fetchEmployeeById = async (id) => {
  const response = await fetch(`${SERVER_URL}/employee/${id}`, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
    },
  });

  if (!response.ok) {
    throw new Error("Error fetching employee");
  }

  return response.json();
};

export const useEmployeeById = (id) => {
  return useQuery(["employee", id], () => fetchEmployeeById(id));
};
