import { Component, OnInit } from '@angular/core';
import { AuthUser } from '../model/auth-user.interface';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup, Validators, FormBuilder, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { map, startWith } from 'rxjs/operators';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import * as moment from 'moment';

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
  
  public minimumAge(age: number): ValidatorFn {
    return (fg: FormGroup): ValidationErrors => {
      let result: ValidationErrors = null;
      if (fg.get('year').valid && fg.get('month').valid && fg.get('day').valid) {
        // carefull, moment months range is from 0 to 11
        const value: { year: string, month: string, day: string } = fg.value;
        const date = moment({ year: +value.year, month: (+value.month) - 1, day: +value.day }).startOf('day');
        if (date.isValid()) {
          // https://momentjs.com/docs/#/displaying/difference/
          const now = moment().startOf('day');
          const yearsDiff = date.diff(now, 'years');
          if (yearsDiff > -age) {
            result = {
              'minimumAge': {
                'requiredAge': age,
                'actualAge': yearsDiff
              }
            };
          }
        }
      }
      return result;
    };
  }

  public formGroup = new FormGroup({
    nameUser: new FormControl('', [Validators.required, Validators.minLength(3)]),
    prefixes: new FormControl('', [Validators.required]), 
    phoneUser: new FormControl('', [Validators.minLength(9), Validators.maxLength(9), Validators.required]), 
    chessUser: new FormControl('',[Validators.required]), 
    authForm: new FormGroup({
      year: new FormControl('',[Validators.required, Validators.maxLength(4), Validators.minLength(4)]),
      month: new FormControl('', [Validators.required, Validators.maxLength(2)]),
      day: new FormControl('', [Validators.required, Validators.maxLength(2)]),
    }),       
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

  public prefixMessage$ = this.formGroup.valueChanges.pipe(
    map((value) => {
      const prefixErrors = this.formGroup.controls.prefixes?.errors;
      if(prefixErrors){
        if(prefixErrors?.required){
          return "This field is required";
        }
      }
      return '';
    })
  )

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
        if(phoneErrors?.maxLength){
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
  );

  public minAge$ = this.formGroup.valueChanges.pipe(
    map((value) => {      
      const dateBirth = this.formGroup.controls['authForm'].setValidators(this.minimumAge(18));      
    })
  );

  public permitAge$ = this.formGroup.valueChanges.pipe(
    map((value) => {
      const dateErrors = this.formGroup.controls['authForm']['day']?.errors;      
      if(dateErrors){
        if(dateErrors?.required){
          return "This field is required";
        }
        if(dateErrors?.minimumAge){
          return "You have to over 18 years old";
        }
      }          
      return '';
    })
  )
  
  constructor(){} 

  public ngOnInit(): void {
    const valueChanges$ = this.formGroup.valueChanges;
    const statusChanges$ = this.formGroup.statusChanges;
    
    //statusChanges$.subscribe((status) => {console.log(status)});
    //valueChanges$.subscribe((value) => {console.log(value)});    
  
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
