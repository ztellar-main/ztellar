import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser:null,
    loading:false,
    error:false,
    paymongo:null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
          loginStart: (state) => {
            state.loading = true
          },
          loginSuccess: (state,action) => {
            state.loading = false
            state.currentUser= action.payload
          },
          loginFailed: (state) => {
            state.loading = false
            state.error = true
          },
          logout: (state) => {
            state.currentUser= null
            state.loading= false
            state.error=false
          },
          paymongoId:(state,action) => {
            state.loading = false
            state.paymongo= action.payload
          },
          paymongoIdClear:(state,action) => {
            state.loading = false
            state.paymongo= action.payload
          },
    },
  })



  export const { loginStart, loginSuccess, loginFailed, logout, paymongoId,paymongoIdClear} = userSlice.actions

export default userSlice.reducer