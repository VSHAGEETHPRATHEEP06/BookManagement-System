import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestBooksTableComponent } from './latest-books-table.component';

describe('LatestBooksTableComponent', () => {
  let component: LatestBooksTableComponent;
  let fixture: ComponentFixture<LatestBooksTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LatestBooksTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LatestBooksTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
