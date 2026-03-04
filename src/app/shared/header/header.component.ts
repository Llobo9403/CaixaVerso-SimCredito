import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterLink, RouterModule } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { AccountService } from '../../core/services/account-service/account.service';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterModule, MatButtonModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  username: string = 'Caixaverso'
  title: string = 'SimCredito'
}
