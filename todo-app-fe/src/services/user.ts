import axios from "axios";
import { apiBaseUrl } from "../utils/constant";
import { Credentials } from "../utils/types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let token = "null";

const setUserToken = (newToken: string) => {
  token = `bearer ${newToken}`;
};

const getAllUser = async () => {
  const { data } = await axios.get(`${apiBaseUrl}/users`);
  return data;
};

const getSingleUser = async (id: string) => {
  const { data } = await axios.get(`${apiBaseUrl}/users/${id}`);
  return data;
};

const createUser = async ({ username, password }: Credentials) => {
  const { data } = await axios.post(`${apiBaseUrl}/users`, {
    username,
    password,
  });

  return data;
};

const createTodo = async (newObject: { content: string; marked: boolean }) => {
  const config = {
    headers: { Authorization: token },
  };

  const { data } = await axios.post(`${apiBaseUrl}/todos`, newObject, config);
  return data;
};

const deleteTodo = async (id: string) => {
  const config = {
    headers: { Authorization: token },
  };

  const { data } = await axios.delete(`${apiBaseUrl}/todos/${id}`, config);
  return data;
};

const deleteCompletedTodos = async (id: string) => {
  const config = {
    headers: { Authorization: token },
  };

  const { data } = await axios.delete(
    `${apiBaseUrl}/todos/completed/${id}`,
    config,
  );
  return data;
};

const markTodos = async (id: string) => {
  const config = {
    headers: { Authorization: token },
  };

  const { data } = await axios.put(`${apiBaseUrl}/todos/${id}`, {}, config);
  return data;
};

export {
  getAllUser,
  createTodo,
  getSingleUser,
  createUser,
  setUserToken,
  deleteTodo,
  deleteCompletedTodos,
  markTodos,
};
