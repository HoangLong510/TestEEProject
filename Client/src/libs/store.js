import { configureStore } from '@reduxjs/toolkit'
import loadingReducer from './features/loading/loadingSlice'
import popupReducer from './features/popup/popupSlice'

export const store = configureStore({
    reducer: {
        loading: loadingReducer,
        popup: popupReducer,
    },
})