import { create } from "zustand";

const useAuthStore = create((set) => ({
  accessToken: null,
  user: null,
  isInitializing: true,

  setAuth: ({ accessToken, user }) =>
    set({
      accessToken,
      user,
    }),

  setAccessToken: ({ accessToken}) =>
    set({accessToken}),

  setInitializing: (value) =>
    set({isInitializing: value}),

  logout: () =>
    set({
      accessToken: null,
      user: null,
      isInitializing: false
    }),
}));

export default useAuthStore;
