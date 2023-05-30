import { createSlice } from '@reduxjs/toolkit'

interface IInitialState {
  example: string
}

const initialState: IInitialState = {
  example: '',
}

export const trackerSlice = createSlice({
  name: 'tracker',
  initialState,
  reducers: {
    setExample: (state, action) => {
      state.example = action.payload
    },
  },
})

export const trackerActions = trackerSlice.actions
export const trackerReducer = trackerSlice.reducer
