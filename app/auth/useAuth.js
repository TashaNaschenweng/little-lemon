import { useContext } from "react";

import AuthContext from "./context";
import userStorage from "../store/userStorage";

const useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const getUser = async () => {
    const storedUser = await userStorage.getUser();
    setUser(storedUser);
  };

  const upsertUser = (user) => {
    userStorage.storeUser(user);
    setUser(user);
  };

  const logout = () => {
    userStorage.deleteUser();
    setUser(null);
  };

  return { user, setUser, getUser, upsertUser, logout };
};

export default useAuth;
