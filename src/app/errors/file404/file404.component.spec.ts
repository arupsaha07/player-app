import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { File404Component } from './file404.component';

describe('File404Component', () => {
  let component: File404Component;
  let fixture: ComponentFixture<File404Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ File404Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(File404Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
