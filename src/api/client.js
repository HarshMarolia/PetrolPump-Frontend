import { useQuery, useMutation, useQueryClient } from "react-query";
import { SERVER_URL } from "@/constants/constants";

const fetchAllClients = async () => {
  const response = await fetch(`${SERVER_URL}/client`, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
    },
  });

  if (!response.ok) {
    throw new Error("Error fetching clients");
  }

  return response.json();
};

export const useAllClients = () => {
  return useQuery("clients", fetchAllClients);
};

export const useCreateClient = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (clientData) => {
      const response = await fetch(`${SERVER_URL}/client`, {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify(clientData),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const error = new Error(
          errorData?.error || errorData?.message || "Error creating client"
        );
        error.status = response.status;
        error.details = errorData?.details;
        throw error;
      }

      return response.json();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("clients");
      },
    }
  );
};

const fetchClientById = async (id) => {
  const response = await fetch(`${SERVER_URL}/client/${id}`, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
    },
  });

  if (!response.ok) {
    throw new Error("Error fetching client");
  }

  return response.json();
};

export const useClientById = (id, options = {}) => {
  return useQuery(
    ["client", id],
    () => fetchClientById(id),
    {
      enabled: id != null && id !== "" && (options.enabled !== false),
      ...options,
    }
  );
};
