import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { UserState, User } from '../types/user';
import { fetchUsers, fetchUserById } from '../services/api';

const initialState: UserState = {
  users: [],
  selectedUser: null,
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1
};

export const fetchUserList = createAsyncThunk(
  'users/fetchUserList',
  async (page: number) => {
    const response = await fetchUsers(page);
    return response as { users: User[]; totalPages: number };
  }
);

export const fetchUserDetails = createAsyncThunk(
  'users/fetchUserDetails',
  async (id: number) => {
    const response = await fetchUserById(id);
    return response as User;
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    clearSelectedUser: (state) => {
      state.selectedUser = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserList.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchUserList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      })
      .addCase(fetchUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedUser = action.payload;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch user details';
      });
  }
});

export const { setCurrentPage, clearSelectedUser } = userSlice.actions;
export default userSlice.reducer;
