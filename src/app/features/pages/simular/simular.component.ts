import { Component, OnInit } from '@angular/core';
import { FormGroup,FormsModule, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { Account } from '../../../core/models/account.model';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { SelectOptionsModel } from '../../../core/models/products.model';
import { AccountService } from '../../../core/services/account-service/account.service';
import { CommonModule, NgIf } from '@angular/common';
import { distinctUntilChanged } from 'rxjs';
import { ProcessingService } from '../../../core/services/processing-service/processing.service';
import { ProductType, SimulationModel } from '../../../core/models/simulation.model';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-simular',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, FormsModule, MatFormFieldModule, MatButtonModule, MatSelectModule, CommonModule],
  templateUrl: './simular.component.html',
  styleUrl: './simular.component.scss'
})
export class SimularComponent implements OnInit {
  username?: string
  clienteId: number | null = null
  form: FormGroup
  userInfo?:Account
  products?: SelectOptionsModel[]
  simulation?: SimulationModel

  constructor(
    private _accountService: AccountService,
    private _processingService: ProcessingService,
    private fb: FormBuilder, 
    private dialog: MatDialog
  ){
    this.form = this.fb.group({
      clientId: ['', [ Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern('^[0-9]*$')
  ]],
      value: [null, [Validators.required, Validators.pattern(/^\d+(,\d{0,2})?$/)]],
      termMonths: [null, [Validators.required]],
      product: ['CDB', [Validators.required]]
    });
  }

  ngOnInit(): void {
     
    this.travarNumeros()
    this.travarDecimais()
    this.getAvailableProducts();
  }

  travarDecimais(){
    this.form.get('value')?.valueChanges.subscribe((v: string) => {
      if (!v) return;

      let sanitized = v
        .replace(/[^\d,]/g, '')
        .replace(/,+/g, ',');
      const parts = sanitized.split(',');
      if (parts[1]?.length > 2) {
        parts[1] = parts[1].slice(0, 2);
      }
      sanitized = parts.join(',');
      if (sanitized !== v) {
        this.form.get('value')?.setValue(sanitized, { emitEvent: false });
      }
    });
  }

  travarNumeros(){
    this.form.get('clientId')?.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe((v: string) => {
        if (v == null) return;

        let onlyDigits = String(v).replace(/\D/g, '');

        if (onlyDigits.length > 4) {
          onlyDigits = onlyDigits.slice(0, 4);
        }
        if (onlyDigits !== v) {
          this.form.get('clientId')?.setValue(onlyDigits, { emitEvent: false });
        }
      });
  }

  gerarSimulacao(Clientid: number){
    if (this.form.invalid) return;

    const clientId = String(this.form.value.clientId);
    const productType = this.form.value.product as ProductType;
    const termMonths = Number(this.form.value.termMonths);
    const principal = Number(String(this.form.value.value).replace(',', '.'));
    const profitPercent = 13.15;
    this._processingService.simulateInvestment({
      clientId,
      productType,
      termMonths,
      principal,
      profitPercent
    }).subscribe((simulation) => {
      this.simulation = simulation;
      this.dialog.open(ConfirmDialogComponent, {
        width: '400px',
        data: this.simulation
      });
    });
  }

  getAvailableProducts(){
    this._accountService.getProducts().subscribe({
      next: (response)=> {
        this.products = response;
      },
      error: (err) => {
        alert(this._accountService.mapHttpError(err));
      }
    })
  }

  openConfirm(){

  }

}
