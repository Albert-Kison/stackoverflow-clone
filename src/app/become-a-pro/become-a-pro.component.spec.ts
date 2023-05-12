import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BecomeAProComponent } from './become-a-pro.component';

describe('BecomeAProComponent', () => {
  let component: BecomeAProComponent;
  let fixture: ComponentFixture<BecomeAProComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BecomeAProComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BecomeAProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
