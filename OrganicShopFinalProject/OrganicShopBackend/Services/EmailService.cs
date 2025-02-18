using System;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace OrganicShopBackend.Services
{
    public class EmailService
    {
        private readonly IConfiguration _config;

        public EmailService(IConfiguration config)
        {
            _config = config;
        }

        public async Task SendPasswordResetEmail(string toEmail, string resetToken, string userName)
        {
            var fromEmail = _config["Email:From"];
            var smtpServer = _config["Email:SmtpServer"];
            var smtpPort = int.Parse(_config["Email:SmtpPort"]);
            var username = _config["Email:Username"];
            var password = _config["Email:Password"];

            var mailMessage = new MailMessage
            {
                From = new MailAddress(fromEmail),
                Subject = "Password Reset Request",
                Body = $"Hello {userName},\n\nClick the link below to reset your password:\n\n" +
                       $"http://localhost:3000/reset-password?token={resetToken}",
                IsBodyHtml = false
            };
            mailMessage.To.Add(toEmail);

            using (var smtpClient = new SmtpClient(smtpServer, smtpPort))
            {
                smtpClient.Credentials = new NetworkCredential(username, password);
                smtpClient.EnableSsl = true;

                try
                {
                    await smtpClient.SendMailAsync(mailMessage);
                }
                catch (Exception ex)
                {
                    throw new InvalidOperationException($"Error sending email: {ex.Message}");
                }
            }
        }
    }
}