using RelativityInspector.Web.Models;
using System.Collections.Generic;
using System.Web.Http;

namespace RelativityInspector.Web.Controllers
{
    public class ObjectTypeController: ApiController
    {
        [HttpGet]
        public IEnumerable<Artifact> ObjectTypes()
        {
            var repository = new AuditRepository();
            var listOfObjectTypes = repository.ObjectTypes();
            return listOfObjectTypes;
        }
    }
}