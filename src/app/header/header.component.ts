import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header-component.html',
  styleUrls: ['./header-component.css']
})
export class HeaderComponent {
  isProfileMenuOpen = false;

  constructor(private router: Router) { }

  navigateHome() {
    this.router.navigate(['/home']);
  }

  toggleProfileMenu() {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const profileButton = document.querySelector('.icon-profile');

    if (this.isProfileMenuOpen && !profileButton?.contains(target)) {
      this.isProfileMenuOpen = false;
    }
  }

}