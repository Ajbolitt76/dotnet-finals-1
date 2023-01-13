FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["DataStoreService/DataStoreService.csproj", "DataStoreService/"]
RUN dotnet restore "DataStoreService/DataStoreService.csproj"
COPY . .
WORKDIR "/src/DataStoreService"
RUN dotnet build "DataStoreService.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "DataStoreService.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "DataStoreService.dll"]
