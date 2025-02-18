//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;
//using OrganicShopBackend.Data;
//using OrganicShopBackend.Models;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Threading.Tasks;

//namespace OrganicShopBackend.Controllers
//{
//    [Route("api/orders")]
//    [ApiController]
//    public class OrderController : ControllerBase
//    {
//        private readonly ApplicationDbContext _context;

//        public OrderController(ApplicationDbContext context)
//        {
//            _context = context;
//        }

//        // ✅ Get all orders for a user
//        [HttpGet("history/{userId}")]
//        public async Task<IActionResult> GetOrderHistory(int userId)
//        {
//            try
//            {
//                var orders = await _context.Orders
//                    .Where(o => o.UserId == userId)
//                    .Include(o => o.OrderItems)
//                    .ThenInclude(oi => oi.Product)
//                    .OrderByDescending(o => o.OrderDate)
//                    .Select(o => new
//                    {
//                        o.UniqueOrderId,
//                        OrderDate = o.OrderDate.AddHours(5).AddMinutes(30), // ✅ Convert UTC to IST
//                        o.TotalAmount,
//                        o.Status,
//                        o.ShippedDate,
//                        o.DeliveredDate,
//                        OrderItems = o.OrderItems.Select(oi => new
//                        {
//                            oi.ProductId,
//                            ProductTitle = oi.Product.Title, // ✅ Include Product Title
//                            oi.Quantity,
//                            oi.Price
//                        }).ToList()
//                    })
//                    .ToListAsync();

//                if (!orders.Any())
//                    return NotFound(new { message = "No previous orders found." });

//                return Ok(orders);
//            }
//            catch (Exception ex)
//            {
//                Console.WriteLine($"🚨 Error fetching order history: {ex.Message}");
//                return StatusCode(500, new { message = "Internal Server Error", error = ex.Message });
//            }
//        }

//        // ✅ Place a new order
//        [HttpPost("placeorder")]
//        public async Task<IActionResult> PlaceOrder([FromBody] Order order)
//        {
//            if (order == null || order.UserId == 0 || order.OrderItems == null || !order.OrderItems.Any())
//                return BadRequest("Invalid order details.");

//            Console.WriteLine($"🔄 Received Order: {System.Text.Json.JsonSerializer.Serialize(order)}");

//            Random random = new Random();
//            int newOrderId;
//            do
//            {
//                newOrderId = random.Next(10000, 99999);
//            } while (await _context.Orders.AnyAsync(o => o.UniqueOrderId == newOrderId));

//            order.UniqueOrderId = newOrderId;
//            order.OrderDate = DateTime.UtcNow;
//            order.Status = "Ordered";

//            var user = await _context.Users.FindAsync(order.UserId);
//            if (user == null) return BadRequest("Invalid User ID.");
//            order.User = user;

//            foreach (var item in order.OrderItems)
//            {
//                var product = await _context.Products.FindAsync(item.ProductId);
//                if (product == null) return BadRequest($"Invalid Product ID: {item.ProductId}");
//                item.ProductId = product.ProductId;
//                item.Order = order;
//            }

//            _context.Orders.Add(order);
//            await _context.SaveChangesAsync();

//            var userCartItems = _context.Carts.Where(c => c.UserId == order.UserId);
//            _context.Carts.RemoveRange(userCartItems);
//            await _context.SaveChangesAsync();

//            return Ok(new { message = "✅ Order placed successfully", orderId = order.UniqueOrderId });
//        }

//        // ✅ Update order status
//        [HttpPut("update-status/{orderId}")]
//        public IActionResult UpdateOrderStatus(int orderId, [FromBody] OrderStatusUpdateModel model)
//        {
//            var order = _context.Orders.FirstOrDefault(o => o.UniqueOrderId == orderId);
//            if (order == null)
//            {
//                return NotFound(); // Return 404 if the order is not found
//            }

//            order.Status = model.Status;
//            order.ShippedDate = model.Status == "Shipped" ? DateTime.UtcNow : order.ShippedDate;
//            order.DeliveredDate = model.Status == "Delivered" ? DateTime.UtcNow : order.DeliveredDate;

//            _context.SaveChanges();
//            return Ok(order);
//        }



