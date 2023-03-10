import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    topicId: null,
    topicName: null,
};

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setTopicId: (state, action) => {
            state.app += action.payload;
        },
    },
});


export const { setTopicId } = appSlice.actions;

export const selectTopicId = (state) => state.topic.topicId;
export const selectTopicName = (state) => state.topic.topicName;

export default appSlice.reducer;
