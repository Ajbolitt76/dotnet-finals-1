FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["DnDGameService/DnDGameService.csproj", "DnDGameService/"]
RUN dotnet restore "DnDGameService/DnDGameService.csproj"
COPY . .
WORKDIR "/src/DnDGameService"
RUN dotnet build "DnDGameService.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "DnDGameService.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "DnDGameService.dll"]
