import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { HttpClient } from '@angular/common/http';
import { RouterLink, RouterModule } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterModule, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  username?: string
  title: string = 'SimCredito'
  constructor(private _accountService: AccountService, private fb: FormBuilder ){
  
  }

  ngOnInit(): void {
    this.getUsername()
  }

  getUsername(){
    this._accountService.getAccountDetails().subscribe({
      next: (response)=> {
        this.username = response.username;
      },
      error: (err)=> {
        
      }
    })
  }
 
}
