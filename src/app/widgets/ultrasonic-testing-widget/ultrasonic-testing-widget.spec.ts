import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UltrasonicTestingWidget } from './ultrasonic-testing-widget';

describe('UltrasonicTestingWidget', () => {
  let component: UltrasonicTestingWidget;
  let fixture: ComponentFixture<UltrasonicTestingWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UltrasonicTestingWidget]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UltrasonicTestingWidget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
