import { MatDialogRef } from "@angular/material/dialog";


export class BaseDialog<DialogT> {

  constructor(public dialogRef: MatDialogRef<DialogT>) {


  }
  close(){
      this.dialogRef.close();
  }
}
