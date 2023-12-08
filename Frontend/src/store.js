import { configureStore } from '@reduxjs/toolkit'
import replyReducer from './Slices/replySlice'
import updateReducer from './Slices/updateSlice'
import nameReducer from './Slices/nameSlice'

export default configureStore({
  reducer: {
    reply : replyReducer,
    update :updateReducer,
    name:nameReducer
  },
})