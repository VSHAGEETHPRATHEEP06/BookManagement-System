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
                },
                new Book
                {
                    Id = 4,
                    Title = "Code Complete",
                    Author = "Steve McConnell",
                    ISBN = "978-0735619678",
                    PublicationDate = new DateTime(2004, 6, 9)
                },
                new Book
                {
                    Id = 5,
                    Title = "Refactoring",
                    Author = "Martin Fowler",
                    ISBN = "978-0201485677",
                    PublicationDate = new DateTime(1999, 7, 8)
                },
                new Book
                {
                    Id = 6,
                    Title = "Working Effectively with Legacy Code",
                    Author = "Michael Feathers",
                    ISBN = "978-0131177055",
                    PublicationDate = new DateTime(2004, 9, 22)
                },
                new Book
                {
                    Id = 7,
                    Title = "Agile Principles, Patterns, and Practices",
                    Author = "Robert C. Martin",
                    ISBN = "978-0131857254",
                    PublicationDate = new DateTime(2002, 10, 25)
                },
                new Book
                {
                    Id = 8,
                    Title = "Head First Design Patterns",
                    Author = "Eric Freeman",
                    ISBN = "978-0596007126",
                    PublicationDate = new DateTime(2004, 10, 25)
                },
                new Book
                {
                    Id = 9,
                    Title = "Effective Java",
                    Author = "Joshua Bloch",
                    ISBN = "978-0134685991",
                    PublicationDate = new DateTime(2017, 12, 27)
                },
                new Book
                {
                    Id = 10,
                    Title = "You Don't Know JS",
                    Author = "Kyle Simpson",
                    ISBN = "978-1491924464",
                    PublicationDate = new DateTime(2015, 4, 26)
                },
                new Book
                {
                    Id = 11,
                    Title = "JavaScript: The Good Parts",
                    Author = "Douglas Crockford",
                    ISBN = "978-0596517748",
                    PublicationDate = new DateTime(2008, 5, 1)
                },
                new Book
                {
                    Id = 12,
                    Title = "Clean Architecture",
                    Author = "Robert C. Martin",
                    ISBN = "978-0134494166",
                    PublicationDate = new DateTime(2017, 9, 20)
                }
            };
            _nextId = 13;
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

        public async Task<IEnumerable<Book>> GetLatestBooksAsync(int count = 5)
        {
            var latestBooks = _books
                .OrderByDescending(b => b.Id)
                .Take(count)
                .ToList();
            
            return await Task.FromResult(latestBooks);
        }

        public async Task<IEnumerable<Book>> GetOldestBooksAsync(int count = 10)
        {
            var oldestBooks = _books
                .OrderBy(b => b.PublicationDate)
                .Take(count)
                .ToList();
            
            return await Task.FromResult(oldestBooks);
        }

        public async Task<IEnumerable<AuthorBookCount>> GetBooksByAuthorAsync()
        {
            var authorCounts = _books
                .GroupBy(b => b.Author)
                .Select(g => new AuthorBookCount
                {
                    Author = g.Key,
                    BookCount = g.Count()
                })
                .OrderByDescending(ac => ac.BookCount)
                .ToList();
            
            return await Task.FromResult(authorCounts);
        }
    }
}