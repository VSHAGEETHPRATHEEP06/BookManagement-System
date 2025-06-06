export interface AuthorBookCount {
  author: string;
  bookCount: number;
}

export interface DashboardSummary {
  latestBooks: Book[];
  oldestBooks: Book[];
  authorCounts: AuthorBookCount[];
}

export interface Book {
  id?: number;
  title: string;
  author: string;
  isbn: string;
  publicationDate: string;
}