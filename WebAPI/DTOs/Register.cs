using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.DTOs
{
    public class Register
    {
        [Required]
        public string UserName {get;set;}
        [Required]
        public string Password {get;set;}
    }
}