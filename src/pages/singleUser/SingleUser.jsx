import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import "./singleUser.scss";
import { API_URLS } from "../../configs/api.urls";
import useAxios from "../../hooks/axios";

const SingleUser = () => {

  const location = useLocation();
  const userId = location.pathname.split("/")[2];

  const [userData, setUserData] = useState();

  const { loading, fetchData } = useAxios();

  const getUser = async () => {
    const response = await fetchData({
      url: API_URLS.GET_USER_BY_ID_URL + `/${userId}`,
      method: "GET",
    });

    if (response?.status) {
      setUserData(response.user);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="singleUser">
      <div className="top">
        <div className="left">
          <div className="editButton">Edit</div>
          <h1 className="title">Information</h1>
          {userData ? (
            <div className="item">
              <img
                src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{userData.fullName}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{userData.emailAddress}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">{userData.phoneNumber}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">User Type :</span>
                  <span className="itemValue">{userData.userType}</span>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      {/* <div className="bottom">
        <h1 className="title">Last Transactions</h1>
        <Table />
      </div> */}
    </div>
  );
};

export default SingleUser;
