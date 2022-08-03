import createContext from "zustand/context";
import create from "zustand";
import { devtools } from "zustand/middleware";

export const { Provider, useStore } = createContext();

export const userStore = () =>
  create(
    devtools((set) => ({
      firstName: "",
      lastName: "",
      email: "",
      username: "",

      updateEmail: (email) => set({ email: email }),
      updateFirstName: (firstName) => set({ firstName: firstName }),
      updateLastName: (lastName) => set({ lastName: lastName }),
      updateUsername: (username) => set({ username: username }),
    }))
  );
