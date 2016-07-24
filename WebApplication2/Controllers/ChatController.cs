using System;
using System.Web.Mvc;
using WebApplication2.Models;

namespace WebApplication2.Controllers
{
    public class ChatController : Controller
    {
        public ActionResult Index() => View();

        [HttpPost]
        [AllowAnonymous]
        public ActionResult GetMessages()
        {
            return Json(new[]
            {
                new MessageViewModel
                {
                    Id = 0,
                    Message = "Message One",
                    DateCreated = DateTime.Now,
                    Creator = "John Silver"
                },
                new MessageViewModel
                {
                    Id = 1,
                    Message = "Message Two",
                    DateCreated = DateTime.Now,
                    Creator = "Flint"
                }
            });
        }

        [HttpPost]
        public ActionResult AddMessage(MessageViewModel message)
        {
            throw new NotImplementedException();
        }
    }
}