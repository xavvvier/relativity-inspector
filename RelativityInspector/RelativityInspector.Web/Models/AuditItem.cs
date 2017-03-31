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
        public string Name { get; internal set; }
        public string Status { get; internal set; }
    }
}