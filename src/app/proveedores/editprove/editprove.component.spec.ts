import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditproveComponent } from './editprove.component';

describe('EditproveComponent', () => {
  let component: EditproveComponent;
  let fixture: ComponentFixture<EditproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditproveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
