import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../models/employee';
import { Observable } from 'rxjs';
import { EmpServiceService } from '../services/emp-service.service';
import { FormGroup, FormControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import { EmptaxsServiceService } from '../services/emptaxs-service.service';
import { EmployeeTaxs } from '../models/employeeTaxs';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  employees$: Observable<Employee[]>;
  employeeTaxs$: Observable<EmployeeTaxs[]>;
  all = [];
  copy: Observable<Employee[]>;

  constructor(private _EmpService: EmpServiceService, private _EmptaxsService: EmptaxsServiceService) { 
  }

  ngOnInit() {
    this.getEmployees();
    this.copy = this.employees$; 
  }

  getEmployees() {
    this.employees$ = this._EmpService.getEmployee();
    this.employeeTaxs$ = this._EmptaxsService.getEmployeeTax();
    this.employees$.forEach(element => {
      
    
    

      element.map(
        p => {
          var empTaxs = this.getEmployeeTaxs(p.id);          
          this.all.push({
            "id": p.id,
            "name": p.name,
            "mobile": p.mobile,
            "email": p.email,
            "salary": p.salary,
            "emp": empTaxs
          });
        }
        
      )
    });

  }

  getEmployeeTaxs(id) {
    return this.employeeTaxs$.
      pipe(map(
        y => {
          const v = y.find(vi => vi.employeeId === id);
          return v;
        }
      ));
  }

  

  searchGroup = new FormGroup({
    data: new FormControl('')
 });

  search(){
    this.employees$ = this.filterEmployee()
    
  }

  filterEmployee() {
    var _data = this.searchGroup.get("data").value;
    if (_data !== ""){
      return this.employees$.
      pipe(map(
        employees => employees.filter(
          p => p.name === _data)
      )
      );
    }else{
       return this.copy;
    }
   
  }

  
  delete(employeeId: number, taxId: number) {
    this._EmpService.deleteEmployee(employeeId)
    .subscribe(
      data => {
          this.getEmployees()
      }
    );
  }
}
