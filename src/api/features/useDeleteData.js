import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../axios";

export const useDeleteData = ({ onSuccess }) => {
  return useMutation({
    mutationFn: async (id) => {
      const dataResponse = await axiosInstance.delete(`/posts/${id}`);
      return dataResponse;
    },
    onSuccess,
  });
};
