import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroPrecio } from './filtro-precio';

describe('FiltroPrecio', () => {
  let component: FiltroPrecio;
  let fixture: ComponentFixture<FiltroPrecio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltroPrecio]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltroPrecio);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
