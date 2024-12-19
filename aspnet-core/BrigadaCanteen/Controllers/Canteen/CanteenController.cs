using CanteenLibrary.ApiResponseMessage;
using CanteenLibrary.Dto.Customer;
using CanteenLibrary.Dto.MenuDto;
using CanteenLibrary.Dto.OrderDto;
using CanteenLibrary.Services.Admin.Order;
using CanteenLibrary.Services.Canteen;
using CanteenLibrary.Services.Menu;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using static CanteenLibrary.Services.Admin.Order.OrderServices;

namespace BrigadaCanteen.Controllers.Canteen
{
    [Route("api/[controller]")]
    [ApiController]
    public class CanteenController : ControllerBase
    {
        private readonly ICustomerServices _customer;
        private readonly IMenuServices _menu;
        private readonly IOrderServices _order;

        public CanteenController
        (
        ICustomerServices Customer,
        IMenuServices Menu,
        IOrderServices Order

        )
        {
            _customer = Customer;
            _menu = Menu;
            _order = Order;
        }


        [HttpPost("CreateOrEditCustomer")]
        public async Task<ActionResult<ApiResponseMessage<string>>> CreateOrEditCustomer(CustomerDto Dto)
        {
            var res = await _customer.CreateOrEditCustomer(Dto);
            if (res != null) {
                return Ok(res);
            }
           return BadRequest(res);
        }

        [HttpPost("CreateOrEditMenuCategory")]
        public async Task<ActionResult<ApiResponseMessage<string>>> CreateOrEditMenuCategory(CreateOrEditMenuCategoryDto Dto)
        {
            var res = await _menu.CreateOrEditMenuCategory(Dto);
            if (res != null)
            {
                return Ok(res);
            }
            return BadRequest(res);
        }

        [HttpPost("CreateOrEditMenuItems")]
        public async Task<ActionResult> CreateOrEditMenuItems([FromForm] CreateOrEditMenuItemDto Dto)
        {
            var res = await _menu.CreateOrEditMenuItems(Dto);
            if (res != null)
            {
                return Ok(res);
            }
            return BadRequest(res);
        }

        [HttpGet("GetAllOrGetAllById")]
        public async Task<ActionResult> GetAllOrGetAllById([FromQuery] Guid? id)
        {

            var res = await _menu.GetAllOrGetAllById(id);
            if (res != null)
            {
                return Ok(res);
            }
            return BadRequest(res);
        }

        [HttpGet("GetAllMenuCategory")]
        public async Task<ActionResult> GetAllMenuCategory()
        {

            var res = await _menu.GetAllMenuCategory();
            if (res != null)
            {
                return Ok(res);
            }
            return BadRequest(res);
        }

        [HttpGet("GetAllMenuCategory1")]
        public async Task<ActionResult<ApiResponseMessage<IList<GetAllMenuCategoryDto>>>> GetAllMenuCategory1(int pageIndex, int pageSize, string? searchstring)
        {

            var res = await _menu.GetAllMenuCategory1(pageIndex, pageSize, searchstring);
            if (res != null)
            {
                return Ok(res);
            }
            return BadRequest(res);
        }

        [HttpGet("GetMenuItemById")]
        public async Task<ActionResult> GetMenuItemById(Guid id)
        {

            var res = await _menu.GetMenuItemById(id);
            if (res != null)
            {
                return Ok(res);
            }
            return BadRequest(res);
        }

        [HttpPost("CreateUserOrders")]
        public async Task<ActionResult<ApiResponseMessage<string>>> CreateUserOrders(CreateOrEditOrdersDto dto)
        {

            var res = await _order.CreateUserOrders(dto);
            if(res != null)
            { 
                return Ok(res); 
            }
            return BadRequest(res);


        }

        [HttpPost("GetUserOrder")]
        public async Task<ActionResult<ApiResponseMessage<List<GetUserItemHeader>>>> GetUserOrder(GetUserOrderParams dto)
        {

            var res = await _order.GetUserOrder(dto);
            if (res != null)
            {
                return Ok(res);
            }
            return BadRequest(res);
        }

        [HttpGet("GetAllUserOrder")]
        public async Task<ActionResult<ApiResponseMessage<IList<GetAllUserItemHeaderDto>>>> GetAllUserOrder()
        {

            var res = await _order.GetAllUserOrder();
            if (res != null)
            {
                return Ok(res);
            }
            return BadRequest(res);
        }

        [HttpPost("UpdateOrderDetails")]
        public async Task<ActionResult<ApiResponseMessage<string>>> UpdateOrderDetails(UpdateOrderDetailsDto dto)
        {

            var res = await _order.UpdateOrderDetails(dto);
            if (res != null)
            {
                return Ok(res);
            }
            return BadRequest(res);
        }
    }
}
