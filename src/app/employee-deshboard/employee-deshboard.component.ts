import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms'
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-deshboard.Model';

@Component({
  selector: 'app-employee-deshboard',
  templateUrl: './employee-deshboard.component.html',
  styleUrls: ['./employee-deshboard.component.css']
})
export class EmployeeDeshboardComponent implements OnInit {
  formValue !:FormGroup;
  employeeData !:any;
  employeeModelObj:EmployeeModel=new EmployeeModel();
  showAdd !: boolean;
  showUbdate !:boolean;
  constructor(private formbuilder:FormBuilder,
    private api:ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstName:[''],
      lastName:[''],
      email :[''],
      mobile:[''],
      salary:[''],
    })
    this.getAllEmployee();
  }
  clickAddEmployee(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUbdate=false;

  }
  postEmployeeDetails(){
    this.employeeModelObj.firstName=this.formValue.value.firstName;
    this.employeeModelObj.lastName=this.formValue.value.lastName;
    this.employeeModelObj.email=this.formValue.value.email;
    this.employeeModelObj.mobile=this.formValue.value.mobile;
    this.employeeModelObj.salary=this.formValue.value.salary;
  
    this.api.postEmploye(this.employeeModelObj)
    .subscribe((res: any)=>{
      console.log(res);
      alert("Employee Addded Successfully")
      let ref = document.getElementById("cancel")
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    },
      (err: any)=>{
      alert("Something Erorr")
    })
  }
  getAllEmployee(){
    this.api.getEmploye()
    .subscribe(res=>{
      this.employeeData=res;
    })
  }
  deleteEmployee(row : any){
    this.api.deleteEmploye(row.id)
    .subscribe((res: any)=>{
     alert("Employee Deleted")
      this.getAllEmployee();
    })
  }
  onEdit(row : any){
    this.showAdd=false;
    this.showUbdate=true;
    this.employeeModelObj.id=row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);

  }
  updateEmployeeDetails(){
    this.employeeModelObj.firstName=this.formValue.value.firstName;
    this.employeeModelObj.lastName=this.formValue.value.lastName;
    this.employeeModelObj.email=this.formValue.value.email;
    this.employeeModelObj.mobile=this.formValue.value.mobile;
    this.employeeModelObj.salary=this.formValue.value.salary;
    
    this.api.updateEmploye(this.employeeModelObj,this.employeeModelObj.id)
    .subscribe((res:any)=>{
      alert("UpDate Successfully ");
      let ref = document.getElementById("cancel")
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    })
  }

}
