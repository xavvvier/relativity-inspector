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
        IEnumerable<AuditItem> items;
        int last = 0;
        public void GetData()
        {

            using (var connection = new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
            {
                string initialQuery = $@" 
select top 10 ID, isnull(Details,''), TimeStamp, convert(varchar,ISNULL(Sessionidentifier, 0)) as Status
from  EDDSDBO.AuditRecord_PrimaryPartition 
where Action<= 9
order by ID desc";
                string lastQuery = $@"
select ID, isnull(Details,''), TimeStamp, convert(varchar,ISNULL(Sessionidentifier, 0)) as status
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
                                AuditID = 1,
                                //Name = x.GetString(1),
                                //LastExecutionDate = x.GetDateTime(2),
                                //Status = x.GetString(3)
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
    }
}