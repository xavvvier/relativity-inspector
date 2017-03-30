using Microsoft.AspNet.SignalR;
using RelativityInspector.Web.Models;
using System.Collections.Generic;

namespace RelativityInspector.Web
{
    public class AuditHub : Hub
    {
        public static void Notify(IEnumerable<AuditItem> audits)
        {
            IHubContext context = GlobalHost.ConnectionManager.GetHubContext<AuditHub>();
            context.Clients.All.newData();
        }
    }
}