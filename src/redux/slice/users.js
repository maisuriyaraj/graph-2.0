// slices/userSlice.js
import { getRequest } from "@/lib/api.service";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// api call
export const fetchUsers = createAsyncThunk(
    "users/getAllUsers",
    async (params, thunkApi) => {
        const { userID, BearerToken } = params;
        const response = await getRequest(`api/user/${userID}`, { 'Authorization': BearerToken });
        if (response.status == 201) {
            const data = await response.data.data;
            return data;
        }
    }
);

const initialState = {
    users: [],
    loading: false,
    value: 10,
};

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
    });

    builder.addCase(fetchUsers.pending, (state, action) => {
        state.loading = true;
    });

    builder.addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
    })
},
});

export default userSlice.reducer;