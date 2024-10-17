import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueilGlobalComponent } from './accueil.component';

describe('AccueilComponent', () => {
  let component: AccueilGlobalComponent;
  let fixture: ComponentFixture<AccueilGlobalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccueilGlobalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccueilGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
