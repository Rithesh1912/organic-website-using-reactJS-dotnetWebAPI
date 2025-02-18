using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OrganicShopBackend.Data;
using OrganicShopBackend.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace OrganicShopBackend.Controllers
{
    [Route("api/products")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public ProductController(ApplicationDbContext context, IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            _webHostEnvironment = webHostEnvironment;
        }

        // ✅ Get all products
        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            try
            {
                var products = await _context.Products.ToListAsync();
                return Ok(products);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error fetching products", error = ex.Message });
            }
        }

        // ✅ Get product by ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductById(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null) return NotFound(new { message = "Product not found" });
            return Ok(product);
        }

        // ✅ Utility: Validate image
        private bool IsValidImage(IFormFile imageFile)
        {
            var allowedExtensions = new[] { ".jpg", ".jpeg", ".png" };
            var fileExtension = Path.GetExtension(imageFile.FileName).ToLower();
            return allowedExtensions.Contains(fileExtension) && imageFile.Length <= 5 * 1024 * 1024; // Max 5MB
        }

        // ✅ Utility: Save image to server
        private async Task<string> SaveImageToServer(IFormFile imageFile)
        {
            string uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, "images", "products");
            if (!Directory.Exists(uploadsFolder)) Directory.CreateDirectory(uploadsFolder);

            string uniqueFileName = Guid.NewGuid().ToString() + "_" + imageFile.FileName;
            string filePath = Path.Combine(uploadsFolder, uniqueFileName);

            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }

            return $"/images/products/{uniqueFileName}";
        }

        // ✅ Add a new product
        [HttpPost]
        public async Task<IActionResult> PostProduct([FromForm] Product product, [FromForm] IFormFile imageFile)
        {
            if (product == null || imageFile == null) return BadRequest("Product data and image are required.");

            if (string.IsNullOrWhiteSpace(product.Title) || product.Price <= 0 || product.QuantityInStock < 0)
                return BadRequest("Valid product title, price, and stock are required.");

            if (!IsValidImage(imageFile))
                return BadRequest("Invalid image file. Allowed formats: JPG, JPEG, PNG. Max size: 5MB.");

            try
            {
                product.Thumbnail = await SaveImageToServer(imageFile);
                product.Images = new List<string> { product.Thumbnail };

                // ✅ Auto-set availabilityStatus based on stock
                product.AvailabilityStatus = product.QuantityInStock > 0 ? "In Stock" : "No Stock";

                // Add the weight and discount
                if (product.Weight < 0)
                {
                    return BadRequest("Weight must be a non-negative value.");
                }

                if (product.DiscountPercentage < 0 || product.DiscountPercentage > 100)
                {
                    return BadRequest("Discount must be a value between 0 and 100.");
                }

                _context.Products.Add(product);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetProductById), new { id = product.ProductId }, product);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error saving product", error = ex.Message });
            }
        }

        // ✅ Update an existing product
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(int id, [FromForm] Product product, [FromForm] IFormFile? imageFile)
        {
            var existingProduct = await _context.Products.FindAsync(id);
            if (existingProduct == null) return NotFound(new { message = "Product not found" });

            existingProduct.Title = product.Title;
            existingProduct.Price = product.Price;
            existingProduct.QuantityInStock = product.QuantityInStock;
            existingProduct.Category = product.Category;
            existingProduct.Description = product.Description;
            existingProduct.Weight = product.Weight; // Update Weight
            existingProduct.DiscountPercentage = product.DiscountPercentage; // Update Discount

            if (imageFile != null && IsValidImage(imageFile))
            {
                if (!string.IsNullOrEmpty(existingProduct.Thumbnail))
                {
                    string oldImagePath = Path.Combine(_webHostEnvironment.WebRootPath, "images", "products", Path.GetFileName(existingProduct.Thumbnail));
                    if (System.IO.File.Exists(oldImagePath)) System.IO.File.Delete(oldImagePath);
                }

                existingProduct.Thumbnail = await SaveImageToServer(imageFile);
                existingProduct.Images = new List<string> { existingProduct.Thumbnail };
            }

            // ✅ Auto-update availabilityStatus based on stock
            existingProduct.AvailabilityStatus = product.QuantityInStock > 0 ? "In Stock" : "No Stock";

            _context.Products.Update(existingProduct);
            await _context.SaveChangesAsync();

            return Ok(existingProduct);
        }

        // ✅ Delete a product
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null) return NotFound(new { message = "Product not found" });

            try
            {
                if (!string.IsNullOrEmpty(product.Thumbnail))
                {
                    string imagePath = Path.Combine(_webHostEnvironment.WebRootPath, "images", "products", Path.GetFileName(product.Thumbnail));
                    if (System.IO.File.Exists(imagePath)) System.IO.File.Delete(imagePath);
                }

                _context.Products.Remove(product);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error deleting product", error = ex.Message });
            }
        }

        // ✅ Update product stock after an order
        [HttpPatch("{id}/update-stock")]
        public async Task<IActionResult> UpdateStock(int id, [FromBody] StockUpdateRequest request)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
                return NotFound(new { message = "Product not found" });

            if (request.Quantity <= 0)
                return BadRequest(new { message = "Invalid stock update quantity" });

            if (product.QuantityInStock < request.Quantity)
                return BadRequest(new { message = "Not enough stock available" });

            // ✅ Deduct stock and update availability
            product.QuantityInStock -= request.Quantity;
            product.AvailabilityStatus = product.QuantityInStock > 0 ? "In Stock" : "No Stock";

            await _context.SaveChangesAsync();

            return Ok(new { message = "Stock updated successfully", remainingStock = product.QuantityInStock });
        }
    }

    // ✅ Stock update request model
    public class StockUpdateRequest
    {
        public int Quantity { get; set; }
    }
}