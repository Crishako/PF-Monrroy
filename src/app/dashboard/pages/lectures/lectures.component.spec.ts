import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LecturesComponent } from './lectures.component';
import { LecturesModule } from './lectures.module'; // Ajusta la ruta según sea necesario

describe('LecturesComponent', () => {
  let component: LecturesComponent;
  let fixture: ComponentFixture<LecturesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LecturesComponent],
      imports: [HttpClientTestingModule, LecturesModule], // Importa LecturesModule aquí
    });

    fixture = TestBed.createComponent(LecturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
