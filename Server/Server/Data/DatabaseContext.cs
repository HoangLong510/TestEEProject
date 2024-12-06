using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Server.Models;

namespace Server.Data
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>()
                .Property(u => u.Role)
                .HasConversion(new EnumToStringConverter<UserRole>());

            modelBuilder.Entity<User>()
                .Property(u => u.Gender)
                .HasConversion(new EnumToStringConverter<UserGender>());
        }
    }
}
