using System;
using System.Collections.Generic;
using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;

namespace Persistence
{
    public class Seed
    {
        public static void SeedData(DataContext context) 
        {
            if(!context.Coffee.Any())
            {
                var coffees = new List<Coffee>
                {
                    new Coffee
                    {
                        Name = "Latte",
                        Date = DateTime.Now.AddMonths(-2),
                        Description = "Coffee with milk",
                        Price = "2",
                        Image = null
                    },
                    new Coffee
                    {
                        Name = "Americano",
                        Date = DateTime.Now.AddMonths(-1),
                        Description = "Black coffee",
                        Price = "3",
                        Image = null
                    },
                    new Coffee
                    { 
                        Name = "Black coffee",
                        Date = DateTime.Now.AddMonths(-3),
                        Description = "Black coffee",
                        Price = "2.5",
                        Image = null
                    },
                    new Coffee
                    {
                        Name = "Espresso",
                        Date = DateTime.Now.AddMonths(1),
                        Description = "One espresso shot",
                        Price = "1.5",
                        Image = null
                    },
                    new Coffee
                    {
                        Name = "Latte Caremel",
                        Date = DateTime.Now.AddMonths(4),
                        Description = "Coffee with milk and caramel",
                        Price = "3.5",
                        Image = null
                    }
                };

                context.Coffee.AddRange(coffees);
                context.SaveChanges();
            }
        }
    }
}