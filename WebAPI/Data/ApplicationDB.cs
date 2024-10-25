using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebAPI.Entities;

namespace WebAPI.Data
{
    public class ApplicationDB : DbContext
    {
        public ApplicationDB(DbContextOptions options):base(options)
        {

        }

        public DbSet<AppUser> Users{get;set;}
    }
}