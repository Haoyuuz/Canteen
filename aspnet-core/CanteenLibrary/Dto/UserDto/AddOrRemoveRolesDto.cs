using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CanteenLibrary.Dto.UserDto
{
    public class AddOrRemoveRolesDto
    {
        public Guid UserId { get; set; }
        public string Role { get; set; }
        public int ButtonClick { get; set; }
    }
}
