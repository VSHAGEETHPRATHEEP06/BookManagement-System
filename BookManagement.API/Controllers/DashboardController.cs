using Microsoft.AspNetCore.Mvc;
using BookManagement.API.Services;

namespace BookManagement.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DashboardController : ControllerBase
    {
        private readonly IBookService _bookService;
        private readonly ILogger<DashboardController> _logger;

        public DashboardController(IBookService bookService, ILogger<DashboardController> logger)
        {
            _bookService = bookService;
            _logger = logger;
        }

        [HttpGet("latest-books")]
        public async Task<ActionResult> GetLatestBooks([FromQuery] int count = 5)
        {
            try
            {
                var books = await _bookService.GetLatestBooksAsync(count);
                return Ok(books);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while fetching latest books");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("oldest-books")]
        public async Task<ActionResult> GetOldestBooks([FromQuery] int count = 10)
        {
            try
            {
                var books = await _bookService.GetOldestBooksAsync(count);
                return Ok(books);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while fetching oldest books");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("books-by-author")]
        public async Task<ActionResult> GetBooksByAuthor()
        {
            try
            {
                var authorCounts = await _bookService.GetBooksByAuthorAsync();
                return Ok(authorCounts);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while fetching books by author");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("summary")]
        public async Task<ActionResult> GetDashboardSummary()
        {
            try
            {
                var latestBooks = await _bookService.GetLatestBooksAsync(5);
                var oldestBooks = await _bookService.GetOldestBooksAsync(10);
                var authorCounts = await _bookService.GetBooksByAuthorAsync();

                var summary = new
                {
                    LatestBooks = latestBooks,
                    OldestBooks = oldestBooks,
                    AuthorCounts = authorCounts
                };

                return Ok(summary);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while fetching dashboard summary");
                return StatusCode(500, "Internal server error");
            }
        }
    }
}