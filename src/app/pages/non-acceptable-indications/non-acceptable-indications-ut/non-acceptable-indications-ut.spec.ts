import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonAcceptableIndicationsUT } from './non-acceptable-indications-ut';

describe('NonAcceptableIndicationsUT', () => {
  let component: NonAcceptableIndicationsUT;
  let fixture: ComponentFixture<NonAcceptableIndicationsUT>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NonAcceptableIndicationsUT]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NonAcceptableIndicationsUT);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
