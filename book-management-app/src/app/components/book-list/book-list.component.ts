import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  loading = false;
  error = '';

  constructor(
    private bookService: BookService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.loading = true;
    this.error = '';
    
    this.bookService.getBooks().subscribe({
      next: (books) => {
        this.books = books;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load books. Please try again.';
        this.loading = false;
        console.error('Error loading books:', error);
      }
    });
  }

  deleteBook(book: Book): void {
    if (confirm(`Are you sure you want to delete "${book.title}"?`)) {
      this.loading = true;
      
      this.bookService.deleteBook(book.id!).subscribe({
        next: () => {
          this.loadBooks(); // Refresh the list
          console.log(`Book "${book.title}" deleted successfully`);
        },
        error: (error) => {
          this.error = 'Failed to delete book. Please try again.';
          this.loading = false;
          console.error('Error deleting book:', error);
        }
      });
    }
  }

  editBook(book: Book): void {
    this.router.navigate(['/edit', book.id]);
  }

  addNewBook(): void {
    this.router.navigate(['/add']);
  }

  trackByBookId(index: number, book: Book): number {
    return book.id || index;
  }

  // Add this method to handle date formatting
  formatDate(dateString: string): string {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return 'Invalid Date';
    }
  }
}