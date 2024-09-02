import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import "./singleIDevtem.scss";
import { API_URLS } from "../../configs/api.urls";
import useAxios from "../../hooks/axios";

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import axios from "axios";
import { toast } from "sonner";

const SingleIDevtem = () => {
  const location = useLocation();
  const itemId = location.pathname.split("/")[2];

  const [itemData, setItemData] = useState();
  const [inputs, setInputs] = useState({
    status: "created",
  });

  const { loading, fetchData } = useAxios();

  const [file, setFile] = useState("");
  const [progress, setProgress] = useState(0);

  const getItem = async () => {
    const response = await fetchData({
      url: API_URLS.GET_ITEM_BY_ID_URL + `/${itemId}`,
      method: "GET",
    });

    if (response?.status) {
      setItemData(response.item);
    }
  };

  const downloadFile = async () => {
    const url = API_URLS.FILE_DOWNLOAD_URL + `?filePath=${itemData.file}`; // Replace with your URL
    window.open(url, "_blank"); // Opens the URL in a new tab/window
  };
  useEffect(() => {
    getItem();
  }, []);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    // const formData = new FormData();
    // formData.append("file", file);

    // const fileResponse = await axios.post(API_URLS.FILE_UPLOAD_URL, formData, {
    //   onUploadProgress: (progressEvent) => {
    //     const percentCompleted = Math.round(
    //       (progressEvent.loaded * 100) / progressEvent.total
    //     );
    //     setProgress(percentCompleted);
    //     console.log(percentCompleted);
    //   },
    // });

    const response = await fetchData({
      url: API_URLS.UPDATE_ITEM_BY_ID_URL + `/${itemData._id}`,
      method: "PUT",
      data: inputs,
    });

    console.log(response);

    if (!response.status) {
      return toast.error(response.error.message);
    }
    toast.success(response.success.message);
  };

  return (
    <div className="singleDevItem">
      <div className="top">
        <div className="left">
          <div className="editButton">Edit</div>
          <h1 className="title">Information</h1>
          {loading ? (
            <h2>Loading...</h2>
          ) : itemData ? (
            <div className="item">
              <img
                src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{itemData.name}</h1>
                <div className="detailItem">
                  <span className="itemKey">Description:</span>
                  <span className="itemValue">{itemData.description}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">User Name:</span>
                  <span className="itemValue">{itemData.fullName}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">User Email:</span>
                  <span className="itemValue">{itemData.emailAddress}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">User Phonenumber:</span>
                  <span className="itemValue">{itemData.phoneNumber}</span>
                </div>
                <div className="detailItem">
                  <button onClick={downloadFile}>Download</button>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      {!loading ? (
        <div className="bottom">
          <h1 className="title">Status Update</h1>
          <form>
            <div className="formInput">
              <label>Status</label>
              <div className="select-container">
                <select name="status" onChange={handleChange}>
                  <option value="">{itemData?.status}</option>
                  <option value="pending">Pending</option>
                  <option value="review">Review</option>
                </select>
              </div>
              {/* {err?.collectionId ? (
                <span className="errorSpan">{err.collectionId}</span>
              ) : (
                <p>
                  <br />
                </p>
              )} */}
            </div>
            {inputs.status.toString() == "review" ? (
              <div className="formInput">
                <label htmlFor="file">
                  File: <DriveFolderUploadOutlinedIcon className="icon" />{" "}
                  <span>{file.name}</span>
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
                {progress > 0 ? (
                  <div className="progress-bg">
                    <div
                      className="progress"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
            ) : (
              ""
            )}

            <button onClick={handleUpdate}>Submit</button>
          </form>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default SingleIDevtem;
