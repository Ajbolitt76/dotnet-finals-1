namespace Contracts.Services;

public record ProblemDetailsResponse(
    string Code,
    string Title,
    string Message);