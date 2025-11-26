import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NdtDashboard } from './ndt-dashboard';

describe('NdtDashboard', () => {
  let component: NdtDashboard;
  let fixture: ComponentFixture<NdtDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NdtDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NdtDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
