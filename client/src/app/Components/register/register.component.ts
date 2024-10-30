import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../Services/account.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  @Input() usersFromHomeComponent:any;
  @Output() cancelRegister=new EventEmitter();
  model:any={}
  accountService=inject(AccountService)

  ngOnInit(): void {
    this.register()
  }

  register()
  {
    this.accountService.register(this.model).subscribe(response=>{
      this.cancel()
    })
  }

  cancel()
  {
    this.cancelRegister.emit(false);
  }
}
