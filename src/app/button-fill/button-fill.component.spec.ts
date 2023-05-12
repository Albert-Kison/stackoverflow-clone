import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonFillComponent } from './button-fill.component';

describe('ButtonFillComponent', () => {
  let component: ButtonFillComponent;
  let fixture: ComponentFixture<ButtonFillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonFillComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonFillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
