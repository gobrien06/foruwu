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
  token: "",
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
      id:`321AAA`
    },
    {
      name: "Smooth Groove",
      id:`32BAAA`
    },
  ],
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
  login: (state) => login(set, state),
  logout: (state) => logout(set, state),
  register: (state) => registerUser(set, state),
  setLoading: (input) => set({ loading: input }),
  setError: (input) => set({ error: input }),
}));

export const useMarketsStore = create((set, get) => ({
  ...INIT_MARKET,
  getStores: (state) => getStores(set, state),
  setStores: (newS) => set({stores:newS}),
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
  console.log("data " + userData);
  await axios
    .post(`${develop}/users/register`, userData)
    .then((res) => {
      console.log(JSON.stringify(res));
      let tokenNew = res.id;
      console.log("token " + tokenNew);
      set({ token: tokenNew });
    })
    .catch((err) => {
      console.log("Error ", err);
      set({ error: err });
    });

  if (profile.token && profile.token.length > 1) set({ isAuthenticated: true });
  set({error:"Incorrect credentials. Please try again."});
};

const login = async (set, user) => {
  if (user.token && user.token.length > 1) set({ isAuthenticated: true });
  set({ loadingProfile: true });
  var userData = {
    email: user.email,
    password: user.password,
  };
  console.log("got the userdate as ", userData);
  await axios
    .post(`${develop}/users/login`, userData)
    .then(async(res) => {
      console.log("response " + JSON.stringify(res.data.id));
      await set({ token: res.data.id });
    })
    .catch((err) => {
      console.log("Error ", err);
      set({ error: err });
    });
  console.log("usrtkn" + user.token);
  if (user.token && user.token.length > 1) set({ isAuthenticated: true });
  set({ loadingProfile: false });
};

const logout = async (set, user) => {
  set({ token: "", isAuthenticated: false });
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


const addItem = async(set,USER) =>{
  if (!USER || !USER.token) return [];
}