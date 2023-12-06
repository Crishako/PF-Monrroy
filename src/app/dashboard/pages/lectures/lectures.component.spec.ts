import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LecturesComponent } from './lectures.component';
import { LecturesModule } from './lectures.module';
import { Store } from '@ngrx/store'; // Asegúrate de importar el servicio Store
import { of } from 'rxjs'; // Añade la importación de 'of' desde rxjs

describe('LecturesComponent', () => {
  let component: LecturesComponent;
  let fixture: ComponentFixture<LecturesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LecturesComponent],
      imports: [HttpClientTestingModule, LecturesModule],
      providers: [
        // Proporciona un mock del servicio Store
        {
          provide: Store,
          useValue: {
            select: () => of(null), // Puedes ajustar esto según tus necesidades
          },
        },
      ],
    });

    fixture = TestBed.createComponent(LecturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe crear LecturesComponent', () => {
    expect(component).toBeTruthy();
  });
});
