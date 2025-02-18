
    using System.ComponentModel.DataAnnotations;

    namespace OrganicShopBackend.Models
    {
        public class SignupRequest
        {
            [Required(ErrorMessage = "Name is required.")]
            public string Name { get; set; }

            [Required(ErrorMessage = "Email is required.")]
            [EmailAddress(ErrorMessage = "Invalid email format.")]
            public string Email { get; set; }

            [Required(ErrorMessage = "Password is required.")]
            [MinLength(6, ErrorMessage = "Password must be at least 6 characters long.")]
            public string Password { get; set; }

        [Phone(ErrorMessage = "Invalid phone number format.")] // Optional phone validation
        public string? PhoneNumber { get; set; }

        [StringLength(500, ErrorMessage = "Address cannot exceed 500 characters.")] // Optional address with a length limit
        public string? Address { get; set; }
    }
    }

    
    
