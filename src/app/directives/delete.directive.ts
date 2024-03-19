import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClientService } from '../services/common/http-client.service';
import { AlertifyService, MessageType, Position } from '../services/admin/alertify.service';
import { DialogService } from '../services/common/dialog.service';
import { DeleteDialogComponent, DeleteState } from '../dialogs/delete-dialog/delete-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../services/admin/custom-toastr.service';
import { Observable, firstValueFrom } from 'rxjs';
declare var $: any;

@Directive({
  selector: '[appDelete]',
  standalone: true
})
export class DeleteDirective {

  constructor(
    public dialog: MatDialog,
    private element: ElementRef,
    private _renderer: Renderer2,
    private httpClientService: HttpClientService,
    private toastrService:CustomToastrService,
    private dialogService:DialogService) {
    const img = _renderer.createElement("img");
    img.setAttribute("src", "/assets/delete.png");
    img.setAttribute("cursor", "pointer");
    img.width = 25;
    img.height = 25;
    _renderer.appendChild(element.nativeElement, img);
  }  
  
  @Input() controller: string;
  @Input() id: string;
  @Output() callback: EventEmitter<any> = new EventEmitter();

  @HostListener("click")


  async onclick() {
    this.dialogService.openDialog({
      componentType:DeleteDialogComponent,
      data:DeleteState.Yes,
      afterClosed:async () => {

        const observable: Observable<any> = this.httpClientService.delete<any>({
          controller: this.controller,
          action: "delete",
        }, this.id);
    
    
        try{
          var model =  await firstValueFrom(observable).catch(err=>{
            this.toastrService.message(err.Message, "Başarısız", { messageType: ToastrMessageType.Error, position: ToastrPosition.TopRight});
              throw err;
          });

          const td: HTMLTableCellElement = this.element.nativeElement;
          this.toastrService.message(model.Message, "Başarılı", { messageType: ToastrMessageType.Success, position: ToastrPosition.TopRight })
          $(td.parentElement).animate({
            opacity: 0,
            left: "+=50",
            height: "toogle"
          }, 700, () => {
            this.callback.emit();
          });
        }
        catch(error){
        console.log(error);
        }

      },
    });


  }
}
