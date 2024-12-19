using System;
using System.Collections.Generic;

namespace CanteenLibrary.Entities;

public partial class TblUser
{
    public Guid CustomerId { get; set; }

    public Guid? Userid { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string PhoneNumber { get; set; } = null!;

    public string? Gender { get; set; }

    public DateTime? Birthdate { get; set; }

    public string? CivilStatus { get; set; }

    public virtual ICollection<TblOrderTable> TblOrderTables { get; set; } = new List<TblOrderTable>();
}
