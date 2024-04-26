import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../axios";

export const useCreateData = ({ onSuccess }) => {
  return useMutation({
    mutationFn: async (body) => {
      const dataResponse = await axiosInstance.post(`/posts`, body);
      return dataResponse;
    },
    onSuccess,
  });
};
