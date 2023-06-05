import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoorComponent } from './foor.component';

describe('FoorComponent', () => {
  let component: FoorComponent;
  let fixture: ComponentFixture<FoorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
