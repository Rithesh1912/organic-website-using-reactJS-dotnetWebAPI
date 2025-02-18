using Microsoft.EntityFrameworkCore;
using OrganicShopBackend.Models;

namespace OrganicShopBackend.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<Cart> Carts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Defining relationships
            modelBuilder.Entity<Order>()
                .HasOne(o => o.User)
                .WithMany(u => u.Orders)
                .HasForeignKey(o => o.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<OrderItem>()
                .HasOne(oi => oi.Order)
                .WithMany(o => o.OrderItems)
                .HasForeignKey(oi => oi.OrderId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<OrderItem>()
                .HasOne(oi => oi.Product)
                .WithMany(p => p.OrderItems)
                .HasForeignKey(oi => oi.ProductId)
                .OnDelete(DeleteBehavior.Restrict); // Prevent deletion of product if it exists in an order item

            modelBuilder.Entity<Cart>()
                .HasOne(c => c.User)
                .WithMany()
                .HasForeignKey(c => c.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Cart>()
                .HasOne(c => c.Product)
                .WithMany()
                .HasForeignKey(c => c.ProductId)
                .OnDelete(DeleteBehavior.Restrict); // Prevent deletion of product if it exists in the cart



            // Seeding Admin user
            modelBuilder.Entity<User>().HasData(
                new User
                {
                    UserId = 1,
                    Name = "Freshio",
                    Username = null,
                    Email = "saiakash200236@gmail.com",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("AdminPassword123"),  // Password (hashed)
                    PhoneNumber = "1234567890",  // Example phone number
                    Role = "Admin",  // Role set to Admin
                    Address = "123 Admin Street"
                },
                new User
                {
                    UserId = 2,
                    Name = "Organic Delivery",
                    Username = null,
                    Email = "osdeliveryteam@gmail.com",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("DTPassword123"),  // Delivery Password (hashed)
                    PhoneNumber = "9876543210",
                    Role = "DeliveryTeam",
                    Address = "456 Delivery Street"
                }

            );

            // Seeding Products
            modelBuilder.Entity<Product>().HasData(
                new Product
                {
                    ProductId = 1,
                    Title = "Potatoes",
                    Description = "Versatile and starchy potatoes, great for roasting, mashing, or as a side dish.",
                    Category = "vegetables",
                    Price = 45M,
                    DiscountPercentage = 4.05M,
                    Rating = 3.82,
                    QuantityInStock = 8,
                    Sku = "W4NOBW45",
                    Weight = 250,
                    WarrantyInformation = "5 year warranty",
                    ShippingInformation = "Ships in 1-2 business days",
                    AvailabilityStatus = "In Stock",
                    ReturnPolicy = "7 days return policy",
                    MinimumOrderQuantity = 29,
                    Images = new List<string> { "/images/products/potato.jpg" },
                    Thumbnail = "https://cdn.dummyjson.com/products/images/groceries/Potatoes/thumbnail.png",
                    Tags = new List<string> { "vegetables" }
                },
                new Product
                {
                    ProductId = 2,
                    Title = "Red Onions",
                    Description = "Flavorful and aromatic red onions, perfect for adding depth to your savory dishes.",
                    Category = "vegetables",
                    Price = 50M,
                    DiscountPercentage = 17.89M,
                    Rating = 4.08,
                    QuantityInStock = 86,
                    Sku = "TAF870KJ",
                    Weight = 200,
                    WarrantyInformation = "Lifetime warranty",
                    ShippingInformation = "Ships in 2 weeks",
                    AvailabilityStatus = "In Stock",
                    ReturnPolicy = "60 days return policy",
                    MinimumOrderQuantity = 40,
                    Images = new List<string> { "/images/products/redonion.png" },
                    Thumbnail = "https://cdn.dummyjson.com/products/images/groceries/Red%20Onions/thumbnail.png",
                    Tags = new List<string> { "vegetables" }
                },
                new Product
                {
                    ProductId = 3,
                    Title = "Cucumber",
                    Description = "Crisp and hydrating cucumbers, ideal for salads, snacks, or as a refreshing side.",
                    Category = "vegetables",
                    Price = 30M,
                    DiscountPercentage = 11.44M,
                    Rating = 4.71,
                    QuantityInStock = 22,
                    Sku = "6KGF2K6Z",
                    Weight = 100,
                    WarrantyInformation = "5 year warranty",
                    ShippingInformation = "Ships overnight",
                    AvailabilityStatus = "In Stock",
                    ReturnPolicy = "30 days return policy",
                    MinimumOrderQuantity = 7,
                    Images = new List<string> { "/images/products/cucumber.png" },
                    Thumbnail = "https://cdn.dummyjson.com/products/images/groceries/Cucumber/thumbnail.png",
                    Tags = new List<string> { "vegetables" }
                },
                new Product
                {
                    ProductId = 4,
                    Title = "Beetroot",
                    Description = "Fresh broccoli, packed with vitamins, perfect for healthy meals and salads.",
                    Category = "vegetables",
                    Price = 60M,
                    DiscountPercentage = 12.5M,
                    Rating = 4.5,
                    QuantityInStock = 20,
                    Sku = "0Y4NORN2",
                    Weight = 200,
                    WarrantyInformation = "No warranty applicable",
                    ShippingInformation = "Ships in 1-2 business days",
                    AvailabilityStatus = "In Stock",
                    ReturnPolicy = "7 days return policy",
                    MinimumOrderQuantity = 5,
                    Images = new List<string> { "/images/products/beetroot.png" },
                    Thumbnail = "https://cdn.dummyjson.com/products/images/vegetables/Broccoli/thumbnail.png",
                    Tags = new List<string> { "greens", "healthy", "vegetables" }
                },
                new Product
                {
                    ProductId = 5,
                    Title = "Tomato",
                    Description = "Fresh and juicy tomatoes, perfect for salads, sauces, and cooking.",
                    Category = "vegetables",
                    Price = 90M,
                    DiscountPercentage = 15.0M,
                    Rating = 4.6,
                    QuantityInStock = 50,
                    Sku = "0T3M0T0",
                    Weight = 250,
                    WarrantyInformation = "No warranty applicable",
                    ShippingInformation = "Ships in 1-2 business days",
                    AvailabilityStatus = "In Stock",
                    ReturnPolicy = "7 days return policy",
                    MinimumOrderQuantity = 10,
                    Images = new List<string> { "/images/products/tomato.png" },
                    Thumbnail = "https://cdn.dummyjson.com/products/images/vegetables/Tomato/thumbnail.png",
                    Tags = new List<string> { "fresh", "vegetables", "rich in vitamins" }
                },
                new Product
                {
                    ProductId = 6,
                    Title = "Carrot",
                    Description = "Crunchy and sweet carrots, rich in beta-carotene, ideal for snacks and cooking.",
                    Category = "vegetables",
                    Price = 50M,
                    DiscountPercentage = 5.0M,
                    Rating = 4.8,
                    QuantityInStock = 40,
                    Sku = "0C4R0T0",
                    Weight = 250,
                    WarrantyInformation = "No warranty applicable",
                    ShippingInformation = "Ships in 1-2 business days",
                    AvailabilityStatus = "In Stock",
                    ReturnPolicy = "7 days return policy",
                    MinimumOrderQuantity = 5,
                    Images = new List<string> { "/images/products/carrot.jpg" },
                    Thumbnail = "https://cdn.dummyjson.com/products/images/vegetables/Carrot/thumbnail.png",
                    Tags = new List<string> { "snack", "healthy", "vegetables" }
                },
        new Product
        {
            ProductId = 7,
            Title = "Milk",
            Description = "Fresh and nutritious milk, a staple for various recipes and daily consumption.",
            Category = "essentials",
            Price = 35M,
            DiscountPercentage = 15.09M,
            Rating = 3.14,
            QuantityInStock = 57,
            Sku = "VOZKMF40",
            Weight = 500,
            WarrantyInformation = "6 months warranty",
            ShippingInformation = "Ships in 1 month",
            AvailabilityStatus = "In Stock",
            ReturnPolicy = "7 days return policy",
            MinimumOrderQuantity = 41,
            Images = new List<string> { "/images/products/milk.jpg" },
            Thumbnail = "https://cdn.dummyjson.com/products/images/groceries/Milk/thumbnail.png",
            Tags = new List<string> { "dairy" }
        },
        new Product
        {
            ProductId = 8,
            Title = "Cooking Oil",
            Description = "Pure and clarified butter, perfect for cooking and traditional dishes.",
            Category = "essentials",
            Price = 400M,
            DiscountPercentage = 12.5M,
            Rating = 4.7,
            QuantityInStock = 40,
            Sku = "GH3E5E",
            Weight = 500,
            WarrantyInformation = "No warranty applicable",
            ShippingInformation = "Ships in 1 week",
            AvailabilityStatus = "In Stock",
            ReturnPolicy = "30 days return policy",
            MinimumOrderQuantity = 1,
            Images = new List<string> { "/images/products/cookingoil.png" },
            Thumbnail = "https://cdn.dummyjson.com/products/images/groceries/Ghee/thumbnail.png",
            Tags = new List<string> { "dairy" }
        },
        new Product
        {
            ProductId = 9,
            Title = "Rice",
            Description = "Rich and creamy butter, perfect for spreading or cooking.",
            Category = "essentials",
            Price = 270M,
            DiscountPercentage = 5.0M,
            Rating = 4.6,
            QuantityInStock = 25,
            Sku = "BU8T7E",
            Weight = 250,
            WarrantyInformation = "No warranty applicable",
            ShippingInformation = "Ships in 1 week",
            AvailabilityStatus = "In Stock",
            ReturnPolicy = "30 days return policy",
            MinimumOrderQuantity = 1,
            Images = new List<string> { "/images/products/rice.png" },
            Thumbnail = "https://cdn.dummyjson.com/products/images/groceries/Butter/thumbnail.png",
            Tags = new List<string> { "dairy" }
        },
        new Product
        {
            ProductId = 10,
            Title = "Water",
            Description = "Delicious and creamy cheese, perfect for sandwiches and pizzas.",
            Category = "essentials",
            Price = 300M,
            DiscountPercentage = 7.5M,
            Rating = 4.9,
            QuantityInStock = 20,
            Sku = "CH4E3S",
            Weight = 200,
            WarrantyInformation = "No warranty applicable",
            ShippingInformation = "Ships in 1 week",
            AvailabilityStatus = "In Stock",
            ReturnPolicy = "30 days return policy",
            MinimumOrderQuantity = 1,
            Images = new List<string> { "/images/products/water.png" },
            Thumbnail = "https://cdn.dummyjson.com/products/images/groceries/Cheese/thumbnail.png",
            Tags = new List<string> { "dairy" }
        },
        new Product
        {
            ProductId = 11,
            Title = "Protein Powder",
            Description = "Creamy and tangy yogurt, a great addition to smoothies and desserts.",
            Category = "essentials",
            Price = 75M,
            DiscountPercentage = 10.0M,
            Rating = 4.3,
            QuantityInStock = 60,
            Sku = "YO3G5T",
            Weight = 100,
            WarrantyInformation = "No warranty applicable",
            ShippingInformation = "Ships in 1 week",
            AvailabilityStatus = "In Stock",
            ReturnPolicy = "30 days return policy",
            MinimumOrderQuantity = 1,
            Images = new List<string> { "/images/products/proteinpowder.png" },
            Thumbnail = "https://cdn.dummyjson.com/products/images/groceries/Yogurt/thumbnail.png",
            Tags = new List<string> { "dairy" }
        },

        new Product
        {
            ProductId = 12,
            Title = "Chicken Meat",
            Description = "Fresh and tender chicken meat, suitable for various culinary preparations.",
            Category = "eggandmeat",
            Price = 110M,
            DiscountPercentage = 10.46M,
            Rating = 4.61,
            QuantityInStock = 69,
            Sku = "G5YEHW7B",
            Weight = 250,
            WarrantyInformation = "Lifetime warranty",
            ShippingInformation = "Ships in 1 month",
            AvailabilityStatus = "In Stock",
            ReturnPolicy = "7 days return policy",
            MinimumOrderQuantity = 46,
            Images = new List<string> { "/images/products/chicken.png"},
            Thumbnail = "https://cdn.dummyjson.com/products/images/groceries/Chicken%20Meat/thumbnail.png",
            Tags = new List<string> { "Non-veg" }
        },

        new Product
        {
            ProductId = 13,
            Title = "Eggs",
            Description = "Fresh eggs, a versatile ingredient for baking, cooking, or breakfast.",
            Category = "eggandmeat",
            Price = 6M,
            DiscountPercentage = 5.8M,
            Rating = 4.46,
            QuantityInStock = 10,
            Sku = "YA617RI7",
            Weight = 4,
            WarrantyInformation = "3 year warranty",
            ShippingInformation = "Ships overnight",
            AvailabilityStatus = "In Stock",
            ReturnPolicy = "30 days return policy",
            MinimumOrderQuantity = 43,
            Images = new List<string> { "/images/products/egg.jpg" },
            Thumbnail = "https://cdn.dummyjson.com/products/images/groceries/Eggs/thumbnail.png",
            Tags = new List<string> { "Non-veg" }
        },

        new Product
        {
            ProductId = 14,
            Title = "Fish Steak",
            Description = "Quality fish steak, suitable for grilling, baking, or pan-searing.",
            Category = "eggandmeat",
            Price = 70M,
            DiscountPercentage = 7M,
            Rating = 4.83,
            QuantityInStock = 99,
            Sku = "XNIH1MTA",
            Weight = 8,
            WarrantyInformation = "1 year warranty",
            ShippingInformation = "Ships in 1 month",
            AvailabilityStatus = "In Stock",
            ReturnPolicy = "30 days return policy",
            MinimumOrderQuantity = 49,
            Images = new List<string> { "/images/products/fish.png" },
            Thumbnail = "https://cdn.dummyjson.com/products/images/groceries/Fish%20Steak/thumbnail.png",
            Tags = new List<string> { "Non-veg" }
        },

        new Product
        {
            ProductId = 15,
            Title = "Green Bell Pepper",
            Description = "Fresh and vibrant green bell pepper, perfect for adding color and flavor to your dishes.",
            Category = "vegetables",
            Price = 20M,
            DiscountPercentage = 15.5M,
            Rating = 4.28,
            QuantityInStock = 89,
            Sku = "HU7S7VQ0",
            Weight = 50,
            WarrantyInformation = "5 year warranty",
            ShippingInformation = "Ships overnight",
            AvailabilityStatus = "In Stock",
            ReturnPolicy = "30 days return policy",
            MinimumOrderQuantity = 1,
            Images = new List<string> { "/images/products/greenbell.png" },
            Thumbnail = "https://cdn.dummyjson.com/products/images/groceries/Green%20Bell%20Pepper/thumbnail.png",
            Tags = new List<string> { "Vegetables" }
        },

        new Product
        {
            ProductId = 16,
            Title = "Green Chili Pepper",
            Description = "Spicy green chili pepper, ideal for adding heat to your favorite recipes.",
            Category = "vegetables",
            Price = 30M,
            DiscountPercentage = 18.51M,
            Rating = 4.43,
            QuantityInStock = 8,
            Sku = "Y4RM3JCB",
            Weight = 100,
            WarrantyInformation = "No warranty",
            ShippingInformation = "Ships in 1-2 business days",
            AvailabilityStatus = "In Stock",
            ReturnPolicy = "30 days return policy",
            MinimumOrderQuantity = 43,
            Images = new List<string> { "/images/products/greenchilli.png" },
            Thumbnail = "https://cdn.dummyjson.com/products/images/groceries/Green%20Chili%20Pepper/thumbnail.png",
            Tags = new List<string> { "Vegetables" }
        },

        new Product
        {
            ProductId = 17,
            Title = "Kiwi",
            Description = "Nutrient-rich kiwi, perfect for snacking or adding a tropical twist to your dishes.",
            Category = "fruits",
            Price = 100M,
            DiscountPercentage = 10.32M,
            Rating = 4.37,
            QuantityInStock = 10,
            Sku = "0X3NORB9",
            Weight = 250,
            WarrantyInformation = "6 months warranty",
            ShippingInformation = "Ships in 3-5 business days",
            AvailabilityStatus = "Low Stock",
            ReturnPolicy = "7 days return policy",
            MinimumOrderQuantity = 8,
            Images = new List<string> { "/images/products/kiwi.png" },
            Thumbnail = "https://cdn.dummyjson.com/products/images/groceries/Kiwi/thumbnail.png",
            Tags = new List<string> { "Fruits" }
        },

        new Product
        {
            ProductId = 18,
            Title = "Lemon",
            Description = "Zesty and tangy lemons, versatile for cooking, baking, or making refreshing beverages.",
            Category = "fruits",
            Price = 10M,
            DiscountPercentage = 17.81M,
            Rating = 4.25,
            QuantityInStock = 0,
            Sku = "J074TE3H",
            Weight = 20,
            WarrantyInformation = "3 year warranty",
            ShippingInformation = "Ships in 1 week",
            AvailabilityStatus = "Out of Stock",
            ReturnPolicy = "90 days return policy",
            MinimumOrderQuantity = 1,
            Images = new List<string> { "/images/products/lemon.png" },
            Thumbnail = "https://cdn.dummyjson.com/products/images/groceries/Lemon/thumbnail.png",
            Tags = new List<string> { "Fruits" }
        },

        new Product
        {
            ProductId = 19,
            Title = "Mulberry",
            Description = "Sweet and juicy mulberries, perfect for snacking or adding to desserts and cereals.",
            Category = "fruits",
            Price = 75M,
            DiscountPercentage = 16.35M,
            Rating = 3.19,
            QuantityInStock = 79,
            Sku = "0M1K7RRC",
            Weight = 50,
            WarrantyInformation = "3 months warranty",
            ShippingInformation = "Ships in 1 month",
            AvailabilityStatus = "In Stock",
            ReturnPolicy = "60 days return policy",
            MinimumOrderQuantity = 50,
            Images = new List<string> { "/images/products/mulberry.png" },
            Thumbnail = "https://cdn.dummyjson.com/products/images/groceries/Mulberry/thumbnail.png",
            Tags = new List<string> { "Fruits" }
        },

        new Product
        {
            ProductId = 20,
            Title = "Strawberry",
            Description = "Sweet and succulent strawberries, great for snacking, desserts, or blending into smoothies.",
            Category = "fruits",
            Price = 150M,
            DiscountPercentage = 19.59M,
            Rating = 4.5,
            QuantityInStock = 9,
            Sku = "LPP7I4JZ",
            Weight = 200,
            WarrantyInformation = "1 year warranty",
            ShippingInformation = "Ships in 1 week",
            AvailabilityStatus = "In Stock",
            ReturnPolicy = "30 days return policy",
            MinimumOrderQuantity = 38,
            Images = new List<string> { "/images/products/strawberry.jpg" },
            Thumbnail = "https://cdn.dummyjson.com/products/images/groceries/Strawberry/thumbnail.png",
            Tags = new List<string> { "Fruits" }
        },

        new Product
        {
            ProductId = 21,
            Title = "Apple",
            Description = "Crisp and juicy apples, perfect for snacking or adding to salads.",
            Category = "fruits",
            Price = 200M,
            DiscountPercentage = 10.0M,
            Rating = 4.8,
            QuantityInStock = 50,
            Sku = "AP5L8E23",
            Weight = 250,
            WarrantyInformation = "No warranty applicable",
            ShippingInformation = "Ships in 1-3 business days",
            AvailabilityStatus = "In Stock",
            ReturnPolicy = "30 days return policy",
            MinimumOrderQuantity = 1,
            Images = new List<string> { "/images/products/apple.jpg" },
            Thumbnail = "https://cdn.dummyjson.com/products/images/groceries/Apple/thumbnail.png",
            Tags = new List<string> { "Fruits" }
        },

        new Product
        {
            ProductId = 22,
            Title = "Banana",
            Description = "Fresh and ripe bananas, rich in potassium, perfect for snacking or smoothies.",
            Category = "fruits",
            Price = 25M,
            DiscountPercentage = 10.0M,
            Rating = 4.8,
            QuantityInStock = 100,
            Sku = "BA7A9M23",
            Weight = 30,
            WarrantyInformation = "No warranty applicable",
            ShippingInformation = "Ships in 1-3 business days",
            AvailabilityStatus = "In Stock",
            ReturnPolicy = "30 days return policy",
            MinimumOrderQuantity = 1,
            Images = new List<string> { "/images/products/banana.jpg" },
            Thumbnail = "https://cdn.dummyjson.com/products/images/groceries/Banana/thumbnail.png",
            Tags = new List<string> { "Fruits" }
        }
            );
            base.OnModelCreating(modelBuilder);
        }
    }
}