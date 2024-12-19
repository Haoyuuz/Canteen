using CanteenLibrary.ApiResponseMessage;
using CanteenLibrary.Dto.Customer;
using CanteenLibrary.Dto.UserDto;
using static CanteenLibrary.AuthServices.UserAuthenticationService;

namespace CanteenLibrary.AuthServices
{
    public interface IUserAuthenticationService
    {
        Task<ApiResponseMessage<UserLoginDto>> LoginAccount(RegisterUserDto login);
        Task<string> RegisteredAdmin(RegisterUserDto register);
        Task<string> RegisteredUser(CustomerDto register);

        Task<ApiResponseMessage<IList<GetAllRolesDto>>> GetAllRoles();
        Task<ApiResponseMessage<IList<GetAllUserDto>>> GetAllUser(PagedSortedDto dto);

        Task<ApiResponseMessage<string>> AddOrRemoveRoles(AddOrRemoveRolesDto dto);

        Task<ApiResponseMessage<IList<GetAvaialbleRolesDto>>> GetAvaialbleRoles(Guid id);
    }
}