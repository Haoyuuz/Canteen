using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CanteenLibrary.Dto.MenuDto
{
    public class CreateOrEditMenuItemDto
    {
        public Guid? Id { get; set; }
        public Guid CategoryId { get; set; }
        public string ItemName { get; set; }
        public string ItemDesc { get; set; }
        public Decimal Price { get; set; }
        public int StockQuantity { get; set; }
        public IFormFile? file { get; set; }
    }
}
