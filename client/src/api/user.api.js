import api from "./axios";

export const profileApi = () =>
  api.get("/user/profile")
     .then((res) => res.data);

export const editProfileApi = (payload) =>
  api.post("/user/edit-profile", payload)
     .then((res) => res.data);
