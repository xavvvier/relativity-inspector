using RelativityInspector.Web.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

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
select top 10 ID, ArtifactID, isnull(Details,''), TimeStamp, convert(varchar,ISNULL(Sessionidentifier, 0)) as Status
from  EDDSDBO.AuditRecord_PrimaryPartition 
where Action<= 9
order by ID desc";
                string lastQuery = $@"
select ID, ArtifactID, isnull(Details,''), TimeStamp, convert(varchar,ISNULL(Sessionidentifier, 0)) as status
from  EDDSDBO.AuditRecord_PrimaryPartition 
where Action<= 9
and ID >= {last}";
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
                                Name = x.GetString(2),
                                LastExecutionDate = x.GetDateTime(3),
                                Status = x.GetString(4)
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
                        from EDDSDBO.Artifact 
                        where ArtifactID = {artifactID} ", connection))
                {
                    connection.Open();
                    return command.ExecuteScalar() as string;
                } 
            }
        }
    }
}