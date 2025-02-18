using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace OrganicShopBackend.Models
{
    [Table("OrderItems")]
    public class OrderItem
    {
        [Key]
        public int OrderItemId { get; set; }

        [Required, ForeignKey("Order")]
        public int OrderId { get; set; }

        [JsonIgnore] // ✅ Prevent infinite loop when serializing JSON
        public Order? Order { get; set; }

        [Required, ForeignKey("Product")]
        public int ProductId { get; set; }

        public Product? Product { get; set; }  // ✅ Make this nullable

        [Required]
        public int Quantity { get; set; }

        [Required]
        public decimal Price { get; set; }

        [NotMapped]
        public decimal Subtotal => Quantity * Price;
    }
}
