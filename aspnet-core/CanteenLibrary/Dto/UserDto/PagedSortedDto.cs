using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CanteenLibrary.Dto.UserDto
{
    public class PagedSortedDto
    {
        public int pageIndex { get; set; }
        public int pageSize { get; set; }
        public string searchstring { get; set; }
    }
}
