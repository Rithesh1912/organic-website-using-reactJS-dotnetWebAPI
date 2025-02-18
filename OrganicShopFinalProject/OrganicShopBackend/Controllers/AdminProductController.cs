using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OrganicShopBackend.Data;
using OrganicShopBackend.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OrganicShopBackend.Controllers
{
    [Route("api/admin/products")]
    [ApiController]
    public class AdminProductController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AdminProductController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Add a new product
        [HttpPost]
        public async Task<IActionResult> AddProducts([FromBody] List<Product> products)
        {
            if (products == null || !products.Any())
                return BadRequest("No products provided.");

            foreach (var product in products)
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);  // Return detailed validation errors

                // Additional logic can be added here, for example checking if the product already exists
                _context.Products.Add(product);
            }

            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetProductById), new { id = products[0].ProductId }, products);
        }

        // Get a product by ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductById(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
                return NotFound();

            return Ok(product);
        }
    }
}
