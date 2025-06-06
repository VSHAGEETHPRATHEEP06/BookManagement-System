using BookManagement.API.Models;

namespace BookManagement.API.Services
{
    public interface IBookService
    {
        Task<IEnumerable<Book>> GetAllBooksAsync();
        Task<Book?> GetBookByIdAsync(int id);
        Task<Book> CreateBookAsync(Book book);
        Task<Book?> UpdateBookAsync(int id, Book book);
        Task<bool> DeleteBookAsync(int id);


        Task<IEnumerable<Book>> GetLatestBooksAsync(int count = 5);
        Task<IEnumerable<Book>> GetOldestBooksAsync(int count = 10);
        Task<IEnumerable<AuthorBookCount>> GetBooksByAuthorAsync();
    }


    public class AuthorBookCount
    {
        public string Author { get; set; } = string.Empty;
        public int BookCount { get; set; }
    }

    
}