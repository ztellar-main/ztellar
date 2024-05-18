import { createSlice } from "@reduxjs/toolkit";

interface State {
  currentUser: any;
  loading: any;
  error: any;
  token: any;
  paymongo: any;
}

const initialState: State = {
  currentUser: null,
  loading: false,
  error: false,
  token: null,
  paymongo: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    loginFailed: (state) => {
      state.loading = false;
      state.error = true;
    },

    token: (state, action) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
      state.token = null;
      state.loading = false;
      state.error = false;
    },
    paymongoId: (state, action) => {
      state.loading = false;
      state.paymongo = action.payload;
    },
    paymongoIdClear: (state) => {
      state.loading = false;
      state.paymongo = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailed,
  logout,
  token,
  paymongoId,
  paymongoIdClear,
} = userSlice.actions;

export default userSlice.reducer;
