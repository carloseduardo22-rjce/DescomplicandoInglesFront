import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnnotationService } from './annotation.service';
import { annotation } from '../home/annotation-object';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-annotation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './annotation-component.html',
  styleUrls: ['./annotation-component.css']
})
export class AnnotationComponent implements OnInit {
  annotations: annotation[] = [];
  userId: string | null = null;

  constructor(
    private annotationService: AnnotationService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('userId');

      if (this.userId) {
        this.getUserNotes(this.userId);
      } else {
        console.error('User ID não encontrado');
      }
    });
  }

  getUserNotes(userId: string): void {
    this.annotationService.getUserNotes(userId).subscribe({
      next: (data: annotation[]) => this.annotations = data,
      error: (error) => console.error('Erro ao carregar anotações:', error)
    });
  }
}
