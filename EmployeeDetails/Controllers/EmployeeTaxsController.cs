using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EmployeeDetails.Data;
using EmployeeDetails.Models;

namespace EmployeeDetails.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeTaxsController : ControllerBase
    {
        private readonly EmployeesContext _context;

        public EmployeeTaxsController(EmployeesContext context)
        {
            _context = context;
        }

        // GET: api/EmployeeTaxs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EmployeeTaxs>>> GetEmployeeTaxs()
        {
            return await _context.EmployeeTaxs.ToListAsync();
        }

        // GET: api/EmployeeTaxs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<EmployeeTaxs>> GetEmployeeTaxs(int id)
        {
            var employeeTaxs = await _context.EmployeeTaxs.FindAsync(id);

            if (employeeTaxs == null)
            {
                return NotFound();
            }

            return employeeTaxs;
        }

        // PUT: api/EmployeeTaxs/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployeeTaxs(int id, EmployeeTaxs employeeTaxs)
        {
            if (id != employeeTaxs.Id)
            {
                return BadRequest();
            }

            _context.Entry(employeeTaxs).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeTaxsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/EmployeeTaxs
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<EmployeeTaxs>> PostEmployeeTaxs(EmployeeTaxs employeeTaxs)
        {
            _context.EmployeeTaxs.Add(employeeTaxs);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEmployeeTaxs", new { id = employeeTaxs.Id }, employeeTaxs);
        }

        // DELETE: api/EmployeeTaxs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployeeTaxs(int id)
        {
            var employeeTaxs = await _context.EmployeeTaxs.FindAsync(id);
            if (employeeTaxs == null)
            {
                return NotFound();
            }

            _context.EmployeeTaxs.Remove(employeeTaxs);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EmployeeTaxsExists(int id)
        {
            return _context.EmployeeTaxs.Any(e => e.Id == id);
        }
    }
}
