import { Component, inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';


export class BaseComponent {

private spinner = inject(NgxSpinnerService);

showSpinner(spinnerNameType:SpinnerType){
  this.spinner.show(spinnerNameType);

  setTimeout(()=>this.hideSpinner(spinnerNameType),10000);
}
hideSpinner(spinnerNameType:SpinnerType){
  this.spinner.hide(spinnerNameType);
}
}
export enum SpinnerType{
  BallAtom="ballAtom",
  BallSpin="ballSpin",
}
