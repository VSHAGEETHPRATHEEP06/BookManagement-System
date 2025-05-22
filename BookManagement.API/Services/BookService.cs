using BookManagement.API.Models;

namespace BookManagement.API.Services
{
    public class BookService : IBookService
    {
        private readonly List<Book> _books;
        private int _nextId;

        public BookService()
        {
            _books = new List<Book>
            {
                new Book 
                { 
                    Id = 1, 
                    Title = "Clean Code", 
                    Author = "Robert C. Martin", 
                    ISBN = "978-0132350884", 
                    PublicationDate = new DateTime(2008, 8, 1) 
                },
                new Book 
                { 
                    Id = 2, 
                    Title = "Design Patterns", 
                    Author = "Gang of Four", 
                    ISBN = "978-0201633612", 
                    PublicationDate = new DateTime(1994, 10, 31) 
                },
                new Book 
                { 
                    Id = 3, 
                    Title = "The Pragmatic Programmer", 
                    Author = "David Thomas", 
                    ISBN = "978-0201616224", 
                    PublicationDate = new DateTime(1999, 10, 20) 
                }
            };
            _nextId = 4;
        }

        public async Task<IEnumerable<Book>> GetAllBooksAsync()
        {
            return await Task.FromResult(_books.AsEnumerable());
        }

        public async Task<Book?> GetBookByIdAsync(int id)
        {
            var book = _books.FirstOrDefault(b => b.Id == id);
            return await Task.FromResult(book);
        }

        public async Task<Book> CreateBookAsync(Book book)
        {
            book.Id = _nextId++;
            _books.Add(book);
            return await Task.FromResult(book);
        }

        public async Task<Book?> UpdateBookAsync(int id, Book book)
        {
            var existingBook = _books.FirstOrDefault(b => b.Id == id);
            if (existingBook == null) return null;

            existingBook.Title = book.Title;
            existingBook.Author = book.Author;
            existingBook.ISBN = book.ISBN;
            existingBook.PublicationDate = book.PublicationDate;

            return await Task.FromResult(existingBook);
        }

        public async Task<bool> DeleteBookAsync(int id)
        {
            var book = _books.FirstOrDefault(b => b.Id == id);
            if (book == null) return false;

            _books.Remove(book);
            return await Task.FromResult(true);
        }
    }
}