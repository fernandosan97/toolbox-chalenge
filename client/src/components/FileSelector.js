import React from 'react';
import { Form, Button } from 'react-bootstrap';

export default function FileSelector({ files, selectedFile, onChange, onLoad }) {
  return (
    <Form onSubmit={onLoad}>
      <Form.Group controlId="fileSelect" className="d-flex">
        <Form.Select value={selectedFile} onChange={e => onChange(e.target.value)}>
          <option value="">-- All files --</option>
          {files.map(f => (
            <option key={f} value={f}>{f}</option>
          ))}
        </Form.Select>
        <Button variant="primary" type="submit" className="ms-2">Load</Button>
      </Form.Group>
    </Form>
  );
}
