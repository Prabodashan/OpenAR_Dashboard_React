import React, { useEffect, useState } from "react";

import "./newItem.scss";
import useAxios from "../../libraries/axios";
import { toast } from "sonner";
import { API_URLS } from "../../configs/api.urls";
import UseAuth from "../../hooks/UseAuth";
import { useNavigate } from "react-router-dom";

const NewItem = () => {
  const navigate = useNavigate();

  const { auth } = UseAuth();

  const [inputs, setInputs] = useState({
    name: "",
    description: "",
    file: "",
    collectionId: "",
  });

  const [collectionData, setCollectionData] = useState([]);

  const [err, setError] = useState(null);

  const { loading, fetchData } = useAxios();

  const getCollection = async () => {
    const response = await fetchData({
      url: API_URLS.GET_ALL_COLLECTION_URL,
      method: "GET",
      requestConfig: {
        "content-type": "application/json",
        token: "Bearer " + auth.accessToken,
      },
    });

    if (response?.status) {
      setCollectionData(response.collection);
    }
  };
  useEffect(() => {
    getCollection();
  }, []);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = (values) => {
    const errors = {};
    setError(null);

    if (!values.name) {
      errors.name = "Name is required!";
    }
    if (!values.collectionId) {
      errors.collectionId = "Collection Id is required!";
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
      url: API_URLS.CREATE_ITEM_URL,
      method: "POST",
      data: inputs,
      requestConfig: {
        "content-type": "application/json",
        token: "Bearer " + auth.accessToken,
      },
    });

    if (!response.status) {
      return toast.error(response.error.message);
    }
    toast.success(response.success.message);
    navigate("/item", { replace: true });
  };

  return (
    <div className="newItem">
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
                type="email"
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
            <div className="formInput">
              <label>collection Name</label>
              <div className="select-container">
                <select name="collectionId" onChange={handleChange}>
                  <option value=""></option>
                  {collectionData.map((data) => (
                    <option key={data._id} value={data._id}>
                      {data.name}
                    </option>
                  ))}
                </select>
              </div>
              {err?.collectionId ? (
                <span className="errorSpan">{err.collectionId}</span>
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

export default NewItem;
