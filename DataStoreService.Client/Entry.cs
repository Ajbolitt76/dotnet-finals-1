using Contracts.Services;
using DataStoreService.Client.Services;
using Microsoft.Extensions.DependencyInjection;

namespace DataStoreService.Client;

public static class Entry
{
    public static IServiceCollection AddMicroserviceClient<TOptions>(
        this IServiceCollection services,
        string baseUrl)
    {
        services.AddHttpClient<IDataStoreClient, DataStoreClient>(client =>
            {
                client.BaseAddress = new Uri(baseUrl);
                client.Timeout = TimeSpan.FromSeconds(2000);
            });

        return services;
    }
}