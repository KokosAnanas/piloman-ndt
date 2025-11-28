import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PenetrantTestingWidget } from './penetrant-testing-widget';

describe('PenetrantTestingWidget', () => {
  let component: PenetrantTestingWidget;
  let fixture: ComponentFixture<PenetrantTestingWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PenetrantTestingWidget]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PenetrantTestingWidget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
