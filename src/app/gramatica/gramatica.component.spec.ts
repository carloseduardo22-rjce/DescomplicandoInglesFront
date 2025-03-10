import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GramaticaComponent } from './gramatica.component';

describe('GramaticaComponent', () => {
  let component: GramaticaComponent;
  let fixture: ComponentFixture<GramaticaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GramaticaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GramaticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
