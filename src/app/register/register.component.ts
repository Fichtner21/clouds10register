import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AuthUser } from '../model/auth-user.interface';
import { NgModel, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements AfterViewInit, OnInit {

  public user: AuthUser = {
    name: '',
    prefix: '+48 (PL)',
    phone: null,
    chess: {},    
  };

  @ViewChild('registerForm') public ngForm: NgForm;
  @ViewChild('nameUser') public nameNgModel: NgModel;
  @ViewChild('prefixUser') public prefixNgModel: NgModel;
  @ViewChild('phoneUser') public phoneNgModel: NgModel;
  @ViewChild('chessUser') public chessNgModel: NgModel;  

  constructor(private authService: AuthService){}

  public ngOnInit(): void {}
  public ngAfterViewInit(): void {}

  public async onSubmit($event){
    const req = await this.authService.registerUser(this.user);
    //console.log(req);
  }

}
