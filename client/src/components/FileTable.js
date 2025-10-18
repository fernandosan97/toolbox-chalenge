import React from 'react';
import { Table } from 'react-bootstrap';

export default function FileTable({ file }) {
  return (
    <div className="mb-4">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Filename</th>
            <th>Text</th>
            <th>Number</th>
            <th>Hex</th>
          </tr>
        </thead>
        <tbody>
          {file.lines && file.lines.length > 0 ? (
            file.lines.map((line, idx) => (
              <tr key={idx}>
                <td>{file.file}</td>
                <td>{line.text}</td>
                <td>{line.number}</td>
                <td><code>{line.hex}</code></td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="4">No valid lines</td></tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}
