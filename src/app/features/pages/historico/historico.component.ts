import { Component, OnInit } from '@angular/core';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import { AccountService } from '../../../core/services/account-service/account.service';
import { SimulationModel } from '../../../core/models/simulation.model';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NoteDialogComponent } from '../../../shared/note-dialog/note-dialog.component';





@Component({
  selector: 'app-historico',
  imports: [
    MatTableModule, 
    MatIconModule, 
    MatIconModule, 
    MatButtonModule, 
    DatePipe, 
    CurrencyPipe, 
    MatMenuModule,
    MatTableModule,
    MatDialogModule,
  ],
  templateUrl: './historico.component.html',
  styleUrl: './historico.component.scss'
})
export class HistoricoComponent implements OnInit{
  displayedColumns: string[] = ['data', 'client', 'product', 'prazo', 'initial', 'income', 'juros', 'acoes'];
  dataSource?: MatTableDataSource<SimulationModel>;
   selectedRow?: SimulationModel;

  constructor(
    private _accountService: AccountService,
    private dialog: MatDialog
  ){
    this.dataSource = new MatTableDataSource<SimulationModel>([]);
  }

  ngOnInit(): void {
    this.getHistorico();
  }
  getHistorico(){
    this._accountService.getHistory().subscribe({
      next: (response)=>{
        const sorted = response.sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
        this.dataSource = new MatTableDataSource(response);
      }, 
      error: (err)=>{
        alert(this._accountService.mapHttpError(err));
      }
    })
  }

  adicionarNota(simulation: SimulationModel){
    const dialogRef = this.dialog.open(NoteDialogComponent, {
      width: '400px',
      data: simulation
    });

    dialogRef.afterClosed().subscribe(note => {
      if (!note) return;
      this._accountService.addNote(simulation.id, note).subscribe({
        next: () => {
          simulation.notes = note;
          if (this.dataSource?.data) {
            this.dataSource.data = [...this.dataSource.data];
          }
        },
        error: (err)=>{
          alert(this._accountService.mapHttpError(err));
        }
      });
    });
  }

  deletarRegistro(register: SimulationModel){
    this._accountService.deleteHistory(register.id).subscribe({
      next: (response)=>{
        this.getHistorico()
      },
      error: (err)=>{
        alert(this._accountService.mapHttpError(err));

      }
    })
  }
}