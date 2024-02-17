import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CustomToastrService {

  constructor(private toastr:ToastrService) {

  }
  message(message:string,title:string,toastrOptions:ToastrOptipns){
    this.toastr.clear();
    this.toastr[toastrOptions.messageType](message,title,{positionClass:toastrOptions.position});
  }

}
export enum ToastrMessageType{
  Success = "success",
  Info="info",
  Warning="warning",
  Error="error"
}
export enum ToastrPosition{
  BottomRight="toast-bottom-right",
  BottomLeft="toast-bottom-left",
  BottomCenter="toast-bottom-center",
  TopCenter="toast-top-center",
  TopRight="toast-top-right",
  TopLeft="toast-top-left",
  TopFullWidht="toast-top-full-widht",
  BottomFullWidht="toast-bottom-full-widht",

}
export class ToastrOptipns{
  messageType:ToastrMessageType;
  position:ToastrPosition=ToastrPosition.BottomLeft;

}
