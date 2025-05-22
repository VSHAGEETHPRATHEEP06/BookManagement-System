import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {
  bookForm: FormGroup;
  isEditMode = false;
  bookId: number | null = null;
  loading = false;
  error = '';
  pageTitle = 'Add New Book';
  titleIcon = 'add_box';

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.bookForm = this.createForm();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.bookId = +params['id'];
        this.pageTitle = 'Edit Book';
        this.titleIcon = 'edit';
        this.loadBook(this.bookId);
      }
    });
  }

  private createForm(): FormGroup {
    return this.fb.group({
      title: ['', [
        Validators.required, 
        Validators.minLength(2),
        Validators.maxLength(200)
      ]],
      author: ['', [
        Validators.required, 
        Validators.minLength(2),
        Validators.maxLength(100)
      ]],
      isbn: ['', [
        Validators.required,
        Validators.pattern(/^(?:\d{10}|\d{13}|[\d-]{10,17})$/)
      ]],
      publicationDate: ['', [
        Validators.required,
        this.dateValidator
      ]]
    });
  }

  private dateValidator(control: any) {
    if (!control.value) return null;
    
    const selectedDate = new Date(control.value);
    const today = new Date();
    
    if (selectedDate > today) {
      return { futureDate: true };
    }
    
    const minDate = new Date('1900-01-01');
    if (selectedDate < minDate) {
      return { tooOld: true };
    }
    
    return null;
  }

  loadBook(id: number): void {
    this.loading = true;
    this.error = '';
    
    this.bookService.getBook(id).subscribe({
      next: (book) => {
        this.bookForm.patchValue({
          title: book.title,
          author: book.author,
          isbn: book.isbn,
          publicationDate: this.formatDateForInput(book.publicationDate)
        });
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load book details. Please try again.';
        this.loading = false;
        console.error('Error loading book:', error);
      }
    });
  }

  private formatDateForInput(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  }

  onSubmit(): void {
    if (this.bookForm.valid) {
      this.loading = true;
      this.error = '';
      
      const formValue = this.bookForm.value;
      const bookData = {
        title: formValue.title.trim(),
        author: formValue.author.trim(),
        isbn: formValue.isbn.trim(),
        publicationDate: formValue.publicationDate
      };

      const operation = this.isEditMode 
        ? this.bookService.updateBook(this.bookId!, bookData)
        : this.bookService.createBook(bookData);

      operation.subscribe({
        next: (book) => {
          console.log(`Book ${this.isEditMode ? 'updated' : 'created'} successfully:`, book);
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.error = `Failed to ${this.isEditMode ? 'update' : 'create'} book. Please try again.`;
          this.loading = false;
          console.error('Error saving book:', error);
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.bookForm.controls).forEach(key => {
      this.bookForm.get(key)?.markAsTouched();
    });
  }

  cancel(): void {
    this.router.navigate(['/']);
  }

  // Getter methods for template
  get title() { return this.bookForm.get('title'); }
  get author() { return this.bookForm.get('author'); }
  get isbn() { return this.bookForm.get('isbn'); }
  get publicationDate() { return this.bookForm.get('publicationDate'); }
}