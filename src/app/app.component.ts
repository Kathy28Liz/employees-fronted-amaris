import { EmployersService } from './services/employers.service';
import { Component, Injector, Input, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";

import { EmployeesModel } from './model/employeers';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';
  public loading: boolean;
private employees!: EmployeesModel;
private employeesList!: EmployeesModel[];

private employeesService: EmployersService;

private tableBody='';
private urlImage;

constructor(
  private injector: Injector
){
  this.employeesService= injector.get<EmployersService>(EmployersService);
  this.urlImage = "https://2.bp.blogspot.com/-zpkdHbE717M/V6zIBmEpDFI/AAAAAAAAA-0/APQQeS8fCRw3eSITJVZZ68oIeeol1TjDwCLcB/s1600/bella%2Bla%2Bpaz%2Bcopia.jpg";
this.loading = false;
}

ngOnInit(){
  this.getAllEmployees();
}

getAllEmployees(){
this.employeesService.getAllEmployeers().subscribe(
  (data: EmployeesModel[])=>{
    this.loading=true
    this.employeesList = data;
    console.log(data);
    if(data.length>=0){
    this.employeesList.forEach((employee,index) => {
      this.loadData(employee);
      console.log(this.employeesList);
      this.loading=false

      })
    }
    })
}

searchEmployees(idInput: string){
  if(idInput!=null&& Number(idInput)>0){
    this.getEmployeesById(idInput);
  }else{
    this.getAllEmployees();
  }
}

getEmployeesById(id: string){
  this.employeesService.getEmployeersById(Number(id)).subscribe(
    (data: EmployeesModel)=>{
      this.loading=true;
      this.employees=data;
      if(this.employees!=null){
        this.tableBody='';
        this.loadData(this.employees);
      }
      this.loading=false
    })

}


loadData(employee: EmployeesModel){

  this.tableBody += `<tr>
  <td class="centered">${employee.id}</td>
  <td class="centered">${employee.employee_name}</td>
  <td class="centered">${employee.employee_age}</td>
  <td class="centered">${employee.employee_salary}</td>
  <td class="centered">${employee.employee_salary_annual}</td>
  <td class="centered">${employee.profile_image}</td>
  </tr>`;

 var tableBody_Users=document.getElementById('tableBody_Users');

 if(tableBody_Users!=null){
  tableBody_Users.innerHTML=this.tableBody;
}
}
}
