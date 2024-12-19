using Amazon.S3.Model;
using CanteenLibrary.AmazonS3;
using CanteenLibrary.ApiResponseMessage;
using CanteenLibrary.Dto.OrderDto;
using CanteenLibrary.Entities;
using Microsoft.EntityFrameworkCore;
using Namotion.Reflection;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CanteenLibrary.Services.Admin.Order
{
    public class OrderServices : IOrderServices
    {
        private readonly BrigadaCanteenContext _context;

        public OrderServices(BrigadaCanteenContext context)
        {
            _context = context;

        }


        public async Task<string> CreateOrderLogs(Guid? orderlogsId, int? seqNum)
        {



            string logsMessage = seqNum switch
            {
                1 => "Pending",
                2 => "Your food is being prepared",
                3 => "Your food is ready for pickup",
                _ => "Failed"
            };

            var logs = new TblOrderLog
            {
                Id = Guid.NewGuid(),
                OrderLogsIdFk = orderlogsId,
                Description = logsMessage,
                CreationTime = DateTime.Now,
                Status = seqNum,
            };


            _context.TblOrderLogs.Add(logs);
            await _context.SaveChangesAsync();

            return logsMessage;
        }


        private async Task<string> GenerateUniqueOrderNumAsync()
        {
            string orderNum;
            bool isDuplicate;

            do
            {

                int number = new Random().Next(1000, 99999);
                //BRIGADA CANTEEN ORDER NUMBER - BCON
                orderNum = $"BCON-{number}";


                isDuplicate = await _context.TblOrderTables
                    .AnyAsync(x => x.OrderNum == orderNum);
            }
            while (isDuplicate);

            return orderNum;
        }

        public async Task<ApiResponseMessage<string>> CreateUserOrders(CreateOrEditOrdersDto dto)
        {
            try
            {

                var getUser = await _context.TblUsers.FirstOrDefaultAsync(x => x.Userid == dto.CustomerId );

                var order = new TblOrderTable
                {
                    OrderId = Guid.NewGuid(),
                    CustomerId = getUser!.CustomerId,
                    OrderNum = await GenerateUniqueOrderNumAsync(),
                    OrderlogsId = Guid.NewGuid(),
                    OrderDate = DateTime.Now,
                    TotalAmount = 0,
                    Status = 0,
                };

                _context.TblOrderTables.Add(order);


                var orderDetails = dto.Items.Select(item =>
                {
                    var itemDetails = _context.TblMenuItems.FirstOrDefault(i => i.Id == item.ItemId);

                    if (itemDetails != null)
                    {
                        // Deduct quantity from the stock
                        itemDetails.StockQuantity -= item.Quantity;


                        if (itemDetails.StockQuantity < 0)
                        {

                            itemDetails.StockQuantity = 0;

                            throw new InvalidOperationException($"Not enough stock for item: {itemDetails.ItemName}");

                        }

                        return new TblOrderDetail
                        {
                            Id = Guid.NewGuid(),
                            OrderId = order.OrderId,
                            ItemId = item.ItemId,
                            Quantity = item.Quantity,
                            ItemPrice = itemDetails.Price
                        };
                    }

                    return null;

                }).Where(x => x != null).ToList();


                order.TotalAmount = orderDetails.Sum(x => x!.ItemPrice * x.Quantity);

                _context.TblOrderDetails.AddRange(orderDetails!);

                var getMenuItem = new TblPayment
                {
                    PaymentId = Guid.NewGuid(),
                    OrderId = order.OrderId,
                    PaymentDate = DateTime.Now,
                    AmountPaid = 0,
                    PaymentMethod = dto.PaymentMethod,
                    Status = false,
                };

                _context.TblPayments.Add(getMenuItem);

                var awlogs = await CreateOrderLogs(order.OrderlogsId, 1);

                if (awlogs == "Failed")
                {

                    return new ApiResponseMessage<string>
                    {
                        Data = "SequenceNum not exist",
                        IsSuccess = false,
                        ErrorMessage = ""

                    };
                }


                await _context.SaveChangesAsync();


                return new ApiResponseMessage<string>
                {
                    Data = "Order Placed",
                    IsSuccess = true,
                    ErrorMessage = ""

                };
            }
            catch (Exception ex)
            {

                return new ApiResponseMessage<string>
                {
                    Data = "",
                    IsSuccess = false,
                    ErrorMessage = ex.Message

                };
            }
        }

        public async Task<List<GetUserItemHeader>> getUserOrderFromTo(GetUserOrderParams dto)
        {
            try
            {
                var getData = await
                   (
                       from customer in _context.TblUsers
                       join ordertable in _context.TblOrderTables on customer.CustomerId equals ordertable.CustomerId
                       join payment in _context.TblPayments on ordertable.OrderId equals payment.OrderId
                       join orderdetails in _context.TblOrderDetails on ordertable.OrderId equals orderdetails.OrderId
                       join orderlogs in _context.TblOrderLogs on ordertable.OrderlogsId equals orderlogs.OrderLogsIdFk
                       join menuitem in _context.TblMenuItems on orderdetails.ItemId equals menuitem.Id
                       join menucat in _context.TblMenuItemCategories on menuitem.CategoryId equals menucat.Id
                       where customer.Userid == dto.id && ordertable.OrderDate >= dto.DateFrom && ordertable.OrderDate <= dto.DateTo
                       group new
                       {
                           menucat.CategoryName,
                           menuitem.ItemName,
                           menuitem.Price,
                           orderdetails.Quantity,
                           orderlogs.Description,
                           orderlogs.CreationTime,
                           orderlogs.Status,

                       }
                       by new
                       {
                           ordertable.OrderDate,
                           payment.PaymentMethod,
                           ordertable.TotalAmount,
                           payment.AmountPaid,
                           ordertable.Status,
                           ordertable.OrderId,
                           ordertable.OrderNum,
                       } into groupedOrder
                       select new GetUserItemHeader
                       {
                           OderDateOrder = groupedOrder.Key.OrderDate,
                           OrderDate = groupedOrder.Key.OrderDate.ToString("yyyy-MM-dd"),
                           PaymentMethod = groupedOrder.Key.PaymentMethod,
                           TotalAmount = groupedOrder.Key.TotalAmount,
                           AmountPaid = groupedOrder.Key.AmountPaid,
                           Status = groupedOrder.Key.Status,
                           OrderNum = groupedOrder.Key.OrderNum,
                           Items = groupedOrder.Select(item => new GetUserItem
                           {
                               CategoryName = item.CategoryName,
                               ItemName = item.ItemName,
                               Price = item.Price,
                               Quantity = item.Quantity
                           }).Distinct().ToList(),
                           UserLogs = groupedOrder.Select(log => new GetUserOrderLogs
                           {

                               LogsDescription = log.Description,
                               CreationTime = log.CreationTime.ToString("hh:mm tt"),
                               Status = log.Status,

                           }).Distinct().ToList()
                       }).ToListAsync();

                getData = getData.OrderByDescending(x => x.OderDateOrder).ThenBy(x => x.Status).ToList();

                return getData;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<ApiResponseMessage<List<GetUserItemHeader>>> GetUserOrder(GetUserOrderParams dto)
        {
            try
            {

                List<GetUserItemHeader> getuserData;



                if (dto.DateFrom is not null && dto.DateTo is not null)
                {

                    DateTime dateFrom = new DateTime(dto.DateFrom.Value.Year, dto.DateFrom.Value.Month, dto.DateFrom.Value.Day, 0, 0, 0).AddDays(1);
                    DateTime dateTo = new DateTime(dto.DateTo.Value.Year, dto.DateTo.Value.Month, dto.DateTo.Value.Day, 23, 59, 59).AddDays(1);

                    dto.DateFrom = dateFrom;
                    dto.DateTo = dateTo;

                    var data = await getUserOrderFromTo(dto);
                    getuserData = data.ToList();

                }
                else
                {

                    var now = DateTime.Now;

                    DateTime dateFrom = new DateTime(now.Year, now.Month, now.Day, 0, 0, 0);
                    DateTime dateTo = new DateTime(now.Year, now.Month, now.Day, 23, 59, 59);

                    dto.DateFrom = dateFrom;
                    dto.DateTo = dateTo;

                    var data = await getUserOrderFromTo(dto);
                    getuserData = data.ToList();

                }




                return new ApiResponseMessage<List<GetUserItemHeader>>
                {
                    Data = getuserData,
                    IsSuccess = true,
                    ErrorMessage = ""
                };
            }
            catch (Exception ex)
            {
                return new ApiResponseMessage<List<GetUserItemHeader>>
                {
                    Data = null,
                    IsSuccess = false,
                    ErrorMessage = ex.Message
                };
            }
        }

        public async Task<ApiResponseMessage<IList<GetAllUserItemHeaderDto>>> GetAllUserOrder()
        {
            try
            {
                IList<GetAllUserItemHeaderDto> getData;

                var now = DateTime.Now;

                DateTime dateFrom = new DateTime(now.Year, now.Month, now.Day, 0, 0, 0);
                DateTime dateTo = new DateTime(now.Year, now.Month, now.Day, 23, 59, 59);



                getData = await
                    (
                    from customer in _context.TblUsers
                    join ordertable in _context.TblOrderTables on customer.CustomerId equals ordertable.CustomerId
                    join payment in _context.TblPayments on ordertable.OrderId equals payment.OrderId
                    join orderdetails in _context.TblOrderDetails on ordertable.OrderId equals orderdetails.OrderId
                    join orderlogs in _context.TblOrderLogs on ordertable.OrderlogsId equals orderlogs.OrderLogsIdFk
                    join menuitem in _context.TblMenuItems on orderdetails.ItemId equals menuitem.Id
                    join menucat in _context.TblMenuItemCategories on menuitem.CategoryId equals menucat.Id
                    join staff in _context.TblUsers on ordertable.StaffId equals staff.CustomerId into staffJoin
                    from staff in staffJoin.DefaultIfEmpty() 
                    where ordertable.OrderDate >= dateFrom && ordertable.OrderDate <= dateTo
                    group new
                    {
                        menucat.CategoryName,
                        menuitem.ItemName,
                        menuitem.Price,
                        orderdetails.Quantity,
                        orderlogs.Description,
                        orderlogs.CreationTime,
                        orderlogs.Status,
                        staff.FirstName, 
                        staff.LastName  
                    }
                    by new
                    {
                        customer.FirstName,
                        customer.LastName,
                        ordertable.OrderDate,
                        payment.PaymentMethod,
                        ordertable.TotalAmount,
                        payment.AmountPaid,
                        ordertable.Status,
                        ordertable.OrderId,
                        ordertable.OrderNum,
                        payment.PaymentId,
                        orderlogs.OrderLogsIdFk,
                    } into groupedOrder
                    select new GetAllUserItemHeaderDto
                    {
                        UserName = groupedOrder.Key.FirstName + " " + groupedOrder.Key.LastName,
                        OderDateOrder = groupedOrder.Key.OrderDate,
                        OrderDate = groupedOrder.Key.OrderDate.ToString("yyyy-MM-dd"),
                        PaymentMethod = groupedOrder.Key.PaymentMethod,
                        TotalAmount = groupedOrder.Key.TotalAmount,
                        AmountPaid = groupedOrder.Key.AmountPaid,
                        Status = groupedOrder.Key.Status,
                        OrderNum = groupedOrder.Key.OrderNum,
                        PaymentId = groupedOrder.Key.PaymentId,
                        OrderId = groupedOrder.Key.OrderId,
                        OrderLogsId = groupedOrder.Key.OrderLogsIdFk,
                        StaffName = groupedOrder.Select(item => (item.FirstName + " " + item.LastName)).FirstOrDefault() ?? "No Staff", 
                        Items = groupedOrder.Select(item => new GetAllUserItemDto
                        {
                            CategoryName = item.CategoryName,
                            ItemName = item.ItemName,
                            Price = item.Price,
                            Quantity = item.Quantity
                        }).Distinct().ToList(),
                        UserLogs = groupedOrder.Select(log => new GetAllUserOrderLogsDto
                        {
                            LogsDescription = log.Description,
                            CreationTime = log.CreationTime.ToString("hh:mm tt"),
                            Status = log.Status,
                        }).Distinct().ToList()
                    }).ToListAsync();



                getData = getData.OrderBy(x => x.Status).ToList();


                return new ApiResponseMessage<IList<GetAllUserItemHeaderDto>>
                {
                    Data = getData,
                    IsSuccess = true,
                    ErrorMessage = ""
                };

            }
            catch (Exception ex)
            {

                return new ApiResponseMessage<IList<GetAllUserItemHeaderDto>>
                {
                    Data = [],
                    IsSuccess = false,
                    ErrorMessage = ex.Message
                };
            }
        }

        public async Task<ApiResponseMessage<string>> UpdateOrderDetails(UpdateOrderDetailsDto dto)
        {
            try
            {
                var apiMessage = "";


                switch (dto.ButtonClick)
                {
                    case 1:
                        var payment = await _context.TblPayments.FirstOrDefaultAsync(x => x.PaymentId == dto.PaymentId);
                        if (payment != null)
                        {
                            payment.AmountPaid = dto.AmountPaid;

                            apiMessage = "Paid Amount Saved";


                        }
                        break;

                    case 2:
                        var order = await _context.TblOrderTables.FirstOrDefaultAsync(x => x.OrderId == dto.OrderTableId);
                        if (order != null)
                        {
                            order.Status = dto.OrderStatus;

                            apiMessage = "Order Status Updated";
                        }
                        break;

                    case 3:


                        if (dto.OrderLogsStatus == 2) {

                            var getOrder = await _context.TblOrderTables.FirstOrDefaultAsync(x => x.OrderId == dto.OrderTableId);
                            var getStaff = await _context.TblUsers.FirstOrDefaultAsync(x => x.Userid == dto.StaffId);

                            getOrder!.StaffId = getStaff!.CustomerId;
                        }

                        await CreateOrderLogs(dto.OrderLogsId, dto.OrderLogsStatus);

                        apiMessage = "Order Logs Updated";

                        break;

                    default:
                        apiMessage = "Invalid action";
                        break;
                }


                if (!string.IsNullOrEmpty(apiMessage) && !apiMessage.Equals("Invalid action"))
                {
                    await _context.SaveChangesAsync();
                }

                return new ApiResponseMessage<string>
                {
                    Data = apiMessage,
                    IsSuccess = true,
                    ErrorMessage = ""
                };


            }
            catch (Exception ex)
            {

                return new ApiResponseMessage<string>
                {
                    Data = "",
                    IsSuccess = false,
                    ErrorMessage = ex.Message
                };
            }
        }
    }
}
