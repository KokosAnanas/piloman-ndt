import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestObjectWidget } from './test-object-widget';

describe('TestObjectWidget', () => {
  let component: TestObjectWidget;
  let fixture: ComponentFixture<TestObjectWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestObjectWidget]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestObjectWidget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
