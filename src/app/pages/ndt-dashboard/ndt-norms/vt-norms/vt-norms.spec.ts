import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VtNorms } from './vt-norms';

describe('VtNorms', () => {
  let component: VtNorms;
  let fixture: ComponentFixture<VtNorms>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VtNorms]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VtNorms);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
