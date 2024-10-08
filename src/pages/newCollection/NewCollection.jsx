import React, { useState } from "react";

import "./newCollection.scss";
import useAxios from "../../hooks/axios";
import { toast } from "sonner";
import { API_URLS } from "../../configs/api.urls";

import { useNavigate } from "react-router-dom";

const NewCollection = () => {
  const navigate = useNavigate();


  const [inputs, setInputs] = useState({
    name: "",
    description: "",
  });
  const [err, setError] = useState(null);

  const { error, loading, fetchData } = useAxios();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = (values) => {
    const errors = {};
    setError(null);

    if (!values.name) {
      errors.name = "Name is required!";
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
      url: API_URLS.CREATE_COLLECTION_URL,
      method: "POST",
      data: inputs,
    });

    if (!response.status) {
      return toast.error(response.error.message);
    }
    toast.success(response.success.message);
    navigate("/collection", { replace: true });
  };

  return (
    <div className="newCollection">
      <div className="top">
        <h1>Add New Collection</h1>
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
              <label>Name</label>
              <input
                name="name"
                type="text"
                placeholder="john doe"
                onChange={handleChange}
              />
              {err?.name ? (
                <span className="errorSpan">{err.name}</span>
              ) : (
                <p>
                  <br />
                </p>
              )}
            </div>
            <div className="formInput">
              <label>Description</label>
              <input
                name="description"
                type="text"
                placeholder="john_doe@gmail.com"
                onChange={handleChange}
              />
              {err?.description ? (
                <span className="errorSpan">{err.description}</span>
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

export default NewCollection;
