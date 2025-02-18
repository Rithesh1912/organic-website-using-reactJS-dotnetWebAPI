using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OrganicShopBackend.Models
{
    [Table("Orders")]
    public class Order
    {
        [Key]
        public int OrderId { get; set; } // This is the internal database ID (auto-incremented)

        [Required, ForeignKey("User")]
        public int UserId { get; set; }
        public User? User { get; set; }

        [Required]
        public DateTime OrderDate { get; set; } = DateTime.UtcNow;

        [Required]
        public decimal TotalAmount { get; set; }

        public List<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

        [Required]
        public string Status { get; set; } = "Ordered"; // Default status

        [Required]
        [DatabaseGenerated(DatabaseGeneratedOption.None)] // Ensure this is manually assigned
        public int UniqueOrderId { get; set; } // ✅ Stores the unique 5-digit order ID

        public DateTime? ShippedDate { get; set; } // New field for shipped date
        public DateTime? DeliveredDate { get; set; } // New field for delivered date
    }
}