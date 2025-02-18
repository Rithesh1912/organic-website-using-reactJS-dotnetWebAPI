using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OrganicShopBackend.Models
{
    [Table("Users")]
    public class User
    {
        [Key]
        public int UserId { get; set; }

        [Required]
        public string Name { get; set; }

        // Nullable Username (optional field)
        public string? Username { get; set; }

        [Required, EmailAddress]
        public string Email { get; set; }

        [Required]
        public string PasswordHash { get; set; }  // Store the hashed password

        public string? PhoneNumber { get; set; }
        public string? Address { get; set; }

        // Default Role set to 'User'
        [Required]
        public string Role { get; set; } = "User";

        // Navigation Property to Orders (one-to-many relationship)
        public List<Order> Orders { get; set; } = new List<Order>();
    }
}
