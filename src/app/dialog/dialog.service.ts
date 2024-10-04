import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private backUrl = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) { }

  updateUser(name: string, nivel: string): void {
    const user = {
      name: name,
      idDifficultyLevel: nivel
    };

    const userID = localStorage.getItem('user_id');
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    this.httpClient.put(`${this.backUrl}/User/UpdateNameAndNivel/${userID}`, user, { headers })
      .pipe(
        tap((response) => {
          console.log('User updated sucessfuly!', response);
          localStorage.setItem('rulesRead', 'true');
        }),
        catchError((error) => {
          return throwError(error);
        })
      ).subscribe();
  }


}
