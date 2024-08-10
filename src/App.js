import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Users from "./pages/users/Users";
import SingleUser from "./pages/singleUser/SingleUser";
import GlobalLayout from "./layouts/globalLayout/GlobalLayout";
import NewUser from "./pages/newUser/NewUser";
import GlobalMissing from "./layouts/globalMissing/GlobalMissing";
import RequireAuth from "./components/requireAuth/RequireAuth";

import { DarkModeContext } from "./contexts/darkModeContext";

import "./App.css";
import "./style/dark.scss";
import { Toaster } from "sonner";

const ROLES = {
  Member: "member",
  Admin: "admin",
};

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "App dark" : "App"}>
      <Routes>
        <Route path="/">
          <Route index element={<Login />} />
          <Route path="/" element={<GlobalLayout />}>
            {/* protected routes */}
            <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
              <Route path="home" element={<Home />} />
              <Route path="users">
                <Route index element={<Users />} />
                <Route path=":userId" element={<SingleUser />} />
                <Route path="new" element={<NewUser />} />
              </Route>
            </Route>
          </Route>
          {/* catch all */}
          <Route path="*" element={<GlobalMissing />} />
        </Route>
      </Routes>
      <Toaster position="top-right" richColors closeButton />
    </div>
  );
}

export default App;
