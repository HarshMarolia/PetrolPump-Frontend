import { useQuery, useMutation, useQueryClient } from "react-query";
import { SERVER_URL } from "@/constants/constants";

const fetchPriceAction = async () => {
  const response = await fetch(`${SERVER_URL}/price`, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
    },
  });

  if (!response.ok) {
    throw new Error("Error fetching price");
  }

  return response.json();
};

export const usePriceAction = () => {
  return useQuery("price", fetchPriceAction);
};

export const useResetPriceAction = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async () => {
      const response = await fetch(`${SERVER_URL}/price/create`, {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      });
      if (!response.ok) {
        throw new Error("Error resetting price");
      }

      return response.json();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("price");
      },
    }
  );
};

export const useUpdateDieselPrice = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (priceData) => {
      const response = await fetch(`${SERVER_URL}/price/diesel`, {
        method: "PUT",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({ price: priceData }),
      });
      if (!response.ok) {
        throw new Error("Error updating price");
      }

      return response.json();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("price");
      },
    }
  );
};

export const useUpdatePetrolPrice = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (priceData) => {
      const response = await fetch(`${SERVER_URL}/price/petrol`, {
        method: "PUT",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({ price: priceData }),
      });
      if (!response.ok) {
        throw new Error("Error updating price");
      }

      return response.json();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("price");
      },
    }
  );
};
