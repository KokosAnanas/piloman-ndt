import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeldParamsWidget } from './weld-params-widget';

describe('WeldParamsWidget', () => {
  let component: WeldParamsWidget;
  let fixture: ComponentFixture<WeldParamsWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeldParamsWidget]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeldParamsWidget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
