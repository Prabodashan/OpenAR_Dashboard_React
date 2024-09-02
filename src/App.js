import { lazy, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";

import "./App.css";
import "./style/dark.scss";

import { DarkModeContext } from "./contexts/darkModeContext";

import Login from "./pages/login/Login";
import GlobalMissing from "./layouts/globalMissing/GlobalMissing";
import GlobalLayout from "./layouts/globalLayout/GlobalLayout";
import RequireAuth from "./components/requireAuth/RequireAuth";
import ErrorPage from "./pages/errorPage/ErrorPage.jsx";

const Home = lazy(() => import("./pages/home/Home"));

const Users = lazy(() => import("./pages/users/Users"));
const SingleUser = lazy(() => import("./pages/singleUser/SingleUser"));
const NewUser = lazy(() => import("./pages/newUser/NewUser"));

const Collection = lazy(() => import("./pages/collection/Collection"));
const SingleCollection = lazy(() =>
  import("./pages/singleCollection/SingleCollection")
);
const NewCollection = lazy(() => import("./pages/newCollection/NewCollection"));

const Item = lazy(() => import("./pages/Item/Item"));
const NewItem = lazy(() => import("./pages/newItem/NewItem"));
const SingleItem = lazy(() => import("./pages/singleItem/SingleItem"));

const DevItem = lazy(() => import("./pages/devItem/DevItem"));
const SingleIDevtem = lazy(() => import("./pages/singleIDevtem/SingleIDevtem"));

const ROLES = {
  User: "user",
  Admin: "admin",
  Dev: "dev",
};

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "App dark" : "App"}>
      <Routes>
        <Route path="/">
          <Route index element={<Login />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/" element={<GlobalLayout />}>
            {/* protected routes */}
            <Route
              element={
                <RequireAuth
                  allowedRoles={[ROLES.Admin, ROLES.User, ROLES.Dev]}
                />
              }
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
                <Route path=":itemId" element={<SingleItem />} />
                <Route path="new" element={<NewItem />} />
              </Route>
            </Route>
            <Route element={<RequireAuth allowedRoles={[ROLES.Dev]} />}>
              <Route path="dev">
                <Route index element={<DevItem />} />
                <Route path=":itemId" element={<SingleIDevtem />} />
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
