import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorBooksChartComponent } from './author-books-chart.component';

describe('AuthorBooksChartComponent', () => {
  let component: AuthorBooksChartComponent;
  let fixture: ComponentFixture<AuthorBooksChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthorBooksChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorBooksChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
