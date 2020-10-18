import axios from "axios";
import create from "zustand";

const develop = "http://34.71.45.121";

const INIT_USER = {
  loadingProfile: false,
  isAuthenticated: false,
  name: "",
  email: "",
  password: "",
  storeID: "",
  location: "",
  token: "",
  stores: [],
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
  login: (state) => login(set, state, get),
  logout: (state) => logout(set, state),
  register: (input) => registerUser(set, input),
  setLoading: (input) => set({ loading: input }),
  setError: (input) => set({ error: input }),
  getStores: (input) => getStores(set, input),
  setStores: (newS) => set({ stores: newS }),
  getItems: (input) => getItems(set, input),
  addItem: (newItem) => addItem(set, newItem),
}));

//REQUESTS
//REGISTER NEW USER
const registerUser = async (set, profile) => {
  set({ loadingProfile: true });
  var userData = {
    name: profile.name,
    cred: {
      email: profile.email,
      password: profile.password,
    },
    location: profile.location,
  };
  console.log("data ", userData);
  try {
    const response = await axios.post(`${develop}/users/register`, userData);
    set({ token: response.data.id, isAuthenticated: true });
  } catch (err) {
    console.log(err);
  }
  set({ loadingProfile: false });
};

//LOGIN
const login = async (set, user) => {
  set({ loadingProfile: true });
  var userData = {
    email: user.email,
    password: user.password,
  };
  console.log("userdata ", userData);
  try {
    let response = await axios.post(`${develop}/users/login`, userData);
    console.log("response token", response.data.id);
    set({ token: response.data.id, isAuthenticated: true });

    await axios
      .post(`${develop}/users/personal`, userData, {
        headers: { Authorization: "Bearer " + response.data.id },
      })
      .then((res) => {
        console.log("response data", res.data);
        set(res.data);
      });
  } catch (error) {
    console.log("Error ", error);
  }
  set({ loadingProfile: false });
};

//LOGOUT
const logout = async (set) => {
  set({ ...INIT_USER, isAuthenticated: false });
};

//GET STORES IDS
const getStores = async (set, token) => {
  console.log("CALLING GETSTORES");
  console.log("TKN", token);
  await axios
    .get(`${develop}/stores`, {
      headers: { Authorization: "Bearer " + token },
    })
    .then((res) => {
      console.log("stores from response", res);
      set(res.data);
    })
    .catch((err) => {
      console.log("Error ", err);
      set({ error: err });
    });
};

const getItems = async (set, logins) => {
  console.log("TOLEM", logins.token, "ID", logins.id);
  await axios
    .get(`${develop}/stores/getItems?id=${logins.id}`, {
      headers: { Authorization: "Bearer " + logins.token },
    })
    .then((res) => {
      console.log("items from response", res);

      set({ items: res.data.items });
    })
    .catch((err) => {
      console.log(err);
    });
};

const addItem = async (set, info) => {
  console.log("INFO SENT", info);
  let newPost = {
    name: info.name,
    price: info.price,
  };
  await axios
    .post(`${develop}/stores/addItem`, newPost, {
      headers: { Authorization: "Bearer " + info.token },
    })
    .then((res) => {
      console.log("items from adding item", res);
      set({ items: res.data.items });
    })
    .catch((err) => {
      console.log(err);
    });
};
