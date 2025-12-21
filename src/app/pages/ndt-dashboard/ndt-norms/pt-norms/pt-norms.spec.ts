import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PtNorms } from './pt-norms';

describe('PtNorms', () => {
  let component: PtNorms;
  let fixture: ComponentFixture<PtNorms>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PtNorms]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PtNorms);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
