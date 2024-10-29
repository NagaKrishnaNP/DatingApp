using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Interfaces;
using WebAPI.Services;

namespace WebAPI.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection Services, IConfiguration config)
        {
            Services.AddDbContext<ApplicationDB>(options =>
            {
                options.UseSqlServer(config.GetConnectionString("DefaultConnection"));
            });
            Services.AddControllers();
            Services.AddScoped<ITokenService, TokenService>();

            return Services;
        }
    }
}