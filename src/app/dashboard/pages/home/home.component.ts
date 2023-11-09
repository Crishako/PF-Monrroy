import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotificationDialogComponent } from 'src/app/shared/components/notification-dialog/notification-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private dialog: MatDialog){}

  openNotificationDialog(message: string): void {
    const dialogRef = this.dialog.open(NotificationDialogComponent, {
      width: '300px',
      data: { message }
    });

    // Puedes realizar acciones después de cerrar el diálogo si es necesario
    dialogRef.afterClosed().subscribe(result => {
      console.log('Diálogo cerrado');
    });
  }
}
