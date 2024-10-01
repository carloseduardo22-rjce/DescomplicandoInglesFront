import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, tap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { RouterLink } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, RouterLink],
  templateUrl: './login-component.html',
  styleUrls: ['./login-component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  backendUrl = 'http://localhost:8080/Authentication/Login';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private authService: AuthService) {
    this.loginForm = this.fb.group({
      username: [''],
      password: ['']
    });
  }

  onSubmit(): void {
    const loginData = {
      login: this.loginForm.value.username,
      password: this.loginForm.value.password
    };

    this.http.post<{ token: string }>(this.backendUrl, loginData).pipe(
      map(response => response.token),
      tap(token => {
        if (token) {
          localStorage.setItem('token', token);
          this.authService.login();
        }
      }),
      map(token => !!token),
      tap(isLoggedIn => {
        if (isLoggedIn) {
          this.router.navigate(['home']);
        } else {
          console.error('Login failed, invalid credentials');
        }
      }),
      catchError(error => {
        console.error('Login failed', error);
        return of(null);
      })
    ).subscribe();
  }
}
