import { Component, ElementRef, Renderer2, ViewChild, ViewContainerRef } from '@angular/core';

import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from 'src/app/services/common/models/employee.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule, DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { DeleteDirective } from 'src/app/directives/delete.directive';
import { MatDialog } from '@angular/material/dialog';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/admin/custom-toastr.service';
import { CheckMarkVM, CheckMarkWithEmployeeVM } from 'src/app/contracts/checkmark/checkmark_vm';
import { LongdatePipe } from "../../../../pipes/longdate.pipe";
import { CheckmarksService } from 'src/app/services/common/models/checkmarks.service';
import { List_CheckMarks_Employee } from 'src/app/contracts/checkmark/list_checkmarks';
import { EmployeWithNothingVM, EmployeeWithCheckMarkVM } from 'src/app/contracts/employee/employe_vm';
import { List_CheckMark } from 'src/app/contracts/checkmark/list_checkmark';
import { NgIf } from '@angular/common';
import { GetMonthNamePipe } from 'src/app/pipes/getmonthname.pipe';

declare var $: any; // jQuery'yi kullanabilmek için bu deklarasyonu ekleyin

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.scss',
  imports: [MatTableModule, MatPaginatorModule, CommonModule, MatIconModule, DeleteDirective, LongdatePipe, GetMonthNamePipe]
})

export class EditEmployeeComponent {
  currentDate = new Date(); // Şu anki tarihi alır
  currentMonth: number;
  empbilgi: any;
  days = ["Pt", "Sl", "Ça", "Pe", "Cu", "Ct", "Pa"];
  dayOfWeek: number[] = [0, 1, 2, 3, 4, 5, 6]; // Bu diziyi günlerin dizisine göre ayarlayın
  // checkmarks ve addCheckMark fonksiyonunuzu buraya ekleyin
  responseListCheckmarks: List_CheckMarks_Employee;
  empId: string;
  @ViewChild('checkmarkDiv', { read: ViewContainerRef }) checkmarkDiv: ViewContainerRef;
  previousDates: Date[] = [];

  constructor(private route: ActivatedRoute, private cdr: ChangeDetectorRef, private checkmarkService: CheckmarksService, private toastrService: CustomToastrService, private elementRef: ElementRef, private renderer: Renderer2) {
    this.currentMonth = this.getCurrentMonth(this.currentDate);
  }
  async ngOnInit() {

    await this.route.params.subscribe(async (params) => {
      this.empId = params['employeeId'];
    });
    await this.loadCheckMarks();

  }
  getCurrentMonth(date: Date): number {
    return date.getMonth() + 1;
  }
  calculateOffset(index: number, startDay: any): number {
    const dayOffset = (index + startDay) % 7;
    return dayOffset === 0 ? 0 : dayOffset - 1; // Pazartesi başlangıç olduğu için 0'dan başlamasını sağlayın
  }
  createNewElement(div: Element, dates: Date[]) {

    const tempElements = []; // Geçici dizi oluşturuluyor.

    for (let i = 0; i < dates.length; i++) {
      let newElement = document.createElement('p');
      newElement.classList.add('dateStr');
      newElement.setAttribute('data-date', dates[i].getDate().toString());
      console.log(dates[i].getDate().toString());

      // Set the text content with formatting
      let datePipe = new DatePipe('en-US'); // Assuming you have DatePipe imported
      let formattedDate = datePipe.transform(dates[i], 'd');
      newElement.textContent = formattedDate;

      tempElements.push(newElement); // Geçici diziye element ekleniyor.
    }

    // Dizideki elemanları tersten div'e ekleyerek sıralı eklemeyi sağlıyoruz.
    for (let j = tempElements.length - 1; j >= 0; j--) {
      div.insertBefore(tempElements[j], div.firstChild);
    }
    console.log(tempElements);

  }
  async ngAfterViewInit() {

  }
  async addCheckMark() {
    try {
      let startDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1); // Ayın ilk günü
      let endDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0); // Ayın son günü
      // Tarihleri UTC'ye dönüştürme
      let utcStartDate = new Date(startDate.getTime() - startDate.getTimezoneOffset() * 60000).toISOString();
      let utcEndDate = new Date(endDate.getTime() - endDate.getTimezoneOffset() * 60000).toISOString();
      await this.checkmarkService.create({ employeeId: this.empId, startDate: utcStartDate, endDate: utcEndDate })
      await this.loadCheckMarks();;




    }
    catch (e) {
      console.log(e);
    }
  }
  async loadCheckMarks() {
    try {
      let response: List_CheckMarks_Employee = await this.checkmarkService.getCheckmarksWithEmployeeId(this.empId, this.currentMonth);

      if (response.checkMarks.length > 0) {
        this.responseListCheckmarks = response;
        this.empbilgi = {
          name: response.checkMarks[0].employee.employeName,
          surname: response.checkMarks[0].employee.employeSurname,
          telno: response.checkMarks[0].employee.employeTelNo,
          departman: response.checkMarks[0].employee.department.name,
        }
        // checkmarks varsa ve içeriği dolu ise
        if (response.checkMarks && response.checkMarks.length > 0) {
          let firstCheckmark = response.checkMarks[0];
          if (firstCheckmark) {
            let dateObj = new Date(firstCheckmark.date);
            let dayNumber = dateObj.getDay();
            this.responseListCheckmarks.prevDays = [];

            // Gün numarası 3 ise (Çarşamba), Pazartesiye (1) kadar olan günleri al
            if (dayNumber >= 1) {  // Bu kontrol Pazartesi ve sonrası için çalışır
              for (let i = 1; i < dayNumber; i++) {
                let newDate = new Date(dateObj);
                newDate.setDate(newDate.getDate() - i);
                this.responseListCheckmarks.prevDays.unshift(newDate);
              }
            }
          }
        }



      }
      console.log(response);

    }
    catch (e) {
      console.error('Error loading employees:', e);
    }
    this.cdr.detectChanges();
  }

}
