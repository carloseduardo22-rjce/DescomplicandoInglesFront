import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DialogService } from './dialog.service';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [MatDialogModule, CommonModule, ReactiveFormsModule],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  userUpdate: FormGroup;
  formSubmitted = false;
  showWarningMessage = false;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    private fb: FormBuilder,
    private dialogService: DialogService
  ) {
    this.userUpdate = this.fb.group({
      name: ['', Validators.required],
      nivel: ['', Validators.required]
    }, {
      validators: this.nameAndNivelValidator
    });
  }

  nameAndNivelValidator(control: AbstractControl) {
    const name = control.get('name')?.value;
    const nivel = control.get('nivel')?.value;

    if (!name || !nivel) {
      return { nivelNotSelected: true }
    }

    return null;

  }

  updateUser(): void {

    if (this.userUpdate.valid) {
      localStorage.setItem('difficultyLevelUser', this.userUpdate.value.nivel);
      this.dialogService.updateUser(this.userUpdate.value.name, this.userUpdate.value.nivel);
      this.formSubmitted = true;
      this.showWarningMessage = false;
    } else {
      this.showWarningMessage = true;
    }

  }

  onCloseDialog() {
    if (!this.formSubmitted) {
      this.showWarningMessage = true;
    } else {
      this.dialogRef.close();
    }
  }

}
