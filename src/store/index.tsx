import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { trackerSlice } from './tracker/tracker.slice'

const rootReducer = combineReducers({
  tracker: trackerSlice.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
