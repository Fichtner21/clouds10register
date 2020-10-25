import { Component, OnInit } from '@angular/core';
import { AuthUser } from '../model/auth-user.interface';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, startWith } from 'rxjs/operators';
import { NgxMaskModule, IConfig } from 'ngx-mask'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public prefixes = [
    {code: '+48 (PL)'},
    {code: '+49 (DE)'},
  ];

  public mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$";

  public formGroup = new FormGroup({
    nameUser: new FormControl('', [Validators.required, Validators.minLength(3)]),
    prefixes: new FormControl(this.prefixes[0], [Validators.required]), 
    phoneUser: new FormControl('', [Validators.minLength(9), Validators.maxLength(9), Validators.required]), 
    chessUser: new FormControl('',[Validators.required]),  
  });

  public buttonDisabled$ = this.formGroup.statusChanges.pipe(
    map((status) => status === 'INVALID'),
    startWith(true),
  );

  public nameMessage$ = this.formGroup.valueChanges.pipe(
    map((value) => {
      const nameErrors = this.formGroup.controls.nameUser?.errors;
      if(nameErrors) {        
        if(nameErrors?.required){
          return "This field is required";
        }  
        if(nameErrors?.minlength){          
          return 'Invalid data';
        }      
      }
      return '';
    }),
  );

  public phoneMessage$ = this.formGroup.valueChanges.pipe(
    map((value) => {
      const phoneErrors = this.formGroup.controls.phoneUser?.errors;
      if(phoneErrors){
        if(phoneErrors?.required){
          return "This field is required";
        }
        if(phoneErrors?.minLength){
          return 'Please provide nine numbers';
        }
      }
      return '';
    })
  )

  public chessMessage$ = this.formGroup.valueChanges.pipe(
    map((value) => {
      const chessErrors = this.formGroup.controls.chessUser?.errors;
      if(chessErrors){
        if(chessErrors?.required){
          return "This field is required";
        }
      }
      return '';
    })
  )

  constructor(){}
 

  public ngOnInit(): void {
    const valueChanges$ = this.formGroup.valueChanges;
    const statusChanges$ = this.formGroup.statusChanges;

    statusChanges$.subscribe((status) => {});
  }

  public onSubmit($event){
    if(this.formGroup.valid){
      console.log('Form is valid');
      console.log(this.formGroup.value);
    } else {
      console.log('Form is invalid');      
    }
  }
}
