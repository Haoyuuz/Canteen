using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CanteenLibrary.Dto.MenuDto
{
    public class GetMenuItemByIdDto
    {
        public Guid? Id { get; set; }
        public Guid CategoryId { get; set; }
        public string CategoryName { get; set; }
        public string ItemName { get; set; }
        public string ItemDesc { get; set; }
        public decimal Price { get; set; }
        public int StockQuantity { get; set; }
        public string ImgUrl { get; set; }
    }
}
