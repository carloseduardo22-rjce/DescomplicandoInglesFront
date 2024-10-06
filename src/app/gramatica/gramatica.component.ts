import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { content } from './content-object';

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
  content: content = { audioUrl: '', imagemUrl: '', text: '' };
  sentencesDrawnAtribbute: { original: string; translation: string; flipped: boolean }[] = [];

  translationsDict: { [key: string]: string } = {
    'Hello! My name is Sarah, and I am 20 years old.': 'Olá! Meu nome é Sarah e eu tenho 20 anos.',
    'I live in a small house with my family.': 'Eu moro em uma pequena casa com minha família.',
    'I wake up at 7:00 AM every day.': 'Eu acordo às 7:00 da manhã todos os dias.',
    'I brush my teeth and wash my face.': 'Eu escovo os dentes e lavo o rosto.',
    'After that, I go to the kitchen to eat breakfast.': 'Depois disso, eu vou para a cozinha tomar café da manhã.',
    'I like to eat bread with butter and drink coffee.': 'Eu gosto de comer pão com manteiga e beber café.',
    'My mother likes to drink tea, but my father drinks orange juice.': 'Minha mãe gosta de beber chá, mas meu pai bebe suco de laranja.',
    'At 8:00 AM, I leave the house and go to work.': 'Às 8:00 da manhã, eu saio de casa e vou trabalhar.',
    'I work at a bookstore in the city.': 'Eu trabalho em uma livraria na cidade.',
    'The bookstore is small, but it is very nice.': 'A livraria é pequena, mas é muito agradável.'
  };

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

  drawSentences(text: string): void {
    const sentences: string[] = text.split('.');
    let drawnSentences: { original: string; translation: string; flipped: boolean }[] = [];
    console.log('Frases disponíveis ', sentences);

    while (drawnSentences.length < 10 && sentences.length > 0) {
      const index = this.getRandomArbitrary(0, sentences.length - 1);
      const sentence = sentences[index].trim() + '.';

      if (sentence !== '.' && this.translationsDict[sentence]) {
        drawnSentences.push({
          original: sentence,
          translation: this.translationsDict[sentence],
          flipped: false
        });
        sentences.splice(index, 1);
      }
    }
    console.log('Frases sorteadas com traduções: ', drawnSentences);
    this.sentencesDrawnAtribbute = drawnSentences;
  }

  getRandomArbitrary(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
  }

  doLesson(content: content, index: number): void {
    this.content = content;
    this.currentLessonIndex = index;
    this.lessonOpen = true;
    this.drawSentences(content.text);
  }

  closeLesson(): void {
    this.lessonOpen = false;
  }
}
