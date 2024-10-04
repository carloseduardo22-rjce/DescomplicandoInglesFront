import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-gramatica',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gramatica-component.html',
  styleUrls: ['./gramatica-component.css']
})
export class GramaticaComponent implements OnInit {
  lessonList: any[] = [];
  backEndUrl = 'http://localhost:8080';
  lessonOpen = false;
  currentLessonIndex: number | null = null;
  content = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const userLevel = localStorage.getItem('difficultyLevelUser');
    const userId = localStorage.getItem('user_id');
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    let moduleId = 1;

    if (userLevel) {
      switch (userLevel) {
        case '1':
          moduleId = 1;
          break;
        case '2':
          moduleId = 2;
          break;
        default:
          console.warn('Nível de dificuldade não reconhecido, usando módulo padrão (1).');
      }

      this.http
        .get<any[]>(`${this.backEndUrl}/LearningModule/${moduleId}/difficulty/${userLevel}/user/${userId}/lesson`, { headers })
        .subscribe({
          next: (data) => {
            this.lessonList = data;
          },
          error: (error) => {
            console.error('Erro ao buscar as lições:', error);
          }
        });
    } else {
      console.error('Nível de dificuldade do usuário não encontrado no localStorage.');
    }
  }

  doLesson(content: string, index: number): void {
    this.content = content;
    this.currentLessonIndex = index;
    this.lessonOpen = true;
  }

  closeLesson(): void {
    this.lessonOpen = false;
  }
}
