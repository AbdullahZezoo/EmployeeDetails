import { Injectable, Inject } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { EmployeeTaxs } from '../models/employeeTaxs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmptaxsServiceService {
  myAppUrl: string;
  myApiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };
  constructor(private _http: HttpClient,  @Inject('BASE_URL') baseUrl: string) {
      this.myAppUrl = baseUrl;
      this.myApiUrl = 'api/EmployeeTaxs/';
  }
  
    getEmployeeTax(): Observable<EmployeeTaxs[]> {  
      return this._http.get<EmployeeTaxs[]>(this.myAppUrl + this.myApiUrl)
      .pipe(
        retry(1)
      );
    } 
    
    addEmployeeTaxs(employeeTaxs): Observable<EmployeeTaxs>{
      return this._http.post<EmployeeTaxs>(this.myAppUrl + this.myApiUrl, JSON.stringify(employeeTaxs), this.httpOptions)
      .pipe(
        retry(1)
      ) 
    }

    getEmployeeTaxsId(employeeTaxsId: number): Observable<EmployeeTaxs>{
      return this._http.get<EmployeeTaxs>(this.myAppUrl + this.myApiUrl + employeeTaxsId)
      .pipe(
        retry(1)
      )
    }


    editEmployeeTaxs(employeeTaxsId: number, employeeTaxs): Observable<EmployeeTaxs>{
      return this._http.put<EmployeeTaxs>(this.myAppUrl + this.myApiUrl + employeeTaxsId, JSON.stringify(employeeTaxs), this.httpOptions)
      .pipe(
        retry(1)
      )
    }

    deleteEmployeeTaxs(employeeTaxsId: number): Observable<EmployeeTaxs>{
      return this._http.delete<EmployeeTaxs>(this.myAppUrl + this.myApiUrl + employeeTaxsId)
      .pipe(
        retry(1)
      )
    }


  
   
}


