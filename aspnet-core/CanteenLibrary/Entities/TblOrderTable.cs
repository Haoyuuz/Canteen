using System;
using System.Collections.Generic;

namespace CanteenLibrary.Entities;

public partial class TblOrderTable
{
    public Guid OrderId { get; set; }

    public string? OrderNum { get; set; }

    public Guid CustomerId { get; set; }

    public Guid? OrderlogsId { get; set; }

    public Guid? StaffId { get; set; }

    public DateTime OrderDate { get; set; }

    public decimal TotalAmount { get; set; }

    public int? Status { get; set; }

    public virtual TblUser Customer { get; set; } = null!;

    public virtual ICollection<TblOrderDetail> TblOrderDetails { get; set; } = new List<TblOrderDetail>();

    public virtual ICollection<TblPayment> TblPayments { get; set; } = new List<TblPayment>();
}
