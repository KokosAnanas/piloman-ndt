import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RtTestReports } from './rt-test-reports';

describe('RtTestReports', () => {
  let component: RtTestReports;
  let fixture: ComponentFixture<RtTestReports>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RtTestReports]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RtTestReports);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
