# Mock Ingestion Service

This service is responsible for processing document ingestion and sending status updates to the **User Management Service** after a delay. It also provides document embeddings upon request.

## Features
- **Document Ingestion**: Handles document processing and sends status updates to the user management service.
- **Embeddings Retrieval**: Provides mock embeddings for processed documents.
- **Microservice Communication**: Sends status updates to the user management service via internal API calls.
- **Authentication**: Uses a special header `x-internal-request` with a secret value for authorization.

## Tech Stack
- **Backend Framework**: NestJS (TypeScript)
- **Database**: In-memory storage (or optional persistence in MongoDB)
- **Authentication**: Special header-based authentication (`x-internal-request`)
- **Deployment**: Render 
- **API Documentation**: Swagger

## Installation

### Prerequisites
- Node.js (>=16.x)

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/udhai-20/ingestion_mock_
   cd ingestion_mock_
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure environment variables:
   - Create a `.env` file in the root directory
   - Add the following variables:
     ```env
     PORT=number
     JWT_SECRET=https://user-management-5e76.onrender.com
     ```
4. Run the application:
   ```sh
   npm run start
   ```

## API Endpoints

### Document Ingestion (`/ingestion`)
- **POST `/ingestion`** - Start document ingestion and notify user management service after a delay(using http call).

- **GET `/ingestion/:id/embeddings`** - Get embeddings for a processed document.
 
## Authentication & Security
- **API calls must include the special header** `x-internal-request` with the correct secret value.

## Deployment
This service is deployed on **Render** and supports containerization with Docker.

### Running with Docker
```sh
docker build -t ingestion-mock-service .
docker run -p 4000:4000 ingestion-mock-service

