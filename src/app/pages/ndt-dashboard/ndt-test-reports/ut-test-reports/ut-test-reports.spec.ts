import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtTestReports } from './ut-test-reports';

describe('UtTestReports', () => {
  let component: UtTestReports;
  let fixture: ComponentFixture<UtTestReports>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UtTestReports]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UtTestReports);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
