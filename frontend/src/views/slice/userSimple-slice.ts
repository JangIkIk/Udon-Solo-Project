import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface userInfoType {
    user: {
    userId: string | null;
    userImage: string;
    userKeepGroup: number[];
    userJoinGroup: number[];
    userDayGroup: number[];
    }
}
const initialState: userInfoType = {
    user: { userId: null, userImage: `${process.env.PUBLIC_URL}/images/simple.png`, userKeepGroup: [], userJoinGroup: [], userDayGroup: []}
}
const userInfo = createSlice({
    name: "userInfo",
    initialState,
    reducers:{
        userId: (state, action: PayloadAction<string>) => {
            state.user = { ...state.user, userId: action.payload };
        },
        userImage: (state, action: PayloadAction<string>)=>{
            state.user = { ...state.user, userImage: action.payload};
        },
        
        userGroup: (state, action: PayloadAction<{groupType: "userKeepGroup" | "userJoinGroup" | "userDayGroup", groupId: number[]}>)=>{
            const {groupType, groupId} = action.payload;
            const newGroup = [...state.user[groupType], ...groupId];
            state.user[groupType] = newGroup;
        },
        userGroupAdd: (state, action: PayloadAction<{groupType: "userKeepGroup" | "userJoinGroup" | "userDayGroup", groupId: number}>)=>{
            const {groupType, groupId} = action.payload;
            const newGroup = [...state.user[groupType], groupId];
            state.user[groupType] = newGroup;
        },
        userGroupDelete: (state, action: PayloadAction<{groupType: "userKeepGroup" | "userJoinGroup" | "userDayGroup", groupId: number}>)=>{
            const {groupType, groupId} = action.payload;
            const newGroup: number[] | null = state.user[groupType]?.filter(( user ) => user !== groupId) || null;
            state.user[groupType] = newGroup;
        },
        userDayGroupAllDelete: (state, action: PayloadAction<{groupType: "userDayGroup", list: number[]}>) => {
            const {groupType, list} = action.payload;
            const newList = state.user[groupType].filter(value => !list.includes(value));
            state.user[groupType] = newList;
        }

    }
})
export const { userId, userGroup, userGroupAdd, userGroupDelete, userImage, userDayGroupAllDelete } = userInfo.actions;
export default userInfo.reducer;
