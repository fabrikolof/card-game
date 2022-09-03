import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgrounMusicComponent } from './backgroun-music.component';

describe('BackgrounMusicComponent', () => {
  let component: BackgrounMusicComponent;
  let fixture: ComponentFixture<BackgrounMusicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackgrounMusicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackgrounMusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
