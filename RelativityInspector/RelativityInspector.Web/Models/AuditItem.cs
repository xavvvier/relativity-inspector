using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RelativityInspector.Web.Models
{
    public class AuditItem
    {
        public int ArtifactID { get; internal set; }
        public int ArtifactTypeID { get; set; } = 10;
        public long AuditID { get; internal set; }
        public DateTime LastExecutionDate { get; internal set; }
        public object Details { get; set; }
        public string ArtifactName { get; internal set; }
        public int UserID { get; internal set; }
        public string UserName { get; internal set; }
        public int Action { get; internal set; }
        public string ActionName { get; internal set; }
        public int ArtifactTypeID { get; internal set; }
    }
}