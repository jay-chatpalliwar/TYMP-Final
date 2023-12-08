import { createSlice } from '@reduxjs/toolkit'

export const nameSlice = createSlice({
  name: 'reply',
  initialState: {
    name:""
  },
  reducers: {
    changeData :(state,data) => {
      state.name = data;
    }
  },
})

// Action creators are generated for each case reducer function
export const {changeData } = nameSlice.actions

export default nameSlice.reducer