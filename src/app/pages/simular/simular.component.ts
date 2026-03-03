import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { Account } from '../../models/account.model';

@Component({
  selector: 'app-simular',
  imports: [ReactiveFormsModule],
  templateUrl: './simular.component.html',
  styleUrl: './simular.component.scss'
})
export class SimularComponent implements OnInit {
  username?: string
  form?: FormGroup
  userInfo?:Account

  constructor(private _accountService: AccountService, private fb: FormBuilder ){
    this.form = this.fb.group({
      
    });
  }

  ngOnInit(): void {

  }

  getAccountDetails(){
    this._accountService.getAccountDetails().subscribe({
      next: (response)=> {

      }
    })
  }

}
