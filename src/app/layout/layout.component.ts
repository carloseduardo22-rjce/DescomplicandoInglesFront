import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [HomeComponent, HeaderComponent, FooterComponent, RouterOutlet, RouterLink],
  templateUrl: './layout-component.html',
})
export class LayoutComponent {

}
