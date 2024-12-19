using System;
using System.Collections.Generic;

namespace CanteenLibrary.Entities;

public partial class TblOrderLog
{
    public Guid Id { get; set; }

    public Guid? OrderLogsIdFk { get; set; }

    public string Description { get; set; } = null!;

    public int? Status { get; set; }

    public DateTime CreationTime { get; set; }
}
