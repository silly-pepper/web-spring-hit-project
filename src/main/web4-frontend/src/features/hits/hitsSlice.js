import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    currentPage: 0,
    size: 5
}
export const hitsSlice = createSlice({
    name: 'hits',
    initialState,
    reducers: {
        setCurrentPage: (state, action)=>{
            state.page=action.payload;
        },
        setSize: (state, action)=>{
            state.size = action.payload;
            state.page = 0;
        },
        incPage: (state) => {
            state.currentPage += 1
        },
        decPage: (state) => {
            state.currentPage -= 1
        }


    }
})

export const {setCurrentPage, setSize,incPage, decPage } = hitsSlice.actions;
export default hitsSlice.reducer;

export const selectCurrentPage = state => state.hits.currentPage
export const selectSize = state =>state.hits.size;