import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OldestBooksListComponent } from './oldest-books-list.component';

describe('OldestBooksListComponent', () => {
  let component: OldestBooksListComponent;
  let fixture: ComponentFixture<OldestBooksListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OldestBooksListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OldestBooksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
