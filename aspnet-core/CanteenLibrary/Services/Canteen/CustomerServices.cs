using CanteenLibrary.ApiResponseMessage;
using CanteenLibrary.AuthServices;
using CanteenLibrary.Dto.Customer;
using CanteenLibrary.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CanteenLibrary.Services.Canteen
{
    public class CustomerServices : ICustomerServices
    {
        private readonly BrigadaCanteenContext _context;
        private readonly IUserAuthenticationService _userAuth;

        public CustomerServices(
            BrigadaCanteenContext context,
            IUserAuthenticationService userAuth
            )
        {
            _context = context;
            _userAuth = userAuth;
        }

        public async Task<ApiResponseMessage<string>> CreateOrEditCustomer(CustomerDto Dto)
        {
            try
            {

                if (Dto.Id == null)
                {

                    var userRes = await _userAuth.RegisteredUser(Dto);

                    if (userRes is null)
                    {
                        return new ApiResponseMessage<string>
                        {
                            Data = userRes!,
                            IsSuccess = false,
                            ErrorMessage = ""
                        };
                    }


                    var InsertCustomer = new TblUser
                    {

                        CustomerId = Guid.NewGuid(),
                        Userid = Guid.Parse(userRes),
                        FirstName = Dto.FirstName!,
                        LastName = Dto.Lastname!,
                        Email = Dto.Email!,
                        PhoneNumber = Dto.PhoneNumber!,

                    };



                    await _context.AddAsync(InsertCustomer);

                }
                else
                {
                    //UPDATE INFORMATION
                    var getCustomer = await _context.TblUsers.FirstOrDefaultAsync(x => x.CustomerId == Dto.Id);

                    if (getCustomer is not null)
                    {
                        getCustomer.FirstName = Dto.FirstName!;
                        getCustomer.LastName = Dto.Lastname!;
                        getCustomer.Email = Dto.Email!;
                        getCustomer.PhoneNumber = Dto.PhoneNumber!;

                        //_context.TblCustomers.Update(getCustomer);

                    }

                

                }

                await _context.SaveChangesAsync();


                return new ApiResponseMessage<string>
                {
                    Data = "Success",
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
