import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { DifficultyLevel } from './difficulty-level-object';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private apiServerUrl = 'http://localhost:8080';

  constructor(
    private http: HttpClient
  ) { }

  public getDifficultyLevel(): Observable<DifficultyLevel[]> {
    return this.http.get<DifficultyLevel[]>(`${this.apiServerUrl}/LearningModule/{moduleId}/difficulty/{difficultyId}/user/{userId}/lesson`)
  }

  public async postSaveNote(note: string, user_id: string): Promise<any> {
    const annotation = {
      content: note,
      user: {
        id: user_id // Envie o ID do usuário aqui
      }
    };

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post(`${this.apiServerUrl}/Annotation/NewAnnotation`, annotation, { headers }).toPromise();
  }

}
