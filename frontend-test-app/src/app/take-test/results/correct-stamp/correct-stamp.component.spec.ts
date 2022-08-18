import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrectStampComponent } from './correct-stamp.component';

describe('CorrectStampComponent', () => {
  let component: CorrectStampComponent;
  let fixture: ComponentFixture<CorrectStampComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorrectStampComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorrectStampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
