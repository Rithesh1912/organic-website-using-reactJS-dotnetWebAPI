using System.ComponentModel.DataAnnotations;

namespace OrganicShopBackend.Models
{
    public class ForgotPasswordRequest
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}