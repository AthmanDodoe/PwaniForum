import { configureStore } from "@reduxjs/toolkit";
import topicReducer from "../features/topicSlice";
import userReducer from "../features/userSlice";
import appReducer from "../features/appSlice";

export const store = configureStore({
    reducer: {
        topic: topicReducer,
        user: userReducer,
        app: appReducer,
    },
});

