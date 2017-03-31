using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using RelativityInspector.Web.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Xml;

namespace RelativityInspector.Web
{
    public class AuditRepository
    {

        private string ConnectionString
        {
            get
            {
                return ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
            }
        }
        IEnumerable<AuditItem> items;
        long last = 0;
        public void GetData()
        {

            using (var connection = new SqlConnection(ConnectionString))
            {
                string initialQuery = $@" 
select top 10
    AR.ID, 
    AR.ArtifactID, 
    AO.TextIdentifier as ArtifactName,
    AR.UserID,
    AU.FullName,
    isnull(Details,'') as Details, 
    TimeStamp,
    AR.Action,
    AA.Action as ActionName,
    AO.ArtifactTypeID
from  EDDSDBO.AuditRecord_PrimaryPartition AR with (NOLOCK)
join EDDSDBO.AuditObject AO with (NOLOCK) on AR.ArtifactID = AO.ArtifactID
join EDDSDBO.AuditUser AU with (NOLOCK) on AR.UserID = AU.UserID
join EDDSDBO.AuditAction AA with (NOLOCK) on AR.Action = AA.AuditActionID
where AR.Action<= 9 and AR.UserID not in (9, 777)
order by ID desc";
                string lastQuery = $@"
select
    AR.ID, 
    AR.ArtifactID, 
    AO.TextIdentifier as ArtifactName,
    AR.UserID,
    AU.FullName,
    isnull(Details,'') as Details, 
    TimeStamp,
    AR.Action,
    AA.Action as ActionName,
    AO.ArtifactTypeID
from  EDDSDBO.AuditRecord_PrimaryPartition AR with (NOLOCK)
join EDDSDBO.AuditObject AO with (NOLOCK) on AR.ArtifactID = AO.ArtifactID
join EDDSDBO.AuditUser AU with (NOLOCK) on AR.UserID = AU.UserID
join EDDSDBO.AuditAction AA with (NOLOCK) on AR.Action = AA.AuditActionID
where AR.Action<= 9 and AR.UserID not in (9, 777)
and ID > {last}";
                var query = last == 0 ? initialQuery : lastQuery;
                connection.Open();
                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    // Make sure the command object does not already have
                    // a notification object associated with it.
                    command.Notification = null;

                    SqlDependency dependency = new SqlDependency(command);
                    dependency.OnChange += new OnChangeEventHandler(dependency_OnChange);

                    if (connection.State == ConnectionState.Closed)
                        connection.Open();

                    using (var reader = command.ExecuteReader())
                    {
                        items = reader.Cast<IDataRecord>()
                            .Select(x => new AuditItem()
                            {
                                AuditID = x.GetInt64(0),
                                ArtifactID = x.GetInt32(1),
                                ArtifactName = x.GetString(2),
                                UserID = x.GetInt32(3),
                                UserName = x.GetString(4),
                                Details = ToObject(x.GetString(5)),
                                LastExecutionDate = x.GetDateTime(6),
                                Action = x.GetInt32(7),
                                ActionName = x.GetString(8),
                                ArtifactTypeID = x.GetInt32(9)
                            }).OrderBy(x => x.AuditID).ToList();
                        last = items.Last().AuditID;
                        if (items.Any())
                        {
                            AuditHub.Notify(items);
                        }
                    }
                }
            }
        }
        public object ToObject(string data)
        {
            if (!string.IsNullOrWhiteSpace(data) && data.Trim().StartsWith("<"))
            {
                XmlDocument doc = new XmlDocument();
                doc.LoadXml(data);
                string json = JsonConvert.SerializeXmlNode(doc, Newtonsoft.Json.Formatting.None, true);
                return JObject.Parse(json);
            }
            return null;
        }
        private void dependency_OnChange(object sender, SqlNotificationEventArgs e)
        {
            GetData();
        }

        public string ArtifactTextIdentifier(int artifactID)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                using (var command = 
                    new SqlCommand($@"select TextIdentifier 
                        from EDDSDBO.AuditObject 
                        where ArtifactID = {artifactID} ", connection))
                {
                    connection.Open();
                    return command.ExecuteScalar() as string;
                } 
            }
        }
    }
}