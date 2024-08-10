import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(
    JSON.parse(localStorage.getItem("user")) || {}
  );

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(auth));
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
