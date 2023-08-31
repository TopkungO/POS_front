import axios from "axios";

import { loginType, logoutType } from "../../types";

export const currentAdmin = async (authToken: string) => {
  return await axios.post(
    import.meta.env.VITE_BACKENDPOINT + "/current-admin",
    {},
    {
      headers: { authToken },
    }
  );
};
export const currentUser = async (authToken: string) => {
  return await axios.post(
    import.meta.env.VITE_BACKENDPOINT + "/current-user",
    {},
    {
      headers: { authToken },
    }
  );
};

export const register = async (value: loginType) =>
  await axios.post(import.meta.env.VITE_BACKENDPOINT + "/regiter", value);

export const login = async (value: loginType) =>
  await axios.post(import.meta.env.VITE_BACKENDPOINT + "/login", value);

export const logout = async (value: logoutType) =>
  await axios.post(import.meta.env.VITE_BACKENDPOINT + "/logout", value);

export const listUser = async () =>
  await axios.get(import.meta.env.VITE_BACKENDPOINT + "/user");

export const changeStatus = async (
  authToken: string,
  value: { _id: React.Key; status: boolean }
) => {
  return await axios.put(import.meta.env.VITE_BACKENDPOINT + "/user", value, {
    headers: { authToken },
  });
};

export const deleteUser = async (authToken: string, _id: React.Key) => {
  return await axios.delete(import.meta.env.VITE_BACKENDPOINT + "/user/"+ _id, {
    headers: { authToken },
  });
};
