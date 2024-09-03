import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Table from "../../components/table/Table";

import "./singleItem.scss";
import { API_URLS } from "../../configs/api.urls";
import useAxios from "../../hooks/axios";

const SingleItem = () => {
  const location = useLocation();
  const itemId = location.pathname.split("/")[2];

  const [itemData, setItemData] = useState();

  const { loading, fetchData } = useAxios();

  const getCollection = async () => {
    const response = await fetchData({
      url: API_URLS.GET_ITEM_BY_ID_URL + `/${itemId}`,
      method: "GET",
    });

    if (response?.status) {
      setItemData(response.item);
    }
  };
  useEffect(() => {
    getCollection();
  }, []);

  return (
    <div className="singleItem">
      <div className="top">
        <div className="left">
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
                  <span className="itemKey">Collection:</span>
                  <span className="itemValue">{itemData.collectionName}</span>
                </div>
              </div>
              {itemData.devId ? (
                <div className="details">
                  <div className="detailItem">
                      <span className="itemKey">Developer Name:</span>

                    <span className="itemValue">{itemData.devFullName}</span>
                  </div>
                  <div className="detailItem">
                      <span className="itemKey">Developer Email:</span>

                    <span className="itemValue">
                      {itemData.devEmailAddress}
                    </span>
                  </div>
                  <div className="detailItem">
                      <span className="itemKey">Developer Phone Number:</span>

                    <span className="itemValue">{itemData.devPhoneNumber}</span>
                  </div>
                </div>
              ) : (
                <div className="details">
                  <div className="detailItem">
                    <span className="itemKey">Developer not assgin</span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      {/* <div className="bottom"></div> */}
    </div>
  );
};

export default SingleItem;
