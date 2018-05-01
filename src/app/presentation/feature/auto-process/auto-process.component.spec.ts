import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoProcessComponent } from './auto-process.component';

describe('AutoProcessComponent', () => {
  let component: AutoProcessComponent;
  let fixture: ComponentFixture<AutoProcessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoProcessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
