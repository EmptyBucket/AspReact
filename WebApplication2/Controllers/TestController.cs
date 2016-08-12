using System.Web.Mvc;

namespace WebApplication2.Controllers
{
    public class TestController : Controller
    {
        public ActionResult Index() => View("Index");
    }
}