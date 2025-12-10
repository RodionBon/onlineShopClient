import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { UserService } from '~/services/userService';
import type { User } from '~/types';

interface UserState {
    userData: User | null;
    isLoading: boolean;
}

const initialState: UserState = {
    userData: null,
    isLoading: false,
}

export const getUser = createAsyncThunk('user/getUser', async (authToken: string, thunkAPI) => {
    try {
        const user = await UserService.getUser(authToken);
        return user;
    } catch (error) {
        thunkAPI.rejectWithValue('Ein Fehler beim Abrufen des Benutzers');
        console.error("Ein Fehler beim Laden des Benutzers:", error);
    }
})

export const updateUserData = createAsyncThunk('user/updateUserData', async (newUserData: Partial<User>, thunkAPI) => {
    try {
        const user = await UserService.updateUserData(newUserData);
        return user;
    } catch (error) {
        console.error("Ein Fehler beim Aktualisieren des Benutzers:", error);
        return thunkAPI.rejectWithValue('Ein Fehler beim Aktualisieren des Benutzers');
    }
})

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signIn: (state, action: PayloadAction<User>) => {
            state.userData = action.payload;
        },
        signOut: (state, _action: PayloadAction<null>) => {
            state.userData = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.userData = action.payload || null;
        });
        builder.addCase(getUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getUser.rejected, (state) => {
            state.isLoading = false;
        });
        builder.addCase(updateUserData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.userData = action.payload || null;
        });
        builder.addCase(updateUserData.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(updateUserData.rejected, (state) => {
            state.isLoading = false;
        });
    }
})

export const { signIn, signOut } = userSlice.actions

export default userSlice.reducer;