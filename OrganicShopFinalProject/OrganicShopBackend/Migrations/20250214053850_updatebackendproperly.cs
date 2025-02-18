using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace OrganicShopBackend.Migrations
{
    /// <inheritdoc />
    public partial class updatebackendproperly : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    ProductId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Title = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Description = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Price = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    DiscountPercentage = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    Rating = table.Column<double>(type: "double", nullable: false),
                    QuantityInStock = table.Column<int>(type: "int", nullable: false),
                    Sku = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Weight = table.Column<double>(type: "double", nullable: false),
                    WarrantyInformation = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ShippingInformation = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    AvailabilityStatus = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ReturnPolicy = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    MinimumOrderQuantity = table.Column<int>(type: "int", nullable: false),
                    Images = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Thumbnail = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Category = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Tags = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.ProductId);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Username = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Email = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PasswordHash = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PhoneNumber = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Address = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Role = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserId);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Carts",
                columns: table => new
                {
                    CartId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Carts", x => x.CartId);
                    table.ForeignKey(
                        name: "FK_Carts_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "ProductId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Carts_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    OrderId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    OrderDate = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    TotalAmount = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    Status = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    UniqueOrderId = table.Column<int>(type: "int", nullable: false),
                    ShippedDate = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    DeliveredDate = table.Column<DateTime>(type: "datetime(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.OrderId);
                    table.ForeignKey(
                        name: "FK_Orders_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "OrderItems",
                columns: table => new
                {
                    OrderItemId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    OrderId = table.Column<int>(type: "int", nullable: false),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(65,30)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderItems", x => x.OrderItemId);
                    table.ForeignKey(
                        name: "FK_OrderItems_Orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Orders",
                        principalColumn: "OrderId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrderItems_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "ProductId",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "ProductId", "AvailabilityStatus", "Category", "Description", "DiscountPercentage", "Images", "MinimumOrderQuantity", "Price", "QuantityInStock", "Rating", "ReturnPolicy", "ShippingInformation", "Sku", "Tags", "Thumbnail", "Title", "WarrantyInformation", "Weight" },
                values: new object[,]
                {
                    { 1, "In Stock", "vegetables", "Versatile and starchy potatoes, great for roasting, mashing, or as a side dish.", 4.05m, "[\"/images/products/potato.jpg\"]", 29, 45m, 8, 3.8199999999999998, "7 days return policy", "Ships in 1-2 business days", "W4NOBW45", "[\"vegetables\"]", "https://cdn.dummyjson.com/products/images/groceries/Potatoes/thumbnail.png", "Potatoes", "5 year warranty", 250.0 },
                    { 2, "In Stock", "vegetables", "Flavorful and aromatic red onions, perfect for adding depth to your savory dishes.", 17.89m, "[\"/images/products/redonion.png\"]", 40, 50m, 86, 4.0800000000000001, "60 days return policy", "Ships in 2 weeks", "TAF870KJ", "[\"vegetables\"]", "https://cdn.dummyjson.com/products/images/groceries/Red%20Onions/thumbnail.png", "Red Onions", "Lifetime warranty", 200.0 },
                    { 3, "In Stock", "vegetables", "Crisp and hydrating cucumbers, ideal for salads, snacks, or as a refreshing side.", 11.44m, "[\"/images/products/cucumber.png\"]", 7, 30m, 22, 4.71, "30 days return policy", "Ships overnight", "6KGF2K6Z", "[\"vegetables\"]", "https://cdn.dummyjson.com/products/images/groceries/Cucumber/thumbnail.png", "Cucumber", "5 year warranty", 100.0 },
                    { 4, "In Stock", "vegetables", "Fresh broccoli, packed with vitamins, perfect for healthy meals and salads.", 12.5m, "[\"/images/products/beetroot.png\"]", 5, 60m, 20, 4.5, "7 days return policy", "Ships in 1-2 business days", "0Y4NORN2", "[\"greens\",\"healthy\",\"vegetables\"]", "https://cdn.dummyjson.com/products/images/vegetables/Broccoli/thumbnail.png", "Beetroot", "No warranty applicable", 200.0 },
                    { 5, "In Stock", "vegetables", "Fresh and juicy tomatoes, perfect for salads, sauces, and cooking.", 15.0m, "[\"/images/products/tomato.png\"]", 10, 90m, 50, 4.5999999999999996, "7 days return policy", "Ships in 1-2 business days", "0T3M0T0", "[\"fresh\",\"vegetables\",\"rich in vitamins\"]", "https://cdn.dummyjson.com/products/images/vegetables/Tomato/thumbnail.png", "Tomato", "No warranty applicable", 250.0 },
                    { 6, "In Stock", "vegetables", "Crunchy and sweet carrots, rich in beta-carotene, ideal for snacks and cooking.", 5.0m, "[\"/images/products/carrot.jpg\"]", 5, 50m, 40, 4.7999999999999998, "7 days return policy", "Ships in 1-2 business days", "0C4R0T0", "[\"snack\",\"healthy\",\"vegetables\"]", "https://cdn.dummyjson.com/products/images/vegetables/Carrot/thumbnail.png", "Carrot", "No warranty applicable", 250.0 },
                    { 7, "In Stock", "essentials", "Fresh and nutritious milk, a staple for various recipes and daily consumption.", 15.09m, "[\"/images/products/milk.jpg\"]", 41, 35m, 57, 3.1400000000000001, "7 days return policy", "Ships in 1 month", "VOZKMF40", "[\"dairy\"]", "https://cdn.dummyjson.com/products/images/groceries/Milk/thumbnail.png", "Milk", "6 months warranty", 500.0 },
                    { 8, "In Stock", "essentials", "Pure and clarified butter, perfect for cooking and traditional dishes.", 12.5m, "[\"/images/products/cookingoil.png\"]", 1, 400m, 40, 4.7000000000000002, "30 days return policy", "Ships in 1 week", "GH3E5E", "[\"dairy\"]", "https://cdn.dummyjson.com/products/images/groceries/Ghee/thumbnail.png", "Cooking Oil", "No warranty applicable", 500.0 },
                    { 9, "In Stock", "essentials", "Rich and creamy butter, perfect for spreading or cooking.", 5.0m, "[\"/images/products/rice.png\"]", 1, 270m, 25, 4.5999999999999996, "30 days return policy", "Ships in 1 week", "BU8T7E", "[\"dairy\"]", "https://cdn.dummyjson.com/products/images/groceries/Butter/thumbnail.png", "Rice", "No warranty applicable", 250.0 },
                    { 10, "In Stock", "essentials", "Delicious and creamy cheese, perfect for sandwiches and pizzas.", 7.5m, "[\"/images/products/water.png\"]", 1, 300m, 20, 4.9000000000000004, "30 days return policy", "Ships in 1 week", "CH4E3S", "[\"dairy\"]", "https://cdn.dummyjson.com/products/images/groceries/Cheese/thumbnail.png", "Water", "No warranty applicable", 200.0 },
                    { 11, "In Stock", "essentials", "Creamy and tangy yogurt, a great addition to smoothies and desserts.", 10.0m, "[\"/images/products/proteinpowder.png\"]", 1, 75m, 60, 4.2999999999999998, "30 days return policy", "Ships in 1 week", "YO3G5T", "[\"dairy\"]", "https://cdn.dummyjson.com/products/images/groceries/Yogurt/thumbnail.png", "Protein Powder", "No warranty applicable", 100.0 },
                    { 12, "In Stock", "eggandmeat", "Fresh and tender chicken meat, suitable for various culinary preparations.", 10.46m, "[\"/images/products/chicken.png\"]", 46, 110m, 69, 4.6100000000000003, "7 days return policy", "Ships in 1 month", "G5YEHW7B", "[\"Non-veg\"]", "https://cdn.dummyjson.com/products/images/groceries/Chicken%20Meat/thumbnail.png", "Chicken Meat", "Lifetime warranty", 250.0 },
                    { 13, "In Stock", "eggandmeat", "Fresh eggs, a versatile ingredient for baking, cooking, or breakfast.", 5.8m, "[\"/images/products/egg.jpg\"]", 43, 6m, 10, 4.46, "30 days return policy", "Ships overnight", "YA617RI7", "[\"Non-veg\"]", "https://cdn.dummyjson.com/products/images/groceries/Eggs/thumbnail.png", "Eggs", "3 year warranty", 4.0 },
                    { 14, "In Stock", "eggandmeat", "Quality fish steak, suitable for grilling, baking, or pan-searing.", 7m, "[\"/images/products/fish.png\"]", 49, 70m, 99, 4.8300000000000001, "30 days return policy", "Ships in 1 month", "XNIH1MTA", "[\"Non-veg\"]", "https://cdn.dummyjson.com/products/images/groceries/Fish%20Steak/thumbnail.png", "Fish Steak", "1 year warranty", 8.0 },
                    { 15, "In Stock", "vegetables", "Fresh and vibrant green bell pepper, perfect for adding color and flavor to your dishes.", 15.5m, "[\"/images/products/greenbell.png\"]", 1, 20m, 89, 4.2800000000000002, "30 days return policy", "Ships overnight", "HU7S7VQ0", "[\"Vegetables\"]", "https://cdn.dummyjson.com/products/images/groceries/Green%20Bell%20Pepper/thumbnail.png", "Green Bell Pepper", "5 year warranty", 50.0 },
                    { 16, "In Stock", "vegetables", "Spicy green chili pepper, ideal for adding heat to your favorite recipes.", 18.51m, "[\"/images/products/greenchilli.png\"]", 43, 30m, 8, 4.4299999999999997, "30 days return policy", "Ships in 1-2 business days", "Y4RM3JCB", "[\"Vegetables\"]", "https://cdn.dummyjson.com/products/images/groceries/Green%20Chili%20Pepper/thumbnail.png", "Green Chili Pepper", "No warranty", 100.0 },
                    { 17, "Low Stock", "fruits", "Nutrient-rich kiwi, perfect for snacking or adding a tropical twist to your dishes.", 10.32m, "[\"/images/products/kiwi.png\"]", 8, 100m, 10, 4.3700000000000001, "7 days return policy", "Ships in 3-5 business days", "0X3NORB9", "[\"Fruits\"]", "https://cdn.dummyjson.com/products/images/groceries/Kiwi/thumbnail.png", "Kiwi", "6 months warranty", 250.0 },
                    { 18, "Out of Stock", "fruits", "Zesty and tangy lemons, versatile for cooking, baking, or making refreshing beverages.", 17.81m, "[\"/images/products/lemon.png\"]", 1, 10m, 0, 4.25, "90 days return policy", "Ships in 1 week", "J074TE3H", "[\"Fruits\"]", "https://cdn.dummyjson.com/products/images/groceries/Lemon/thumbnail.png", "Lemon", "3 year warranty", 20.0 },
                    { 19, "In Stock", "fruits", "Sweet and juicy mulberries, perfect for snacking or adding to desserts and cereals.", 16.35m, "[\"/images/products/mulberry.png\"]", 50, 75m, 79, 3.1899999999999999, "60 days return policy", "Ships in 1 month", "0M1K7RRC", "[\"Fruits\"]", "https://cdn.dummyjson.com/products/images/groceries/Mulberry/thumbnail.png", "Mulberry", "3 months warranty", 50.0 },
                    { 20, "In Stock", "fruits", "Sweet and succulent strawberries, great for snacking, desserts, or blending into smoothies.", 19.59m, "[\"/images/products/strawberry.jpg\"]", 38, 150m, 9, 4.5, "30 days return policy", "Ships in 1 week", "LPP7I4JZ", "[\"Fruits\"]", "https://cdn.dummyjson.com/products/images/groceries/Strawberry/thumbnail.png", "Strawberry", "1 year warranty", 200.0 },
                    { 21, "In Stock", "fruits", "Crisp and juicy apples, perfect for snacking or adding to salads.", 10.0m, "[\"/images/products/apple.jpg\"]", 1, 200m, 50, 4.7999999999999998, "30 days return policy", "Ships in 1-3 business days", "AP5L8E23", "[\"Fruits\"]", "https://cdn.dummyjson.com/products/images/groceries/Apple/thumbnail.png", "Apple", "No warranty applicable", 250.0 },
                    { 22, "In Stock", "fruits", "Fresh and ripe bananas, rich in potassium, perfect for snacking or smoothies.", 10.0m, "[\"/images/products/banana.jpg\"]", 1, 25m, 100, 4.7999999999999998, "30 days return policy", "Ships in 1-3 business days", "BA7A9M23", "[\"Fruits\"]", "https://cdn.dummyjson.com/products/images/groceries/Banana/thumbnail.png", "Banana", "No warranty applicable", 30.0 }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserId", "Address", "Email", "Name", "PasswordHash", "PhoneNumber", "Role", "Username" },
                values: new object[,]
                {
                    { 1, "123 Admin Street", "saiakash200236@gmail.com", "Freshio", "$2a$11$9GB34v7yC1Dw1Cl9kHS4a.nLykTHbt.VAuMtfgFVObVznzgGzgHKG", "1234567890", "Admin", null },
                    { 2, "456 Delivery Street", "osdeliveryteam@gmail.com", "Organic Delivery", "$2a$11$Dit4Ux05APr1uXY0ZuyXXu2yZcqb5iwDO9jF.FNhLCaSJQv2s8X2.", "9876543210", "DeliveryTeam", null }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Carts_ProductId",
                table: "Carts",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_Carts_UserId",
                table: "Carts",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderItems_OrderId",
                table: "OrderItems",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderItems_ProductId",
                table: "OrderItems",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_UserId",
                table: "Orders",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Carts");

            migrationBuilder.DropTable(
                name: "OrderItems");

            migrationBuilder.DropTable(
                name: "Orders");

            migrationBuilder.DropTable(
                name: "Products");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
