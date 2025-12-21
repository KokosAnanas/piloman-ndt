import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtEdgesNorms } from './ut-edges-norms';

describe('UtEdgesNorms', () => {
  let component: UtEdgesNorms;
  let fixture: ComponentFixture<UtEdgesNorms>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UtEdgesNorms]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UtEdgesNorms);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
