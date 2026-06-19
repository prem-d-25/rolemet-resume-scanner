import api from "./axios";

export const profileApi = () =>
  api.get("/user/profile").then((res) => res.data);

export const editProfileApi = (formData) =>
  api
    .post("/user/edit-profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);
