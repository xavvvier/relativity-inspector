using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web.Optimization;

namespace RelativityInspector.Web
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            IEnumerable<string> jss = new string[] {
                "~/Scripts/angular.js",
                "~/Scripts/angular-material/angular-material.js",
            };

            jss = jss.Concat(GetApp());

            bundles.Add(new ScriptBundle("~/dist/js")
                .Include(jss.ToArray()));

            bundles.Add(new StyleBundle("~/dist/css")
                .Include(new string[] {
                        "~/Content/angular-material.css",
                        "~/Content/main.css",
                    }));

        }

        public static string[] GetApp()
        {
            var jss = Directory.GetFiles(string.Format("{0}/{1}",
                System.AppDomain.CurrentDomain.BaseDirectory,
                "Scripts/app"
                ), "*.js", SearchOption.AllDirectories);

            var jssFormated = jss.Select(script => string.Format("~/{0}",
                script.Substring(script.IndexOf("Scripts"))));

            List<string> resutl = new List<string>();

            // add modules
            addScript(ref resutl, ref jssFormated, ".module.");
            addScript(ref resutl, ref jssFormated, ".const.");
            addScript(ref resutl, ref jssFormated, ".config.");
            addScript(ref resutl, ref jssFormated, ".factory.");
            addScript(ref resutl, ref jssFormated, ".service.");
            addScript(ref resutl, ref jssFormated, ".controller.");
            addScript(ref resutl, ref jssFormated, ".directive.");
            addScript(ref resutl, ref jssFormated, ".run.");

            return resutl.ToArray();
        }
        private static void addScript(ref List<string> resutl, ref IEnumerable<string> jssFormated, string p)
        {
            var refResult = resutl;
            jssFormated
                .Where(script => script.Contains(p))
                .OrderByDescending(script => script.Split('.').Count())
                .ToList()
                .ForEach(script => refResult.Add(script))
            ;
        }


    }


}
