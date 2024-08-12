export const API_URLS = {
  LOGIN_URL: "users/login",
  CREATE_USER_URL: "users/create",
  REFRESH_TOKEN_URL: "usertokens/access/generate",
  GET_ALL_USER_URL: "users/all",
  GET_USER_BY_ID_URL: "users",
  DELETE_USER_BY_ID_URL: "users",
  FORGET_PASSWORD_URL: "users/forget-password",
  RESET_PASSWORD_URL: "users/reset-password",

  CREATE_COLLECTION_URL: "collection/create",
  GET_ALL_COLLECTION_URL: "collection/all",
  GET_COLLECTION_BY_ID_URL: "collection",
  DELETE_COLLECTION_BY_ID_URL: "collection",

  CREATE_ITEM_URL: "item/create",
  GET_ALL_ITEM_URL: "item/all",
  GET_ALL_ITEM_BY_COLLECTION_ID_URL: "item/collection",
  GET_ITEM_BY_ID_URL: "item",
  DELETE_ITEM_BY_ID_URL: "item",

  FILE_UPLOAD_URL: "http://localhost:3301/api/file/upload?folderName=zip",
};
