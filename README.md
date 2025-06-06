# Book Management System

A full-stack application for managing a collection of books with CRUD operations. This project consists of a .NET Core RESTful API backend and an Angular frontend with a clean, responsive UI.

## Project Structure

The project is organized into two main components:

### Backend (BookManagement.API)
- **Controllers**: API endpoints for book operations
- **Models**: Data models and DTOs
- **Services**: Business logic and data access layer
- **Properties**: Configuration and launch settings

### Frontend (book-management-app)
- **/src/app/components**: Reusable UI components
- **/src/app/models**: TypeScript interfaces and types
- **/src/app/services**: API service layer
- **/src/app/shared**: Shared modules and utilities
- **/src/assets**: Static assets and styles

## Features

### Core Features
- **Book Management**
  - View all books in a paginated list
  - View detailed information about each book
  - Add new books with validation
  - Edit existing book information
  - Delete books with confirmation

### User Experience
- **Responsive Design**: Fully responsive layout that works on all device sizes
- **Modern UI**: Clean, professional interface with Material Design components
- **Real-time Feedback**: Loading indicators and error messages
- **Form Validation**: Client and server-side validation
  - Required field validation
  - ISBN format validation
  - Date validation (past dates only)
  - Character length restrictions

### Technical Features
- **RESTful API**: Well-structured endpoints following REST principles
- **Dependency Injection**: Loosely coupled architecture
- **Error Handling**: Global error handling with logging
- **Logging**: Comprehensive logging for debugging and monitoring
- **API Documentation**: Swagger/OpenAPI documentation

## Tech Stack

### Backend
- **Framework**: .NET Core 7.0
- **Architecture**: Clean Architecture with separation of concerns
- **API**: RESTful Web API
- **Dependency Injection**: Built-in IoC container
- **Logging**: ILogger with different log levels
- **Documentation**: Swagger/OpenAPI
- **Data Storage**: In-memory data store (can be easily replaced with a database)

### Frontend
- **Framework**: Angular 17
- **Language**: TypeScript 5.2+
- **State Management**: RxJS Observables
- **UI Components**: Angular Material
- **Forms**: Reactive Forms with custom validators
- **HTTP Client**: Angular's HttpClient with interceptors
- **Styling**: SCSS with BEM methodology
- **Build System**: Angular CLI

### Development Tools
- **IDE**: VS Code / Visual Studio
- **Version Control**: Git
- **Package Management**: npm / NuGet
- **API Testing**: Built-in Swagger UI, .http files

## Prerequisites

- [.NET Core SDK 7.0+](https://dotnet.microsoft.com/download)
- [Node.js](https://nodejs.org/) (v18 or higher)
- [Angular CLI](https://cli.angular.io/) (install with `npm install -g @angular/cli`)

## Getting Started

### Backend Setup

1. Navigate to the API directory:
   ```
   cd BookManagement.API
   ```

2. Restore dependencies:
   ```
   dotnet restore
   ```

3. Run the API:
   ```
   dotnet run
   ```

4. The API will be available at `http://localhost:5000`

5. You can explore the API endpoints using Swagger at `http://localhost:5000/swagger`

### Frontend Setup

1. Navigate to the Angular app directory:
   ```
   cd book-management-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   ng serve
   ```

4. The application will be available at `http://localhost:4200`

## Important Configuration Notes

## API Endpoints

| Method |     Endpoint     |       Description       |
|--------|------------------|-------------------------|
| GET    | /api/books       | Get all books           |
| GET    | /api/books/{id}  | Get a book by ID        |
| POST   | /api/books       | Create a new book       |
| PUT    | /api/books/{id}  | Update an existing book |
| DELETE | /api/books/{id}  | Delete a book           |

### Backend Configuration
- The API runs on `http://localhost:5000` by default
- CORS is configured to allow requests from the Angular development server
- Logging is configured to output to the console
- In-memory storage is used (data is lost on application restart)

### Frontend Configuration
- Development server runs on `http://localhost:4200`
- API base URL is configured in `environment.ts`
- Proxy configuration is available for CORS during development
- Environment-specific configurations for development and production

### Development Tips
- Use the provided `.http` files for testing API endpoints
- Check the browser's developer console for frontend logs
- The backend logs detailed error information to the console
- API documentation is available at `/swagger` when the backend is running

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### Get All Books
```http
GET /books
```
Returns a list of all books in the system.

#### Get Book by ID
```http
GET /books/{id}
```
Returns a single book by its ID.

#### Create a New Book
```http
POST /books
Content-Type: application/json

{
  "title": "Book Title",
  "author": "Author Name",
  "isbn": "1234567890",
  "publicationDate": "2023-01-01T00:00:00"
}
```

#### Update an Existing Book
```http
PUT /books/{id}
Content-Type: application/json

{
  "id": 1,
  "title": "Updated Title",
  "author": "Author Name",
  "isbn": "1234567890",
  "publicationDate": "2023-01-01T00:00:00"
}
```

#### Delete a Book
```http
DELETE /books/{id}
```

### Response Codes
- `200 OK`: Request successful
- `201 Created`: Resource created successfully
- `204 No Content`: Resource deleted successfully
- `400 Bad Request`: Invalid request data
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error occurred

## Book Model

```typescript
interface Book {
  id?: number;
  title: string;
  author: string;
  isbn: string;
  publicationDate: string;
}
```

## Frontend Architecture

### Component Structure
- **App Component**: Root component with main layout
- **Book List Component**: Displays all books in a responsive grid
- **Book Detail Component**: Shows detailed information about a single book
- **Book Form Component**: Handles creating and editing books
- **Shared Components**:
  - Loading Spinner
  - Error Messages
  - Confirmation Dialog
  - Form Controls

### Services
- **Book Service**: Handles all API communication for books
- **Error Service**: Centralized error handling
- **Logger Service**: Wrapper for console logging

### State Management
- Reactive state management using RxJS
- Centralized state for loading and error states
- Immutable data patterns

## Form Validation

The application implements comprehensive form validation with the following rules:

### Client-Side Validation
```typescript
{
  title: [
    { type: 'required', message: 'Title is required' },
    { type: 'minlength', message: 'Title must be at least 2 characters long' },
    { type: 'maxlength', message: 'Title cannot exceed 200 characters' }
  ],
  author: [
    { type: 'required', message: 'Author is required' },
    { type: 'minlength', message: 'Author name must be at least 2 characters long' },
    { type: 'maxlength', message: 'Author name cannot exceed 100 characters' }
  ],
  isbn: [
    { type: 'required', message: 'ISBN is required' },
    { type: 'pattern', message: 'Please enter a valid ISBN (10 or 13 digits)' }
  ],
  publicationDate: [
    { type: 'required', message: 'Publication date is required' },
    { type: 'past', message: 'Publication date cannot be in the future' },
    { type: 'min', message: 'Publication date must be after 1900' }
  ]
}
```

### Server-Side Validation
- All client-side validations are revalidated on the server
- Additional business logic validations
- Consistent error response format

### Error Handling
- Form controls show validation messages
- Server errors are displayed to the user
- Loading states prevent multiple submissions

## UI Features

- **Responsive Design**: The application layout adjusts to different screen sizes from mobile to desktop
- **Material Icons**: Clean icons used throughout the UI for better user experience
- **Professional Black & White Theme**: Clean, minimalist design approach
- **Interactive Elements**: Hover effects and visual feedback on user actions
- **Loading States**: Spinner indicators when data is being loaded
- **Error Feedback**: Clear error messages with retry options
- **Form Validation**: Real-time validation feedback with descriptive error messages
