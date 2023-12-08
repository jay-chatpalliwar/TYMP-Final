import { createSlice } from '@reduxjs/toolkit'

export const replySlice = createSlice({
  name: 'reply',
  initialState: {
    value: false,
    data :{}
  },
  reducers: {
    change: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.
      state.value = !state.value;
    },
    changeData :(state,data) => {
      state.data = data;
    }
  },
})

// Action creators are generated for each case reducer function
export const { change ,changeData } = replySlice.actions

export default replySlice.reducer