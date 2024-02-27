import { createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: "auth",
  storage,
};

const initialState = {
  token: "",
  email: "",
  user: {},
  searchUser: {},
};

export const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addToken: (state, { payload }) => {
      state.token = payload;
    },
    addEmail: (state, { payload }) => {
      state.email = payload;
    },
    addUser: (state, { payload }) => {
      state.user = payload;
    },
    addSearchUser: (state, { payload }) => {
      state.searchUser = payload;
    },
    emptySearchUser: (state) => {
      state.user = {};
    },
    emptyUser: (state) => {
      state.user = {};
    },
    emptyToken: (state) => {
      state.token = "";
    },
    emptyEmail: (state) => {
      state.email = "";
    },
  },
});

// export const slice = createSlice({
// 	name: "auth",
// 	initialState,
// 	reducers: {
// 		addToken: (state, { payload }) => {
// 			state.token = payload
// 		},
// 		addEmail: (state, { payload }) => {
// 			state.email = payload
// 		},
// 		emptyToken: (state) => {
// 			state.token = {}
// 		},
// 		emptyEmail: (state) => {
// 			state.email = ""
// 		}
// 	}
// })

export const {
  addToken,
  addEmail,
  emptyToken,
  emptyEmail,
  addUser,
  emptyUser,
} = slice.actions;

export const authPersistReducer = persistReducer(persistConfig, slice.reducer);
