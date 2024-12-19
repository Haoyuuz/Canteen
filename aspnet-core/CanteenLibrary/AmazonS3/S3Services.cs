using Amazon.S3;
using Amazon.S3.Model;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CanteenLibrary.AmazonS3
{
    public class S3Services : IS3Services
    {
        private readonly IAmazonS3 _s3Client;
        private readonly AwsSettings _awsSettings;

        public S3Services(IAmazonS3 s3Client, IOptions<AwsSettings> awsOptions)
        {
            _s3Client = s3Client;
            _awsSettings = awsOptions.Value;
        }

        public async Task<string> UploadFileAsync(Stream fileStream, string fileName, string contentType, string folderPath)
        {
            if (fileStream == null || fileStream.Length == 0)
            {
                throw new ArgumentException("File stream cannot be null or empty", nameof(fileStream));
            }

            if (string.IsNullOrEmpty(fileName))
            {
                throw new ArgumentException("File name cannot be null or empty", nameof(fileName));
            }

            if (string.IsNullOrEmpty(contentType))
            {
                throw new ArgumentException("Content type cannot be null or empty", nameof(contentType));
            }

            var key = $"{folderPath}/{fileName}";

            var uploadRequest = new PutObjectRequest
            {
                InputStream = fileStream,
                Key = key,
                BucketName = _awsSettings.BucketName,
                ContentType = contentType
            };

            try
            {
                var response = await _s3Client.PutObjectAsync(uploadRequest);


                var objectUrl = $"https://{_awsSettings.BucketName}.s3.{_awsSettings.Region}.amazonaws.com/{folderPath}/{fileName}";

                return objectUrl; // Return the URL of the uploaded file
            }
            catch (AmazonS3Exception ex)
            {
                throw new InvalidOperationException($"Error occurred while uploading the file to S3: {ex.Message}", ex);
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException($"Unexpected error occurred: {ex.Message}", ex);
            }
        }

        public async Task DeleteFileAsync(string fileUrl, string folderPath)
        {
            var uri = new Uri(fileUrl);
            var fileName = Path.GetFileName(uri.LocalPath);
            var key = $"{folderPath}/{fileName}";

            var deleteObjectRequest = new DeleteObjectRequest
            {
                BucketName = _awsSettings.BucketName,
                Key = key
            };

            await _s3Client.DeleteObjectAsync(deleteObjectRequest);
        }
    }
}
