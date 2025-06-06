import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LatestBooksTableComponent } from './widgets/latest-books-table/latest-books-table.component';
import { OldestBooksListComponent } from './widgets/oldest-books-list/oldest-books-list.component';
import { AuthorBooksChartComponent } from './widgets/author-books-chart/author-books-chart.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule,
    LatestBooksTableComponent,
    OldestBooksListComponent,
    AuthorBooksChartComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // Dashboard initialization logic if needed
  }
}