// slices/userSlice.js
import useCookies from "@/hooks/useCookiesHook";
import { getRequest, postRequest, putRequest } from "@/utils/api.service";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/**
 * @description Slice for user registration
 */

export const handleSignUp = createAsyncThunk(
    "auth/handleSignUp",
    async (formData, thunkApi) => {
        try {
            const payload = {
                email: formData.email,
                password: formData.password,
            };
            const response = await postRequest("api/auth", payload);
            if (response?.data?.status) {
                // Return Api Response If Status is True
                return  response.data;
            } else {
                // Return an error message if the response is not successful
                return thunkApi.rejectWithValue(response?.data);
            }
        } catch (error) {
            // Handle errors
            return thunkApi.rejectWithValue(error.message);
        }
    }
);

const SignUpState = {
    loading: false,
    error: null,
    success: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState: SignUpState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(handleSignUp.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.apiResponse = action.payload;
            })
            .addCase(handleSignUp.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(handleSignUp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
            })
            .addDefaultCase((state = initialState) => state);

    },
});

export const authReducer = authSlice.reducer;

/**
 * @description Slice for User Login
 */

export const handleSignIn = createAsyncThunk(
    "auth/handleSignUp",
    async (formData, thunkApi) => {
        try {
            const payload = {
                email: formData.email,
                password: formData.password,
            };
            const response = await putRequest("api/auth", payload);
            if (response?.data?.status) {
                // Return Api Response If Status is True
                return  response.data;
            } else {
                // Return an error message if the response is not successful
                return thunkApi.rejectWithValue(response?.data);
            }
        } catch (error) {
            // Handle errors
            return thunkApi.rejectWithValue(error.message);
        }
    }
);

const SignInState = {
    loading: false,
    error: null,
    success: false,
};

const authLoginSlice = createSlice({
    name: "auth",
    initialState: SignInState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(handleSignUp.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.apiResponse = action.payload;
            })
            .addCase(handleSignUp.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(handleSignUp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
            })
            .addDefaultCase((state = initialState) => state);

    },
});

export const authLoginReducer = authLoginSlice.reducer;


/*
    Below Slice is For Fetch Logged User Details.
*/
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

export const userReducer = userSlice.reducer;