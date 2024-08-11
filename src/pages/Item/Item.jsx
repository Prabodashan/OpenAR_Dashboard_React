import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { DataGrid } from "@mui/x-data-grid";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

import { ItemColumns } from "../../data/datatablesource";
import "./item.scss";
import { API_URLS } from "../../configs/api.urls";
import UseAuth from "../../hooks/UseAuth";
import useAxios from "../../libraries/axios";
import { toast } from "sonner";

const Item = () => {
  const { auth } = UseAuth();
  const [itemData, setItemData] = useState();

  const { loading, fetchData } = useAxios();

  const getItem = async () => {
    const response = await fetchData({
      url: API_URLS.GET_ALL_ITEM_URL,
      method: "GET",
      requestConfig: {
        "content-type": "application/json",
        token: "Bearer " + auth.accessToken,
      },
    });

    if (response?.status) {
      setItemData(response.item);
    }
  };
  useEffect(() => {
    getItem();
  }, []);

  const rows = useMemo(
    () => itemData?.map((row) => ({ ...row, id: row._id })),
    [itemData]
  );

  const handleDelete = (id) => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to delete item.",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            const response = await fetchData({
              url: API_URLS.DELETE_ITEM_BY_ID_URL + `/${id}`,
              method: "DELETE",
              requestConfig: {
                "content-type": "application/json",
                token: "Bearer " + auth.accessToken,
              },
            });

            if (!response.status) {
              return toast.error(response.error.message);
            }
            toast.success(response.success.message);
            getItem();
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
              to={`/item/${params.row.id}`}
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
    <div className="items">
      <div className="titlebar">
        Add New Item
        <Link to="/item/new" className="link">
          Add New
        </Link>
      </div>
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
  );
};

export default Item;
