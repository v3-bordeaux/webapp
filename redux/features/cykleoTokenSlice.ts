import {createSlice, PayloadAction} from '@reduxjs/toolkit'

const LOCAL_STORAGE_ITEM = 'v3-cykleo-token';

type CykleoTokenState = {
    value: string | null;
};

const initialState = {
    value: null
} as CykleoTokenState;

export const cykleoToken = createSlice({
    name: 'cykleoToken',
    initialState,
    reducers: {
        setToken: (state: CykleoTokenState, action: PayloadAction<string>) => {
            state.value = action.payload
            localStorage.setItem(LOCAL_STORAGE_ITEM, JSON.stringify(action.payload));
        },

        loadFromLocalStorage: (state: CykleoTokenState) => {
            const item = localStorage.getItem(LOCAL_STORAGE_ITEM);
            try {
                state.value = JSON.parse(item)
            } catch (e) {
                console.warn('Unable to recover token from localStorage')
            }
        },

        invalidateToken: (state: CykleoTokenState) => {
            state.value = null;
            localStorage.removeItem(LOCAL_STORAGE_ITEM);
        }
    }
})

export const {
    setToken,
    loadFromLocalStorage,
    invalidateToken,
} = cykleoToken.actions
export default cykleoToken.reducer