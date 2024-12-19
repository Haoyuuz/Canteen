using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CanteenLibrary.Dto.OrderDto
{
    public class GetAllOrderTodayDto
    {
    }

    public class GetAllUserItemHeaderDto
    {
        public DateTime OderDateOrder { get; set; }
        public string UserName { get; set; }
        public string StaffName { get; set; }
        public string OrderDate { get; set; }
        public string PaymentMethod { get; set; }
        public decimal TotalAmount { get; set; }
        public decimal? AmountPaid { get; set; }
        public int? Status { get; set; }
        public string OrderNum { get; set; }
        public Guid PaymentId { get; set; }
        public Guid OrderId { get; set; }
        public Guid? OrderLogsId { get; set; }
        public IList<GetAllUserItemDto> Items { get; set; }
        public IList<GetAllUserOrderLogsDto> UserLogs { get; set; }
    }
    public class GetAllUserItemDto
    {
        public string CategoryName { get; set; }
        public string ItemName { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
    }

    public class GetAllUserOrderLogsDto
    {
        public string LogsDescription { get; set; }
        public string CreationTime { get; set; }
        public int? Status { get; set; }
    }
}
