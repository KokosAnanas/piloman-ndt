import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VtTestReports } from './vt-test-reports';

describe('VtTestReports', () => {
  let component: VtTestReports;
  let fixture: ComponentFixture<VtTestReports>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VtTestReports]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VtTestReports);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
