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

const INIT_MARKET = {
  stores: [
    {
      name: "Tim Doe",
      location: "United States",
      items: [],
    },
    {
      name: "Smooth Groove",
    },
  ],
}

export const useUserStore = create((set, get) => ({
  ...INIT_USER,
  setForm: (input) =>
    set({
      name: input.name,
      email: input.email,
      password: input.password,
      location: input.location,
    }),
  login: (state) => login(set, state),
  logout: (state) => logout(set, state),
  register: (state) => registerUser(set, state),
  setLoading: (input) => set({ loading: input }),
  setError: (input) => set({ error: input }),
}));

export const useMarketsStore = create((set,get) =>({
  ...INIT_MARKET,
  getStores: (state) => getStores(set, state),
}));

//REQUESTS
const registerUser = async (set, profile) => {
  var userData = {
    name: profile.name,
    cred: {
      email: profile.email,
      password: profile.password,
    },
    location: profile.location,
  };
  console.log(userData);
  await axios
    .post(`${develop}/users/register`, userData)
    .then((res) => {
      console.log(JSON.stringify(res));
      let token = res.data.id;
      console.log("token " + token);
      set({ token: token,isAuthenticated:true });
    })
    .catch((err) => {
      console.log("Error ", err);
      set({ error: err });
    });
};

const login = async (set, user) => {
  if (user.token && user.token.length > 1) set({ isAuthenticated: true });
  set({ loadingProfile: true });
  var userData = {
    email: user.email,
    password: user.password,
  };
  await axios
    .post(`${develop}/users/login`, userData)
    .then((res) => {
      console.log("response " + res.data);
      set({ user: res.data,isAuthenticated:true });
    })
    .catch((err) => {
      console.log("Error ", err);
      set({ error: err });
    });
  set({ loadingProfile: false });
};

const logout = async (set, user) => {
  set({token:'',isAuthenticated:false });
};

const getStores = async (set, USER) => {
  if (!USER || !USER.token) return [];
  await axios
    .post(`${develop}/stores`, USER.token)
    .then((res) => {
      console.log("stores from response", res.data);
      set(res.data.stores);
    })
    .catch((err) => {
      console.log("Error ", err);
      set({ error: err });
    });
  console.log("stores after request: ", USER.stores);
};
