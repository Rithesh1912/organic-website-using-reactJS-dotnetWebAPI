using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using OrganicShopBackend.Models;

public class Product
{
    public int ProductId { get; set; }

    [Required]
    public string Title { get; set; }

    public string Description { get; set; }

    [Required]
    public decimal Price { get; set; }

    public decimal DiscountPercentage { get; set; }
    public double Rating { get; set; }

    [Required]
    public int QuantityInStock { get; set; }

    public string? Sku { get; set; }

    public double Weight { get; set; }
    public string WarrantyInformation { get; set; } = "No warranty";
    public string ShippingInformation { get; set; } = "Ships in 1-2 business days";
    public string AvailabilityStatus { get; set; } = "In Stock";
    public string ReturnPolicy { get; set; } = "30 days return policy";
    public int MinimumOrderQuantity { get; set; }

    // ✅ Make Images and Thumbnail Optional
    public List<string>? Images { get; set; }
    public string? Thumbnail { get; set; }

    [Required]
    public string Category { get; set; }

    // ✅ Make Tags optional
    public List<string>? Tags { get; set; }

    // ✅ Prevent infinite serialization issue with `[JsonIgnore]`
    [JsonIgnore]
    public List<OrderItem>? OrderItems { get; set; }

    public string GetProductCategoryKey()
    {
        return Category.ToLower();
    }
}
