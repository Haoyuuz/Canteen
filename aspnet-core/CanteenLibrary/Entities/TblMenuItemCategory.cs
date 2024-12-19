using System;
using System.Collections.Generic;

namespace CanteenLibrary.Entities;

public partial class TblMenuItemCategory
{
    public Guid Id { get; set; }

    public string CategoryName { get; set; } = null!;

    public bool? IsDeleted { get; set; }

    public DateTime CreationTime { get; set; }

    public string? ModifiedBy { get; set; }

    public DateTime? ModifiedTime { get; set; }

    public virtual ICollection<TblMenuItem> TblMenuItems { get; set; } = new List<TblMenuItem>();
}
