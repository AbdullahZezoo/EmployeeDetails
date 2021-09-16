import { Injectable, Inject } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmpServiceService {
  myAppUrl: string;
  myApiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };
  constructor(private _http: HttpClient,  @Inject('BASE_URL') baseUrl: string) {
      this.myAppUrl = baseUrl;
      this.myApiUrl = 'api/Employees/';
  }
  
    getEmployee(): Observable<Employee[]> {  
      return this._http.get<Employee[]>(this.myAppUrl + this.myApiUrl)
      .pipe(
        retry(1)
      );
    } 
    
    addEmployee(employee): Observable<Employee>{
      return this._http.post<Employee>(this.myAppUrl + this.myApiUrl, JSON.stringify(employee), this.httpOptions)
      .pipe(
        retry(1)
      ) 
    }

    getEmployeeId(employeeId: number): Observable<Employee>{
      return this._http.get<Employee>(this.myAppUrl + this.myApiUrl + employeeId)
      .pipe(
        retry(1)
      )
    }


    editEmployee(employeeId: number, employee): Observable<Employee>{
      return this._http.put<Employee>(this.myAppUrl + this.myApiUrl + employeeId, JSON.stringify(employee), this.httpOptions)
      .pipe(
        retry(1)
      )
    }

    deleteEmployee(employeeId: number): Observable<Employee>{
      return this._http.delete<Employee>(this.myAppUrl + this.myApiUrl + employeeId)
      .pipe(
        retry(1)
      )
    }


  
   
}

