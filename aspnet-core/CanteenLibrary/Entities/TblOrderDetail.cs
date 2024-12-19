using System;
using System.Collections.Generic;

namespace CanteenLibrary.Entities;

public partial class TblOrderDetail
{
    public Guid Id { get; set; }

    public Guid OrderId { get; set; }

    public Guid ItemId { get; set; }

    public int Quantity { get; set; }

    public decimal ItemPrice { get; set; }

    public virtual TblMenuItem Item { get; set; } = null!;

    public virtual TblOrderTable Order { get; set; } = null!;
}
