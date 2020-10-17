import axios from "axios";
import create from "zustand";

const develop = "http://34.71.45.121";

const INIT_USER = {
  loadingProfile: false,
  isAuthenticated: true,
  name: "",
  email: "",
  password: "",
  storeID: "",
  location: "",
  store: "", // storeID is given
  error: "",
  register: "",
};

export const useUserStore = create((set, get) => ({
  ...INIT_USER,
  setForm: (input) =>
    set({
      name: input.name,
      email: input.email,
      password: input.password,
      location: input.location,
    }),
  login:(state)=>login(set,state),
  register: (state) => registerUser(set, state),
  setLoading: (input) => set({ loading: input }),
}));

export const setMarketStore = create((set, get) => ({
  stores: [
    //userid
    //list of items
  ],
}));

const registerUser = async (set, profile) => {
  var userData = {
    name: profile.name,
    email: profile.email,
    password: profile.password,
    location: profile.location,
  };
  await axios
    .get(`${develop}/users/signup`, userData)
    .then((res) => {
      let token = res.body.id;
      console.log("token " + token);
      set({ token: token });
      set({ isAuthenticated: true });
    })
    .catch((err) => {
      console.log("Error ", err);
      set({ error: err });
    });
};

const login = async(set,user)=>{
  if(user.token && user.token.length>1) set({isAuthenticated:true});
  set({loadingProfile:true});
  var userData = {
    email:user.email,
    password:user.password,
  }
  await axios
  .get(`${develop}/users/login`,userData)
  .then((res)=>{
    console.log("response " + res.body);
    set({user: res.body});
  })
  .catch((err)=>{
    console.log("Error ", err);
    set({ error: err });
  });
  set({loadingProfile:false});
}


const logout = async (set) => {};

const getStores = async (set) => {};
