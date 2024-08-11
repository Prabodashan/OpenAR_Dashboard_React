import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import Table from "../../components/table/Table";

import "./singleCollection.scss";
import { API_URLS } from "../../configs/api.urls";
import useAxios from "../../libraries/axios";
import UseAuth from "../../hooks/UseAuth";
import { DataGrid } from "@mui/x-data-grid";
import { ItemColumns } from "../../data/datatablesource";

const SingleCollection = () => {
  const { auth } = UseAuth();

  const location = useLocation();
  const collectionId = location.pathname.split("/")[2];

  const [collectionData, setCollectionData] = useState();
  const [collectionItemData, setCollectionItemData] = useState();

  const { loading, fetchData } = useAxios();

  const getCollection = async () => {
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

  const getCollectionItems = async () => {
    const response = await fetchData({
      url: API_URLS.GET_ALL_ITEM_BY_COLLECTION_ID_URL + `/${collectionId}`,
      method: "GET",
      requestConfig: {
        "content-type": "application/json",
        token: "Bearer " + auth.accessToken,
      },
    });

    console.log(response);

    if (response?.status) {
      setCollectionItemData(response.item);
    }
  };
  useEffect(() => {
    getCollection();
    getCollectionItems();
  }, []);

  const rows = useMemo(
    () => collectionItemData?.map((row) => ({ ...row, id: row._id })),
    [collectionItemData]
  );

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/item/${params.row.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              // onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

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
        <h1 className="title">Collection Item Details</h1>
        {loading ? (
          <h2>Loading...</h2>
        ) : (
          <DataGrid
            className="datagrid"
            rows={rows}
            columns={ItemColumns.concat(actionColumn)}
            pageSize={9}
            rowsPerPageOptions={[9]}
            checkboxSelection
          />
        )}
      </div>
    </div>
  );
};

export default SingleCollection;
