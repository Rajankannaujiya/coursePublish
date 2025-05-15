import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from './features/userSlice'
import instructorReducer from './features/instructor'
import popupReducer  from './features/popup'


export const makeStore = () => {
  return configureStore({
    reducer: {
        user: userReducer,
        instructor:instructorReducer,
        popup:popupReducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false
      }),
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']