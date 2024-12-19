using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CanteenLibrary.Dto.OrderDto
{
    public class CreateOrEditOrdersDto
    {
        public Guid CustomerId { get; set; } 
        public Guid StaffId { get; set; } 
        public List<CreateOrEditItemDto> Items { get; set; }
        public string PaymentMethod { get; set; }
    }

    public class CreateOrEditItemDto
    {
        public Guid ItemId { get; set; } 
        public int Quantity { get; set; } 
 
    }


}
