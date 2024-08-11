import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Table from "../../components/table/Table";

import "./singleCollection.scss";
import { API_URLS } from "../../configs/api.urls";
import useAxios from "../../libraries/axios";
import UseAuth from "../../hooks/UseAuth";

const SingleCollection = () => {
  const { auth } = UseAuth();

  const location = useLocation();
  const collectionId = location.pathname.split("/")[2];

  const [collectionData, setCollectionData] = useState();

  const { loading, fetchData } = useAxios();

  const getCollection = async () => {
    console.log(API_URLS.GET_COLLECTION_BY_ID_URL);

    const response = await fetchData({
      url: API_URLS.GET_COLLECTION_BY_ID_URL + `/${collectionId}`,
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

  return (
    <div className="singleCollection">
      <div className="top">
        <div className="left">
          <div className="editButton">Edit</div>
          <h1 className="title">Information</h1>
          {collectionData ? (
            <div className="item">
              <img
                src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{collectionData.name}</h1>
                <div className="detailItem">
                  <span className="itemKey">Description:</span>
                  <span className="itemValue">
                    {collectionData.description}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="bottom">
        <h1 className="title">Last Transactions</h1>
        <Table />
      </div>
    </div>
  );
};

export default SingleCollection;
