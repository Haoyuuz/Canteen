using CanteenLibrary.ApiResponseMessage;
using CanteenLibrary.Dto.OrderDto;
using static CanteenLibrary.Services.Admin.Order.OrderServices;

namespace CanteenLibrary.Services.Admin.Order
{
    public interface IOrderServices
    {
        Task<ApiResponseMessage<string>> CreateUserOrders(CreateOrEditOrdersDto dto);
        Task<ApiResponseMessage<List<GetUserItemHeader>>> GetUserOrder(GetUserOrderParams dto);
        Task<ApiResponseMessage<IList<GetAllUserItemHeaderDto>>> GetAllUserOrder();
        Task<ApiResponseMessage<string>> UpdateOrderDetails(UpdateOrderDetailsDto dto);
    }
}