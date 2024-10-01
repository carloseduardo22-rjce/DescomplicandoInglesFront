import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { map, tap } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './register-component.html',
  styleUrl: './register-component.css'
})
export class RegisterComponent {
  loginForm: FormGroup;
  backEndUrl = 'http://localhost:8080/Authentication/Register';
  isModalOpen = false;
  role = 'USER';

  constructor(private fb: FormBuilder, private httpClient: HttpClient, private router: Router) {
    this.loginForm = this.fb.group({
      username: [''],
      name: [''],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit(): void {
    const loginData = {
      login: this.loginForm.value.username,
      password: this.loginForm.value.password,
      role: this.role
    };

    this.httpClient.post<{ id: string }>(this.backEndUrl, loginData).pipe(
      map(response => response.id),
      tap(id => {
        if (id) {
          localStorage.setItem('user_id', id);
        }
      })
    ).subscribe();

  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  onConfirm() {
    alert("Confirmação realizada!");
    this.closeModal();
  }

}
