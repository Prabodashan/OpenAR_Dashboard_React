import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { DataGrid } from "@mui/x-data-grid";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

import { collectionColumns } from "../../data/datatablesource";
import "./collection.scss";
import { API_URLS } from "../../configs/api.urls";

import useAxios from "../../hooks/axios";
import { toast } from "sonner";

const Collection = () => {
  const [collectionData, setCollectionData] = useState();

  const { loading, fetchData } = useAxios();

  const getCollection = async () => {
    const response = await fetchData({
      url: API_URLS.GET_ALL_COLLECTION_URL,
      method: "GET",
    });

    if (response?.status) {
      setCollectionData(response.collection);
    }
  };
  useEffect(() => {
    getCollection();
  }, []);

  const rows = useMemo(
    () => collectionData?.map((row) => ({ ...row, id: row._id })),
    [collectionData]
  );

  const handleDelete = (id) => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to delete collection.",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            const response = await fetchData({
              url: API_URLS.DELETE_COLLECTION_BY_ID_URL + `/${id}`,
              method: "DELETE",
            });

            if (!response.status) {
              return toast.error(response.error.message);
            }
            toast.success(response.success.message);
            getCollection();
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/collection/${params.row.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="collection">
      <div className="titlebar">
        Add New Collection
        <Link to="/collection/new" className="link">
          Add New
        </Link>
      </div>
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <DataGrid
          className="datagrid"
          rows={rows}
          columns={collectionColumns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
        />
      )}
    </div>
  );
};

export default Collection;
