import axios from "axios";
import { apiBaseUrl } from "../utils/constant";
import { Credentials } from "../utils/types";

const login = async ({ username, password }: Credentials) => {
  const response = await axios.post(`${apiBaseUrl}/login`, {
    username,
    password,
  });
  return response.data;
};

export { login };
