import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { RouterOutlet, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HomeService } from './home.service';
import { Router } from '@angular/router';
import { DialogService } from './dialog.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    FormsModule
  ],
  templateUrl: './home-component.html',
  styleUrls: ['./home-component.css']
})
export class HomeComponent implements OnInit {
  @Input() listDifficultyLevel: any[] = [];

  note: string = '';
  token: string | null = '';
  userId: string | null = null;

  constructor(
    private authService: AuthService,
    private homeService: HomeService,
    private router: Router,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.dialogService.openDialog();
  }

  consultarNiveis() {
    // Implementação da consulta de níveis
  }

  logout() {
    this.authService.logout();
  }

  async saveNote() {
    this.token = localStorage.getItem('token');
    const userIdFromStorage = localStorage.getItem('user_id');

    console.log('User ID:', userIdFromStorage);

    if (userIdFromStorage) {
      if (this.isValidUUID(userIdFromStorage)) {
        this.userId = userIdFromStorage;

        try {
          const response = await this.homeService.postSaveNote(this.note, this.userId);
          console.log('Nota salva com sucesso!', response);
          this.note = '';
        } catch (error) {
          console.error('Erro ao salvar a nota', error);
        }
      } else {
        console.error('User ID não está em formato de UUID válido.');
      }
    } else {
      console.error('User ID não está definido.');
    }
  }

  goToNotes() {
    if (this.userId) {
      this.router.navigate(['/anotacoes', { userId: this.userId }]);
    } else {
      console.error('User ID não encontrado');
    }
  }

  private isValidUUID(uuid: string): boolean {
    const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return regex.test(uuid);
  }

}
