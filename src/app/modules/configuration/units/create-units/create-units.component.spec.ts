import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUnitsComponent } from './create-units.component';

describe('CreateUnitsComponent', () => {
  let component: CreateUnitsComponent;
  let fixture: ComponentFixture<CreateUnitsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateUnitsComponent]
    });
    fixture = TestBed.createComponent(CreateUnitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
