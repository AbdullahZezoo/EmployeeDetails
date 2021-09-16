import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmpServiceService } from '../services/emp-service.service';
import { Employee } from '../models/employee';
import { EmployeeTaxs } from '../models/employeeTaxs';
import { EmptaxsServiceService } from '../services/emptaxs-service.service';

@Component({
  selector: 'app-view-data',
  templateUrl: './view-data.component.html',
  styleUrls: ['./view-data.component.css']
})
export class ViewDataComponent implements OnInit {

  employeeId: number;
  employeeTaxsId: number;
  employee: Employee;
  employeeTaxs: EmployeeTaxs;

  constructor(private avRoute: ActivatedRoute, private _EmpService: EmpServiceService, private _EmpTaxsService: EmptaxsServiceService) { 
    if (this.avRoute.snapshot.params["id"]) {
      this.employeeId = this.avRoute.snapshot.params["id"];
    }

    if (this.avRoute.snapshot.params["taxsId"]) {
      this.employeeTaxsId = this.avRoute.snapshot.params["taxsId"];
    }

  }
  ngOnInit() {
    this._EmpService.getEmployeeId(this.employeeId)
        .subscribe(data => (
          this.employee = data
        ));
        console.log(this.employeeTaxsId);
    this._EmpTaxsService.getEmployeeTaxsId(this.employeeTaxsId)
        .subscribe(data => (
          this.employeeTaxs = data
        ));    
  }

}
