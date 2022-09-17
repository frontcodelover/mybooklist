import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BOOKS_BY_ID } from "../../services/api/googleBooks";

export const getBook = createAsyncThunk(
    "book/getBook",
    async ({ bookid }) => {
        const response = await fetch(`${BOOKS_BY_ID}${bookid}`);
        const data = await response.json();
        return data;
    }
);


const bookSlice = createSlice({
    name: "book",
    initialState: {
        list: [],
        status: null,
    },
    reducers: {},
    extraReducers: {
        [getBook.pending]: (state, action) => {
            state.status = "loading";
        },
        [getBook.fulfilled]: (state, action) => {
            state.status = "success";
            state.list = action.payload;
        },
        [getBook.rejected]: (state, action) => {
            state.status = "failed";
        },
    },
});

export default bookSlice.reducer;
