import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestObject } from './test-object';

describe('TestObject', () => {
  let component: TestObject;
  let fixture: ComponentFixture<TestObject>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestObject]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestObject);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
