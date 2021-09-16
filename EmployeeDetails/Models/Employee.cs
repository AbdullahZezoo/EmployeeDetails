using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeDetails.Models
{
    public class Employee
    {
        [Key]
        public int Id { get; set; }
        public String Name { get; set; }
        public String Mobile { get; set; }
        public String Email { get; set; }
        public float Salary { get; set; }
    }
}
