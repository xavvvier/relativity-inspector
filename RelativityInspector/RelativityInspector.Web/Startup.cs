using Microsoft.Owin;
using Owin;

namespace RelativityInspector.Web
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.MapSignalR();
        }
    }
}