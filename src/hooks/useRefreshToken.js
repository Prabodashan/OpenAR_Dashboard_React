import axios from "../libraries/axios";
import { API_URLS } from "../configs/api.urls";

const useRefreshToken = () => {
  const refresh = async () => {
    const response = await axios.post(
      API_URLS.REFRESH_TOKEN_URL,
      {},
      {
        withCredentials: true,
      }
    );

    return response;
  };
  return refresh;
};

export default useRefreshToken;
