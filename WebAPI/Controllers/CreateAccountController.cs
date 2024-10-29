using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Azure.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.DTOs;
using WebAPI.Entities;
using WebAPI.Interfaces;

namespace WebAPI.Controllers
{
    public class CreateAccountController:BaseApiController
    {
        private readonly ApplicationDB _context;
        private readonly ITokenService _tokenService;
        public CreateAccountController(ApplicationDB context,ITokenService tokenService)
        {
            _context=context;
            _tokenService=tokenService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(Register acc)
        {
            if(await usernameExists(acc.UserName))
            {
                return BadRequest("User Name already exists");
            }
            using var hmac=new HMACSHA512();

            var user=new AppUser{
                Name=acc.UserName.ToLower(),
                PasswordHash=hmac.ComputeHash(Encoding.UTF8.GetBytes(acc.Password)),
                PasswordSalt=hmac.Key
            };

            _context.Add(user);
            await _context.SaveChangesAsync();

            return new User{
                UserName=user.Name,
                Token=_tokenService.CreateToken(user)
            };

        }

        [HttpPost("login")]
        public async Task<ActionResult<User>> Login(Login logIn)
        {
            var user=await _context.Users.SingleOrDefaultAsync(x=>x.Name==logIn.UserName);
            if(user==null)
            return Unauthorized("User Name does not Exist");

            using var hmac=new HMACSHA512(user.PasswordSalt);

            var computedHash=hmac.ComputeHash(Encoding.UTF8.GetBytes(logIn.Password));
            for(int i=0;i<computedHash.Length;i++)
            {
                if(computedHash[i]!=user.PasswordHash[i])
                return Unauthorized("Password is wrong");
            }

            return new User{
                UserName=user.Name,
                Token=_tokenService.CreateToken(user)
            };
        }

        private async Task<bool> usernameExists(string username)
        {
            return await _context.Users.AnyAsync(x=>x.Name==username.ToLower());
        }
    }
}