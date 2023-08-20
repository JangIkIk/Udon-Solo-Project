import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface groupKeepListType {
    user: {
    userId: string | null,
    userKeepGroup: number[],
    userJoinGroup: number[]
    }
}
const initialState: groupKeepListType = {
    user: { userId: null, userKeepGroup: [], userJoinGroup: []}
}
const userInfo = createSlice({
    name: "userInfo",
    initialState,
    reducers:{
        userId: (state, action: PayloadAction<string>) => {
            state.user = { ...state.user, userId: action.payload };
        },
        userGroup: (state, action: PayloadAction<{groupType: "userKeepGroup" | "userJoinGroup", groupId: number[]}>)=>{
            const {groupType, groupId} = action.payload;
            const newGroup = [...state.user[groupType], ...groupId];
            state.user[groupType] = newGroup;
        },
        userGroupAdd: (state, action: PayloadAction<{groupType: "userKeepGroup" | "userJoinGroup", groupId: number}>)=>{
            const {groupType, groupId} = action.payload;
            const newGroup = [...state.user[groupType], groupId];
            state.user[groupType] = newGroup;
        },
        userGroupDelete: (state, action: PayloadAction<{groupType: "userKeepGroup" | "userJoinGroup", groupId: number}>)=>{
            const {groupType, groupId} = action.payload;
            const newGroup: number[] | null = state.user[groupType]?.filter(( user ) => user !== groupId) || null;
            state.user[groupType] = newGroup;
        }
    }
})
export const { userId, userGroup, userGroupAdd, userGroupDelete } = userInfo.actions;
export default userInfo.reducer;
