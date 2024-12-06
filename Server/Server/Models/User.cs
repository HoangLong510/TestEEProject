using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Server.Models
{
    public enum UserRole
    {
        Admin,
        User
    }

    public enum UserGender
    {
        Male,
        Female,
        Other
    }

    public class User
    {
        public int Id { get; set; }

        public string FullName { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public string Phone { get; set; } = string.Empty;

        public string Address { get; set; } = string.Empty;

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public UserGender Gender { get; set; } = UserGender.Other;

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public UserRole Role { get; set; } = UserRole.User;
    }
}
