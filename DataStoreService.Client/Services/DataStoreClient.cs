using Contracts.Services;

namespace DataStoreService.Client.Services;

public class DataStoreClient : HttpClientBase, IDataStoreClient
{
    protected DataStoreClient(HttpClient httpClient) : base(httpClient)
    {
    }
}