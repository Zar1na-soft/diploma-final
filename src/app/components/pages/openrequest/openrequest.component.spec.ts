import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenrequestComponent } from './openrequest.component';

describe('OpenrequestComponent', () => {
  let component: OpenrequestComponent;
  let fixture: ComponentFixture<OpenrequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenrequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
