import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../axios";

export const useEditData = ({ onSuccess }) => {
  return useMutation({
    mutationFn: async (id) => {
      const dataResponse = await axiosInstance.fetch(`/posts/${id}`);
      return dataResponse;
    },
    onSuccess,
  });
};
