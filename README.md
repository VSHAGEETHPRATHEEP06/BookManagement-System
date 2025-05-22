# Book Management System

A full-stack application for managing a collection of books with CRUD operations. This project consists of a .NET Core RESTful API backend and an Angular frontend with a clean, responsive UI.

## Project Structure

The project is organized into two main components:

- **BookManagement.API**: .NET Core backend API
- **book-management-app**: Angular frontend application

## Features

- View a list of books with details (title, author, ISBN, publication date)
- Add new books to the collection
- Edit existing book information
- Delete books from the collection
- Responsive UI design that works on desktop and mobile devices
- Professional black and white theme with Material Design icons
- Form validation for all book properties
- Error handling and loading states

## Tech Stack

### Backend
- .NET Core 7.0
- ASP.NET Core Web API
- RESTful API architecture
- In-memory data storage
- Dependency Injection
- Swagger API documentation

### Frontend
- Angular 17
- TypeScript
- RxJS for asynchronous operations
- Angular Reactive Forms with validation
- Material Icons
- CSS Grid and Flexbox for responsive layouts

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

4. The API will be available at `http://localhost:5001`

5. You can explore the API endpoints using Swagger at `http://localhost:5001/swagger`

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

- If you encounter SSL certificate issues with the backend, ensure you're using HTTP instead of HTTPS for local development. The frontend is configured to connect to the backend at `http://localhost:5001/api/books`.
- Make sure both the backend and frontend servers are running simultaneously for the application to work properly.

## API Endpoints

| Method |     Endpoint     |       Description       |
|--------|------------------|-------------------------|
| GET    | /api/books       | Get all books           |
| GET    | /api/books/{id}  | Get a book by ID        |
| POST   | /api/books       | Create a new book       |
| PUT    | /api/books/{id}  | Update an existing book |
| DELETE | /api/books/{id}  | Delete a book |

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

## UI Components

- **Book List**: Displays all books in a responsive grid layout
- **Book Form**: Form for adding and editing book details with validation
- **Loading States**: Visual indicators when data is being loaded
- **Error Handling**: User-friendly error messages

## Form Validation

The application validates book information with the following rules:

- **Title**: Required, minimum 2 characters, maximum 200 characters
- **Author**: Required, minimum 2 characters, maximum 100 characters
- **ISBN**: Required, must be a valid ISBN-10 or ISBN-13 format
- **Publication Date**: Required, must be a valid date not in the future and not before 1900

## UI Features

- **Responsive Design**: The application layout adjusts to different screen sizes from mobile to desktop
- **Material Icons**: Clean icons used throughout the UI for better user experience
- **Professional Black & White Theme**: Clean, minimalist design approach
- **Interactive Elements**: Hover effects and visual feedback on user actions
- **Loading States**: Spinner indicators when data is being loaded
- **Error Feedback**: Clear error messages with retry options
- **Form Validation**: Real-time validation feedback with descriptive error messages
