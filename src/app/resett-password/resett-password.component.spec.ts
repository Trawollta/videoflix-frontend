import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResettPasswordComponent } from './resett-password.component';

describe('ResettPasswordComponent', () => {
  let component: ResettPasswordComponent;
  let fixture: ComponentFixture<ResettPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResettPasswordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResettPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
