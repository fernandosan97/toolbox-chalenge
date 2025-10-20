import { createSlice } from '@reduxjs/toolkit';

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    data: [],
    selectedFile: '',
    loading: false,
    error: null
  },
  reducers: {
    setSelectedFile: (state, action) => {
      state.selectedFile = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearData: (state) => {
      state.data = [];
    },
    clearError: (state) => {
      state.error = null;
    }
  }
});

export const { setSelectedFile, setData, setLoading, setError, clearData, clearError } = dataSlice.actions;
export default dataSlice.reducer;
