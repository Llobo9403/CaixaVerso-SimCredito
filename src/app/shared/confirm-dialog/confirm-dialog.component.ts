import { CurrencyPipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { SimulationModel } from '../../core/models/simulation.model';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-confirm-dialog',
  imports: [CurrencyPipe, MatDialogModule, RouterLink],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss'
})
export class ConfirmDialogComponent {
  invested: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: SimulationModel
  ) {
    this.invested = data.total - data.income;
  }
}
