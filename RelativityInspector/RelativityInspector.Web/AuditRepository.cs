using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using RelativityInspector.Web.Models;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
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
SELECT TOP 10 CONVERT( BIGINT, AR.ID) [ID],
              AR.ArtifactID,
              AO.TextIdentifier AS ArtifactName,
              AR.UserID,
              AU.FullName,
              isnull(Details, '') AS Details,
              TimeStamp,
              AR.ACTION,
              AA.ACTION AS ActionName,
              AO.ArtifactTypeID
FROM EDDSDBO.AuditRecord_PrimaryPartition AR WITH (NOLOCK)
     JOIN EDDSDBO.AuditObject AO WITH (NOLOCK) ON AR.ArtifactID = AO.ArtifactID
     JOIN EDDSDBO.AuditUser AU WITH (NOLOCK) ON AR.UserID = AU.UserID
     JOIN EDDSDBO.AuditAction AA WITH (NOLOCK) ON AR.ACTION = AA.AuditActionID
WHERE AR.ACTION <= 9
      AND AR.UserID NOT IN(9, 777)
order by ID desc
";
                string lastQuery = $@"
SELECT CONVERT( BIGINT, AR.ID) [ID],
              AR.ArtifactID,
              AO.TextIdentifier AS ArtifactName,
              AR.UserID,
              AU.FullName,
              isnull(Details, '') AS Details,
              TimeStamp,
              AR.ACTION,
              AA.ACTION AS ActionName,
              AO.ArtifactTypeID
FROM EDDSDBO.AuditRecord_PrimaryPartition AR WITH (NOLOCK)
     JOIN EDDSDBO.AuditObject AO WITH (NOLOCK) ON AR.ArtifactID = AO.ArtifactID
     JOIN EDDSDBO.AuditUser AU WITH (NOLOCK) ON AR.UserID = AU.UserID
     JOIN EDDSDBO.AuditAction AA WITH (NOLOCK) ON AR.ACTION = AA.AuditActionID
WHERE AR.ACTION <= 9
      AND AR.UserID NOT IN(9, 777)
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
            if (!string.IsNullOrWhiteSpace(data)
                && data.Trim().StartsWith("<")
                && !data.Equals("<auditElement />"))
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