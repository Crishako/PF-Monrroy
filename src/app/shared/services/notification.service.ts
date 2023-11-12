import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { NotificationDialogComponent } from '../components/notification-dialog/notification-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private matDialog: MatDialog) {}

  

  showNotification(message: string): void {
    this.matDialog.open(NotificationDialogComponent, {
      data: { message },
      width: '300px' // Ajusta el ancho según tus preferencias
    });
  }
}
