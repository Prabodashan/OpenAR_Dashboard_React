import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import "./login.scss";

import { API_URLS } from "./../../configs/api.urls";
import UseAuth from "./../../hooks/UseAuth";
import { toast } from "sonner";
import useAxios from "../../hooks/axios";

const Login = () => {
  const { setAuth } = UseAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/home";

  const [inputs, setInputs] = useState({
    emailAddress: "",
    password: "",
  });
  const [err, setError] = useState(null);

  const { error, loading, fetchData } = useAxios();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = (values) => {
    const errors = {};
    setError(null);
    const regexp =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{4,12}$/;
    const regexe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.emailAddress) {
      errors.emailAddress = "Email is required!";
    } else if (!regexe.test(values.emailAddress)) {
      errors.emailAddress = "This is not Valid email format";
    }

    if (!values.password) {
      errors.password = "Password is required!";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorVal = validate(inputs);
    if (Object.keys(errorVal).length !== 0) {
      setError(errorVal);
      return;
    }

    const response = await fetchData({
      url: API_URLS.LOGIN_URL,
      method: "POST",
      data: inputs,
    });

    if (!response.status) {
      return toast.error(response.error.message);
    }
    const { refreshToken, userType, userId } = response;
    toast.success(response.success.message);

    setAuth({ userId, userType, refreshToken });
    navigate(from, { replace: true });
  };

  return (
    <div className="login">
      <form>
        <h1>Sign in</h1>
        <label htmlFor="">Email Address</label>
        <input
          name="emailAddress"
          type="text"
          placeholder="johndoe"
          onChange={handleChange}
        />
        {err?.emailAddress ? (
          <span className="errorSpan">{err.emailAddress}</span>
        ) : (
          <p>
            <br />
          </p>
        )}

        <label htmlFor="">Password</label>
        <input name="password" type="password" onChange={handleChange} />
        {err?.password ? (
          <span className="errorSpan">{err.password}</span>
        ) : (
          <p>
            <br />
          </p>
        )}
        <button type="button" onClick={handleSubmit} disabled={loading}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
