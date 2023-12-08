import { createSlice } from '@reduxjs/toolkit'

export const updateSlice = createSlice({
  name: 'update',
  initialState: {
    value: false,
  },
  reducers: {
    change: (state) => {
      state.value = !state.value;
    },
  },
})

// Action creators are generated for each case reducer function
export const { change } = updateSlice.actions

export default updateSlice.reducer