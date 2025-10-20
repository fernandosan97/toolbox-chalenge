# Challenge Node - File Parser API

## Descripción General

Este proyecto es una aplicación full-stack que consume una API externa para obtener listas de archivos CSV, los procesa y los expone a través de una API REST. La aplicación incluye un backend en Node.js/Express y un frontend en React que permite visualizar los datos procesados.

### Funcionalidades Principales

- **Consumo de API Externa**: Obtiene listas de archivos desde `https://echo-serv.tbxnet.com/v1/secret`
- **Procesamiento de CSV**: Parsea archivos CSV y extrae datos estructurados
- **API REST**: Expone endpoints para consultar archivos y datos procesados
- **Interfaz Web**: Frontend React para visualizar y filtrar datos
- **Containerización**: Soporte completo para Docker

## Arquitectura

### Backend (Node.js/Express)
- **Puerto**: 3000
- **Node.js**: 14.x
- **Framework**: Express.js
- **Servicios**: 
  - `externalApiService.js`: Comunicación con API externa
  - `filesController.js`: Controladores de endpoints
- **Casos de Uso**:
  - `getFileList.js`: Obtiene lista de archivos
  - `getFilesData.js`: Procesa datos de archivos CSV

### Frontend (React)
- **Puerto**: 8080
- **Node.js**: 16.x
- **Framework**: React 18 con Redux Toolkit
- **UI**: Bootstrap 5 + React Bootstrap
- **Estado**: Redux para manejo de estado global
- **Build**: Webpack 5

### API Externa
- **Base URL**: `https://echo-serv.tbxnet.com/v1/secret`
- **Autenticación**: Bearer Token
- **Endpoints**:
  - `/files`: Lista de archivos disponibles
  - `/file/{fileName}`: Contenido de archivo específico

## Documentación de Endpoints

### GET /files/list

Obtiene la lista de archivos disponibles desde la API externa.

**Request:**
```http
GET http://localhost:3000/files/list
```

**Response:**
```json
{
  "files": [
    "test1.csv",
    "test2.csv",
    "test18.csv"
  ]
}
```

### GET /files/data

Obtiene los datos procesados de archivos CSV. Puede procesar todos los archivos o uno específico.

**Request:**
```http
GET http://localhost:3000/files/data
GET http://localhost:3000/files/data?fileName=test18.csv
```

**Query Parameters:**
- `fileName` (opcional): Nombre del archivo específico a procesar

**Response:**
```json
[
  {
    "file": "test18.csv",
    "lines": [
      {
        "text": "sample text",
        "number": 123,
        "hex": "0x7B"
      },
      {
        "text": "another text",
        "number": 456,
        "hex": "0x1C8"
      }
    ]
  }
]
```

**Códigos de Error:**
- `500`: Error interno del servidor
- `400`: Error en parámetros de entrada

## Instalación y Ejecución

### Prerrequisitos

- **Backend**: Node.js 14.x
- **Frontend**: Node.js 16.x
- npm 6.x o superior
- Docker y Docker Compose (opcional)

### Instalación Manual

#### Backend

```bash
# Navegar al directorio backend
cd backend

# Instalar dependencias
npm install

# Ejecutar tests
npm test
```

#### Frontend

```bash
# Navegar al directorio client
cd client

# Instalar dependencias
npm install
```

## Ejecución

### Ejecución Manual (Desarrollo)

Para desarrollo local, necesitas ejecutar backend y frontend por separado:

#### Terminal 1 - Backend
```bash
cd backend
npm start
```
El backend estará disponible en: http://localhost:3000

#### Terminal 2 - Frontend
```bash
cd client
npm start
```
El frontend estará disponible en: http://localhost:8080

### Ejecución con Docker

Para ejecutar toda la aplicación con Docker:

```bash
# Construir y ejecutar todos los servicios
docker compose up -d

# Ver logs
docker compose logs -f

# Detener servicios
docker compose down
```

### Acceso a la Aplicación

- **Frontend**: http://localhost:8080
- **Backend API**: http://localhost:3000
- **Health Check**: http://localhost:3000/files/list

## Testing

### Backend Tests

```bash
cd backend
npm test
```

Los tests incluyen:
- Tests unitarios para servicios
- Tests de integración para controladores
- Mocks de la API externa

### Estructura de Tests

```
backend/test/
└── files.test.js    # Tests de endpoints y funcionalidad
```

## Desarrollo

### Estructura del Proyecto

```
challenge-node/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Controladores de endpoints
│   │   ├── services/        # Servicios externos
│   │   └── usecases/        # Lógica de negocio
│   ├── test/               # Tests del backend
│   └── package.json
├── client/
│   ├── src/
│   │   ├── components/      # Componentes React
│   │   ├── store/          # Redux store
│   │   └── api.js          # Cliente API
│   └── package.json
└── docker-compose.yml      # Configuración Docker
```

### Variables de Entorno

El proyecto utiliza las siguientes configuraciones:

- **Backend**: Puerto 3000 (configurable en docker-compose.yml)
- **Frontend**: Puerto 8080 (configurable en docker-compose.yml)
- **API Externa**: URL y token hardcodeados en `externalApiService.js`

### Contribución

1. Fork el repositorio
2. Crear una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear un Pull Request