//        // ✅ Track order status
//        [HttpGet("track/{orderId}")]
//        public async Task<IActionResult> TrackOrder(int orderId)
//        {
//            var order = await _context.Orders
//                .Where(o => o.UniqueOrderId == orderId)
//                .Select(o => new
//                {
//                    o.UniqueOrderId,
//                    o.Status,
//                    o.OrderDate,
//                    o.ShippedDate,
//                    o.DeliveredDate
//                })
//                .FirstOrDefaultAsync();

//            if (order == null) return NotFound();

//            return Ok(order);
//        }

//        // Add this to your OrderController

//        [HttpGet("delivery")]
//        public async Task<IActionResult> GetDeliveryOrders()
//        {
//            try
//            {
//                var orders = await _context.Orders
//                    .Where(o => o.Status == "Ordered" || o.Status == "Shipped")
//                    .Include(o => o.User) // Include the User entity
//                    .Include(o => o.OrderItems)
//                    .ThenInclude(oi => oi.Product)
//                    .Select(o => new
//                    {
//                        o.UniqueOrderId,
//                        o.User.Name, // Access the user's name
//                        o.Status,
//                        o.OrderDate,
//                        o.ShippedDate, // Include ShippedDate
//                        o.DeliveredDate, // Include DeliveredDate
//                        OrderItems = o.OrderItems.Select(oi => new
//                        {
//                            oi.ProductId,
//                            ProductTitle = oi.Product.Title,
//                            oi.Quantity,
//                            oi.Price
//                        }).ToList()
//                    })
//                    .ToListAsync();

//                // Log the count of fetched orders
//                Console.WriteLine($"Fetched Orders Count: {orders.Count}");
//                foreach (var order in orders)
//                {
//                    Console.WriteLine($"Order ID: {order.UniqueOrderId}, Status: {order.Status}, User: {order.Name}");
//                }

//                if (!orders.Any())
//                {
//                    return NoContent(); // 204 No Content - Better than 404 if no data
//                }

//                return Ok(orders);
//            }
//            catch (Exception ex)
//            {
//                Console.WriteLine($"🚨 Error fetching delivery orders: {ex.Message}");
//                return StatusCode(500, new { message = "Internal Server Error", error = ex.Message });
//            }
//        }



//        public class OrderStatusUpdateModel
//        {
//            public string Status { get; set; }
//        }
//    }
//}


