using System.Configuration;
using System.Data.SqlClient;
using System.Web.Http;
using System.Web.Optimization;

namespace RelativityInspector.Web
{
    public class WebApiApplication : System.Web.HttpApplication
    {

        private string ConnectionString
        {
            get
            {
                return ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
            }
        }
        private static AuditRepository repository;
        protected void Application_Start()
        {
            GlobalConfiguration.Configure(WebApiConfig.Register);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            SqlDependency.Start(ConnectionString);
            repository = new AuditRepository();
            repository.GetData();
        }

        protected void Application_End()
        {
            SqlDependency.Stop(ConnectionString);
        }

    }
}
