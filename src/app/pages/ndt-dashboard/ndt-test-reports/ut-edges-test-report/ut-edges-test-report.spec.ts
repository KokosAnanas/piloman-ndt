import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtEdgesTestReport } from './ut-edges-test-report';

describe('UtEdgesTestReport', () => {
  let component: UtEdgesTestReport;
  let fixture: ComponentFixture<UtEdgesTestReport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UtEdgesTestReport]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UtEdgesTestReport);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
