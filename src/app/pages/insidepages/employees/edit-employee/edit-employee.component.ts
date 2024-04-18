import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from 'src/app/services/common/models/employee.service';
import { Single_Employe } from 'src/app/contracts/employee/list_employee';
import { EmployeVM } from 'src/app/contracts/employee/employe_vm';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { DeleteDirective } from 'src/app/directives/delete.directive';
import { MatDialog } from '@angular/material/dialog';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/admin/custom-toastr.service';
import { CheckMarkVM, CheckMarkVM_wEmployee } from 'src/app/contracts/checkmark/checkmark_vm';
import { LongdatePipe } from "../../../../pipes/longdate.pipe";
import { CheckmarksService } from 'src/app/services/common/models/checkmarks.service';
import { List_CheckMarks_Employee } from 'src/app/contracts/checkmark/list_checkmarks';

@Component({
    selector: 'app-edit-employee',
    standalone: true,
    templateUrl: './edit-employee.component.html',
    styleUrl: './edit-employee.component.scss',
    imports: [MatTableModule, MatPaginatorModule, CommonModule, MatIconModule, DeleteDirective, LongdatePipe]
})
export class EditEmployeeComponent {
  currentDate = new Date(); // Şu anki tarihi alır
  currentMonth: number;
  empbilgi :any;
  days = ["Pt","Sl","Ça","Pe","Cu","Ct","Pa"];
  checkmarks:CheckMarkVM_wEmployee[];
  empId : string;

  constructor(private route:ActivatedRoute,private checkmarkService:CheckmarksService,private toastrService:CustomToastrService,) {
    this.currentMonth = this.getCurrentMonth(this.currentDate);

  }
  getCurrentMonth(date: Date): number {
    const monthNames = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
                        "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
    return  date.getMonth()+1;
  }

 async ngOnInit() {
    await this.route.params.subscribe(async (params) => {  
      this.empId = params['employeeId']; // URL'deki 'employeeId' parametresini alıyoruz
    });
  }
  async ngAfterViewInit() {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    await this.loadCheckMarks();
  }
  async addCheckMark(){
    try{
      let startDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1); // Ayın ilk günü
      let endDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0); // Ayın son günü
      // Tarihleri UTC'ye dönüştürme
    let utcStartDate = new Date(startDate.getTime() - startDate.getTimezoneOffset() * 60000).toISOString();
    let utcEndDate = new Date(endDate.getTime() - endDate.getTimezoneOffset() * 60000).toISOString();
      debugger;
      let rsp = await this.checkmarkService.create({employeeId:this.empId,startDate:utcStartDate,endDate:utcEndDate});
    }
    catch(e){
      console.log(e);
    }
  }
 async loadCheckMarks(){
  try{
    let response:List_CheckMarks_Employee = await this.checkmarkService.getCheckmarksWithEmployeeId(this.empId,this.currentMonth);
    if (response.checkMarks.length>0){
      this.checkmarks=response.checkMarks;
      this.empbilgi = {
        name: this.checkmarks[0].employee.employeName,
        surname: this.checkmarks[0].employee.employeSurname,
        telno: this.checkmarks[0].employee.employeTelNo,
      }
    }
    else{
      // puantaj boş ise
    }
  
  }
  catch(e){
    console.error('Error loading employees:', e);
  }
  
 }

}
