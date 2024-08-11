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
import Collection from "./pages/collection/Collection";
import NewCollection from "./pages/newCollection/NewCollection";
import SingleCollection from "./pages/singleCollection/SingleCollection";
import SingleItem from "./pages/singleItem/SingleItem";
import NewItem from "./pages/newItem/NewItem";
import Item from "./pages/Item/Item";

const ROLES = {
  User: "user",
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
            <Route
              element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.User]} />}
            >
              <Route path="home" element={<Home />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
              <Route path="users">
                <Route index element={<Users />} />
                <Route path=":userId" element={<SingleUser />} />
                <Route path="new" element={<NewUser />} />
              </Route>
            </Route>
            <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
              <Route path="collection">
                <Route index element={<Collection />} />
                <Route path=":collectionId" element={<SingleCollection />} />
                <Route path="new" element={<NewCollection />} />
              </Route>
              <Route path="item">
                <Route index element={<Item />} />
                <Route path=":collectionId" element={<SingleItem />} />
                <Route path="new" element={<NewItem />} />
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
