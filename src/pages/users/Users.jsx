import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { DataGrid } from "@mui/x-data-grid";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

import { userColumns, userRows } from "../../data/datatablesource";
import "./users.scss";
// import axios from "../../configs/axios";
import { API_URLS } from "../../configs/api.urls";
import UseAuth from "./../../hooks/UseAuth";
import useAxios from "./../../libraries/axios";
import { toast } from "sonner";

const Users = () => {
  const { auth } = UseAuth();
  const [userData, setUserData] = useState();

  const { error, loading, fetchData } = useAxios();

  const getUsers = async () => {
    const response = await fetchData({
      url: API_URLS.GET_ALL_USER_URL,
      method: "GET",
      requestConfig: {
        "content-type": "application/json",
        token: "Bearer " + auth.accessToken,
      },
    });

    if (response?.status) {
      setUserData(response.user);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);

  const rows = useMemo(
    () => userData?.map((row) => ({ ...row, id: row._id })),
    [userData]
  );

  const handleDelete = (id) => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to delete user.",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            const response = await fetchData({
              url: API_URLS.DELETE_USER_BY_ID_URL + `/${id}`,
              method: "DELETE",
              requestConfig: {
                "content-type": "application/json",
                token: "Bearer " + auth.accessToken,
              },
            });

            console.log(response);

            if (!response.status) {
              return toast.error(response.error.message);
            }
            toast.success(response.success.message);
            getUsers();
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
              to={`/users/${params.row.id}`}
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
    <div className="users">
      <div className="titlebar">
        Add New User
        <Link to="/users/new" className="link">
          Add New
        </Link>
      </div>
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <DataGrid
          className="datagrid"
          rows={rows}
          columns={userColumns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
        />
      )}
    </div>
  );
};

export default Users;
