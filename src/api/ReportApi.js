import axios from "axios";
import { HeaderAPI } from "../../headerApi";

export const getNoPaid = async (id , searchQuery) => {
    console.log(searchQuery);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API}/api/report/user?process_id=${id}&search=${searchQuery}`,
        {
          ...HeaderAPI(localStorage.getItem("Token")),
        }
      );
      console.log(response)
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

export const getNotPaidLocation = async (id) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API}/api/report/house?search=${id}`,
        {
          ...HeaderAPI(localStorage.getItem("Token")),
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };


export const getLostCustomer = async (id) => {
    console.log(id);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API}/api/report/user/broken?process_id=${id}`,
        {
          ...HeaderAPI(localStorage.getItem("Token")),
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };