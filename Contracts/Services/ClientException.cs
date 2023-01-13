namespace Contracts.Services;

/// <summary>
/// Исключение клиента микросервиса
/// </summary>
public class ClientException : Exception
{
    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="message">Сообщение об ошибке</param>
    /// <param name="responseMessage">HTTP-ответ</param>
    public ClientException(
        string message,
        HttpResponseMessage responseMessage)
        : base(message)
        => ResponseMessage = responseMessage ?? throw new ArgumentNullException(nameof(responseMessage));

    /// <summary>
    /// Ответ от сервиса
    /// </summary>
    public HttpResponseMessage ResponseMessage { get; }
}