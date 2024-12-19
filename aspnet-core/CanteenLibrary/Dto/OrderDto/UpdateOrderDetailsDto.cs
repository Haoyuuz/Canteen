using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CanteenLibrary.Dto.OrderDto
{
    public class UpdateOrderDetailsDto
    {
        //NAME STAFF THAT WILL PREPARE
        public Guid StaffId { get; set; }
        //FOR PAYMENTS
        public Guid? PaymentId { get; set; }
        public decimal? AmountPaid { get; set; }

        //FOR OrderTable
        public Guid? OrderTableId { get; set; }
        public int? OrderStatus { get; set; }

        //FOR ORDER LOGS
        public Guid? OrderLogsId { get; set; }
        public int? OrderLogsStatus { get; set; }

        //BUTTON CLICK
        public int ButtonClick { get; set; }
    }
}
