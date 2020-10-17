import axios from "axios";
import create from "zustand";


export const useAuthStore = create((set) => ({
  isAuthenticated: false,
}));

export const useUserStore = create((set) => ({
  loggedIn: false,
  loadingProfile: false,
  profile: {
    name: "",
    storeID: "",
    location: "",
  },
  store: "", // storeID is given
  error: "",
  
  setLoading: (input) => set({ loggedIn: input }),
}));

export const setMarketStore = create((set) => ({
  stores: [
    //userid
    //list of items
  ],
}));
