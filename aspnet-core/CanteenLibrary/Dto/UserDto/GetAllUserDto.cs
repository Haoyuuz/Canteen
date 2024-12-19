using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CanteenLibrary.Dto.UserDto
{
    public class GetAllUserDto
    {
        public Guid CustomerId { get; set; }
        public string UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string? Gender { get; set; }
        public string? Birthdate { get; set; }
        public string? CivilStatus { get; set; }
        public int TotalRecords { get; set; }
        public List<string> Roles { get; set; }
    }
}
