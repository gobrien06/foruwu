import create from "zustand";

export const useAuthState = create((set) => ({}));

export const usePurchaserStore = create((set) => ({}));

export const useUserStore = create((set) => ({
  loggedIn: false,
  loadingProfile: false,
  profile:{
      name:'',
      storeID:'',
      location:'',
  },
  store:'', // storeID is given
}));

export const setMarketStore = create((set)=>({
    stores:[
        //userid
        //list of items
    ],
}));