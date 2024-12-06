using Server.Models;
using Server.RequestModels;

namespace Server.Repositories.UserRepository
{
    public interface IUserRepository
    {
        Task<Boolean> CheckEmailExists(string email);
        Task<Boolean> CreateUser(UserRegister user);

        Task<User> GetUserByLogin(UserLogin user);
    }
}