using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OrganicShopBackend.Data;
using OrganicShopBackend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OrganicShopBackend.Controllers
{
    [Route("api/orders")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public OrderController(ApplicationDbContext context)
        {
            _context = context;
        }

        // ✅ Get all orders for a user
        [HttpGet("history/{userId}")]
        public async Task<IActionResult> GetOrderHistory(int userId)
        {
            try
            {
                var orders = await _context.Orders
                    .Where(o => o.UserId == userId)
                    .Include(o => o.OrderItems)
                    .ThenInclude(oi => oi.Product)
                    .OrderByDescending(o => o.OrderDate)
                    .Select(o => new
                    {
                        o.UniqueOrderId,
                        OrderDate = o.OrderDate, // Already in IST
                        o.TotalAmount,
                        o.Status,
                        ShippedDate = o.ShippedDate, // Already in IST
                        DeliveredDate = o.DeliveredDate, // Already in IST
                        OrderItems = o.OrderItems.Select(oi => new
                        {
                            oi.ProductId,
                            ProductTitle = oi.Product.Title, // ✅ Include Product Title
                            oi.Quantity,
                            oi.Price
                        }).ToList()
                    })
                    .ToListAsync();

                if (!orders.Any())
                    return NotFound(new { message = "No previous orders found." });

                return Ok(orders);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"🚨 Error fetching order history: {ex.Message}");
                return StatusCode(500, new { message = "Internal Server Error", error = ex.Message });
            }
        }

        // ✅ Place a new order
        [HttpPost("placeorder")]
        public async Task<IActionResult> PlaceOrder([FromBody] Order order)
        {
            if (order == null || order.UserId == 0 || order.OrderItems == null || !order.OrderItems.Any())
                return BadRequest("Invalid order details.");

            Console.WriteLine($"🔄 Received Order: {System.Text.Json.JsonSerializer.Serialize(order)}");

            Random random = new Random();
            int newOrderId;
            do
            {
                newOrderId = random.Next(10000, 99999);
            } while (await _context.Orders.AnyAsync(o => o.UniqueOrderId == newOrderId));

            order.UniqueOrderId = newOrderId;
            order.OrderDate = DateTime.UtcNow.AddHours(5).AddMinutes(30); // Convert UTC to IST
            order.Status = "Ordered";

            var user = await _context.Users.FindAsync(order.UserId);
            if (user == null) return BadRequest("Invalid User ID.");
            order.User = user;

            foreach (var item in order.OrderItems)
            {
                var product = await _context.Products.FindAsync(item.ProductId);
                if (product == null) return BadRequest($"Invalid Product ID: {item.ProductId}");
                item.ProductId = product.ProductId;
                item.Order = order;
            }

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            var userCartItems = _context.Carts.Where(c => c.UserId == order.UserId);
            _context.Carts.RemoveRange(userCartItems);
            await _context.SaveChangesAsync();

            return Ok(new { message = "✅ Order placed successfully", orderId = order.UniqueOrderId });
        }

        // ✅ Update order status
        [HttpPut("update-status/{orderId}")]
        public IActionResult UpdateOrderStatus(int orderId, [FromBody] OrderStatusUpdateModel model)
        {
            var order = _context.Orders.FirstOrDefault(o => o.UniqueOrderId == orderId);
            if (order == null)
            {
                return NotFound(); // Return 404 if the order is not found
            }

            order.Status = model.Status;
            order.ShippedDate = model.Status == "Shipped" ? DateTime.UtcNow.AddHours(5).AddMinutes(30) : order.ShippedDate; // Convert UTC to IST
            order.DeliveredDate = model.Status == "Delivered" ? DateTime.UtcNow.AddHours(5).AddMinutes(30) : order.DeliveredDate; // Convert UTC to IST

            _context.SaveChanges();
            return Ok(order);
        }

        // ✅ Track order status
        [HttpGet("track/{orderId}")]
        public async Task<IActionResult> TrackOrder(int orderId)
        {
            var order = await _context.Orders
                .Where(o => o.UniqueOrderId == orderId)
                .Select(o => new
                {
                    o.UniqueOrderId,
                    o.Status,
                    o.OrderDate,
                    o.ShippedDate,
                    o.DeliveredDate
                })
                .FirstOrDefaultAsync();

            if (order == null) return NotFound();

            return Ok(order);
        }

        // ✅ Get orders for delivery team
        [HttpGet("delivery")]
        public async Task<IActionResult> GetDeliveryOrders()
        {
            try
            {
                var orders = await _context.Orders
                    .Where(o => o.Status == "Ordered" || o.Status == "Shipped")
                    .Include(o => o.User) // Include the User entity
                    .Include(o => o.OrderItems)
                    .ThenInclude(oi => oi.Product)
                    .Select(o => new
                    {
                        o.UniqueOrderId,
                        o.User.Name, // Access the user's name
                        o.Status,
                        o.OrderDate,
                        o.ShippedDate, // Already in IST
                        o.DeliveredDate, // Already in IST
                        OrderItems = o.OrderItems.Select(oi => new
                        {
                            oi.ProductId,
                            ProductTitle = oi.Product.Title,
                            oi.Quantity,
                            oi.Price
                        }).ToList()
                    })
                    .ToListAsync();

                // Log the count of fetched orders
                Console.WriteLine($"Fetched Orders Count: {orders.Count}");
                foreach (var order in orders)
                {
                    Console.WriteLine($"Order ID: {order.UniqueOrderId}, Status: {order.Status}, User: {order.Name}");
                }

                if (!orders.Any())
                {
                    return NoContent(); // 204 No Content - Better than 404 if no data
                }

                return Ok(orders);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"🚨 Error fetching delivery orders: {ex.Message}");
                return StatusCode(500, new { message = "Internal Server Error", error = ex.Message });
            }
        }

        public class OrderStatusUpdateModel
        {
            public string Status { get; set; }
        }
    }
}