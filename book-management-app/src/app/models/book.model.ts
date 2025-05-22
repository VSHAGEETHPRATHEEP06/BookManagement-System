export interface Book {
  id?: number;
  title: string;
  author: string;
  isbn: string;
  publicationDate: string;
}

export interface CreateBookRequest {
  title: string;
  author: string;
  isbn: string;
  publicationDate: string;
}

export interface UpdateBookRequest {
  title: string;
  author: string;
  isbn: string;
  publicationDate: string;
}