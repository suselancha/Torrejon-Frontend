import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUnitsComponent } from './edit-units.component';

describe('EditUnitsComponent', () => {
  let component: EditUnitsComponent;
  let fixture: ComponentFixture<EditUnitsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditUnitsComponent]
    });
    fixture = TestBed.createComponent(EditUnitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
