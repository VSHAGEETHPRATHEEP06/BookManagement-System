import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Book } from '../../../../models/book.model';
import { DashboardService } from '../../../../services/dashboard.service';

@Component({
  selector: 'app-oldest-books-list',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './oldest-books-list.component.html',
  styleUrls: ['./oldest-books-list.component.css']
})
export class OldestBooksListComponent implements OnInit {
  books: Book[] = [];
  loading = false;
  error = '';

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.loadOldestBooks();
  }

  loadOldestBooks(): void {
    this.loading = true;
    this.error = '';
    
    this.dashboardService.getOldestBooks(10).subscribe({
      next: (books) => {
        this.books = books;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load oldest books';
        this.loading = false;
        console.error('Error loading oldest books:', error);
      }
    });
  }

  trackById(index: number, book: Book): number {
    return book.id || index;
  }
}