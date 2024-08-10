import { useContext } from "react";
import AuthContext from "../contexts/AuthProvider";

const UseAuth = () => {
  return useContext(AuthContext);
};

export default UseAuth;
