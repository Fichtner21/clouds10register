import { Component, OnInit } from '@angular/core';
import { AuthUser } from '../model/auth-user.interface';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public formGroup = new FormGroup({
    nameUser: new FormControl('', [Validators.required, Validators.minLength(3)]),
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

  constructor(){}

  public ngOnInit(): void {
    const valueChanges$ = this.formGroup.valueChanges;
    const statusChanges$ = this.formGroup.statusChanges;

    statusChanges$.subscribe((status) => {});
  }

  public onSubmit($event){
    if(this.formGroup.valid){
      console.log('Form is valid');
    } else {
      console.log('Form is invalid');
    }
  }
}
