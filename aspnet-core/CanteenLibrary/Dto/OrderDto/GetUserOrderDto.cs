using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CanteenLibrary.Dto.OrderDto
{

    public class GetUserOrderParams 
    {
        public Guid id { get; set; }
        public DateTime? DateFrom { get; set; }
        public DateTime? DateTo { get; set; }
    }

    public class GetUserItemHeader
    {
        public DateTime OderDateOrder { get; set; }
        public string OrderDate { get; set; }
        public string PaymentMethod { get; set; }
        public decimal TotalAmount { get; set; }
        public decimal? AmountPaid { get; set; }
        public int? Status { get; set; }
        public string OrderNum { get; set; }
        public List<GetUserItem> Items { get; set; }
        public List<GetUserOrderLogs> UserLogs { get; set; }
    }
    public class GetUserItem
    {
        public string CategoryName { get; set; }
        public string ItemName { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
    }

    public class GetUserOrderLogs
    {
        public string LogsDescription { get; set; }
        public string CreationTime { get; set; }
        public int? Status { get; set; }
    }


}
