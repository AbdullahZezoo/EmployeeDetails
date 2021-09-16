using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeDetails.Models
{
    public class EmployeeTaxs
    {
        [Key]
        public int Id { get; set; }
        [ForeignKey("Employee_EmployeeTax")]
        public int EmployeeId { get; set; }
        public Employee Employee { get; set; }

        public float Tax { get; set; }
        public float NetSalary { get; set; }

    }
}
