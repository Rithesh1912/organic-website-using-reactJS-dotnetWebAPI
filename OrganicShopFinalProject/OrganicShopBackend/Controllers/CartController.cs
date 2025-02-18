using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OrganicShopBackend.Data;
using OrganicShopBackend.Models;
using System.Linq;
using System.Threading.Tasks;

namespace OrganicShopBackend.Controllers
{
    [Route("api/carts")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CartController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Get all cart items for a user
        [HttpGet]
        public async Task<IActionResult> GetCartItems([FromQuery] int userId)
        {
            var cartItems = await _context.Carts
                .Where(c => c.UserId == userId)
                .Include(c => c.Product)  // Include related product data
                .ToListAsync();

            if (cartItems == null || !cartItems.Any())
                return NotFound("No items found in the cart.");

            return Ok(cartItems);  // Return cart items with product details
        }

        // Add an item to the cart
        [HttpPost]
        public async Task<IActionResult> AddToCart([FromBody] Cart cart)
        {
            if (cart.Quantity <= 0)
                return BadRequest("Quantity must be greater than 0.");

            var existingItem = await _context.Carts
                .Where(c => c.UserId == cart.UserId && c.ProductId == cart.ProductId)
                .FirstOrDefaultAsync();

            if (existingItem != null)
            {
                // Update the quantity if item already exists in the cart
                existingItem.Quantity += cart.Quantity;
                _context.Update(existingItem);
            }
            else
            {
                await _context.Carts.AddAsync(cart);  // Add a new item if it doesn't exist
            }

            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetCartItems), new { userId = cart.UserId }, cart);  // Return the cart with updated item
        }

        // Remove an item from the cart
        [HttpDelete("{id}")]
        public async Task<IActionResult> RemoveFromCart(int id)
        {
            var cartItem = await _context.Carts.FindAsync(id);
            if (cartItem == null)
                return NotFound("Item not found in the cart.");

            _context.Carts.Remove(cartItem);
            await _context.SaveChangesAsync();
            return NoContent();  // Return status 204 for successful removal
        }
    }
}
