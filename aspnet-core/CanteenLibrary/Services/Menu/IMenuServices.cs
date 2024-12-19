using CanteenLibrary.ApiResponseMessage;
using CanteenLibrary.Dto.MenuDto;

namespace CanteenLibrary.Services.Menu
{
    public interface IMenuServices
    {
        Task<ApiResponseMessage<string>> CreateOrEditMenuCategory(CreateOrEditMenuCategoryDto Dto);
        Task<ApiResponseMessage<string>> CreateOrEditMenuItems(CreateOrEditMenuItemDto Dto);
        Task<ApiResponseMessage<IList<GetAllOrGetByIdDto>>> GetAllOrGetAllById(Guid? id);
        Task<ApiResponseMessage<IList<GetAllMenuCategoryDto>>> GetAllMenuCategory();
        Task<ApiResponseMessage<IList<GetAllMenuCategoryDto>>> GetAllMenuCategory1(int pageIndex, int pageSize, string? searchstring);
        Task<ApiResponseMessage<GetMenuItemByIdDto>> GetMenuItemById(Guid id);
    }
}