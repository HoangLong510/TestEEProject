using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Models;
using Server.RequestModels;
using Server.Utils;

namespace Server.Repositories.UserRepository
{
    public class UserRepository : IUserRepository
    {
        private readonly DatabaseContext db;

        public UserRepository(DatabaseContext db)
        {
            this.db = db;
        }

        public async Task<Boolean> CheckEmailExists(string email)
        {
            var user = await db.Users.SingleOrDefaultAsync(u => u.Email == email);
            if(user == null)
            {
                return false;
            }
            return true;
        }

        public async Task<Boolean> CreateUser(UserRegister user)
        {
            var newUser = new User
            {
                FullName = user.FullName,
                Email = user.Email,
                Password = PasswordHasher.HashPassword(user.Password)
            };
            db.Users.Add(newUser);
            await db.SaveChangesAsync();
            return true;
        }

        public async Task<User> GetUserByLogin(UserLogin user)
        {
            var findUser = await db.Users.SingleOrDefaultAsync(u => u.Email == user.Email);
            if(findUser != null)
            {
                var isValidPassword = PasswordHasher.VerifyPassword(user.Password, findUser.Password);
                if (isValidPassword)
                {
                    return findUser;
                }
            }
            return null;
        }
    }
}
