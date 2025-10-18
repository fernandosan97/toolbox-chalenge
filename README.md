# Challenge Node

API that fetches file list and file contents from external service, parses CSV and exposes endpoints:

- GET /files/list -> returns the raw file list from external API
- GET /files/data -> returns parsed JSON with file and lines, query parameter -> `?fileName=test18.csv`

## From the `backend` folder run:

1. npm install
2. npm start
3. npm test

## From the `client` folder run:

1. cd client
2. npm install
3. npm start

## Run with Docker:
`docker compose up -d`

Frontend running on `http://localhost:8080`