import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface initialStateType {
    searchText: string;
    searchFilter: string[]
}

const initialState: initialStateType = {
    searchText: "",
    searchFilter: [],
}

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setSearchText: (state, action: PayloadAction<string>)=>{
            state.searchText = action.payload;
        },
        setSearchFilter: (state, action: PayloadAction<string[]>)=>{
            state.searchFilter = action.payload;
        },
    }
})

export const { setSearchText, setSearchFilter } = searchSlice.actions;
export default searchSlice.reducer;