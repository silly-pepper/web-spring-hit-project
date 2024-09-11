import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    x: null,
    y: null,
    r: null
}

export const chooserSlice = createSlice({
    name: 'chooser',
    initialState,
    reducers: {
        setValue: (state, action) => {
            state[action.payload.name] = action.payload.value
        },
        resetForm: (state) => {
            state.x = null
            state.y = null
            state.r = null
        }
    }
})


export const {setValue, resetForm} = chooserSlice.actions
export default chooserSlice.reducer

export const selectChooserData = state =>state.chooser
export const selectR = state => state.chooser.r
export const selectX = state => state.chooser.x
export const selectY = state => state.chooser.y