import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualProcessComponent } from './manual-process.component';

describe('ManualProcessComponent', () => {
  let component: ManualProcessComponent;
  let fixture: ComponentFixture<ManualProcessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManualProcessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
