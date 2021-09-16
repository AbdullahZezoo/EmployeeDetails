import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmpServiceService } from '../services/emp-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeTaxs } from '../models/employeeTaxs';
import { EmptaxsServiceService } from '../services/emptaxs-service.service';

@Component({
  selector: 'app-add-update-employee',
  templateUrl: './add-update-employee.component.html',
  styleUrls: ['./add-update-employee.component.css']
})
export class AddUpdateEmployeeComponent implements OnInit {

  actionType: string;
  employeeId: number;
  errorMessage: any;
  existingEmployee: Employee;
  employeeForm = new FormGroup({
    name: new FormControl(''),
    mobile: new FormControl(''),
    email: new FormControl('', Validators.email),
    salary: new FormControl('')
  });

  constructor(private _EmpService: EmpServiceService, private _EmpTaxsService: EmptaxsServiceService, private avRoute: ActivatedRoute, private router: Router) {
    this.actionType = 'Add';

    if (this.avRoute.snapshot.params["id"]) {
      this.employeeId = this.avRoute.snapshot.params["id"];
    }
  }

  ngOnInit() {

    if (this.employeeId > 0) {
      this.actionType = 'Edit';
      this._EmpService.getEmployeeId(this.employeeId)
        .subscribe(data => (
          this.existingEmployee = data,
          this.employeeForm.controls["name"].setValue(data.name),
          this.employeeForm.controls["mobile"].setValue(data.mobile),
          this.employeeForm.controls["email"].setValue(data.email),
          this.employeeForm.controls["salary"].setValue(data.salary)
        ));
    }
  }

  save() {
    if (!this.employeeForm.valid) {
      return;
    }
    if (this.actionType === 'Add') {
      let employee: Employee = {
        name: this.employeeForm.get("name").value,
        mobile: this.employeeForm.get("mobile").value.toString(),
        email: this.employeeForm.get("email").value,
        salary: this.employeeForm.get("salary").value
      };
      var tax = employee.salary / 100 * 10;
      
      this._EmpService.addEmployee(employee)
        .subscribe((data) => {
          let employeeTaxs: EmployeeTaxs = {
            employeeId: data.id,
            tax: tax,
            netSalary: data.salary - tax
          };
          this._EmpTaxsService.addEmployeeTaxs(employeeTaxs).subscribe((data => {
            this.router.navigate(['/']);
          }));
        });
    }

    if (this.actionType === 'Edit') {
      console.log("Edit");

      let employee: Employee = {
        id: this.existingEmployee.id,
        name: this.employeeForm.get("name").value,
        mobile: this.employeeForm.get("mobile").value,
        email: this.employeeForm.get("email").value,
        salary: this.employeeForm.get("salary").value
      };
      var tax = employee.salary / 100 * 10;

      this._EmpService.editEmployee(this.existingEmployee.id, employee)
        .subscribe((data) => {
          let employeeTaxs: EmployeeTaxs = {
            employeeId: data.id,
            tax: tax,
            netSalary: data.salary - tax
          };
            this.router.navigate([this.router.url]);
        });
    }
  }

  cancel() {
    this.router.navigate(['/']);
  }

}
