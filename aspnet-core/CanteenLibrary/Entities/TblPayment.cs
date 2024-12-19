using System;
using System.Collections.Generic;

namespace CanteenLibrary.Entities;

public partial class TblPayment
{
    public Guid PaymentId { get; set; }

    public Guid OrderId { get; set; }

    public DateTime PaymentDate { get; set; }

    public decimal? AmountPaid { get; set; }

    public string PaymentMethod { get; set; } = null!;

    public bool? Status { get; set; }

    public virtual TblOrderTable Order { get; set; } = null!;
}
