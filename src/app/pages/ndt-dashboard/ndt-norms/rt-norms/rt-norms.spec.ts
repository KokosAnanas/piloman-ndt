import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RtNorms } from './rt-norms';

describe('RtNorms', () => {
  let component: RtNorms;
  let fixture: ComponentFixture<RtNorms>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RtNorms]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RtNorms);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
