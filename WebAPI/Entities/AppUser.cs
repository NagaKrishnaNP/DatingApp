using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Entities
{
    public class AppUser
    {
        public int Id { get; set; }
        public string? Name {get;set;}

        public byte[] PasswordHash {get;set;}

        public byte[] PasswordSalt{get;set;}
    }
}