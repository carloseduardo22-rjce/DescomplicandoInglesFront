import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private dialogOpened = false;

  constructor(private dialog: MatDialog) { }

  openDialog() {
    if (!this.dialogOpened) {
      this.dialogOpened = true;
      this.dialog.open(DialogComponent);
    }
  }

}
