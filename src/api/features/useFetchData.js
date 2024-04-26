import { axiosInstance } from "../axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchData = () => {
  return useQuery({
    queryFn: async () => {
      const dataResponse = await axiosInstance.get("/posts");

      return dataResponse;
    },
  });
};
