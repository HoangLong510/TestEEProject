using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace Server.RequestModels
{
    public class UserRegister
    {
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
    }
}
