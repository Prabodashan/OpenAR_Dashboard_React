import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { DataGrid } from "@mui/x-data-grid";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

import { DevItemColumns } from "../../data/datatablesource";
import "./devItem.scss";
import { API_URLS } from "../../configs/api.urls";

import useAxios from "../../hooks/axios";
const DevItem = () => {
  const [itemData, setItemData] = useState();

  const { loading, fetchData } = useAxios();

  const getItem = async () => {
    const response = await fetchData({
      url: API_URLS.GET_ALL_ITEM_URL,
      method: "GET",
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

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/dev/${params.row.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">View</div>
            </Link>
          </div>
        );
      },
    },
  ];

  return (
    <div className="devItem">
      <div className="titlebar">Item need to develop</div>
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <DataGrid
          className="datagrid"
          rows={rows}
          columns={DevItemColumns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
        />
      )}
    </div>
  );
};

export default DevItem;
