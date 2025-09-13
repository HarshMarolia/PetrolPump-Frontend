import { useQuery, useMutation, useQueryClient } from "react-query";
import { SERVER_URL } from "@/constants/constants";

const fetchAllUsers = async () => {
  const response = await fetch(`${SERVER_URL}/user`, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
    },
  });

  if (!response.ok) {
    throw new Error("Error fetching users");
  }

  return response.json();
};

export const useAllUsers = () => {
  return useQuery("users", fetchAllUsers);
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (userData) => {
      const response = await fetch(`${SERVER_URL}/user`, {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error("Error creating user");
      }

      return response.json();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users");
      },
    }
  );
};

const fetchUserById = async (id) => {
  const response = await fetch(`${SERVER_URL}/user/${id}`, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
    },
  });

  if (!response.ok) {
    throw new Error("Error fetching user");
  }

  return response.json();
};

export const useUserById = (id) => {
  return useQuery(["user", id], () => fetchUserById(id));
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ id, userData }) => {
      const response = await fetch(`${SERVER_URL}/user/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error("Error updating user");
      }

      return response.json();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users");
      },
    }
  );
};
