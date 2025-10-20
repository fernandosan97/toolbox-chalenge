import { createSlice } from '@reduxjs/toolkit';

const filesSlice = createSlice({
  name: 'files',
  initialState: {
    files: [],
    loading: false,
    error: null
  },
  reducers: {
    setFiles: (state, action) => {
      state.files = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    }
  }
});

export const { setFiles, setLoading, setError, clearError } = filesSlice.actions;
export default filesSlice.reducer;
