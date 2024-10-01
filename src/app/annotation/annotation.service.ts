import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { annotation } from '../home/annotation-object';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AnnotationService {
  private apiServerUrl = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) { }

  public getUserNotes(userId: string): Observable<annotation[]> {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('Token de autenticação não encontrado');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.httpClient.get<annotation[]>(`${this.apiServerUrl}/Annotation/User/${userId}`, { headers })
      .pipe(
        map(annotations => annotations.map(annotation => ({
          id: annotation.id,
          content: annotation.content
        })))
      );
  }

}
