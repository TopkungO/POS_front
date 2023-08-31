import {  configureStore} from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook, } from "react-redux";
import appReducer from "../store/userSlice";

import {persistStore,persistReducer} from "redux-persist"
import storage from "redux-persist/lib/storage";


const persistConfig={
  key:"main-root",
  storage
}
const persistedReducer = persistReducer(persistConfig, appReducer);


export const store = configureStore({
  reducer: {
    persistedReducer,
  }, 
  

});

export const persistor = persistStore(store);

// export type of root state from reducers
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
//export const appSelector = (state:any) => state.appReducer;
