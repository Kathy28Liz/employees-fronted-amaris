import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { environment } from 'src/environments/environment';
import { EmployeesModel } from 'src/app/model/employeers';

@Injectable({
  providedIn: 'root'
})

export class EmployersService {
  BASE_URL = `${environment.endpointAmaris}`;
  constructor(private http: HttpClient) {
  }

  getEmployeersById(id: number): Observable<EmployeesModel>{
    return this.http.get<EmployeesModel>(
      `${this.BASE_URL} employeer/${id}`,{
    responseType:"json",
    }).pipe();
    }

    getAllEmployeers(): Observable<EmployeesModel[]>{
      return this.http.get<EmployeesModel[]>(
        `${this.BASE_URL}/employeers`,{
          responseType: "json",
        }
      )
    }
  }

