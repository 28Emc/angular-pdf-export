import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfDataComponent } from './pdf-data.component';

describe('PdfDataComponent', () => {
  let component: PdfDataComponent;
  let fixture: ComponentFixture<PdfDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdfDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdfDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
