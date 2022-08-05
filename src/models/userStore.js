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

      updateEmail: (email) => set((state) => ({ email: email })),
      updateName: (firstName) => set((state) => ({ firstName: firstName })),
      updateUsername: (username) => set((state) => ({ username: username })),
      updateLastName: (lastName) => set((state) => ({ lastName: lastName })),
    }))
  );
