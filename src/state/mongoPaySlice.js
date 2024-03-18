import { createSlice } from '@reduxjs/toolkit'


const payState = {
  currentData:null,
  error:null
}

  export const paymongoCheckoutDetails = createSlice({
    name: 'paymongo',
    payState,
    reducers:{
        saveData: (state,action) => {
          state.currentData = action.payload
        },
        deleteData: (state) => {
          state.currentData = null

        }
    }
  })

  export const { saveData, deleteData} = paymongoCheckoutDetails.actions


export default paymongoCheckoutDetails.reducer