import {configureStore} from "@reduxjs/toolkit";
import userReducer from '../features/auth/userSlice'
import chooserReducer from '../features/form/chooserSlice'
import hitsReducer from '../features/hits/hitsSlice'
import {authApi} from "../features/auth/authApi";
import {hitsApi} from "../features/hits/hitsApi";
import {api} from "./api/api";
export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [hitsApi.reducerPath]: hitsApi.reducer,
        user: userReducer,
        chooser: chooserReducer,
        hits: hitsReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
})