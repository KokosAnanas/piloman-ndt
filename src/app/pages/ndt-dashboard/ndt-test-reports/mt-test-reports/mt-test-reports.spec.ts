import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MtTestReports } from './mt-test-reports';

describe('MtTestReports', () => {
  let component: MtTestReports;
  let fixture: ComponentFixture<MtTestReports>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MtTestReports]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MtTestReports);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
