import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { format } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class GramaticaService {
  private apiServerUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  createUserLessonInteraction(userId: string, lessonId: number): void {

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const body = { userId, lessonId };
    this.http.post(`${this.apiServerUrl}/UserLessonInteraction`, body, { headers })
      .subscribe({
        next: (response) => {
          localStorage.setItem('userLessonInteractionCreated', 'true');
        },
        error: (error) => {
          console.error('Erro ao criar interação:', error);
        }
      });
  }

  updateUserLessonInteraction(points: number): void {
    const token = localStorage.getItem('token');
    const today = new Date();
    const completionDate = format(today, 'yyyy-MM-dd');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const updateUserLessonInteractionBody = { points, completionDate };

    this.http.put(`${this.apiServerUrl}/UserLessonInteraction`, updateUserLessonInteractionBody, { headers })
      .subscribe({
        next(response) {
          console.log('UserLessonInteraction update sucessfuly!', response);
        },
        error(error) {
          console.log('Error update userLessonInteraction', error);
        },
      })

  }

}
