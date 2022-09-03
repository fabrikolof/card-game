/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MisjuegosComponent } from './misjuegos.component';

describe('MisjuegosComponent', () => {
  let component: MisjuegosComponent;
  let fixture: ComponentFixture<MisjuegosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisjuegosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisjuegosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
