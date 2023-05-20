import {createSlice} from '@reduxjs/toolkit'

const LOCAL_STORAGE_ITEM = 'v3-cycleo-token';

export const cycleoToken = createSlice({
    name: 'cycleoToken',
    initialState: {
        value: null
    },
    reducers: {
        setToken: (state, action) => {
            state.value = action.payload
            localStorage.setItem(LOCAL_STORAGE_ITEM, JSON.stringify(action.payload));
        },

        invalidToken: (state) => {
            state.value = null
            localStorage.removeItem(LOCAL_STORAGE_ITEM);
        }
    }
})

export const {
    setToken,
    invalidToken,
} = cycleoToken.actions
export default cycleoToken.reducer