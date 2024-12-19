
namespace CanteenLibrary.AmazonS3
{
    public interface IS3Services
    {
        Task DeleteFileAsync(string fileUrl, string folderPath);
        Task<string> UploadFileAsync(Stream fileStream, string fileName, string contentType, string folderPath);
    }
}