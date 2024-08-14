import React, { useState } from "react";

import "./newUser.scss";
import useAxios from "../../hooks/axios";
import { toast } from "sonner";
import { API_URLS } from "../../configs/api.urls";

import { useNavigate } from "react-router-dom";

const NewUser = () => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    fullName: "",
    emailAddress: "",
    phoneNumber: "",
    password: "",
    userType: "user",
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

    if (!values.fullName) {
      errors.fullName = "Full Name is required!";
    }
    if (!values.password) {
      errors.password = "Password is required!";
    }
    if (!values.userType) {
      errors.userType = "UserType is required!";
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
      url: API_URLS.CREATE_USER_URL,
      method: "POST",
      data: inputs,
    });

    if (!response.status) {
      return toast.error(response.error.message);
    }
    toast.success(response.success.message);
    navigate("/users", { replace: true });
  };

  return (
    <div className="newUser">
      <div className="top">
        <h1>Add New User</h1>
      </div>
      <div className="bottom">
        <div className="left">
          <img
            src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
            alt=""
          />
        </div>
        <div className="right">
          <form>
            <div className="formInput">
              <label>Full Name</label>
              <input
                name="fullName"
                type="text"
                placeholder="john doe"
                onChange={handleChange}
              />
              {err?.fullName ? (
                <span className="errorSpan">{err.fullName}</span>
              ) : (
                <p>
                  <br />
                </p>
              )}
            </div>
            <div className="formInput">
              <label>Email Address</label>
              <input
                name="emailAddress"
                type="email"
                placeholder="john_doe@gmail.com"
                onChange={handleChange}
              />
              {err?.emailAddress ? (
                <span className="errorSpan">{err.emailAddress}</span>
              ) : (
                <p>
                  <br />
                </p>
              )}
            </div>
            <div className="formInput">
              <label>Phone</label>
              <input
                name="phoneNumber"
                type="text"
                placeholder="+1 234 567 89"
                onChange={handleChange}
              />
              {err?.phoneNumber ? (
                <span className="errorSpan">{err.phoneNumber}</span>
              ) : (
                <p>
                  <br />
                </p>
              )}
            </div>
            <div className="formInput">
              <label>Password</label>
              <input name="password" type="Password" onChange={handleChange} />
              {err?.password ? (
                <span className="errorSpan">{err.password}</span>
              ) : (
                <p>
                  <br />
                </p>
              )}
            </div>
            <div className="formInput">
              <label>User Type</label>
              <div className="select-container">
                <select
                  name="userType"
                  onChange={handleChange}
                  defaultValue="user"
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                  <option value="dev">Developer</option>
                </select>
              </div>
              {err?.userType ? (
                <span className="errorSpan">{err.userType}</span>
              ) : (
                <p>
                  <br />
                </p>
              )}
            </div>

            <button onClick={handleSubmit} disabled={loading}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewUser;
