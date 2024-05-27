import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskupdationComponent } from './taskupdation.component';

describe('TaskupdationComponent', () => {
  let component: TaskupdationComponent;
  let fixture: ComponentFixture<TaskupdationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskupdationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskupdationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
