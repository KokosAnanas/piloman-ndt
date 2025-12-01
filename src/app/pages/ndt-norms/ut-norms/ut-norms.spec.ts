import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtNorms } from './ut-norms';

describe('UtNorms', () => {
  let component: UtNorms;
  let fixture: ComponentFixture<UtNorms>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UtNorms]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UtNorms);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
