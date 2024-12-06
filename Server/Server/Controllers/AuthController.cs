using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Server.Models;
using Server.Repositories.UserRepository;
using Server.RequestModels;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.RegularExpressions;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserRepository repo;
        private readonly IConfiguration configuration;

        public AuthController(IUserRepository repo, IConfiguration configuration)
        {
            this.repo = repo;
            this.configuration = configuration;
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register([FromBody] UserRegister user)
        {
            var errors = new Dictionary<string, string>();

            // check email
            if (string.IsNullOrWhiteSpace(user.FullName))
            {
                errors["fullName"] = "Full name is required";
            }
            else
            {
                string pattern = @"^(?! )[a-zA-Z\u0080-\uFFFF\s]{2,50}(?<! )$";
                Regex regex = new Regex(pattern);
                if (!regex.IsMatch(user.FullName))
                {
                    errors["fullName"] = "Full name must be between 2 and 50 characters and not contain any special characters";
                }
            }

            // check email
            if (string.IsNullOrWhiteSpace(user.Email))
            {
                errors["email"] = "Email is required";
            }
            else
            {
                string pattern = @"^(([^<>()[\]\\.,;:\s@""']+(\.[^<>()[\]\\.,;:\s@""']+)*)|("".+""))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$";
                Regex regex = new Regex(pattern);
                if (!regex.IsMatch(user.Email))
                {
                    errors["email"] = "Invalid email address";
                }
                else
                {
                    var emailExists = await repo.CheckEmailExists(user.Email);
                    if (emailExists)
                    {
                        errors["email"] = "Email already exists";
                    }
                }
            }

            // check password
            if (string.IsNullOrWhiteSpace(user.Password))
            {
                errors["password"] = "Password is required";
            }
            else
            {
                string pattern = @"^.{6,30}$";
                Regex regex = new Regex(pattern);
                if (!regex.IsMatch(user.Password))
                {
                    errors["password"] = "Password must be between 6 and 30 characters";
                }
            }

            // check confirmPassword
            if (string.IsNullOrWhiteSpace(user.ConfirmPassword))
            {
                errors["confirmPassword"] = "Confirm password is required!";
            }
            else
            {
                if (!user.ConfirmPassword.Equals(user.Password))
                {
                    errors["confirmPassword"] = "Confirm password and password does not match";
                }
            }

            if (errors.Count > 0)
            {
                return BadRequest(new
                {
                    Success = false,
                    Errors = errors,
                    Message = "Invalid registration information! Please check the errors of the fields again."
                });
            }
            else
            {
                await repo.CreateUser(user);

                return Ok(new
                {
                    Success = true,
                    Message = "User registered successfully! Please login to continue."
                });
            }
        }

        private string GenerateToken(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                new Claim("Id", user.Id.ToString()),
                new Claim(ClaimTypes.Role, user.Role.ToString())
            };
            var token = new JwtSecurityToken(
                issuer: configuration["Jwt:Issuer"],
                audience: configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(30),
                signingCredentials: credentials
            );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login(UserLogin userLogin)
        {
            var errors = new Dictionary<string, string>();

            // check email
            if (string.IsNullOrWhiteSpace(userLogin.Email))
            {
                errors["email"] = "Email is required";
            }

            // check password
            if (string.IsNullOrWhiteSpace(userLogin.Password))
            {
                errors["password"] = "Password is required";
            }

            if (errors.Count > 0)
            {
                return BadRequest(new
                {
                    Success = false,
                    Errors = errors,
                    Message = "Invalid login information! Please check the errors of the fields again."
                });
            }
            else
            {
                var user = await repo.GetUserByLogin(userLogin);

                if (user == null)
                {
                    errors["email"] = "Email or password is incorrect!";
                    errors["password"] = "Email or password is incorrect!";

                    return BadRequest(new
                    {
                        Success = false,
                        Errors = errors,
                        Message = "Email or password is incorrect!"
                    });
                }

                var token = GenerateToken(user);

                Response.Cookies.Append("token", token, new CookieOptions
                {
                    HttpOnly = true,
                    SameSite = SameSiteMode.None,
                    Secure = true,
                    Expires = DateTime.UtcNow.AddMinutes(30)
                });

                return Ok(new
                {
                    Success = true,
                    Message = "Login Successfully!"
                });
            }
        }

        
    }
}
