import api from "./axios";

export const profileApi = () =>
  api.get("/user/profile")
     .then((res) => res.data);
