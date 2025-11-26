import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadiographicTestingWidget } from './radiographic-testing-widget';

describe('RadiographicTestingWidget', () => {
  let component: RadiographicTestingWidget;
  let fixture: ComponentFixture<RadiographicTestingWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadiographicTestingWidget]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RadiographicTestingWidget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
