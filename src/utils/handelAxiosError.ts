import axios from "axios";
import { toast } from "react-toastify";

export const handleAxiosError = (error: unknown): void => {
  if (axios.isAxiosError(error)) {
    if (!error.response) {
      // Network error (tidak bisa mencapai server)
      toast.error('Unable to connect to the server. Please check your internet connection.');
      console.error('Network Error:', error.message);
      return;
    }

    const status = error.response.status;
    const message =
      error.response.data?.message ||
      `An error occurred (${status})`;

    toast.error(message);

  } else {
    // Bukan error dari axios
    toast.error('An unknown error occurred.');
    console.error(error);
  }
};