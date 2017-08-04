using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TreeNodeApplication.Models;

namespace TreeNodeApplication.Controllers
{
    public class TreeviewController : Controller
    {
        MenuNavigationEntities dc = new MenuNavigationEntities();
        public ActionResult Menu()
        {
            List<MenuNav> all = new List<MenuNav>();

            all = dc.MenuNav.Where(a => a.ParentMenuID.Equals(0)).ToList();

            return View(all);
        }

        public JsonResult GetSubMenu(string pid)
        {
            System.Threading.Thread.Sleep(3000);
            List<MenuNav> subMenus = new List<MenuNav>();
            int pID = 0;
            int.TryParse(pid, out pID);
            subMenus = dc.MenuNav.Where(a => a.ParentMenuID.Equals(pID)).OrderBy(a => a.MenuName).ToList();
            return new JsonResult { Data = subMenus, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

    }
}
