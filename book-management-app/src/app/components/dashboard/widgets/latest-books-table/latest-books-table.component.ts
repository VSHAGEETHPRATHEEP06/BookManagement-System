import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../../../../models/book.model';
import { DashboardService } from '../../../../services/dashboard.service';

@Component({
  selector: 'app-latest-books-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './latest-books-table.component.html',
  styleUrls: ['./latest-books-table.component.css']
})
export class LatestBooksTableComponent implements OnInit {
  books: Book[] = [];
  loading = false;
  error = '';

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.loadLatestBooks();
  }

  loadLatestBooks(): void {
    this.loading = true;
    this.error = '';
    
    this.dashboardService.getLatestBooks(5).subscribe({
      next: (books) => {
        this.books = books;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load latest books';
        this.loading = false;
        console.error('Error loading latest books:', error);
      }
    });
  }

  // 👈 ADD THIS METHOD
  trackById(index: number, book: Book): number {
    return book.id || index;
  }
}