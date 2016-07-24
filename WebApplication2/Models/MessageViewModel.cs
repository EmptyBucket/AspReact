using System;

namespace WebApplication2.Models
{
    public class MessageViewModel
    {
        public string Message { get; set; }
        public string Creator {get; set; }
        public DateTime DateCreated { get; set; }
        public int Id { get; set; }
    }
}