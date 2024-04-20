import { Component, ElementRef, Renderer2, ViewChild, ViewContainerRef } from '@angular/core';

import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from 'src/app/services/common/models/employee.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { DeleteDirective } from 'src/app/directives/delete.directive';
import { MatDialog } from '@angular/material/dialog';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/admin/custom-toastr.service';
import { CheckMarkVM, CheckMarkWithEmployeeVM } from 'src/app/contracts/checkmark/checkmark_vm';
import { LongdatePipe } from "../../../../pipes/longdate.pipe";
import { CheckmarksService } from 'src/app/services/common/models/checkmarks.service';
import { List_CheckMarks_Employee } from 'src/app/contracts/checkmark/list_checkmarks';
import {  EmployeWithNothingVM, EmployeeWithCheckMarkVM } from 'src/app/contracts/employee/employe_vm';
import { List_CheckMark } from 'src/app/contracts/checkmark/list_checkmark';
import {  NgIf } from '@angular/common';
declare var $: any; // jQuery'yi kullanabilmek için bu deklarasyonu ekleyin

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
  dayOfWeek: number[] = [0, 1, 2, 3, 4, 5, 6]; // Bu diziyi günlerin dizisine göre ayarlayın
  // checkmarks ve addCheckMark fonksiyonunuzu buraya ekleyin
  checkmarks:CheckMarkWithEmployeeVM[];
  empId : string;
  @ViewChild('checkmarkDiv', { read: ViewContainerRef }) checkmarkDiv: ViewContainerRef;

  constructor(private route:ActivatedRoute,private checkmarkService:CheckmarksService,private toastrService:CustomToastrService,private elementRef:ElementRef,private renderer: Renderer2) {
    this.currentMonth = this.getCurrentMonth(this.currentDate);
  }
 async ngOnInit() {

    await this.route.params.subscribe(async (params) => {
       this.empId = params['employeeId'];
    });

  }
  getCurrentMonth(date: Date): number {
    return  date.getMonth()+1;
  }
  calculateOffset(index: number, startDay: any): number {
    const dayOffset = (index + startDay) % 7;
    return dayOffset === 0 ? 0 : dayOffset - 1; // Pazartesi başlangıç olduğu için 0'dan başlamasını sağlayın
  }
  ngAfterViewChecked() {
    // checkmarks varsa ve içeriği dolu ise
    if (this.checkmarks && this.checkmarks.length > 0) {
      // Template True çalıştığında
      const childDiv = document.querySelector('.templateTrue');
      let firstChild = childDiv.firstChild as Element; // Element olarak tip dönüşümü
      if (childDiv && firstChild) {
        // Template True çalıştığında
        let dateStr = firstChild.getAttribute('data-date'); // data-date özelliğine erişme
        let dateObj = new Date(dateStr); // Tarihi Date nesnesine dönüştür
        let dayNumber = dateObj.getDay(); // Haftanın günü adını al
        let marginFactor = 0; // Varsayılan değer
        switch (dayNumber) {
          case 1: // Pazartesi
            marginFactor = 0;
            break;
          case 2: // Salı
            marginFactor = 1;
            break;
          case 3: // Çarşamba
            marginFactor = 2;
            break;
          case 4: // Perşembe
            marginFactor = 3;
            break;
          case 5: // Cuma
            marginFactor = 4;
            break;
          case 6: // Cumartesi
            marginFactor = 5;
            break;
          case 0: // Pazar
            marginFactor = 6;
            break;
        }
        const marginLeftValue = marginFactor * 65; 
        this.renderer.setStyle(childDiv, 'margin-left', `${marginLeftValue}px`); // margin-left ayarla
      } 
    } 
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
      // let rsp = await this.checkmarkService.create({employeeId:this.empId,startDate:utcStartDate,endDate:utcEndDate});
    }
    catch(e){
      console.log(e);
    }
  }
 async loadCheckMarks(){
  try{
    let response:List_CheckMarks_Employee = await this.checkmarkService.getCheckmarksWithEmployeeId(this.empId,this.currentMonth);
    if (response.checkMarks.length>0){
      console.log(response.checkMarks);
      
      this.checkmarks=response.checkMarks;
      this.empbilgi = {
        name: this.checkmarks[0].employee.employeName,
        surname: this.checkmarks[0].employee.employeSurname,
        telno: this.checkmarks[0].employee.employeTelNo,
        departman: this.checkmarks[0].employee.department.name, 
      }
      // bu kısımda checkmarks[0] ilk elemanına bakarak otele class first item margin left vermek istiyorum 
      // let element = $(this.elementRef.nativeElement).find(".templateFalse")
      // console.log($(element));
      
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
