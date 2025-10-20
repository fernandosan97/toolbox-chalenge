import { configureStore } from '@reduxjs/toolkit';
import filesReducer, { setFiles, setLoading as setFilesLoading, setError as setFilesError, clearError as clearFilesError } from './filesSlice';
import dataReducer, { setSelectedFile, setData, setLoading as setDataLoading, setError as setDataError, clearData, clearError as clearDataError } from './dataSlice';

export const store = configureStore({
  reducer: {
    files: filesReducer,
    data: dataReducer
  }
});

// Función para limpiar errores de ambos slices
const clearAllErrors = () => (dispatch) => {
  dispatch(clearFilesError());
  dispatch(clearDataError());
};

// Exportar las acciones para uso en componentes
export {
  setFiles,
  setFilesLoading,
  setFilesError,
  clearFilesError,
  setSelectedFile,
  setData,
  setDataLoading,
  setDataError,
  clearData,
  clearDataError,
  clearAllErrors
};
