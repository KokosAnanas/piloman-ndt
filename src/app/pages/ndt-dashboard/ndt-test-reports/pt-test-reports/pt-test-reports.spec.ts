import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PtTestReports } from './pt-test-reports';

describe('PtTestReports', () => {
  let component: PtTestReports;
  let fixture: ComponentFixture<PtTestReports>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PtTestReports]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PtTestReports);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
