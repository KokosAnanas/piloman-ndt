import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MtNorms } from './mt-norms';

describe('MtNorms', () => {
  let component: MtNorms;
  let fixture: ComponentFixture<MtNorms>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MtNorms]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MtNorms);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
