using RelativityInspector.Web.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Web.Http;

namespace RelativityInspector.Web.Controllers
{
    public class AuditController : ApiController
    {
        public InspectResult Inspect(IEnumerable<int> objectTypes)
        {
            var result = new InspectResult();
            try
            {
                result.Success = true;
            }
            catch (Exception e)
            {
                result.Message = e.Message;
            }
            return result;
        }

    }
}
