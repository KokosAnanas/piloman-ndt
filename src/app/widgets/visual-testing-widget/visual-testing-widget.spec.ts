import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualTestingWidget } from './visual-testing-widget';

describe('VisualTestingWidget', () => {
  let component: VisualTestingWidget;
  let fixture: ComponentFixture<VisualTestingWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualTestingWidget]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualTestingWidget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
