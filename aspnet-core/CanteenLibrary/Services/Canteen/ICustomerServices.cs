using CanteenLibrary.ApiResponseMessage;
using CanteenLibrary.Dto.Customer;

namespace CanteenLibrary.Services.Canteen
{
    public interface ICustomerServices
    {
        Task<ApiResponseMessage<string>> CreateOrEditCustomer(CustomerDto Dto);
    }
}