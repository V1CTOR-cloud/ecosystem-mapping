import createContext from "zustand/context";
import create from "zustand";

export const { Provider, useStore } = createContext();

export const userStore = () =>
  create((set) => ({
    firstName: "",
    lastName: "",
    email: "",
    username: "",

    updateEmail: (email) => set({ email: email }),
    updateFirstName: (firstName) => set({ firstName: firstName }),
    updateLastName: (lastName) => set({ lastName: lastName }),
    updateUsername: (username) => set({ username: username }),
  }));
