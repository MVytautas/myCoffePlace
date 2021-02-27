using System;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Value> Values { get; set; }
        public DbSet<Coffee> Coffee {get; set;}

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Value>()
                .HasData(
                    new Value {
                        Id = 1,
                        Name = "Picture 1",
                        Price = 1,
                        Image = new byte[64]
                    },
                    new Value {
                        Id = 2,
                        Name = "Picture 2",
                        Price = 1.5M,
                        Image = new byte[64]
                    },
                    new Value {
                        Id = 3,
                        Name = "Picture 3",
                        Price = 3,
                        Image = new byte[64]
                    }
                );
        }

    }
}