import { Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import SingleUser from "./pages/singleUser/SingleUser";
import GlobalLayout from "./layouts/globalLayout/GlobalLayout";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/">
          <Route index element={<Login />} />
          <Route path="/" element={<GlobalLayout />}>
            <Route path="home" element={<Home />} />
            <Route path="users">
              <Route index element={<User />} />
              <Route path=":userId" element={<SingleUser />} />
              <Route path="new" element={<NewUser />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
