import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import FileSelector from './components/FileSelector';
import FileTable from './components/FileTable';
import { listFiles, fetchData } from './api';

function App() {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function loadFiles() {
      try {
        const json = await listFiles();
        if (mounted) setFiles(json.files || []);
      } catch (err) {
        if (mounted) setError(`Error loading files: ${err.message}`);
      }
    }

    loadFiles();
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    let mounted = true;

    async function loadAllData() {
      try {
        const json = await fetchData('');
        if (mounted) setData(json);
      } catch (err) {
        if (mounted) setError(`Error loading data: ${err.message}`);
      }
    }

    loadAllData();
    return () => { mounted = false; };
  }, []);

  async function loadData(e) {
    e && e.preventDefault();
    console.log('Loading data for file:', selectedFile, e);
    setLoading(true);
    setError(null);
    try {
      const json = await fetchData(selectedFile);
      setData(json);
    } catch (err) {
      setError(err.message);
      setData([]);
    } finally {
      setLoading(false);
    }
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
            onChange={setSelectedFile}
            onLoad={loadData}
          />
        </Col>
      </Row>

      <Row>
        <Col>
          {loading && <div className="text-center"><Spinner animation="border" /></div>}
          {error && <Alert variant="danger">{error}</Alert>}
          {!loading && !error && data.length === 0 && <p>No data loaded yet.</p>}

          {data.map(file => (
            <FileTable key={file.file} file={file} />
          ))}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
