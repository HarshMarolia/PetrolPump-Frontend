import { useQuery, useMutation, useQueryClient } from "react-query";
import { SERVER_URL } from "@/constants/constants";

const getAllNews = async () => {
  const response = await fetch(`${SERVER_URL}/news`, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
    },
  });
  if (!response.ok) {
    throw new Error("Error fetching news");
  }

  return response.json();
};

export const useGetAllNews = () => {
  return useQuery("news", getAllNews);
};

export const useCreateNews = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (data) => {
      const response = await fetch(`${SERVER_URL}/news`, {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Error creating news");
      }
      return response.json();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("news");
      },
    }
  );
};

export const useDeleteNews = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (id) => {
      const response = await fetch(`${SERVER_URL}/news/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      });
      if (!response.ok) {
        throw new Error("Error deleting news");
      }
      return response.json();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("news");
      },
    }
  );
};

export const useGetNewsByState = (state) => {
  return useQuery(["news", state], () => {
    const data = fetch(`${SERVER_URL}/news/state/${state}`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    });
    const response = data.then((res) => res.json()) || [];
    return response;
  });
};

export const useGetNewsByCity = (city) => {
  return useQuery(["news", city], () => {
    const data = fetch(`${SERVER_URL}/news/city/${city}`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    });
    const response = data.then((res) => res.json()) || [];
    return response;
  });
};
