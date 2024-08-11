import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Table from "../../components/table/Table";

import "./singleItem.scss";
import { API_URLS } from "../../configs/api.urls";
import useAxios from "../../libraries/axios";
import UseAuth from "../../hooks/UseAuth";

const SingleItem = () => {
  const { auth } = UseAuth();

  const location = useLocation();
  const itemId = location.pathname.split("/")[2];

  const [itemData, setItemData] = useState();

  const { loading, fetchData } = useAxios();

  const getCollection = async () => {
    const response = await fetchData({
      url: API_URLS.GET_ITEM_BY_ID_URL + `/${itemId}`,
      method: "GET",
      requestConfig: {
        "content-type": "application/json",
        token: "Bearer " + auth.accessToken,
      },
    });

    console.log(response);
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
          <div className="editButton">Edit</div>
          <h1 className="title">Information</h1>
          {itemData ? (
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
