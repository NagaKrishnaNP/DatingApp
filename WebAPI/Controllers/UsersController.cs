using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Entities;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController:ControllerBase
    {
        private readonly ApplicationDB _db;
        public UsersController(ApplicationDB dB)
        {
            _db=dB;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppUser>>> getAllUsers()
        {
            return await _db.Users.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AppUser>> getUsersById(int id)
        {
            return await _db.Users.FindAsync(id);
        }
    }
}