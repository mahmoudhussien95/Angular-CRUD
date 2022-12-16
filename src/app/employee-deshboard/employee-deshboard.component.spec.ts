import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDeshboardComponent } from './employee-deshboard.component';

describe('EmployeeDeshboardComponent', () => {
  let component: EmployeeDeshboardComponent;
  let fixture: ComponentFixture<EmployeeDeshboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeDeshboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeDeshboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
