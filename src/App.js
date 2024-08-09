import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Users from "./pages/users/Users";
import SingleUser from "./pages/singleUser/SingleUser";
import GlobalLayout from "./layouts/globalLayout/GlobalLayout";
import NewUser from "./pages/newUser/NewUser";
import GlobalMissing from "./layouts/globalMissing/GlobalMissing";

import { DarkModeContext } from "./contexts/darkModeContext";

import "./App.css";
import "./style/dark.scss";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  console.log(darkMode);

  return (
    <div className={darkMode ? "App dark" : "App"}>
      <Routes>
        <Route path="/">
          <Route index element={<Login />} />
          <Route path="/" element={<GlobalLayout />}>
            <Route path="home" element={<Home />} />
            <Route path="users">
              <Route index element={<Users />} />
              <Route path=":userId" element={<SingleUser />} />
              <Route path="new" element={<NewUser />} />
            </Route>
          </Route>
          {/* catch all */}
          <Route path="*" element={<GlobalMissing />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
