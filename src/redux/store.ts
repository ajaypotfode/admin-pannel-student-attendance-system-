import { configureStore } from "@reduxjs/toolkit";
import attendenceReducer from './slice/attendenceSlice';
import authReducer from './slice/authSlice';
import classReducer from './slice/classSlice';
import notificationReducer from './slice/notificationSlice';
import qrReducer from './slice/qrSlice';
import userReducer from './slice/userSlice';
import commonReducer from './slice/commonSlice';
import orgReducer from './slice/orgSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        attendance: attendenceReducer,
        classes: classReducer,
        notification: notificationReducer,
        qr: qrReducer,
        user: userReducer,
        common: commonReducer,
        org: orgReducer
    },
    // middleware: (defaultMiddlware) => {
    //     defaultMiddlware().concat()
    // }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch



export default store