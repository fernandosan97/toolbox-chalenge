import React, { useEffect } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import FileSelector from './components/FileSelector';
import FileTable from './components/FileTable';
import { listFiles, fetchData } from './api';
import {
  setFiles,
  setFilesLoading,
  setFilesError,
  setSelectedFile,
  setData,
  setDataLoading,
  setDataError,
  clearAllErrors
} from './store';

function App() {
  const dispatch = useDispatch();
  const { files, loading: filesLoading, error: filesError } = useSelector(state => state.files);
  const { data, selectedFile, loading: dataLoading, error: dataError } = useSelector(state => state.data);

  useEffect(() => {
    async function loadFiles() {
      try {
        dispatch(setFilesLoading(true));
        dispatch(setFilesError(null));
        const response = await listFiles();
        dispatch(setFiles(response.files || []));
      } catch (error) {
        dispatch(setFilesError(`Error loading files: ${error.message}`));
      } finally {
        dispatch(setFilesLoading(false));
      }
    }

    loadFiles();
  }, [dispatch]);

  useEffect(() => {
    async function loadAllData() {
      try {
        dispatch(setDataLoading(true));
        dispatch(setDataError(null));
        const response = await fetchData('');
        dispatch(setData(response));
      } catch (error) {
        dispatch(setDataError(`Error loading data: ${error.message}`));
      } finally {
        dispatch(setDataLoading(false));
      }
    }

    loadAllData();
  }, [dispatch]);

  function handleFileChange(fileName) {
    dispatch(setSelectedFile(fileName));
    // Limpiar errores cuando se cambia de archivo
    if (filesError || dataError) {
      dispatch(clearAllErrors());
    }
  }

  async function handleLoadData(e) {
    e && e.preventDefault();

    try {
      dispatch(setDataLoading(true));
      dispatch(setDataError(null));
      const response = await fetchData(selectedFile);
      dispatch(setData(response));
    } catch (error) {
      dispatch(setDataError(error.message));
      dispatch(setData([]));
    } finally {
      dispatch(setDataLoading(false));
    }
  }

  function handleClearError() {
    dispatch(clearAllErrors());
  }

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <h1>Files Viewer</h1>
          <p className="text-muted">Consume the /files endpoints and view parsed CSV data.</p>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <FileSelector
            files={files}
            selectedFile={selectedFile}
            onChange={handleFileChange}
            onLoad={handleLoadData}
          />
        </Col>
      </Row>

      <Row>
        <Col>
          {(filesLoading || dataLoading) && <div className="text-center"><Spinner animation="border" /></div>}
          {(filesError || dataError) && (
            <Alert variant="danger" dismissible onClose={handleClearError}>
              {filesError || dataError}
            </Alert>
          )}
          {!filesLoading && !dataLoading && !filesError && !dataError && data.length === 0 && <p>No data loaded yet.</p>}

          {data.map(file => (
            <FileTable key={file.file} file={file} />
          ))}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
