using CanteenLibrary.ApiResponseMessage;
using CanteenLibrary.AuthServices;
using CanteenLibrary.Dto.Customer;
using CanteenLibrary.Dto.UserDto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static CanteenLibrary.AuthServices.UserAuthenticationService;

namespace BrigadaCanteen.Controllers.User
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserAuthenticationService _userAuthentication;

        public UserController(IUserAuthenticationService userAuthentication)
        {
            _userAuthentication = userAuthentication;
        }
        [HttpPost("RegisterUser")]
        public async Task<ActionResult<ApiResponseMessage<string>>> RegisterUser(CustomerDto user)
        {
            var result = await _userAuthentication.RegisteredUser(user);
            var _api = new ApiResponseMessage<string>
            {
                Data = result,
                IsSuccess = true,
                ErrorMessage = ""
            };
            return Ok(_api);
        }
        //[Authorize(Roles = UserRole.Admin)]
        [HttpPost("RegisterAdmin")]
        public async Task<ActionResult<ApiResponseMessage<string>>> RegisterAdmin(RegisterUserDto user)
        {
            var res = await _userAuthentication.RegisteredAdmin(user);
            if (res != null)
            {
                return Ok(res);
            }
            return BadRequest(res);
        }
        [AllowAnonymous]
        [HttpPost("Login")]
        public async Task<ActionResult<ApiResponseMessage<UserLoginDto>>> Login(RegisterUserDto user)
        {
            var result = await _userAuthentication.LoginAccount(user);
            return Ok(result);
            //if (result.IsSuccess && result.Data != null)
            //{
            //    // Extract the token from the result
            //    var token = result.Data.UserToken;

            //    // Set the JWT token in an HttpOnly cookie
            //    Response.Cookies.Append("auth_token", token, new CookieOptions
            //    {
            //        HttpOnly = false,
            //        //Secure = true,
            //        SameSite = SameSiteMode.Lax,
            //        Expires = DateTime.Now.AddHours(8),
            //    });

            //    return Ok(result);
            //}
            //return BadRequest(result);
        }

        [HttpGet("GetAllRoles")]
        public async Task<ActionResult<ApiResponseMessage<GetAllRolesDto>>> GetAllRoles()
        {
            var res = await _userAuthentication.GetAllRoles();
            if (res != null)
            {
                return Ok(res);
            }
            return BadRequest(res);
        }

        [HttpPost("GetAllUser")]
        public async Task<ActionResult<ApiResponseMessage<IList<GetAllUserDto>>>> GetAllUser(PagedSortedDto dto)
        {
            var res = await _userAuthentication.GetAllUser(dto);
            if (res != null)
            {
                return Ok(res);
            }
            return BadRequest(res);
        }

        [HttpPost("AddOrRemoveRoles")]
        public async Task<ActionResult<ApiResponseMessage<string>>> AddOrRemoveRoles(AddOrRemoveRolesDto dto)
        {
            var res = await _userAuthentication.AddOrRemoveRoles(dto);
            if (res != null)
            {
                return Ok(res);
            }
            return BadRequest(res);
        }

        [HttpGet("GetAvaialbleRoles")]
        public async Task<ActionResult<ApiResponseMessage<IList<GetAvaialbleRolesDto>>>> GetAvaialbleRoles(Guid id)
        {
            var res = await _userAuthentication.GetAvaialbleRoles(id);
            if (res != null)
            {
                return Ok(res);
            }
            return BadRequest(res);
        }

    }
}
