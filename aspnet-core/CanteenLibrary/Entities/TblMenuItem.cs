using System;
using System.Collections.Generic;

namespace CanteenLibrary.Entities;

public partial class TblMenuItem
{
    public Guid Id { get; set; }

    public Guid CategoryId { get; set; }

    public string ItemName { get; set; } = null!;

    public string ItemDesc { get; set; } = null!;

    public decimal Price { get; set; }

    public int StockQuantity { get; set; }

    public bool? IsBestSeller { get; set; }

    public string ImgUrl { get; set; } = null!;

    public bool? IsDeleted { get; set; }

    public DateTime CreationTime { get; set; }

    public string? ModifiedBy { get; set; }

    public DateTime? ModifiedTime { get; set; }

    public virtual TblMenuItemCategory Category { get; set; } = null!;

    public virtual ICollection<TblOrderDetail> TblOrderDetails { get; set; } = new List<TblOrderDetail>();
}
