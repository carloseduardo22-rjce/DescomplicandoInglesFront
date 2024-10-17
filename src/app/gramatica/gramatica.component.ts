import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GramaticaService } from './gramatica.service';
import { content } from './content-object';
import { translationsDict } from './translations-dictionary';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gramatica',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gramatica-component.html',
  styleUrls: ['./gramatica-component.css']
})
export class GramaticaComponent implements OnInit {
  lessonList: any[] = [];
  backEndUrl = 'http://localhost:8080';
  lessonOpen = false;
  questionsOpen = false;
  remainingSentences: string[] = [];
  remainingSentencesAttribute: { original: string; translation: string; userTranslation: string; isCorrect: boolean | null; }[] = [];
  currentLessonIndex: number | null = null;
  content: content = { audioUrl: '', imagemUrl: '', text: '' };
  sentencesDrawnAttribute: { original: string; translation: string; userTranslation: string; isCorrect: boolean | null; flipped: boolean; }[] = [];
  userTranslations: string[] = [];
  translationResults: { correct: boolean; original: string; userAnswer: string }[] = [];

  constructor(private http: HttpClient, private gramaticaService: GramaticaService) { }

  ngOnInit(): void {
    const userLevel = localStorage.getItem('difficultyLevelUser');
    const userId = localStorage.getItem('user_id');
    const token = localStorage.getItem('token');

    if (userLevel && userId && token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      });

      let moduleId = this.getModuleId(userLevel);

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
      console.error('Nível de dificuldade do usuário ou token não encontrados no localStorage.');
    }
  }

  advance(): void {
    this.questionsOpen = true;
  }

  submitAnswers() {
    let points = 0;
    this.remainingSentencesAttribute.forEach(sentence => {
      sentence.isCorrect = (sentence.userTranslation.toLowerCase() === sentence.translation.toLowerCase());
      // se a tradução for correta eu tenho que anotar + 1 ponto e conforme for acertando incrementar mais um
      if (sentence.isCorrect) {
        points += 1;
      }
    });
  }

  getModuleId(userLevel: string): number {
    switch (userLevel) {
      case '1':
        return 1;
      case '2':
        return 2;
      default:
        console.warn('Nível de dificuldade não reconhecido, usando módulo padrão (1).');
        return 1;
    }
  }

  getUserLevelText(): string {
    const userLevel = Number(localStorage.getItem('difficultyLevelUser'));

    switch (userLevel) {
      case 1:
        return 'A1';
      case 2:
        return 'A2';
      case 3:
        return 'B1';
      case 4:
        return 'B2';
      default:
        return 'Unknown level';
    }
  }

  drawSentences(text: string): void {
    const sentences: string[] = text.split('.');
    let drawnSentences: { original: string; translation: string; userTranslation: string; isCorrect: boolean | null; flipped: false }[] = [];

    while (drawnSentences.length < 10 && sentences.length > 0) {
      const index = this.getRandomArbitrary(0, sentences.length - 1);
      const sentence = sentences[index].trim() + '.';

      if (sentence !== '.' && translationsDict[sentence]) {
        drawnSentences.push({
          original: sentence,
          translation: translationsDict[sentence],
          userTranslation: '',
          isCorrect: null,
          flipped: false
        });
        sentences.splice(index, 1);
      }
    }

    this.sentencesDrawnAttribute = drawnSentences;
    this.remainingSentences = sentences;
    this.drawMoreSentences(this.remainingSentences);
  }

  drawMoreSentences(remainingSentences: string[]): void {
    let additionalSentences: { original: string; translation: string; userTranslation: string; isCorrect: boolean | null }[] = [];

    while (additionalSentences.length < 5 && remainingSentences.length > 0) {
      const index = this.getRandomArbitrary(0, remainingSentences.length - 1);
      const sentence = remainingSentences[index].trim() + '.';

      if (sentence !== '.' && translationsDict[sentence]) {
        additionalSentences.push({
          original: sentence,
          translation: translationsDict[sentence],
          userTranslation: '',
          isCorrect: null
        });
        remainingSentences.splice(index, 1);
      }
    }

    this.remainingSentencesAttribute = additionalSentences;
  }

  getRandomArbitrary(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  doLesson(lessonId: number, content: content, index: number): void {
    const userId = localStorage.getItem('user_id');

    if (userId && localStorage.getItem('userLessonInteractionCreated') !== 'true') {
      this.gramaticaService.createUserLessonInteraction(userId, lessonId);
    }

    this.content = content;
    this.currentLessonIndex = index;
    this.lessonOpen = true;
    this.drawSentences(content.text);
  }

  closeLesson(): void {
    this.lessonOpen = false;
  }

  hasRemainingSentences(): boolean {
    return this.remainingSentences.length > 0;
  }

  saveUserTranslation(index: number, translation: string): void {
    this.userTranslations[index] = translation.trim();
  }

  checkAnswers(): void {
    this.translationResults = this.sentencesDrawnAttribute.map((sentence, index) => {
      const userAnswer = this.userTranslations[index] || '';
      return {
        correct: userAnswer.trim().toLowerCase() === sentence.translation.trim().toLowerCase(),
        original: sentence.original,
        userAnswer
      };
    });
  }
}
