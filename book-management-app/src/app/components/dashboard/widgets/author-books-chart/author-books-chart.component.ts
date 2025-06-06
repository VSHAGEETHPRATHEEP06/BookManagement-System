import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { AuthorBookCount } from '../../../../models/dashboard.model';
import { DashboardService } from '../../../../services/dashboard.service';

Chart.register(...registerables);

@Component({
  selector: 'app-author-books-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './author-books-chart.component.html',
  styleUrls: ['./author-books-chart.component.css']
})
export class AuthorBooksChartComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('chartCanvas', { static: false }) chartCanvas!: ElementRef<HTMLCanvasElement>;
  
  authorCounts: AuthorBookCount[] = [];
  loading = false;
  error = '';
  chart: Chart | null = null;
  private viewInitialized = false;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.loadAuthorData();
  }

  ngAfterViewInit(): void {
    this.viewInitialized = true;
    // Try to create chart if data is already loaded
    if (this.authorCounts.length > 0) {
      setTimeout(() => this.createChart(), 100);
    }
  }

  loadAuthorData(): void {
    this.loading = true;
    this.error = '';
    
    this.dashboardService.getBooksByAuthor().subscribe({
      next: (authorCounts) => {
        this.authorCounts = authorCounts;
        this.loading = false;
        
        // Create chart if view is initialized
        if (this.viewInitialized) {
          setTimeout(() => this.createChart(), 100);
        }
      },
      error: (error) => {
        this.error = 'Failed to load author statistics';
        this.loading = false;
        console.error('Error loading author data:', error);
      }
    });
  }

  createChart(): void {
    // Safety checks
    if (!this.viewInitialized) {
      return;
    }

    if (!this.chartCanvas || !this.chartCanvas.nativeElement) {
      return;
    }

    if (this.authorCounts.length === 0) {
      return;
    }

    // Destroy existing chart
    if (this.chart) {
      this.chart.destroy();
    }

    try {
      const ctx = this.chartCanvas.nativeElement.getContext('2d');
      if (!ctx) return;

      const colors = this.generateColors(this.authorCounts.length);

      const config: any = {
        type: 'doughnut',
        data: {
          labels: this.authorCounts.map(ac => ac.author),
          datasets: [{
            data: this.authorCounts.map(ac => ac.bookCount),
            backgroundColor: colors,
            borderColor: colors.map(color => this.darkenColor(color, 0.2)),
            borderWidth: 2,
            hoverOffset: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '60%',
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                padding: 20,
                usePointStyle: true,
                font: {
                  size: 12
                }
              }
            },
            tooltip: {
              callbacks: {
                label: (context: any) => {
                  const label = context.label || '';
                  const value = context.parsed;
                  const total = this.authorCounts.reduce((sum, ac) => sum + ac.bookCount, 0);
                  const percentage = ((value / total) * 100).toFixed(1);
                  return `${label}: ${value} books (${percentage}%)`;
                }
              }
            }
          }
        }
      };

      this.chart = new Chart(ctx, config);
    } catch (error) {
      console.error('Error creating chart:', error);
      this.error = 'Failed to create chart';
    }
  }

  generateColors(count: number): string[] {
    const colors = [
      '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
      '#9966FF', '#FF9F40', '#FF6384', '#C9CBCF',
      '#4BC0C0', '#36A2EB', '#FFCE56', '#9966FF'
    ];
    
    while (colors.length < count) {
      colors.push(`hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`);
    }
    
    return colors.slice(0, count);
  }

  darkenColor(color: string, factor: number): string {
    if (color.startsWith('#')) {
      const num = parseInt(color.replace('#', ''), 16);
      const amt = Math.round(2.55 * factor * 100);
      const R = Math.max(0, Math.min(255, (num >> 16) - amt));
      const G = Math.max(0, Math.min(255, (num >> 8 & 0x00FF) - amt));
      const B = Math.max(0, Math.min(255, (num & 0x0000FF) - amt));
      return '#' + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
    }
    return color;
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }
}