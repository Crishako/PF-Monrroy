import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialog } from '@angular/material/dialog'; // Asegúrate de importar MatDialogModule y MatDialog
import { HomeComponent } from './home.component';

// Mock del servicio de diálogo
class MatDialogMock {
  open() {
    return {
      afterClosed: () => { /* Puedes proporcionar un comportamiento mock aquí si es necesario */ },
    };
  }
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [MatDialogModule],
      providers: [{ provide: MatDialog, useClass: MatDialogMock }], // Proporciona el servicio de diálogo mock
    });

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
