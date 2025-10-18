
import axios from 'axios';

export async function listFiles() {
  const res = await axios.get('http://localhost:3000/files/list');
  return res.data;
}

export async function fetchData(fileName) {
  const q = fileName ? `?fileName=${encodeURIComponent(fileName)}` : '';
  const res = await axios.get(`http://localhost:3000/files/data${q}`);
  return res.data;
}
